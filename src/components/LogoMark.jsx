/**
 * The app's mark: a little monitor with a cursor on it. Shared by the
 * onboarding welcome step and the launch animation, which is why it lives
 * here rather than inside either of them.
 *
 * Sized from the outer box, so a caller can scale the whole thing by passing
 * a different height/width pair — the parts inside are proportional to it.
 */
export default function LogoMark({ className = 'h-24 w-24' }) {
  return (
    <div
      className={`flex items-center justify-center rounded-[1.8rem] bg-gradient-to-b from-brand to-brand-dark shadow-[0_10px_24px_-10px_rgb(var(--color-brand-rgb)/0.8)] ${className}`}
    >
      <svg viewBox="0 0 96 96" className="h-[80%] w-[80%]" aria-hidden="true">
        <rect x="18" y="22" width="60" height="42" rx="6" fill="#2e2a82" stroke="#fff" strokeWidth="5" />
        <rect x="26" y="70" width="44" height="6" rx="3" fill="#fff" />
        <path
          d="M40 34 62 49l-9.7 1.4 4.9 10-4.1 2-4.9-10L40 59z"
          fill="#fff"
          stroke="#2e2a82"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
