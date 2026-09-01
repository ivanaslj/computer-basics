import { dev } from '../../i18n/content.js'

/**
 * Module 3 — Files and folders.
 *
 * The mental model people are missing is that a computer is a filing cabinet,
 * not a magic box: things they save exist somewhere specific, and they can go
 * and get them. Every lesson here is about that "somewhere".
 */

const DOCS = [
  { id: 'letter', kind: 'file', emoji: '📄', label: { en: 'Letter to Ana', es: 'Carta para Ana' } },
  { id: 'photo1', kind: 'file', emoji: '🖼️', label: { en: 'Beach.jpg', es: 'Playa.jpg' } },
  { id: 'recipes', kind: 'folder', emoji: '📁', label: { en: 'Recipes', es: 'Recetas' } },
  { id: 'taxes', kind: 'folder', emoji: '📁', label: { en: 'Taxes', es: 'Impuestos' } },
  { id: 'flan', kind: 'file', emoji: '📄', label: { en: 'Flan recipe', es: 'Receta de flan' } },
]

const FILE_MENU = [
  { id: 'open', label: { en: 'Open', es: 'Abrir' } },
  { id: 'rename', label: { en: 'Rename', es: 'Cambiar nombre' } },
  { id: 'copy', label: { en: 'Copy', es: 'Copiar' } },
  { id: 'div', divider: true },
  { id: 'delete', label: { en: 'Delete', es: 'Eliminar' } },
]

const EMPTY_MENU = [
  { id: 'newfolder', label: { en: 'New folder', es: 'Nueva carpeta' } },
  { id: 'paste', label: { en: 'Paste', es: 'Pegar' }, muted: true },
  { id: 'div', divider: true },
  { id: 'sort', label: { en: 'Sort by name', es: 'Ordenar por nombre' } },
]

export default {
  id: 'm3',
  number: 3,
  emoji: '📁',
  color: 'sun',
  title: { en: 'Files and folders', es: 'Archivos y carpetas' },
  subtitle: {
    en: 'Where your things live, and how to find them again',
    es: 'Dónde viven tus cosas, y cómo volver a encontrarlas',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm3-l1',
      emoji: '📄',
      minutes: 4,
      title: { en: 'What a file is', es: 'Qué es un archivo' },
      steps: [
        {
          type: 'teach',
          title: { en: 'A file is one thing you saved', es: 'Un archivo es una cosa que guardaste' },
          visual: { art: 'file-vs-folder' },
          body: [
            {
              en: 'A __file__ is a single item stored on the computer. One photo is a file. One letter is a file. One song is a file.',
              es: 'Un __archivo__ es una sola cosa guardada en la computadora. Una foto es un archivo. Una carta es un archivo. Una canción es un archivo.',
            },
            {
              en: 'Every file has a **name**, so you can tell it apart from the others, and a small picture that hints at what kind it is.',
              es: 'Todo archivo tiene un **nombre**, para distinguirlo de los demás, y un dibujito que sugiere de qué tipo es.',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'The bit after the dot', es: 'Lo que va después del punto' },
          body: [
            {
              en: 'You will often see names like **Beach.jpg** or **Letter.pdf**. The few letters after the dot say what kind of file it is.',
              es: 'Verás nombres como **Playa.jpg** o **Carta.pdf**. Las pocas letras después del punto dicen de qué tipo es el archivo.',
            },
            {
              en: '**.jpg** and **.png** are pictures. **.pdf** and **.docx** are documents. **.mp3** is music. You do not need to memorise these — the little picture usually tells you.',
              es: '**.jpg** y **.png** son imágenes. **.pdf** y **.docx** son documentos. **.mp3** es música. No necesitas memorizarlas — el dibujito casi siempre te dice.',
            },
          ],
          callout: {
            en: 'Do not change the part after the dot when renaming something. Change the name in front of it.',
            es: 'No cambies la parte después del punto cuando le cambies el nombre a algo. Cambia el nombre de adelante.',
          },
          calloutEmoji: '⚠️',
          calloutTone: 'berry',
        },
        {
          type: 'sort',
          prompt: { en: 'Is each of these a file, or not?', es: '¿Cada uno de estos es un archivo, o no?' },
          buckets: [
            { id: 'file', emoji: '📄', label: { en: 'A file', es: 'Un archivo' } },
            { id: 'not', emoji: '🚫', label: { en: 'Not a file', es: 'No es un archivo' } },
          ],
          items: [
            {
              id: 'a',
              emoji: '🖼️',
              bucket: 'file',
              label: { en: 'A photo of your grandson', es: 'Una foto de tu nieto' },
              why: {
                en: 'A photo is one saved thing, so it is a file.',
                es: 'Una foto es una cosa guardada, así que es un archivo.',
              },
            },
            {
              id: 'b',
              emoji: '🌐',
              bucket: 'not',
              label: { en: 'The internet', es: 'El internet' },
              why: {
                en: 'The internet is not stored on your computer. It is out there, and you visit it.',
                es: 'El internet no está guardado en tu computadora. Está allá afuera, y tú lo visitas.',
              },
            },
            {
              id: 'c',
              emoji: '🎵',
              bucket: 'file',
              label: { en: 'A song you downloaded', es: 'Una canción que descargaste' },
              why: {
                en: 'You downloaded it, which means it was saved. It is a file.',
                es: 'La descargaste, o sea que se guardó. Es un archivo.',
              },
            },
            {
              id: 'd',
              emoji: '🖨️',
              bucket: 'not',
              label: { en: 'Your printer', es: 'Tu impresora' },
              why: {
                en: 'A printer is a machine, not something saved on the computer.',
                es: 'Una impresora es una máquina, no algo guardado en la computadora.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'A file is one thing you saved.', es: 'Un archivo es una cosa que guardaste.' },
            { en: 'Every file has a name.', es: 'Todo archivo tiene un nombre.' },
            {
              en: 'The letters after the dot say what kind it is. Leave them alone.',
              es: 'Las letras después del punto dicen de qué tipo es. Déjalas en paz.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm3-l2',
      emoji: '🗄️',
      minutes: 4,
      title: { en: 'Folders hold your files', es: 'Las carpetas guardan tus archivos' },
      steps: [
        {
          type: 'teach',
          title: { en: 'A box for your papers', es: 'Una caja para tus papeles' },
          body: [
            {
              en: 'A __folder__ holds files. It is exactly like a paper folder in a filing cabinet — its only job is to keep related things together.',
              es: 'Una __carpeta__ guarda archivos. Es igual que una carpeta de papel en un archivero — su único trabajo es mantener juntas las cosas relacionadas.',
            },
            {
              en: 'Folders can hold other folders too. That is how a computer stays organised instead of being one enormous pile.',
              es: 'Las carpetas también pueden guardar otras carpetas. Así se mantiene ordenada la computadora en vez de ser un montón enorme.',
            },
          ],
        },
        {
          type: 'teach',
          title: {
            en: dev('The window that shows your files', 'The window that shows your files'),
            es: dev('La ventana que muestra tus archivos', 'La ventana que muestra tus archivos'),
          },
          visual: { sim: 'files', config: { items: DOCS, place: 'documents' } },
          body: [
            {
              en: dev(
                'The app that shows your files is called __File Explorer__. Its icon looks like a yellow folder.',
                'The app that shows your files is called __Finder__. Its icon is a blue smiling face.'
              ),
              es: dev(
                'La aplicación que muestra tus archivos se llama __Explorador de archivos__. Su icono parece una carpeta amarilla.',
                'La aplicación que muestra tus archivos se llama __Finder__. Su icono es una carita azul.'
              ),
            },
            {
              en: 'Down the left side is a list of the main places on your computer: Desktop, Documents, Downloads, Pictures. Click one, and its contents fill the big area on the right.',
              es: 'Del lado izquierdo hay una lista de los lugares principales de tu computadora: Escritorio, Documentos, Descargas, Imágenes. Haz clic en uno, y su contenido llena el área grande de la derecha.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'files',
          prompt: {
            en: '**Open** the folder called Recipes — two quick taps.',
            es: '**Abre** la carpeta que dice Recetas — dos toques rápidos.',
          },
          config: {
            goal: 'open',
            target: 'recipes',
            items: DOCS,
            insideFolder: [
              { id: 'f1', kind: 'file', emoji: '📄', label: { en: 'Flan', es: 'Flan' } },
              { id: 'f2', kind: 'file', emoji: '📄', label: { en: 'Rice pudding', es: 'Arroz con leche' } },
            ],
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'What is the difference between a file and a folder?',
            es: '¿Cuál es la diferencia entre un archivo y una carpeta?',
          },
          options: [
            {
              id: 'a',
              emoji: '📁',
              label: {
                en: 'A file is one thing; a folder holds many things',
                es: 'Un archivo es una cosa; una carpeta guarda muchas cosas',
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🤷',
              label: { en: 'They are two words for the same thing', es: 'Son dos palabras para lo mismo' },
              why: {
                en: 'Not quite. Think of a paper folder: the folder is the cover, the papers inside are the files.',
                es: 'No exactamente. Piensa en una carpeta de papel: la carpeta es la cubierta, los papeles de adentro son los archivos.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'A folder holds files, and other folders.', es: 'Una carpeta guarda archivos, y otras carpetas.' },
            {
              en: dev(
                'File Explorer is where you look at them.',
                'Finder is where you look at them.'
              ),
              es: dev(
                'El Explorador de archivos es donde los ves.',
                'El Finder es donde los ves.'
              ),
            },
            {
              en: 'The list on the left holds the main places: Desktop, Documents, Downloads, Pictures.',
              es: 'La lista de la izquierda tiene los lugares principales: Escritorio, Documentos, Descargas, Imágenes.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm3-l3',
      emoji: '➕',
      minutes: 4,
      title: { en: 'Making a new folder', es: 'Crear una carpeta nueva' },
      steps: [
        {
          type: 'teach',
          title: { en: 'You decide how to organise', es: 'Tú decides cómo organizar' },
          body: [
            {
              en: 'You can make as many folders as you like, named whatever makes sense to you. "Photos of the grandkids". "Bills 2026". "Church".',
              es: 'Puedes hacer todas las carpetas que quieras, con el nombre que a ti te haga sentido. «Fotos de los nietos». «Recibos 2026». «Iglesia».',
            },
            {
              en: 'To make one: **right-click on an empty part** of the window, then choose **New folder**. Then type a name.',
              es: 'Para hacer una: **haz clic derecho en una parte vacía** de la ventana, y elige **Nueva carpeta**. Luego escribe un nombre.',
            },
          ],
          callout: {
            en: 'Right-clicking on empty space asks "what can I do *here*?" — which is why New folder appears there and not on a file.',
            es: 'El clic derecho en espacio vacío pregunta «¿qué puedo hacer *aquí*?» — por eso Nueva carpeta aparece ahí y no sobre un archivo.',
          },
        },
        {
          type: 'sim',
          sim: 'files',
          prompt: {
            en: 'Make a new folder and name it **Church**. Press and hold on an empty part of the window to start.',
            es: 'Crea una carpeta nueva y llámala **Iglesia**. Mantén presionado en una parte vacía de la ventana para empezar.',
          },
          footerHint: {
            en: 'Press and hold on empty space → New folder → type the name',
            es: 'Mantén presionado en un espacio vacío → Nueva carpeta → escribe el nombre',
          },
          config: {
            goal: 'newfolder',
            items: DOCS.slice(0, 3),
            menu: EMPTY_MENU,
            menuTarget: 'newfolder',
            newName: { en: 'Church', es: 'Iglesia' },
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'Where should you right-click to make a new folder?',
            es: '¿Dónde debes hacer clic derecho para crear una carpeta nueva?',
          },
          options: [
            {
              id: 'a',
              emoji: '⬜',
              label: {
                en: 'On an empty part of the window',
                es: 'En una parte vacía de la ventana',
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '📄',
              label: { en: 'On one of the files', es: 'Sobre uno de los archivos' },
              why: {
                en: 'Right-clicking a file offers things to do *to that file*. For a new folder, click empty space.',
                es: 'El clic derecho en un archivo ofrece cosas para hacerle *a ese archivo*. Para una carpeta nueva, haz clic en espacio vacío.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            {
              en: 'Right-click empty space → New folder.',
              es: 'Clic derecho en espacio vacío → Nueva carpeta.',
            },
            {
              en: 'Name it something that will still make sense to you next year.',
              es: 'Ponle un nombre que te siga haciendo sentido el próximo año.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm3-l4',
      emoji: '✋',
      minutes: 4,
      title: { en: 'Moving a file', es: 'Mover un archivo' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Pick it up and put it down', es: 'Levántalo y suéltalo' },
          body: [
            {
              en: 'To move a file into a folder, you __drag__ it: press the mouse button down on the file, keep it held, slide onto the folder, and let go.',
              es: 'Para mover un archivo a una carpeta, lo __arrastras__: presiona el botón del ratón sobre el archivo, mantenlo presionado, deslízalo sobre la carpeta, y suelta.',
            },
            {
              en: 'The important part is **keeping the button held** the whole way. If you let go early, the file just drops back where it was — no harm done.',
              es: 'Lo importante es **mantener el botón presionado** todo el camino. Si sueltas antes de tiempo, el archivo regresa a su lugar — no pasa nada.',
            },
          ],
          callout: {
            en: 'You already know this gesture: it is exactly how you rearrange the icons on your phone.',
            es: 'Ya conoces este gesto: es justo como acomodas los iconos en tu teléfono.',
          },
          calloutEmoji: '📱',
        },
        {
          type: 'sim',
          sim: 'files',
          prompt: {
            en: 'Drag **Flan recipe** onto the **Recipes** folder. Hold your finger down the whole way.',
            es: 'Arrastra **Receta de flan** hasta la carpeta **Recetas**. Mantén el dedo presionado todo el camino.',
          },
          footerHint: {
            en: 'Press and hold the file, slide it onto the folder, then let go',
            es: 'Mantén presionado el archivo, deslízalo a la carpeta, y suelta',
          },
          config: {
            goal: 'move',
            target: 'flan',
            moveTo: 'recipes',
            items: DOCS,
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'You let go of a file half-way, over nothing in particular. What happened to it?',
            es: 'Soltaste un archivo a medio camino, sobre nada en particular. ¿Qué le pasó?',
          },
          options: [
            {
              id: 'a',
              emoji: '↩️',
              label: { en: 'Nothing. It stayed where it was.', es: 'Nada. Se quedó donde estaba.' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🗑️',
              label: { en: 'It was deleted', es: 'Se borró' },
              why: {
                en: 'Files are not deleted by dropping them. Deleting takes a deliberate Delete.',
                es: 'Los archivos no se borran al soltarlos. Borrar requiere elegir Eliminar a propósito.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            {
              en: 'Drag = press and hold, slide, let go.',
              es: 'Arrastrar = presiona y mantén, desliza, suelta.',
            },
            {
              en: 'Let go over the folder you want it in.',
              es: 'Suelta encima de la carpeta donde lo quieres.',
            },
            {
              en: 'Drop it in the wrong place and nothing breaks — just drag it again.',
              es: 'Si lo sueltas en el lugar equivocado no se rompe nada — solo arrástralo otra vez.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm3-l5',
      emoji: '✏️',
      minutes: 3,
      title: { en: 'Renaming things', es: 'Cambiar el nombre' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Names you chose beat names the computer chose', es: 'Los nombres que tú eliges ganan' },
          body: [
            {
              en: 'Computers give files unhelpful names like **IMG_4471**. You can change any of them to something you will recognise.',
              es: 'Las computadoras ponen nombres inútiles como **IMG_4471**. Puedes cambiar cualquiera por algo que sí reconozcas.',
            },
            {
              en: 'Right-click the file, choose **Rename**, type the new name, and press [[Enter]].',
              es: 'Haz clic derecho en el archivo, elige **Cambiar nombre**, escribe el nombre nuevo, y presiona [[Enter]].',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'files',
          prompt: {
            en: 'Rename **Letter to Ana** so it says **Birthday card**.',
            es: 'Cambia el nombre de **Carta para Ana** a **Tarjeta de cumpleaños**.',
          },
          footerHint: {
            en: 'Press and hold the file → Rename → type the new name',
            es: 'Mantén presionado el archivo → Cambiar nombre → escribe el nombre nuevo',
          },
          config: {
            goal: 'rename',
            target: 'letter',
            items: DOCS,
            menu: FILE_MENU,
            menuTarget: 'rename',
            newName: { en: 'Birthday card', es: 'Tarjeta de cumpleaños' },
          },
        },
        {
          type: 'recap',
          points: [
            {
              en: 'Right-click → Rename → type → Enter.',
              es: 'Clic derecho → Cambiar nombre → escribe → Enter.',
            },
            {
              en: 'Renaming a file does not change what is inside it.',
              es: 'Cambiar el nombre no cambia lo que hay adentro.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm3-l6',
      emoji: '⬇️',
      minutes: 3,
      title: { en: 'Where downloads go', es: 'A dónde van las descargas' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Downloaded things do not vanish', es: 'Lo que descargas no desaparece' },
          body: [
            {
              en: 'When you save something from the internet — a photo, a form, a receipt — the computer puts it in a folder called __Downloads__. Every time. Without asking.',
              es: 'Cuando guardas algo del internet — una foto, un formulario, un recibo — la computadora lo pone en una carpeta llamada __Descargas__. Siempre. Sin preguntar.',
            },
            {
              en: 'This is the single most useful thing to know about files. "Where did it go?" is almost always answered by: **Downloads**.',
              es: 'Esto es lo más útil que puedes saber sobre archivos. «¿A dónde se fue?» casi siempre se responde con: **Descargas**.',
            },
          ],
          callout: {
            en: 'Downloads gets messy fast. Every few weeks, move what you want to keep into a proper folder.',
            es: 'Descargas se llena rápido. Cada pocas semanas, mueve lo que quieras conservar a una carpeta de verdad.',
          },
        },
        {
          type: 'sim',
          sim: 'files',
          prompt: {
            en: 'You just saved a receipt from a website. Go to the place it will be.',
            es: 'Acabas de guardar un recibo de un sitio web. Ve al lugar donde va a estar.',
          },
          config: {
            goal: 'navigate',
            target: 'downloads',
            place: 'documents',
            items: DOCS.slice(0, 4),
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'A friend emails you a photo. You click Save. Where is it now?',
            es: 'Una amiga te manda una foto por correo. Haces clic en Guardar. ¿Dónde está ahora?',
          },
          options: [
            {
              id: 'a',
              emoji: '⬇️',
              label: { en: 'In the Downloads folder', es: 'En la carpeta Descargas' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '📧',
              label: { en: 'Still only in the email', es: 'Todavía solo en el correo' },
              why: {
                en: 'It is in both places now. Saving made a copy on your computer, in Downloads.',
                es: 'Ahora está en los dos lugares. Guardar hizo una copia en tu computadora, en Descargas.',
              },
            },
            {
              id: 'c',
              emoji: '❓',
              label: { en: 'Somewhere impossible to find', es: 'En algún lugar imposible de encontrar' },
              why: {
                en: 'It feels that way, but no — it went to Downloads, like everything else you save.',
                es: 'Así se siente, pero no — se fue a Descargas, como todo lo que guardas.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            {
              en: 'Anything you save from the internet goes to Downloads.',
              es: 'Todo lo que guardas del internet va a Descargas.',
            },
            {
              en: 'Downloads is in the list on the left of the file window.',
              es: 'Descargas está en la lista izquierda de la ventana de archivos.',
            },
            {
              en: 'Move things you want to keep somewhere better.',
              es: 'Mueve a un mejor lugar lo que quieras conservar.',
            },
          ],
        },
      ],
    },
  ],
}
