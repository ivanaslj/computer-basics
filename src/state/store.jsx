import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react'
import { load, save, today, isYesterday } from '../lib/storage'
import { COURSES, getCourse } from '../courses'

/**
 * All course progress and settings live here. Screens read derived values and
 * dispatch intents; nothing else in the app reads or writes storage directly.
 *
 * Later: adding accounts means replacing the storage calls in this file with a
 * synced source, plus a `state.account` check. No screen needs to change.
 */

const AppContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'set-setting':
      return { ...state, settings: { ...state.settings, [action.key]: action.value } }

    case 'finish-onboarding':
      return {
        ...state,
        settings: { ...state.settings, ...action.settings, onboarded: true },
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

    // Resets only the *current* course's checkmarks — resetting your Computer
    // Basics progress shouldn't silently wipe Claude 001 too. Settings and
    // every other course are left untouched.
    case 'reset-course': {
      if (!action.courseId) return state
      const { [action.courseId]: _dropped, ...rest } = state.completed
      return { ...state, completed: rest }
    }

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

  // Reflect the text-size preference on <html> so the rem scale moves with it.
  useEffect(() => {
    document.documentElement.dataset.textsize = state.settings.textSize
    document.documentElement.lang = state.settings.language
  }, [state.settings.textSize, state.settings.language])

  const value = useMemo(() => {
    const { completed, settings, streak } = state
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
      resetProgress: () => dispatch({ type: 'reset-course', courseId: settings.currentCourseId }),
    }
  }, [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
