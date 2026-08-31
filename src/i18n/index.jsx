import { useCallback } from 'react'
import { STRINGS } from './strings'
import { useApp } from '../state/store'
import { resolve } from './content'

export { dev, resolve } from './content'

/** UI chrome strings, with `{name}` placeholders. */
export function useT() {
  const { settings } = useApp()
  const lang = settings.language
  return useCallback(
    (key, vars) => {
      let out = STRINGS[lang]?.[key] ?? STRINGS.en[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(String(v))
      }
      return out
    },
    [lang]
  )
}

/** Resolves lesson content for the current language + device. */
export function useTx() {
  const { settings } = useApp()
  const lang = settings.language
  const device = settings.device || 'windows'
  return useCallback((node) => resolve(node, lang, device), [lang, device])
}

/** The raw language/device pair, for components that branch on it. */
export function useLocale() {
  const { settings } = useApp()
  return { lang: settings.language, device: settings.device || 'windows' }
}
