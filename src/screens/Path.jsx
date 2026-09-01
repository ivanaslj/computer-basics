import { useState } from 'react'
import { useApp } from '../state/store'
import { useT, useTx } from '../i18n'
import { Button, Card, Sheet, ProgressBar, Check, Lock, Gear, Flame, ChevronLeft } from '../components/ui'

/**
 * Home. Three jobs, in order of importance:
 *   1. One obvious button that continues where they left off.
 *   2. A picture of the whole course, so it feels finite and mapped out.
 *   3. Which lessons are done, which is next, which come later.
 */

const ROW = 142 // px between lesson nodes — enough for a two-line title under each
const OFFSETS = [0, 54, 76, 54, 0, -54, -76, -54] // the gentle S-curve

export default function Path({ onOpenLesson, onOpenSettings, onOpenHub }) {
  const t = useT()
  const tx = useTx()
  const { course, overall, streak, nextLessonId, isUnlocked, courseFinished } = useApp()
  const [locked, setLocked] = useState(null)

  const next = course.getLesson(nextLessonId)
  const started = overall.done > 0

  const tapLesson = (lesson) => {
    if (isUnlocked(lesson.id)) return onOpenLesson(lesson.id)
    const blockerId = course.LESSON_ORDER[course.LESSON_ORDER.indexOf(lesson.id) - 1]
    setLocked({ lesson, blocker: course.getLesson(blockerId) })
  }

  return (
    <div className="mx-auto min-h-dvh max-w-lg pb-16">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b-2 border-line bg-cream/90 px-5 pt-[max(0.9rem,env(safe-area-inset-top))] pb-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenHub}
            aria-label={t('backToHub')}
            className="-ml-1.5 rounded-full p-1.5 text-ink-soft active:bg-cream-deep"
          >
            <ChevronLeft />
          </button>
          <h1 className="flex-1 truncate text-[1.15rem] font-extrabold tracking-tight">
            {tx(course.title)}
          </h1>
          {streak.count > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-sun-soft px-3 py-1 text-sm font-extrabold text-sun">
              <Flame className="h-4 w-4" />
              {streak.count}
            </span>
          )}
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label={t('settings')}
            className="rounded-full p-1.5 text-ink-soft active:bg-cream-deep"
          >
            <Gear />
          </button>
        </div>
        <div className="mt-2.5 flex items-center gap-3">
          <ProgressBar value={overall.pct} className="flex-1" />
          <span className="text-sm font-bold whitespace-nowrap text-ink-soft tabular-nums">
            {overall.done}/{overall.total}
          </span>
        </div>
      </header>

      {/* Continue card */}
      <div className="px-5 pt-5">
        {courseFinished ? (
          <Card tone="grass" className="text-center">
            <p className="text-3xl" aria-hidden="true">
              🎉
            </p>
            <h2 className="mt-2 text-xl leading-tight font-extrabold">{t('courseDoneTitle')}</h2>
            <p className="mt-1 leading-snug text-ink-soft">{t('courseDoneBody')}</p>
          </Card>
        ) : (
          next && (
            <Card tone="brand" className="flex flex-col gap-3">
              <p className="text-sm font-bold tracking-wide text-brand uppercase">
                {tx(next.module.title)}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-4xl" aria-hidden="true">
                  {next.lesson.emoji}
                </span>
                <div className="min-w-0">
                  <h2 className="text-[1.3rem] leading-tight font-extrabold text-balance">
                    {tx(next.lesson.title)}
                  </h2>
                  <p className="text-sm font-semibold text-ink-soft">
                    {t('minutes', { n: next.lesson.minutes })}
                  </p>
                </div>
              </div>
              <Button full onClick={() => onOpenLesson(next.lesson.id)}>
                {started ? t('continueLesson') : t('startLesson')}
              </Button>
            </Card>
          )
        )}
      </div>

      {/* The path */}
      {course.MODULES.map((mod) => (
        <ModuleSection key={mod.id} mod={mod} onTapLesson={tapLesson} />
      ))}

      <LockedSheet locked={locked} onClose={() => setLocked(null)} onOpenLesson={onOpenLesson} />
    </div>
  )
}

function ModuleSection({ mod, onTapLesson }) {
  const t = useT()
  const tx = useTx()
  const { moduleProgress, isCompleted, isUnlocked, nextLessonId } = useApp()
  const prog = moduleProgress(mod.id)
  const finished = prog.done === prog.total

  return (
    <section className="px-5 pt-8">
      <div
        className={`rounded-3xl border-2 p-5 ${
          finished ? 'border-grass/25 bg-grass-soft' : 'border-line bg-white'
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl" aria-hidden="true">
            {mod.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold tracking-widest text-ink-soft uppercase">
              {tx({ en: `Module ${mod.number}`, es: `Módulo ${mod.number}` })}
            </p>
            <h2 className="text-[1.25rem] leading-tight font-extrabold text-balance">
              {tx(mod.title)}
            </h2>
            <p className="mt-0.5 text-[0.95rem] leading-snug text-ink-soft text-pretty">
              {tx(mod.subtitle)}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <ProgressBar value={prog.pct} className="flex-1" />
          <span className="text-sm font-bold whitespace-nowrap text-ink-soft tabular-nums">
            {finished ? t('moduleDone') : `${prog.done}/${prog.total}`}
          </span>
        </div>
      </div>

      {/* Zig-zag of lesson nodes, with dotted joins between them */}
      <div className="relative mt-2" style={{ height: mod.lessons.length * ROW }}>
        {mod.lessons.map((lesson, i) => {
          const x = OFFSETS[i % OFFSETS.length]
          const nx = OFFSETS[(i + 1) % OFFSETS.length]
          const cy = i * ROW + ROW / 2
          return (
            <div key={lesson.id}>
              {i < mod.lessons.length - 1 &&
                [0.3, 0.5, 0.7].map((f) => (
                  <span
                    key={f}
                    aria-hidden="true"
                    className="absolute h-2 w-2 -translate-x-1/2 rounded-full bg-line"
                    style={{ left: `calc(50% + ${x + (nx - x) * f}px)`, top: cy + ROW * f }}
                  />
                ))}
              <LessonNode
                lesson={lesson}
                x={x}
                y={cy}
                done={isCompleted(lesson.id)}
                current={lesson.id === nextLessonId}
                unlocked={isUnlocked(lesson.id)}
                onTap={() => onTapLesson(lesson)}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

function LessonNode({ lesson, x, y, done, current, unlocked, onTap }) {
  const t = useT()
  const tx = useTx()
  const title = tx(lesson.title)

  const face = done
    ? 'bg-grass text-white shadow-[0_5px_0_var(--color-grass-dark)]'
    : current
      ? 'bg-brand text-white shadow-[0_5px_0_var(--color-brand-dark)]'
      : unlocked
        ? 'bg-white text-ink border-2 border-line shadow-[0_5px_0_var(--color-line)]'
        : 'bg-cream-deep text-ink-soft/60 shadow-none'

  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
      style={{ left: `calc(50% + ${x}px)`, top: y, width: 140 }}
    >
      <button
        type="button"
        onClick={onTap}
        aria-label={`${title}${!unlocked ? ` — ${t('locked')}` : ''}`}
        className={`btn-3d relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full text-[1.9rem] ${face} ${
          current ? 'anim-halo' : ''
        }`}
      >
        {unlocked ? (
          <span aria-hidden="true">{lesson.emoji}</span>
        ) : (
          <Lock className="h-7 w-7" />
        )}
        {done && (
          <span className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-cream bg-grass-dark text-white">
            <Check className="h-4 w-4" />
          </span>
        )}
      </button>
      <span
        className={`text-center text-[0.8rem] leading-[1.15] font-bold text-balance ${
          unlocked ? 'text-ink' : 'text-ink-soft/70'
        }`}
      >
        {title}
      </span>
    </div>
  )
}

function LockedSheet({ locked, onClose, onOpenLesson }) {
  const t = useT()
  const tx = useTx()
  if (!locked) return null
  return (
    <Sheet open onClose={onClose} title={t('lockedTitle')}>
      <p className="mb-5 leading-snug text-ink-soft">
        {t('lockedBody', { lesson: tx(locked.blocker?.lesson.title) })}
      </p>
      <div className="flex flex-col gap-3">
        <Button
          full
          onClick={() => {
            onClose()
            onOpenLesson(locked.blocker.lesson.id)
          }}
        >
          {t('lockedGoto')}
        </Button>
        {/* An escape hatch: locking is guidance, not a rule to fight with. */}
        <Button
          full
          variant="neutral"
          onClick={() => {
            onClose()
            onOpenLesson(locked.lesson.id)
          }}
        >
          {t('lockedAnyway')}
        </Button>
      </div>
    </Sheet>
  )
}
