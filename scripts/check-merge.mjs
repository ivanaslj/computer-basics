/**
 * Merge rules for account sync. Progress that silently vanishes is the one
 * bug this app cannot afford, so these run as part of `npm run check` and
 * therefore as part of every build.
 */
import { mergeStates, summarise, identity } from '../src/lib/merge.js'

let pass = 0, fail = 0
const sortKeys = (v) => Array.isArray(v) ? v.map(sortKeys)
  : (v && typeof v === 'object')
    ? Object.fromEntries(Object.keys(v).sort().map(k => [k, sortKeys(v[k])]))
    : v
const eq = (name, got, want) => {
  const g = JSON.stringify(sortKeys(got)), w = JSON.stringify(sortKeys(want))
  if (g === w) { pass++; console.log('  ok  ', name) }
  else { fail++; console.log('  FAIL', name, '\n     got ', g, '\n     want', w) }
}

const base = (over = {}) => ({
  version: 2,
  settings: { onboarded: true, device: 'windows', language: 'en', textSize: 'normal', theme: 'system', currentCourseId: 'computer-basics' },
  completed: {}, streak: { count: 0, lastDay: null },
  practice: { click: { best: 0, rounds: 0 }, drag: { best: 0, rounds: 0 }, type: { bestWpm: 0, bestAccuracy: 0, rounds: 0 } },
  account: null, ...over,
})

console.log('\n1. completed lessons are unioned, never dropped')
const phone = base({ completed: { 'computer-basics': { 'm1-l1': { completedAt: 100, perfect: true, times: 1 } } } })
const laptop = base({ completed: { 'computer-basics': { 'm1-l2': { completedAt: 200, perfect: false, times: 3 } } } })
const m1 = mergeStates(phone, laptop)
eq('both lessons survive', Object.keys(m1.completed['computer-basics']).sort(), ['m1-l1', 'm1-l2'])

console.log('\n2. same lesson on both: earliest date, perfect sticks, times = max')
const a2 = base({ completed: { c: { l: { completedAt: 500, perfect: false, times: 2 } } } })
const b2 = base({ completed: { c: { l: { completedAt: 100, perfect: true, times: 5 } } } })
eq('record merged', mergeStates(a2, b2).completed.c.l, { completedAt: 100, perfect: true, times: 5 })

console.log('\n3. IDEMPOTENT — merging twice must equal merging once')
const once = mergeStates(a2, b2)
const twice = mergeStates(once, b2)
eq('merge(merge(a,b),b) === merge(a,b)', twice, once)
const thrice = mergeStates(mergeStates(twice, b2), a2)
eq('still stable after 4 merges', thrice, once)

console.log('\n4. counters do NOT inflate on repeat sync (the sum-vs-max bug)')
let acc = base({ practice: { click: { best: 10, rounds: 4 }, drag: { best: 0, rounds: 0 }, type: { bestWpm: 0, bestAccuracy: 0, rounds: 0 } } })
const other = base({ practice: { click: { best: 7, rounds: 3 }, drag: { best: 0, rounds: 0 }, type: { bestWpm: 0, bestAccuracy: 0, rounds: 0 } } })
for (let i = 0; i < 20; i++) acc = mergeStates(acc, other)
eq('rounds stable after 20 syncs', acc.practice.click, { best: 10, rounds: 4 })

console.log('\n5. streak is never lowered')
const hot = base({ streak: { count: 30, lastDay: '2026-09-04' } })
const cold = base({ streak: { count: 1, lastDay: '2026-09-01' } })
eq('later day wins', mergeStates(cold, hot).streak, { count: 30, lastDay: '2026-09-04' })
eq('order does not matter', mergeStates(hot, cold).streak, { count: 30, lastDay: '2026-09-04' })
const tieA = base({ streak: { count: 5, lastDay: '2026-09-04' } })
const tieB = base({ streak: { count: 9, lastDay: '2026-09-04' } })
eq('same day: higher count', mergeStates(tieA, tieB).streak, { count: 9, lastDay: '2026-09-04' })
eq('empty streak loses to a real one', mergeStates(base(), hot).streak, { count: 30, lastDay: '2026-09-04' })

console.log('\n5b. two devices holding two halves of ONE run are joined, not truncated')
// Server saw 5 days ending Sep 3; the phone saw Sep 4 + Sep 5. That is one
// unbroken 7-day run, not a 2-day one.
const serverHalf = base({ streak: { count: 5, lastDay: '2026-09-03' } })
const phoneHalf  = base({ streak: { count: 2, lastDay: '2026-09-05' } })
eq('joined into 7 days', mergeStates(serverHalf, phoneHalf).streak, { count: 7, lastDay: '2026-09-05' })
eq('same either way round', mergeStates(phoneHalf, serverHalf).streak, { count: 7, lastDay: '2026-09-05' })
eq('joining twice changes nothing', mergeStates(mergeStates(serverHalf, phoneHalf), phoneHalf).streak, { count: 7, lastDay: '2026-09-05' })
eq('and re-joining the older half too', mergeStates(mergeStates(serverHalf, phoneHalf), serverHalf).streak, { count: 7, lastDay: '2026-09-05' })

// A genuine gap means the old run really did lapse — do not invent days.
const longAgo = base({ streak: { count: 100, lastDay: '2026-01-01' } })
const todayish = base({ streak: { count: 1, lastDay: '2026-09-05' } })
eq('a lapsed run is not resurrected', mergeStates(longAgo, todayish).streak, { count: 1, lastDay: '2026-09-05' })
eq('exactly contiguous joins', mergeStates(base({ streak: { count: 3, lastDay: '2026-09-03' } }), base({ streak: { count: 1, lastDay: '2026-09-04' } })).streak, { count: 4, lastDay: '2026-09-04' })
eq('one clear day missed does not join', mergeStates(base({ streak: { count: 3, lastDay: '2026-09-01' } }), base({ streak: { count: 1, lastDay: '2026-09-05' } })).streak, { count: 1, lastDay: '2026-09-05' })

console.log('\n6. THE REAL SCENARIO — mom has local progress, signs into an account that has other progress')
const momsPhone = base({
  completed: { 'computer-basics': { 'm1-l1': { completedAt: 1, perfect: true, times: 1 }, 'm1-l2': { completedAt: 2, perfect: true, times: 1 } } },
  streak: { count: 3, lastDay: '2026-09-04' },
  practice: { click: { best: 12, rounds: 5 }, drag: { best: 0, rounds: 0 }, type: { bestWpm: 0, bestAccuracy: 0, rounds: 0 } },
})
const serverHad = base({
  completed: { 'computer-basics': { 'm1-l3': { completedAt: 3, perfect: false, times: 1 } }, 'claude-001': { 'm1-l1': { completedAt: 4, perfect: true, times: 1 } } },
  streak: { count: 1, lastDay: '2026-09-02' },
  practice: { click: { best: 20, rounds: 2 }, drag: { best: 0, rounds: 0 }, type: { bestWpm: 0, bestAccuracy: 0, rounds: 0 } },
})
const merged = mergeStates(serverHad, momsPhone)
eq('all 3 CB lessons kept', Object.keys(merged.completed['computer-basics']).sort(), ['m1-l1', 'm1-l2', 'm1-l3'])
eq('other course kept too', Object.keys(merged.completed['claude-001']), ['m1-l1'])
eq('her streak joined, not truncated', merged.streak, { count: 3, lastDay: '2026-09-04' })
eq('best click score kept', merged.practice.click.best, 20)

console.log('\n7. settings: newest choice wins')
const oldS = base({ settings: { ...base().settings, theme: 'light', updatedAt: 100 } })
const newS = base({ settings: { ...base().settings, theme: 'dark', updatedAt: 900 } })
eq('newer theme wins', mergeStates(oldS, newS).settings.theme, 'dark')
eq('regardless of argument order', mergeStates(newS, oldS).settings.theme, 'dark')

// The name and picture are settings, so they ride the same "newest wins" rule
// as the theme. What matters is the other half: a device that has never heard
// of the field must not wipe it off a device that has.
console.log('\n7b. a name survives a device that predates the field')
const named = base({ settings: { ...base().settings, displayName: 'Ana', avatarIcon: 'sprout', updatedAt: 100 } })
const oblivious = base({ settings: { ...base().settings, theme: 'dark', updatedAt: 900 } })
eq('name kept', mergeStates(named, oblivious).settings.displayName, 'Ana')
eq('picture kept', mergeStates(named, oblivious).settings.avatarIcon, 'sprout')
eq('and the newer theme still wins', mergeStates(named, oblivious).settings.theme, 'dark')

console.log('\n7c. the newer name wins, either way round')
const renamedOld = base({ settings: { ...base().settings, displayName: 'Ana', updatedAt: 100 } })
const renamedNew = base({ settings: { ...base().settings, displayName: 'Ana María', updatedAt: 900 } })
eq('newer name wins', mergeStates(renamedOld, renamedNew).settings.displayName, 'Ana María')
eq('regardless of argument order', mergeStates(renamedNew, renamedOld).settings.displayName, 'Ana María')

console.log('\n8. summary for the future streak comparison')
eq('counts every course', summarise(merged), { streak_count: 3, lessons_done: 4, last_active: '2026-09-04' })

console.log('\n8b. identity for the profile row')
eq('unset reads as null, not empty string', identity(base()), { display_name: null, avatar_icon: null })
eq('trims', identity(base({ settings: { ...base().settings, displayName: '  Ana  ' } })).display_name, 'Ana')
eq(
  'whitespace-only is still null',
  identity(base({ settings: { ...base().settings, displayName: '   ' } })).display_name,
  null
)

console.log('\n10. starting a course over is not undone by the server copy')
// The server still holds three lessons; this device started the course over
// at t=1000 and has nothing. Before resets were recorded, the union put all
// three straight back on the next sync.
const serverOld = base({ completed: { cb: { l1: { completedAt: 100, perfect: true, times: 1 }, l2: { completedAt: 200, perfect: true, times: 1 }, l3: { completedAt: 300, perfect: false, times: 1 } } } })
const afterReset = base({ completed: {}, resets: { cb: 1000 } })
const r1 = mergeStates(serverOld, afterReset)
eq('reset beats a stale server copy', r1.completed.cb, {})
eq('either way round', mergeStates(afterReset, serverOld).completed.cb, {})
eq('the reset itself is kept', r1.resets, { cb: 1000 })

// After the reset she redoes l1 at t=1500. The server still has l1 from t=100.
// Merging first would keep the earlier date (100), which is before the reset,
// and the lesson she just finished would disappear.
const redone = base({ completed: { cb: { l1: { completedAt: 1500, perfect: false, times: 1 } } }, resets: { cb: 1000 } })
eq('a lesson redone after the reset survives', Object.keys(mergeStates(serverOld, redone).completed.cb), ['l1'])
eq('with its new date, not the stale one', mergeStates(serverOld, redone).completed.cb.l1.completedAt, 1500)

// Another device reset long ago (t=50); this one has lessons from after that.
const oldReset = base({ completed: {}, resets: { cb: 50 } })
eq('an older reset does not wipe newer lessons', Object.keys(mergeStates(oldReset, serverOld).completed.cb).sort(), ['l1', 'l2', 'l3'])

const rOnce = mergeStates(serverOld, redone)
eq('IDEMPOTENT with resets', mergeStates(mergeStates(rOnce, serverOld), redone), rOnce)
eq('the latest reset wins', mergeStates(base({ resets: { cb: 10 } }), base({ resets: { cb: 20 } })).resets, { cb: 20 })
eq('a reset only touches its own course', Object.keys(mergeStates(base({ completed: { other: { x: { completedAt: 5, perfect: true, times: 1 } } } }), afterReset).completed.other), ['x'])

console.log('\n11. waving the save card off sticks across devices')
const wavedTwice = base({ saveNudge: { dismissals: 2, atLessons: 9 } })
const neverSaw = base({ saveNudge: { dismissals: 0, atLessons: 0 } })
eq('the most-dismissed copy wins', mergeStates(neverSaw, wavedTwice).saveNudge, { dismissals: 2, atLessons: 9 })
eq('a copy without the field is fine', mergeStates(base(), wavedTwice).saveNudge, { dismissals: 2, atLessons: 9 })

console.log('\n9. null/garbage inputs do not throw')
eq('null a', mergeStates(null, phone), phone)
eq('null b', mergeStates(phone, null), phone)
eq('missing sub-objects', typeof mergeStates(base(), { settings: {}, completed: null, streak: null, practice: null }), 'object')

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
