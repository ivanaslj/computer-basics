/**
 * Small helpers for the hand-written CSS animations in index.css. No library:
 * everything here is a delay calculation and a media query.
 */

/**
 * Entrance delay for the nth item in a staggered list.
 *
 * The cap is the important part. The path screen has thirty-odd modules, and
 * an uncapped stagger would leave the last one waiting nearly two seconds
 * while the learner stares at a half-built page. Past the cap everything
 * simply arrives together, which nobody notices.
 */
export function stagger(i, step = 55, cap = 6) {
  return { animationDelay: `${Math.min(i, cap) * step}ms` }
}

/**
 * Whether the device asks for less movement. The CSS honours this on its own
 * for anything animated; this is for the cases where JavaScript also has to
 * know — a timer whose duration should shrink, or an animation we'd rather
 * replace than squash.
 */
export function reducedMotion() {
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
}
