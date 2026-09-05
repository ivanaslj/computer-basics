import { useEffect, useState } from 'react'

/* ---------------------------------------------------------------- Buttons */

const VARIANTS = {
  primary: 'bg-brand text-white shadow-[0_4px_0_var(--color-brand-dark)]',
  success: 'bg-grass text-white shadow-[0_4px_0_var(--color-grass-dark)]',
  neutral: 'bg-surface text-ink border-2 border-line shadow-[0_4px_0_var(--color-line)]',
  ghost: 'bg-transparent text-ink-soft',
  danger: 'bg-berry text-white shadow-[0_4px_0_#96234f]',
}

const SIZES = {
  lg: 'text-[1.05rem] px-6 py-4 rounded-2xl',
  md: 'text-[0.95rem] px-5 py-3 rounded-xl',
  sm: 'text-[0.85rem] px-4 py-2 rounded-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'lg',
  full = false,
  className = '',
  ...props
}) {
  return (
    <button
      className={`btn-3d font-bold tracking-tight ${VARIANTS[variant]} ${SIZES[size]} ${
        full ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Copies `text` to the clipboard. The write happens synchronously inside the
 * click handler (no `await` before it) because some mobile browsers only
 * honor a clipboard write that's tied directly to the user gesture that
 * triggered it. Falls back to a "select the text yourself" message if the
 * API is missing or permission is denied — `text` should always also be
 * rendered visibly by the caller, never revealed only through this button.
 */
export function CopyButton({ text, label, copiedLabel, failedLabel, className = '' }) {
  const [state, setState] = useState('idle') // 'idle' | 'copied' | 'failed'

  const onClick = () => {
    if (!navigator.clipboard?.writeText) {
      setState('failed')
    } else {
      navigator.clipboard
        .writeText(text)
        .then(() => setState('copied'))
        .catch(() => setState('failed'))
    }
    setTimeout(() => setState('idle'), 2000)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-3d inline-flex items-center gap-2 rounded-xl border-2 border-b-4 px-4 py-2.5 text-sm font-bold ${
        state === 'copied'
          ? 'border-grass-dark bg-grass text-white'
          : state === 'failed'
            ? 'border-berry/40 bg-berry-soft text-berry'
            : 'border-brand-dark bg-brand text-white'
      } ${className}`}
    >
      {state === 'copied' ? copiedLabel : state === 'failed' ? failedLabel : label}
    </button>
  )
}

/* ------------------------------------------------------------- Rich text */

/**
 * A deliberately tiny markup so lesson copy stays readable in the curriculum
 * files while still letting us highlight the things that matter most to a
 * beginner:
 *
 *   **important**   emphasis
 *   __new word__    a term being defined for the first time
 *   [[Ctrl]]        a key on the keyboard, drawn as a key cap
 */
const TOKEN = /(\*\*[^*]+\*\*|__[^_]+__|\[\[[^\]]+\]\])/g

export function RichText({ children, className = '' }) {
  const text = typeof children === 'string' ? children : String(children ?? '')
  const parts = text.split(TOKEN).filter((p) => p !== '')
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('**')) {
          return (
            <strong key={i} className="font-bold text-ink">
              {part.slice(2, -2)}
            </strong>
          )
        }
        if (part.startsWith('__')) {
          return (
            <span
              key={i}
              className="font-bold text-brand underline decoration-brand/35 decoration-2 underline-offset-4"
            >
              {part.slice(2, -2)}
            </span>
          )
        }
        if (part.startsWith('[[')) return <Keycap key={i}>{part.slice(2, -2)}</Keycap>
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

export function Keycap({ children, tone = 'default' }) {
  const tones = {
    default: 'bg-surface border-line text-ink',
    brand: 'bg-brand-soft border-brand/30 text-brand',
  }
  return (
    <kbd
      className={`mx-[0.1em] inline-flex min-w-[2em] items-center justify-center rounded-lg border-2 border-b-[3px] px-2 py-[0.15em] align-baseline font-sans text-[0.85em] font-bold whitespace-nowrap ${tones[tone]}`}
    >
      {children}
    </kbd>
  )
}

/* -------------------------------------------------------------- Surfaces */

/* ----------------------------------------------------------------- Fields */

/**
 * A labelled text input.
 *
 * Two things here are for this audience specifically. The label is a real
 * <label>, always visible — placeholder-as-label disappears the moment you
 * start typing, which is exactly when someone unsure of themselves looks back
 * to check what the box was for. And a password field gets a Show button,
 * because a beginner who cannot see what they typed has no way to tell a typo
 * from a wrong password.
 */
export function Field({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  hint,
  showLabel,
  hideLabel,
  autoComplete,
  inputMode,
  disabled,
}) {
  const [revealed, setRevealed] = useState(false)
  const isPassword = type === 'password'
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.95rem] font-bold">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && revealed ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`w-full rounded-2xl border-2 bg-surface px-4 py-3.5 text-[1.05rem] text-ink outline-none ${
            isPassword ? 'pr-20' : ''
          } ${error ? 'border-berry' : 'border-line focus:border-brand'}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-xl px-3 py-2 text-[0.85rem] font-bold text-brand"
          >
            {revealed ? hideLabel : showLabel}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-[0.9rem] leading-snug font-semibold text-berry" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[0.9rem] leading-snug text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function Card({ children, className = '', tone = 'plain', ...props }) {
  const tones = {
    plain: 'bg-surface border-line',
    brand: 'bg-brand-soft border-brand/20',
    grass: 'bg-grass-soft border-grass/20',
    sun: 'bg-sun-soft border-sun/25',
    berry: 'bg-berry-soft border-berry/20',
  }
  return (
    <div className={`rounded-3xl border-2 p-5 ${tones[tone]} ${className}`} {...props}>
      {children}
    </div>
  )
}

export function ProgressBar({ value, tone = 'grass', className = '' }) {
  const tones = { grass: 'bg-grass', brand: 'bg-brand', sun: 'bg-sun' }
  return (
    <div
      className={`h-3.5 w-full overflow-hidden rounded-full bg-cream-deep ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full ${tones[tone]} transition-[width] duration-500 ease-out`}
        style={{ width: `${Math.max(value > 0 ? 6 : 0, Math.min(100, value))}%` }}
      />
    </div>
  )
}

/** Bottom sheet. Used for anything that would otherwise be a jarring dialog. */
export function Sheet({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        className="anim-rise relative w-full max-w-lg rounded-t-[2rem] border-t-2 border-line bg-cream px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-line" />
        {title && <h2 className="mb-2 text-2xl leading-tight font-extrabold">{title}</h2>}
        {children}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- Icons */

export function Check({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 13l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Lock({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4.5" y="10" width="15" height="10.5" rx="3" fill="currentColor" />
      <path
        d="M8 10V7.5a4 4 0 0 1 8 0V10"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ChevronLeft({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M15 5l-7 7 7 7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Gear({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M18 6l-1.4 1.4M7.4 16.6 6 18M18 18l-1.4-1.4M7.4 7.4 6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Flame({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13 2c.6 3.2-1.1 4.6-2.6 6C8.6 9.7 7 11.2 7 14a5 5 0 0 0 10 0c0-1.6-.6-2.7-1.4-3.7-.3 1-.9 1.6-1.7 1.9.5-2.6-.3-5.5-.9-6.6C12.4 4.4 13 3 13 2Z" />
    </svg>
  )
}
