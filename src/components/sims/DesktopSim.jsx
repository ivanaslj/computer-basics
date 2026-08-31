import { useState } from 'react'
import { FakeScreen, Wallpaper, SystemChrome, DesktopIcon, ContextMenu, WindowFrame } from './chrome'
import { useTapGestures } from '../../lib/gestures'
import { useTx, useLocale } from '../../i18n'

/**
 * The mock desktop. One component covers most of module 1 and 2 because the
 * skills stack: select, open, right-click, use the menu that appears, use the
 * Start / Apple menu, shut down properly.
 *
 * `config.goal` decides which of those the learner is being asked for, and
 * every wrong-but-reasonable action gets its own gentle correction rather than
 * a generic "no" — the difference between a single and a double click is
 * exactly the thing that confuses people, so it deserves a real answer.
 */

const NUDGE = {
  selectedOnly: {
    en: 'That selected it — one click just points at something. Try tapping it **twice, quickly** to open it.',
    es: 'Eso lo seleccionó — un clic solo lo señala. Prueba tocarlo **dos veces, rápido**, para abrirlo.',
  },
  openedInstead: {
    en: 'Two quick taps **opens** things. This time try just **one** tap, to select it.',
    es: 'Dos toques rápidos **abren** las cosas. Esta vez prueba **un** solo toque, para seleccionarlo.',
  },
  wrongIcon: {
    en: 'That’s a different icon. Look at the little name under each picture.',
    es: 'Ese es otro icono. Fíjate en el nombre debajo de cada dibujo.',
  },
  needHold: {
    en: 'Nearly. **Press and hold** it for a second, like holding a photo on your phone.',
    es: 'Casi. **Mantén presionado** un segundo, como cuando dejas el dedo en una foto en tu teléfono.',
  },
  wrongMenuItem: {
    en: 'Not that one — read the list again and find the words you were asked for.',
    es: 'Esa no — vuelve a leer la lista y busca las palabras que te pidieron.',
  },
}

const POWER_LABEL = { en: 'Power', es: 'Encendido' }

export default function DesktopSim({ config = {}, onSolved, onMistake, showHint, solved }) {
  const tx = useTx()
  const { device } = useLocale()
  const {
    icons = [],
    goal = 'click',
    target,
    menu = [],
    menuTarget,
    opensWindow,
  } = config

  const [selected, setSelected] = useState(null)
  const [ctx, setCtx] = useState(null) // { id, x, y }
  const [startOpen, setStartOpen] = useState(false)
  const [powerOpen, setPowerOpen] = useState(false)
  const [win, setWin] = useState(null)

  const nudge = (key) => onMistake?.(tx(NUDGE[key]))
  const closeMenus = () => {
    setCtx(null)
    setStartOpen(false)
    setPowerOpen(false)
  }

  const handleClick = (icon) => {
    if (solved) return
    closeMenus()
    setSelected(icon.id)
    if (goal === 'click') {
      if (icon.id === target) onSolved?.()
      else nudge('wrongIcon')
    } else if (goal === 'doubleclick') {
      nudge(icon.id === target ? 'selectedOnly' : 'wrongIcon')
    } else if (goal === 'longpress' || goal === 'menu') {
      nudge(icon.id === target ? 'needHold' : 'wrongIcon')
    }
  }

  const handleDoubleClick = (icon) => {
    if (solved) return
    closeMenus()
    setSelected(icon.id)
    if (goal === 'doubleclick') {
      if (icon.id === target) {
        if (opensWindow) setWin(opensWindow)
        onSolved?.()
      } else nudge('wrongIcon')
    } else if (goal === 'click') {
      nudge('openedInstead')
    } else {
      nudge(icon.id === target ? 'needHold' : 'wrongIcon')
    }
  }

  const handleLongPress = (icon) => {
    if (solved) return
    setStartOpen(false)
    setSelected(icon.id)
    if (goal !== 'longpress' && goal !== 'menu') {
      // A right-click here isn't wrong exactly, it's just not the ask.
      setCtx({ id: icon.id, x: icon.x + 8, y: icon.y + 22 })
      return
    }
    if (icon.id !== target) {
      nudge('wrongIcon')
      return
    }
    setCtx({ id: icon.id, x: Math.min(icon.x + 8, 52), y: Math.min(icon.y + 22, 44) })
    if (goal === 'longpress') onSolved?.()
  }

  const pickMenuItem = (item) => {
    if (solved) return
    if (goal === 'menu') {
      if (item.id === menuTarget) {
        setCtx(null)
        onSolved?.()
      } else nudge('wrongMenuItem')
    } else {
      setCtx(null)
    }
  }

  const onStart = () => {
    if (solved) return
    setCtx(null)
    const next = !startOpen
    setStartOpen(next)
    setPowerOpen(false)
    if (next && goal === 'start') onSolved?.()
  }

  const chooseShutdown = (id) => {
    if (solved) return
    if (id === 'shutdown') {
      closeMenus()
      onSolved?.()
    } else {
      onMistake?.(
        tx({
          en: 'That one doesn’t turn the computer off. Look for the words **Shut down**.',
          es: 'Esa no apaga la computadora. Busca las palabras **Apagar**.',
        })
      )
    }
  }

  const hintFor = (id) => showHint && !solved && id === target
  const chromeHighlight =
    showHint && !solved && (goal === 'start' || goal === 'shutdown')
      ? device === 'mac'
        ? 'apple'
        : 'start'
      : null

  return (
    <FakeScreen label="Practice desktop">
      <Wallpaper>
        {icons.map((icon) => (
          <IconButton
            key={icon.id}
            icon={icon}
            label={tx(icon.label)}
            selected={selected === icon.id}
            highlight={hintFor(icon.id)}
            disabled={solved}
            onClick={() => handleClick(icon)}
            onDoubleClick={() => handleDoubleClick(icon)}
            onLongPress={() => handleLongPress(icon)}
          />
        ))}

        {win && (
          <WindowFrame
            emoji={win.emoji}
            title={tx(win.title)}
            className="anim-pop"
            style={{ left: '16%', top: '16%', width: '68%', height: '60%' }}
            onClose={() => setWin(null)}
          >
            <div className="p-[3cqw] text-[3.2cqw] leading-relaxed whitespace-pre-line text-[#3c3a44]">
              {tx(win.body)}
            </div>
          </WindowFrame>
        )}

        {ctx && (
          <ContextMenu
            x={ctx.x}
            y={ctx.y}
            highlight={showHint && goal === 'menu' ? menuTarget : null}
            items={menu.map((m) => ({
              id: m.id,
              label: tx(m.label),
              muted: m.muted,
              onClick: () => pickMenuItem(m),
            }))}
          />
        )}

        {startOpen && (
          <StartPanel
            device={device}
            tx={tx}
            powerOpen={powerOpen}
            showHint={showHint && goal === 'shutdown'}
            onPower={() => setPowerOpen((v) => !v)}
            onChoose={chooseShutdown}
          />
        )}

        <SystemChrome
          apps={config.apps || []}
          onStart={onStart}
          startOpen={startOpen}
          highlight={chromeHighlight}
        />
      </Wallpaper>
    </FakeScreen>
  )
}

/** Wraps a desktop icon in the tap-gesture translation layer. */
function IconButton({ icon, label, selected, highlight, disabled, onClick, onDoubleClick, onLongPress }) {
  const handlers = useTapGestures({ onClick, onDoubleClick, onLongPress, disabled })
  return (
    <DesktopIcon
      emoji={icon.emoji}
      label={label}
      selected={selected}
      highlight={highlight}
      style={{ left: `${icon.x}%`, top: `${icon.y}%` }}
      {...handlers}
    />
  )
}

function StartPanel({ device, tx, powerOpen, showHint, onPower, onChoose }) {
  const options = [
    { id: 'sleep', label: { en: 'Sleep', es: 'Suspender' } },
    { id: 'restart', label: { en: 'Restart', es: 'Reiniciar' } },
    { id: 'shutdown', label: { en: 'Shut down', es: 'Apagar' } },
  ]

  if (device === 'mac') {
    return (
      <div className="anim-pop absolute top-[6.5cqw] left-[2cqw] z-30 w-[36cqw] overflow-hidden rounded-[1.2cqw] border border-black/15 bg-white py-[0.8cqw] shadow-[0_2cqw_6cqw_-1cqw_rgb(0_0_0/.45)]">
        <div className="px-[2.4cqw] py-[1.1cqw] text-[3.1cqw] font-semibold text-[#2a2830] opacity-40">
          {tx({ en: 'About This Mac', es: 'Acerca de esta Mac' })}
        </div>
        <div className="my-[0.5cqw] h-px bg-black/10" />
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChoose(o.id)}
            className={`block w-full px-[2.4cqw] py-[1.2cqw] text-left text-[3.2cqw] font-semibold text-[#2a2830] hover:bg-brand-soft ${
              showHint && o.id === 'shutdown' ? 'anim-halo bg-brand-soft' : ''
            }`}
          >
            {tx(o.label)}
            {o.id === 'shutdown' ? '…' : ''}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="anim-pop absolute bottom-[12cqw] left-[2cqw] z-30 w-[52cqw] rounded-[1.6cqw] border border-white/15 bg-[#232a3a]/97 p-[2.4cqw] shadow-[0_2cqw_8cqw_-1cqw_rgb(0_0_0/.6)] backdrop-blur">
      <div className="grid grid-cols-4 gap-[1.6cqw]">
        {['📧', '🌐', '📝', '🖼️', '🎵', '🧮', '⚙️', '📁'].map((e, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-[1.2cqw] bg-white/10 text-[4.6cqw]"
            aria-hidden="true"
          >
            {e}
          </div>
        ))}
      </div>
      <div className="mt-[2cqw] flex items-center justify-between border-t border-white/15 pt-[1.6cqw]">
        <span className="text-[3cqw] font-semibold text-white/80">
          {tx({ en: 'Signed in', es: 'Tu cuenta' })}
        </span>
        <button
          type="button"
          onClick={onPower}
          aria-label={tx(POWER_LABEL)}
          className={`flex items-center gap-[1cqw] rounded-[1cqw] px-[1.6cqw] py-[0.8cqw] text-[3.4cqw] text-white hover:bg-white/10 ${
            showHint && !powerOpen ? 'anim-halo bg-white/10' : ''
          }`}
        >
          ⏻
        </button>
      </div>
      {powerOpen && (
        <div className="anim-pop absolute right-[2cqw] bottom-[7cqw] w-[30cqw] overflow-hidden rounded-[1.2cqw] bg-white py-[0.6cqw] shadow-lg">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => onChoose(o.id)}
              className={`block w-full px-[2.2cqw] py-[1.1cqw] text-left text-[3.2cqw] font-semibold text-[#2a2830] hover:bg-brand-soft ${
                showHint && o.id === 'shutdown' ? 'anim-halo bg-brand-soft' : ''
              }`}
            >
              {tx(o.label)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
