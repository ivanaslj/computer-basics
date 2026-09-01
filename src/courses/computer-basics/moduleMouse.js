/**
 * Mouse Practice — pure drilling, placed after "Windows and apps" and before
 * "Files and folders".
 *
 * Module 1 already *introduces* click / double-click / right-click as ideas.
 * This module exists because knowing what a double-click is and being able to
 * do one reliably are different things, and the gap between them is where
 * beginners quietly give up — a failed drag reads as "the computer is broken"
 * or "I did it wrong" rather than "I released a moment too early."
 *
 * So the framing throughout is practice, not re-teaching: more reps, bigger
 * targets, forgiving timing, and drag introduced as ONE continuous motion
 * (point → press → hold → move → release) rather than as separate steps,
 * because splitting it is exactly the mistake learners make on their own.
 */

const DESKTOP = [
  { id: 'internet', emoji: '🌐', label: { en: 'Internet', es: 'Internet' }, x: 8, y: 10 },
  { id: 'photos', emoji: '🖼️', label: { en: 'Photos', es: 'Fotos' }, x: 8, y: 40 },
  { id: 'documents', emoji: '📁', label: { en: 'Documents', es: 'Documentos' }, x: 30, y: 10 },
  { id: 'trash', emoji: '🗑️', label: { en: 'Trash', es: 'Papelera' }, x: 30, y: 40 },
]

export default {
  id: 'mp',
  emoji: '🖱️',
  color: 'grass',
  title: { en: 'Mouse practice', es: 'Práctica del mouse' },
  subtitle: {
    en: 'Get comfortable clicking, opening, and dragging — at your own pace',
    es: 'Agarra confianza para hacer clic, abrir y arrastrar — a tu propio ritmo',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'mp-l1',
      emoji: '👆',
      minutes: 3,
      title: { en: 'Clicking, on purpose', es: 'Hacer clic, a propósito' },
      steps: [
        {
          type: 'teach',
          title: { en: 'This part is just practice', es: 'Esta parte es solo práctica' },
          body: [
            {
              en: 'You already know what a click is. This whole module is just **repetition** — the part that turns "I know what to do" into "my hand does it without thinking."',
              es: 'Ya sabes lo que es un clic. Todo este módulo es pura **repetición** — la parte que convierte «sé qué hacer» en «mi mano lo hace sin pensar».',
            },
            {
              en: 'Nothing here is timed, nothing is graded, and nothing breaks. Do each one as many times as you like.',
              es: 'Aquí nada tiene tiempo, nada se califica, y nada se rompe. Haz cada uno las veces que quieras.',
            },
          ],
          callout: {
            en: 'One click **selects**. It puts a highlight around something to say "this one" — it does not open it.',
            es: 'Un clic **selecciona**. Pone un resaltado alrededor de algo para decir «este» — no lo abre.',
          },
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: { en: 'Click **Internet** once.', es: 'Haz clic en **Internet** una vez.' },
          config: { goal: 'click', target: 'internet', icons: DESKTOP },
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: { en: 'Now click **Trash** once.', es: 'Ahora haz clic en **Papelera** una vez.' },
          config: { goal: 'click', target: 'trash', icons: DESKTOP },
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: {
            en: 'One more. Click **the place where your files are kept**.',
            es: 'Uno más. Haz clic en **el lugar donde se guardan tus archivos**.',
          },
          config: { goal: 'click', target: 'documents', icons: DESKTOP },
        },
        {
          type: 'recap',
          points: [
            { en: 'One click selects — it highlights, it does not open.', es: 'Un clic selecciona — resalta, no abre.' },
            { en: 'You can click something as many times as you want. Nothing breaks.', es: 'Puedes hacer clic en algo las veces que quieras. Nada se rompe.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'mp-l2',
      emoji: '👆👆',
      minutes: 4,
      title: { en: 'Double-click, until it is easy', es: 'Doble clic, hasta que sea fácil' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Two quick clicks: click-click', es: 'Dos clics rápidos: clic-clic' },
          body: [
            {
              en: 'A double-click is two clicks in the same spot, **close together in time**. Say "click-click" out loud as you do it — that rhythm is about right.',
              es: 'Un doble clic son dos clics en el mismo lugar, **muy seguidos en el tiempo**. Di «clic-clic» en voz alta mientras lo haces — ese ritmo es más o menos el correcto.',
            },
            {
              en: 'If nothing opens, the two clicks were too far apart. That is the **only** thing that usually goes wrong. Try again a little quicker.',
              es: 'Si no se abre nada, los dos clics estuvieron muy separados. Eso es lo **único** que suele salir mal. Inténtalo otra vez un poco más rápido.',
            },
          ],
          callout: {
            en: 'A real computer lets you slow the required speed down in its mouse settings, if double-clicking stays hard. It is a setting, not a limitation of yours.',
            es: 'Una computadora de verdad te deja hacer más lenta la velocidad requerida en los ajustes del mouse, si el doble clic sigue costando. Es una configuración, no un límite tuyo.',
          },
          calloutEmoji: '⚙️',
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: { en: 'Double-click **Photos** to open it.', es: 'Haz doble clic en **Fotos** para abrirlo.' },
          config: {
            goal: 'doubleclick',
            target: 'photos',
            icons: DESKTOP,
            opensWindow: {
              emoji: '🖼️',
              title: { en: 'Photos', es: 'Fotos' },
              body: {
                en: 'It opened. That is all a double-click does — it opens what you pointed at.',
                es: 'Se abrió. Eso es todo lo que hace un doble clic — abre lo que señalaste.',
              },
            },
          },
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: { en: 'Again — double-click **Documents**.', es: 'Otra vez — haz doble clic en **Documentos**.' },
          config: {
            goal: 'doubleclick',
            target: 'documents',
            icons: DESKTOP,
            opensWindow: {
              emoji: '📁',
              title: { en: 'Documents', es: 'Documentos' },
              body: {
                en: 'Two for two. This is the motion you will use to open almost everything.',
                es: 'Dos de dos. Este es el movimiento que usarás para abrir casi todo.',
              },
            },
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'You double-clicked a folder and nothing happened. What is most likely?',
            es: 'Hiciste doble clic en una carpeta y no pasó nada. ¿Qué es lo más probable?',
          },
          options: [
            {
              id: 'a',
              emoji: '🐢',
              label: { en: 'The two clicks were a bit too slow — try again quicker', es: 'Los dos clics fueron un poco lentos — inténtalo más rápido' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '💔',
              label: { en: 'The computer is broken', es: 'La computadora está descompuesta' },
              why: {
                en: 'Almost never. A double-click that does not open something is nearly always just timing. Try again slightly faster.',
                es: 'Casi nunca. Un doble clic que no abre algo casi siempre es cuestión de tiempo. Inténtalo otra vez un poco más rápido.',
              },
            },
            {
              id: 'c',
              emoji: '🚫',
              label: { en: 'That folder cannot be opened', es: 'Esa carpeta no se puede abrir' },
              why: {
                en: 'Folders open. If one did not, it is the timing of the two clicks, not the folder.',
                es: 'Las carpetas se abren. Si una no lo hizo, es el tiempo entre los dos clics, no la carpeta.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Double-click = two clicks, close together, same spot.', es: 'Doble clic = dos clics, muy seguidos, en el mismo lugar.' },
            { en: 'Nothing opened? It was the timing. Try again a bit quicker.', es: '¿No se abrió nada? Fue el tiempo. Inténtalo un poco más rápido.' },
            { en: 'The required speed can be slowed down in the computer’s settings.', es: 'La velocidad requerida se puede hacer más lenta en los ajustes de la computadora.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'mp-l3',
      emoji: '✊',
      minutes: 3,
      title: { en: 'Picking something up', es: 'Levantar algo' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Press, and do not let go', es: 'Presiona, y no sueltes' },
          body: [
            {
              en: 'Moving something on a computer starts with **holding on to it** — pressing down and keeping the button pressed, the way you would keep your fingers closed around a cup you are carrying.',
              es: 'Mover algo en la computadora empieza por **agarrarlo** — presionar y mantener el botón presionado, como mantendrías los dedos cerrados alrededor de una taza que llevas cargando.',
            },
            {
              en: 'Letting go is what puts it down. So the whole trick is: **do not let go until it is where you want it.**',
              es: 'Soltar es lo que lo deja. Así que todo el truco es: **no sueltes hasta que esté donde lo quieres.**',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'One motion, not four', es: 'Un movimiento, no cuatro' },
          body: [
            {
              en: 'This is the part most people get wrong, and it is worth reading twice. Moving something is **one continuous motion**:',
              es: 'Esta es la parte que a casi todos se les complica, y vale la pena leerla dos veces. Mover algo es **un solo movimiento continuo**:',
            },
            {
              en: '**Point → press → keep holding → move → let go.**',
              es: '**Apunta → presiona → sigue presionando → mueve → suelta.**',
            },
            {
              en: 'It is *not* four separate actions — not click it, let go, move over there, click again. If you let go in the middle, the item simply stays where it was. No harm done; just start over.',
              es: 'No son cuatro acciones separadas — no es hacer clic, soltar, moverse allá, y hacer clic otra vez. Si sueltas a medio camino, la cosa se queda donde estaba. No pasa nada; solo empieza de nuevo.',
            },
          ],
          callout: {
            en: 'On a phone this is the same gesture you already use to rearrange your app icons — press, hold, slide, release.',
            es: 'En el teléfono es el mismo gesto que ya usas para acomodar los iconos de tus apps — presiona, mantén, desliza, suelta.',
          },
          calloutEmoji: '📱',
        },
        {
          type: 'choice',
          prompt: {
            en: 'Which describes moving a file into a folder?',
            es: '¿Cuál describe mover un archivo a una carpeta?',
          },
          options: [
            {
              id: 'a',
              emoji: '🤏',
              label: {
                en: 'Press on it and keep holding while you move, then let go on the folder',
                es: 'Presionarlo y seguir presionando mientras lo mueves, y soltar sobre la carpeta',
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '👆',
              label: {
                en: 'Click it, let go, then click the folder',
                es: 'Hacerle clic, soltar, y luego hacer clic en la carpeta',
              },
              why: {
                en: 'That is the common mix-up — it is one unbroken motion. Letting go in the middle just puts the file back down where it started.',
                es: 'Esa es la confusión común — es un solo movimiento sin cortes. Soltar a medio camino solo deja el archivo donde estaba.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Point → press → keep holding → move → let go.', es: 'Apunta → presiona → sigue presionando → mueve → suelta.' },
            { en: 'It is one motion, not four separate clicks.', es: 'Es un movimiento, no cuatro clics separados.' },
            { en: 'Letting go early just puts it back. Nothing is lost.', es: 'Soltar antes solo lo regresa. No se pierde nada.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'mp-l4',
      emoji: '🫳',
      minutes: 4,
      title: { en: 'Your first drag', es: 'Tu primer arrastre' },
      steps: [
        {
          type: 'teach',
          title: { en: 'One file, one folder, lots of room', es: 'Un archivo, una carpeta, mucho espacio' },
          body: [
            {
              en: 'Here is the whole motion for real, with nothing else on screen to get in the way. Take it slowly — there is no timer.',
              es: 'Aquí está el movimiento completo de verdad, sin nada más en pantalla que estorbe. Tómalo con calma — no hay reloj.',
            },
            {
              en: 'Press on the file, keep pressing, slide it until it is **on top of** the folder, and only then let go.',
              es: 'Presiona el archivo, sigue presionando, deslízalo hasta que esté **encima de** la carpeta, y solo entonces suelta.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'files',
          prompt: {
            en: 'Move **Beach.jpg** into the **Pictures** folder.',
            es: 'Mueve **Playa.jpg** a la carpeta **Imágenes**.',
          },
          footerHint: {
            en: 'Press and hold the file, slide it onto the folder, then let go',
            es: 'Mantén presionado el archivo, deslízalo a la carpeta, y suelta',
          },
          config: {
            goal: 'move',
            target: 'beach',
            moveTo: 'pictures',
            items: [
              { id: 'beach', kind: 'file', emoji: '🖼️', label: { en: 'Beach.jpg', es: 'Playa.jpg' } },
              { id: 'pictures', kind: 'folder', emoji: '📁', label: { en: 'Pictures', es: 'Imágenes' } },
            ],
          },
        },
        {
          type: 'recap',
          points: [
            { en: 'You just moved a file by dragging it. That is the whole skill.', es: 'Acabas de mover un archivo arrastrándolo. Esa es toda la habilidad.' },
            { en: 'Slow is fine. Nobody is timing this.', es: 'Despacio está bien. Nadie está tomando el tiempo.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'mp-l5',
      emoji: '🎯',
      minutes: 4,
      title: { en: 'Choosing the right place', es: 'Elegir el lugar correcto' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Now there is more than one folder', es: 'Ahora hay más de una carpeta' },
          body: [
            {
              en: 'Same motion as last time. The only new part: there is more than one place you could drop it, so **read the folder names** before you let go.',
              es: 'El mismo movimiento que la vez pasada. Lo único nuevo: hay más de un lugar donde podrías soltarlo, así que **lee los nombres de las carpetas** antes de soltar.',
            },
            {
              en: 'The folder lights up when your file is over it. That highlight is the computer telling you "let go here and it lands in me."',
              es: 'La carpeta se ilumina cuando tu archivo está encima. Ese resaltado es la computadora diciéndote «suelta aquí y cae dentro de mí».',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'files',
          prompt: {
            en: 'Move **Electric bill** into **Bills** — not into Photos.',
            es: 'Mueve **Recibo de luz** a **Recibos** — no a Fotos.',
          },
          footerHint: {
            en: 'Watch for the folder to light up before you let go',
            es: 'Fíjate que la carpeta se ilumine antes de soltar',
          },
          config: {
            goal: 'move',
            target: 'bill',
            moveTo: 'bills',
            items: [
              { id: 'bill', kind: 'file', emoji: '📄', label: { en: 'Electric bill', es: 'Recibo de luz' } },
              { id: 'bills', kind: 'folder', emoji: '📁', label: { en: 'Bills', es: 'Recibos' } },
              { id: 'photos', kind: 'folder', emoji: '📁', label: { en: 'Photos', es: 'Fotos' } },
            ],
          },
        },
        {
          type: 'sim',
          sim: 'files',
          prompt: {
            en: 'Now move **Grandkids.jpg** into **Photos**.',
            es: 'Ahora mueve **Nietos.jpg** a **Fotos**.',
          },
          footerHint: {
            en: 'Press and hold, slide onto the right folder, let go',
            es: 'Mantén presionado, desliza a la carpeta correcta, suelta',
          },
          config: {
            goal: 'move',
            target: 'grandkids',
            moveTo: 'photos',
            items: [
              { id: 'grandkids', kind: 'file', emoji: '🖼️', label: { en: 'Grandkids.jpg', es: 'Nietos.jpg' } },
              { id: 'bills', kind: 'folder', emoji: '📁', label: { en: 'Bills', es: 'Recibos' } },
              { id: 'photos', kind: 'folder', emoji: '📁', label: { en: 'Photos', es: 'Fotos' } },
            ],
          },
        },
        {
          type: 'recap',
          points: [
            { en: 'Read the folder name before you let go.', es: 'Lee el nombre de la carpeta antes de soltar.' },
            { en: 'The folder lights up when you are over it.', es: 'La carpeta se ilumina cuando estás encima de ella.' },
            { en: 'Dropped it in the wrong one? Just drag it back out.', es: '¿Lo soltaste en la equivocada? Solo arrástralo de vuelta.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'mp-l6',
      emoji: '🧹',
      minutes: 5,
      title: { en: 'Tidy up the desktop', es: 'Ordena el escritorio' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Everything at once', es: 'Todo junto' },
          body: [
            {
              en: 'Last one. A messy desktop with several things on it — exactly the situation you will meet on a real computer.',
              es: 'La última. Un escritorio desordenado con varias cosas — justo la situación que te vas a encontrar en una computadora de verdad.',
            },
            {
              en: 'Move each item to where it belongs, one at a time. Same motion every time.',
              es: 'Mueve cada cosa a donde va, una por una. El mismo movimiento cada vez.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'files',
          prompt: {
            en: 'Move **Tax form** into **Documents**.',
            es: 'Mueve **Formulario de impuestos** a **Documentos**.',
          },
          config: {
            goal: 'move',
            target: 'tax',
            moveTo: 'documents',
            items: [
              { id: 'tax', kind: 'file', emoji: '📄', label: { en: 'Tax form', es: 'Formulario de impuestos' } },
              { id: 'vacation', kind: 'file', emoji: '🖼️', label: { en: 'Vacation.jpg', es: 'Vacaciones.jpg' } },
              { id: 'documents', kind: 'folder', emoji: '📁', label: { en: 'Documents', es: 'Documentos' } },
              { id: 'pictures', kind: 'folder', emoji: '📁', label: { en: 'Pictures', es: 'Imágenes' } },
            ],
          },
        },
        {
          type: 'sim',
          sim: 'files',
          prompt: {
            en: 'Now move **Vacation.jpg** into **Pictures**.',
            es: 'Ahora mueve **Vacaciones.jpg** a **Imágenes**.',
          },
          config: {
            goal: 'move',
            target: 'vacation',
            moveTo: 'pictures',
            items: [
              { id: 'vacation', kind: 'file', emoji: '🖼️', label: { en: 'Vacation.jpg', es: 'Vacaciones.jpg' } },
              { id: 'documents', kind: 'folder', emoji: '📁', label: { en: 'Documents', es: 'Documentos' } },
              { id: 'pictures', kind: 'folder', emoji: '📁', label: { en: 'Pictures', es: 'Imágenes' } },
            ],
          },
        },
        {
          type: 'teach',
          title: { en: 'That is the same skill, everywhere', es: 'Esa misma habilidad, en todos lados' },
          body: [
            {
              en: 'What you just did is exactly how files get organised on a real computer — and it is the same motion for moving an email into a folder, rearranging photos, or tidying a download.',
              es: 'Lo que acabas de hacer es exactamente como se organizan los archivos en una computadora de verdad — y es el mismo movimiento para mover un correo a una carpeta, acomodar fotos, o guardar una descarga.',
            },
            {
              en: 'The next module is all about files and folders. You now have the hands for it.',
              es: 'El siguiente módulo es todo sobre archivos y carpetas. Ya tienes las manos para eso.',
            },
          ],
          callout: {
            en: 'Come back and redo any of these any time you want the practice. They never run out.',
            es: 'Vuelve y repite cualquiera de estas cuando quieras practicar. Nunca se acaban.',
          },
          calloutTone: 'grass',
          calloutEmoji: '🔁',
        },
        {
          type: 'recap',
          points: [
            { en: 'Click to select, double-click to open, press-and-hold to move.', es: 'Clic para seleccionar, doble clic para abrir, mantener presionado para mover.' },
            { en: 'Dragging is one motion: point, press, hold, move, let go.', es: 'Arrastrar es un movimiento: apunta, presiona, mantén, mueve, suelta.' },
            { en: 'This is the same skill used to organise real files.', es: 'Esta es la misma habilidad que se usa para organizar archivos reales.' },
          ],
        },
      ],
    },
  ],
}
