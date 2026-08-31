import { useLocale } from '../../i18n'

/**
 * Shared furniture for the practice simulations: the fake screen everything is
 * drawn inside, plus the Windows taskbar / Mac menu bar and dock.
 *
 * Sizing rule for everything inside a simulation: use `cqw` units, never rem.
 * The screen is a container, so a "12cqw" icon stays proportional whether it's
 * rendered small on a phone or large in a tablet layout — and, importantly,
 * the "larger text" accessibility setting scales the surrounding lesson text
 * without warping the mock desktop out of shape.
 */

export function FakeScreen({ children, className = '', label, stand = true }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-[1.4rem] bg-[#33313c] p-[2.2%] shadow-[0_10px_28px_-12px_rgb(34_31_38_/_0.5)]">
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[0.7rem] bg-[#0f1420]"
          style={{ containerType: 'inline-size' }}
          role="group"
          aria-label={label}
        >
          {children}
        </div>
      </div>
      {stand && (
        <div className="mx-auto h-[0.55rem] w-[62%] rounded-b-xl bg-[#c9c4bb]" aria-hidden="true" />
      )}
    </div>
  )
}

/** The desktop background. Windows and Mac get visibly different wallpaper. */
export function Wallpaper({ children }) {
  const { device } = useLocale()
  const bg =
    device === 'mac'
      ? 'linear-gradient(160deg,#5b3fa8 0%,#a8437f 48%,#e4794a 100%)'
      : 'linear-gradient(160deg,#123a63 0%,#1c6fa8 55%,#2aa3b8 100%)'
  return (
    <div className="absolute inset-0" style={{ background: bg }}>
      {children}
    </div>
  )
}

/* --------------------------------------------------------- Windows chrome */

function WindowsLogo({ size = '4.4cqw' }) {
  return (
    <span className="grid grid-cols-2 gap-[0.5cqw]" style={{ width: size }} aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="block aspect-square rounded-[0.3cqw] bg-[#4ab3f4]" />
      ))}
    </span>
  )
}

export function TaskBar({ items = [], onStart, startOpen, highlight }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-[11cqw] items-center gap-[2cqw] bg-[#1b2130]/95 px-[2.5cqw] backdrop-blur">
      <button
        type="button"
        onClick={onStart}
        aria-label="Start"
        className={`flex h-[8cqw] w-[8cqw] items-center justify-center rounded-[1.2cqw] transition ${
          startOpen ? 'bg-white/20' : 'hover:bg-white/10'
        } ${highlight === 'start' ? 'anim-halo ring-[0.6cqw] ring-white/80' : ''}`}
      >
        <WindowsLogo />
      </button>
      <div className="flex items-center gap-[1.6cqw]">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            onClick={it.onClick}
            aria-label={it.label}
            className={`relative flex h-[8cqw] w-[8cqw] items-center justify-center rounded-[1.2cqw] text-[4.4cqw] transition ${
              it.active ? 'bg-white/20' : 'hover:bg-white/10'
            } ${highlight === it.id ? 'anim-halo ring-[0.6cqw] ring-white/80' : ''}`}
          >
            <span aria-hidden="true">{it.emoji}</span>
            {it.open && (
              <span className="absolute bottom-[0.5cqw] h-[0.7cqw] w-[3cqw] rounded-full bg-[#4ab3f4]" />
            )}
          </button>
        ))}
      </div>
      <div className="ml-auto pr-[1cqw] text-[3cqw] font-medium text-white/85 tabular-nums">
        10:24
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- Mac chrome */

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-[3.6cqw] w-[3.6cqw]" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.6 2.3 2.8 2.2 1.1 0 1.6-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-1.1 2.7-2.2.9-1.2 1.2-2.5 1.2-2.5s-2-.8-2-3.6ZM14.2 5.3c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.2Z" />
    </svg>
  )
}

export function MenuBar({ appName = 'Finder', highlight, onApple }) {
  return (
    <div className="absolute inset-x-0 top-0 flex h-[6.5cqw] items-center gap-[3cqw] bg-white/75 px-[2.5cqw] text-[3cqw] font-semibold text-[#22212a] backdrop-blur-md">
      <button
        type="button"
        onClick={onApple}
        aria-label="Apple menu"
        className={`rounded-[0.8cqw] px-[1cqw] py-[0.3cqw] ${
          highlight === 'apple' ? 'anim-halo ring-[0.5cqw] ring-brand' : ''
        }`}
      >
        <AppleLogo />
      </button>
      <span className="font-extrabold">{appName}</span>
      <span className="opacity-70">File</span>
      <span className="opacity-70">Edit</span>
      <span className="opacity-70">View</span>
      <span className="ml-auto tabular-nums opacity-80">10:24</span>
    </div>
  )
}

export function Dock({ items = [], highlight }) {
  return (
    <div className="absolute inset-x-0 bottom-[1.5cqw] flex justify-center">
      <div className="flex items-end gap-[1.8cqw] rounded-[2.4cqw] border border-white/30 bg-white/30 px-[2cqw] py-[1.2cqw] backdrop-blur-md">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            onClick={it.onClick}
            aria-label={it.label}
            className={`relative flex h-[9cqw] w-[9cqw] items-center justify-center rounded-[2cqw] bg-white/85 text-[5cqw] shadow-sm transition active:scale-95 ${
              highlight === it.id ? 'anim-halo ring-[0.6cqw] ring-white' : ''
            }`}
          >
            <span aria-hidden="true">{it.emoji}</span>
            {it.open && (
              <span className="absolute -bottom-[0.9cqw] h-[0.8cqw] w-[0.8cqw] rounded-full bg-[#22212a]/60" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// A real taskbar and dock always have something pinned to them. When a lesson
// isn't using them for anything, these stand in so the mock computer doesn't
// look broken — they're scenery, and tapping them does nothing.
const PINNED = [
  { id: 'pin-web', emoji: '🌐', label: 'Browser' },
  { id: 'pin-mail', emoji: '📧', label: 'Mail' },
  { id: 'pin-files', emoji: '📂', label: 'Files' },
]

/** Picks the right bottom/top furniture for the learner's chosen computer. */
export function SystemChrome({ apps = [], onStart, startOpen, highlight, appName }) {
  const { device } = useLocale()
  const items = apps.length ? apps : PINNED
  if (device === 'mac') {
    return (
      <>
        <MenuBar appName={appName} highlight={highlight} onApple={onStart} />
        <Dock items={items} highlight={highlight} />
      </>
    )
  }
  return <TaskBar items={items} onStart={onStart} startOpen={startOpen} highlight={highlight} />
}

/* ------------------------------------------------------- Desktop elements */

export function DesktopIcon({
  emoji,
  label,
  selected,
  highlight,
  onClick,
  onDoubleClick,
  onContextMenu,
  onPointerDown,
  onPointerUp,
  style,
}) {
  return (
    <button
      type="button"
      style={style}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      aria-label={label}
      className={`absolute flex w-[17cqw] flex-col items-center gap-[0.6cqw] rounded-[1.4cqw] px-[0.8cqw] py-[1cqw] text-center transition ${
        selected ? 'bg-white/30 ring-[0.4cqw] ring-white/70' : ''
      } ${highlight ? 'anim-halo ring-[0.6cqw] ring-white' : ''}`}
    >
      <span className="text-[8cqw] leading-none drop-shadow" aria-hidden="true">
        {emoji}
      </span>
      <span className="w-full text-[3cqw] leading-tight font-semibold text-white [text-shadow:0_1px_2px_rgb(0_0_0/.6)]">
        {label}
      </span>
    </button>
  )
}

/** A generic app window: title bar, traffic lights or Windows controls, body. */
export function WindowFrame({
  title,
  emoji,
  children,
  onClose,
  onMinimize,
  onMaximize,
  highlight,
  className = '',
  style,
  bodyClass = 'bg-white',
}) {
  const { device } = useLocale()
  const ring = (id) => (highlight === id ? 'anim-halo ring-[0.6cqw] ring-brand' : '')

  return (
    <div
      className={`absolute overflow-hidden rounded-[1.6cqw] border border-black/15 bg-white shadow-[0_4cqw_8cqw_-3cqw_rgb(0_0_0/.5)] ${className}`}
      style={style}
    >
      {device === 'mac' ? (
        <div className="flex h-[7cqw] items-center gap-[1.4cqw] border-b border-black/10 bg-[#eceaf0] px-[2cqw]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`h-[3.2cqw] w-[3.2cqw] rounded-full bg-[#ff5f57] ${ring('close')}`}
          />
          <button
            type="button"
            onClick={onMinimize}
            aria-label="Minimize"
            className={`h-[3.2cqw] w-[3.2cqw] rounded-full bg-[#febc2e] ${ring('minimize')}`}
          />
          <button
            type="button"
            onClick={onMaximize}
            aria-label="Maximize"
            className={`h-[3.2cqw] w-[3.2cqw] rounded-full bg-[#28c840] ${ring('maximize')}`}
          />
          <span className="mx-auto pr-[6cqw] text-[3.1cqw] font-bold text-[#3c3a44]">
            {emoji} {title}
          </span>
        </div>
      ) : (
        <div className="flex h-[7cqw] items-center bg-[#f3f1f5] pl-[2cqw]">
          <span className="text-[3.1cqw] font-bold text-[#3c3a44]">
            {emoji} {title}
          </span>
          <div className="ml-auto flex h-full">
            <button
              type="button"
              onClick={onMinimize}
              aria-label="Minimize"
              className={`flex h-full w-[7cqw] items-center justify-center hover:bg-black/10 ${ring('minimize')}`}
            >
              <span className="block h-[0.5cqw] w-[2.6cqw] bg-[#3c3a44]" />
            </button>
            <button
              type="button"
              onClick={onMaximize}
              aria-label="Maximize"
              className={`flex h-full w-[7cqw] items-center justify-center hover:bg-black/10 ${ring('maximize')}`}
            >
              <span className="block h-[2.4cqw] w-[2.4cqw] border-[0.45cqw] border-[#3c3a44]" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`flex h-full w-[7cqw] items-center justify-center text-[3.6cqw] font-bold text-[#3c3a44] hover:bg-[#e81123] hover:text-white ${ring('close')}`}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className={`h-[calc(100%-7cqw)] overflow-hidden ${bodyClass}`}>{children}</div>
    </div>
  )
}

/** Right-click / long-press menu. */
export function ContextMenu({ x, y, items, highlight }) {
  return (
    <div
      className="absolute z-30 min-w-[30cqw] overflow-hidden rounded-[1.2cqw] border border-black/15 bg-white py-[0.8cqw] shadow-[0_2cqw_6cqw_-1cqw_rgb(0_0_0/.45)]"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {items.map((it) =>
        it.divider ? (
          <div key={it.id} className="my-[0.6cqw] h-px bg-black/10" />
        ) : (
          <button
            key={it.id}
            type="button"
            onClick={it.onClick}
            className={`block w-full px-[2.4cqw] py-[1.2cqw] text-left text-[3.2cqw] font-semibold text-[#2a2830] hover:bg-brand-soft ${
              highlight === it.id ? 'anim-halo bg-brand-soft' : ''
            } ${it.muted ? 'opacity-40' : ''}`}
          >
            {it.label}
          </button>
        )
      )}
    </div>
  )
}

/** A decorative mouse pointer, for pointing at things in illustrations. */
export function Pointer({ x, y, animate = true, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute z-40 w-[7cqw] drop-shadow-[0_1px_2px_rgb(0_0_0/.5)] ${
        animate ? 'anim-cursor' : ''
      } ${className}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden="true"
    >
      <path d="M5 2.5 19 12l-6.2.9 3.1 6.4-2.6 1.3-3.1-6.4L5 18.6z" fill="#fff" stroke="#22212a" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
