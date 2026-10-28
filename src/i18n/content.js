/**
 * Resolving lesson content — pure functions, no React, so build tooling and
 * the curriculum checker can import them without a JSX runtime.
 *
 * Lesson content is written as plain values that may vary by language, by the
 * learner's computer, and by their phone:
 *
 *   'plain text'                       -> used as-is
 *   { en: '…', es: '…' }               -> picked by language
 *   dev('Ctrl', 'Command')             -> picked by Windows / Mac
 *   phone('Photos', 'Gallery')         -> picked by iPhone / Android
 *
 * These nest freely, so `dev({en,es}, {en,es})` works. `resolve` walks the
 * value and returns a string; arrays resolve item by item.
 */

export const DEV = '__dev__'
export const PHONE = '__phone__'

/** Marks a value as varying between Windows and Mac. */
export const dev = (windows, mac) => ({ [DEV]: true, windows, mac })

/** Marks a value as varying between iPhone and Android. */
export const phone = (iphone, android) => ({ [PHONE]: true, iphone, android })

export function resolve(node, lang = 'en', device = 'windows', handset = 'iphone') {
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return node
  if (Array.isArray(node)) return node.map((n) => resolve(n, lang, device, handset))
  if (node[DEV]) return resolve(device === 'mac' ? node.mac : node.windows, lang, device, handset)
  if (node[PHONE]) return resolve(handset === 'android' ? node.android : node.iphone, lang, device, handset)
  if ('en' in node || 'es' in node) return resolve(node[lang] ?? node.en ?? node.es, lang, device, handset)
  return node
}
