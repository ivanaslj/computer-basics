import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import LogoMark from './LogoMark'
import { reducedMotion } from '../lib/motion'
import { launchScreen } from '../lib/launch'
import { useApp } from '../state/store'
import Onboarding from '../screens/Onboarding'
import Hub from '../screens/Hub'
import Path from '../screens/Path'

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
 * What is on the monitor is the real app — the actual screen it is about to
 * open, rendered at true device size and scaled down, so the camera zooms into
 * the running app rather than into a picture of one. At the end of the push the
 * screen has become the viewport and the preview is at 1:1, which is what makes
 * the handover invisible.
 */

// Module-level, matching the `reloading` flag in lib/updates.js: StrictMode
// double-invokes effects in development, and a reload tears component state
// down anyway, so neither could hold this.
let played = false

const SKIP_KEY = 'computer-basics:skip-intro'

/**
 * The screen's size as a fraction of the viewport, and the one number the whole
 * scene is built from. It sets how deep the zoom is (1/S), how big the monitor
 * is, and therefore where the desk has to be. Tune it by eye.
 */
const S = 0.3

// Everything below the screen, as fractions of the screen's own height. These
// mirror the stylesheet, and the desk is positioned from them — see measure().
const CHIN = 0.14
const NECK = 0.16
const FOOT = 0.05

// The camera move, in milliseconds from the moment the overlay mounts: hold on
// the desk, then push in. The overlay's own fade-out is CSS and starts at
// PUSH_END.
const SETTLE_END = 800
const PUSH_END = 2000

// One sample per ~8ms — comfortably finer than a 16.7ms frame at 60fps, so a
// rendered frame never straddles a long straight segment. Sampling coarser
// than the frame rate reintroduces exactly the kind of small speed jumps this
// whole approach exists to remove.
const FRAMES = 240

// Drops on the inside of the glass. Laid out by hand rather than randomly, for
// the same reason as the lesson-complete confetti: a fixed set can be nudged
// until it looks unforced, and it does not reshuffle on every render.
const DRIPS = [
  { '--dl': '22%', '--dt': '8%', '--dy': '150px', '--dd': '5.5s', '--delay': '0s' },
  { '--dl': '64%', '--dt': '4%', '--dy': '170px', '--dd': '7s', '--delay': '1.4s' },
  { '--dl': '41%', '--dt': '26%', '--dy': '110px', '--dd': '6.2s', '--delay': '2.9s' },
  { '--dl': '81%', '--dt': '18%', '--dy': '130px', '--dd': '8s', '--delay': '.6s' },
]

const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5)

// Sine, not cubic. Cubic ease-in-out makes the middle of the push roughly
// three and a half times faster than its start, which on a 5x zoom reads as a
// lurch; sine keeps that ratio nearer to one and a half, so the move is still
// clearly eased at both ends but never appears to surge.
const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2

/**
 * The whole camera move as one densely sampled list of transforms.
 *
 * This is sampled in JavaScript rather than written as CSS keyframes because of
 * a rule that is easy to forget: a CSS `animation-timing-function` applies
 * *between each pair of keyframes*, not across the animation as a whole. The
 * first version of this had waypoints at 25/50/75% and one ease-in-out curve,
 * which meant the curve ran four separate times — the zoom decelerated to a
 * near-stop at every waypoint and accelerated out of it again. Measured, the
 * perceived speed swung by 72% of its own mean and hit zero four times. It
 * looked like the app was stuttering.
 *
 * The waypoints themselves were right: perceived zoom speed is logarithmic, so
 * covering equal *ratios* per unit of time is what looks steady, and that means
 * scale has to grow as a power. The mistake was asking CSS to interpolate
 * between them. So: sample the curve here, emit it as many small linear
 * segments, and let the animation run with `linear` easing so nothing can
 * re-apply a curve per segment.
 *
 * The settle and the push are one timeline for the same reason — a CSS
 * animation handing over to a JS one at 800ms is another seam to get wrong.
 */
function buildCameraFrames(z) {
  const frames = []
  for (let i = 0; i <= FRAMES; i++) {
    const offset = i / FRAMES
    const t = offset * PUSH_END
    let scale
    let y
    if (t <= SETTLE_END) {
      // Drifting to rest, as if the camera has just been set down.
      const p = easeOutQuint(t / SETTLE_END)
      scale = 1.045 + (1 - 1.045) * p
      y = 6 * (1 - p)
    } else {
      // Equal ratios per unit time, eased once so it starts and lands softly.
      const p = easeInOutSine((t - SETTLE_END) / (PUSH_END - SETTLE_END))
      scale = Math.pow(z, p)
      y = 0
    }
    // Both parts in every frame, always in the same order: a transform list
    // that changes shape partway through forces a different interpolation and
    // would put a visible kink at the junction.
    frames.push({ offset, transform: `scale(${scale}) translateY(${y}px)` })
  }
  return frames
}

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

const NOOP = () => {}

/**
 * The app, on the monitor.
 *
 * Rendered at true device size and scaled down by CSS rather than laid out
 * inside a ~120px box: every screen here is `max-w-lg` with its own padding and
 * `min-h-dvh`, so reflowing it into something phone-sized would produce a
 * squashed layout that looks nothing like the app. At full size and scaled, it
 * is the app exactly, and `dvh` and the safe-area insets resolve to the same
 * values they will after the handover.
 *
 * `inert` rather than just `pointer-events: none`: this contains real buttons,
 * and neither pointer-events nor the overlay's aria-hidden takes them out of
 * the tab order.
 */
function Preview() {
  const { settings } = useApp()
  const screen = launchScreen(settings)
  return (
    <div className="intro-preview" inert aria-hidden="true">
      {screen === 'onboarding' ? (
        <Onboarding onDone={NOOP} />
      ) : screen === 'path' ? (
        <Path onOpenLesson={NOOP} onOpenSettings={NOOP} onOpenHub={NOOP} />
      ) : (
        <Hub onOpenCourse={NOOP} onOpenSettings={NOOP} onOpenPractice={NOOP} />
      )}
    </div>
  )
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

  // The screen is an exact scaled copy of the viewport, so the app inside it
  // is never distorted and the push can land on it precisely. Measured rather
  // than written in CSS because the desk's position depends on the monitor's
  // size, which depends on the viewport — one chain, resolved here.
  const root = useRef(null)
  useLayoutEffect(() => {
    if (phase !== 'play') return
    const el = root.current
    if (!el) return
    const measure = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const sw = vw * S
      const sh = vh * S
      el.style.setProperty('--intro-sw', `${sw}px`)
      el.style.setProperty('--intro-sh', `${sh}px`)
      el.style.setProperty('--intro-s', String(S))

      // The camera aims at the middle of the viewport, and this is the reason
      // the whole scene is laid out from the monitor outwards rather than the
      // other way round.
      //
      // The stage scales about the screen's centre, so that one point never
      // moves; at the end the screen spans cy ± vh/2. It can only land flush on
      // the viewport if cy *is* the viewport's centre. Put the monitor lower —
      // which is what standing it on a desk used to do — and the landing is off
      // by however far down it sits, which then has to be papered over by
      // zooming further than necessary.
      const cy = vh / 2
      el.style.setProperty('--intro-cy', `${cy}px`)

      // So the desk is positioned from the monitor, not the monitor from the
      // desk: put its surface exactly where the foot of the stand lands. These
      // fractions mirror the stylesheet.
      const deskTop = cy + sh / 2 + sh * (CHIN + NECK + FOOT)
      el.style.setProperty('--intro-desk', `${deskTop}px`)

      // With the screen the viewport's shape and centred on the camera, the
      // zoom that makes it cover the viewport is simply its reciprocal. The 1%
      // is slack: at exactly 1/S a sub-pixel rounding error could flash a
      // hairline of bezel down one edge on the final frame.
      const z = (1 / S) * 1.01
      el.style.setProperty('--intro-z', String(z))

      return z
    }

    const stage = el.querySelector('.intro-stage')
    let camera = null

    const run = () => {
      const z = measure()
      if (!stage?.animate) return
      // Keep our place across a resize, so rotating the phone mid-zoom
      // re-aims the camera instead of restarting the move.
      const at = camera?.currentTime ?? 0
      camera?.cancel()
      camera = stage.animate(buildCameraFrames(z), {
        duration: PUSH_END,
        easing: 'linear', // the shaping is in the samples; see buildCameraFrames
        fill: 'forwards',
      })
      camera.currentTime = at
    }

    run()
    window.addEventListener('resize', run)
    return () => {
      window.removeEventListener('resize', run)
      // Not cancelled on skip — only on unmount. Cancelling mid-fade would
      // snap the scene back to its starting size behind the fading overlay.
      camera?.cancel()
    }
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

        <div className="intro-window">
          <div className="intro-rain">
            <span />
            <span />
          </div>
          {DRIPS.map((d, i) => (
            <span key={i} className="intro-drip" style={d} />
          ))}
        </div>

        <div className="intro-desk" />
        <div className="intro-lamp" />
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
              <Preview />
            </div>
            <div className="intro-glare" />
          </div>
          <div className="intro-stand">
            <div className="intro-chin" />
            <div className="intro-neck" />
            <div className="intro-foot" />
          </div>
        </div>
      </div>
    </div>
  )
}
