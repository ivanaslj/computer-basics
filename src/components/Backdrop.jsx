/**
 * The quiet pattern behind every screen except a lesson.
 *
 * Drawn from a reference of organic forms filled with fine contour lines, like
 * a topographic map — but only its geometry and its restraint are borrowed, not
 * its palette. The reference is cream on near-black; this app is warm cream and
 * light by default, so the rings are drawn in the app's own brand token and
 * follow the theme without knowing a theme exists.
 *
 * It is one element with no children and nothing animated. All the work is in
 * index.css, and the reasoning about why it is safe to put behind text is
 * written there, next to the numbers it depends on.
 */
export default function Backdrop() {
  return <div className="backdrop" aria-hidden="true" />
}
