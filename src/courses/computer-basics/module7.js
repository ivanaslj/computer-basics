import { dev } from '../../i18n/content.js'

/**
 * Module 7 — Keyboard shortcuts.
 *
 * Deliberately last and deliberately short. Shortcuts are a convenience, not a
 * requirement, and presenting them as the finish line rather than a hurdle
 * keeps them from feeling like homework. The cheat sheet shows both platforms
 * side by side throughout.
 */
export default {
  id: 'm7',
  icon: 'keyboard',
  color: 'sun',
  title: { en: 'Keyboard shortcuts', es: 'Atajos del teclado' },
  subtitle: {
    en: 'A handful of key presses that save real time',
    es: 'Unas cuantas teclas que ahorran tiempo de verdad',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm7-l1',
      icon: 'clipboard',
      minutes: 5,
      title: { en: 'Copy and paste', es: 'Copiar y pegar' },
      steps: [
        {
          type: 'teach',
          title: { en: 'How a shortcut works', es: 'Cómo funciona un atajo' },
          visual: { art: 'modifier-keys' },
          body: [
            {
              en: 'A __shortcut__ is two keys pressed together: you **hold** one down, and **tap** the other. Then let both go.',
              es: 'Un __atajo__ son dos teclas juntas: **mantienes** una presionada, y **tocas** la otra. Luego sueltas las dos.',
            },
            {
              en: dev(
                'On Windows the key you hold is almost always [[Ctrl]], at the bottom-left of the keyboard.',
                'On a Mac the key you hold is almost always [[Command]] (it has a ⌘ on it), next to the space bar.'
              ),
              es: dev(
                'En Windows la tecla que mantienes es casi siempre [[Ctrl]], abajo a la izquierda del teclado.',
                'En Mac la tecla que mantienes es casi siempre [[Command]] (tiene un ⌘), junto a la barra espaciadora.'
              ),
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'Copy, then paste', es: 'Copiar, luego pegar' },
          body: [
            {
              en: '**Copy** takes whatever you have selected and puts an invisible duplicate on a shelf. The original stays where it is.',
              es: '**Copiar** toma lo que hayas seleccionado y pone un duplicado invisible en una repisa. El original se queda donde está.',
            },
            {
              en: '**Paste** puts that duplicate wherever your cursor is. You can paste it as many times as you like.',
              es: '**Pegar** pone ese duplicado donde esté tu cursor. Puedes pegarlo tantas veces como quieras.',
            },
            {
              en: dev(
                'Copy is [[Ctrl]] + [[C]]. Paste is [[Ctrl]] + [[V]].',
                'Copy is [[Command]] + [[C]]. Paste is [[Command]] + [[V]].'
              ),
              es: dev(
                'Copiar es [[Ctrl]] + [[C]]. Pegar es [[Ctrl]] + [[V]].',
                'Copiar es [[Command]] + [[C]]. Pegar es [[Command]] + [[V]].'
              ),
            },
          ],
          callout: {
            en: 'The first step is always **selecting** — dragging across the words you want, so they turn a highlighted colour. Nothing copies until something is selected.',
            es: 'El primer paso siempre es **seleccionar** — arrastrar sobre las palabras que quieres, para que se resalten de color. No se copia nada hasta que algo esté seleccionado.',
          },
        },
        {
          type: 'sim',
          sim: 'keys',
          prompt: {
            en: 'You have selected some words. **Copy** them.',
            es: 'Ya seleccionaste unas palabras. **Cópialas**.',
          },
          config: {
            combo: dev(['Ctrl', 'C'], ['Command', 'C']),
            letters: ['C', 'V', 'X', 'Z'],
          },
        },
        {
          type: 'sim',
          sim: 'keys',
          prompt: {
            en: 'Now **paste** them somewhere else.',
            es: 'Ahora **pégalas** en otro lado.',
          },
          config: {
            combo: dev(['Ctrl', 'V'], ['Command', 'V']),
            letters: ['C', 'V', 'X', 'Z'],
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'You copied a phone number, then copied an address. What is on the shelf now?',
            es: 'Copiaste un número de teléfono, luego copiaste una dirección. ¿Qué hay en la repisa ahora?',
          },
          options: [
            {
              id: 'a',
              emoji: '🏠',
              label: { en: 'Only the address', es: 'Solo la dirección' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '📚',
              label: { en: 'Both of them', es: 'Las dos cosas' },
              why: {
                en: 'The shelf only holds one thing. Copying something new replaces what was there — so paste before you copy again.',
                es: 'La repisa solo guarda una cosa. Copiar algo nuevo reemplaza lo anterior — así que pega antes de volver a copiar.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            {
              en: 'Select first, then copy.',
              es: 'Primero selecciona, luego copia.',
            },
            {
              en: dev('Copy: Ctrl + C. Paste: Ctrl + V.', 'Copy: ⌘ + C. Paste: ⌘ + V.'),
              es: dev('Copiar: Ctrl + C. Pegar: Ctrl + V.', 'Copiar: ⌘ + C. Pegar: ⌘ + V.'),
            },
            {
              en: 'The shelf holds one thing at a time.',
              es: 'La repisa guarda una cosa a la vez.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm7-l2',
      icon: 'undo',
      minutes: 3,
      title: { en: 'Undo: the safety net', es: 'Deshacer: la red de seguridad' },
      steps: [
        {
          type: 'teach',
          title: { en: 'The one to remember', es: 'El que hay que recordar' },
          body: [
            {
              en: 'If you learn only one shortcut in your life, make it this one. __Undo__ takes back the last thing you did.',
              es: 'Si aprendes un solo atajo en tu vida, que sea este. __Deshacer__ revierte lo último que hiciste.',
            },
            {
              en: dev(
                'It is [[Ctrl]] + [[Z]]. Press it again to undo the thing before that, and again, and again.',
                'It is [[Command]] + [[Z]]. Press it again to undo the thing before that, and again, and again.'
              ),
              es: dev(
                'Es [[Ctrl]] + [[Z]]. Presiónalo otra vez para deshacer lo anterior, y otra, y otra.',
                'Es [[Command]] + [[Z]]. Presiónalo otra vez para deshacer lo anterior, y otra, y otra.'
              ),
            },
          ],
          callout: {
            en: 'Deleted a paragraph by accident? Moved a file somewhere odd? Undo. It works in almost every app there is.',
            es: '¿Borraste un párrafo sin querer? ¿Moviste un archivo a un lugar raro? Deshacer. Funciona en casi toda aplicación.',
          },
          calloutTone: 'grass',
          calloutIcon: 'undo',
        },
        {
          type: 'sim',
          sim: 'keys',
          prompt: {
            en: 'You just deleted something you did not mean to. **Undo** it.',
            es: 'Acabas de borrar algo sin querer. **Deshazlo**.',
          },
          config: {
            combo: dev(['Ctrl', 'Z'], ['Command', 'Z']),
            letters: ['Z', 'C', 'V', 'S'],
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'You are typing a letter and delete a whole paragraph by mistake. What now?',
            es: 'Estás escribiendo una carta y borras un párrafo entero por error. ¿Ahora qué?',
          },
          options: [
            {
              id: 'a',
              emoji: '↩️',
              label: {
                en: dev('Press Ctrl + Z and it comes back', 'Press ⌘ + Z and it comes back'),
                es: dev('Presionar Ctrl + Z y regresa', 'Presionar ⌘ + Z y regresa'),
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '😩',
              label: { en: 'Type the whole thing again', es: 'Escribirlo todo otra vez' },
              why: {
                en: 'You do not have to. Undo brings it back exactly as it was.',
                es: 'No hace falta. Deshacer lo trae de vuelta tal como estaba.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            {
              en: dev('Undo is Ctrl + Z. Press it repeatedly to go further back.', 'Undo is ⌘ + Z. Press it repeatedly to go further back.'),
              es: dev('Deshacer es Ctrl + Z. Presiónalo varias veces para ir más atrás.', 'Deshacer es ⌘ + Z. Presiónalo varias veces para ir más atrás.'),
            },
            {
              en: 'It works in almost every app.',
              es: 'Funciona en casi toda aplicación.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm7-l3',
      icon: 'camera',
      minutes: 5,
      title: { en: 'The cheat sheet', es: 'La hoja de trucos' },
      steps: [
        {
          type: 'teach',
          title: { en: 'A picture of your screen', es: 'Una foto de tu pantalla' },
          body: [
            {
              en: 'A __screenshot__ is a photo of whatever is on your screen right now. It is the fastest way to show somebody what you are seeing.',
              es: 'Una __captura de pantalla__ es una foto de lo que está en tu pantalla ahora mismo. Es la forma más rápida de mostrarle a alguien lo que estás viendo.',
            },
            {
              en: dev(
                'Hold [[⊞]] and [[Shift]] and tap [[S]]. The screen dims, and you drag a box around the part you want.',
                'Hold [[Command]] and [[Shift]] and tap [[4]]. The pointer becomes a crosshair, and you drag a box around the part you want.'
              ),
              es: dev(
                'Mantén [[⊞]] y [[Shift]] y toca [[S]]. La pantalla se oscurece, y arrastras un recuadro sobre la parte que quieres.',
                'Mantén [[Command]] y [[Shift]] y toca [[4]]. El puntero se vuelve una cruz, y arrastras un recuadro sobre la parte que quieres.'
              ),
            },
          ],
          callout: {
            en: 'This is the thing to do when something confusing appears and you want to ask someone about it. Screenshot first, then ask.',
            es: 'Esto es lo que hay que hacer cuando aparece algo confuso y quieres preguntarle a alguien. Primero captura, luego pregunta.',
          },
          calloutIcon: 'camera',
        },
        {
          type: 'teach',
          title: { en: 'Two more worth knowing', es: 'Dos más que vale la pena saber' },
          body: [
            {
              en: dev(
                '__Select all__ — [[Ctrl]] + [[A]] — highlights everything on the page at once, so you do not have to drag across it.',
                '__Select all__ — [[Command]] + [[A]] — highlights everything on the page at once, so you do not have to drag across it.'
              ),
              es: dev(
                '__Seleccionar todo__ — [[Ctrl]] + [[A]] — resalta todo en la página de una vez, para no tener que arrastrar.',
                '__Seleccionar todo__ — [[Command]] + [[A]] — resalta todo en la página de una vez, para no tener que arrastrar.'
              ),
            },
            {
              en: dev(
                '__Find on this page__ — [[Ctrl]] + [[F]] — opens a little search box that jumps to a word anywhere on a long page. Wonderful for finding a phone number buried in a wall of text.',
                '__Find on this page__ — [[Command]] + [[F]] — opens a little search box that jumps to a word anywhere on a long page. Wonderful for finding a phone number buried in a wall of text.'
              ),
              es: dev(
                '__Buscar en la página__ — [[Ctrl]] + [[F]] — abre una casilla que salta a una palabra en cualquier parte de una página larga. Buenísimo para encontrar un teléfono perdido entre mucho texto.',
                '__Buscar en la página__ — [[Command]] + [[F]] — abre una casilla que salta a una palabra en cualquier parte de una página larga. Buenísimo para encontrar un teléfono perdido entre mucho texto.'
              ),
            },
          ],
        },
        {
          type: 'sim',
          sim: 'keys',
          prompt: {
            en: 'A long page, and you need one phone number. Open **find on this page**.',
            es: 'Una página larga, y necesitas un teléfono. Abre **buscar en la página**.',
          },
          config: {
            combo: dev(['Ctrl', 'F'], ['Command', 'F']),
            letters: ['F', 'A', 'S', 'Z'],
          },
        },
        {
          type: 'teach',
          title: { en: 'Keep this page', es: 'Guarda esta página' },
          visual: { art: 'shortcut-table' },
          body: [
            {
              en: 'Here is the whole set, both kinds of computer side by side. Yours is the bright column.',
              es: 'Aquí está el juego completo, los dos tipos de computadora lado a lado. La tuya es la columna brillante.',
            },
            {
              en: 'You do not need to memorise any of it. Come back to this lesson whenever you want — it stays here.',
              es: 'No necesitas memorizar nada. Vuelve a esta lección cuando quieras — aquí se queda.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            {
              en: dev('Screenshot: ⊞ + Shift + S.', 'Screenshot: ⌘ + Shift + 4.'),
              es: dev('Captura: ⊞ + Shift + S.', 'Captura: ⌘ + Shift + 4.'),
            },
            {
              en: dev('Select all: Ctrl + A. Find on page: Ctrl + F.', 'Select all: ⌘ + A. Find on page: ⌘ + F.'),
              es: dev('Seleccionar todo: Ctrl + A. Buscar en página: Ctrl + F.', 'Seleccionar todo: ⌘ + A. Buscar en página: ⌘ + F.'),
            },
            {
              en: 'Shortcuts are a convenience. Everything here can also be done with the mouse.',
              es: 'Los atajos son una comodidad. Todo esto también se puede hacer con el ratón.',
            },
          ],
        },
      ],
    },
  ],
}
