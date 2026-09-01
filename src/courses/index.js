import computerBasics from './computer-basics/index.js'
import claude001 from './claude-001/index.js'
import claudeCode from './claude-code/index.js'
import ai001 from './ai-001/index.js'

/**
 * The whole catalog, in the order the Hub screen shows them. Each entry is
 * built by `makeCourse` (see makeCourse.js) and carries its own MODULES,
 * LESSON_ORDER, and lookups — nothing here is shared state between courses.
 */
export const COURSES = [computerBasics, claude001, claudeCode, ai001]

const BY_ID = new Map(COURSES.map((c) => [c.id, c]))

export function getCourse(id) {
  return BY_ID.get(id) || null
}
