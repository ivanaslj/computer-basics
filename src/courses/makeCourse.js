/**
 * Every course (Computer Basics, Claude 001, ...) is built from this same
 * shape: an ordered list of modules, each holding a list of lessons. This
 * factory does the flattening/indexing once so each course's own index.js
 * stays a one-line declaration of its modules plus a `meta` block.
 */
export function makeCourse(meta, modules) {
  const LESSON_ORDER = modules.flatMap((m) => m.lessons.map((l) => l.id))

  const INDEX = new Map()
  modules.forEach((mod) => {
    mod.lessons.forEach((lesson, i) => {
      INDEX.set(lesson.id, { lesson, module: mod, indexInModule: i })
    })
  })

  return {
    ...meta,
    MODULES: modules,
    LESSON_ORDER,
    getLesson: (id) => INDEX.get(id) || null,
    getNextLessonId: (id) => {
      const i = LESSON_ORDER.indexOf(id)
      return i >= 0 && i < LESSON_ORDER.length - 1 ? LESSON_ORDER[i + 1] : null
    },
    getPrevLessonId: (id) => {
      const i = LESSON_ORDER.indexOf(id)
      return i > 0 ? LESSON_ORDER[i - 1] : null
    },
  }
}
