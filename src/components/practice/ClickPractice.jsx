import { useCallback, useEffect, useRef, useState } from 'react'
import { useT } from '../../i18n'
import { Button } from '../ui'
import Icon from '../icons'

/**
 * Aim-trainer style clicking practice, dressed as a desktop.
 *
 * Tone rules, same as the rest of the app: there is no countdown, no lose
 * condition, and a miss costs nothing. A round is a fixed number of targets
 * rather than a ticking clock, so a slow, careful learner and a fast one both
 * finish — one just takes longer, which is the whole point.
 *
 * Difficulty follows the learner rather than a preset curve: targets shrink
 * only while they are being hit cleanly, and grow back after misses. Someone
 * who is struggling never gets a harder target.
 */

const TARGETS_PER_ROUND = 12
const START_SIZE = 26 // % of the board's width
const MIN_SIZE = 11
const MAX_SIZE = 30

const ICONS = ['📁', '🌐', '📧', '🖼️', '📝', '🗑️', '🧮', '🎵']

export default function ClickPractice({ onFinish, best }) {
  const t = useT()
  const [phase, setPhase] = useState('ready') // 'ready' | 'playing' | 'done'
  const [target, setTarget] = useState(null)
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [size, setSize] = useState(START_SIZE)
  const [times, setTimes] = useState([])
  const shownAt = useRef(0)
  const boardRef = useRef(null)

  const placeTarget = useCallback(
    (nextSize) => {
      // Keep the whole icon on the board — position is the top-left corner,
      // so the usable range shrinks as the target grows.
      const max = 100 - nextSize
      setTarget({
        x: Math.random() * max,
        y: Math.random() * max,
        icon: ICONS[Math.floor(Math.random() * ICONS.length)],
        id: Math.random(),
      })
      shownAt.current = performance.now()
    },
    []
  )

  const start = () => {
    setHits(0)
    setMisses(0)
    setTimes([])
    setSize(START_SIZE)
    setPhase('playing')
    placeTarget(START_SIZE)
  }

  const hit = (e) => {
    e.stopPropagation()
    const elapsed = performance.now() - shownAt.current
    const nextHits = hits + 1
    setHits(nextHits)
    setTimes((list) => [...list, elapsed])

    if (nextHits >= TARGETS_PER_ROUND) {
      setPhase('done')
      setTarget(null)
      return
    }
    // Shrink only on a clean, reasonably quick hit — struggling never makes
    // the next target harder.
    const next = elapsed < 2500 ? Math.max(MIN_SIZE, size - 1.2) : size
    setSize(next)
    placeTarget(next)
  }

  const missBoard = () => {
    if (phase !== 'playing') return
    setMisses((m) => m + 1)
    // Grow the target back, so a run of misses actively gets easier rather
    // than leaving someone stuck on a target they cannot hit.
    setSize((s) => Math.min(MAX_SIZE, s + 1.5))
  }

  const avgMs = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0
  const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 100

  // Report the round once, when it finishes.
  const reported = useRef(false)
  useEffect(() => {
    if (phase === 'done' && !reported.current) {
      reported.current = true
      onFinish?.({ best: accuracy })
    }
    if (phase === 'playing') reported.current = false
  }, [phase, accuracy, onFinish])

  if (phase === 'ready') {
    return (
      <Intro
        title={t('clickPracticeTitle')}
        body={t('clickPracticeIntro')}
        best={best}
        bestLabel={t('bestAccuracy')}
        cta={t('practiceStart')}
        onStart={start}
      />
    )
  }

  if (phase === 'done') {
    return (
      <Summary
        stats={[
          { label: t('practiceHits'), value: hits },
          { label: t('practiceAccuracy'), value: `${accuracy}%` },
          { label: t('practiceAvgTime'), value: `${(avgMs / 1000).toFixed(2)}s` },
        ]}
        note={t('practiceNoteClick')}
        cta={t('practiceAgain')}
        onAgain={start}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <StatBar
        items={[
          { label: t('practiceHits'), value: `${hits}/${TARGETS_PER_ROUND}` },
          { label: t('practiceAccuracy'), value: `${accuracy}%` },
        ]}
      />

      <div
        ref={boardRef}
        onPointerDown={missBoard}
        className="relative aspect-square w-full overflow-hidden rounded-[1.4rem] border-2 border-line"
        style={{
          background: 'linear-gradient(160deg,#123a63 0%,#1c6fa8 55%,#2aa3b8 100%)',
          touchAction: 'none',
          containerType: 'inline-size',
        }}
      >
        {target && (
          <button
            key={target.id}
            type="button"
            onPointerDown={hit}
            aria-label={t('practiceTargetLabel')}
            className="anim-pop absolute flex items-center justify-center rounded-[18%] bg-white/95 shadow-lg active:scale-95"
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
              width: `${size}%`,
              height: `${size}%`,
            }}
          >
            {/* cqw keeps the glyph proportional to the board at any screen size */}
            <span aria-hidden="true" style={{ fontSize: `${size * 0.5}cqw` }}>
              {target.icon}
            </span>
          </button>
        )}
      </div>

      <p className="text-center text-[0.95rem] leading-snug font-semibold text-ink-soft">
        {t('clickPracticeHint')}
      </p>
    </div>
  )
}

/* --------------------------------------------------- shared little pieces */

export function StatBar({ items }) {
  return (
    <div className="flex gap-3">
      {items.map((it) => (
        <div key={it.label} className="flex-1 rounded-2xl border-2 border-line bg-surface px-3 py-2 text-center">
          <div className="text-xs font-bold tracking-wide text-ink-soft uppercase">{it.label}</div>
          <div className="text-[1.3rem] leading-tight font-extrabold tabular-nums">{it.value}</div>
        </div>
      ))}
    </div>
  )
}

export function Intro({ title, body, best, bestLabel, cta, onStart }) {
  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      <h2 className="text-[1.5rem] leading-tight font-extrabold tracking-tight text-balance">{title}</h2>
      <p className="text-[1.05rem] leading-relaxed text-ink-soft text-pretty">{body}</p>
      {best > 0 && (
        <p className="rounded-full bg-cream-deep px-4 py-2 text-sm font-bold text-ink-soft">
          {bestLabel}: {best}
        </p>
      )}
      <Button full onClick={onStart}>
        {cta}
      </Button>
    </div>
  )
}

export function Summary({ stats, note, cta, onAgain }) {
  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-grass-soft text-grass">
        <Icon name="trophy" className="h-9 w-9" />
      </span>
      <div className="flex w-full gap-3">
        {stats.map((s) => (
          <div key={s.label} className="flex-1 rounded-2xl border-2 border-grass/25 bg-grass-soft px-2 py-3">
            <div className="text-xs font-bold tracking-wide text-ink-soft uppercase">{s.label}</div>
            <div className="text-[1.35rem] leading-tight font-extrabold tabular-nums">{s.value}</div>
          </div>
        ))}
      </div>
      <p className="text-[1.02rem] leading-snug text-ink-soft text-pretty">{note}</p>
      <Button full variant="success" onClick={onAgain}>
        {cta}
      </Button>
    </div>
  )
}
