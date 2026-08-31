import { useCallback, useEffect, useRef } from 'react'

/**
 * Translates touch gestures into the mouse actions the lessons are teaching.
 *
 *   one tap        -> click
 *   two quick taps -> double-click
 *   press and hold -> right-click
 *
 * This mapping is the whole trick that lets someone practise mouse skills on a
 * phone, so it has to be forgiving: a slow double tap still counts, and a
 * finger that drifts a few pixels during a long press still counts.
 */

const DOUBLE_TAP_MS = 400 // generous — older hands double-tap slowly
const LONG_PRESS_MS = 500
const MOVE_TOLERANCE = 14 // px of drift allowed during a long press

export function useTapGestures({ onClick, onDoubleClick, onLongPress, disabled } = {}) {
  const timers = useRef({ tap: null, hold: null })
  const state = useRef({ taps: 0, held: false, start: null, el: null })

  useEffect(
    () => () => {
      clearTimeout(timers.current.tap)
      clearTimeout(timers.current.hold)
    },
    []
  )

  const cancelHold = useCallback(() => {
    clearTimeout(timers.current.hold)
    timers.current.hold = null
  }, [])

  // Long presses and single taps are both resolved on a timer, and by the time
  // that timer fires React has already reset the event object — `currentTarget`
  // in particular is null. So callbacks get this plain snapshot instead, taken
  // while the event is still live. Handlers can rely on `currentTarget`.
  const snapshot = (e) => ({
    currentTarget: e.currentTarget,
    clientX: e.clientX,
    clientY: e.clientY,
  })

  const onPointerDown = useCallback(
    (e) => {
      if (disabled) return
      const snap = snapshot(e)
      state.current.held = false
      state.current.el = snap.currentTarget
      state.current.start = { x: snap.clientX, y: snap.clientY }
      if (onLongPress) {
        cancelHold()
        timers.current.hold = setTimeout(() => {
          state.current.held = true
          state.current.taps = 0
          clearTimeout(timers.current.tap)
          onLongPress(snap)
        }, LONG_PRESS_MS)
      }
    },
    [disabled, onLongPress, cancelHold]
  )

  const onPointerMove = useCallback(
    (e) => {
      const s = state.current.start
      if (!s || !timers.current.hold) return
      if (Math.abs(e.clientX - s.x) > MOVE_TOLERANCE || Math.abs(e.clientY - s.y) > MOVE_TOLERANCE) {
        cancelHold()
      }
    },
    [cancelHold]
  )

  const onPointerUp = useCallback(
    (e) => {
      if (disabled) return
      const snap = snapshot(e)
      cancelHold()
      if (state.current.held) {
        state.current.held = false
        return
      }
      state.current.taps += 1
      if (state.current.taps === 1) {
        timers.current.tap = setTimeout(
          () => {
            state.current.taps = 0
            onClick?.(snap)
          },
          onDoubleClick ? DOUBLE_TAP_MS : 0
        )
      } else {
        clearTimeout(timers.current.tap)
        state.current.taps = 0
        onDoubleClick?.(snap)
      }
    },
    [disabled, onClick, onDoubleClick, cancelHold]
  )

  const onPointerCancel = useCallback(() => {
    cancelHold()
    state.current.held = false
  }, [cancelHold])

  // A real right-click (someone testing on a laptop) should behave like a long
  // press rather than opening the browser's own menu.
  const onContextMenu = useCallback(
    (e) => {
      e.preventDefault()
      if (disabled) return
      onLongPress?.(snapshot(e))
    },
    [disabled, onLongPress]
  )

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onContextMenu }
}

/**
 * Pointer-based drag with hit testing against elements carrying a
 * `data-drop="<id>"` attribute. Used for dragging a file into a folder — the
 * one file skill that genuinely needs the gesture, not a tap.
 */
export function useDragDrop({ onDrop, disabled } = {}) {
  const ref = useRef({ id: null, el: null })

  const start = useCallback(
    (id, e) => {
      if (disabled) return
      ref.current = { id, el: e.currentTarget }
      e.currentTarget.setPointerCapture?.(e.pointerId)
    },
    [disabled]
  )

  const end = useCallback(
    (e) => {
      const { id } = ref.current
      ref.current = { id: null, el: null }
      if (!id) return
      const under = document.elementFromPoint(e.clientX, e.clientY)
      const zone = under?.closest?.('[data-drop]')
      onDrop?.(id, zone?.dataset.drop ?? null)
    },
    [onDrop]
  )

  return { start, end }
}
