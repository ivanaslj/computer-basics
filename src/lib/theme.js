import { useEffect, useState } from 'react'

/**
 * Whether the dark theme is showing: chosen outright, or "match my device" on a
 * device that is in dark mode. Follows the device as it changes.
 */
export function useDarkTheme(theme) {
  const [deviceDark, setDeviceDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  )
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => setDeviceDark(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return theme === 'dark' || (theme === 'system' && deviceDark)
}
