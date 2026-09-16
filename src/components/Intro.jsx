import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import LogoMark from './LogoMark'
import { reducedMotion } from '../lib/motion'

/**
 * The launch animation: a computer on a desk, and the camera pushes into its
 * screen until the screen *is* the app.
 *
 * This is theatre, not a loading screen, and the difference matters. The store
 * reads localStorage synchronously, so the app behind this overlay is already
 * fully rendered and usable the whole time — nothing is waiting on anything.
 * If a real wait ever appears, it must not hide behind this: a beginner
 * staring at a pretty desk while something silently fails is the worst
 * version of both ideas.
 *
 * It subscribes to no context on purpose. No useApp(), no useAuth() — so the
 * two and a half seconds cost exactly zero re-renders of anything else.
 */

// Module-level, matching the `reloading` flag in lib/updates.js: StrictMode
// double-invokes effects in development, and a reload tears component state
// down anyway, so neither could hold this.
let played = false

const SKIP_KEY = 'computer-basics:skip-intro'

// Where the desk's front edge sits, as a share of the viewport height. Must
// match the `inset` on .intro-desk in index.css.
const DESK_TOP = 0.66

/** Did we arrive here by the service worker silently reloading the page? */
function arrivedFromReload() {
  try {
    const flagged = sessionStorage.getItem(SKIP_KEY)
    if (flagged) sessionStorage.removeItem(SKIP_KEY)
    return Boolean(flagged)
  } catch {
    // Private mode, or storage disabled. Play the animation; it is only a
    // nicety, and a thrown getItem must never stop the app from starting.
    return false
  }
}

export default function Intro() {
  const [phase, setPhase] = useState(() => {
    if (played) return 'done'
    // A new version swapping itself in reloads the page. Replaying the whole
    // cinematic there would look like the app had restarted itself for no
    // reason, which is exactly the confusion the silent update avoids.
    if (arrivedFromReload()) return 'done'
    // Launched into the background by the OS — they would come back to an
    // animation already half over.
    if (document.visibilityState === 'hidden') return 'done'
    return reducedMotion() ? 'reduced' : 'play'
  })

  useEffect(() => {
    if (phase !== 'play' && phase !== 'reduced') return
    played = true
    // The reduced version is a plain fade, so it is over much sooner. This is
    // a JS timer, and the global reduced-motion CSS override cannot shorten
    // it — hence asking matchMedia directly rather than trusting the squash.
    const ms = phase === 'reduced' ? 250 : 2500
    const timer = setTimeout(() => setPhase('done'), ms)
    return () => clearTimeout(timer)
  }, [phase])

  // The screen is a landscape monitor — 16:10, like a computer, not like the
  // phone it is being viewed on. That shape is the whole reason this cannot be
  // a fixed percentage: to end with the screen covering a tall portrait
  // viewport, the camera has to push in by however much *this* screen's aspect
  // differs from *this* device's, which is a number only the device knows.
  // So measure, then hand CSS the answer.
  const root = useRef(null)
  useLayoutEffect(() => {
    if (phase !== 'play') return
    const el = root.current
    if (!el) return
    const measure = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const sw = Math.round(vw * 0.66)
      const sh = Math.round(sw / 1.6)
      el.style.setProperty('--intro-sw', `${sw}px`)
      el.style.setProperty('--intro-sh', `${sh}px`)

      // Stand the monitor *on* the desk rather than near it. These three
      // fractions mirror the bezel padding, neck and foot in the stylesheet;
      // if those change, change these. Doing it here rather than in CSS
      // because the desk's height is a share of the viewport while the
      // monitor's is a share of the screen, and only one of them can be the
      // unit that decides where they meet.
      const deskTop = vh * DESK_TOP
      const bezelHalf = (sh * 1.1) / 2
      const standHeight = sh * 0.21
      const cy = Math.round(deskTop - standHeight - bezelHalf)
      el.style.setProperty('--intro-cy', `${cy}px`)

      // How far to push, so that the screen ends up covering the viewport.
      //
      // The camera aims at the screen's centre, which sits at cy — not at the
      // middle of the viewport, because the monitor stands on a desk in the
      // lower half. So the screen has to grow until its half-height clears
      // whichever viewport edge is *farther* from cy, rather than merely half
      // the viewport. Using vh / sh here instead leaves a sliver of bezel
      // showing along the top edge at the end of the push. The 1.02 is slack
      // against sub-pixel rounding.
      const z = Math.max(vw / sw, (2 * Math.max(cy, vh - cy)) / sh) * 1.02
      el.style.setProperty('--intro-z', String(z))

      // Waypoints for the push, spaced so the zoom *looks* like it is moving
      // at a steady speed. Interpolating scale linearly does not: going from
      // 1x to 2x covers as much apparent distance as 2x to 4x, so a straight
      // ramp appears to bolt away at the start and crawl at the end. Equal
      // ratios per unit of time is the fix, which means powers, not fractions.
      for (const f of [25, 50, 75]) {
        el.style.setProperty(`--intro-z${f}`, String(Math.pow(z, f / 100)))
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [phase])

  // Skipping does not unmount on the spot. The overlay stays up, still
  // swallowing pointer events, for the length of the fade — otherwise the
  // finger that skipped lands on whatever is underneath.
  const skip = useCallback(() => {
    setPhase((p) => (p === 'play' ? 'out' : p))
  }, [])

  // preventDefault on pointerdown suppresses the compatibility mouse/click
  // sequence, which would otherwise land as a ghost tap on whatever sits
  // underneath the moment the overlay goes.
  const onPointerDown = useCallback(
    (e) => {
      e.preventDefault()
      skip()
    },
    [skip]
  )

  useEffect(() => {
    if (phase !== 'out') return
    const timer = setTimeout(() => setPhase('done'), 180)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'play') return
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [phase, skip])

  if (phase === 'done') return null

  if (phase === 'reduced') {
    return (
      <div className="intro intro--reduced" role="presentation" aria-hidden="true">
        <LogoMark />
      </div>
    )
  }

  return (
    <div
      ref={root}
      className={`intro ${phase === 'out' ? 'intro--out' : ''}`}
      role="presentation"
      aria-hidden="true"
      onPointerDown={onPointerDown}
    >
      <div className="intro-stage">
        <div className="intro-room" />
        <div className="intro-desk" />
        <div className="intro-contact" />

        {/* Props, so it reads as somebody's desk rather than a product shot. */}
        <svg className="intro-mug" viewBox="0 0 40 34" aria-hidden="true">
          <path d="M4 6h26v18a8 8 0 0 1-8 8h-10a8 8 0 0 1-8-8z" fill="#c9613f" />
          <path d="M30 11h3a5 5 0 0 1 0 10h-3" fill="none" stroke="#c9613f" strokeWidth="3.5" />
          <ellipse cx="17" cy="6" rx="13" ry="3.4" fill="#e8d9cf" />
        </svg>
        <svg className="intro-plant" viewBox="0 0 44 54" aria-hidden="true">
          <path d="M22 30c-1-9-6-14-13-17 6 9 7 13 8 17z" fill="#3f8f57" />
          <path d="M22 30c1-10 6-16 14-19-7 10-9 14-10 19z" fill="#4fa868" />
          <path d="M22 30c0-7 2-12 5-16-2 7-3 11-3 16z" fill="#5cb877" />
          <path d="M9 32h26l-3 20a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2z" fill="#b5763f" />
          <rect x="7" y="29" width="30" height="6" rx="2" fill="#c98850" />
        </svg>

        <div className="intro-mac">
          <div className="intro-bezel">
            <div className="intro-screen">
              <LogoMark className="intro-logo" />
            </div>
            <div className="intro-glare" />
          </div>
          <div className="intro-stand">
            <div className="intro-neck" />
            <div className="intro-foot" />
          </div>
        </div>
      </div>
    </div>
  )
}
