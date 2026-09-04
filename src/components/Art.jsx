import { useTx, useLocale } from '../i18n'
import { ART_NAMES } from './art-names'

/**
 * Hand-built diagrams for the ideas that a mock interface can't show — mostly
 * comparisons ("your phone does this, a computer does that") and anatomy
 * drawings with labels pointing at the parts.
 *
 * Everything is drawn with plain elements and `cqw` sizing so it scales with
 * the card it sits in, in either language.
 */

function Stage({ children, className = '', ratio = 'aspect-[4/3]' }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[1.4rem] border-2 border-line bg-surface ${ratio} ${className}`}
      style={{ containerType: 'inline-size' }}
    >
      {children}
    </div>
  )
}

function Tag({ children, tone = 'brand', className = '', style }) {
  const tones = {
    brand: 'bg-brand text-white',
    grass: 'bg-grass text-white',
    sun: 'bg-sun text-white',
    ink: 'bg-ink text-white',
  }
  return (
    <span
      className={`absolute rounded-full px-[2cqw] py-[0.6cqw] text-[2.9cqw] leading-tight font-bold whitespace-nowrap ${tones[tone]} ${className}`}
      style={style}
    >
      {children}
    </span>
  )
}

/* ------------------------------------------- Your phone vs. your computer */

function PhoneVsComputer() {
  const tx = useTx()
  return (
    <Stage ratio="aspect-[3/2]">
      <div className="grid h-full grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-[2cqw] border-r-2 border-line bg-cream/60 p-[3cqw]">
          <div className="relative h-[38cqw] w-[21cqw] rounded-[3cqw] border-[1.4cqw] border-[#3a3742] bg-[#1d2740]">
            <span className="absolute inset-x-0 top-[38%] text-center text-[9cqw]" aria-hidden="true">
              👆
            </span>
          </div>
          <p className="text-center text-[3.2cqw] leading-tight font-extrabold text-ink">
            {tx({ en: 'Your phone', es: 'Tu teléfono' })}
          </p>
          <p className="text-center text-[2.9cqw] leading-tight font-semibold text-ink-soft">
            {tx({ en: 'You touch the screen', es: 'Tocas la pantalla' })}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-[2cqw] p-[3cqw]">
          <div className="relative">
            <div className="h-[24cqw] w-[36cqw] rounded-[1.6cqw] border-[1.4cqw] border-[#3a3742] bg-[#1d2740]">
              <svg viewBox="0 0 24 24" className="absolute top-[38%] left-[42%] w-[6cqw]" aria-hidden="true">
                <path d="M5 2.5 19 12l-6.2.9 3.1 6.4-2.6 1.3-3.1-6.4L5 18.6z" fill="#fff" stroke="#22212a" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="mx-auto h-[2cqw] w-[42cqw] rounded-b-[1cqw] bg-[#cfcac2]" />
          </div>
          <p className="text-center text-[3.2cqw] leading-tight font-extrabold text-ink">
            {tx({ en: 'A computer', es: 'Una computadora' })}
          </p>
          <p className="text-center text-[2.9cqw] leading-tight font-semibold text-ink-soft">
            {tx({ en: 'You move an arrow, then click', es: 'Mueves una flecha y haces clic' })}
          </p>
        </div>
      </div>
    </Stage>
  )
}

/* -------------------------------------------------- The three kinds of click */

function ClickTypes() {
  const tx = useTx()
  const rows = [
    {
      emoji: '👆',
      n: '1',
      title: { en: 'One click', es: 'Un clic' },
      body: { en: 'Points at something. Nothing opens.', es: 'Señala algo. No abre nada.' },
      tone: 'bg-brand-soft border-brand/25',
    },
    {
      emoji: '👆👆',
      n: '2',
      title: { en: 'Two quick clicks', es: 'Dos clics rápidos' },
      body: { en: 'Opens it.', es: 'Lo abre.' },
      tone: 'bg-grass-soft border-grass/25',
    },
    {
      emoji: '🫵',
      n: 'R',
      title: { en: 'Right click', es: 'Clic derecho' },
      body: { en: 'Shows a list of things you can do.', es: 'Muestra una lista de cosas que puedes hacer.' },
      tone: 'bg-sun-soft border-sun/30',
    },
  ]
  return (
    <div className="flex flex-col gap-3">
      {rows.map((r) => (
        <div key={r.n} className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${r.tone}`}>
          <span className="w-14 shrink-0 text-center text-2xl" aria-hidden="true">
            {r.emoji}
          </span>
          <div className="min-w-0">
            <p className="font-extrabold">{tx(r.title)}</p>
            <p className="text-[0.95rem] leading-snug text-ink-soft">{tx(r.body)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------ Window anatomy */

function WindowAnatomy() {
  const tx = useTx()
  const { device } = useLocale()
  return (
    <Stage ratio="aspect-[4/3]">
      <div className="absolute inset-[6cqw] overflow-hidden rounded-[1.6cqw] border-[0.5cqw] border-[#c9c4bb] bg-white">
        <div className="flex h-[10cqw] items-center bg-[#f3f1f5] px-[2.4cqw]">
          {device === 'mac' && (
            <span className="flex gap-[1.4cqw]">
              <span className="block h-[3cqw] w-[3cqw] rounded-full bg-[#ff5f57]" />
              <span className="block h-[3cqw] w-[3cqw] rounded-full bg-[#febc2e]" />
              <span className="block h-[3cqw] w-[3cqw] rounded-full bg-[#28c840]" />
            </span>
          )}
          <span className="mx-auto text-[3.2cqw] font-bold text-[#3c3a44]">
            📝 {tx({ en: 'My letter', es: 'Mi carta' })}
          </span>
          {device !== 'mac' && (
            <span className="flex items-center gap-[3cqw] text-[3.4cqw] font-bold text-[#3c3a44]">
              <span>—</span>
              <span className="block h-[2.6cqw] w-[2.6cqw] border-[0.5cqw] border-[#3c3a44]" />
              <span>✕</span>
            </span>
          )}
        </div>
        <div className="space-y-[2cqw] p-[3cqw]" aria-hidden="true">
          {[92, 78, 88, 60].map((w, i) => (
            <div key={i} className="h-[2cqw] rounded-full bg-black/8" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>

      <Tag tone="ink" style={{ left: '6cqw', top: '0.5cqw' }}>
        {tx({ en: 'Title bar ↓', es: 'Barra de título ↓' })}
      </Tag>
      <Tag
        tone="brand"
        style={device === 'mac' ? { left: '4cqw', top: '20cqw' } : { right: '3cqw', top: '20cqw' }}
      >
        {tx({ en: '↑ Close, hide, grow', es: '↑ Cerrar, esconder, agrandar' })}
      </Tag>
      <Tag tone="grass" style={{ left: '20cqw', bottom: '6cqw' }}>
        {tx({ en: 'Your work lives here', es: 'Aquí vive tu trabajo' })}
      </Tag>
    </Stage>
  )
}

/* ---------------------------------------------------------- File vs. folder */

function FileVsFolder() {
  const tx = useTx()
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl border-2 border-brand/25 bg-brand-soft p-4 text-center">
        <div className="text-4xl" aria-hidden="true">
          📄
        </div>
        <p className="mt-2 font-extrabold">{tx({ en: 'A file', es: 'Un archivo' })}</p>
        <p className="text-[0.95rem] leading-snug text-ink-soft">
          {tx({
            en: 'One thing you made or saved. A photo. A letter. A song.',
            es: 'Una cosa que hiciste o guardaste. Una foto. Una carta. Una canción.',
          })}
        </p>
      </div>
      <div className="rounded-2xl border-2 border-sun/30 bg-sun-soft p-4 text-center">
        <div className="text-4xl" aria-hidden="true">
          📁
        </div>
        <p className="mt-2 font-extrabold">{tx({ en: 'A folder', es: 'Una carpeta' })}</p>
        <p className="text-[0.95rem] leading-snug text-ink-soft">
          {tx({
            en: 'A box that holds files, so they’re not all in one pile.',
            es: 'Una caja que guarda archivos, para que no estén todos amontonados.',
          })}
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------- Internet vs. the browser */

function InternetVsBrowser() {
  const tx = useTx()
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl border-2 border-line bg-surface p-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">
            🌍
          </span>
          <div>
            <p className="font-extrabold">{tx({ en: 'The internet', es: 'El internet' })}</p>
            <p className="text-[0.95rem] leading-snug text-ink-soft">
              {tx({
                en: 'All the world’s pages, sitting out there.',
                es: 'Todas las páginas del mundo, allá afuera.',
              })}
            </p>
          </div>
        </div>
      </div>
      <div className="text-center text-2xl leading-none text-ink-soft" aria-hidden="true">
        ↓
      </div>
      <div className="rounded-2xl border-2 border-brand/25 bg-brand-soft p-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">
            🌐
          </span>
          <div>
            <p className="font-extrabold">{tx({ en: 'A browser', es: 'Un navegador' })}</p>
            <p className="text-[0.95rem] leading-snug text-ink-soft">
              {tx({
                en: 'The window you look through to see them. Chrome, Safari, Edge.',
                es: 'La ventana por la que las miras. Chrome, Safari, Edge.',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------- Address bar vs. search box */

function AddressVsSearch() {
  const tx = useTx()
  return (
    <Stage ratio="aspect-[4/3]">
      <div className="absolute inset-[5cqw] overflow-hidden rounded-[1.4cqw] border-[0.5cqw] border-[#c9c4bb] bg-white">
        <div className="flex items-center gap-[1.4cqw] bg-[#f6f5f8] p-[2cqw]">
          <span className="text-[3cqw]" aria-hidden="true">
            ‹ ›
          </span>
          <div className="flex flex-1 items-center gap-[1cqw] rounded-full border-[0.4cqw] border-brand bg-white px-[2cqw] py-[1.2cqw] text-[2.8cqw] text-[#4b4855]">
            🔒 bbc.com
          </div>
        </div>
        <div className="flex flex-col items-center gap-[2.4cqw] px-[6cqw] pt-[10cqw]">
          <span className="text-[5cqw] font-extrabold text-[#3c3a44]">
            {tx({ en: 'Search the web', es: 'Buscar en la web' })}
          </span>
          <div className="flex w-full items-center gap-[1.4cqw] rounded-full border-[0.4cqw] border-grass px-[2.6cqw] py-[1.6cqw] text-[2.9cqw] text-[#7a7684]">
            🔍 {tx({ en: 'how to make flan', es: 'cómo hacer flan' })}
          </div>
        </div>
      </div>
      <Tag tone="brand" style={{ left: '4cqw', top: '13cqw' }}>
        {tx({ en: '↑ Address you know', es: '↑ Dirección que ya sabes' })}
      </Tag>
      <Tag tone="grass" style={{ left: '4cqw', bottom: '5cqw' }}>
        {tx({ en: '↑ Question you have', es: '↑ Pregunta que tienes' })}
      </Tag>
    </Stage>
  )
}

/* -------------------------------------------------- Windows vs. Mac keys */

function ModifierKeys() {
  const tx = useTx()
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { name: 'Windows', key: 'Ctrl', tone: 'border-brand/25 bg-brand-soft', emoji: '🪟' },
        { name: 'Mac', key: '⌘ Command', tone: 'border-sun/30 bg-sun-soft', emoji: '🍏' },
      ].map((d) => (
        <div key={d.name} className={`rounded-2xl border-2 p-4 text-center ${d.tone}`}>
          <div className="text-2xl" aria-hidden="true">
            {d.emoji}
          </div>
          <p className="mt-1 text-sm font-bold text-ink-soft">{d.name}</p>
          <p className="mt-2 inline-block rounded-xl border-2 border-b-4 border-line bg-surface px-3 py-1.5 font-extrabold">
            {d.key}
          </p>
          <p className="mt-2 text-[0.9rem] leading-snug text-ink-soft">
            {tx({ en: 'is the key you hold', es: 'es la tecla que mantienes' })}
          </p>
        </div>
      ))}
    </div>
  )
}


/* ------------------------------------------------------- Shortcut cheat sheet */

const SHORTCUTS = [
  { do: { en: 'Copy', es: 'Copiar' }, win: ['Ctrl', 'C'], mac: ['⌘', 'C'] },
  { do: { en: 'Paste', es: 'Pegar' }, win: ['Ctrl', 'V'], mac: ['⌘', 'V'] },
  { do: { en: 'Cut', es: 'Cortar' }, win: ['Ctrl', 'X'], mac: ['⌘', 'X'] },
  { do: { en: 'Undo', es: 'Deshacer' }, win: ['Ctrl', 'Z'], mac: ['⌘', 'Z'] },
  { do: { en: 'Select all', es: 'Seleccionar todo' }, win: ['Ctrl', 'A'], mac: ['⌘', 'A'] },
  { do: { en: 'Save', es: 'Guardar' }, win: ['Ctrl', 'S'], mac: ['⌘', 'S'] },
  { do: { en: 'Find on this page', es: 'Buscar en la página' }, win: ['Ctrl', 'F'], mac: ['⌘', 'F'] },
  { do: { en: 'Switch windows', es: 'Cambiar de ventana' }, win: ['Alt', 'Tab'], mac: ['⌘', 'Tab'] },
  { do: { en: 'Screenshot', es: 'Captura de pantalla' }, win: ['⊞', 'Shift', 'S'], mac: ['⌘', 'Shift', '4'] },
]

function Combo({ keys, dim }) {
  return (
    <span className={`flex flex-wrap items-center gap-1 ${dim ? 'opacity-45' : ''}`}>
      {keys.map((k, i) => (
        <span key={k + i} className="flex items-center gap-1">
          {i > 0 && <span className="text-xs font-bold text-ink-soft">+</span>}
          <kbd className="inline-flex min-w-7 items-center justify-center rounded-md border-2 border-b-[3px] border-line bg-surface px-1.5 py-0.5 font-sans text-[0.8rem] font-extrabold">
            {k}
          </kbd>
        </span>
      ))}
    </span>
  )
}

/**
 * The cheat sheet. Both platforms are always shown side by side — the
 * learner's own is highlighted, but seeing the other one makes the pattern
 * obvious ("it is the same letter, just a different key to hold").
 */
function ShortcutTable() {
  const tx = useTx()
  const { device } = useLocale()
  const isMac = device === 'mac'
  return (
    <div className="overflow-hidden rounded-3xl border-2 border-line bg-surface">
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-3 border-b-2 border-line bg-cream px-4 py-2 text-[0.72rem] font-bold tracking-widest text-ink-soft uppercase">
        <span>{tx({ en: 'To do this', es: 'Para hacer esto' })}</span>
        <span className={isMac ? 'opacity-45' : 'text-brand'}>Windows</span>
        <span className={isMac ? 'text-brand' : 'opacity-45'}>Mac</span>
      </div>
      {SHORTCUTS.map((s, i) => (
        <div
          key={i}
          className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-3 px-4 py-2.5 ${
            i % 2 ? 'bg-cream/50' : ''
          }`}
        >
          <span className="text-[0.95rem] leading-tight font-bold">{tx(s.do)}</span>
          <Combo keys={s.win} dim={isMac} />
          <Combo keys={s.mac} dim={!isMac} />
        </div>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------- Registry */

const ART = {
  'phone-vs-computer': PhoneVsComputer,
  'click-types': ClickTypes,
  'window-anatomy': WindowAnatomy,
  'file-vs-folder': FileVsFolder,
  'internet-vs-browser': InternetVsBrowser,
  'address-vs-search': AddressVsSearch,
  'modifier-keys': ModifierKeys,
  'shortcut-table': ShortcutTable,
}

// art-names.js is what the curriculum checker reads; keep the two in step.
if (import.meta.env?.DEV) {
  const impl = Object.keys(ART)
  const drift = [
    ...ART_NAMES.filter((n) => !impl.includes(n)).map((n) => `${n} listed but not drawn`),
    ...impl.filter((n) => !ART_NAMES.includes(n)).map((n) => `${n} drawn but not listed`),
  ]
  if (drift.length) console.error('art registry out of sync:', drift.join('; '))
}

export default function Art({ name }) {
  const Component = ART[name]
  if (!Component) return null
  return <Component />
}
