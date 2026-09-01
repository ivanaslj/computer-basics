import { useEffect, useRef, useState } from 'react'
import { useT } from '../../i18n'
import { Intro, Summary, StatBar } from './ClickPractice'

/**
 * Drag-and-drop practice, training two separate things the learner's own
 * experience flagged:
 *
 *   speed   — short repeated drags, so the motion becomes automatic
 *   holding — some rounds ask the item to be held still on the target for a
 *             moment before it drops, because letting go too early is the
 *             specific thing that keeps failing
 *
 * Releasing early is never a failure. The item goes back and the round
 * carries on — the count of completed drags is the only number that moves.
 *
 * Pointer events rather than HTML5 drag-and-drop, matching `src/lib/gestures.js`
 * and the sims: one code path that behaves the same for mouse and touch.
 */

const DRAGS_PER_ROUND = 8
const HOLD_MS = 900 // how long a "hold to drop" target wants the item held

const ITEMS = [
  { emoji: '🖼️', kind: 'file' },
  { emoji: '📄', kind: 'file' },
  { emoji: '🎵', kind: 'file' },
  { emoji: '📁', kind: 'folder' },
]

const DESTINATIONS = [
  { id: 'documents', emoji: '📁' },
  { id: 'pictures', emoji: '🖼️' },
  { id: 'trash', emoji: '🗑️' },
]

export default function DragPractice({ onFinish, best }) {
  const t = useT()
  const [phase, setPhase] = useState('ready')
  const [round, setRound] = useState(null)
  const [done, setDone] = useState(0)
  const [drops, setDrops] = useState(0) // released early — not penalised, just counted
  const [times, setTimes] = useState([])

  const [dragging, setDragging] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [overTarget, setOverTarget] = useState(false)
  const [holdProgress, setHoldProgress] = useState(0)

  const boardRef = useRef(null)
  const startedAt = useRef(0)
  const holdTimer = useRef(null)
  const holdStart = useRef(0)
  const rafRef = useRef(0)

  const clearHold = () => {
    clearTimeout(holdTimer.current)
    cancelAnimationFrame(rafRef.current)
    holdTimer.current = null
    setHoldProgress(0)
  }

  useEffect(() => () => clearHold(), [])

  const makeRound = (n) => {
    const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
    const dest = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)]
    // Every third drag asks for a sustained hold — enough repetition to
    // practise it without it becoming the whole exercise.
    const needsHold = n > 0 && n % 3 === 2
    return {
      item,
      dest,
      needsHold,
      // Start and target corners vary so the hand travels different paths.
      from: { x: 10 + Math.random() * 25, y: 60 + Math.random() * 22 },
      to: { x: 45 + Math.random() * 35, y: 8 + Math.random() * 22 },
      id: Math.random(),
    }
  }

  const start = () => {
    setDone(0)
    setDrops(0)
    setTimes([])
    setRound(makeRound(0))
    setPhase('playing')
  }

  const completeDrag = () => {
    clearHold()
    const elapsed = performance.now() - startedAt.current
    const next = done + 1
    setTimes((list) => [...list, elapsed])
    setDone(next)
    setDragging(false)
    setOverTarget(false)
    if (next >= DRAGS_PER_ROUND) {
      setPhase('done')
      setRound(null)
    } else {
      setRound(makeRound(next))
    }
  }

  /* ------------------------------------------------------------ pointer */

  const relativePos = (e) => {
    const r = boardRef.current?.getBoundingClientRect()
    if (!r) return { x: 0, y: 0 }
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }
  }

  const onPointerDown = (e) => {
    if (!round) return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    startedAt.current = performance.now()
    setDragging(true)
    setPos(relativePos(e))
  }

  const onPointerMove = (e) => {
    if (!dragging || !round) return
    const p = relativePos(e)
    setPos(p)

    // Within ~13% of the destination centre counts as over it — a generous
    // hit area on purpose, since precision is not what this drills.
    const near = Math.hypot(p.x - (round.to.x + 8), p.y - (round.to.y + 8)) < 15
    if (near === overTarget) return
    setOverTarget(near)

    if (near && round.needsHold) {
      holdStart.current = performance.now()
      const tick = () => {
        const pct = Math.min(1, (performance.now() - holdStart.current) / HOLD_MS)
        setHoldProgress(pct)
        if (pct < 1) rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
      holdTimer.current = setTimeout(completeDrag, HOLD_MS)
    } else {
      clearHold()
    }
  }

  const onPointerUp = () => {
    if (!dragging || !round) return
    clearHold()
    if (overTarget && !round.needsHold) {
      completeDrag()
      return
    }
    // Let go too soon, or somewhere else. Nothing bad happens — the item goes
    // home and they try again.
    setDragging(false)
    setOverTarget(false)
    setDrops((d) => d + 1)
  }

  const avgMs = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0

  const reported = useRef(false)
  useEffect(() => {
    if (phase === 'done' && !reported.current) {
      reported.current = true
      onFinish?.({ best: done })
    }
    if (phase === 'playing') reported.current = false
  }, [phase, done, onFinish])

  if (phase === 'ready') {
    return (
      <Intro
        title={t('dragPracticeTitle')}
        body={t('dragPracticeIntro')}
        best={best}
        bestLabel={t('bestDrags')}
        cta={t('practiceStart')}
        onStart={start}
      />
    )
  }

  if (phase === 'done') {
    return (
      <Summary
        stats={[
          { label: t('practiceDrags'), value: done },
          { label: t('practiceAvgTime'), value: `${(avgMs / 1000).toFixed(1)}s` },
        ]}
        note={t('practiceNoteDrag')}
        cta={t('practiceAgain')}
        onAgain={start}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <StatBar
        items={[
          { label: t('practiceDrags'), value: `${done}/${DRAGS_PER_ROUND}` },
          { label: t('practiceRetries'), value: drops },
        ]}
      />

      <div
        ref={boardRef}
        className="relative aspect-square w-full overflow-hidden rounded-[1.4rem] border-2 border-line"
        style={{
          background: 'linear-gradient(160deg,#123a63 0%,#1c6fa8 55%,#2aa3b8 100%)',
          touchAction: 'none',
          containerType: 'inline-size',
        }}
      >
        {round && (
          <>
            {/* Destination */}
            <div
              className={`absolute flex flex-col items-center justify-center rounded-[1.5cqw] border-[0.6cqw] border-dashed transition ${
                overTarget ? 'scale-110 border-white bg-white/35' : 'border-white/60 bg-white/15'
              }`}
              style={{ left: `${round.to.x}%`, top: `${round.to.y}%`, width: '16%', height: '16%' }}
            >
              <span aria-hidden="true" style={{ fontSize: '7cqw' }}>
                {round.dest.emoji}
              </span>
              {round.needsHold && holdProgress > 0 && (
                <div className="absolute -bottom-[3cqw] h-[1.4cqw] w-[80%] overflow-hidden rounded-full bg-white/30">
                  <div className="h-full rounded-full bg-white" style={{ width: `${holdProgress * 100}%` }} />
                </div>
              )}
            </div>

            {/* The draggable item */}
            <button
              key={round.id}
              type="button"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              aria-label={t('practiceDragLabel')}
              className={`absolute flex items-center justify-center rounded-[18%] bg-white/95 shadow-lg transition-transform ${
                dragging ? 'scale-110' : ''
              }`}
              style={{
                left: `${dragging ? pos.x - 7 : round.from.x}%`,
                top: `${dragging ? pos.y - 7 : round.from.y}%`,
                width: '14%',
                height: '14%',
                touchAction: 'none',
              }}
            >
              <span aria-hidden="true" style={{ fontSize: '6.5cqw' }}>
                {round.item.emoji}
              </span>
            </button>
          </>
        )}
      </div>

      <p className="text-center text-[0.95rem] leading-snug font-semibold text-ink-soft">
        {round?.needsHold ? t('dragPracticeHoldHint') : t('dragPracticeHint')}
      </p>
    </div>
  )
}
