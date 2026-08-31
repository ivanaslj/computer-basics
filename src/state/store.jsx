import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react'
import { load, save, clear, today, isYesterday, DEFAULT_STATE } from '../lib/storage'
import { MODULES, LESSON_ORDER, getLesson } from '../curriculum'

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
      const day = today()
      const prev = state.completed[action.lessonId]
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
          [action.lessonId]: {
            completedAt: Date.now(),
            // Replaying a lesson can only improve the record, never undo it.
            perfect: action.perfect || prev?.perfect || false,
            times: (prev?.times || 0) + 1,
          },
        },
      }
    }

    case 'reset':
      // Keep the device/language choices — wiping those just means redoing setup.
      return {
        ...structuredClone(DEFAULT_STATE),
        settings: { ...state.settings },
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

    const isCompleted = (id) => Boolean(completed[id])

    // Lessons unlock strictly in order: finishing one opens the next. A learner
    // can still choose to jump ahead from the path screen; this is the default
    // route, not a wall.
    const firstUnfinishedIndex = LESSON_ORDER.findIndex((id) => !completed[id])
    const frontier = firstUnfinishedIndex === -1 ? LESSON_ORDER.length - 1 : firstUnfinishedIndex
    const isUnlocked = (id) => LESSON_ORDER.indexOf(id) <= frontier

    const nextLessonId = LESSON_ORDER[frontier]

    const moduleProgress = (moduleId) => {
      const mod = MODULES.find((m) => m.id === moduleId)
      if (!mod) return { done: 0, total: 0, pct: 0 }
      const done = mod.lessons.filter((l) => completed[l.id]).length
      return { done, total: mod.lessons.length, pct: Math.round((done / mod.lessons.length) * 100) }
    }

    const doneCount = LESSON_ORDER.filter((id) => completed[id]).length

    return {
      settings,
      streak,
      completed,
      isCompleted,
      isUnlocked,
      nextLessonId,
      nextLesson: getLesson(nextLessonId),
      moduleProgress,
      overall: {
        done: doneCount,
        total: LESSON_ORDER.length,
        pct: Math.round((doneCount / LESSON_ORDER.length) * 100),
      },
      courseFinished: doneCount === LESSON_ORDER.length,
      setSetting: (key, val) => dispatch({ type: 'set-setting', key, value: val }),
      finishOnboarding: (settings) => dispatch({ type: 'finish-onboarding', settings }),
      completeLesson: (lessonId, { perfect } = {}) =>
        dispatch({ type: 'complete-lesson', lessonId, perfect }),
      resetProgress: () => {
        clear()
        dispatch({ type: 'reset' })
      },
    }
  }, [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
