import { useState } from 'react'
import { useTx, useLocale, resolve } from '../../i18n'

/**
 * Keyboard shortcut practice on a touchscreen.
 *
 * A shortcut is "hold this, press that", which a phone can't do directly — so
 * modifier keys **latch**: tapping [Ctrl] holds it down, and the next letter
 * completes the combination. That keeps the mental model right ("the modifier
 * comes first and stays down") while being possible with one finger.
 *
 * Some shortcuts (switching windows) then show what actually happens on screen.
 */

const MODIFIERS = {
  windows: ['Ctrl', 'Shift', 'Alt', 'Win'],
  mac: ['Control', 'Shift', 'Option', 'Command'],
}

const GLYPH = {
  Command: '⌘',
  Option: '⌥',
  Shift: '⇧',
  Control: '⌃',
  Win: '⊞',
  Tab: '⇥',
  PrtScn: 'PrtScn',
}

const NUDGE = {
  needModifier: {
    en: 'On its own that key just types a letter. **Hold the big key first**, then press it.',
    es: 'Sola, esa tecla solo escribe una letra. **Mantén primero la tecla grande** y luego presiónala.',
  },
  wrongModifier: {
    en: 'That’s a different holding key. Look at the shortcut again and find the right one.',
    es: 'Esa es otra tecla de mantener. Mira otra vez el atajo y busca la correcta.',
  },
  wrongLetter: {
    en: 'You’re holding the right key — now find the right letter.',
    es: 'Estás manteniendo la tecla correcta — ahora busca la letra correcta.',
  },
  wrongApp: {
    en: 'That’s a different window — read the name under each picture.',
    es: 'Esa es otra ventana — lee el nombre debajo de cada dibujo.',
  },
}

export default function KeysSim({ config = {}, onSolved, onMistake, showHint, solved }) {
  const tx = useTx()
  const { device, lang } = useLocale()
  const { letters = [], then, apps = [], target } = config

  const combo = resolve(config.combo, lang, device)
  const comboMods = combo.slice(0, -1)
  const comboKey = combo[combo.length - 1]

  const [held, setHeld] = useState([])
  const [flash, setFlash] = useState(null)
  const [switcher, setSwitcher] = useState(false)

  const mods = MODIFIERS[device === 'mac' ? 'mac' : 'windows']
  const nudge = (key) => onMistake?.(tx(NUDGE[key]))

  const toggleMod = (m) => {
    if (solved) return
    setHeld((h) => (h.includes(m) ? h.filter((x) => x !== m) : [...h, m]))
  }

  const pressKey = (k) => {
    if (solved) return
    setFlash(k)
    setTimeout(() => setFlash(null), 200)

    if (held.length === 0 && comboMods.length > 0) return nudge('needModifier')

    const sameMods =
      held.length === comboMods.length && comboMods.every((m) => held.includes(m))
    if (!sameMods) {
      setHeld([])
      return nudge('wrongModifier')
    }
    if (k !== comboKey) return nudge('wrongLetter')

    setHeld([])
    if (then === 'switcher') setSwitcher(true)
    else onSolved?.()
  }

  const pickApp = (a) => {
    if (solved) return
    setSwitcher(false)
    if (a.id === target) onSolved?.()
    else {
      nudge('wrongApp')
      setSwitcher(true)
    }
  }

  const label = (k) => (GLYPH[k] ? `${GLYPH[k]} ${k}`.trim() : k)

  return (
    <div className="w-full">
      {/* What we're asking them to press, written out as key caps */}
      <div className="mb-4 flex items-center justify-center gap-2">
        {combo.map((k, i) => (
          <span key={k} className="flex items-center gap-2">
            {i > 0 && <span className="text-lg font-bold text-ink-soft">+</span>}
            <span
              className={`inline-flex min-w-12 items-center justify-center rounded-xl border-2 border-b-4 px-3 py-2 text-base font-extrabold ${
                held.includes(k) ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink'
              }`}
            >
              {label(k)}
            </span>
          </span>
        ))}
      </div>

      {/* The keyboard */}
      <div className="rounded-3xl border-2 border-line bg-[#e9e5dd] p-3">
        <div className="mb-2 flex flex-wrap justify-center gap-2">
          {letters.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => pressKey(k)}
              disabled={solved}
              className={`btn-3d min-w-14 rounded-xl border-2 border-b-4 border-[#c6c0b6] bg-white px-3 py-3 text-base font-extrabold text-ink shadow-none ${
                flash === k ? 'bg-brand-soft' : ''
              } ${showHint && !solved && k === comboKey && held.length > 0 ? 'anim-halo' : ''}`}
            >
              {label(k)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {mods.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => toggleMod(m)}
              disabled={solved}
              aria-pressed={held.includes(m)}
              className={`btn-3d rounded-xl border-2 border-b-4 px-3 py-3 text-sm font-extrabold shadow-none ${
                held.includes(m)
                  ? 'border-brand-dark bg-brand text-white'
                  : 'border-[#c6c0b6] bg-white text-ink'
              } ${showHint && !solved && comboMods.includes(m) && !held.includes(m) ? 'anim-halo' : ''}`}
            >
              {label(m)}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-sm font-semibold text-ink-soft">
          {tx({
            en: 'Tap the big key to hold it down, then tap the other one.',
            es: 'Toca la tecla grande para mantenerla, luego toca la otra.',
          })}
        </p>
      </div>

      {/* What the shortcut did */}
      {switcher && (
        <div className="anim-pop mt-4 rounded-3xl bg-[#26232c] p-4">
          <p className="mb-3 text-center text-sm font-bold text-white/80">
            {tx({ en: 'Now pick the window you want:', es: 'Ahora elige la ventana que quieres:' })}
          </p>
          <div className="flex justify-center gap-3">
            {apps.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => pickApp(a)}
                className={`flex w-24 flex-col items-center gap-1 rounded-2xl bg-white/10 p-3 ${
                  showHint && a.id === target ? 'anim-halo ring-2 ring-white' : ''
                }`}
              >
                <span className="text-3xl" aria-hidden="true">
                  {a.emoji}
                </span>
                <span className="text-xs leading-tight font-bold text-white">{tx(a.label)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
