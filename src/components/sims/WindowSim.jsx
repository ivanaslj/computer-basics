import { useState } from 'react'
import { FakeScreen, Wallpaper, SystemChrome, WindowFrame } from './chrome'
import { useTx, useLocale } from '../../i18n'

/**
 * Windows on the mock desktop: closing, minimising, maximising, and bringing a
 * buried window back to the front.
 *
 * Close-versus-minimise is the single most common beginner mix-up, so tapping
 * the wrong one is treated as a teachable moment: the app says what that button
 * actually did, undoes it, and lets them try again.
 */

const NUDGE = {
  minimizedNotClosed: {
    en: 'That **hid** the window — it’s still open, down on the bar. To close it for good, use the **✕**.',
    es: 'Eso **escondió** la ventana — sigue abierta, abajo en la barra. Para cerrarla del todo, usa la **✕**.',
  },
  closedNotMinimized: {
    en: 'That **closed** it completely. We only wanted it out of the way for a moment — that’s the **–** button. Here it is again.',
    es: 'Eso la **cerró** por completo. Solo queríamos quitarla de en medio un momento — ese es el botón **–**. Aquí está otra vez.',
  },
  maximized: {
    en: 'That made the window **fill the screen**. Not what we’re after this time.',
    es: 'Eso hizo que la ventana **llenara la pantalla**. No es lo que buscamos esta vez.',
  },
  wrongWindow: {
    en: 'That’s the other window — check the name in its top bar.',
    es: 'Esa es la otra ventana — fíjate en el nombre de su barra de arriba.',
  },
  useTheBar: {
    en: 'The window is hidden, not gone. Tap its little picture on the bar to bring it back.',
    es: 'La ventana está escondida, no perdida. Toca su dibujito en la barra para traerla de vuelta.',
  },
}

export default function WindowSim({ config = {}, onSolved, onMistake, showHint, solved }) {
  const tx = useTx()
  const { device } = useLocale()
  const { windows = [], goal = 'close', target } = config

  const [state, setState] = useState(() =>
    Object.fromEntries(
      windows.map((w, i) => [
        w.id,
        { closed: false, minimized: Boolean(w.startMinimized), maximized: false, z: w.startBehind ? 1 : 10 - i },
      ])
    )
  )

  const nudge = (key) => onMistake?.(tx(NUDGE[key]))
  const set = (id, patch) => setState((s) => ({ ...s, [id]: { ...s[id], ...patch } }))
  const bringToFront = (id) =>
    setState((s) => {
      const top = Math.max(...Object.values(s).map((w) => w.z)) + 1
      return { ...s, [id]: { ...s[id], z: top } }
    })

  const onClose = (w) => {
    if (solved) return
    if (goal === 'close') {
      if (w.id === target) {
        set(w.id, { closed: true })
        onSolved?.()
      } else nudge('wrongWindow')
      return
    }
    if (goal === 'minimize') {
      // Undo it so the learner can immediately try the right button.
      nudge('closedNotMinimized')
      set(w.id, { closed: true })
      setTimeout(() => set(w.id, { closed: false }), 900)
      return
    }
    set(w.id, { closed: true })
  }

  const onMinimize = (w) => {
    if (solved) return
    if (goal === 'minimize') {
      if (w.id === target) {
        set(w.id, { minimized: true })
        onSolved?.()
      } else nudge('wrongWindow')
      return
    }
    if (goal === 'close') {
      set(w.id, { minimized: true })
      nudge('minimizedNotClosed')
      setTimeout(() => set(w.id, { minimized: false }), 1100)
      return
    }
    set(w.id, { minimized: true })
  }

  const onMaximize = (w) => {
    if (solved) return
    if (goal === 'maximize' && w.id === target) {
      set(w.id, { maximized: true })
      onSolved?.()
      return
    }
    set(w.id, { maximized: !state[w.id].maximized })
    if (goal !== 'maximize') nudge('maximized')
  }

  const onTaskbarClick = (w) => {
    if (solved) return
    const st = state[w.id]
    if (st.minimized) set(w.id, { minimized: false })
    bringToFront(w.id)
    if ((goal === 'restore' || goal === 'switch') && w.id === target) onSolved?.()
    else if (goal === 'restore' || goal === 'switch') nudge('wrongWindow')
  }

  const onBodyClick = (w) => {
    if (solved) return
    bringToFront(w.id)
    if (goal === 'switch' && w.id === target) onSolved?.()
  }

  const anyVisible = windows.some((w) => !state[w.id].closed && !state[w.id].minimized)
  const hintControl = showHint && !solved ? { close: 'close', minimize: 'minimize', maximize: 'maximize' }[goal] : null
  const hintBar =
    showHint && !solved && (goal === 'restore' || goal === 'switch') ? target : null

  return (
    <FakeScreen label="Practice window">
      <Wallpaper>
        {!anyVisible && (
          <p className="absolute inset-x-[8%] top-[36%] text-center text-[3.4cqw] leading-snug font-bold text-white/90 [text-shadow:0_1px_3px_rgb(0_0_0/.6)]">
            {tx(
              goal === 'restore' || goal === 'switch'
                ? NUDGE.useTheBar
                : { en: 'The desktop, with nothing open.', es: 'El escritorio, sin nada abierto.' }
            ).replace(/\*\*/g, '')}
          </p>
        )}

        {windows.map((w) => {
          const st = state[w.id]
          if (st.closed || st.minimized) return null
          const box = st.maximized
            ? { left: '0%', top: device === 'mac' ? '6.5cqw' : '0%', width: '100%', height: device === 'mac' ? 'calc(100% - 18cqw)' : 'calc(100% - 11cqw)' }
            : { left: `${w.x}%`, top: `${w.y}%`, width: `${w.w}%`, height: `${w.h}%` }
          return (
            <WindowFrame
              key={w.id}
              emoji={w.emoji}
              title={tx(w.title)}
              highlight={w.id === target ? hintControl : null}
              className="anim-pop"
              style={{ ...box, zIndex: st.z }}
              onClose={() => onClose(w)}
              onMinimize={() => onMinimize(w)}
              onMaximize={() => onMaximize(w)}
            >
              <button
                type="button"
                onClick={() => onBodyClick(w)}
                className="block h-full w-full cursor-default p-[3cqw] text-left text-[3.2cqw] leading-relaxed whitespace-pre-line text-[#3c3a44]"
              >
                {tx(w.body)}
              </button>
            </WindowFrame>
          )
        })}

        <SystemChrome
          highlight={hintBar}
          apps={windows
            .filter((w) => !state[w.id].closed)
            .map((w) => ({
              id: w.id,
              emoji: w.emoji,
              label: tx(w.title),
              open: true,
              active: !state[w.id].minimized,
              onClick: () => onTaskbarClick(w),
            }))}
        />
      </Wallpaper>
    </FakeScreen>
  )
}
