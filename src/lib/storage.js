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
  version: 1,
  settings: {
    onboarded: false,
    device: null, // 'windows' | 'mac'
    language: 'en', // 'en' | 'es'
    textSize: 'normal', // 'normal' | 'large' | 'xlarge'
  },
  // lessonId -> { completedAt, perfect }
  completed: {},
  streak: { count: 0, lastDay: null },
  // Reserved: when accounts exist this is where the server user id goes.
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

/** Fills in anything a newer version of the app expects but an older save lacks. */
function migrate(saved) {
  const base = structuredClone(DEFAULT_STATE)
  return {
    ...base,
    ...saved,
    version: base.version,
    settings: { ...base.settings, ...(saved.settings || {}) },
    completed: saved.completed && typeof saved.completed === 'object' ? saved.completed : {},
    streak: { ...base.streak, ...(saved.streak || {}) },
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
