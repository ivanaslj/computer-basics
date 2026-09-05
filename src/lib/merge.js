import { DEFAULT_STATE } from './storage.js'

/**
 * Merging two copies of a learner's progress, and moving them to and from the
 * server.
 *
 * The rule that shapes everything here: **a merge can never take something
 * away.** Someone who finished a lesson on their phone and then signs in on a
 * laptop must end up with the lesson still finished, whichever copy is
 * "newer". Progress that vanishes is the one bug this app cannot afford — it
 * is the whole reason a beginner keeps coming back.
 *
 * The second rule is that merging is **idempotent**: merging the same two
 * states twice gives exactly the same answer as merging them once. Sync runs
 * on a timer, on every sign-in, and on every foreground, so any rule that
 * accumulates (summing counters, say) would drift a little further from the
 * truth every single time. That is why counts below take `max` rather than a
 * sum — `times` and `rounds` are "how many, at most, has any one device seen",
 * which is stable, instead of "how many in total", which is not.
 */

const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0)
const maxOf = (a, b) => Math.max(num(a), num(b))

// A default parameter only fills in for `undefined`, never for `null` — and
// `null` is exactly what a hand-edited localStorage, a half-written save or an
// older server row can hand us. Merging runs during sign-in, so letting it
// throw would look to the learner like their progress had just been eaten.
const obj = (v) => (v && typeof v === 'object' ? v : {})

/** Earliest wins — the first time you finished it is when you finished it. */
function mergeLessonRecord(a, b) {
  if (!a) return b
  if (!b) return a
  return {
    completedAt: Math.min(num(a.completedAt) || Infinity, num(b.completedAt) || Infinity),
    perfect: Boolean(a.perfect || b.perfect),
    times: maxOf(a.times, b.times),
  }
}

/** Union of every course, and within a course, every lesson. */
function mergeCompleted(rawA, rawB) {
  const [a, b] = [obj(rawA), obj(rawB)]
  const out = {}
  for (const courseId of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const ca = obj(a[courseId])
    const cb = obj(b[courseId])
    const bucket = {}
    for (const lessonId of new Set([...Object.keys(ca), ...Object.keys(cb)])) {
      bucket[lessonId] = mergeLessonRecord(ca[lessonId], cb[lessonId])
    }
    out[courseId] = bucket
  }
  return out
}

/** Whole days from `a` to `b`, both YYYY-MM-DD. Negative if b is earlier. */
function daysBetween(a, b) {
  const ms = Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)
  return Math.round(ms / 86400000)
}

/**
 * The streak is a single running record rather than a set, so it cannot simply
 * be unioned — but taking the more recent one wholesale throws days away.
 *
 * Say the server knows about a 5-day run ending Monday, and this phone knows
 * about a 2-day run ending Wednesday. Those are not competing claims; they are
 * two halves of the same 7-day run, seen by two devices. Keeping only "2"
 * would delete five days someone actually earned, which is precisely the kind
 * of silent loss that makes a learner stop trusting the app.
 *
 * So: the later day is always the end of the streak, and if the older record's
 * last active day reaches back into that run without a gap, the two are joined
 * up. If there is a real hole between them, the older run genuinely lapsed and
 * the newer one stands alone.
 *
 * Still idempotent — rejoining an already-joined streak changes nothing.
 */
function mergeStreak(a, b) {
  const sa = a || DEFAULT_STATE.streak
  const sb = b || DEFAULT_STATE.streak
  if (!sa.lastDay) return sb
  if (!sb.lastDay) return sa
  if (sa.lastDay === sb.lastDay) {
    return { lastDay: sa.lastDay, count: maxOf(sa.count, sb.count) }
  }

  const [newer, older] = sa.lastDay > sb.lastDay ? [sa, sb] : [sb, sa]
  const gap = daysBetween(older.lastDay, newer.lastDay)
  // The newer run covers `count` days ending on its last day, so it began
  // `count - 1` days earlier. The older run continues it when its own last day
  // lands on, or immediately before, that start.
  const continuous = gap <= num(newer.count)
  return {
    lastDay: newer.lastDay,
    count: continuous ? maxOf(newer.count, num(older.count) + gap) : num(newer.count),
  }
}

/** Every field is a personal best or a count, so every field takes the max. */
function mergePractice(rawA, rawB) {
  const [a, b] = [obj(rawA), obj(rawB)]
  const out = {}
  for (const mode of Object.keys(DEFAULT_STATE.practice)) {
    const ma = obj(a[mode])
    const mb = obj(b[mode])
    const merged = { ...DEFAULT_STATE.practice[mode] }
    for (const key of new Set([...Object.keys(ma), ...Object.keys(mb)])) {
      merged[key] = maxOf(ma[key], mb[key])
    }
    out[mode] = merged
  }
  return out
}

/**
 * Settings are preferences, not achievements — there is no "more correct" text
 * size, so the most recent choice simply wins. `updatedAt` is stamped whenever
 * a setting changes; an older save without one loses to any save that has one.
 */
function mergeSettings(rawA, rawB) {
  const [a, b] = [obj(rawA), obj(rawB)]
  const newer = num(b.updatedAt) > num(a.updatedAt) ? b : a
  const older = newer === a ? b : a
  // Keys the winner has never heard of still come through, so a preference set
  // on one device is not dropped by a device that predates it.
  return { ...older, ...newer }
}

/** Merge two whole app states. Order-independent and safe to repeat. */
export function mergeStates(a, b) {
  if (!a) return b
  if (!b) return a
  return {
    ...a,
    ...b,
    version: DEFAULT_STATE.version,
    settings: mergeSettings(a.settings, b.settings),
    completed: mergeCompleted(a.completed, b.completed),
    streak: mergeStreak(a.streak, b.streak),
    practice: mergePractice(a.practice, b.practice),
  }
}

/** The handful of numbers the profile row carries for a future comparison. */
export function summarise(state) {
  const lessonsDone = Object.values(state.completed || {}).reduce(
    (n, bucket) => n + Object.keys(bucket || {}).length,
    0
  )
  return {
    streak_count: num(state.streak?.count),
    lessons_done: lessonsDone,
    last_active: state.streak?.lastDay || null,
  }
}
