/**
 * The only place the app touches persistence.
 *
 * v1 is device-local (localStorage). When accounts land, this module is the
 * single seam to change: give `load`/`save` a network implementation (and a
 * merge strategy for the two copies) and nothing else in the app moves.
 * Everything above this file works with plain objects and never assumes the
 * data is synchronous or local.
 */

const KEY = 'computer-basics:v1'

// Some browsers (private mode, storage disabled) throw on access. The app must
// still run — the user just loses progress when they close it, which is far
// better than a blank screen.
function safeLocalStorage() {
  try {
    const probe = '__cb_probe__'
    window.localStorage.setItem(probe, '1')
    window.localStorage.removeItem(probe)
    return window.localStorage
  } catch {
    return null
  }
}

const store = typeof window === 'undefined' ? null : safeLocalStorage()

export const DEFAULT_STATE = {
  version: 2,
  settings: {
    onboarded: false,
    device: null, // 'windows' | 'mac'
    language: 'en', // 'en' | 'es'
    textSize: 'normal', // 'normal' | 'large' | 'xlarge'
    theme: 'system', // 'system' | 'light' | 'dark'
    currentCourseId: null, // which course the hub last opened
    // When a setting was last changed on this device. Settings are
    // preferences, not achievements, so when two devices disagree the newer
    // choice simply wins — this is how sync knows which that is.
    updatedAt: 0,
  },
  // courseId -> lessonId -> { completedAt, perfect, times }
  completed: {},
  // Global and shared across every course — a daily practice streak doesn't
  // care which course kept it going.
  streak: { count: 0, lastDay: null },
  // Personal bests for the unlimited practice modes. These are not lessons
  // and have no completion — only a number to try to beat.
  practice: {
    click: { best: 0, rounds: 0 },
    drag: { best: 0, rounds: 0 },
    type: { bestWpm: 0, bestAccuracy: 0, rounds: 0 },
  },
  // The signed-in user's id, when there is one. Progress is stored the same
  // way either way; an account only decides whether it is also kept on a
  // server so it can follow the person to another device.
  account: null,
}

export function load() {
  if (!store) return structuredClone(DEFAULT_STATE)
  try {
    const raw = store.getItem(KEY)
    if (!raw) return structuredClone(DEFAULT_STATE)
    const parsed = JSON.parse(raw)
    return migrate(parsed)
  } catch {
    return structuredClone(DEFAULT_STATE)
  }
}

export function save(state) {
  if (!store) return
  try {
    store.setItem(KEY, JSON.stringify(state))
  } catch {
    /* quota or disabled — progress simply isn't kept */
  }
}

export function clear() {
  if (!store) return
  try {
    store.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

/**
 * Before multi-course support, `completed` was flat: lessonId -> record. Now
 * it's nested: courseId -> lessonId -> record. Detect the old shape
 * structurally rather than by guessing at lesson-id naming (which a new
 * course's ids could accidentally match): a v1 record has `completedAt`
 * directly on it, a v2 course bucket does not. This is idempotent — running
 * it on an already-nested object is a no-op.
 */
function normalizeCompleted(completed) {
  if (!completed || typeof completed !== 'object') return {}
  const values = Object.values(completed)
  const looksFlat = values.length > 0 && values.every((v) => v && typeof v === 'object' && 'completedAt' in v)
  return looksFlat ? { 'computer-basics': completed } : completed
}

/** Fills in anything a newer version of the app expects but an older save lacks. */
function migrate(saved) {
  const base = structuredClone(DEFAULT_STATE)
  return {
    ...base,
    ...saved,
    version: base.version,
    settings: { ...base.settings, ...(saved.settings || {}) },
    completed: normalizeCompleted(saved.completed),
    streak: { ...base.streak, ...(saved.streak || {}) },
    // Merged per mode, not wholesale: a save written before a mode existed
    // would otherwise leave that mode's record undefined and crash on read.
    practice: {
      click: { ...base.practice.click, ...(saved.practice?.click || {}) },
      drag: { ...base.practice.drag, ...(saved.practice?.drag || {}) },
      type: { ...base.practice.type, ...(saved.practice?.type || {}) },
    },
  }
}

/** Local calendar day, as YYYY-MM-DD — used for the practice streak. */
export function today() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export function isYesterday(day) {
  if (!day) return false
  const d = new Date()
  d.setDate(d.getDate() - 1)
  const p = (n) => String(n).padStart(2, '0')
  return day === `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}
