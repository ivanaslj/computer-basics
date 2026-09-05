/**
 * Merge rules for account sync. Progress that silently vanishes is the one
 * bug this app cannot afford, so these run as part of `npm run check` and
 * therefore as part of every build.
 */
import { mergeStates, summarise } from '../src/lib/merge.js'

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

console.log('\n8. summary for the future streak comparison')
eq('counts every course', summarise(merged), { streak_count: 3, lessons_done: 4, last_active: '2026-09-04' })

console.log('\n9. null/garbage inputs do not throw')
eq('null a', mergeStates(null, phone), phone)
eq('null b', mergeStates(phone, null), phone)
eq('missing sub-objects', typeof mergeStates(base(), { settings: {}, completed: null, streak: null, practice: null }), 'object')

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
