import { useRef, useState } from 'react'
import { useTx, useLocale } from '../../i18n'
import Icon from '../icons'

/**
 * A phone, drawn — for the phone-video course. The one simulation of a phone
 * rather than a computer, and the one that changes shape with the learner's
 * phone: the same screens are drawn as an iPhone or as an Android (settings.
 * phone), with the same tap ids, so a lesson names one target and works on
 * either. The ids per screen are listed in phone-screens.js for the checker.
 *
 * Built for a first-time phone user in her late seventies, so:
 *   - exactly one right tap per step: one action per screen
 *   - every target is big, and every wrong tap gets a warm nudge from the step
 *     ("That's okay, try the one with the camera"), never the word "wrong"
 *   - a right tap shows what the real phone would do next (the camera opens,
 *     the video starts), so the step ends on the result, not on a checkmark
 *
 * Everything is CSS and inline SVG sized in cqw, so it scales with the card
 * and costs nothing to load. No pictures, no emoji.
 *
 * Config: { screen, target, nudge, state, highlight, labels }
 *   highlight / labels are for frozen illustrations on teach steps.
 */

const NAMES = {
  screen: { en: 'Screen', es: 'Pantalla' },
  camera: { en: 'Camera', es: 'Cámara' },
  photos: { iphone: { en: 'Photos', es: 'Fotos' }, android: { en: 'Gallery', es: 'Galería' } },
  whatsapp: { en: 'WhatsApp', es: 'WhatsApp' },
  calls: { en: 'Phone', es: 'Teléfono' },
  messages: { en: 'Messages', es: 'Mensajes' },
  clock: { en: 'Clock', es: 'Reloj' },
  settings: { en: 'Settings', es: 'Ajustes' },
  maps: { en: 'Maps', es: 'Mapas' },
  mail: { en: 'Mail', es: 'Correo' },
  more: { en: 'More', es: 'Más' },
}

const name = (id, os, tx) => {
  const n = NAMES[id]
  if (!n) return id
  return tx(n.iphone ? n[os] : n)
}

// Shown when a swipe was needed and the bar was only tapped.
const SWIPE_HINT = {
  en: 'Almost! Keep your finger on the little line and slide it up, all in one go.',
  es: '¡Casi! Deja el dedo en la rayita y deslízalo hacia arriba, todo de una vez.',
}

/**
 * What the phone shows once the right thing is tapped. A tap that opens
 * something moves on to that screen; one that changes something (the mode,
 * recording, playing) shows the change.
 */
function after(screen, state, target) {
  const next = { screen, state: { ...state } }
  if (screen === 'home' && target === 'camera') return { screen: 'camera', state: { mode: 'photo' } }
  if (screen === 'app' && target === 'home') return { screen: 'home', state: {} }
  if (screen === 'camera' && target === 'video-mode') next.state.mode = 'video'
  if (screen === 'camera' && target === 'shutter') {
    if (state.recording) Object.assign(next.state, { recording: false, thumb: true })
    else if (state.mode === 'video') next.state.recording = true
  }
  if (screen === 'camera' && target === 'thumbnail') return { screen: 'viewer', state: {} }
  if (screen === 'viewer' && target === 'play') next.state.playing = true
  if (screen === 'viewer' && target === 'trash') return { screen: 'confirm', state: {} }
  if (screen === 'viewer' && target === 'share') return { screen: 'share', state: {} }
  if (screen === 'confirm' && target === 'confirm-delete') next.state.deleted = true
  if (screen === 'share' && target === 'whatsapp') return { screen: 'contacts', state: {} }
  if (screen === 'contacts') return { screen: 'chat', state: { to: target } }
  if (screen === 'chat' && target === 'send') next.state.sent = true
  return next
}

export default function PhoneSim({ config = {}, onSolved, onMistake, showHint, solved }) {
  const tx = useTx()
  const { phone: os } = useLocale()
  const { target, nudge, highlight, labels = [] } = config
  const [picked, setPicked] = useState(null)
  const frameRef = useRef(null)

  const done = Boolean(solved && target)
  const view = done
    ? after(config.screen || 'home', config.state || {}, target)
    : { screen: config.screen || 'home', state: config.state || {} }

  // A miss grows the footer to hold the nudge, which can cover the bottom of
  // the phone, where the camera's buttons and the home bar are. Bring it back.
  const keepInView = () =>
    requestAnimationFrame(() => frameRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }))

  const miss = (message) => {
    onMistake?.(message)
    keepInView()
  }

  const tap = (id) => {
    if (solved || !target) return
    setPicked(id)
    if (id === target) return onSolved?.()
    miss(
      tx(
        nudge || {
          en: `That's okay. Try the ${name(target, os, tx)}.`,
          es: `No pasa nada. Prueba con ${name(target, os, tx)}.`,
        }
      )
    )
  }

  // One ring per target: the halo when "Show me how" is on, a gentle sun ring
  // on the last thing missed, green on the right one, and the brand colour on
  // whatever an illustration is pointing at.
  const ring = (id) => {
    if (!solved && showHint && id === target) return 'anim-halo ring-[1.2cqw] ring-[#4cc38a]'
    if (done && id === target) return 'ring-[1.2cqw] ring-[#4cc38a]'
    if (!solved && picked === id && id !== target) return 'anim-nudge ring-[1.2cqw] ring-[#f0a338]'
    if (highlight === id) return 'ring-[1.2cqw] ring-[#4cc38a]'
    return ''
  }

  const T = { tap, ring, os, tx, labels, frameRef, onMistake: miss, solved, target }
  const Screen = SCREENS[view.screen] || HomeScreen

  return (
    <div className="flex justify-center py-1">
      <div
        ref={frameRef}
        data-phone
        // Capped by the screen's height as well as its width. At the largest
        // text size the lesson's words take most of a phone, and a taller
        // drawing pushed its own bottom edge (the iPhone's home bar, the one
        // thing a step asks her to swipe) under the footer, off screen.
        // An illustration (no target) is smaller still: on a teach step the
        // explanation sits under the picture and should start on screen.
        className={`relative aspect-[9/15] ${
          target ? 'w-[min(80%,17rem,24dvh)]' : 'w-[min(70%,15rem,19dvh)]'
        } bg-[#0b0b0d] p-[2.6cqw] shadow-[0_0_0_0.6cqw_#3a3a40] ${
          os === 'iphone' ? 'rounded-[13cqw]' : 'rounded-[8cqw]'
        }`}
        style={{ containerType: 'inline-size' }}
      >
        {/* side buttons, drawn on the frame */}
        <span className="absolute top-[22%] -right-[1.4cqw] h-[12%] w-[1cqw] rounded-r bg-[#3a3a40]" aria-hidden="true" />
        <span className="absolute top-[18%] -left-[1.4cqw] h-[8%] w-[1cqw] rounded-l bg-[#3a3a40]" aria-hidden="true" />
        <div
          className={`relative flex h-full w-full flex-col overflow-hidden ${
            os === 'iphone' ? 'rounded-[10.5cqw]' : 'rounded-[6cqw]'
          } ${view.screen === 'home' || view.screen === 'body' ? 'text-white' : ''}`}
        >
          <Screen T={T} state={view.state} />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- pieces */

function Tap({ T, id, label, className = '', style, children }) {
  return (
    <button
      type="button"
      onClick={() => T.tap(id)}
      aria-label={label}
      style={style}
      className={`transition ${T.ring(id)} ${className}`}
    >
      {children}
    </button>
  )
}

function Chip({ text, style }) {
  return (
    <span
      style={style}
      className="pointer-events-none absolute z-20 -translate-x-1/2 rounded-full bg-[#1d8550] px-[3cqw] py-[1cqw] text-[4.4cqw] font-extrabold whitespace-nowrap text-white"
    >
      {text}
    </span>
  )
}

/** The time and battery along the top, and the camera cut-out. */
function StatusBar({ T, dark = true }) {
  const fg = dark ? 'text-white' : 'text-[#111]'
  return (
    <div className={`relative z-10 flex h-[11cqw] shrink-0 items-center justify-between px-[7cqw] text-[3.8cqw] font-bold ${fg}`}>
      <span>10:30</span>
      {T.os === 'iphone' ? (
        <span className="absolute top-[2.4cqw] left-1/2 h-[6.4cqw] w-[24cqw] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
      ) : (
        <span className="absolute top-[3.4cqw] left-1/2 h-[3.6cqw] w-[3.6cqw] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
      )}
      <span className="flex items-center gap-[1cqw]" aria-hidden="true">
        <span className={`h-[3cqw] w-[6cqw] rounded-[0.8cqw] border-[0.5cqw] ${dark ? 'border-white' : 'border-[#111]'} p-[0.4cqw]`}>
          <span className={`block h-full w-[70%] rounded-[0.3cqw] ${dark ? 'bg-white' : 'bg-[#111]'}`} />
        </span>
      </span>
    </div>
  )
}

/**
 * The way home. iPhone: the thin bar at the bottom, which is swiped up, not
 * tapped. Android: three buttons, of which the round one is home. Only live on
 * the 'app' screen; everywhere else it is just part of the picture.
 */
function HomeControl({ T, live, dark = true }) {
  const start = useRef(null)
  const handled = useRef(false)
  const fg = dark ? 'bg-white' : 'bg-[#111]'

  if (T.os === 'iphone') {
    if (!live) {
      return (
        <div className="flex h-[8cqw] shrink-0 items-center justify-center" aria-hidden="true">
          <span className={`h-[1.4cqw] w-[34cqw] rounded-full ${fg}`} />
        </div>
      )
    }
    const finish = (dy) => {
      const height = T.frameRef.current?.clientHeight || 400
      if (dy > height * 0.06) T.tap('home')
      else if (!T.solved && T.target === 'home') T.onMistake?.(T.tx(SWIPE_HINT))
    }
    return (
      <button
        type="button"
        aria-label={T.tx({ en: 'Home bar: slide up to go home', es: 'Barra de inicio: desliza hacia arriba para ir al inicio' })}
        className={`flex h-[16cqw] shrink-0 items-center justify-center rounded-[4cqw] ${T.ring('home')}`}
        style={{ touchAction: 'none' }}
        onPointerDown={(e) => {
          start.current = e.clientY
          e.currentTarget.setPointerCapture?.(e.pointerId)
        }}
        onPointerUp={(e) => {
          if (start.current == null) return
          const dy = start.current - e.clientY
          start.current = null
          handled.current = true
          finish(dy)
        }}
        onClick={() => {
          // A pointer already handled it. A click with no pointer behind it is
          // the keyboard, which cannot swipe, so it counts as one.
          if (handled.current) {
            handled.current = false
            return
          }
          T.tap('home')
        }}
      >
        <span className={`h-[1.6cqw] w-[36cqw] rounded-full ${fg}`} />
      </button>
    )
  }

  const glyph = dark ? 'border-white' : 'border-[#111]'
  return (
    <div className={`flex h-[12cqw] shrink-0 items-center justify-around px-[8cqw] ${dark ? 'bg-black/40' : 'bg-[#f2f2f2]'}`}>
      <span className={`h-[3.6cqw] w-[3.6cqw] rotate-45 border-b-[0.7cqw] border-l-[0.7cqw] ${glyph}`} aria-hidden="true" />
      {live ? (
        <Tap T={T} id="home" label={T.tx({ en: 'Home button', es: 'Botón de inicio' })} className="flex h-[10cqw] w-[14cqw] items-center justify-center rounded-full">
          <span className={`h-[5cqw] w-[5cqw] rounded-full border-[0.8cqw] ${glyph}`} />
        </Tap>
      ) : (
        <span className={`h-[5cqw] w-[5cqw] rounded-full border-[0.8cqw] ${glyph}`} aria-hidden="true" />
      )}
      <span className={`h-[4cqw] w-[4cqw] rounded-[0.6cqw] border-[0.7cqw] ${glyph}`} aria-hidden="true" />
    </div>
  )
}

/** A little outdoor scene: what the camera is looking at, and the video. */
function Scene({ className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-b from-[#8fc3ea] via-[#bfe0f2] to-[#cfe8c0] ${className}`} aria-hidden="true">
      <span className="absolute top-[14%] right-[16%] h-[18%] w-auto aspect-square rounded-full bg-[#ffd36b]" />
      <span className="absolute bottom-[-30%] -left-[10%] h-[70%] w-[80%] rounded-[50%] bg-[#6fae5a]" />
      <span className="absolute -right-[15%] bottom-[-35%] h-[75%] w-[85%] rounded-[50%] bg-[#5a9a4a]" />
      <span className="absolute bottom-[18%] left-[42%] h-[26%] w-[3%] bg-[#6b4a2e]" />
      <span className="absolute bottom-[38%] left-[34%] h-[22%] w-[20%] rounded-full bg-[#3f7d3a]" />
    </div>
  )
}

/* ------------------------------------------------------------ app icons */

function AppGlyph({ id }) {
  const common = 'h-[62%] w-[62%] text-white'
  switch (id) {
    case 'camera':
      return <Icon name="camera" className={common} />
    case 'photos':
      return (
        <svg viewBox="0 0 24 24" className="h-[70%] w-[70%]" aria-hidden="true">
          {['#f5b400', '#f06a2b', '#e0336b', '#9b4dd8', '#3d7be0', '#22b5c9', '#4cc04c', '#a6cf2e'].map((c, i) => (
            <ellipse key={c} cx="12" cy="6.6" rx="2.6" ry="5" fill={c} opacity=".85" transform={`rotate(${i * 45} 12 12)`} />
          ))}
        </svg>
      )
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4.2 19.8l1.1-3.9A8.4 8.4 0 1 1 8.4 19l-4.2.8z" />
          <path d="M9.2 8.6c.3 2.6 2.4 4.9 5.2 5.6l1.1-1.2-1.7-.9-.8.8c-1-.4-2-1.4-2.4-2.4l.8-.8-.9-1.7z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'calls':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
          <path d="M7.2 3.4l2.4 3.7-1.6 1.8a10 10 0 0 0 7.1 7.1l1.8-1.6 3.7 2.4-1.1 3.2c-8.4 0-15-6.6-15-15z" />
        </svg>
      )
    case 'messages':
      return <Icon name="chat" className={common} />
    case 'clock':
      return (
        <svg viewBox="0 0 24 24" className="h-[78%] w-[78%]" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" fill="#fff" />
          <path d="M12 6.6V12l3.6 2" stroke="#111" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      )
    case 'settings':
      return <Icon name="gear" className={common} />
    case 'maps':
      return <Icon name="map" className={common} />
    case 'mail':
      return <Icon name="mail" className={common} />
    case 'more':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
          <circle cx="6" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="18" cy="12" r="1.8" />
        </svg>
      )
    default:
      return null
  }
}

const APP_BG = {
  camera: 'bg-[#3a3a3e]',
  photos: 'bg-white',
  whatsapp: 'bg-[#25d366]',
  calls: 'bg-[#34c759]',
  messages: 'bg-[#30b14f]',
  clock: 'bg-[#111]',
  settings: 'bg-[#8e8e93]',
  maps: 'bg-[#2f8cf0]',
  mail: 'bg-[#2f7cf6]',
  more: 'bg-[#d9d9de]',
}

function AppTile({ T, id, size = '15cqw', live = true, labelClass = 'text-white' }) {
  const shape = T.os === 'iphone' ? 'rounded-[3.6cqw]' : 'rounded-full'
  const label = name(id, T.os, T.tx)
  const face = (
    <span className={`flex items-center justify-center ${shape} ${APP_BG[id]} ${id === 'more' ? 'text-[#555]' : ''}`} style={{ width: size, height: size }}>
      <AppGlyph id={id} />
    </span>
  )
  const caption = <span className={`text-[4cqw] leading-tight font-semibold ${labelClass}`}>{label}</span>
  if (!live) {
    return (
      <span className="flex flex-col items-center gap-[1.2cqw]" aria-hidden="true">
        <span className={`${T.ring(id)} ${shape}`}>{face}</span>
        {caption}
      </span>
    )
  }
  return (
    <Tap T={T} id={id} label={label} className={`flex flex-col items-center gap-[1.2cqw] rounded-[3cqw] p-[0.6cqw]`}>
      {face}
      {caption}
    </Tap>
  )
}

/* -------------------------------------------------------------- screens */

const HOME_APPS = ['clock', 'maps', 'settings', 'calls', 'photos', 'whatsapp', 'camera', 'messages']

function Wallpaper({ os, children }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col ${
        os === 'iphone'
          ? 'bg-gradient-to-b from-[#2b4f7e] via-[#5b6fa8] to-[#c48a9a]'
          : 'bg-gradient-to-b from-[#1f3b3a] via-[#2e6b5e] to-[#9ac08f]'
      }`}
    >
      {children}
    </div>
  )
}

function HomeGrid({ T, live }) {
  return (
    <div className="grid flex-1 grid-cols-4 content-start gap-x-[2cqw] gap-y-[5cqw] px-[5cqw] pt-[6cqw]">
      {HOME_APPS.map((id) => (
        <AppTile key={id} T={T} id={id} live={live} />
      ))}
    </div>
  )
}

function HomeScreen({ T }) {
  return (
    <Wallpaper os={T.os}>
      <StatusBar T={T} />
      <HomeGrid T={T} live={Boolean(T.target)} />
      <HomeControl T={T} live={false} />
    </Wallpaper>
  )
}

/** The phone from the front: the whole screen is one big target. */
function BodyScreen({ T }) {
  return (
    <>
      <Wallpaper os={T.os}>
        <StatusBar T={T} />
        <HomeGrid T={T} live={false} />
        <HomeControl T={T} live={false} />
      </Wallpaper>
      <Tap
        T={T}
        id="screen"
        label={T.tx(NAMES.screen)}
        className={`absolute inset-0 z-10 ${T.os === 'iphone' ? 'rounded-[10.5cqw]' : 'rounded-[6cqw]'}`}
      />
      {T.labels.includes('screen') && <Chip text={T.tx(NAMES.screen)} style={{ left: '50%', top: '46%' }} />}
    </>
  )
}

/** An app open full screen (the clock), to practise getting home from. */
function AppScreen({ T }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#111] text-white">
      <StatusBar T={T} />
      <div className="flex flex-1 flex-col items-center justify-center gap-[3cqw]">
        <span className="text-[5cqw] font-bold text-white/70">{name('clock', T.os, T.tx)}</span>
        <span className="text-[19cqw] leading-none font-light tabular-nums">10:30</span>
      </div>
      <HomeControl T={T} live />
    </div>
  )
}

function CameraScreen({ T, state }) {
  const mode = state.mode || 'photo'
  const rec = Boolean(state.recording)
  const ios = T.os === 'iphone'
  const modes = ios
    ? [
        { id: 'video-mode', label: { en: 'VIDEO', es: 'VIDEO' }, on: mode === 'video' },
        { id: 'photo-mode', label: { en: 'PHOTO', es: 'FOTO' }, on: mode === 'photo' },
        { id: null, label: { en: 'PORTRAIT', es: 'RETRATO' } },
      ]
    : [
        { id: 'photo-mode', label: { en: 'Photo', es: 'Foto' }, on: mode === 'photo' },
        { id: 'video-mode', label: { en: 'Video', es: 'Video' }, on: mode === 'video' },
        { id: null, label: { en: 'More', es: 'Más' } },
      ]
  return (
    <div className="absolute inset-0 flex flex-col bg-black text-white">
      <StatusBar T={T} />
      <div className="flex h-[9cqw] shrink-0 items-center justify-center">
        {rec && (
          <span className={`rounded-[1.6cqw] px-[2.4cqw] py-[0.6cqw] text-[4cqw] font-bold tabular-nums ${ios ? 'bg-[#ff3b30]' : 'flex items-center gap-[1.4cqw]'}`}>
            {!ios && <span className="h-[2.6cqw] w-[2.6cqw] rounded-full bg-[#ff3b30]" />}
            00:04
          </span>
        )}
      </div>
      <Scene className="mx-0 flex-1" />
      <div className="flex shrink-0 items-center justify-center gap-[5cqw] py-[3cqw]">
        {modes.map((m) =>
          m.id && !rec ? (
            <Tap
              key={m.id}
              T={T}
              id={m.id}
              label={T.tx(m.label)}
              className={`rounded-full px-[2.6cqw] py-[1.4cqw] text-[4.4cqw] font-bold ${
                m.on ? (ios ? 'text-[#ffd60a]' : 'bg-white/20 text-white') : 'text-white/85'
              }`}
            >
              {T.tx(m.label)}
            </Tap>
          ) : (
            <span key={T.tx(m.label)} className={`px-[1cqw] text-[4.4cqw] font-bold ${rec ? 'invisible' : 'text-white/60'}`} aria-hidden="true">
              {T.tx(m.label)}
            </span>
          )
        )}
      </div>
      <div className="flex shrink-0 items-center justify-between px-[7cqw] pb-[3cqw]">
        <Tap
          T={T}
          id="thumbnail"
          label={T.tx({ en: 'Last video', es: 'Último video' })}
          className="h-[13cqw] w-[13cqw] overflow-hidden rounded-[2.4cqw] border-[0.6cqw] border-white/70 bg-[#222]"
        >
          {state.thumb && <Scene className="h-full w-full" />}
        </Tap>
        <Tap
          T={T}
          id="shutter"
          label={T.tx(
            rec ? { en: 'Stop recording', es: 'Detener' } : mode === 'video' ? { en: 'Record', es: 'Grabar' } : { en: 'Take photo', es: 'Tomar foto' }
          )}
          className="flex h-[21cqw] w-[21cqw] items-center justify-center rounded-full border-[1.2cqw] border-white"
        >
          <span
            className={
              rec
                ? 'h-[8cqw] w-[8cqw] rounded-[1.6cqw] bg-[#ff3b30]'
                : mode === 'video'
                  ? 'h-[15cqw] w-[15cqw] rounded-full bg-[#ff3b30]'
                  : 'h-[15cqw] w-[15cqw] rounded-full bg-white'
            }
          />
        </Tap>
        <Tap
          T={T}
          id="flip"
          label={T.tx({ en: 'Switch camera', es: 'Cambiar cámara' })}
          className="flex h-[12cqw] w-[12cqw] items-center justify-center rounded-full bg-white/15"
        >
          <svg viewBox="0 0 24 24" className="h-[60%] w-[60%]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4.6 10.4a7.6 7.6 0 0 1 13.6-3.2M19.4 13.6a7.6 7.6 0 0 1-13.6 3.2" />
            <path d="M18.6 3.6v3.8h-3.8M5.4 20.4v-3.8h3.8" />
          </svg>
        </Tap>
      </div>
      <HomeControl T={T} live={false} />
    </div>
  )
}

/** The share glyph each phone uses: Safari-style box and arrow, or three linked dots. */
function ShareGlyph({ os }) {
  if (os === 'iphone') return <Icon name="ios-share" className="h-[8cqw] w-[8cqw]" />
  return (
    <svg viewBox="0 0 24 24" className="h-[8cqw] w-[8cqw]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <circle cx="17.5" cy="5.5" r="2.6" /><circle cx="6.5" cy="12" r="2.6" /><circle cx="17.5" cy="18.5" r="2.6" />
      <path d="M8.8 10.7l6.4-3.9M8.8 13.3l6.4 3.9" />
    </svg>
  )
}

function ViewerScreen({ T, state, dim = false }) {
  const ios = T.os === 'iphone'
  const share = (
    <Tap key="share" T={T} id="share" label={T.tx({ en: 'Share', es: 'Compartir' })} className="flex h-[13cqw] w-[13cqw] items-center justify-center rounded-full">
      <ShareGlyph os={T.os} />
    </Tap>
  )
  const favorite = (
    <Tap key="favorite" T={T} id="favorite" label={T.tx({ en: 'Favorite', es: 'Favorito' })} className="flex h-[13cqw] w-[13cqw] items-center justify-center rounded-full">
      <Icon name="heart" className="h-[8cqw] w-[8cqw]" />
    </Tap>
  )
  const trash = (
    <Tap key="trash" T={T} id="trash" label={T.tx({ en: 'Delete', es: 'Eliminar' })} className="flex h-[13cqw] w-[13cqw] items-center justify-center rounded-full">
      <Icon name="trash" className="h-[8cqw] w-[8cqw]" />
    </Tap>
  )
  const edit = (
    <span key="edit" className="flex h-[13cqw] w-[13cqw] items-center justify-center" aria-hidden="true">
      <Icon name="pencil" className="h-[8cqw] w-[8cqw] opacity-70" />
    </span>
  )
  return (
    <div className={`absolute inset-0 flex flex-col bg-black text-white ${dim ? 'opacity-40' : ''}`} inert={dim || undefined}>
      <StatusBar T={T} />
      <div className="flex h-[11cqw] shrink-0 items-center px-[3cqw]">
        <Tap T={T} id="back" label={T.tx({ en: 'Back', es: 'Atrás' })} className="flex h-[10cqw] w-[10cqw] items-center justify-center rounded-full">
          <span className="h-[3.6cqw] w-[3.6cqw] rotate-45 border-b-[0.8cqw] border-l-[0.8cqw] border-white" />
        </Tap>
        <span className="flex-1 text-center text-[3.8cqw] font-bold">{T.tx({ en: 'Today, 10:31', es: 'Hoy, 10:31' })}</span>
        <span className="w-[10cqw]" />
      </div>
      <div className="relative flex flex-1 items-center">
        {state.deleted ? (
          <p className="w-full px-[6cqw] text-center text-[5cqw] font-bold text-white/80">
            {T.tx(ios ? { en: 'Moved to Recently Deleted', es: 'Se movió a Eliminados' } : { en: 'Moved to Trash', es: 'Se movió a la Papelera' })}
          </p>
        ) : (
          <div className="relative w-full">
            <Scene className="aspect-[4/3] w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              {state.playing ? (
                <span className="flex gap-[2cqw]" aria-hidden="true">
                  <span className="h-[9cqw] w-[2.6cqw] rounded-sm bg-white/90" />
                  <span className="h-[9cqw] w-[2.6cqw] rounded-sm bg-white/90" />
                </span>
              ) : (
                <Tap T={T} id="play" label={T.tx({ en: 'Play', es: 'Reproducir' })} className="flex h-[19cqw] w-[19cqw] items-center justify-center rounded-full bg-black/45">
                  <span className="ml-[1.6cqw] h-0 w-0 border-y-[4.6cqw] border-l-[7.6cqw] border-y-transparent border-l-white" />
                </Tap>
              )}
            </div>
            {state.playing && (
              <span className="absolute right-[4cqw] bottom-[3cqw] left-[4cqw] h-[1cqw] rounded-full bg-white/40" aria-hidden="true">
                <span className="block h-full w-1/4 rounded-full bg-white" />
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center justify-around px-[3cqw] py-[3cqw]">
        {ios ? [share, favorite, trash] : [favorite, edit, share, trash]}
      </div>
      <HomeControl T={T} live={false} />
    </div>
  )
}

function ConfirmScreen({ T, state }) {
  const ios = T.os === 'iphone'
  if (state.deleted) return <ViewerScreen T={T} state={{ deleted: true }} />
  return (
    <>
      <ViewerScreen T={T} state={{}} dim />
      {ios ? (
        <div className="absolute inset-x-[3cqw] bottom-[9cqw] flex flex-col gap-[2cqw]">
          <div className="overflow-hidden rounded-[4cqw] bg-[#f2f2f7] text-center">
            <p className="px-[5cqw] py-[3.4cqw] text-[3.6cqw] leading-snug text-[#6b6b70]">
              {T.tx({ en: 'This video will stay in Recently Deleted for 30 days.', es: 'Este video se quedará en Eliminados durante 30 días.' })}
            </p>
            <Tap T={T} id="confirm-delete" label={T.tx({ en: 'Delete Video', es: 'Eliminar video' })} className="block w-full border-t-[0.3cqw] border-[#d1d1d6] py-[3.6cqw] text-[5cqw] font-semibold text-[#ff3b30]">
              {T.tx({ en: 'Delete Video', es: 'Eliminar video' })}
            </Tap>
          </div>
          <Tap T={T} id="cancel" label={T.tx({ en: 'Cancel', es: 'Cancelar' })} className="block w-full rounded-[4cqw] bg-white py-[3.6cqw] text-[5cqw] font-bold text-[#0a84ff]">
            {T.tx({ en: 'Cancel', es: 'Cancelar' })}
          </Tap>
        </div>
      ) : (
        <div className="absolute inset-x-[6cqw] top-1/2 -translate-y-1/2 rounded-[6cqw] bg-[#2a2a2e] p-[5cqw] text-white">
          <p className="text-[5cqw] leading-snug font-bold">
            {T.tx({ en: 'Move 1 video to the Trash?', es: '¿Mover 1 video a la Papelera?' })}
          </p>
          <p className="mt-[2cqw] text-[3.6cqw] leading-snug text-white/70">
            {T.tx({ en: 'It will be deleted for good after 30 days.', es: 'Se borrará para siempre después de 30 días.' })}
          </p>
          <div className="mt-[4cqw] flex justify-end gap-[3cqw]">
            <Tap T={T} id="cancel" label={T.tx({ en: 'Cancel', es: 'Cancelar' })} className="rounded-full px-[3cqw] py-[2.4cqw] text-[4.4cqw] font-bold text-[#8ab4ff]">
              {T.tx({ en: 'Cancel', es: 'Cancelar' })}
            </Tap>
            <Tap T={T} id="confirm-delete" label={T.tx({ en: 'Move to Trash', es: 'Mover a la Papelera' })} className="rounded-full px-[3cqw] py-[2.4cqw] text-[4.4cqw] font-bold text-[#ff6b60]">
              {T.tx({ en: 'Move to Trash', es: 'Mover a la Papelera' })}
            </Tap>
          </div>
        </div>
      )}
    </>
  )
}

function ShareScreen({ T }) {
  const ios = T.os === 'iphone'
  const apps = ios ? ['messages', 'mail', 'whatsapp', 'more'] : ['whatsapp', 'messages', 'mail', 'more']
  return (
    <>
      <ViewerScreen T={T} state={{}} dim />
      <div className={`absolute inset-x-0 bottom-0 rounded-t-[6cqw] px-[4cqw] pt-[4cqw] pb-[10cqw] ${ios ? 'bg-[#f2f2f7] text-[#111]' : 'bg-[#2a2a2e] text-white'}`}>
        <div className="flex items-center gap-[3cqw] pb-[4cqw]">
          <Scene className="h-[12cqw] w-[12cqw] rounded-[2cqw]" />
          <span className="text-[4.2cqw] font-bold">{T.tx({ en: '1 video', es: '1 video' })}</span>
        </div>
        <div className="grid grid-cols-4 gap-[2cqw]">
          {apps.map((id) => (
            <AppTile key={id} T={T} id={id} size="14cqw" labelClass={ios ? 'text-[#111]' : 'text-white'} />
          ))}
        </div>
      </div>
    </>
  )
}

const CONTACTS = [
  { id: 'ivan', name: 'Iván', color: 'bg-[#4b7bd8]' },
  { id: 'lupita', name: 'Lupita', color: 'bg-[#d9675f]' },
  { id: 'familia', name: { en: 'Family', es: 'Familia' }, color: 'bg-[#7a8a99]', group: true },
]

function WhatsAppTop({ T, title }) {
  return (
    <div className="flex h-[13cqw] shrink-0 items-center gap-[3cqw] bg-[#1f2c33] px-[4cqw] text-white">
      <span className="h-[3.4cqw] w-[3.4cqw] rotate-45 border-b-[0.8cqw] border-l-[0.8cqw] border-white" aria-hidden="true" />
      <span className="text-[4.8cqw] font-bold">{T.tx(title)}</span>
    </div>
  )
}

function ContactsScreen({ T }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#111b21] text-white">
      <StatusBar T={T} />
      <WhatsAppTop T={T} title={{ en: 'Send to…', es: 'Enviar a…' }} />
      <p className="px-[4cqw] pt-[4cqw] pb-[2cqw] text-[3.6cqw] font-bold text-[#8696a0]">
        {T.tx({ en: 'Frequently contacted', es: 'Contactos frecuentes' })}
      </p>
      <div className="flex flex-col gap-[1cqw] px-[2cqw]">
        {CONTACTS.map((c) => (
          <Tap key={c.id} T={T} id={c.id} label={T.tx(c.name)} className="flex items-center gap-[4cqw] rounded-[3cqw] px-[2cqw] py-[2.4cqw] text-left">
            <span className={`flex h-[12cqw] w-[12cqw] shrink-0 items-center justify-center rounded-full text-[5cqw] font-bold ${c.color}`}>
              {c.group ? <Icon name="people" className="h-[7cqw] w-[7cqw]" /> : T.tx(c.name)[0]}
            </span>
            <span className="text-[5cqw] font-semibold">{T.tx(c.name)}</span>
          </Tap>
        ))}
      </div>
      <span className="flex-1" />
      <HomeControl T={T} live={false} />
    </div>
  )
}

function ChatScreen({ T, state }) {
  const to = CONTACTS.find((c) => c.id === (state.to || 'ivan')) || CONTACTS[0]
  if (state.sent) {
    return (
      <div className="absolute inset-0 flex flex-col bg-[#0b141a] text-white">
        <StatusBar T={T} />
        <WhatsAppTop T={T} title={to.name} />
        <div className="flex flex-1 flex-col justify-end p-[4cqw]">
          <div className="self-end rounded-[3cqw] rounded-br-[0.8cqw] bg-[#005c4b] p-[1.6cqw]">
            <div className="relative">
              <Scene className="h-[34cqw] w-[46cqw] rounded-[2cqw]" />
              <span className="absolute inset-0 m-auto h-0 w-0 border-y-[3cqw] border-l-[5cqw] border-y-transparent border-l-white" aria-hidden="true" />
            </div>
            <p className="mt-[1cqw] text-right text-[3.2cqw] text-white/75">
              10:32 <span className="font-bold text-[#53bdeb]">✓✓</span>
            </p>
          </div>
        </div>
        <HomeControl T={T} live={false} />
      </div>
    )
  }
  return (
    <div className="absolute inset-0 flex flex-col bg-black text-white">
      <StatusBar T={T} />
      <div className="relative flex flex-1 items-center">
        <Scene className="aspect-[4/3] w-full" />
        <span className="absolute inset-0 m-auto h-0 w-0 border-y-[4cqw] border-l-[6.6cqw] border-y-transparent border-l-white" aria-hidden="true" />
      </div>
      <div className="mx-[3cqw] mb-[3cqw] rounded-full bg-[#1f2c33] px-[4cqw] py-[2.6cqw] text-[3.8cqw] text-[#8696a0]">
        {T.tx({ en: 'Add a caption…', es: 'Añade un comentario…' })}
      </div>
      <div className="flex items-center justify-between px-[4cqw] pb-[3cqw]">
        <span className="rounded-full bg-[#1f2c33] px-[3.4cqw] py-[1.6cqw] text-[4.2cqw] font-semibold">{T.tx(to.name)}</span>
        <Tap T={T} id="send" label={T.tx({ en: 'Send', es: 'Enviar' })} className="flex h-[15cqw] w-[15cqw] items-center justify-center rounded-full bg-[#25d366] text-[#0b141a]">
          <Icon name="send" className="h-[8cqw] w-[8cqw]" />
        </Tap>
      </div>
      <HomeControl T={T} live={false} />
    </div>
  )
}

const SCREENS = {
  body: BodyScreen,
  app: AppScreen,
  home: HomeScreen,
  camera: CameraScreen,
  viewer: ViewerScreen,
  confirm: ConfirmScreen,
  share: ShareScreen,
  contacts: ContactsScreen,
  chat: ChatScreen,
}
