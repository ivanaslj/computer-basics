import { useEffect, useState } from 'react'

/**
 * "Add to home screen" support.
 *
 * Chrome/Edge hand us a `beforeinstallprompt` event we can trigger on demand.
 * Safari on iOS has no such event, so there we detect the platform and show
 * the manual steps instead — which is the whole point of the PWA route: the
 * link works everywhere, and installing is a nicety on top.
 *
 * The listeners are registered when this module loads, not when Settings
 * mounts. The browser fires `beforeinstallprompt` once, shortly after the page
 * loads; listening only from Settings meant it had almost always gone by, and
 * the real "Install app" button almost never appeared.
 */

let deferred = null
let installedNow = false
const listeners = new Set()
const notify = () => listeners.forEach((fn) => fn())

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e
    notify()
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    installedNow = true
    notify()
  })
}

/**
 * Which set of written steps fits this browser:
 *   'ios-safari'       iPhone or iPad, in Safari (Share, then Add to Home Screen)
 *   'android-chrome'   Chrome on Android (the ⋮ menu)
 *   'desktop-chromium' Chrome or Edge on a computer (the install icon)
 *   'other'            anything else, which gets the general wording
 */
export function detectPlatform(ua = navigator.userAgent, touchPoints = navigator.maxTouchPoints || 0) {
  // iPadOS asks for desktop sites, so an iPad says "Macintosh". A Mac with a
  // touch screen does not exist; one with touch points is an iPad.
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && touchPoints > 1)
  if (ios) {
    // Chrome, Firefox and Edge on iOS have their own menus, laid out differently.
    return /CriOS|FxiOS|EdgiOS|OPiOS/.test(ua) ? 'other' : 'ios-safari'
  }
  if (/Android/.test(ua)) {
    const chrome = /Chrome\//.test(ua) && !/SamsungBrowser|Firefox|OPR|EdgA|YaBrowser|UCBrowser/.test(ua)
    return chrome ? 'android-chrome' : 'other'
  }
  const mobile = /Mobi/.test(ua)
  if (!mobile && (/Edg\//.test(ua) || (/Chrome\//.test(ua) && !/OPR|Brave/.test(ua)))) return 'desktop-chromium'
  return 'other'
}

export function useInstallPrompt() {
  const [, rerender] = useState(0)

  useEffect(() => {
    const fn = () => rerender((n) => n + 1)
    listeners.add(fn)
    return () => listeners.delete(fn)
  }, [])

  const standalone =
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone)

  const platform = typeof navigator === 'undefined' ? 'other' : detectPlatform()

  return {
    canPrompt: Boolean(deferred),
    platform,
    isIOS: platform === 'ios-safari',
    installed: installedNow || Boolean(standalone),
    prompt: async () => {
      if (!deferred) return
      const e = deferred
      e.prompt()
      await e.userChoice
      deferred = null
      notify()
    },
  }
}
