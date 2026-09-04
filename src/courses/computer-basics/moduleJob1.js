import { dev } from '../../i18n/content.js'

/**
 * Job Skills 1 — File organization.
 *
 * First in the job-skills sequence on purpose: it prevents the most common
 * failure mode, where a learner successfully creates a document but then
 * cannot find it, send it, or tell which copy is current.
 */

export default {
  id: 'job1',
  icon: 'folders',
  color: 'sun',
  title: { en: 'Organising work files', es: 'Organizar archivos de trabajo' },
  subtitle: {
    en: 'Save it somewhere sensible, name it clearly, and find it again',
    es: 'Guárdalo en un lugar lógico, nómbralo claro, y vuélvelo a encontrar',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'job1-l1',
      icon: 'pin',
      minutes: 4,
      title: { en: 'Where did my file go?', es: '¿A dónde se fue mi archivo?' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Files live in one of two kinds of place', es: 'Los archivos viven en uno de dos tipos de lugar' },
          body: [
            {
              en: 'A file is either on **this computer** — its own hard drive — or in the **cloud**, meaning stored online where you can reach it from any device you sign in on.',
              es: 'Un archivo está o en **esta computadora** — su propio disco duro — o en la **nube**, o sea guardado en línea, donde lo puedes alcanzar desde cualquier dispositivo donde inicies sesión.',
            },
            {
              en: '__Cloud storage__ is what Google Drive, OneDrive, and Dropbox are. Nothing mystical: they are folders that happen to live online instead of on your desk.',
              es: 'La __nube__ es lo que son Google Drive, OneDrive y Dropbox. Nada místico: son carpetas que resultan estar en línea en vez de en tu escritorio.',
            },
            {
              en: 'At work this matters constantly, because a file saved only to your own computer is a file your coworkers cannot open.',
              es: 'En el trabajo esto importa todo el tiempo, porque un archivo guardado solo en tu computadora es un archivo que tus compañeros no pueden abrir.',
            },
          ],
          callout: {
            en: '**Downloads** and **Desktop** are landing places, not filing places. Things pass through them — they should not live there.',
            es: '**Descargas** y **Escritorio** son lugares de paso, no de archivo. Las cosas pasan por ahí — no deberían vivir ahí.',
          },
        },
        {
          type: 'sort',
          prompt: { en: 'On this computer, or in the cloud?', es: '¿En esta computadora, o en la nube?' },
          buckets: [
            { id: 'local', emoji: '💻', label: { en: 'On this computer', es: 'En esta computadora' } },
            { id: 'cloud', emoji: '☁️', label: { en: 'In the cloud', es: 'En la nube' } },
          ],
          items: [
            {
              id: 'a',
              emoji: '⬇️',
              bucket: 'local',
              label: { en: 'A file in your Downloads folder', es: 'Un archivo en tu carpeta Descargas' },
              why: {
                en: 'Downloads is a folder on the machine in front of you. Nobody else can see it.',
                es: 'Descargas es una carpeta en la máquina que tienes enfrente. Nadie más la puede ver.',
              },
            },
            {
              id: 'b',
              emoji: '📁',
              bucket: 'cloud',
              label: { en: 'A document in the shared team Google Drive', es: 'Un documento en el Google Drive compartido del equipo' },
              why: {
                en: 'Google Drive is cloud storage — that is exactly why the team can all reach it.',
                es: 'Google Drive es almacenamiento en la nube — justo por eso todo el equipo puede llegar a él.',
              },
            },
            {
              id: 'c',
              emoji: '🖥️',
              bucket: 'local',
              label: { en: 'A spreadsheet sitting on your desktop', es: 'Una hoja de cálculo en tu escritorio' },
              why: {
                en: 'Your desktop is part of your own computer. If your laptop breaks, that file goes with it.',
                es: 'Tu escritorio es parte de tu propia computadora. Si tu laptop se descompone, ese archivo se va con ella.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Files are either on this computer, or in the cloud.', es: 'Los archivos están o en esta computadora, o en la nube.' },
            { en: 'Cloud = Google Drive, OneDrive, Dropbox — folders that live online.', es: 'Nube = Google Drive, OneDrive, Dropbox — carpetas que viven en línea.' },
            { en: 'Downloads and Desktop are landing places, not homes.', es: 'Descargas y Escritorio son lugares de paso, no hogares.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job1-l2',
      icon: 'tag',
      minutes: 4,
      title: { en: 'Give files useful names', es: 'Ponles nombres útiles' },
      steps: [
        {
          type: 'teach',
          title: { en: 'A good name answers "which one is this?"', es: 'Un buen nombre responde «¿cuál es este?»' },
          body: [
            {
              en: 'A file name is not decoration — it is how you and everyone else find the thing again in six months, in a folder with two hundred other files.',
              es: 'El nombre de un archivo no es decoración — es como tú y todos los demás vuelven a encontrar la cosa en seis meses, en una carpeta con otros doscientos archivos.',
            },
            {
              en: 'A reliable pattern: **date, then topic, then version if you need one.** For example: **2026-09-01_Client-Meeting-Notes_v1**',
              es: 'Un patrón confiable: **fecha, luego tema, luego versión si hace falta.** Por ejemplo: **2026-09-01_Notas-Junta-Cliente_v1**',
            },
            {
              en: 'Writing the date **year-month-day** is a small trick with a big payoff: files sort themselves into the right order automatically.',
              es: 'Escribir la fecha **año-mes-día** es un truco pequeño con gran beneficio: los archivos se ordenan solos en el orden correcto.',
            },
          ],
          callout: {
            en: 'Avoid **final**, **final2**, **newfinal**, **FINAL-real**, and **stuff**. A file that is final today gets revised tomorrow.',
            es: 'Evita **final**, **final2**, **nuevofinal**, **FINAL-bueno**, y **cosas**. Un archivo que hoy es final mañana se revisa.',
          },
          calloutTone: 'berry',
          calloutIcon: 'warning',
        },
        {
          type: 'choice',
          prompt: {
            en: 'Which is the most useful file name for meeting notes from today?',
            es: '¿Cuál es el nombre más útil para las notas de una junta de hoy?',
          },
          options: [
            {
              id: 'a',
              emoji: '✅',
              label: { en: '2026-09-01_Team-Meeting-Notes', es: '2026-09-01_Notas-Junta-Equipo' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🤷',
              label: { en: 'notes', es: 'notas' },
              why: {
                en: 'Fine today, useless next month — you will have a dozen files called "notes" and no way to tell them apart.',
                es: 'Sirve hoy, inútil el mes que entra — vas a tener una docena de archivos llamados «notas» sin forma de distinguirlos.',
              },
            },
            {
              id: 'c',
              emoji: '😵',
              label: { en: 'meeting notes FINAL v2 real.docx', es: 'notas junta FINAL v2 buena.docx' },
              why: {
                en: 'This is the name that appears when nobody agreed on a system. Nobody can tell which is current.',
                es: 'Este es el nombre que aparece cuando nadie acordó un sistema. Nadie puede saber cuál es el actual.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Name files so future-you knows which one it is.', es: 'Nombra los archivos para que tu yo futuro sepa cuál es.' },
            { en: 'Date (year-month-day), topic, version only if needed.', es: 'Fecha (año-mes-día), tema, y versión solo si hace falta.' },
            { en: '"final" is never final. Avoid it.', es: '«final» nunca es final. Evítalo.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job1-l3',
      icon: 'folder',
      minutes: 4,
      title: { en: 'Put it in the right folder', es: 'Ponlo en la carpeta correcta' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Folders inside folders', es: 'Carpetas dentro de carpetas' },
          body: [
            {
              en: 'Workplaces organise files in a tree — broad at the top, specific as you go down. For example: **Work > Clients > Acme > 2026 > Reports**.',
              es: 'Los lugares de trabajo organizan archivos en un árbol — amplio arriba, específico conforme bajas. Por ejemplo: **Trabajo > Clientes > Acme > 2026 > Reportes**.',
            },
            {
              en: 'You usually do not invent this structure — you follow the one your workplace already uses. The skill is reading it and putting things where they belong.',
              es: 'Normalmente no inventas esta estructura — sigues la que tu trabajo ya usa. La habilidad es leerla y poner las cosas donde van.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'files',
          prompt: {
            en: 'Put the **Acme invoice** in the **Invoices** folder.',
            es: 'Pon la **Factura Acme** en la carpeta **Facturas**.',
          },
          footerHint: {
            en: 'Press and hold, slide it onto the right folder, let go',
            es: 'Mantén presionado, deslízalo a la carpeta correcta, suelta',
          },
          config: {
            goal: 'move',
            target: 'invoice',
            moveTo: 'invoices',
            items: [
              { id: 'invoice', kind: 'file', emoji: '📄', label: { en: 'Acme invoice', es: 'Factura Acme' } },
              { id: 'invoices', kind: 'folder', emoji: '📁', label: { en: 'Invoices', es: 'Facturas' } },
              { id: 'reports', kind: 'folder', emoji: '📁', label: { en: 'Reports', es: 'Reportes' } },
              { id: 'contracts', kind: 'folder', emoji: '📁', label: { en: 'Contracts', es: 'Contratos' } },
            ],
          },
        },
        {
          type: 'recap',
          points: [
            { en: 'Folders nest: broad at the top, specific further down.', es: 'Las carpetas se anidan: amplio arriba, específico abajo.' },
            { en: 'Follow the structure your workplace already uses.', es: 'Sigue la estructura que tu trabajo ya usa.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job1-l4',
      icon: 'save',
      minutes: 4,
      title: { en: 'Save before you close', es: 'Guarda antes de cerrar' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Save vs. Save As', es: 'Guardar vs. Guardar como' },
          body: [
            {
              en: '**Save** updates the file you already have. **Save As** makes a *new* file, and asks you where to put it and what to call it.',
              es: '**Guardar** actualiza el archivo que ya tienes. **Guardar como** crea un archivo *nuevo*, y te pregunta dónde ponerlo y cómo llamarlo.',
            },
            {
              en: 'The moment that matters most is the **Save As** window — because that is where you choose the folder. Read it before you click the button. That one screen is the difference between "in the shared team folder" and "lost on my desktop."',
              es: 'El momento que más importa es la ventana de **Guardar como** — porque ahí eliges la carpeta. Léela antes de hacer clic en el botón. Esa pantalla es la diferencia entre «en la carpeta compartida del equipo» y «perdido en mi escritorio».',
            },
            {
              en: dev(
                'In the Save As window, the folder shows along the top and in the sidebar on the left. At work, Documents or a shared folder is usually the right answer — not Downloads.',
                'In the Save As window, click the "Where" box to change the folder. At work, Documents or a shared folder is usually the right answer — not Downloads.'
              ),
              es: dev(
                'En la ventana Guardar como, la carpeta aparece arriba y en la barra lateral izquierda. En el trabajo, Documentos o una carpeta compartida suele ser lo correcto — no Descargas.',
                'En la ventana Guardar como, haz clic en la casilla «Dónde» para cambiar la carpeta. En el trabajo, Documentos o una carpeta compartida suele ser lo correcto — no Descargas.'
              ),
            },
          ],
          callout: {
            en: 'Google Docs and modern Office save automatically as you type — but the *location* was still chosen once, when the file was created.',
            es: 'Google Docs y el Office moderno guardan solos mientras escribes — pero el *lugar* se eligió una vez, cuando se creó el archivo.',
          },
        },
        {
          type: 'action',
          title: { en: 'On a real computer', es: 'En una computadora de verdad' },
          body: [
            {
              en: 'This is one you can only really learn by doing. On a computer, open any document app, type one sentence, and use **Save As**.',
              es: 'Esta solo se aprende de verdad haciéndola. En una computadora, abre cualquier app de documentos, escribe una oración, y usa **Guardar como**.',
            },
            {
              en: 'Before you click Save: **read what folder it says.** Change it to Documents if it says Downloads or Desktop. Then find the file afterwards to prove to yourself it went where you meant.',
              es: 'Antes de hacer clic en Guardar: **lee qué carpeta dice.** Cámbiala a Documentos si dice Descargas o Escritorio. Luego busca el archivo después para comprobarte que fue donde querías.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Save updates; Save As makes a new file somewhere you choose.', es: 'Guardar actualiza; Guardar como crea un archivo nuevo donde tú elijas.' },
            { en: 'Read the folder in the Save As window before clicking Save.', es: 'Lee la carpeta en la ventana Guardar como antes de hacer clic.' },
            { en: 'Then go find it, to be sure it landed where you meant.', es: 'Luego búscalo, para estar segura de que cayó donde querías.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job1-l5',
      icon: 'search',
      minutes: 4,
      title: { en: 'Find the latest version', es: 'Encuentra la versión más reciente' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Three ways to find a file', es: 'Tres formas de encontrar un archivo' },
          body: [
            {
              en: '**Search by name** — every file window has a search box, usually top-right. Type part of the name.',
              es: '**Busca por nombre** — toda ventana de archivos tiene una casilla de búsqueda, casi siempre arriba a la derecha. Escribe parte del nombre.',
            },
            {
              en: '**Sort by date modified** — click that column heading and the most recently changed file jumps to the top. This is the fastest way to answer "what was I just working on?"',
              es: '**Ordena por fecha de modificación** — haz clic en ese encabezado y el archivo cambiado más recientemente salta arriba. Es la forma más rápida de responder «¿en qué estaba trabajando?»',
            },
            {
              en: '**Check before you edit** — look at the name, the date, and the folder. Editing last month\'s copy and sending it out is a very common, very avoidable mistake.',
              es: '**Revisa antes de editar** — mira el nombre, la fecha, y la carpeta. Editar la copia del mes pasado y mandarla es un error muy común y muy evitable.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'You find two files: "Budget_v2" modified last March, and "Budget" modified yesterday. Which is probably current?',
            es: 'Encuentras dos archivos: «Presupuesto_v2» modificado en marzo, y «Presupuesto» modificado ayer. ¿Cuál es probablemente el actual?',
          },
          options: [
            {
              id: 'a',
              emoji: '📅',
              label: { en: '"Budget" — because it was modified yesterday', es: '«Presupuesto» — porque se modificó ayer' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🔢',
              label: { en: '"Budget_v2" — because v2 is a higher version number', es: '«Presupuesto_v2» — porque v2 es un número de versión mayor' },
              why: {
                en: 'A version number in the name is just text someone typed once. The date modified is what the computer actually recorded — trust that.',
                es: 'Un número de versión en el nombre es solo texto que alguien escribió una vez. La fecha de modificación es lo que la computadora realmente registró — confía en eso.',
              },
            },
          ],
        },
        {
          type: 'action',
          title: { en: 'Try it on a computer', es: 'Pruébalo en una computadora' },
          body: [
            {
              en: 'Open your Documents folder on a real computer. Sort it by **Date modified** by clicking that column heading, and see what you worked on most recently.',
              es: 'Abre tu carpeta Documentos en una computadora de verdad. Ordénala por **Fecha de modificación** haciendo clic en ese encabezado, y mira en qué trabajaste más recientemente.',
            },
            {
              en: 'Then use the search box to find one file by typing part of its name.',
              es: 'Luego usa la casilla de búsqueda para encontrar un archivo escribiendo parte de su nombre.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Search by name, or sort by date modified.', es: 'Busca por nombre, u ordena por fecha de modificación.' },
            { en: 'Date modified beats a version number in the file name.', es: 'La fecha de modificación gana sobre un número de versión en el nombre.' },
            { en: 'Check name, date, and folder before you edit or send.', es: 'Revisa nombre, fecha y carpeta antes de editar o enviar.' },
          ],
        },
      ],
    },
  ],
}
