import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { load, save, today, isYesterday } from '../lib/storage'
import { COURSES, getCourse } from '../courses'
import { useAuth } from './auth'
import { syncNow } from '../lib/sync'

/**
 * All course progress and settings live here. Screens read derived values and
 * dispatch intents; nothing else in the app reads or writes storage directly.
 *
 * Storage stays local-first even with an account: the app boots from
 * localStorage synchronously and never waits on a network to show a lesson.
 * Signing in adds a background copy on the server, folded together with
 * whatever this device already had — see `lib/sync.js`.
 */

const AppContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'set-setting':
      return {
        ...state,
        settings: { ...state.settings, [action.key]: action.value, updatedAt: Date.now() },
      }

    case 'finish-onboarding':
      return {
        ...state,
        settings: { ...state.settings, ...action.settings, onboarded: true, updatedAt: Date.now() },
      }

    case 'complete-lesson': {
      const courseId = state.settings.currentCourseId
      if (!courseId) return state // shouldn't happen — no lesson screen without a course
      const courseCompleted = state.completed[courseId] || {}
      const prev = courseCompleted[action.lessonId]

      const day = today()
      // The streak is global, shared across every course — any lesson,
      // anywhere, keeps it going.
      const streak =
        state.streak.lastDay === day
          ? state.streak
          : {
              count: isYesterday(state.streak.lastDay) ? state.streak.count + 1 : 1,
              lastDay: day,
            }

      return {
        ...state,
        streak,
        completed: {
          ...state.completed,
          [courseId]: {
            ...courseCompleted,
            [action.lessonId]: {
              completedAt: Date.now(),
              // Replaying a lesson can only improve the record, never undo it.
              perfect: action.perfect || prev?.perfect || false,
              times: (prev?.times || 0) + 1,
            },
          },
        },
      }
    }

    // Practice modes keep only personal bests — there is nothing to complete,
    // so a result either beats the record or it doesn't, and either way the
    // round is counted. Never lowers a best.
    case 'record-practice': {
      const prev = state.practice[action.mode]
      if (!prev) return state
      const next = { ...prev, rounds: (prev.rounds || 0) + 1 }
      for (const [key, value] of Object.entries(action.scores || {})) {
        if (typeof value === 'number' && value > (prev[key] || 0)) next[key] = value
      }
      return { ...state, practice: { ...state.practice, [action.mode]: next } }
    }

    // Resets only the *current* course's checkmarks — resetting your Computer
    // Basics progress shouldn't silently wipe Claude 001 too. Settings and
    // every other course are left untouched.
    case 'reset-course': {
      if (!action.courseId) return state
      const { [action.courseId]: _dropped, ...rest } = state.completed
      return { ...state, completed: rest }
    }

    // The result of folding this device's progress together with the copy on
    // the server. Replaces state wholesale because the merge has already
    // considered both sides — see `lib/merge.js`.
    case 'adopt':
      return action.state

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    save(state)
  }, [state])

  /* ------------------------------------------------------------- syncing */

  const { user } = useAuth()
  const userId = user?.id ?? null
  // Only for the listeners registered once below, which cannot close over a
  // fresh `state`. Everywhere else the state is passed in explicitly. Written
  // in an effect, never during render, so it is never a half-updated value.
  const stateRef = useRef(state)
  useEffect(() => {
    stateRef.current = state
  }, [state])
  // 'idle' | 'syncing' | 'saved' | 'offline'
  const [syncState, setSyncState] = useState('idle')
  const syncedFor = useRef(null)

  // Pushing is deliberately fire-and-forget. A learner finishing a lesson on a
  // train must never see a spinner or an error because the carriage went
  // through a tunnel — the lesson is already saved on the device, and the
  // server copy catches up whenever it can.
  const pushSoon = useCallback(
    async (id, current) => {
      if (!id) return
      const local = current ?? stateRef.current
      setSyncState('syncing')
      try {
        const merged = await syncNow(id, local)
        // Only adopt when the server actually added something. Dispatching an
        // equal-but-new object every time would re-render, re-save and
        // re-trigger this effect forever.
        if (JSON.stringify(merged) !== JSON.stringify(local)) {
          dispatch({ type: 'adopt', state: merged })
        }
        setSyncState('saved')
      } catch {
        setSyncState('offline')
      }
    },
    []
  )

  // On sign-in: fold the server's copy together with this device's before
  // anything else happens. This is what stops an empty new account wiping
  // progress someone already made without one.
  useEffect(() => {
    if (!userId || syncedFor.current === userId) return
    syncedFor.current = userId
    pushSoon(userId)
  }, [userId, pushSoon])

  useEffect(() => {
    if (!userId) syncedFor.current = null
  }, [userId])

  // On change: wait for a pause rather than writing on every step of a lesson.
  useEffect(() => {
    if (!userId || syncedFor.current !== userId) return
    const t = setTimeout(() => pushSoon(userId, state), 2000)
    return () => clearTimeout(t)
  }, [state, userId, pushSoon])

  // Leaving the app is the moment most likely to be followed by picking up a
  // different device, so flush then too rather than losing the last two
  // seconds of work to a debounce that never fired.
  useEffect(() => {
    if (!userId) return
    const flush = () => {
      if (document.visibilityState === 'hidden') pushSoon(userId)
    }
    document.addEventListener('visibilitychange', flush)
    window.addEventListener('pagehide', flush)
    return () => {
      document.removeEventListener('visibilitychange', flush)
      window.removeEventListener('pagehide', flush)
    }
  }, [userId, pushSoon])

  // Reflect the display preferences on <html>: the rem scale moves with the
  // text-size choice, and the theme choice — unless it is "match my device",
  // which is the media query in index.css doing the work — overrides it.
  useEffect(() => {
    const html = document.documentElement
    html.dataset.textsize = state.settings.textSize
    html.lang = state.settings.language

    const theme = state.settings.theme
    if (theme === 'system') delete html.dataset.theme
    else html.dataset.theme = theme
    // Tells the browser which way to paint scrollbars, form controls and the
    // area past the end of the page. Without it a dark app still overscrolls
    // to white.
    html.style.colorScheme = theme === 'system' ? 'light dark' : theme

    // The phone's status bar colour. index.html carries a media-scoped pair
    // for "match my device"; an explicit choice needs one that always
    // applies, and it has to come first, because the browser takes the first
    // tag whose media matches.
    const ID = 'theme-color-override'
    document.getElementById(ID)?.remove()
    if (theme !== 'system') {
      const meta = document.createElement('meta')
      meta.id = ID
      meta.name = 'theme-color'
      meta.content = theme === 'dark' ? '#17161c' : '#faf7f2'
      document.head.prepend(meta)
    }
  }, [state.settings.textSize, state.settings.language, state.settings.theme])

  const value = useMemo(() => {
    const { completed, settings, streak, practice } = state
    const course = getCourse(settings.currentCourseId)
    // completed[courseId] — the bucket for whichever course is active. Falls
    // back to {} both before a course is picked and for a fresh course.
    const courseCompleted = course ? completed[course.id] || {} : {}

    const isCompleted = (id) => Boolean(courseCompleted[id])

    // Lessons unlock strictly in order within a course: finishing one opens
    // the next. A learner can still choose to jump ahead from the path
    // screen; this is the default route, not a wall.
    const order = course?.LESSON_ORDER || []
    const firstUnfinishedIndex = order.findIndex((id) => !courseCompleted[id])
    const frontier = firstUnfinishedIndex === -1 ? order.length - 1 : firstUnfinishedIndex
    const isUnlocked = (id) => order.indexOf(id) <= frontier

    const nextLessonId = order[frontier]

    const moduleProgress = (moduleId) => {
      const mod = course?.MODULES.find((m) => m.id === moduleId)
      if (!mod) return { done: 0, total: 0, pct: 0 }
      const done = mod.lessons.filter((l) => courseCompleted[l.id]).length
      return { done, total: mod.lessons.length, pct: Math.round((done / mod.lessons.length) * 100) }
    }

    const doneCount = order.filter((id) => courseCompleted[id]).length

    // Every course in the catalog, each with its own progress summary — for
    // the Hub screen. Coming-soon courses always read as 0 progress.
    const courses = COURSES.map((c) => {
      const bucket = completed[c.id] || {}
      const done = c.LESSON_ORDER.filter((id) => bucket[id]).length
      return { ...c, progress: { done, total: c.LESSON_ORDER.length, pct: Math.round((done / c.LESSON_ORDER.length) * 100) } }
    })

    return {
      settings,
      streak,
      practice,
      syncState: userId ? syncState : 'idle',
      completed: courseCompleted,
      course,
      courses,
      isCompleted,
      isUnlocked,
      nextLessonId,
      nextLesson: course?.getLesson(nextLessonId) ?? null,
      moduleProgress,
      overall: {
        done: doneCount,
        total: order.length,
        pct: order.length ? Math.round((doneCount / order.length) * 100) : 0,
      },
      courseFinished: order.length > 0 && doneCount === order.length,
      setSetting: (key, val) => dispatch({ type: 'set-setting', key, value: val }),
      finishOnboarding: (settings) => dispatch({ type: 'finish-onboarding', settings }),
      openCourse: (courseId) => dispatch({ type: 'set-setting', key: 'currentCourseId', value: courseId }),
      completeLesson: (lessonId, { perfect } = {}) =>
        dispatch({ type: 'complete-lesson', lessonId, perfect }),
      recordPractice: (mode, scores) => dispatch({ type: 'record-practice', mode, scores }),
      resetProgress: () => dispatch({ type: 'reset-course', courseId: settings.currentCourseId }),
    }
  }, [state, syncState, userId])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
