import { useEffect, useRef } from 'react'
import FRAGMENT from './metal.frag?raw'

/**
 * The dark theme's background: liquid metal under a dark wash.
 *
 * The shader is the daily dashboard's own (metal.frag is a verbatim copy of
 * daily-dashboard/static/shaders/metal.frag), with that dashboard's "Cav Co"
 * palette: soft graphite folds with bright silver streaks. The light theme
 * keeps the contour Backdrop and never mounts this.
 *
 * It flows faster than the dashboard's, and faster again in a lesson, where it
 * is also brighter (see .metal-wash--lesson). Going in and out of a lesson
 * eases between the two speeds rather than switching: the shader multiplies
 * time by speed, so changing the speed directly would make the whole surface
 * jump. Instead the speed is applied here, to a running phase, and the shader
 * is handed the phase with uSpeed fixed at 1.
 *
 * Kept cheap enough for a cheap phone, which is the device this app is for:
 *   - rendered at half the CSS-pixel size and upscaled, at most 30 frames a
 *     second (the dashboard's cap), on a "low-power" context
 *   - no frames while the tab is hidden, and none while anything is scrolling,
 *     so the GPU is never fighting the scroll for time. Time only advances on
 *     frames actually drawn, so the flow resumes where it stopped, not with a jump
 *   - "reduce motion" draws one still frame and never animates
 *   - no WebGL, or a shader that will not compile, leaves the static gradient
 *     in index.css showing instead
 *
 * How dark the wash is was measured, not guessed — see .metal-wash in index.css.
 */

// Cav Co, from daily-dashboard/static/js/themes.js.
const PALETTE = {
  base: '#020202',
  deep: '#312e2e',
  metal: '#4e4949',
  highlight: '#c4c0bf',
  rim: '#807d7d',
}
// Flow speed. The dashboard runs at 0.045; a Claude Code lesson runs at 15
// times that, for a livelier course aimed at a younger audience.
const PACE = { app: 0.07, lesson: 0.13, code: 0.68 }
const PACE_EASE_MS = 500 // time constant: settles on a new pace in ~1.5s
const RESOLUTION = 0.5 // fraction of CSS pixels rendered, then upscaled
const FPS = 30
const FADE_MS = 700
const SCROLL_REST_MS = 160 // how long after the last scroll before frames resume

/**
 * `pace` is 'app', 'lesson', or 'code' (a lesson in the Claude Code course).
 * `preview` draws only the still gradient and the wash, for the launch
 * animation's picture of the app: a second live WebGL canvas inside a layer
 * being scaled every frame is the last thing that animation can afford.
 */
export default function MetalBackdrop({ pace: paceName = 'app', preview = false }) {
  const boxRef = useRef(null)
  const lesson = paceName !== 'app'
  // Read by the render loop, so a change of screen never restarts WebGL.
  const paceRef = useRef(PACE.app)
  useEffect(() => {
    paceRef.current = PACE[paceName] ?? PACE.app
  }, [paceName])

  useEffect(() => {
    if (preview) return
    // A new canvas every time this runs, never one React kept. The cleanup
    // below loses the context to free the GPU, and a canvas whose context has
    // been lost hands back that same dead context forever — so reusing one
    // (as React's development double-mount does) silently gets no metal.
    const canvas = document.createElement('canvas')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      depth: false,
      powerPreference: 'low-power',
    })
    // Never attaching the canvas is what leaves the gradient behind it showing.
    if (!gl || !gl.getExtension('OES_standard_derivatives')) return

    let program
    try {
      program = buildProgram(gl)
    } catch (err) {
      console.warn('Metal background off:', err)
      return
    }
    boxRef.current.prepend(canvas) // under the wash

    const u = (name) => gl.getUniformLocation(program, name)
    const uRes = u('uRes')
    const uTime = u('uTime')
    const uFade = u('uFade')
    gl.uniform1f(u('uSpeed'), 1) // the pace is applied to the phase instead
    gl.uniform3fv(u('uBase'), rgb(PALETTE.base))
    gl.uniform3fv(u('uDeep'), rgb(PALETTE.deep))
    gl.uniform3fv(u('uMetal'), rgb(PALETTE.metal))
    gl.uniform3fv(u('uHigh'), rgb(PALETTE.highlight))
    gl.uniform3fv(u('uRim'), rgb(PALETTE.rim))

    // Start somewhere different each load, like the dashboard.
    let phase = (40 + Math.random() * 200) * PACE.app
    let pace = paceRef.current
    let shown = still ? FADE_MS : 0
    const draw = () => {
      gl.uniform1f(uTime, phase)
      gl.uniform1f(uFade, Math.min(1, shown / FADE_MS))
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    // The canvas is sized in CSS to the largest viewport (100lvh), so a phone's
    // address bar sliding away does not resize, and so reallocate, the canvas.
    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * RESOLUTION))
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * RESOLUTION))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      draw()
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    let last = 0
    let lastScroll = -Infinity
    const onScroll = () => { lastScroll = performance.now() }
    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      if (now - last < 1000 / FPS - 2) return
      // Capped, so a long gap (a scroll, a backgrounded tab) is not a leap.
      const step = Math.min(now - last, 100)
      last = now
      if (now - lastScroll < SCROLL_REST_MS) return
      pace += (paceRef.current - pace) * (1 - Math.exp(-step / PACE_EASE_MS))
      phase += (step / 1000) * pace
      shown += step
      draw()
    }
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    if (!still) {
      last = performance.now()
      raf = requestAnimationFrame(frame)
      // Capture, because scroll does not bubble and a lesson scrolls an inner
      // element rather than the page.
      document.addEventListener('scroll', onScroll, { capture: true, passive: true })
      document.addEventListener('visibilitychange', onVisibility)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('scroll', onScroll, { capture: true })
      document.removeEventListener('visibilitychange', onVisibility)
      // Switching to the light theme unmounts this; give the GPU memory back now
      // rather than whenever the context happens to be collected.
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      canvas.remove()
    }
  }, [preview])

  return (
    <div ref={boxRef} className="metal" aria-hidden="true">
      <div className={`metal-wash ${lesson ? 'metal-wash--lesson' : ''}`} />
    </div>
  )
}

function buildProgram(gl) {
  const compile = (type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader))
    return shader
  }
  const program = gl.createProgram()
  gl.attachShader(program, compile(gl.VERTEX_SHADER, 'attribute vec2 a; void main() { gl_Position = vec4(a, 0.0, 1.0); }'))
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program))
  gl.useProgram(program)

  // One triangle that covers the whole screen.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const a = gl.getAttribLocation(program, 'a')
  gl.enableVertexAttribArray(a)
  gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0)
  return program
}

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
