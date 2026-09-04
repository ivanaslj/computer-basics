/**
 * Job Skills 4 — Word and Google Docs.
 *
 * Teaches the transferable actions (write, format, revise, share, export)
 * rather than one product's menus, because which tool a workplace uses is
 * not the learner's choice and the skills carry across both.
 */

export default {
  id: 'job4',
  icon: 'file-text',
  color: 'brand',
  title: { en: 'Word and Google Docs', es: 'Word y Google Docs' },
  subtitle: {
    en: 'Write a clean document, revise it, and share it properly',
    es: 'Escribe un documento limpio, revísalo, y compártelo bien',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'job4-l1',
      icon: 'question',
      minutes: 3,
      title: { en: 'Word or Google Docs?', es: '¿Word o Google Docs?' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Same job, two products', es: 'El mismo trabajo, dos productos' },
          body: [
            {
              en: 'Both write documents. **Microsoft Word** is part of Office and usually stores files in OneDrive or SharePoint. **Google Docs** runs in a browser and stores files in Google Drive.',
              es: 'Los dos escriben documentos. **Microsoft Word** es parte de Office y suele guardar archivos en OneDrive o SharePoint. **Google Docs** funciona en el navegador y guarda en Google Drive.',
            },
            {
              en: 'Which you use is decided by your workplace. The good news: writing, formatting, revising, and sharing work the same way in both, so learning one teaches you most of the other.',
              es: 'Cuál usas lo decide tu trabajo. La buena noticia: escribir, formatear, revisar y compartir funcionan igual en los dos, así que aprender uno te enseña casi todo el otro.',
            },
          ],
          callout: {
            en: 'Do not convert a document between formats unless someone asks. Layout can shift, and a "fixed" document that arrives looking broken is worse than one that arrives as-is.',
            es: 'No conviertas un documento entre formatos a menos que te lo pidan. El diseño se puede mover, y un documento «arreglado» que llega descuadrado es peor que uno que llega tal cual.',
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'Your new employer uses Google Workspace and stores everything in Drive. What should you write your first report in?',
            es: 'Tu nuevo trabajo usa Google Workspace y guarda todo en Drive. ¿En qué escribes tu primer reporte?',
          },
          options: [
            {
              id: 'a',
              emoji: '📗',
              label: { en: 'Google Docs — it fits the system they already use', es: 'Google Docs — encaja con el sistema que ya usan' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '📘',
              label: { en: 'Whichever one you personally prefer', es: 'El que tú prefieras personalmente' },
              why: {
                en: 'Your preference matters less than fitting into how the team already shares and stores files. Match the workplace.',
                es: 'Tu preferencia importa menos que encajar con cómo el equipo ya comparte y guarda archivos. Ve con lo del trabajo.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Word and Google Docs do the same job.', es: 'Word y Google Docs hacen el mismo trabajo.' },
            { en: 'Use whichever your workplace already uses.', es: 'Usa el que tu trabajo ya use.' },
            { en: 'The skills carry across both.', es: 'Las habilidades sirven para los dos.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job4-l2',
      icon: 'file',
      minutes: 4,
      title: { en: 'Start a simple document', es: 'Empieza un documento simple' },
      steps: [
        {
          type: 'teach',
          title: { en: 'A title and short paragraphs', es: 'Un título y párrafos cortos' },
          body: [
            {
              en: 'Every workplace document starts the same way: a **title at the top** that says what this is, then short paragraphs underneath.',
              es: 'Todo documento de trabajo empieza igual: un **título arriba** que dice qué es esto, y luego párrafos cortos debajo.',
            },
            {
              en: 'Short paragraphs are not a style preference — a wall of text is genuinely harder for a busy person to read, and work documents get skimmed, not studied.',
              es: 'Los párrafos cortos no son cuestión de estilo — un muro de texto es de verdad más difícil de leer para alguien ocupado, y los documentos de trabajo se ojean, no se estudian.',
            },
            {
              en: 'Press **Enter** once to start a new paragraph. That is the whole mechanic.',
              es: 'Presiona **Enter** una vez para empezar un párrafo nuevo. Ese es todo el mecanismo.',
            },
          ],
        },
        {
          type: 'action',
          title: { en: 'Write something short', es: 'Escribe algo corto' },
          body: [
            {
              en: 'On a computer, open Word or Google Docs and start a blank document.',
              es: 'En una computadora, abre Word o Google Docs y empieza un documento en blanco.',
            },
            {
              en: 'Write a title on the first line, then two short paragraphs about anything at all. Then save it with a sensible name, in a folder you will be able to find — using what you learned in the file organisation module.',
              es: 'Escribe un título en la primera línea, y luego dos párrafos cortos sobre lo que sea. Después guárdalo con un nombre sensato, en una carpeta que puedas encontrar — usando lo que aprendiste en el módulo de organización de archivos.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Title at the top, short paragraphs underneath.', es: 'Título arriba, párrafos cortos debajo.' },
            { en: 'Enter starts a new paragraph.', es: 'Enter empieza un párrafo nuevo.' },
            { en: 'Save it somewhere you can find again.', es: 'Guárdalo donde lo puedas volver a encontrar.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job4-l3',
      icon: 'sparkle',
      minutes: 4,
      title: { en: 'Make it easy to read', es: 'Hazlo fácil de leer' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Formatting is for the reader', es: 'El formato es para quien lee' },
          body: [
            {
              en: 'Formatting is not decoration. Its job is to let a busy coworker find what they need without reading every word.',
              es: 'El formato no es decoración. Su trabajo es dejar que un compañero ocupado encuentre lo que necesita sin leer cada palabra.',
            },
            {
              en: '**Headings** break a document into findable sections. **Bullet points** turn a list buried in a sentence into something scannable. **One readable font**, used consistently, keeps it looking professional.',
              es: 'Los **encabezados** dividen el documento en secciones localizables. Las **viñetas** convierten una lista enterrada en una oración en algo que se puede ojear. **Una sola fuente legible**, usada consistentemente, lo mantiene profesional.',
            },
            {
              en: 'Use the built-in **Heading** styles rather than just making text big and bold by hand. They keep every heading consistent automatically, and let the document build a table of contents later if it needs one.',
              es: 'Usa los estilos de **Encabezado** que ya vienen, en vez de solo poner el texto grande y negrita a mano. Mantienen todos los encabezados consistentes solos, y permiten armar un índice después si hace falta.',
            },
          ],
          callout: {
            en: 'Do not press Enter ten times to push something onto the next page. It falls apart the moment anything above it changes — there is a proper page break for that.',
            es: 'No presiones Enter diez veces para empujar algo a la siguiente página. Se desbarata en cuanto cambia algo arriba — existe un salto de página para eso.',
          },
          calloutTone: 'berry',
          calloutIcon: 'warning',
        },
        {
          type: 'choice',
          prompt: {
            en: 'You have a document listing six things a new employee must bring on day one. What is the best format?',
            es: 'Tienes un documento con seis cosas que un empleado nuevo debe traer el primer día. ¿Cuál es el mejor formato?',
          },
          options: [
            {
              id: 'a',
              emoji: '📋',
              label: { en: 'A bulleted list, under a heading', es: 'Una lista con viñetas, bajo un encabezado' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '📃',
              label: { en: 'One paragraph listing them separated by commas', es: 'Un párrafo listándolas separadas por comas' },
              why: {
                en: 'Six things in a run-on sentence is easy to lose your place in. A list is scannable, and someone can check items off.',
                es: 'Seis cosas en una oración corrida es fácil perder el lugar. Una lista se ojea, y alguien puede ir palomeando.',
              },
            },
          ],
        },
        {
          type: 'action',
          title: { en: 'Format the document you made', es: 'Dale formato al documento que hiciste' },
          body: [
            {
              en: 'Open the document from the last lesson. Turn your title into a real **Heading 1** using the styles menu, add a second heading partway down, and turn at least three lines into a bulleted list.',
              es: 'Abre el documento de la lección pasada. Convierte tu título en un **Título 1** de verdad usando el menú de estilos, agrega un segundo encabezado a media página, y convierte al menos tres líneas en una lista con viñetas.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Headings and bullets make a document scannable.', es: 'Los encabezados y viñetas hacen el documento ojeable.' },
            { en: 'Use the built-in heading styles, not manual big-and-bold.', es: 'Usa los estilos de encabezado, no grande-y-negrita a mano.' },
            { en: 'One font, used consistently.', es: 'Una fuente, usada consistentemente.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job4-l4',
      icon: 'undo',
      minutes: 4,
      title: { en: 'Fix mistakes safely', es: 'Corrige sin miedo' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Select, then act', es: 'Selecciona, luego actúa' },
          body: [
            {
              en: 'Almost every edit follows the same two steps: **select the text first**, then do something to it. Drag across words to select them, or double-click a word to select just that one.',
              es: 'Casi toda edición sigue los mismos dos pasos: **selecciona el texto primero**, y luego hazle algo. Arrastra sobre las palabras para seleccionarlas, o haz doble clic en una palabra para seleccionar solo esa.',
            },
            {
              en: 'Once selected: **cut** removes it and holds it, **copy** holds it without removing, and **paste** puts it wherever your cursor is. You practised these shortcuts in the keyboard module.',
              es: 'Ya seleccionado: **cortar** lo quita y lo retiene, **copiar** lo retiene sin quitarlo, y **pegar** lo pone donde esté tu cursor. Practicaste estos atajos en el módulo del teclado.',
            },
            {
              en: 'And **undo** takes back whatever you just did. It is the reason you can experiment freely in a document — nothing you do is permanent until you decide it is.',
              es: 'Y **deshacer** revierte lo que acabas de hacer. Es la razón por la que puedes experimentar libremente en un documento — nada de lo que hagas es permanente hasta que tú decidas.',
            },
          ],
          callout: {
            en: 'A red squiggly underline is a **suggestion**, not a verdict. Names, place names, and workplace jargon get flagged constantly and are usually spelled fine.',
            es: 'Un subrayado rojo ondulado es una **sugerencia**, no un veredicto. Nombres, lugares y jerga del trabajo se marcan todo el tiempo y casi siempre están bien escritos.',
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'You deleted a paragraph and immediately realised you needed it. What is fastest?',
            es: 'Borraste un párrafo y de inmediato te diste cuenta de que lo necesitabas. ¿Qué es más rápido?',
          },
          options: [
            {
              id: 'a',
              emoji: '↩️',
              label: { en: 'Undo — it comes back exactly as it was', es: 'Deshacer — regresa tal como estaba' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '⌨️',
              label: { en: 'Retype it from memory', es: 'Reescribirlo de memoria' },
              why: {
                en: 'Undo restores it perfectly and instantly. Retyping risks getting it wrong and takes far longer.',
                es: 'Deshacer lo restaura perfecto y al instante. Reescribirlo arriesga equivocarte y tarda muchísimo más.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Select text first, then act on it.', es: 'Selecciona el texto primero, luego actúa sobre él.' },
            { en: 'Cut, copy, paste, undo — the everyday four.', es: 'Cortar, copiar, pegar, deshacer — los cuatro de siempre.' },
            { en: 'Spell check suggests; it is not always right.', es: 'El corrector sugiere; no siempre tiene razón.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job4-l5',
      icon: 'calendar',
      minutes: 4,
      title: { en: 'Make a simple table', es: 'Haz una tabla simple' },
      steps: [
        {
          type: 'teach',
          title: { en: 'For anything with rows and columns', es: 'Para cualquier cosa con filas y columnas' },
          body: [
            {
              en: 'A **table** is the right tool whenever information has a repeating shape: a schedule, a contact list, a set of tasks with owners and dates.',
              es: 'Una **tabla** es la herramienta correcta cuando la información tiene una forma repetida: un horario, una lista de contactos, un conjunto de tareas con responsables y fechas.',
            },
            {
              en: 'Insert one from the **Insert** menu, choose how many rows and columns, then click a cell and type. **Tab** jumps to the next cell — much faster than clicking each one.',
              es: 'Insértala desde el menú **Insertar**, elige cuántas filas y columnas, luego haz clic en una celda y escribe. **Tab** salta a la siguiente celda — mucho más rápido que hacer clic en cada una.',
            },
            {
              en: 'Make the top row your headings, so a reader knows what each column means.',
              es: 'Haz que la fila de arriba sean tus encabezados, para que quien lea sepa qué significa cada columna.',
            },
          ],
        },
        {
          type: 'action',
          title: { en: 'Add one to your document', es: 'Agrega una a tu documento' },
          body: [
            {
              en: 'In your practice document, insert a small table — 3 columns by 4 rows is plenty. Use the first row for headings like Task, Who, and When, and fill in a few rows.',
              es: 'En tu documento de práctica, inserta una tabla pequeña — 3 columnas por 4 filas es suficiente. Usa la primera fila para encabezados como Tarea, Quién, y Cuándo, y llena algunas filas.',
            },
            {
              en: 'Use **Tab** to move between cells rather than clicking each one.',
              es: 'Usa **Tab** para moverte entre celdas en vez de hacer clic en cada una.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Tables suit anything with a repeating row shape.', es: 'Las tablas sirven para cualquier cosa con filas repetidas.' },
            { en: 'Insert menu → choose rows and columns.', es: 'Menú Insertar → elige filas y columnas.' },
            { en: 'Tab jumps to the next cell. Top row = headings.', es: 'Tab salta a la siguiente celda. Fila de arriba = encabezados.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job4-l6',
      icon: 'chat',
      minutes: 4,
      title: { en: 'Share and get feedback', es: 'Comparte y recibe comentarios' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Comments, not rewrites', es: 'Comentarios, no reescrituras' },
          body: [
            {
              en: 'When someone reviews your document, the good way is a **comment** — a note attached to specific text, in the margin, which you can reply to and then mark resolved.',
              es: 'Cuando alguien revisa tu documento, la buena forma es un **comentario** — una nota pegada a un texto específico, en el margen, que puedes responder y luego marcar como resuelto.',
            },
            {
              en: 'Select the text, then choose **Add comment**. Both Word and Google Docs work this way.',
              es: 'Selecciona el texto, y elige **Agregar comentario**. Word y Google Docs funcionan igual.',
            },
            {
              en: 'This is far better than a reviewer silently editing your text, or emailing you a separate copy with their changes — which is how a team ends up with three versions and no clear original.',
              es: 'Esto es mucho mejor que un revisor editando tu texto en silencio, o mandándote por correo una copia aparte con sus cambios — así es como un equipo acaba con tres versiones y ningún original claro.',
            },
          ],
          callout: {
            en: 'Give reviewers **commenter** access, not editor, unless they are genuinely co-writing. That was the permission lesson in the sharing module.',
            es: 'Dale a quienes revisan acceso de **comentarista**, no de editor, a menos que de verdad estén coescribiendo. Esa fue la lección de permisos del módulo de compartir.',
          },
          calloutTone: 'grass',
        },
        {
          type: 'choice',
          prompt: {
            en: 'Your manager wants to suggest wording changes to your draft. What should you do?',
            es: 'Tu jefa quiere sugerir cambios de redacción a tu borrador. ¿Qué haces?',
          },
          options: [
            {
              id: 'a',
              emoji: '💬',
              label: { en: 'Share the live document with commenter access', es: 'Compartir el documento vivo con acceso de comentarista' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '📧',
              label: { en: 'Email a copy and ask them to send theirs back', es: 'Mandar una copia por correo y pedir que devuelvan la suya' },
              why: {
                en: 'Now there are two documents drifting apart, and you have to merge them by hand. One live file with comments avoids all of that.',
                es: 'Ahora hay dos documentos separándose, y tienes que unirlos a mano. Un archivo vivo con comentarios evita todo eso.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Select text → Add comment. Same in both tools.', es: 'Selecciona texto → Agregar comentario. Igual en ambas.' },
            { en: 'Comments beat silent edits and emailed copies.', es: 'Los comentarios ganan a las ediciones silenciosas y las copias por correo.' },
            { en: 'Reviewers get commenter access, not editor.', es: 'Quienes revisan tienen acceso de comentarista, no de editor.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job4-l7',
      icon: 'upload',
      minutes: 4,
      title: { en: 'Export the right file', es: 'Exporta el archivo correcto' },
      steps: [
        {
          type: 'teach',
          title: { en: 'When to send a PDF', es: 'Cuándo mandar un PDF' },
          body: [
            {
              en: 'A **PDF** is a fixed picture of your finished document. It looks identical on every computer, phone, and printer — and the recipient cannot easily change it.',
              es: 'Un **PDF** es una imagen fija de tu documento terminado. Se ve idéntico en toda computadora, teléfono e impresora — y quien lo recibe no lo puede cambiar fácilmente.',
            },
            {
              en: 'Send a **PDF** when the document is finished and the layout matters: an invoice, a signed letter, a flyer, anything going to a client.',
              es: 'Manda un **PDF** cuando el documento está terminado y el diseño importa: una factura, una carta firmada, un volante, cualquier cosa que va a un cliente.',
            },
            {
              en: 'Keep it as a **Word or Docs file** when someone still needs to edit it. Sending a PDF to someone who needs to make changes just creates work.',
              es: 'Déjalo como **archivo de Word o Docs** cuando alguien todavía necesita editarlo. Mandar un PDF a alguien que necesita hacer cambios solo genera trabajo.',
            },
          ],
          callout: {
            en: 'Both tools export a PDF from the File menu — "Save as PDF" or "Download as PDF". It makes a new file; your editable original stays exactly as it was.',
            es: 'Ambas herramientas exportan PDF desde el menú Archivo — «Guardar como PDF» o «Descargar como PDF». Crea un archivo nuevo; tu original editable se queda igual.',
          },
        },
        {
          type: 'sort',
          prompt: { en: 'Send as a PDF, or as an editable document?', es: '¿Mandar como PDF, o como documento editable?' },
          buckets: [
            { id: 'pdf', emoji: '📕', label: { en: 'PDF', es: 'PDF' } },
            { id: 'doc', emoji: '📝', label: { en: 'Editable document', es: 'Documento editable' } },
          ],
          items: [
            {
              id: 'a',
              emoji: '🧾',
              bucket: 'pdf',
              label: { en: 'A final invoice going to a customer', es: 'Una factura final que va a un cliente' },
              why: {
                en: 'Finished, and the layout must not shift — that is a PDF.',
                es: 'Terminada, y el diseño no debe moverse — eso es un PDF.',
              },
            },
            {
              id: 'b',
              emoji: '✍️',
              bucket: 'doc',
              label: { en: 'A draft your coworker needs to add a section to', es: 'Un borrador al que tu compañero necesita agregarle una sección' },
              why: {
                en: 'They need to edit it, so it has to stay editable.',
                es: 'Necesita editarlo, así que tiene que quedarse editable.',
              },
            },
            {
              id: 'c',
              emoji: '📣',
              bucket: 'pdf',
              label: { en: 'A one-page flyer for the notice board', es: 'Un volante de una página para el pizarrón' },
              why: {
                en: 'It is finished and will be printed — the layout has to hold. PDF.',
                es: 'Está terminado y se va a imprimir — el diseño tiene que aguantar. PDF.',
              },
            },
          ],
        },
        {
          type: 'action',
          title: { en: 'Export yours', es: 'Exporta el tuyo' },
          body: [
            {
              en: 'Take the practice document you have been building and export it as a PDF from the File menu.',
              es: 'Toma el documento de práctica que has estado armando y expórtalo como PDF desde el menú Archivo.',
            },
            {
              en: 'Then open the PDF and compare it to the original — same content, but now fixed in place. Notice you now have two files, and check that both landed where you expected.',
              es: 'Luego abre el PDF y compáralo con el original — el mismo contenido, pero ahora fijo. Fíjate que ahora tienes dos archivos, y revisa que ambos hayan caído donde esperabas.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'PDF = finished, fixed layout, hard to change.', es: 'PDF = terminado, diseño fijo, difícil de cambiar.' },
            { en: 'Editable file = someone still needs to work on it.', es: 'Archivo editable = alguien todavía tiene que trabajarlo.' },
            { en: 'Exporting a PDF leaves your original untouched.', es: 'Exportar un PDF deja tu original intacto.' },
          ],
        },
      ],
    },
  ],
}
