import { useEffect, useRef, useState } from 'react'
import { FakeScreen, Wallpaper, SystemChrome, WindowFrame } from './chrome'
import { useTx } from '../../i18n'

/* ------------------------------------------------------------------ Scroll */

/**
 * Scrolling practice. A page taller than the window, with the thing they need
 * hidden below the fold — the point being that "it isn't there" usually means
 * "it's further down".
 */
export function ScrollSim({ config = {}, onSolved, onMistake, showHint, solved }) {
  const tx = useTx()
  const { title, paragraphs = [], targetLabel, decoyLabel } = config
  const scroller = useRef(null)
  const [atBottom, setAtBottom] = useState(false)

  const onScroll = (e) => {
    const el = e.currentTarget
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 24)
  }

  return (
    <FakeScreen label="Practice scrolling">
      <Wallpaper>
        <WindowFrame
          emoji="📄"
          title={tx(title)}
          style={{ left: '6%', top: '5%', width: '88%', height: '78%' }}
          bodyClass="bg-white"
        >
          <div
            ref={scroller}
            onScroll={onScroll}
            className="h-full overflow-y-auto p-[3cqw]"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-[2cqw] text-[3cqw] leading-relaxed text-[#4b4855]">
                {tx(p)}
              </p>
            ))}
            {decoyLabel && (
              <button
                type="button"
                onClick={() =>
                  !solved &&
                  onMistake?.(
                    tx({
                      en: 'Close, but that isn’t the one. Keep going down to the very bottom.',
                      es: 'Cerca, pero no es ese. Sigue bajando hasta el final.',
                    })
                  )
                }
                className="mb-[3cqw] rounded-[1cqw] border-[0.4cqw] border-black/15 px-[2.4cqw] py-[1.2cqw] text-[3cqw] font-bold text-[#4b4855]"
              >
                {tx(decoyLabel)}
              </button>
            )}
            <div className="h-[6cqw]" />
            <button
              type="button"
              onClick={() => !solved && onSolved?.()}
              className={`w-full rounded-[1.2cqw] bg-grass px-[2cqw] py-[2cqw] text-[3.4cqw] font-extrabold text-white ${
                showHint && !solved ? 'anim-halo' : ''
              }`}
            >
              {tx(targetLabel)}
            </button>
            <div className="h-[2cqw]" />
          </div>
        </WindowFrame>

        {!atBottom && !solved && (
          <div className="pointer-events-none absolute bottom-[14cqw] left-1/2 -translate-x-1/2 rounded-full bg-ink/75 px-[3cqw] py-[1.2cqw] text-[3cqw] font-bold text-white">
            {tx({ en: '↑ Swipe up on the page', es: '↑ Desliza hacia arriba en la página' })}
          </div>
        )}

        <SystemChrome apps={[]} />
      </Wallpaper>
    </FakeScreen>
  )
}

/* ---------------------------------------------------------------------- AI */

/**
 * A mock AI assistant chat. The learner picks how they'd ask, and sees what a
 * vague question gets them versus a specific one — the lesson lands better as a
 * consequence than as a rule.
 */
export function AISim({ config = {}, onSolved, onMistake, showHint, solved }) {
  const tx = useTx()
  const { opening, options = [], best, reply, vagueReply, assistantName, assistantEmoji } = config
  const [messages, setMessages] = useState([{ from: 'ai', text: opening }])
  const [typing, setTyping] = useState(false)
  const [used, setUsed] = useState([])
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [messages, typing])

  const send = (opt) => {
    if (solved || typing) return
    setUsed((u) => [...u, opt.id])
    setMessages((m) => [...m, { from: 'me', text: opt.text }])
    setTyping(true)
    setTimeout(() => {
      const good = opt.id === best
      setTyping(false)
      setMessages((m) => [...m, { from: 'ai', text: good ? reply : vagueReply }])
      if (good) onSolved?.()
      else
        onMistake?.(
          tx({
            en: 'See what happened? It can only help as much as your question lets it. Try being more specific.',
            es: '¿Ves lo que pasó? Solo puede ayudarte tanto como se lo permita tu pregunta. Intenta ser más específica.',
          })
        )
    }, 900)
  }

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-line bg-white">
      <div className="flex items-center gap-2 border-b-2 border-line bg-cream px-4 py-3">
        <span className="text-xl" aria-hidden="true">
          {assistantEmoji || '✨'}
        </span>
        <span className="font-extrabold">
          {assistantName ? tx(assistantName) : tx({ en: 'AI Assistant', es: 'Asistente de IA' })}
        </span>
      </div>

      <div className="flex max-h-72 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`anim-pop max-w-[85%] rounded-2xl px-4 py-3 text-[0.95rem] leading-snug whitespace-pre-line ${
              m.from === 'ai'
                ? 'self-start rounded-bl-md bg-cream-deep text-ink'
                : 'self-end rounded-br-md bg-brand text-white'
            }`}
          >
            {tx(m.text)}
          </div>
        ))}
        {typing && (
          <div className="self-start rounded-2xl rounded-bl-md bg-cream-deep px-4 py-3">
            <span className="flex gap-1" aria-label="typing">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2 w-2 animate-bounce rounded-full bg-ink-soft/60"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {!solved && (
        <div className="flex flex-col gap-2 border-t-2 border-line bg-cream p-3">
          {options
            .filter((o) => !used.includes(o.id))
            .map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => send(o)}
                disabled={typing}
                className={`rounded-2xl border-2 border-line bg-white px-4 py-3 text-left text-[0.95rem] leading-snug font-semibold active:scale-[.99] ${
                  showHint && o.id === best ? 'anim-halo border-brand' : ''
                }`}
              >
                {tx(o.text)}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
