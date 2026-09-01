/**
 * Job Skills 7 — Integrated workplace tasks.
 *
 * Everything so far taught one skill at a time. Real work never arrives that
 * way: a single request usually means finding a file, editing it, saving it
 * correctly, and sending it to the right person in the right format. These
 * lessons are deliberately end-to-end for that reason, and every one of them
 * happens on a real computer.
 */

export default {
  id: 'job7',
  emoji: '🏆',
  color: 'sun',
  title: { en: 'Putting it together', es: 'Juntando todo' },
  subtitle: {
    en: 'Real tasks that use several skills at once, like real work does',
    es: 'Tareas reales que usan varias habilidades a la vez, como el trabajo real',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'job7-l1',
      emoji: '🧩',
      minutes: 3,
      title: { en: 'How real tasks actually arrive', es: 'Cómo llegan las tareas reales' },
      steps: [
        {
          type: 'teach',
          title: { en: 'One request, several skills', es: 'Una petición, varias habilidades' },
          body: [
            {
              en: 'Nobody at work says "please demonstrate a SUM formula." They say "can you update the supply list and send me the total by Thursday" — and that one sentence quietly requires four or five of the things you have learned.',
              es: 'Nadie en el trabajo dice «por favor demuestra una fórmula SUMA». Dicen «¿puedes actualizar la lista de insumos y mandarme el total el jueves?» — y esa sola oración requiere en silencio cuatro o cinco de las cosas que aprendiste.',
            },
            {
              en: 'Find the file. Open the right version. Make the change. Save it in the right place with the right name. Decide whether to attach or share. Write a clear email. Send it to the right person.',
              es: 'Encuentra el archivo. Abre la versión correcta. Haz el cambio. Guárdalo en el lugar correcto con el nombre correcto. Decide si adjuntar o compartir. Escribe un correo claro. Mándalo a la persona correcta.',
            },
            {
              en: 'The rest of this module is that — full tasks, start to finish, on a real computer. Take them slowly. There is no time limit and nothing is being graded.',
              es: 'El resto de este módulo es eso — tareas completas, de principio a fin, en una computadora de verdad. Tómalas con calma. No hay límite de tiempo ni nada se califica.',
            },
          ],
          callout: {
            en: 'If you get stuck on a step, go back to the module that taught it. Rereading one lesson is a completely normal part of doing the work.',
            es: 'Si te atoras en un paso, regresa al módulo que lo enseñó. Releer una lección es parte completamente normal de hacer el trabajo.',
          },
          calloutTone: 'grass',
        },
        {
          type: 'recap',
          points: [
            { en: 'Real requests combine several skills at once.', es: 'Las peticiones reales combinan varias habilidades a la vez.' },
            { en: 'Find → open → change → save → send, is the usual shape.', es: 'Encontrar → abrir → cambiar → guardar → enviar, es la forma usual.' },
            { en: 'Going back to reread a lesson is normal.', es: 'Regresar a releer una lección es normal.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job7-l2',
      emoji: '📧',
      minutes: 10,
      title: { en: 'Task: send a meeting update', es: 'Tarea: manda una actualización de junta' },
      steps: [
        {
          type: 'action',
          title: { en: 'The whole loop, once', es: 'El ciclo completo, una vez' },
          body: [
            {
              en: 'The scenario: the Thursday team meeting moved from 10am to 2pm, and you need to tell three people and give them the agenda.',
              es: 'El escenario: la junta del equipo del jueves se movió de 10am a 2pm, y necesitas avisarle a tres personas y darles la agenda.',
            },
            {
              en: '**1.** Create a short document with the new time and three agenda items. **2.** Save it with a sensible name in a folder you will find again. **3.** Write an email with a clear subject line. **4.** Attach the document, or share a link to it. **5.** Send it to yourself so you can see how it arrives.',
              es: '**1.** Crea un documento corto con el nuevo horario y tres puntos de agenda. **2.** Guárdalo con un nombre sensato en una carpeta que vuelvas a encontrar. **3.** Escribe un correo con un asunto claro. **4.** Adjunta el documento, o comparte un enlace. **5.** Mándatelo a ti misma para ver cómo llega.',
            },
            {
              en: 'Then open what arrived and read it as if you were the recipient. Is the subject line clear? Did the attachment come through? Would you know what to do?',
              es: 'Luego abre lo que llegó y léelo como si fueras quien lo recibe. ¿El asunto es claro? ¿Llegó el adjunto? ¿Sabrías qué hacer?',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'You created, saved, attached, and sent — the everyday loop.', es: 'Creaste, guardaste, adjuntaste y enviaste — el ciclo de todos los días.' },
            { en: 'Reading your own email as the recipient catches most mistakes.', es: 'Leer tu propio correo como quien lo recibe atrapa casi todos los errores.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job7-l3',
      emoji: '📊',
      minutes: 12,
      title: { en: 'Task: update an expense list', es: 'Tarea: actualiza una lista de gastos' },
      steps: [
        {
          type: 'action',
          title: { en: 'Data in, answers out', es: 'Datos adentro, respuestas afuera' },
          body: [
            {
              en: 'In Excel or Google Sheets, build a small expense list: headings in row 1 (Date, Item, Category, Amount), then eight rows of made-up expenses across two or three categories.',
              es: 'En Excel o Google Sheets, arma una lista pequeña de gastos: encabezados en la fila 1 (Fecha, Concepto, Categoría, Monto), y luego ocho filas de gastos inventados en dos o tres categorías.',
            },
            {
              en: '**1.** Total the Amount column with a SUM formula. **2.** Format the amounts as currency and the dates as dates. **3.** Bold the heading row and widen the columns. **4.** Sort the whole table by Amount, largest first. **5.** Filter to show one category only, look at it, then clear the filter.',
              es: '**1.** Totaliza la columna Monto con una fórmula SUMA. **2.** Da formato de moneda a los montos y de fecha a las fechas. **3.** Pon en negritas los encabezados y ensancha las columnas. **4.** Ordena toda la tabla por Monto, de mayor a menor. **5.** Filtra para ver solo una categoría, míralo, y quita el filtro.',
            },
            {
              en: 'Finally, check print preview and save it as a one-page PDF. Remember: select the **whole table** before sorting, never one column.',
              es: 'Por último, revisa la vista previa de impresión y guárdalo como PDF de una página. Recuerda: selecciona **toda la tabla** antes de ordenar, nunca una columna.',
            },
          ],
          copyText: '=SUM(D2:D9)',
        },
        {
          type: 'recap',
          points: [
            { en: 'Entered data, totalled it, formatted it, sorted and filtered it.', es: 'Capturaste datos, los totalizaste, les diste formato, ordenaste y filtraste.' },
            { en: 'Whole table selected before sorting — every time.', es: 'Toda la tabla seleccionada antes de ordenar — siempre.' },
            { en: 'Print preview before printing or saving as PDF.', es: 'Vista previa antes de imprimir o guardar como PDF.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job7-l4',
      emoji: '📣',
      minutes: 10,
      title: { en: 'Task: prepare a team announcement', es: 'Tarea: prepara un anuncio para el equipo' },
      steps: [
        {
          type: 'action',
          title: { en: 'Write it, format it, get it reviewed', es: 'Escríbelo, dale formato, y que lo revisen' },
          body: [
            {
              en: 'Write a one-page staff announcement in Word or Google Docs — anything plausible: a new break-room policy, a schedule change, a welcome for a new hire.',
              es: 'Escribe un anuncio de una página para el personal en Word o Google Docs — algo verosímil: una nueva política de la sala de descanso, un cambio de horario, la bienvenida a alguien nuevo.',
            },
            {
              en: '**1.** Give it a real Heading 1 title and at least one subheading. **2.** Use a bulleted list for anything that is a list. **3.** Add a small table if it suits — dates, times, who to ask. **4.** Share it with someone as a **commenter**, not an editor.',
              es: '**1.** Ponle un título con Título 1 de verdad y al menos un subtítulo. **2.** Usa una lista con viñetas para lo que sea una lista. **3.** Agrega una tabla pequeña si encaja — fechas, horarios, a quién preguntar. **4.** Compártelo con alguien como **comentarista**, no editor.',
            },
            {
              en: 'If you have nobody to share it with, share it to a second email address of your own and open it from there — then check what you can and cannot do with commenter access.',
              es: 'Si no tienes con quién compartirlo, compártelo a otro correo tuyo y ábrelo desde ahí — y revisa qué puedes y qué no con acceso de comentarista.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Headings and bullets make it scannable.', es: 'Encabezados y viñetas lo hacen ojeable.' },
            { en: 'Reviewers get commenter access, not editor.', es: 'Quienes revisan tienen acceso de comentarista, no de editor.' },
            { en: 'Check the sharing worked from the other side.', es: 'Revisa desde el otro lado que el compartir haya funcionado.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job7-l5',
      emoji: '🖥️',
      minutes: 10,
      title: { en: 'Task: make a short update deck', es: 'Tarea: haz una presentación corta' },
      steps: [
        {
          type: 'action',
          title: { en: 'Four slides, one message each', es: 'Cuatro diapositivas, un mensaje cada una' },
          body: [
            {
              en: 'Build a four-slide update on anything you like — a project, a month\'s numbers, a plan for next week.',
              es: 'Arma una presentación de cuatro diapositivas sobre lo que quieras — un proyecto, los números del mes, un plan para la próxima semana.',
            },
            {
              en: '**1.** Pick one built-in theme. **2.** Give each slide a title that states a point, not just a topic. **3.** Three short bullets maximum per slide. **4.** Add one visual that genuinely helps — a chart, not a decoration. **5.** Run it in presentation mode.',
              es: '**1.** Elige un tema incluido. **2.** Dale a cada diapositiva un título que diga un punto, no solo un tema. **3.** Máximo tres viñetas cortas por diapositiva. **4.** Agrega un visual que de verdad ayude — una gráfica, no un adorno. **5.** Córrela en modo presentación.',
            },
            {
              en: 'Then export it as a PDF and open that too, so you have seen both formats a colleague might ask for.',
              es: 'Luego expórtala como PDF y ábrelo también, para que hayas visto los dos formatos que un colega podría pedir.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'One built-in theme, one message per slide.', es: 'Un tema incluido, un mensaje por diapositiva.' },
            { en: 'Titles state a point; visuals must earn their place.', es: 'Los títulos dicen un punto; los visuales se ganan su lugar.' },
            { en: 'Presentation mode before you call it finished.', es: 'Modo presentación antes de darla por terminada.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job7-l6',
      emoji: '🎓',
      minutes: 15,
      title: { en: 'Your first office task', es: 'Tu primera tarea de oficina' },
      steps: [
        {
          type: 'teach',
          title: { en: 'The whole thing, from one sentence', es: 'Todo, a partir de una oración' },
          body: [
            {
              en: 'This is the last one, and it is the closest thing to a real day at work: a single instruction from a supervisor, with everything else left for you to figure out.',
              es: 'Esta es la última, y es lo más parecido a un día real de trabajo: una sola instrucción de un supervisor, y todo lo demás lo resuelves tú.',
            },
            {
              en: '*"Can you update the supply list, put together a short summary for the team, and email me the results before 3pm?"*',
              es: '*«¿Puedes actualizar la lista de insumos, armar un resumen corto para el equipo, y mandarme los resultados por correo antes de las 3?»*',
            },
            {
              en: 'Notice what is not specified: which file, where it lives, what format the summary should be, whether to attach or link. Those decisions are the job — and you have now learned every one of them.',
              es: 'Fíjate en lo que no se especifica: cuál archivo, dónde está, en qué formato debe ir el resumen, si adjuntar o enlazar. Esas decisiones son el trabajo — y ya aprendiste cada una.',
            },
          ],
        },
        {
          type: 'action',
          title: { en: 'Do it end to end', es: 'Hazlo de principio a fin' },
          body: [
            {
              en: '**1.** Find (or make) a supply spreadsheet in a sensible folder. **2.** Add three rows, recalculate the total, format the amounts as currency, and filter one category to check it.',
              es: '**1.** Encuentra (o haz) una hoja de insumos en una carpeta sensata. **2.** Agrega tres filas, recalcula el total, da formato de moneda a los montos, y filtra una categoría para revisarla.',
            },
            {
              en: '**3.** Save it using your naming rule — date, topic, version if needed. **4.** Make a short summary: either a one-page document or a two-slide deck, your call.',
              es: '**3.** Guárdala usando tu regla de nombres — fecha, tema, versión si hace falta. **4.** Haz un resumen corto: un documento de una página o una presentación de dos diapositivas, tú decides.',
            },
            {
              en: '**5.** Decide: does your supervisor need a **fixed PDF copy**, or **edit access to the live file**? Pick deliberately, and be able to say why. **6.** Write the email — clear subject line, the right recipient, a concise update, and the correct attachment or link.',
              es: '**5.** Decide: ¿tu supervisor necesita una **copia fija en PDF**, o **acceso de edición al archivo vivo**? Elige a propósito, y ten claro por qué. **6.** Escribe el correo — asunto claro, el destinatario correcto, una actualización concisa, y el adjunto o enlace correcto.',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'That is the job', es: 'Ese es el trabajo' },
          body: [
            {
              en: 'If you got through that, you have done a genuine entry-level office task from start to finish — the file work, the numbers, the document, the sharing decision, and the communication.',
              es: 'Si lograste eso, hiciste una tarea real de oficina de principio a fin — el manejo de archivos, los números, el documento, la decisión de compartir, y la comunicación.',
            },
            {
              en: 'None of it required anything you have not practised here. The rest is repetition, which comes on its own once you are doing it every day.',
              es: 'Nada de eso requirió algo que no hayas practicado aquí. El resto es repetición, que llega sola una vez que lo haces todos los días.',
            },
          ],
          callout: {
            en: 'Every one of these tasks can be redone as many times as you like, with different made-up details. Repetition is how it stops feeling like a test and starts feeling like Tuesday.',
            es: 'Cada una de estas tareas se puede repetir las veces que quieras, con detalles inventados distintos. La repetición es como deja de sentirse un examen y empieza a sentirse un martes cualquiera.',
          },
          calloutTone: 'grass',
          calloutEmoji: '🔁',
        },
        {
          type: 'recap',
          points: [
            { en: 'You did a full office task from a single instruction.', es: 'Hiciste una tarea completa de oficina desde una sola instrucción.' },
            { en: 'Deciding attach-vs-link and where to save is part of the job.', es: 'Decidir adjuntar-o-enlazar y dónde guardar es parte del trabajo.' },
            { en: 'Redo these with different details whenever you want practice.', es: 'Repite estas con detalles distintos cuando quieras practicar.' },
          ],
        },
      ],
    },
  ],
}
