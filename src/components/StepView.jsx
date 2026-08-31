import { useState } from 'react'
import { RichText, Card } from './ui'
import Art from './Art'
import { getSim } from './sims'
import { useT, useTx } from '../i18n'

/**
 * Renders one step of a lesson. Every step type reports back through the same
 * two callbacks — `onSolved` and `onMistake(message)` — so the lesson player
 * doesn't need to know what kind of step it is showing.
 */
export default function StepView({ step, solved, showHint, onSolved, onMistake }) {
  switch (step.type) {
    case 'teach':
      return <TeachStep step={step} />
    case 'recap':
      return <RecapStep step={step} />
    case 'choice':
      return <ChoiceStep step={step} solved={solved} showHint={showHint} onSolved={onSolved} onMistake={onMistake} />
    case 'sort':
      return <SortStep step={step} solved={solved} showHint={showHint} onSolved={onSolved} onMistake={onMistake} />
    case 'sim':
      return <SimStep step={step} solved={solved} showHint={showHint} onSolved={onSolved} onMistake={onMistake} />
    default:
      return null
  }
}

/* ------------------------------------------------------------------ Visual */

function Visual({ visual }) {
  if (!visual) return null
  if (visual.art) return <Art name={visual.art} />
  const Sim = getSim(visual.sim)
  if (!Sim) return null
  // Illustrative sims are frozen: they show the interface without inviting a
  // tap, so the learner reads first and practises on the next step.
  return <Sim config={visual.config} solved showHint={false} />
}

/* ------------------------------------------------------------------- Teach */

function TeachStep({ step }) {
  const tx = useTx()
  const body = Array.isArray(step.body) ? step.body : [step.body]
  return (
    <div className="flex flex-col gap-5">
      {step.title && (
        <h2 className="text-[1.6rem] leading-[1.2] font-extrabold tracking-tight text-balance">
          {tx(step.title)}
        </h2>
      )}
      {step.visual && <Visual visual={step.visual} />}
      <div className="flex flex-col gap-4">
        {body.map((line, i) => (
          <p key={i} className="text-[1.08rem] leading-[1.6] text-ink">
            <RichText>{tx(line)}</RichText>
          </p>
        ))}
      </div>
      {step.callout && (
        <Card tone={step.calloutTone || 'sun'} className="flex gap-3">
          <span className="shrink-0 text-2xl" aria-hidden="true">
            {step.calloutEmoji || '💡'}
          </span>
          <p className="text-[1rem] leading-snug">
            <RichText>{tx(step.callout)}</RichText>
          </p>
        </Card>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ Recap */

function RecapStep({ step }) {
  const t = useT()
  const tx = useTx()
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[1.6rem] leading-[1.2] font-extrabold tracking-tight">
        {tx(step.title) || t('youLearned')}
      </h2>
      <ul className="flex flex-col gap-3">
        {step.points.map((p, i) => (
          <li key={i} className="flex gap-3 rounded-2xl border-2 border-grass/20 bg-grass-soft p-4">
            <span className="shrink-0 text-xl" aria-hidden="true">
              ✅
            </span>
            <span className="text-[1.02rem] leading-snug">
              <RichText>{tx(p)}</RichText>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ----------------------------------------------------------------- Choice */

function ChoiceStep({ step, solved, showHint, onSolved, onMistake }) {
  const t = useT()
  const tx = useTx()
  const [tried, setTried] = useState([])

  const answer = (opt) => {
    if (solved) return
    setTried((list) => (list.includes(opt.id) ? list : [...list, opt.id]))
    if (opt.correct) onSolved?.()
    else onMistake?.(tx(opt.why || step.explain))
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[1.4rem] leading-[1.25] font-extrabold tracking-tight text-balance">
        <RichText>{tx(step.prompt)}</RichText>
      </h2>
      {step.visual && <Visual visual={step.visual} />}
      <p className="-mb-2 text-sm font-bold tracking-wide text-ink-soft uppercase">
        {t('tapTheAnswer')}
      </p>
      <div className="flex flex-col gap-3">
        {step.options.map((opt) => {
          const isRight = solved && opt.correct
          const isWrong = tried.includes(opt.id) && !opt.correct
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => answer(opt)}
              disabled={solved}
              className={`rounded-2xl border-2 border-b-4 px-5 py-4 text-left text-[1.05rem] leading-snug font-semibold transition active:translate-y-[2px] ${
                isRight
                  ? 'border-grass bg-grass-soft text-ink'
                  : isWrong
                    ? 'anim-nudge border-berry/50 bg-berry-soft text-ink-soft'
                    : 'border-line bg-white text-ink'
              } ${showHint && opt.correct && !solved ? 'anim-halo border-brand' : ''}`}
            >
              <span className="flex items-center gap-3">
                {opt.emoji && (
                  <span className="text-2xl" aria-hidden="true">
                    {opt.emoji}
                  </span>
                )}
                <RichText>{tx(opt.label)}</RichText>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- Sort */

function SortStep({ step, solved, showHint, onSolved, onMistake }) {
  const tx = useTx()
  const [index, setIndex] = useState(0)
  const [placed, setPlaced] = useState({})

  const item = step.items[index]

  const choose = (bucketId) => {
    if (solved || !item) return
    if (bucketId !== item.bucket) {
      onMistake?.(tx(item.why || step.explain))
      return
    }
    const next = { ...placed, [item.id]: bucketId }
    setPlaced(next)
    if (index + 1 >= step.items.length) onSolved?.()
    else setIndex(index + 1)
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[1.4rem] leading-[1.25] font-extrabold tracking-tight text-balance">
        <RichText>{tx(step.prompt)}</RichText>
      </h2>

      <p className="-mb-2 text-sm font-bold tracking-wide text-ink-soft uppercase">
        {tx({ en: `Item ${index + 1} of ${step.items.length}`, es: `Elemento ${index + 1} de ${step.items.length}` })}
      </p>

      <div
        key={item?.id}
        className="anim-pop flex flex-col items-center gap-2 rounded-3xl border-2 border-line bg-white px-5 py-7 text-center"
      >
        <span className="text-5xl" aria-hidden="true">
          {item?.emoji}
        </span>
        <span className="text-[1.2rem] leading-tight font-extrabold">{tx(item?.label)}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {step.buckets.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => choose(b.id)}
            disabled={solved}
            className={`rounded-2xl border-2 border-b-4 border-line bg-white px-4 py-5 text-center leading-tight font-extrabold active:translate-y-[2px] ${
              showHint && item?.bucket === b.id && !solved ? 'anim-halo border-brand' : ''
            }`}
          >
            <span className="block text-2xl" aria-hidden="true">
              {b.emoji}
            </span>
            <span className="mt-1 block text-[1rem]">{tx(b.label)}</span>
          </button>
        ))}
      </div>

      {/* A quiet record of what's already been sorted, so progress feels real. */}
      {Object.keys(placed).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {step.items
            .filter((i) => placed[i.id])
            .map((i) => (
              <span
                key={i.id}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-grass/25 bg-grass-soft px-3 py-1.5 text-sm font-bold"
              >
                <span aria-hidden="true">{i.emoji}</span>
                {tx(i.label)}
              </span>
            ))}
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------- Sim */

function SimStep({ step, solved, showHint, onSolved, onMistake }) {
  const t = useT()
  const tx = useTx()
  const Sim = getSim(step.sim)
  if (!Sim) return null
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-bold tracking-wide text-brand uppercase">{t('yourTurn')}</p>
      <h2 className="text-[1.3rem] leading-[1.3] font-extrabold tracking-tight text-balance">
        <RichText>{tx(step.prompt)}</RichText>
      </h2>
      <Sim
        config={step.config}
        solved={solved}
        showHint={showHint}
        onSolved={onSolved}
        onMistake={onMistake}
      />
    </div>
  )
}
