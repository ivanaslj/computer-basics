import { useMemo, useRef, useState } from 'react'
import { useApp } from '../state/store'
import { useT, useTx } from '../i18n'
import StepView from '../components/StepView'
import { RichText, Button, Sheet, Check } from '../components/ui'

/**
 * The lesson player.
 *
 * The rules that shape this screen, all of them for the same reason — this
 * audience gives up when it feels judged:
 *   - Getting something wrong costs nothing. No lives, no score, no timer.
 *   - Every wrong answer explains itself, then lets them try again.
 *   - Help escalates on its own: a hint after one miss, the answer after two.
 *   - Finishing is never in doubt once they've started.
 */

const PRAISE = ['correct', 'correctAlt', 'correctAlt2']

const FRESH_STEP = { index: 0, solved: false, feedback: null, misses: 0, showHint: false }

export default function Lesson({ lessonId, onExit, onNext }) {
  const t = useT()
  const tx = useTx()
  const { course, completeLesson, isCompleted } = useApp()
  const entry = course.getLesson(lessonId)

  // All per-step state moves together, so advancing a step resets it in one
  // update rather than through an effect that fires after a stale render.
  const [current, setCurrent] = useState(FRESH_STEP)
  const { index, solved, feedback, misses, showHint } = current
  const [perfect, setPerfect] = useState(true)
  const [confirmExit, setConfirmExit] = useState(false)
  const [finished, setFinished] = useState(false)
  // Captured before the lesson is marked complete — afterwards every lesson
  // looks like a replay, which would hide the Next button entirely.
  const [wasReplay] = useState(() => isCompleted(lessonId))
  const scrollRef = useRef(null)
  const praiseRef = useRef(0)

  const steps = entry?.lesson.steps ?? []
  const step = steps[index]
  const isPassive = step?.type === 'teach' || step?.type === 'recap'
  const ready = isPassive || solved

  const onSolved = () => {
    if (solved) return
    praiseRef.current = (praiseRef.current + 1) % PRAISE.length
    setCurrent((c) => ({ ...c, solved: true, feedback: { tone: 'right', text: t(PRAISE[praiseRef.current]) } }))
  }

  const onMistake = (message) => {
    setPerfect(false)
    setCurrent((c) => {
      const misses = c.misses + 1
      return {
        ...c,
        misses,
        // Two misses on one step is where frustration starts; from there the
        // answer is offered outright rather than hinted at.
        showHint: c.showHint || misses >= 2,
        feedback: { tone: 'wrong', text: message || t('incorrect') },
      }
    })
  }

  const advance = () => {
    if (index + 1 < steps.length) {
      setCurrent({ ...FRESH_STEP, index: index + 1 })
      scrollRef.current?.scrollTo({ top: 0 })
      return
    }
    completeLesson(lessonId, { perfect })
    setFinished(true)
  }

  const nextId = useMemo(() => course.getNextLessonId(lessonId), [lessonId, course])

  if (!entry) return null

  if (finished) {
    return (
      <Complete
        entry={entry}
        perfect={perfect}
        nextId={nextId}
        onExit={onExit}
        onNext={onNext}
        wasReplay={wasReplay}
      />
    )
  }

  return (
    <div className="mx-auto flex h-dvh max-w-lg flex-col">
      {/* Header: a way out, and how far along they are */}
      <header className="flex items-center gap-4 px-4 pt-[max(0.8rem,env(safe-area-inset-top))] pb-3">
        <button
          type="button"
          onClick={() => setConfirmExit(true)}
          aria-label={t('exit')}
          className="-m-2 p-2 text-2xl leading-none font-bold text-ink-soft"
        >
          ✕
        </button>
        <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-cream-deep">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-300 ease-out"
            style={{ width: `${((index + (ready ? 1 : 0)) / steps.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-ink-soft tabular-nums">
          {index + 1}/{steps.length}
        </span>
      </header>

      {/* Step */}
      <main ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-5 pt-2 pb-6">
        <div key={index} className="anim-pop">
          <StepView
            step={step}
            solved={solved}
            showHint={showHint}
            onSolved={onSolved}
            onMistake={onMistake}
          />
        </div>
      </main>

      {/* Footer: feedback, then the way forward */}
      <footer
        className={`border-t-2 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] transition-colors ${
          feedback?.tone === 'right'
            ? 'border-grass/25 bg-grass-soft'
            : feedback?.tone === 'wrong'
              ? 'border-sun/30 bg-sun-soft'
              : 'border-line bg-cream'
        }`}
      >
        {feedback && (
          <div className="anim-pop mb-3 flex items-start gap-3">
            <span className="shrink-0 text-xl" aria-hidden="true">
              {feedback.tone === 'right' ? '✅' : '💡'}
            </span>
            <p
              className={`text-[1rem] leading-snug font-semibold ${
                feedback.tone === 'right' ? 'text-grass-dark' : 'text-ink'
              }`}
              role="status"
            >
              <RichText>{feedback.text}</RichText>
            </p>
          </div>
        )}

        {ready ? (
          <Button full variant={solved ? 'success' : 'primary'} onClick={advance}>
            {index + 1 === steps.length ? t('done') : t('continue')}
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <p className="flex-1 text-[0.95rem] leading-snug font-semibold text-ink-soft">
              {/* Sim and action steps get their own "how" reminder; answer
                  steps already say what to do above, so after a miss the
                  footer just encourages. */}
              {tx(step.footerHint) ||
                (step.type === 'sim'
                  ? t('yourTurn')
                  : step.type === 'action'
                    ? t('actionFooterHint')
                    : misses > 0
                      ? t('tryAgain')
                      : t('tapTheAnswer'))}
            </p>
            {misses >= 1 && !showHint && (
              <Button
                size="md"
                variant="neutral"
                onClick={() => setCurrent((c) => ({ ...c, showHint: true }))}
              >
                {t('showMe')}
              </Button>
            )}
          </div>
        )}
      </footer>

      <Sheet open={confirmExit} onClose={() => setConfirmExit(false)} title={t('exitTitle')}>
        <p className="mb-5 leading-snug text-ink-soft">{t('exitBody')}</p>
        <div className="flex flex-col gap-3">
          <Button full onClick={() => setConfirmExit(false)}>
            {t('exitStay')}
          </Button>
          <Button full variant="neutral" onClick={onExit}>
            {t('exitLeave')}
          </Button>
        </div>
      </Sheet>
    </div>
  )
}

/* ------------------------------------------------------------- Completion */

function Complete({ entry, perfect, nextId, onExit, onNext, wasReplay }) {
  const t = useT()
  const tx = useTx()
  const { course, overall } = useApp()
  const next = nextId ? course.getLesson(nextId) : null

  return (
    <div className="mx-auto flex h-dvh max-w-lg flex-col justify-between px-6 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <div className="anim-pop flex h-28 w-28 items-center justify-center rounded-full bg-grass text-white shadow-[0_8px_0_var(--color-grass-dark)]">
          <Check className="h-14 w-14" />
        </div>
        <h1 className="text-[2rem] leading-tight font-extrabold tracking-tight text-balance">
          {t('lessonDoneTitle')}
        </h1>
        <p className="text-[1.1rem] leading-snug text-ink-soft text-pretty">
          {perfect ? t('lessonDonePerfect') : t('lessonDoneGood')}
        </p>
        <p className="rounded-full bg-cream-deep px-4 py-2 text-sm font-bold text-ink-soft">
          {tx(entry.module.title)} · {t('lessonsDone', { done: overall.done, total: overall.total })}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {next && !wasReplay && (
          <Button full variant="success" onClick={() => onNext(next.lesson.id)}>
            {t('nextLesson')}: {tx(next.lesson.title)}
          </Button>
        )}
        <Button full variant={next && !wasReplay ? 'neutral' : 'primary'} onClick={onExit}>
          {t('backToPath')}
        </Button>
      </div>
    </div>
  )
}
