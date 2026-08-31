import { useEffect, useRef, useState } from 'react'
import { FakeScreen, Wallpaper, SystemChrome, WindowFrame, ContextMenu } from './chrome'
import { useTapGestures, useDragDrop } from '../../lib/gestures'
import { useTx, useLocale } from '../../i18n'

/**
 * A working mock of File Explorer / Finder: places in the sidebar, files and
 * folders in the main area, a right-click menu, inline renaming, and real
 * drag-and-drop for moving a file into a folder.
 *
 * Moving a file is the one task here done by dragging rather than tapping,
 * because dragging *is* the skill — describing it wouldn't teach it.
 */

const PLACES = [
  { id: 'desktop', emoji: '🖥️', label: { en: 'Desktop', es: 'Escritorio' } },
  { id: 'documents', emoji: '📄', label: { en: 'Documents', es: 'Documentos' } },
  { id: 'downloads', emoji: '⬇️', label: { en: 'Downloads', es: 'Descargas' } },
  { id: 'pictures', emoji: '🖼️', label: { en: 'Pictures', es: 'Imágenes' } },
]

const NUDGE = {
  wrongPlace: {
    en: 'That’s a different place. Look down the list on the left for the one you were asked for.',
    es: 'Ese es otro lugar. Busca en la lista de la izquierda el que te pidieron.',
  },
  wrongItem: {
    en: 'That’s a different one — check the name written underneath.',
    es: 'Ese es otro — fíjate en el nombre escrito debajo.',
  },
  needHold: {
    en: '**Press and hold** on it to bring up the little menu.',
    es: '**Mantén presionado** para que aparezca el menú pequeño.',
  },
  needEmptySpace: {
    en: 'Press and hold on an **empty part** of the window — not on a file.',
    es: 'Mantén presionado en una **parte vacía** de la ventana — no sobre un archivo.',
  },
  droppedNowhere: {
    en: 'It landed back where it started. Drag it right **on top of** the folder and let go there.',
    es: 'Volvió a su lugar. Arrástralo **encima** de la carpeta y suéltalo ahí.',
  },
  wrongFolder: {
    en: 'That’s the wrong folder — read the names again.',
    es: 'Esa no es la carpeta — vuelve a leer los nombres.',
  },
  wrongMenuItem: {
    en: 'Not that one. Read the list and find the words you were asked for.',
    es: 'Esa no. Lee la lista y busca las palabras que te pidieron.',
  },
  nameNotYet: {
    en: 'Almost — the name doesn’t match yet. Check it letter by letter.',
    es: 'Casi — el nombre todavía no coincide. Revísalo letra por letra.',
  },
}

export default function FilesSim({ config = {}, onSolved, onMistake, showHint, solved }) {
  const tx = useTx()
  const { device } = useLocale()
  const {
    goal = 'open',
    place = 'documents',
    items: initialItems = [],
    target,
    moveTo,
    newName,
    menu = [],
    menuTarget,
    insideFolder = [],
  } = config

  const [items, setItems] = useState(initialItems)
  const [current, setCurrent] = useState(place)
  const [openFolder, setOpenFolder] = useState(null)
  const [selected, setSelected] = useState(null)
  const [ctx, setCtx] = useState(null)
  const [editing, setEditing] = useState(null) // { id, value }
  const [dragging, setDragging] = useState(null)
  const [dropHover, setDropHover] = useState(null)
  const inputRef = useRef(null)

  // Keyed on the id, not the object: re-running this on every keystroke would
  // re-select the whole name, so each new character would replace the last.
  useEffect(() => {
    if (editing?.id && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing?.id])

  const nudge = (key) => onMistake?.(tx(NUDGE[key]))
  const visible = openFolder ? insideFolder : items

  /* ------------------------------------------------------------ actions */

  const clickPlace = (id) => {
    if (solved) return
    setCurrent(id)
    setOpenFolder(null)
    setSelected(null)
    setCtx(null)
    if (goal === 'navigate') {
      if (id === target) onSolved?.()
      else nudge('wrongPlace')
    }
  }

  const openItem = (item) => {
    if (solved) return
    setCtx(null)
    if (item.kind === 'folder') setOpenFolder(item.id)
    if (goal === 'open') {
      if (item.id === target) onSolved?.()
      else nudge('wrongItem')
    }
  }

  const selectItem = (item) => {
    if (solved) return
    setCtx(null)
    setSelected(item.id)
    if (goal === 'open') {
      onMistake?.(
        tx({
          en: 'One tap only **selects** it. Tap it **twice, quickly** to open it.',
          es: 'Un toque solo lo **selecciona**. Tócalo **dos veces, rápido** para abrirlo.',
        })
      )
    } else if (goal === 'rename' || goal === 'menu') {
      nudge('needHold')
    } else if (goal === 'identify') {
      if (item.id === target) onSolved?.()
      else nudge('wrongItem')
    }
  }

  const longPressItem = (item, e) => {
    if (solved || goal === 'newfolder') {
      if (goal === 'newfolder') nudge('needEmptySpace')
      return
    }
    setSelected(item.id)
    const rect = e.currentTarget.closest('[data-area]')?.getBoundingClientRect()
    const box = e.currentTarget.getBoundingClientRect()
    setCtx({
      scope: 'item',
      id: item.id,
      x: rect ? ((box.left - rect.left) / rect.width) * 100 : 20,
      y: rect ? ((box.bottom - rect.top) / rect.height) * 100 : 30,
    })
    if ((goal === 'rename' || goal === 'menu') && item.id !== target) nudge('wrongItem')
  }

  const longPressEmpty = (e) => {
    if (solved) return
    if (goal !== 'newfolder') return
    const rect = e.currentTarget.getBoundingClientRect()
    setCtx({
      scope: 'empty',
      x: Math.min(((e.clientX - rect.left) / rect.width) * 100, 45),
      y: Math.min(((e.clientY - rect.top) / rect.height) * 100, 40),
    })
  }

  const pickMenuItem = (m) => {
    if (solved) return
    setCtx(null)
    if (m.id !== menuTarget) {
      nudge('wrongMenuItem')
      return
    }
    if (goal === 'rename') {
      const item = visible.find((i) => i.id === selected)
      setEditing({ id: selected, value: tx(item?.label) })
    } else if (goal === 'newfolder') {
      const id = 'new-folder'
      setItems((list) => [...list, { id, kind: 'folder', emoji: '📁', label: { en: '', es: '' } }])
      setSelected(id)
      setEditing({ id, value: '' })
    } else if (goal === 'menu') {
      onSolved?.()
    }
  }

  const commitName = () => {
    if (!editing) return
    const wanted = tx(newName || '').trim().toLowerCase()
    const typed = editing.value.trim()
    if (typed.toLowerCase() === wanted) {
      setItems((list) =>
        list.map((i) => (i.id === editing.id ? { ...i, label: { en: typed, es: typed } } : i))
      )
      setEditing(null)
      onSolved?.()
    } else {
      nudge('nameNotYet')
    }
  }

  const drag = useDragDrop({
    disabled: solved || goal !== 'move',
    onDrop: (id, zone) => {
      setDragging(null)
      setDropHover(null)
      if (!zone) return nudge('droppedNowhere')
      if (zone !== moveTo) return nudge('wrongFolder')
      setItems((list) => list.filter((i) => i.id !== id))
      onSolved?.()
    },
  })

  /* -------------------------------------------------------------- render */

  const title = device === 'mac' ? 'Finder' : { en: 'File Explorer', es: 'Explorador de archivos' }

  const currentName = openFolder
    ? tx(items.find((i) => i.id === openFolder)?.label)
    : tx(PLACES.find((p) => p.id === current)?.label)

  return (
    <FakeScreen label="Practice file window">
      <Wallpaper>
        <WindowFrame
          emoji="📂"
          title={tx(title)}
          style={{ left: '3%', top: '4%', width: '94%', height: device === 'mac' ? '80%' : '82%' }}
          bodyClass="bg-white flex"
        >
          {/* Sidebar: the "places" on the computer */}
          <div className="w-[26%] shrink-0 border-r border-black/10 bg-[#f6f5f8] py-[1.6cqw]">
            {PLACES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => clickPlace(p.id)}
                className={`flex w-full items-center gap-[1.2cqw] px-[1.8cqw] py-[1.4cqw] text-left text-[3cqw] font-semibold text-[#3c3a44] ${
                  current === p.id ? 'bg-brand/15 text-brand' : ''
                } ${showHint && goal === 'navigate' && p.id === target && !solved ? 'anim-halo rounded-[0.8cqw] bg-brand-soft' : ''}`}
              >
                <span aria-hidden="true">{p.emoji}</span>
                <span className="truncate">{tx(p.label)}</span>
              </button>
            ))}
          </div>

          {/* Main area */}
          <div className="relative flex min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-[1.2cqw] border-b border-black/10 px-[2.4cqw] py-[1.4cqw] text-[3cqw] font-bold text-[#3c3a44]">
              {openFolder && (
                <button
                  type="button"
                  onClick={() => setOpenFolder(null)}
                  aria-label={tx({ en: 'Back', es: 'Atrás' })}
                  className="rounded-[0.6cqw] px-[1cqw] hover:bg-black/5"
                >
                  ‹
                </button>
              )}
              <span className="truncate">{currentName}</span>
            </div>

            <EmptyArea onLongPress={longPressEmpty} disabled={solved}>
              <div
                data-area="files"
                className="grid grid-cols-4 content-start gap-[1.6cqw] p-[2.4cqw]"
              >
                {visible.map((item) => (
                  <FileTile
                    key={item.id}
                    item={item}
                    label={tx(item.label)}
                    selected={selected === item.id}
                    hint={showHint && !solved && item.id === target}
                    dropTarget={goal === 'move' && item.kind === 'folder'}
                    hovered={dropHover === item.id}
                    editing={editing?.id === item.id ? editing : null}
                    inputRef={inputRef}
                    onEditChange={(v) => setEditing((e) => ({ ...e, value: v }))}
                    onEditCommit={commitName}
                    disabled={solved}
                    draggable={goal === 'move' && item.kind === 'file'}
                    dragging={dragging === item.id}
                    onDragStart={(e) => {
                      setDragging(item.id)
                      drag.start(item.id, e)
                    }}
                    onDragMove={(e) => {
                      if (dragging !== item.id) return
                      const under = document.elementFromPoint(e.clientX, e.clientY)
                      setDropHover(under?.closest?.('[data-drop]')?.dataset.drop ?? null)
                    }}
                    onDragEnd={drag.end}
                    onClick={() => selectItem(item)}
                    onDoubleClick={() => openItem(item)}
                    onLongPress={(e) => longPressItem(item, e)}
                  />
                ))}
                {visible.length === 0 && (
                  <p className="col-span-4 px-[1cqw] py-[3cqw] text-[3cqw] text-[#7a7684] italic">
                    {tx({ en: 'This folder is empty.', es: 'Esta carpeta está vacía.' })}
                  </p>
                )}
              </div>
            </EmptyArea>

            {/* Naming steps are the one place "Show me how" can't just point at
                a button — so it spells the name out to copy. Without this a
                learner who can't spell it has no way forward. */}
            {showHint && editing && !solved && (
              <div className="pointer-events-none absolute inset-x-[3cqw] bottom-[2cqw] rounded-[1cqw] bg-brand px-[2cqw] py-[1.2cqw] text-center text-[3cqw] font-bold text-white">
                {tx({ en: 'Type:', es: 'Escribe:' })} “{tx(newName || '')}”
              </div>
            )}

            {ctx && (
              <ContextMenu
                x={ctx.x}
                y={ctx.y}
                highlight={showHint ? menuTarget : null}
                items={menu.map((m) => ({
                  id: m.id,
                  label: tx(m.label),
                  muted: m.muted,
                  onClick: () => pickMenuItem(m),
                }))}
              />
            )}
          </div>
        </WindowFrame>

        <SystemChrome apps={[]} />
      </Wallpaper>
    </FakeScreen>
  )
}

/** Catches a long press anywhere that isn't a file, for "New folder". */
function EmptyArea({ children, onLongPress, disabled }) {
  const handlers = useTapGestures({ onLongPress, disabled })
  return (
    <div className="min-h-0 flex-1 overflow-y-auto" {...handlers}>
      {children}
    </div>
  )
}

function FileTile({
  item,
  label,
  selected,
  hint,
  dropTarget,
  hovered,
  editing,
  inputRef,
  onEditChange,
  onEditCommit,
  disabled,
  draggable,
  dragging,
  onDragStart,
  onDragMove,
  onDragEnd,
  onClick,
  onDoubleClick,
  onLongPress,
}) {
  const gestures = useTapGestures({ onClick, onDoubleClick, onLongPress, disabled })

  // Dragging and tapping share the same element; the drag handlers wrap the
  // gesture ones so a plain tap still reaches the tap logic.
  const dragHandlers = draggable
    ? {
        onPointerDown: (e) => {
          gestures.onPointerDown(e)
          onDragStart(e)
        },
        onPointerMove: (e) => {
          gestures.onPointerMove(e)
          onDragMove(e)
        },
        onPointerUp: (e) => {
          gestures.onPointerUp(e)
          onDragEnd(e)
        },
      }
    : {}

  return (
    <div
      data-drop={dropTarget ? item.id : undefined}
      className={`flex flex-col items-center gap-[0.6cqw] rounded-[1.2cqw] p-[1cqw] text-center transition ${
        selected ? 'bg-brand/15' : ''
      } ${hovered ? 'bg-brand/25 ring-[0.5cqw] ring-brand' : ''} ${hint ? 'anim-halo bg-brand-soft' : ''} ${
        dragging ? 'scale-110 opacity-70' : ''
      }`}
      style={{ touchAction: draggable ? 'none' : undefined }}
      {...gestures}
      {...dragHandlers}
    >
      <span className="text-[7cqw] leading-none" aria-hidden="true">
        {item.emoji}
      </span>
      {editing ? (
        <input
          ref={inputRef}
          value={editing.value}
          onChange={(e) => onEditChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onEditCommit()}
          onBlur={onEditCommit}
          onPointerDown={(e) => e.stopPropagation()}
          className="w-full rounded-[0.4cqw] border border-brand bg-white px-[0.4cqw] text-center text-[2.6cqw] font-semibold text-[#2a2830] outline-none"
          aria-label="File name"
        />
      ) : (
        <span className="w-full text-[2.6cqw] leading-tight font-semibold break-words text-[#3c3a44]">
          {label}
        </span>
      )}
    </div>
  )
}
