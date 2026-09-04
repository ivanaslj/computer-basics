import { useEffect, useState } from 'react'
import { registerSW } from 'virtual:pwa-register'

/**
 * Keeping an installed app on the newest version.
 *
 * The service worker precaches the whole build so every lesson works with no
 * connection. The cost of that is a page which, once loaded, will happily run
 * the same JavaScript forever: a new worker installs, claims the page, and the
 * already-running app never notices. Someone can open the app every day for a
 * week and still be looking at the build they first opened.
 *
 * "Pull down to refresh twice" cannot be the answer for an app whose whole
 * audience is people learning what a browser is. So: check for a new version
 * at the moments a phone actually might have one, and tell the caller when one
 * is live. `App.jsx` owns the decision of *when* it is safe to swap — never
 * mid-lesson.
 */
export function useAppUpdate() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return

    // On a device that has never opened the app there is no controller yet.
    // The first worker installing and claiming the page fires the exact same
    // event as an update, but for a version that is already the newest — so
    // without this snapshot every first-time visitor gets a pointless reload
    // the moment they arrive.
    const hadController = Boolean(navigator.serviceWorker.controller)

    let stopChecking = () => {}

    registerSW({
      immediate: true,
      onRegisteredSW(_url, registration) {
        if (!registration) return
        const check = () => registration.update().catch(() => {})

        // An app opened from the home screen and then resumed from the app
        // switcher never fires `load` again, so it would otherwise go days
        // without ever asking whether a new version exists.
        const onVisible = () => {
          if (document.visibilityState === 'visible') check()
        }
        document.addEventListener('visibilitychange', onVisible)
        const timer = setInterval(check, 60 * 60 * 1000)

        stopChecking = () => {
          document.removeEventListener('visibilitychange', onVisible)
          clearInterval(timer)
        }
      },
    })

    // The worker is built with skipWaiting + clientsClaim, so it activates and
    // takes the page over as soon as it has installed. That handover is the
    // signal that the new build is sitting in the cache, ready for a reload to
    // pick up.
    const onControllerChange = () => {
      if (hadController) setReady(true)
    }
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange)

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange)
      stopChecking()
    }
  }, [])

  return ready
}

// Module-level, not component state: a reload tears the component down, so a
// flag inside it could never stop a second one. This is the backstop against a
// misbehaving worker turning the app into a refresh loop.
let reloading = false

export function applyUpdate() {
  if (reloading) return
  reloading = true
  window.location.reload()
}
