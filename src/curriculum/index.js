import module1 from './module1.js'
import module2 from './module2.js'
import module3 from './module3.js'
import module4 from './module4.js'
import module5 from './module5.js'
import module6 from './module6.js'
import module7 from './module7.js'

/**
 * The course. Each module is a file of its own; each lesson is a list of steps
 * that the lesson player walks through.
 *
 * Content values may be a plain string, a `{ en, es }` pair, or `dev(a, b)` to
 * vary by Windows/Mac — see src/i18n for how those are resolved.
 */
export const MODULES = [module1, module2, module3, module4, module5, module6, module7]

export const LESSON_ORDER = MODULES.flatMap((m) => m.lessons.map((l) => l.id))

const INDEX = new Map()
MODULES.forEach((mod) => {
  mod.lessons.forEach((lesson, i) => {
    INDEX.set(lesson.id, { lesson, module: mod, indexInModule: i })
  })
})

export function getLesson(id) {
  return INDEX.get(id) || null
}

export function getNextLessonId(id) {
  const i = LESSON_ORDER.indexOf(id)
  return i >= 0 && i < LESSON_ORDER.length - 1 ? LESSON_ORDER[i + 1] : null
}

export function getPrevLessonId(id) {
  const i = LESSON_ORDER.indexOf(id)
  return i > 0 ? LESSON_ORDER[i - 1] : null
}
