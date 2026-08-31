import HardwareSim from './HardwareSim'
import DesktopSim from './DesktopSim'
import WindowSim from './WindowSim'
import FilesSim from './FilesSim'
import BrowserSim from './BrowserSim'
import KeysSim from './KeysSim'
import { ScrollSim, AISim } from './MiscSims'
import { SIMS as SIM_NAMES } from './registry'

/**
 * Every simulation takes the same props, so lessons can name one by string:
 *
 *   { sim: 'desktop', config: { … } }
 *
 * Props: config, onSolved, onMistake(message), showHint, solved.
 */
export const SIMS = {
  hardware: HardwareSim,
  desktop: DesktopSim,
  window: WindowSim,
  files: FilesSim,
  browser: BrowserSim,
  keys: KeysSim,
  scroll: ScrollSim,
  ai: AISim,
}

export function getSim(name) {
  return SIMS[name] || null
}

// registry.js is what the curriculum checker reads (it can't import JSX), so a
// name added here and not there would go unchecked. Catch that in development.
if (import.meta.env?.DEV) {
  const impl = Object.keys(SIMS)
  const drift = [
    ...SIM_NAMES.filter((n) => !impl.includes(n)).map((n) => `${n} listed but not implemented`),
    ...impl.filter((n) => !SIM_NAMES.includes(n)).map((n) => `${n} implemented but not listed`),
  ]
  if (drift.length) console.error('sim registry out of sync:', drift.join('; '))
}
