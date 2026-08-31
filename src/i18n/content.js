/**
 * Resolving lesson content — pure functions, no React, so build tooling and
 * the curriculum checker can import them without a JSX runtime.
 *
 * Lesson content is written as plain values that may vary by language and by
 * the learner's computer:
 *
 *   'plain text'                       -> used as-is
 *   { en: '…', es: '…' }               -> picked by language
 *   dev('Ctrl', 'Command')             -> picked by Windows / Mac
 *
 * These nest freely, so `dev({en,es}, {en,es})` works. `resolve` walks the
 * value and returns a string; arrays resolve item by item.
 */

export const DEV = '__dev__'

/** Marks a value as varying between Windows and Mac. */
export const dev = (windows, mac) => ({ [DEV]: true, windows, mac })

export function resolve(node, lang = 'en', device = 'windows') {
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return node
  if (Array.isArray(node)) return node.map((n) => resolve(n, lang, device))
  if (node[DEV]) return resolve(device === 'mac' ? node.mac : node.windows, lang, device)
  if ('en' in node || 'es' in node) return resolve(node[lang] ?? node.en ?? node.es, lang, device)
  return node
}
