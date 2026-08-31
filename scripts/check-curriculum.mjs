/**
 * Checks the whole course for the mistakes that are easy to make in content and
 * invisible until a learner hits that one step: a simulation whose target isn't
 * on screen, a multiple choice with no right answer, a missing translation.
 *
 * Run with `npm run check`.
 */
import { MODULES, LESSON_ORDER } from '../src/curriculum/index.js'
import { SIMS } from '../src/components/sims/registry.js'
import { ART_NAMES } from '../src/components/art-names.js'

const problems = []
const fail = (where, msg) => problems.push(`${where}: ${msg}`)

const LANGS = ['en', 'es']
const DEV = '__dev__'

/** Walks a content value and reports any language that is missing or empty. */
function checkText(node, where) {
  if (node == null || typeof node === 'string' || typeof node === 'number') return
  if (Array.isArray(node)) return node.forEach((n) => checkText(n, where))
  if (node[DEV]) {
    if (!('windows' in node) || !('mac' in node)) fail(where, 'dev() is missing a platform')
    checkText(node.windows, `${where}[windows]`)
    checkText(node.mac, `${where}[mac]`)
    return
  }
  if ('en' in node || 'es' in node) {
    for (const l of LANGS) {
      if (!(l in node)) fail(where, `missing "${l}" translation`)
      else if (typeof node[l] === 'string' && node[l].trim() === '') fail(where, `empty "${l}" text`)
    }
    for (const l of LANGS) checkText(node[l], `${where}.${l}`)
    return
  }
  fail(where, `unrecognised content object: keys ${Object.keys(node).join(',')}`)
}

/** Collects every id a simulation config makes tappable. */
function simTargets(config = {}) {
  const ids = new Set()
  for (const key of ['icons', 'items', 'insideFolder', 'apps', 'results', 'tabs', 'bookmarks', 'windows', 'menu']) {
    for (const entry of config[key] || []) if (entry?.id) ids.add(entry.id)
  }
  return ids
}

// Simulation goals whose `target` names something the config lists, rather than
// a fixed part of the interface (a place in the sidebar, a toolbar button…).
const TARGET_IN_CONFIG = new Set([
  'click', 'doubleclick', 'longpress', 'menu', 'open', 'identify', 'move',
  'rename', 'close', 'minimize', 'maximize', 'restore', 'switch',
  'switchtab', 'closetab', 'openbookmark', 'pickresult',
])

const seenIds = new Set()

for (const mod of MODULES) {
  for (const key of ['title', 'subtitle']) checkText(mod[key], `${mod.id}.${key}`)
  if (!mod.lessons?.length) fail(mod.id, 'module has no lessons')

  for (const lesson of mod.lessons) {
    const L = lesson.id
    if (seenIds.has(L)) fail(L, 'duplicate lesson id')
    seenIds.add(L)
    if (!L?.startsWith(mod.id + '-')) fail(L, `lesson id should start with "${mod.id}-"`)
    checkText(lesson.title, `${L}.title`)
    if (!lesson.emoji) fail(L, 'missing emoji')
    if (!lesson.minutes) fail(L, 'missing minutes')
    if (!lesson.steps?.length) fail(L, 'lesson has no steps')

    lesson.steps.forEach((step, i) => {
      const S = `${L} step ${i + 1} (${step.type})`

      if (step.visual) {
        if (step.visual.art && !ART_NAMES.includes(step.visual.art))
          fail(S, `unknown art "${step.visual.art}"`)
        if (step.visual.sim && !SIMS.includes(step.visual.sim))
          fail(S, `unknown sim "${step.visual.sim}"`)
        if (!step.visual.art && !step.visual.sim) fail(S, 'visual has neither art nor sim')
      }

      switch (step.type) {
        case 'teach':
          checkText(step.title, `${S}.title`)
          checkText(step.body, `${S}.body`)
          checkText(step.callout, `${S}.callout`)
          if (!step.body?.length) fail(S, 'teach step has no body')
          break

        case 'recap':
          if (!step.points?.length) fail(S, 'recap has no points')
          checkText(step.points, `${S}.points`)
          break

        case 'choice': {
          checkText(step.prompt, `${S}.prompt`)
          const correct = (step.options || []).filter((o) => o.correct)
          if (correct.length !== 1) fail(S, `has ${correct.length} correct options, expected 1`)
          if ((step.options || []).length < 2) fail(S, 'needs at least two options')
          const ids = new Set()
          for (const o of step.options || []) {
            if (ids.has(o.id)) fail(S, `duplicate option id "${o.id}"`)
            ids.add(o.id)
            checkText(o.label, `${S}.option[${o.id}]`)
            // Every wrong answer must explain itself — that is the whole
            // teaching model, so a missing explanation is a real defect.
            if (!o.correct && !o.why && !step.explain)
              fail(S, `wrong option "${o.id}" has no explanation`)
            checkText(o.why, `${S}.option[${o.id}].why`)
          }
          break
        }

        case 'sort': {
          checkText(step.prompt, `${S}.prompt`)
          const buckets = new Set((step.buckets || []).map((b) => b.id))
          if (buckets.size < 2) fail(S, 'needs at least two buckets')
          for (const b of step.buckets || []) checkText(b.label, `${S}.bucket[${b.id}]`)
          if (!step.items?.length) fail(S, 'sort step has no items')
          for (const it of step.items || []) {
            checkText(it.label, `${S}.item[${it.id}]`)
            if (!buckets.has(it.bucket)) fail(S, `item "${it.id}" points at unknown bucket "${it.bucket}"`)
            if (!it.why && !step.explain) fail(S, `item "${it.id}" has no explanation`)
            checkText(it.why, `${S}.item[${it.id}].why`)
          }
          break
        }

        case 'sim': {
          checkText(step.prompt, `${S}.prompt`)
          checkText(step.footerHint, `${S}.footerHint`)
          if (!SIMS.includes(step.sim)) fail(S, `unknown sim "${step.sim}"`)
          const cfg = step.config || {}
          if (step.sim === 'keys') {
            if (!cfg.combo) fail(S, 'keys sim has no combo')
            const combos = cfg.combo?.[DEV] ? [cfg.combo.windows, cfg.combo.mac] : [cfg.combo]
            for (const combo of combos) {
              if (!Array.isArray(combo) || combo.length < 2) {
                fail(S, 'combo must list a modifier and a key')
                continue
              }
              const last = combo[combo.length - 1]
              if (!(cfg.letters || []).includes(last))
                fail(S, `combo ends in "${last}" but that key is not on the keyboard shown`)
            }
            if (cfg.then === 'switcher' && !(cfg.apps || []).some((a) => a.id === cfg.target))
              fail(S, `switcher target "${cfg.target}" is not among the apps shown`)
          } else if (TARGET_IN_CONFIG.has(cfg.goal)) {
            const ids = simTargets(cfg)
            if (!cfg.target) fail(S, `goal "${cfg.goal}" needs a target`)
            else if (!ids.has(cfg.target))
              fail(S, `target "${cfg.target}" is not in the config (has: ${[...ids].join(', ') || 'nothing'})`)
            if (cfg.goal === 'move' && !ids.has(cfg.moveTo))
              fail(S, `moveTo "${cfg.moveTo}" is not in the config`)
            if ((cfg.goal === 'menu' || cfg.goal === 'rename') && !(cfg.menu || []).some((m) => m.id === cfg.menuTarget))
              fail(S, `menuTarget "${cfg.menuTarget}" is not in the menu`)
          }
          if (cfg.goal === 'newfolder' || cfg.goal === 'rename') {
            if (!cfg.newName) fail(S, 'naming step has no newName to check against')
            checkText(cfg.newName, `${S}.newName`)
          }
          break
        }

        default:
          fail(S, `unknown step type "${step.type}"`)
      }
    })

    // A lesson people can actually fail should also tell them what they learned.
    if (!lesson.steps.some((s) => s.type === 'recap')) fail(L, 'lesson has no recap step')
  }
}

console.log(`Checked ${MODULES.length} modules, ${LESSON_ORDER.length} lessons.`)
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n - ` + problems.join('\n - '))
  process.exit(1)
}
console.log('No problems found.')
