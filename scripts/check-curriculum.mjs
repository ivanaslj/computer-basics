/**
 * Checks the whole course for the mistakes that are easy to make in content and
 * invisible until a learner hits that one step: a simulation whose target isn't
 * on screen, a multiple choice with no right answer, a missing translation.
 *
 * Run with `npm run check`.
 */
import { COURSES } from '../src/courses/index.js'
import { STRINGS } from '../src/i18n/strings.js'
import { SIMS } from '../src/components/sims/registry.js'
import { ART_NAMES } from '../src/components/art-names.js'
import { ICON_NAMES } from '../src/components/icons/names.js'

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

let totalModules = 0
let totalLessons = 0
const courseIds = new Set()

for (const course of COURSES) {
  if (courseIds.has(course.id)) fail('courses', `duplicate course id "${course.id}"`)
  courseIds.add(course.id)
  checkText(course.title, `${course.id}.title`)
  checkText(course.subtitle, `${course.id}.subtitle`)
  if (!course.icon) fail(course.id, 'missing icon')
  else if (!ICON_NAMES.includes(course.icon)) fail(course.id, `unknown icon "${course.icon}"`)
  if (!['available', 'coming-soon'].includes(course.status))
    fail(course.id, `unknown status "${course.status}"`)

  // Coming-soon courses are stubs on purpose — only check they're well-formed
  // enough to render in the Hub, not the full content rules below.
  if (course.status === 'coming-soon') continue

  totalModules += course.MODULES.length
  totalLessons += course.LESSON_ORDER.length
  // Lesson ids only need to be unique within their own course — resetting
  // per course means one course's naming choices can never collide with
  // another's.
  const seenIds = new Set()

  for (const mod of course.MODULES) {
  for (const key of ['title', 'subtitle']) checkText(mod[key], `${course.id}/${mod.id}.${key}`)
  if (!mod.icon) fail(`${course.id}/${mod.id}`, 'missing icon')
  else if (!ICON_NAMES.includes(mod.icon)) fail(`${course.id}/${mod.id}`, `unknown icon "${mod.icon}"`)
  if (!mod.lessons?.length) fail(`${course.id}/${mod.id}`, 'module has no lessons')

  for (const lesson of mod.lessons) {
    const L = `${course.id}/${lesson.id}`
    if (seenIds.has(lesson.id)) fail(L, 'duplicate lesson id within this course')
    seenIds.add(lesson.id)
    if (!lesson.id?.startsWith(mod.id + '-')) fail(L, `lesson id should start with "${mod.id}-"`)
    checkText(lesson.title, `${L}.title`)
    if (!lesson.icon) fail(L, 'missing icon')
    else if (!ICON_NAMES.includes(lesson.icon)) fail(L, `unknown icon "${lesson.icon}"`)
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
          // An unknown name silently falls back to the default bulb, which
          // looks fine and hides the typo — so check it here instead.
          if (step.calloutIcon && !ICON_NAMES.includes(step.calloutIcon))
            fail(S, `unknown calloutIcon "${step.calloutIcon}"`)
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
          } else if (step.sim === 'signup') {
            if (!['fill', 'password'].includes(cfg.goal))
              fail(S, `signup sim has unknown goal "${cfg.goal}"`)
            if (!cfg.site?.url) fail(S, 'signup sim has no site.url to show in the address bar')
            checkText(cfg.site?.name, `${S}.site.name`)

            // "Show me how" has to have something to spell out. Same rule as
            // newName below: a learner who cannot invent an email address on
            // the spot otherwise has no way forward at all.
            if (cfg.goal === 'fill' && !cfg.hintEmail)
              fail(S, 'signup sim has no hintEmail for "Show me how" to spell out')
            if (!cfg.hintPassword)
              fail(S, 'signup sim has no hintPassword for "Show me how" to spell out')
            checkText(cfg.hintEmail, `${S}.hintEmail`)
            checkText(cfg.hintPassword, `${S}.hintPassword`)

            if (cfg.minPassword != null && cfg.minPassword < 8)
              fail(S, `minPassword ${cfg.minPassword} is weaker than the app's own rule of 8`)

            // The whole point of the scam lesson. A practice step must never
            // ask a beginner to type a password into a page the simulation is
            // itself drawing as a fake — that trains the exact reflex m5-l3
            // spends six minutes removing. To show a fake page, hang it off a
            // choice step as a frozen `visual` instead, where the question is
            // whether to type at all.
            if (cfg.site?.secure === false)
              fail(S, 'a signup practice step must not use an insecure site — make it a frozen visual on a choice step')
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

        case 'action':
          checkText(step.title, `${S}.title`)
          checkText(step.body, `${S}.body`)
          checkText(step.copyText, `${S}.copyText`)
          checkText(step.linkLabel, `${S}.linkLabel`)
          // The instructions are the substance of an action step. copyText and
          // linkUrl are optional extras — plenty of real tasks ("open Word and
          // write a one-page memo") have nothing to copy and nowhere to link.
          if (!step.body) fail(S, 'action step has no body — the instructions are the whole step')
          if (step.linkUrl && !/^https:\/\//.test(step.linkUrl)) fail(S, `linkUrl "${step.linkUrl}" should be a plain https:// URL`)
          break

        default:
          fail(S, `unknown step type "${step.type}"`)
      }
    })

    // A lesson people can actually fail should also tell them what they learned.
    if (!lesson.steps.some((s) => s.type === 'recap')) fail(L, 'lesson has no recap step')
  }
  }
}

// Every string exists in both languages.
//
// The app is used in Spanish first — it was built for one Spanish-speaking
// beginner — so an English-only string is not a cosmetic slip, it is a word she
// cannot read in the middle of a lesson. Nothing enforced this before, and the
// two lists happened to match; this keeps them matching.
const [en, es] = [Object.keys(STRINGS.en), Object.keys(STRINGS.es)]
for (const k of en) if (!STRINGS.es[k]) fail('i18n', `"${k}" is in en but missing from es`)
for (const k of es) if (!STRINGS.en[k]) fail('i18n', `"${k}" is in es but missing from en`)

console.log(`Checked ${COURSES.length} courses, ${totalModules} modules, ${totalLessons} lessons.`)
console.log(`Checked ${en.length} strings in 2 languages.`)
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n - ` + problems.join('\n - '))
  process.exit(1)
}
console.log('No problems found.')
