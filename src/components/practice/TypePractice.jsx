import { useEffect, useMemo, useRef, useState } from 'react'
import { useT, useLocale } from '../../i18n'
import { Button } from '../ui'
import { Summary, StatBar } from './ClickPractice'
import { TYPING_STAGES, buildText } from './typingContent'

/**
 * Typing practice in the MonkeyType shape — type the shown text, characters
 * light up right or wrong as you go, WPM and accuracy at the end.
 *
 * Three stages, chosen by the learner rather than unlocked in sequence:
 * home-row letters, then everyday words, then real sentences. Someone who can
 * already type shouldn't have to sit through the letters.
 *
 * Mistakes are shown but never block progress — you can keep typing past an
 * error, exactly like the real thing. There is no timer and no fail state;
 * the round ends when the text is finished.
 */

export default function TypePractice({ onFinish, best }) {
  const t = useT()
  const { lang } = useLocale()

  const [stage, setStage] = useState('words')
  const [phase, setPhase] = useState('ready') // 'ready' | 'playing' | 'done'
  const [text, setText] = useState('')
  const [typed, setTyped] = useState('')
  const startedAt = useRef(0)
  const [elapsed, setElapsed] = useState(0)
  const inputRef = useRef(null)

  const start = (nextStage = stage) => {
    setStage(nextStage)
    setText(buildText(nextStage, lang))
    setTyped('')
    setElapsed(0)
    startedAt.current = 0
    setPhase('playing')
    // The hidden input is what actually receives keystrokes; focusing it is
    // what makes a phone raise its keyboard.
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const onChange = (e) => {
    const value = e.target.value
    if (!startedAt.current && value.length > 0) startedAt.current = performance.now()
    if (value.length > text.length) return
    setTyped(value)
    if (value.length === text.length) {
      setElapsed((performance.now() - startedAt.current) / 1000)
      setPhase('done')
    }
  }

  const { correct, wrong } = useMemo(() => {
    let c = 0
    let w = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === text[i]) c++
      else w++
    }
    return { correct: c, wrong: w }
  }, [typed, text])

  const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100
  // Standard WPM: five characters counts as one "word".
  const wpm = elapsed > 0 ? Math.round(correct / 5 / (elapsed / 60)) : 0

  const reported = useRef(false)
  useEffect(() => {
    if (phase === 'done' && !reported.current) {
      reported.current = true
      // A pasted answer (or a stuck key) can produce a number no human could
      // reach, and a personal best you can never beat is worse than none —
      // so implausible runs are shown but not saved. The world record is
      // around 220wpm; anything past 250 did not come from typing.
      const plausible = wpm > 0 && wpm <= 250
      onFinish?.(plausible ? { bestWpm: wpm, bestAccuracy: accuracy } : {})
    }
    if (phase === 'playing') reported.current = false
  }, [phase, wpm, accuracy, onFinish])

  /* ------------------------------------------------------------- screens */

  if (phase === 'ready') {
    return (
      <div className="flex flex-col gap-5 py-4">
        <div className="text-center">
          <h2 className="text-[1.5rem] leading-tight font-extrabold tracking-tight text-balance">
            {t('typePracticeTitle')}
          </h2>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-soft text-pretty">
            {t('typePracticeIntro')}
          </p>
        </div>

        {best > 0 && (
          <p className="self-center rounded-full bg-cream-deep px-4 py-2 text-sm font-bold text-ink-soft">
            {t('bestWpm')}: {best}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold tracking-wide text-ink-soft uppercase">{t('typeChooseStage')}</p>
          {TYPING_STAGES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => start(s)}
              className="btn-3d rounded-2xl border-2 border-b-4 border-line bg-white px-5 py-4 text-left"
            >
              <span className="block text-[1.05rem] font-extrabold">{t(`typeStage_${s}`)}</span>
              <span className="block text-[0.95rem] leading-snug text-ink-soft">
                {t(`typeStageHint_${s}`)}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <Summary
        stats={[
          { label: t('typeWpm'), value: wpm },
          { label: t('practiceAccuracy'), value: `${accuracy}%` },
          { label: t('typeMistakes'), value: wrong },
        ]}
        note={t('practiceNoteType')}
        cta={t('practiceAgain')}
        onAgain={() => start()}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <StatBar
        items={[
          { label: t('typeProgress'), value: `${typed.length}/${text.length}` },
          { label: t('practiceAccuracy'), value: `${accuracy}%` },
        ]}
      />

      {/* Tapping anywhere on the text refocuses the hidden input, so a phone
          keyboard that got dismissed can be brought back without hunting. */}
      <button
        type="button"
        onClick={() => inputRef.current?.focus()}
        className="rounded-[1.4rem] border-2 border-line bg-white p-5 text-left"
      >
        <p className="text-[1.25rem] leading-[1.9] font-medium tracking-wide break-words">
          {text.split('').map((ch, i) => {
            const state = i < typed.length ? (typed[i] === ch ? 'ok' : 'bad') : i === typed.length ? 'next' : 'todo'
            return (
              <span
                key={i}
                className={
                  state === 'ok'
                    ? 'text-grass'
                    : state === 'bad'
                      ? 'rounded bg-berry-soft text-berry underline decoration-berry decoration-2'
                      : state === 'next'
                        ? 'rounded bg-brand/20 text-ink underline decoration-brand decoration-2'
                        : 'text-ink-soft/45'
                }
              >
                {ch}
              </span>
            )
          })}
        </p>
      </button>

      <input
        ref={inputRef}
        value={typed}
        onChange={onChange}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck="false"
        aria-label={t('typeInputLabel')}
        // Off-screen rather than display:none — a hidden input cannot be
        // focused, and focus is what raises the on-screen keyboard.
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      <div className="flex items-center gap-3">
        <p className="flex-1 text-[0.95rem] leading-snug font-semibold text-ink-soft">
          {t('typePracticeHint')}
        </p>
        <Button size="md" variant="neutral" onClick={() => start()}>
          {t('typeRestart')}
        </Button>
      </div>
    </div>
  )
}
