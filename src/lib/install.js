import { useEffect, useState } from 'react'

/**
 * "Add to home screen" support.
 *
 * Chrome/Edge hand us a `beforeinstallprompt` event we can trigger on demand.
 * Safari on iOS has no such event, so there we detect the platform and show
 * the manual steps instead — which is the whole point of the PWA route: the
 * link works everywhere, and installing is a nicety on top.
 */
export function useInstallPrompt() {
  const [deferred, setDeferred] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault()
      setDeferred(e)
    }
    const onInstalled = () => {
      setDeferred(null)
      setInstalled(true)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const standalone =
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone)

  const isIOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window.MSStream

  return {
    canPrompt: Boolean(deferred),
    isIOS,
    installed: installed || standalone,
    prompt: async () => {
      if (!deferred) return
      deferred.prompt()
      await deferred.userChoice
      setDeferred(null)
    },
  }
}
