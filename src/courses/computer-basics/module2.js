import { dev } from '../../i18n/content.js'

/**
 * Module 2 — Windows and apps.
 *
 * The core idea: an app opens in a window, a window can be closed OR merely
 * set aside, and several can be open at once. Confusing "closed" with "hidden"
 * is what makes people think they have lost their work, so lesson 3 is built
 * entirely around that one distinction.
 */

const DESKTOP_ICONS = [
  { id: 'writer', emoji: '📝', label: { en: 'Notes', es: 'Notas' }, x: 6, y: 8 },
  { id: 'browser', emoji: '🌐', label: { en: 'Internet', es: 'Internet' }, x: 6, y: 32 },
  { id: 'photos', emoji: '🖼️', label: { en: 'Photos', es: 'Fotos' }, x: 6, y: 56 },
  { id: 'calc', emoji: '🧮', label: { en: 'Calculator', es: 'Calculadora' }, x: 26, y: 8 },
]

const NOTES_WINDOW = {
  id: 'notes',
  emoji: '📝',
  title: { en: 'Notes', es: 'Notas' },
  body: {
    en: 'Shopping list:\n\nrice, beans, two onions, coffee',
    es: 'Lista del súper:\n\narroz, frijol, dos cebollas, café',
  },
  x: 8,
  y: 10,
  w: 62,
  h: 52,
}

const PHOTOS_WINDOW = {
  id: 'photos',
  emoji: '🖼️',
  title: { en: 'Photos', es: 'Fotos' },
  body: {
    en: 'Your pictures would be shown here.',
    es: 'Aquí se mostrarían tus fotos.',
  },
  x: 26,
  y: 26,
  w: 62,
  h: 50,
}

export default {
  id: 'm2',
  emoji: '🪟',
  color: 'brand',
  title: { en: 'Windows and apps', es: 'Ventanas y aplicaciones' },
  subtitle: {
    en: 'Opening things, putting them away, and doing two at once',
    es: 'Abrir cosas, guardarlas, y hacer dos a la vez',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm2-l1',
      emoji: '📦',
      minutes: 3,
      title: { en: 'What an app is', es: 'Qué es una aplicación' },
      steps: [
        {
          type: 'teach',
          title: { en: 'One tool for one job', es: 'Una herramienta para cada trabajo' },
          body: [
            {
              en: 'An __app__ is a program that does one kind of job. One app for writing. One for photos. One for the internet. You already have these on your phone.',
              es: 'Una __aplicación__ es un programa que hace un tipo de trabajo. Una para escribir. Una para fotos. Una para el internet. Ya tienes de estas en tu teléfono.',
            },
            {
              en: 'On a computer, "app" and "program" mean the same thing. People use both words.',
              es: 'En la computadora, «aplicación» y «programa» significan lo mismo. La gente usa las dos palabras.',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'Apps open into windows', es: 'Las aplicaciones abren en ventanas' },
          body: [
            {
              en: 'When you open an app, it appears inside a rectangle on the screen. That rectangle is a __window__.',
              es: 'Cuando abres una aplicación, aparece dentro de un rectángulo en la pantalla. Ese rectángulo es una __ventana__.',
            },
            {
              en: 'This is the big difference from a phone. On a phone, an app fills the whole screen. On a computer, apps sit in windows that can be moved, resized, and stacked on top of each other — like papers on a desk.',
              es: 'Esta es la gran diferencia con el teléfono. En el teléfono, una aplicación llena toda la pantalla. En la computadora, las aplicaciones viven en ventanas que se pueden mover, cambiar de tamaño y encimar — como papeles en un escritorio.',
            },
          ],
          callout: {
            en: 'That is why a computer can show you two things side by side, and a phone usually cannot.',
            es: 'Por eso una computadora puede mostrarte dos cosas lado a lado, y el teléfono normalmente no.',
          },
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: {
            en: 'Open the **Notes** app — remember, two quick taps.',
            es: 'Abre la aplicación **Notas** — recuerda, dos toques rápidos.',
          },
          config: {
            goal: 'doubleclick',
            target: 'writer',
            icons: DESKTOP_ICONS,
            opensWindow: {
              emoji: '📝',
              title: { en: 'Notes', es: 'Notas' },
              body: {
                en: 'The Notes app is now open, in its own window.',
                es: 'La aplicación Notas ya está abierta, en su propia ventana.',
              },
            },
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'On a computer, what happens when you open an app?',
            es: 'En la computadora, ¿qué pasa cuando abres una aplicación?',
          },
          options: [
            {
              id: 'a',
              emoji: '🪟',
              label: {
                en: 'It opens in a window you can move around',
                es: 'Se abre en una ventana que puedes mover',
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '📱',
              label: {
                en: 'It takes over the whole screen, like on a phone',
                es: 'Toma toda la pantalla, como en el teléfono',
              },
              why: {
                en: 'It can fill the screen if you want it to — but it starts as a window, and you decide.',
                es: 'Puede llenar la pantalla si tú quieres — pero empieza como ventana, y tú decides.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'An app is a program that does one job.', es: 'Una aplicación es un programa que hace un trabajo.' },
            { en: 'Apps open inside windows.', es: 'Las aplicaciones abren dentro de ventanas.' },
            {
              en: 'Several windows can be open at the same time.',
              es: 'Varias ventanas pueden estar abiertas al mismo tiempo.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm2-l2',
      emoji: '🔲',
      minutes: 4,
      title: { en: 'The parts of a window', es: 'Las partes de una ventana' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Every window looks the same', es: 'Todas las ventanas se ven igual' },
          visual: { art: 'window-anatomy' },
          body: [
            {
              en: 'This is worth knowing because **every** window works this way — for every app, forever. Learn it once.',
              es: 'Vale la pena saberlo porque **todas** las ventanas funcionan así — en toda aplicación, siempre. Apréndelo una vez.',
            },
            {
              en: 'Along the top is the __title bar__. It says what the window is. At one end of it are three small buttons.',
              es: 'Arriba está la __barra de título__. Dice qué es la ventana. En una punta hay tres botoncitos.',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'The three buttons', es: 'Los tres botones' },
          body: [
            {
              en: dev(
                '**✕ Close.** Puts the window away completely. On Windows they sit at the **top right**.',
                '**Red ● Close.** Puts the window away completely. On a Mac they sit at the **top left**.'
              ),
              es: dev(
                '**✕ Cerrar.** Guarda la ventana por completo. En Windows están **arriba a la derecha**.',
                '**● Rojo, cerrar.** Guarda la ventana por completo. En Mac están **arriba a la izquierda**.'
              ),
            },
            {
              en: dev(
                '**– Minimise.** Hides the window without closing it.',
                '**Yellow ● Minimise.** Hides the window without closing it.'
              ),
              es: dev(
                '**– Minimizar.** Esconde la ventana sin cerrarla.',
                '**● Amarillo, minimizar.** Esconde la ventana sin cerrarla.'
              ),
            },
            {
              en: dev(
                '**▢ Maximise.** Makes the window fill the whole screen.',
                '**Green ● Full screen.** Makes the window fill the whole screen.'
              ),
              es: dev(
                '**▢ Maximizar.** Hace que la ventana llene toda la pantalla.',
                '**● Verde, pantalla completa.** Hace que la ventana llene toda la pantalla.'
              ),
            },
          ],
        },
        {
          type: 'sim',
          sim: 'window',
          prompt: {
            en: 'Make this window **fill the whole screen**.',
            es: 'Haz que esta ventana **llene toda la pantalla**.',
          },
          config: { goal: 'maximize', target: 'notes', windows: [NOTES_WINDOW] },
        },
        {
          type: 'sim',
          sim: 'window',
          prompt: { en: '**Close** this window.', es: '**Cierra** esta ventana.' },
          config: { goal: 'close', target: 'notes', windows: [NOTES_WINDOW] },
        },
        {
          type: 'recap',
          points: [
            {
              en: 'Every window has a title bar with three buttons.',
              es: 'Toda ventana tiene una barra de título con tres botones.',
            },
            {
              en: dev('Close, minimise and maximise sit at the top right.', 'Close, minimise and full screen sit at the top left.'),
              es: dev('Cerrar, minimizar y maximizar están arriba a la derecha.', 'Cerrar, minimizar y pantalla completa están arriba a la izquierda.'),
            },
            {
              en: 'The same three buttons work in every app.',
              es: 'Los mismos tres botones funcionan en toda aplicación.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm2-l3',
      emoji: '🙈',
      minutes: 4,
      title: { en: 'Closed, or just hidden?', es: '¿Cerrada, o solo escondida?' },
      steps: [
        {
          type: 'teach',
          title: { en: 'These two look similar and are not', es: 'Estos dos se parecen y no son lo mismo' },
          body: [
            {
              en: '**Closing** a window puts the app away. It stops running. If you had not saved your work, the computer will ask you first.',
              es: '**Cerrar** una ventana guarda la aplicación. Deja de funcionar. Si no habías guardado tu trabajo, la computadora te pregunta primero.',
            },
            {
              en: '**Minimising** only hides it. The app keeps running. It goes down to the bar at the bottom, and one click brings it straight back — exactly as you left it.',
              es: '**Minimizar** solo la esconde. La aplicación sigue funcionando. Se va a la barra de abajo, y un clic la trae de vuelta — tal como la dejaste.',
            },
          ],
          callout: {
            en: 'When something "disappears", it is usually minimised, not lost. Look at the bar along the bottom.',
            es: 'Cuando algo «desaparece», casi siempre está minimizado, no perdido. Mira la barra de abajo.',
          },
          calloutEmoji: '🔎',
        },
        {
          type: 'sim',
          sim: 'window',
          prompt: {
            en: '**Hide** this window without closing it — you want to come back to it.',
            es: '**Esconde** esta ventana sin cerrarla — quieres volver a ella.',
          },
          config: { goal: 'minimize', target: 'notes', windows: [NOTES_WINDOW] },
        },
        {
          type: 'sim',
          sim: 'window',
          prompt: {
            en: 'Your Notes window is hidden. **Bring it back** using the bar.',
            es: 'Tu ventana de Notas está escondida. **Tráela de vuelta** usando la barra.',
          },
          config: {
            goal: 'restore',
            target: 'notes',
            windows: [{ ...NOTES_WINDOW, startMinimized: true }],
          },
        },
        {
          type: 'sort',
          prompt: {
            en: 'For each situation, which button do you want?',
            es: 'Para cada situación, ¿qué botón quieres?',
          },
          buckets: [
            { id: 'close', emoji: '✕', label: { en: 'Close it', es: 'Cerrarla' } },
            { id: 'minimize', emoji: '–', label: { en: 'Just hide it', es: 'Solo esconderla' } },
          ],
          items: [
            {
              id: 'a',
              emoji: '☕',
              bucket: 'minimize',
              label: {
                en: 'You are half-way through a letter and want to check something else for a minute.',
                es: 'Vas a media carta y quieres revisar otra cosa un minuto.',
              },
              why: {
                en: 'Hide it. The letter stays exactly as it is, and comes back with one click.',
                es: 'Escóndela. La carta se queda igualita, y vuelve con un clic.',
              },
            },
            {
              id: 'b',
              emoji: '✅',
              bucket: 'close',
              label: {
                en: 'You have finished reading an article and are done with it.',
                es: 'Terminaste de leer un artículo y ya no lo necesitas.',
              },
              why: {
                en: 'Close it. You are finished, so there is no reason to keep it running.',
                es: 'Ciérralo. Ya terminaste, así que no hay razón para dejarlo abierto.',
              },
            },
            {
              id: 'c',
              emoji: '🖥️',
              bucket: 'minimize',
              label: {
                en: 'You need to see something on the desktop behind the window.',
                es: 'Necesitas ver algo del escritorio detrás de la ventana.',
              },
              why: {
                en: 'Hide it. Getting it out of the way for a moment is not the same as finishing with it.',
                es: 'Escóndela. Quitarla de en medio un momento no es lo mismo que terminar con ella.',
              },
            },
            {
              id: 'd',
              emoji: '😵',
              bucket: 'close',
              label: {
                en: 'You opened something by accident and do not want it.',
                es: 'Abriste algo por accidente y no lo quieres.',
              },
              why: {
                en: 'Close it. There is nothing in there you need to come back to.',
                es: 'Ciérralo. No hay nada ahí a lo que necesites volver.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Close = finished with it. The app stops.', es: 'Cerrar = ya terminaste. La aplicación se detiene.' },
            {
              en: 'Minimise = set aside. The app keeps running, down on the bar.',
              es: 'Minimizar = a un lado. La aplicación sigue, abajo en la barra.',
            },
            {
              en: 'A window that vanished is almost always minimised.',
              es: 'Una ventana que desapareció casi siempre está minimizada.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm2-l4',
      emoji: '🔀',
      minutes: 5,
      title: { en: 'Two things at once', es: 'Dos cosas a la vez' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Windows stack up', es: 'Las ventanas se encinan' },
          body: [
            {
              en: 'Open two apps and you have two windows. One sits on top of the other, like sheets of paper.',
              es: 'Abre dos aplicaciones y tienes dos ventanas. Una queda encima de la otra, como hojas de papel.',
            },
            {
              en: 'The one on top is the __active__ window — the one that listens when you type. To work in a different one, you bring it to the top.',
              es: 'La de arriba es la ventana __activa__ — la que escucha cuando escribes. Para trabajar en otra, la traes al frente.',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'Two ways to switch', es: 'Dos formas de cambiar' },
          body: [
            {
              en: '**Click it.** If you can see any part of the window you want, click on it. It jumps to the front.',
              es: '**Haz clic.** Si alcanzas a ver cualquier parte de la ventana que quieres, haz clic ahí. Salta al frente.',
            },
            {
              en: dev(
                '**Use the taskbar.** Every open app has a small picture on the bar at the bottom. Click it to bring that window forward.',
                '**Use the dock.** Every open app has a small picture on the bar at the bottom, with a dot under it. Click it to bring that window forward.'
              ),
              es: dev(
                '**Usa la barra de tareas.** Cada aplicación abierta tiene un dibujito en la barra de abajo. Haz clic para traer esa ventana al frente.',
                '**Usa el dock.** Cada aplicación abierta tiene un dibujito en la barra de abajo, con un puntito. Haz clic para traer esa ventana al frente.'
              ),
            },
          ],
        },
        {
          type: 'sim',
          sim: 'window',
          prompt: {
            en: 'Photos is covering your Notes. Bring **Notes** back to the front.',
            es: 'Fotos está tapando tus Notas. Trae **Notas** al frente.',
          },
          config: {
            goal: 'switch',
            target: 'notes',
            windows: [{ ...NOTES_WINDOW, startBehind: true }, PHOTOS_WINDOW],
          },
        },
        {
          type: 'teach',
          title: { en: 'The fast way', es: 'La forma rápida' },
          visual: { art: 'modifier-keys' },
          body: [
            {
              en: dev(
                'There is a keyboard shortcut that flips between windows without touching the mouse: hold [[Alt]] and tap [[Tab]].',
                'There is a keyboard shortcut that flips between windows without touching the mouse: hold [[Command]] and tap [[Tab]].'
              ),
              es: dev(
                'Hay un atajo de teclado que cambia de ventana sin tocar el ratón: mantén [[Alt]] y toca [[Tab]].',
                'Hay un atajo de teclado que cambia de ventana sin tocar el ratón: mantén [[Command]] y toca [[Tab]].'
              ),
            },
            {
              en: 'Keep the first key held down, and a row of your open windows appears. Let go on the one you want.',
              es: 'Mantén la primera tecla presionada, y aparece una fila con tus ventanas abiertas. Suelta en la que quieras.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'keys',
          prompt: {
            en: 'Try it. Hold the big key, then tap [[Tab]], and pick **Notes**.',
            es: 'Pruébalo. Mantén la tecla grande, toca [[Tab]], y elige **Notas**.',
          },
          config: {
            combo: dev(['Alt', 'Tab'], ['Command', 'Tab']),
            letters: ['Tab', 'C', 'V'],
            then: 'switcher',
            target: 'notes',
            apps: [
              { id: 'photos', emoji: '🖼️', label: { en: 'Photos', es: 'Fotos' } },
              { id: 'notes', emoji: '📝', label: { en: 'Notes', es: 'Notas' } },
              { id: 'web', emoji: '🌐', label: { en: 'Internet', es: 'Internet' } },
            ],
          },
        },
        {
          type: 'recap',
          points: [
            {
              en: 'The window on top is the one that listens to you.',
              es: 'La ventana de arriba es la que te escucha.',
            },
            {
              en: 'Click any visible part of a window to bring it forward.',
              es: 'Haz clic en cualquier parte visible de una ventana para traerla al frente.',
            },
            {
              en: dev('Or hold Alt and tap Tab.', 'Or hold Command and tap Tab.'),
              es: dev('O mantén Alt y toca Tab.', 'O mantén Command y toca Tab.'),
            },
          ],
        },
      ],
    },
  ],
}
