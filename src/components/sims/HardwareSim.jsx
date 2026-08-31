import { useState } from 'react'
import { useTx } from '../../i18n'

/**
 * A schematic picture of a real computer — the only simulation that shows the
 * machine from the outside. Used for "which part is the screen?", "where is
 * the power button?", and the laptop-vs-desktop explanation.
 *
 * Parts are real buttons so they can be tapped, named by aria-label, and
 * labelled visibly when the step is an illustration rather than a question.
 */

const PART_NAMES = {
  screen: { en: 'Screen', es: 'Pantalla' },
  keyboard: { en: 'Keyboard', es: 'Teclado' },
  trackpad: { en: 'Trackpad', es: 'Panel táctil' },
  mouse: { en: 'Mouse', es: 'Ratón' },
  tower: { en: 'Tower', es: 'Torre' },
  power: { en: 'Power button', es: 'Botón de encendido' },
}

function Part({ id, style, onPick, state, label, shape = '' }) {
  const wrong = state === 'wrong'
  const right = state === 'right'
  return (
    <button
      type="button"
      style={style}
      onClick={() => onPick(id)}
      aria-label={label}
      className={`absolute transition ${shape} ${
        wrong ? 'anim-nudge ring-[0.9cqw] ring-berry' : ''
      } ${right ? 'ring-[0.9cqw] ring-grass' : ''}`}
    />
  )
}

/**
 * Labels are placed by hand rather than hung under each shape: a laptop has no
 * free space under its keyboard, and auto-placed captions ended up stacked on
 * top of each other. `over` draws the label inside a dark part, in white.
 */
function Label({ text, style, over }) {
  return (
    <span
      style={style}
      className={`pointer-events-none absolute -translate-x-1/2 rounded-full px-[1.8cqw] py-[0.5cqw] text-[2.7cqw] font-bold whitespace-nowrap ${
        over ? 'bg-white/15 text-white' : 'bg-ink text-white'
      }`}
    >
      {text}
    </span>
  )
}

export default function HardwareSim({ config = {}, onSolved, onMistake, showHint, solved }) {
  const tx = useTx()
  const { variant = 'laptop', target, showLabels = false } = config
  const [picked, setPicked] = useState(null)

  const pick = (id) => {
    if (solved || !target) return
    setPicked(id)
    if (id === target) return onSolved?.()
    // Name what they actually tapped, then point them back at the goal — a
    // bare "wrong" teaches nothing, and the two names together do.
    onMistake?.(
      tx({
        en: `That one is the **${tx(PART_NAMES[id])}**. Have another look for the **${tx(PART_NAMES[target])}**.`,
        es: `Ese es **${tx(PART_NAMES[id])}**. Vuelve a buscar **${tx(PART_NAMES[target])}**.`,
      })
    )
  }

  const stateOf = (id) => {
    if (solved && id === target) return 'right'
    if (picked === id && id !== target) return 'wrong'
    if (picked === id) return 'right'
    return null
  }

  const halo = (id) => (showHint && id === target && !solved ? 'anim-halo rounded-[1cqw]' : '')

  const common = (id, style, shape) => ({
    id,
    style,
    shape: `${shape} ${halo(id)}`,
    onPick: pick,
    state: stateOf(id),
    label: tx(PART_NAMES[id]),
  })

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] border-2 border-line bg-gradient-to-b from-[#f6f3ec] to-[#e9e3d7]"
      style={{ containerType: 'inline-size' }}
    >
      {variant === 'laptop' ? (
        <>
          {/* screen */}
          <Part
            {...common(
              'screen',
              { left: '18%', top: '8%', width: '64%', height: '36%' },
              'rounded-[1.4cqw] border-[1.6cqw] border-[#3a3742] bg-[#1d2740]'
            )}
          />
          {/* keyboard deck */}
          <div
            className="absolute rounded-[1.6cqw] bg-[#cfcac2]"
            style={{ left: '11%', top: '47%', width: '78%', height: '29%' }}
            aria-hidden="true"
          />
          <Part
            {...common(
              'keyboard',
              { left: '16%', top: '56%', width: '68%', height: '12%' },
              'rounded-[1cqw] bg-[#8e8a94]'
            )}
          />
          <Part
            {...common(
              'trackpad',
              { left: '38%', top: '69.5%', width: '24%', height: '6.5%' },
              'rounded-[0.8cqw] border-[0.4cqw] border-[#a9a4ad] bg-[#dcd8d2]'
            )}
          />
          {/* Its own row above the keys, the way real laptops put it. */}
          <Part
            {...common(
              'power',
              { left: '78%', top: '48.6%', width: '5%', height: '6.67%' },
              'flex items-center justify-center rounded-full bg-[#7d7986]'
            )}
          />
          <span
            className="pointer-events-none absolute flex items-center justify-center text-[2.6cqw] text-white"
            style={{ left: '78%', top: '48.6%', width: '5%', height: '6.67%' }}
            aria-hidden="true"
          >
            ⏻
          </span>
          {/* key texture */}
          <div
            className="pointer-events-none absolute grid grid-cols-12 gap-[0.5cqw] p-[0.7cqw]"
            style={{ left: '16%', top: '56%', width: '68%', height: '12%' }}
            aria-hidden="true"
          >
            {Array.from({ length: 36 }).map((_, i) => (
              <span key={i} className="rounded-[0.3cqw] bg-[#413e49]" />
            ))}
          </div>
          {showLabels && (
            <>
              <Label over text={tx(PART_NAMES.screen)} style={{ left: '50%', top: '35%' }} />
              <Label over text={tx(PART_NAMES.keyboard)} style={{ left: '42%', top: '59.5%' }} />
              <Label text={tx(PART_NAMES.trackpad)} style={{ left: '50%', top: '80%' }} />
              <Label text={tx(PART_NAMES.power)} style={{ left: '62%', top: '48.5%' }} />
            </>
          )}
        </>
      ) : (
        <>
          <Part
            {...common(
              'screen',
              { left: '20%', top: '9%', width: '50%', height: '37%' },
              'rounded-[1.2cqw] border-[1.6cqw] border-[#3a3742] bg-[#1d2740]'
            )}
          />
          <div
            className="absolute bg-[#3a3742]"
            style={{ left: '41%', top: '46%', width: '8%', height: '8%' }}
            aria-hidden="true"
          />
          <div
            className="absolute rounded-[0.8cqw] bg-[#3a3742]"
            style={{ left: '33%', top: '53%', width: '24%', height: '2.5%' }}
            aria-hidden="true"
          />
          <Part
            {...common(
              'tower',
              { left: '76%', top: '14%', width: '17%', height: '46%' },
              'rounded-[1cqw] bg-[#4a4753]'
            )}
          />
          <Part
            {...common(
              'power',
              { left: '81.5%', top: '18%', width: '5%', height: '6.67%' },
              'flex items-center justify-center rounded-full bg-[#8b8794]'
            )}
          />
          <Part
            {...common(
              'keyboard',
              { left: '18%', top: '64%', width: '44%', height: '13%' },
              'rounded-[1cqw] bg-[#b8b3bd]'
            )}
          />
          <Part
            {...common(
              'mouse',
              { left: '66%', top: '64%', width: '9%', height: '15%' },
              'rounded-[3cqw_3cqw_2cqw_2cqw] border-[0.4cqw] border-[#9d98a6] bg-[#d6d2da]'
            )}
          />
          <div
            className="pointer-events-none absolute grid grid-cols-14 gap-[0.4cqw] p-[0.8cqw]"
            style={{ left: '18%', top: '64%', width: '44%', height: '13%' }}
            aria-hidden="true"
          >
            {Array.from({ length: 42 }).map((_, i) => (
              <span key={i} className="rounded-[0.3cqw] bg-[#4a4753]" />
            ))}
          </div>
          {showLabels && (
            <>
              <Label over text={tx(PART_NAMES.screen)} style={{ left: '45%', top: '36%' }} />
              <Label over text={tx(PART_NAMES.keyboard)} style={{ left: '40%', top: '67.5%' }} />
              <Label text={tx(PART_NAMES.tower)} style={{ left: '84%', top: '63%' }} />
              <Label text={tx(PART_NAMES.mouse)} style={{ left: '70.5%', top: '82%' }} />
              <Label text={tx(PART_NAMES.power)} style={{ left: '70%', top: '5%' }} />
            </>
          )}
        </>
      )}
    </div>
  )
}
