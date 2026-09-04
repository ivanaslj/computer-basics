/**
 * The app's drawn icon set.
 *
 * Deliberately not emoji: emoji render differently on every platform, cannot
 * take the theme's colour, and read as a generated-looking shortcut. These are
 * plain inline SVG in the same hand-drawn style as the icons already in
 * `ui.jsx` — one geometric vocabulary, 24x24, `currentColor` so they inherit
 * text colour and work in light and dark without a second set.
 *
 * The set is intentionally small and reused across many lessons. A tight
 * vocabulary reads as deliberate; a unique glyph per lesson would read as
 * noise, and most lessons are variations on a handful of ideas anyway.
 */

import { ICON_NAMES } from './names'

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/** Wrapper so every icon shares sizing, viewBox and accessibility defaults. */
function Svg({ children, className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...S}>
      {children}
    </svg>
  )
}

/* ------------------------------------------------------- computer & screen */

const Monitor = (p) => (
  <Svg {...p}>
    <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
    <path d="M9 20h6M12 16.5V20" />
  </Svg>
)

const Window = (p) => (
  <Svg {...p}>
    <rect x="2.5" y="4" width="19" height="16" rx="2" />
    <path d="M2.5 8.5h19M6 6.2h.01M8.4 6.2h.01" />
  </Svg>
)

const WindowHidden = (p) => (
  <Svg {...p}>
    <rect x="2.5" y="4" width="19" height="11" rx="2" />
    <path d="M2.5 8.5h19M7 19.5h10" />
  </Svg>
)

const Power = (p) => (
  <Svg {...p}>
    <path d="M12 3v8" />
    <path d="M7.3 6.4a8 8 0 1 0 9.4 0" />
  </Svg>
)

/* -------------------------------------------------------- pointer & hands */

const Cursor = (p) => (
  <Svg {...p}>
    <path d="M5 3l13.5 9-6 .9 3 6.2-2.5 1.2-3-6.2L5 18.6z" />
  </Svg>
)

const DoubleClick = (p) => (
  <Svg {...p}>
    <path d="M6 3.5l9.5 6.3-4.2.6 2.1 4.4-1.8.8-2.1-4.4L6 13.4z" />
    <path d="M16.5 15.5l1.5 1.5M19.5 13.5l1 1M14.5 19l1 1" />
  </Svg>
)

const Mouse = (p) => (
  <Svg {...p}>
    <rect x="7" y="2.5" width="10" height="19" rx="5" />
    <path d="M12 6.5v3.5" />
  </Svg>
)

const Grab = (p) => (
  <Svg {...p}>
    <path d="M8.5 11V6.6a1.4 1.4 0 0 1 2.8 0V11" />
    <path d="M11.3 10.6V5.6a1.4 1.4 0 0 1 2.8 0V11" />
    <path d="M14.1 11V7.6a1.4 1.4 0 0 1 2.8 0v6.2a7 7 0 0 1-7 7 6 6 0 0 1-4.4-2L4 17.2a1.5 1.5 0 0 1 2.3-1.9l2.2 2" />
  </Svg>
)

/** Open raised hand — the "hello, start here" icon on each course's first lesson. */
const Wave = (p) => (
  <Svg {...p}>
    <path d="M7.6 11.4V6.2a1.4 1.4 0 0 1 2.8 0v5.2" />
    <path d="M10.4 11.4V4.8a1.4 1.4 0 0 1 2.8 0v6.6" />
    <path d="M13.2 11.4V5.6a1.4 1.4 0 0 1 2.8 0v5.8" />
    <path d="M16 12V8.4a1.4 1.4 0 0 1 2.8 0v4.4a7.4 7.4 0 0 1-7.4 7.4A6.6 6.6 0 0 1 4.8 13.6v-2.2a1.4 1.4 0 0 1 2.8 0" />
  </Svg>
)

const Press = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3.2v2.4M12 18.4v2.4M3.2 12h2.4M18.4 12h2.4" />
  </Svg>
)

/* ------------------------------------------------------------ files & data */

const Folder = (p) => (
  <Svg {...p}>
    <path d="M3 7.5a2 2 0 0 1 2-2h3.6a2 2 0 0 1 1.5.7l1.2 1.4H19a2 2 0 0 1 2 2v7.9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Svg>
)

const Folders = (p) => (
  <Svg {...p}>
    <path d="M6.5 6.5V5.4a1.7 1.7 0 0 1 1.7-1.7h2.6l1.4 1.7H18a1.7 1.7 0 0 1 1.7 1.7" />
    <path d="M2.6 10a2 2 0 0 1 2-2h3.2l1.4 1.7H18a2 2 0 0 1 2 2v6.6a2 2 0 0 1-2 2H4.6a2 2 0 0 1-2-2z" />
  </Svg>
)

const File = (p) => (
  <Svg {...p}>
    <path d="M6.5 2.8h7L19 8.4v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20.4V4.3a1.5 1.5 0 0 1 1.5-1.5z" />
    <path d="M13.2 2.9v5.6H19" />
  </Svg>
)

const FileText = (p) => (
  <Svg {...p}>
    <path d="M6.5 2.8h7L19 8.4v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20.4V4.3a1.5 1.5 0 0 1 1.5-1.5z" />
    <path d="M13.2 2.9v5.6H19M8.4 13h7M8.4 16.6h4.6" />
  </Svg>
)

const Save = (p) => (
  <Svg {...p}>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h10.2L20 8.3v10.2a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" />
    <path d="M7.6 4v5h8V4M7.6 20v-5.6h8.8V20" />
  </Svg>
)

const Download = (p) => (
  <Svg {...p}>
    <path d="M12 3.4v10.8M7.8 10.2L12 14.4l4.2-4.2" />
    <path d="M4 16.4v2.6a1.6 1.6 0 0 0 1.6 1.6h12.8a1.6 1.6 0 0 0 1.6-1.6v-2.6" />
  </Svg>
)

const Upload = (p) => (
  <Svg {...p}>
    <path d="M12 20.6V9.8M7.8 14L12 9.8l4.2 4.2" />
    <path d="M4 7.6V5a1.6 1.6 0 0 1 1.6-1.6h12.8A1.6 1.6 0 0 1 20 5v2.6" />
  </Svg>
)

const Cloud = (p) => (
  <Svg {...p}>
    <path d="M7 18.5a4.3 4.3 0 0 1-.5-8.6 6 6 0 0 1 11.4 1.6 3.7 3.7 0 0 1-.9 7z" />
  </Svg>
)

const Chart = (p) => (
  <Svg {...p}>
    <path d="M4 20.2h16" />
    <rect x="5.4" y="12" width="3.4" height="6" rx="1" />
    <rect x="10.3" y="8" width="3.4" height="10" rx="1" />
    <rect x="15.2" y="4.6" width="3.4" height="13.4" rx="1" />
  </Svg>
)

const Grid = (p) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9.2h18M3 14.6h18M9.4 4v16M15.2 4v16" />
  </Svg>
)

const Slides = (p) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M12 16v3.4M8.6 20h6.8" />
  </Svg>
)

const Printer = (p) => (
  <Svg {...p}>
    <path d="M7 9V3.8h10V9" />
    <path d="M5 9h14a2 2 0 0 1 2 2v5h-4v4H7v-4H3v-5a2 2 0 0 1 2-2z" />
    <path d="M7 16h10" />
  </Svg>
)

/* ---------------------------------------------------------- web & searching */

const Globe = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M3.2 12h17.6" />
    <path d="M12 3.2a13.5 13.5 0 0 1 0 17.6 13.5 13.5 0 0 1 0-17.6z" />
  </Svg>
)

const Search = (p) => (
  <Svg {...p}>
    <circle cx="10.8" cy="10.8" r="6.6" />
    <path d="M15.6 15.6l4.6 4.6" />
  </Svg>
)

const Shield = (p) => (
  <Svg {...p}>
    <path d="M12 2.9l7.4 3v6.2c0 4.3-3 8-7.4 9.6-4.4-1.6-7.4-5.3-7.4-9.6V5.9z" />
    <path d="M9.2 12.1l1.9 1.9 3.7-3.9" />
  </Svg>
)

const Link = (p) => (
  <Svg {...p}>
    <path d="M9.6 14.4a3.6 3.6 0 0 0 5.2 0l3-3a3.7 3.7 0 0 0-5.2-5.2l-1.4 1.4" />
    <path d="M14.4 9.6a3.6 3.6 0 0 0-5.2 0l-3 3a3.7 3.7 0 0 0 5.2 5.2l1.4-1.4" />
  </Svg>
)

const Paperclip = (p) => (
  <Svg {...p}>
    <path d="M20.4 11.2l-8.6 8.6a5.2 5.2 0 0 1-7.4-7.4l8.6-8.6a3.5 3.5 0 0 1 4.9 4.9l-8.5 8.5a1.7 1.7 0 0 1-2.5-2.4l7.9-7.9" />
  </Svg>
)

const Key = (p) => (
  <Svg {...p}>
    <circle cx="7.6" cy="16.4" r="3.6" />
    <path d="M10.2 13.8L20 4M16.6 7.4l2.2 2.2M14.2 9.8l2.2 2.2" />
  </Svg>
)

const Plug = (p) => (
  <Svg {...p}>
    <path d="M9 2.8v5.4M15 2.8v5.4" />
    <path d="M6.4 8.2h11.2v3.2a5.6 5.6 0 0 1-11.2 0z" />
    <path d="M12 17v4.2" />
  </Svg>
)

/* --------------------------------------------------- writing & communication */

const Pencil = (p) => (
  <Svg {...p}>
    <path d="M16.4 3.6l4 4L8.2 19.8 3.4 20.6l.8-4.8z" />
    <path d="M14.4 5.6l4 4" />
  </Svg>
)

const Mail = (p) => (
  <Svg {...p}>
    <rect x="2.8" y="5" width="18.4" height="14" rx="2" />
    <path d="M3.4 6.6l8.6 6.2 8.6-6.2" />
  </Svg>
)

const Inbox = (p) => (
  <Svg {...p}>
    <rect x="2.8" y="4.4" width="18.4" height="15.2" rx="2" />
    <path d="M2.8 13.6h4.4l1.4 2.4h6.8l1.4-2.4h4.4" />
  </Svg>
)

const Send = (p) => (
  <Svg {...p}>
    <path d="M21 3.4L10.6 13.8" />
    <path d="M21 3.4l-6.6 17.2-3.8-6.8-6.8-3.8z" />
  </Svg>
)

const Chat = (p) => (
  <Svg {...p}>
    <path d="M20.6 12.4a7.8 7.8 0 0 1-10.9 7.1L4 20.8l1.3-5.6a7.8 7.8 0 1 1 15.3-2.8z" />
  </Svg>
)

const Bell = (p) => (
  <Svg {...p}>
    <path d="M17.8 15.4V10.6a5.8 5.8 0 1 0-11.6 0v4.8L4.4 18h15.2z" />
    <path d="M10.2 20.6a2 2 0 0 0 3.6 0" />
  </Svg>
)

const People = (p) => (
  <Svg {...p}>
    <circle cx="9.2" cy="8.4" r="3.4" />
    <path d="M3.2 19.8a6 6 0 0 1 12 0" />
    <path d="M16 5.4a3.4 3.4 0 0 1 0 6.6M17.4 14.6a6 6 0 0 1 3.4 5.2" />
  </Svg>
)

const Keyboard = (p) => (
  <Svg {...p}>
    <rect x="2.4" y="6" width="19.2" height="12" rx="2" />
    <path d="M6 9.6h.01M9.4 9.6h.01M12.8 9.6h.01M16.2 9.6h.01M18.6 9.6h.01M6 12.8h.01M9.4 12.8h.01M12.8 12.8h.01M16.2 12.8h.01M18.6 12.8h.01M8.4 15.8h7.2" />
  </Svg>
)

const Type = (p) => (
  <Svg {...p}>
    <path d="M4.4 7.2V5.4h15.2v1.8M12 5.6v13M9 18.6h6" />
  </Svg>
)

/* --------------------------------------------------------- ideas & feedback */

const Sparkle = (p) => (
  <Svg {...p}>
    <path d="M12 3l1.9 5.3L19 10.2l-5.1 1.9L12 17.4l-1.9-5.3L5 10.2l5.1-1.9z" />
    <path d="M18.4 16.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" />
  </Svg>
)

const Robot = (p) => (
  <Svg {...p}>
    <rect x="4" y="7.4" width="16" height="12" rx="3" />
    <path d="M12 3.4v4M9.2 12.4h.01M14.8 12.4h.01M9.6 16h4.8" />
  </Svg>
)

const Puzzle = (p) => (
  <Svg {...p}>
    <path d="M10.4 3.6a2 2 0 0 1 3.6 1.2v1.6h2.4a1.6 1.6 0 0 1 1.6 1.6v2.4h-1.6a2 2 0 0 0 0 4h1.6v2.8a1.6 1.6 0 0 1-1.6 1.6h-2.8v-1.6a2 2 0 0 0-4 0v1.6H7.2a1.6 1.6 0 0 1-1.6-1.6v-2.8H4a2 2 0 0 1 0-4h1.6V8a1.6 1.6 0 0 1 1.6-1.6h2.4V4.8c0-.44.13-.86.36-1.2z" />
  </Svg>
)

const Code = (p) => (
  <Svg {...p}>
    <path d="M8.4 7.6L3.6 12l4.8 4.4M15.6 7.6L20.4 12l-4.8 4.4M13.6 4.6l-3.2 14.8" />
  </Svg>
)

const Palette = (p) => (
  <Svg {...p}>
    <path d="M12 3.2a8.8 8.8 0 0 0 0 17.6c1.3 0 1.9-.9 1.9-1.8 0-1.2-1-1.6-1-2.6 0-.9.7-1.6 1.7-1.6h1.6a4.6 4.6 0 0 0 4.6-4.6c0-4-3.9-7-8.8-7z" />
    <path d="M7.4 11.2h.01M10.4 7.6h.01M14.6 7.8h.01" />
  </Svg>
)

const Image = (p) => (
  <Svg {...p}>
    <rect x="3" y="4.4" width="18" height="15.2" rx="2" />
    <circle cx="8.6" cy="9.6" r="1.6" />
    <path d="M3.4 17l4.8-4.4 3.4 3 3-2.6 4.4 4" />
  </Svg>
)

const Camera = (p) => (
  <Svg {...p}>
    <path d="M3 8.4a2 2 0 0 1 2-2h2.6l1.4-2.2h6l1.4 2.2H19a2 2 0 0 1 2 2v9.2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <circle cx="12" cy="12.8" r="3.6" />
  </Svg>
)

/* -------------------------------------------------- direction & progression */

const Target = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <circle cx="12" cy="12" r="4.6" />
    <circle cx="12" cy="12" r="1" />
  </Svg>
)

const Undo = (p) => (
  <Svg {...p}>
    <path d="M4 9.6h9.4a5.6 5.6 0 0 1 0 11.2h-4.8" />
    <path d="M7.6 5.4L3.4 9.6l4.2 4.2" />
  </Svg>
)

const ArrowLeft = (p) => (
  <Svg {...p}>
    <path d="M20 12H4.4M10.6 5.8L4.4 12l6.2 6.2" />
  </Svg>
)

const Shuffle = (p) => (
  <Svg {...p}>
    <path d="M3.6 6.6h3.6l9.2 10.8h3.8M3.6 17.4h3.6l3.4-4M14 8.2l2.4-2.8h3.8" />
    <path d="M17.8 3.2l2.6 2.2-2.6 2.2M17.8 15.2l2.6 2.2-2.6 2.2" />
  </Svg>
)

const Plus = (p) => (
  <Svg {...p}>
    <path d="M12 4.6v14.8M4.6 12h14.8" />
  </Svg>
)

const Scroll = (p) => (
  <Svg {...p}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M12 7.6v8.8M9.2 13.6L12 16.4l2.8-2.8" />
  </Svg>
)

const Rocket = (p) => (
  <Svg {...p}>
    <path d="M12 2.8c3 2 4.8 5.4 4.8 9.2l-1.6 4.4H8.8L7.2 12c0-3.8 1.8-7.2 4.8-9.2z" />
    <path d="M8.8 16.4L6.4 21l3.2-1.4M15.2 16.4L17.6 21l-3.2-1.4" />
    <circle cx="12" cy="10" r="1.8" />
  </Svg>
)

const Sprout = (p) => (
  <Svg {...p}>
    <path d="M12 20.6v-7.4" />
    <path d="M12 13.2C12 9.8 9.4 7.2 6 7.2c0 3.4 2.6 6 6 6z" />
    <path d="M12 13.2c0-2.9 2.2-5.2 5.2-5.2 0 2.9-2.3 5.2-5.2 5.2z" />
  </Svg>
)

const Trophy = (p) => (
  <Svg {...p}>
    <path d="M7.4 3.8h9.2v5.4a4.6 4.6 0 0 1-9.2 0z" />
    <path d="M7.4 5.4H4.6v1.4a3 3 0 0 0 2.8 3M16.6 5.4h2.8v1.4a3 3 0 0 1-2.8 3" />
    <path d="M12 13.8v3.4M8.6 20.2h6.8" />
  </Svg>
)

const Map = (p) => (
  <Svg {...p}>
    <path d="M9.2 4.2L3.4 6.4v13.4l5.8-2.2 5.6 2.2 5.8-2.2V4.2l-5.8 2.2z" />
    <path d="M9.2 4.2v13.4M14.8 6.4v13.4" />
  </Svg>
)

/* ------------------------------------------------------- lists & judgement */

const List = (p) => (
  <Svg {...p}>
    <path d="M9 6.4h11M9 12h11M9 17.6h11M4.4 6.4h.01M4.4 12h.01M4.4 17.6h.01" />
  </Svg>
)

const Clipboard = (p) => (
  <Svg {...p}>
    <path d="M9 4.4H7a2 2 0 0 0-2 2v12.2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6.4a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="2.6" width="6" height="3.6" rx="1.2" />
  </Svg>
)

const Check = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M8.2 12.2l2.6 2.6 5-5.2" />
  </Svg>
)

const Star = (p) => (
  <Svg {...p}>
    <path d="M12 3.2l2.7 5.6 6 .9-4.4 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6-4.4-4.2 6-.9z" />
  </Svg>
)

const Scale = (p) => (
  <Svg {...p}>
    <path d="M12 4v16M6.6 20h10.8M4 8.4h16M4 8.4L1.8 14h4.4zM20 8.4L17.8 14h4.4z" />
  </Svg>
)

const Question = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M9.6 9.6a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.8-.9 1.4v.4M12 16.8h.01" />
  </Svg>
)

const Warning = (p) => (
  <Svg {...p}>
    <path d="M12 3.6l9.2 16H2.8z" />
    <path d="M12 9.6v4.2M12 16.8h.01" />
  </Svg>
)

const Bolt = (p) => (
  <Svg {...p}>
    <path d="M13.4 2.8L4.6 13.6h6l-.8 7.6 9-10.8h-6z" />
  </Svg>
)

const Ruler = (p) => (
  <Svg {...p}>
    <path d="M15.6 2.9l5.5 5.5L8.4 21.1 2.9 15.6z" />
    <path d="M12.6 5.9l1.9 1.9M9.7 8.8l1.9 1.9M6.8 11.7l1.9 1.9" />
  </Svg>
)

const Broom = (p) => (
  <Svg {...p}>
    <path d="M15.6 3.4l5 5M13.2 5.8l5 5" />
    <path d="M12.4 6.6l5 5-6 6a4 4 0 0 1-5.6 0l-.6-.6a4 4 0 0 1 0-5.6z" />
  </Svg>
)

const Tag = (p) => (
  <Svg {...p}>
    <path d="M11.2 3.2H20v8.8l-9.2 9.2a1.8 1.8 0 0 1-2.6 0l-6.2-6.2a1.8 1.8 0 0 1 0-2.6z" />
    <path d="M16.2 7.4h.01" />
  </Svg>
)

const Calendar = (p) => (
  <Svg {...p}>
    <rect x="3.4" y="5" width="17.2" height="15.6" rx="2" />
    <path d="M3.4 9.6h17.2M8.2 2.8v4M15.8 2.8v4" />
  </Svg>
)

const Pin = (p) => (
  <Svg {...p}>
    <path d="M12 21c4-4.6 6-8 6-10.6a6 6 0 1 0-12 0C6 13 8 16.4 12 21z" />
    <circle cx="12" cy="10.2" r="2.4" />
  </Svg>
)

const Hourglass = (p) => (
  <Svg {...p}>
    <path d="M6.4 3h11.2M6.4 21h11.2" />
    <path d="M7.4 3v3.6c0 2 3 3.6 4.6 5.4 1.6-1.8 4.6-3.4 4.6-5.4V3M7.4 21v-3.6c0-2 3-3.6 4.6-5.4 1.6 1.8 4.6 3.4 4.6 5.4V21" />
  </Svg>
)

/* ------------------------------------------------------------- platforms &
   appearance. The two platform marks are simplified stand-ins drawn in the
   same stroke vocabulary as everything else, not the real trademarks — they
   only need to be recognisable enough to pick between. */

const Windows = (p) => (
  <Svg {...p}>
    <path d="M4 6.6 11 5.4v5.9H4z" />
    <path d="M12.6 5.1 20 3.8v7.5h-7.4z" />
    <path d="M4 12.7h7v5.9L4 17.4z" />
    <path d="M12.6 12.7H20v7.5l-7.4-1.3z" />
  </Svg>
)

const Apple = (p) => (
  <Svg {...p}>
    <path d="M15.9 12.6c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7c-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.5 2 1-.1 1.4-.6 2.5-.6s1.5.6 2.5.6 1.7-1 2.4-2c.5-.7.8-1.4 1-2.2-2.2-.9-2.8-3-2.8-3.1Z" />
    <path d="M13.7 6.2c.5-.7.9-1.6.8-2.5-.8 0-1.8.5-2.4 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.4-1.1Z" />
  </Svg>
)

const Gear = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3.1" />
    <path d="M19.2 14.6a1.5 1.5 0 0 0 .3 1.7l.1.1a1.8 1.8 0 1 1-2.6 2.6l-.1-.1a1.5 1.5 0 0 0-2.6 1.1v.2a1.8 1.8 0 1 1-3.6 0v-.1a1.5 1.5 0 0 0-2.6-1.1l-.1.1a1.8 1.8 0 1 1-2.6-2.6l.1-.1a1.5 1.5 0 0 0-1.1-2.6h-.2a1.8 1.8 0 1 1 0-3.6h.1a1.5 1.5 0 0 0 1.1-2.6l-.1-.1A1.8 1.8 0 1 1 7.8 4.8l.1.1a1.5 1.5 0 0 0 1.7.3h.1A1.5 1.5 0 0 0 10.6 3.9v-.2a1.8 1.8 0 1 1 3.6 0v.1a1.5 1.5 0 0 0 2.6 1.1l.1-.1a1.8 1.8 0 1 1 2.6 2.6l-.1.1a1.5 1.5 0 0 0-.3 1.7v.1a1.5 1.5 0 0 0 1.4.9h.2a1.8 1.8 0 1 1 0 3.6h-.1a1.5 1.5 0 0 0-1.4.9Z" />
  </Svg>
)

const Phone = (p) => (
  <Svg {...p}>
    <rect x="6.6" y="2.4" width="10.8" height="19.2" rx="2.4" />
    <path d="M10.8 5.2h2.4M12 18.6h.01" />
  </Svg>
)

const Heart = (p) => (
  <Svg {...p}>
    <path d="M12 20.4S3.6 15.6 3.6 9.9a4.5 4.5 0 0 1 8.4-2.3 4.5 4.5 0 0 1 8.4 2.3c0 5.7-8.4 10.5-8.4 10.5Z" />
  </Svg>
)

const Bulb = (p) => (
  <Svg {...p}>
    <path d="M9.4 17.6a6 6 0 1 1 5.2 0" />
    <path d="M9.6 17.6h4.8M10.2 20.4h3.6" />
  </Svg>
)

const Sun = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
  </Svg>
)

const Moon = (p) => (
  <Svg {...p}>
    <path d="M20 14.3A8.4 8.4 0 0 1 9.7 4a8.4 8.4 0 1 0 10.3 10.3Z" />
  </Svg>
)

const Contrast = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.7" />
    <path d="M12 3.3v17.4a8.7 8.7 0 0 0 0-17.4Z" fill="currentColor" stroke="none" />
  </Svg>
)

const Github = (p) => (
  <Svg {...p}>
    <path d="M9.3 20.4c-4 1.2-4-2.1-5.6-2.5m11.2 5v-3.3c0-.9.1-1.3-.4-1.8 2.3-.3 4.6-1.1 4.6-5a3.9 3.9 0 0 0-1.1-2.7 3.6 3.6 0 0 0-.1-2.7s-.9-.3-2.9 1.1a10 10 0 0 0-5.2 0C7.8 7.1 6.9 7.4 6.9 7.4a3.6 3.6 0 0 0-.1 2.7 3.9 3.9 0 0 0-1.1 2.8c0 3.8 2.3 4.6 4.6 4.9-.4.5-.4 1-.4 1.7V23" />
  </Svg>
)

const Youtube = (p) => (
  <Svg {...p}>
    <rect x="2.4" y="5.5" width="19.2" height="13" rx="3.6" />
    <path d="M10.4 9.4 15.2 12l-4.8 2.6z" />
  </Svg>
)

/* ---------------------------------------------------------------- registry */

export const ICONS = {
  monitor: Monitor,
  window: Window,
  'window-hidden': WindowHidden,
  power: Power,
  cursor: Cursor,
  'double-click': DoubleClick,
  mouse: Mouse,
  grab: Grab,
  wave: Wave,
  press: Press,
  folder: Folder,
  folders: Folders,
  file: File,
  'file-text': FileText,
  save: Save,
  download: Download,
  upload: Upload,
  cloud: Cloud,
  chart: Chart,
  grid: Grid,
  slides: Slides,
  printer: Printer,
  globe: Globe,
  search: Search,
  shield: Shield,
  link: Link,
  paperclip: Paperclip,
  key: Key,
  plug: Plug,
  pencil: Pencil,
  mail: Mail,
  inbox: Inbox,
  send: Send,
  chat: Chat,
  bell: Bell,
  people: People,
  keyboard: Keyboard,
  type: Type,
  sparkle: Sparkle,
  robot: Robot,
  puzzle: Puzzle,
  code: Code,
  palette: Palette,
  image: Image,
  camera: Camera,
  target: Target,
  undo: Undo,
  'arrow-left': ArrowLeft,
  shuffle: Shuffle,
  plus: Plus,
  scroll: Scroll,
  rocket: Rocket,
  sprout: Sprout,
  trophy: Trophy,
  map: Map,
  list: List,
  clipboard: Clipboard,
  check: Check,
  star: Star,
  scale: Scale,
  question: Question,
  warning: Warning,
  bolt: Bolt,
  ruler: Ruler,
  broom: Broom,
  tag: Tag,
  calendar: Calendar,
  pin: Pin,
  hourglass: Hourglass,
  bulb: Bulb,
  gear: Gear,
  phone: Phone,
  heart: Heart,
  windows: Windows,
  apple: Apple,
  sun: Sun,
  moon: Moon,
  contrast: Contrast,
  github: Github,
  youtube: Youtube,
}

// names.js is what the curriculum checker reads; keep the two in step.
if (import.meta.env?.DEV) {
  const impl = Object.keys(ICONS)
  const drift = [
    ...ICON_NAMES.filter((n) => !impl.includes(n)).map((n) => `${n} listed but not drawn`),
    ...impl.filter((n) => !ICON_NAMES.includes(n)).map((n) => `${n} drawn but not listed`),
  ]
  if (drift.length) console.error('icon registry out of sync:', drift.join('; '))
}

/**
 * Renders an icon by name. Falls back to a neutral dot rather than throwing or
 * rendering nothing, so a typo in curriculum data is visible but never breaks
 * a lesson someone is part-way through.
 */
export default function Icon({ name, className }) {
  const Component = ICONS[name]
  if (!Component) {
    return (
      <Svg className={className}>
        <circle cx="12" cy="12" r="4" />
      </Svg>
    )
  }
  return <Component className={className} />
}
