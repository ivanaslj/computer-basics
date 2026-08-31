// Generates the PWA icons with no image dependencies: draws into an RGBA
// buffer at 4x, box-downsamples for antialiasing, encodes a PNG via zlib.
import zlib from 'node:zlib'
import fs from 'node:fs'
import path from 'node:path'

const SS = 4 // supersample factor

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))
const INDIGO_TOP = [79, 70, 229]
const INDIGO_BOT = [109, 40, 217]
const WHITE = [255, 255, 255]
const SCREEN = [46, 42, 130]

function roundRect(x, y, w, h, r) {
  return (px, py) => {
    if (px < x || px > x + w || py < y || py > y + h) return false
    const cx = Math.min(Math.max(px, x + r), x + w - r)
    const cy = Math.min(Math.max(py, y + r), y + h - r)
    const dx = px - cx, dy = py - cy
    return dx * dx + dy * dy <= r * r
  }
}

function polygon(pts) {
  return (px, py) => {
    let inside = false
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j]
      if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside
    }
    return inside
  }
}

// `inset` shrinks the artwork toward the centre so maskable icons keep their
// safe zone when a launcher crops them to a circle.
function draw(size, inset) {
  const S = size * SS
  const buf = Buffer.alloc(S * S * 4)
  const c = (v) => 0.5 + (v - 0.5) * inset // unit coord -> inset unit coord

  const screenOuter = roundRect(c(0.20), c(0.265), 0.60 * inset, 0.375 * inset, 0.035 * inset)
  const screenInner = roundRect(c(0.235), c(0.30), 0.53 * inset, 0.305 * inset, 0.018 * inset)
  const base = roundRect(c(0.115), c(0.665), 0.77 * inset, 0.07 * inset, 0.035 * inset)
  const cursor = polygon(
    [[0.435, 0.355], [0.435, 0.545], [0.482, 0.498], [0.515, 0.575],
     [0.552, 0.558], [0.520, 0.484], [0.585, 0.478]].map(([x, y]) => [c(x), c(y)])
  )

  for (let py = 0; py < S; py++) {
    const uy = (py + 0.5) / S
    const bg = mix(INDIGO_TOP, INDIGO_BOT, uy)
    for (let px = 0; px < S; px++) {
      const ux = (px + 0.5) / S
      let col = bg
      if (screenOuter(ux, uy)) col = WHITE
      if (screenInner(ux, uy)) col = SCREEN
      if (cursor(ux, uy)) col = WHITE
      if (base(ux, uy)) col = WHITE
      const o = (py * S + px) * 4
      buf[o] = col[0]; buf[o + 1] = col[1]; buf[o + 2] = col[2]; buf[o + 3] = 255
    }
  }

  // box-downsample SS x SS -> 1
  const out = Buffer.alloc(size * size * 4)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const o = ((y * SS + sy) * S + (x * SS + sx)) * 4
          r += buf[o]; g += buf[o + 1]; b += buf[o + 2]
        }
      }
      const n = SS * SS, o = (y * size + x) * 4
      out[o] = Math.round(r / n); out[o + 1] = Math.round(g / n); out[o + 2] = Math.round(b / n); out[o + 3] = 255
    }
  }
  return out
}

function png(rgba, size) {
  const raw = Buffer.alloc((size * 4 + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0 // filter: none
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4)
  }
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
    const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body) >>> 0)
    return Buffer.concat([len, body, crc])
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

let TABLE = null
function crc32(buf) {
  if (!TABLE) {
    TABLE = new Int32Array(256)
    for (let n = 0; n < 256; n++) {
      let c = n
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      TABLE[n] = c
    }
  }
  let c = -1
  for (let i = 0; i < buf.length; i++) c = TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return c ^ -1
}

const dir = path.resolve('public/icons')
fs.mkdirSync(dir, { recursive: true })
const targets = [
  ['icon-192.png', 192, 1],
  ['icon-512.png', 512, 1],
  ['icon-512-maskable.png', 512, 0.72],
  ['apple-touch-icon.png', 180, 1],
]
for (const [name, size, inset] of targets) {
  fs.writeFileSync(path.join(dir, name), png(draw(size, inset), size))
  console.log('wrote', name, size)
}
