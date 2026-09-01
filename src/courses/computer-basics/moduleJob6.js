/**
 * Job Skills 6 — PowerPoint essentials.
 *
 * The entry-level need is a short, clean, readable deck — not animation,
 * transitions, or design flair. Most of this module is judgment ("is this
 * slide clear?"), which the phone teaches well; building the deck is the
 * computer task at the end.
 */

export default {
  id: 'job6',
  emoji: '📽️',
  color: 'berry',
  title: { en: 'PowerPoint essentials', es: 'Lo esencial de PowerPoint' },
  subtitle: {
    en: 'A short, clean deck that makes its point',
    es: 'Una presentación corta y limpia que dice lo suyo',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'job6-l1',
      emoji: '1️⃣',
      minutes: 4,
      title: { en: 'One message per slide', es: 'Un mensaje por diapositiva' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Slides are not a document', es: 'Las diapositivas no son un documento' },
          body: [
            {
              en: 'The single biggest mistake in workplace presentations is treating slides like a report — pasting whole paragraphs onto each one and reading them out.',
              es: 'El error más grande en presentaciones de trabajo es tratar las diapositivas como un reporte — pegar párrafos enteros en cada una y leerlos en voz alta.',
            },
            {
              en: 'A slide supports **what you are saying**; it is not a replacement for it. If someone can read the slide instead of listening to you, the slide has too much on it.',
              es: 'Una diapositiva apoya **lo que estás diciendo**; no lo reemplaza. Si alguien puede leer la diapositiva en vez de escucharte, la diapositiva tiene demasiado.',
            },
            {
              en: 'A short work deck has a shape: **title slide → 3 to 5 main points, one per slide → what happens next.** That is genuinely enough for most updates.',
              es: 'Una presentación corta de trabajo tiene una forma: **diapositiva de título → 3 a 5 puntos principales, uno por diapositiva → qué sigue.** Eso de verdad basta para casi cualquier actualización.',
            },
          ],
          callout: {
            en: 'If a slide needs a paragraph, that paragraph probably belongs in a document you send afterwards — not on screen.',
            es: 'Si una diapositiva necesita un párrafo, ese párrafo seguramente va en un documento que mandas después — no en pantalla.',
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'Which slide is better for a team update?',
            es: '¿Cuál diapositiva es mejor para una actualización al equipo?',
          },
          options: [
            {
              id: 'a',
              emoji: '✅',
              label: {
                en: 'Title: "Q3 sales up 12%" — three short bullets underneath',
                es: 'Título: «Ventas Q3 subieron 12%» — tres viñetas cortas debajo',
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '📃',
              label: {
                en: 'A full paragraph explaining the quarter in detail',
                es: 'Un párrafo completo explicando el trimestre en detalle',
              },
              why: {
                en: 'Nobody reads a paragraph on a slide while also listening to you. Put the headline on screen and say the detail out loud.',
                es: 'Nadie lee un párrafo en una diapositiva mientras también te escucha. Pon el titular en pantalla y di el detalle en voz alta.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'One message per slide.', es: 'Un mensaje por diapositiva.' },
            { en: 'Slides support what you say — they do not replace it.', es: 'Las diapositivas apoyan lo que dices — no lo reemplazan.' },
            { en: 'Title → 3-5 points → what happens next.', es: 'Título → 3-5 puntos → qué sigue.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job6-l2',
      emoji: '🎨',
      minutes: 4,
      title: { en: 'Use a built-in layout', es: 'Usa un diseño que ya viene' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Let the template do the design work', es: 'Deja que la plantilla haga el diseño' },
          body: [
            {
              en: 'PowerPoint comes with **layouts** (title slide, title-and-content, two-column) and **themes** (a matched set of fonts and colours). Using them produces a more professional result than placing every text box by hand.',
              es: 'PowerPoint incluye **diseños** (diapositiva de título, título y contenido, dos columnas) y **temas** (un juego combinado de fuentes y colores). Usarlos da un resultado más profesional que acomodar cada cuadro de texto a mano.',
            },
            {
              en: 'This is not laziness — it is why the deck looks consistent. Hand-placed boxes drift a few pixels each time and the whole thing ends up looking slightly wrong in a way people notice but cannot name.',
              es: 'Esto no es flojera — es por lo que la presentación se ve consistente. Los cuadros puestos a mano se desvían unos pixeles cada vez y todo termina viéndose ligeramente mal de una forma que la gente nota pero no sabe nombrar.',
            },
            {
              en: 'Pick one theme at the start and leave it alone. Your job is the content.',
              es: 'Elige un tema al principio y déjalo en paz. Tu trabajo es el contenido.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'You want your slides to look consistent and professional. What is the easiest way?',
            es: 'Quieres que tus diapositivas se vean consistentes y profesionales. ¿Cuál es la forma más fácil?',
          },
          options: [
            {
              id: 'a',
              emoji: '🎨',
              label: { en: 'Pick one built-in theme and use the standard layouts', es: 'Elegir un tema incluido y usar los diseños estándar' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🖌️',
              label: { en: 'Position every text box and choose every colour yourself', es: 'Acomodar cada cuadro de texto y elegir cada color tú misma' },
              why: {
                en: 'That is far more work and usually looks worse — small inconsistencies add up. The built-in themes were made by designers.',
                es: 'Es mucho más trabajo y suele verse peor — las pequeñas inconsistencias se acumulan. Los temas incluidos los hicieron diseñadores.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Use built-in layouts and one theme.', es: 'Usa los diseños incluidos y un solo tema.' },
            { en: 'It looks more consistent than hand-placing everything.', es: 'Se ve más consistente que acomodar todo a mano.' },
            { en: 'Pick a theme once, then focus on content.', es: 'Elige un tema una vez, y enfócate en el contenido.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job6-l3',
      emoji: '🔠',
      minutes: 4,
      title: { en: 'Write slide text', es: 'Escribe el texto' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Big, short, and few', es: 'Grande, corto, y poco' },
          body: [
            {
              en: 'A slide title should be a **statement, not a label**. "Sales" tells the room nothing. "Sales up 12% this quarter" tells them the point before you say a word.',
              es: 'El título de una diapositiva debe ser una **afirmación, no una etiqueta**. «Ventas» no le dice nada a la sala. «Las ventas subieron 12% este trimestre» les dice el punto antes de que hables.',
            },
            {
              en: 'Bullets should be short — a few words, not full sentences. Three or four per slide at most. If you need six, you probably have two slides.',
              es: 'Las viñetas deben ser cortas — unas cuantas palabras, no oraciones completas. Tres o cuatro por diapositiva máximo. Si necesitas seis, probablemente tienes dos diapositivas.',
            },
            {
              en: 'Keep the text **large**. Someone at the back of a room, or squinting at a shared screen, has to be able to read it.',
              es: 'Mantén el texto **grande**. Alguien al fondo del salón, o entrecerrando los ojos en una pantalla compartida, tiene que poder leerlo.',
            },
          ],
          callout: {
            en: 'Empty space is not wasted space. A slide with room to breathe reads faster than one packed to the edges.',
            es: 'El espacio vacío no es espacio desperdiciado. Una diapositiva con aire se lee más rápido que una llena hasta las orillas.',
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'Which is the better slide title?',
            es: '¿Cuál es el mejor título de diapositiva?',
          },
          options: [
            {
              id: 'a',
              emoji: '✅',
              label: { en: '"Orders shipped 2 days faster this month"', es: '«Los pedidos salieron 2 días más rápido este mes»' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🏷️',
              label: { en: '"Shipping"', es: '«Envíos»' },
              why: {
                en: 'That is a label for a topic, not a point. Say what about shipping — the audience should get the message from the title alone.',
                es: 'Esa es una etiqueta de tema, no un punto. Di qué pasa con los envíos — la audiencia debería entender el mensaje solo con el título.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Titles should state the point, not name the topic.', es: 'Los títulos deben decir el punto, no nombrar el tema.' },
            { en: 'Three or four short bullets, maximum.', es: 'Tres o cuatro viñetas cortas, máximo.' },
            { en: 'Big text. Empty space is fine.', es: 'Texto grande. El espacio vacío está bien.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job6-l4',
      emoji: '🖼️',
      minutes: 4,
      title: { en: 'Add a useful visual', es: 'Agrega un visual útil' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Only if it makes the point clearer', es: 'Solo si aclara el punto' },
          body: [
            {
              en: 'A picture, chart, or simple diagram belongs on a slide when it **explains something faster than words would**. A chart showing a trend line does that. A stock photo of people shaking hands does not.',
              es: 'Una imagen, gráfica o diagrama va en una diapositiva cuando **explica algo más rápido que las palabras**. Una gráfica con una tendencia lo hace. Una foto de archivo de gente dándose la mano, no.',
            },
            {
              en: 'Insert one from the **Insert** menu — Picture for an image, Chart for a graph. Then resize it by dragging a **corner** handle, so it does not stretch out of shape.',
              es: 'Insértalo desde el menú **Insertar** — Imagen para una foto, Gráfico para una gráfica. Luego cambia su tamaño arrastrando un controlador de **esquina**, para que no se deforme.',
            },
            {
              en: 'Dragging a side handle instead of a corner is what makes photos look squashed or stretched. Always use the corners.',
              es: 'Arrastrar un controlador lateral en vez de una esquina es lo que hace que las fotos se vean aplastadas o estiradas. Usa siempre las esquinas.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'You are showing that sales grew each month this year. What is the best visual?',
            es: 'Vas a mostrar que las ventas crecieron cada mes este año. ¿Cuál es el mejor visual?',
          },
          options: [
            {
              id: 'a',
              emoji: '📈',
              label: { en: 'A simple line or bar chart of the monthly numbers', es: 'Una gráfica simple de línea o barras con los números mensuales' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🤝',
              label: { en: 'A stock photo of a business team celebrating', es: 'Una foto de archivo de un equipo celebrando' },
              why: {
                en: 'It looks nice but carries no information. A chart shows the growth instantly; the photo just fills space.',
                es: 'Se ve bonita pero no lleva información. Una gráfica muestra el crecimiento al instante; la foto solo llena espacio.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'A visual earns its place by explaining faster than words.', es: 'Un visual se gana su lugar explicando más rápido que las palabras.' },
            { en: 'Insert menu → Picture or Chart.', es: 'Menú Insertar → Imagen o Gráfico.' },
            { en: 'Resize from a corner, never a side.', es: 'Cambia el tamaño desde una esquina, nunca un lado.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job6-l5',
      emoji: '📐',
      minutes: 4,
      title: { en: 'Keep it consistent', es: 'Mantenlo consistente' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Boring and consistent beats exciting and messy', es: 'Aburrido y consistente gana a emocionante y desordenado' },
          body: [
            {
              en: 'Every slide should use the **same fonts, the same colours, and roughly the same arrangement**. Consistency is most of what makes a deck look competent.',
              es: 'Cada diapositiva debe usar las **mismas fuentes, los mismos colores, y más o menos el mismo acomodo**. La consistencia es casi todo lo que hace que una presentación se vea competente.',
            },
            {
              en: 'Resist the temptation to decorate. **Animations, slide transitions, and a rainbow of colours** almost never make an entry-level work presentation better — and often make it look less serious.',
              es: 'Resiste la tentación de decorar. **Animaciones, transiciones y un arcoíris de colores** casi nunca mejoran una presentación de trabajo — y muchas veces la hacen ver menos seria.',
            },
            {
              en: 'Make sure text has **strong contrast** against its background — dark text on light, or light on dark. And never use colour alone to make a point, since not everyone sees colour the same way.',
              es: 'Asegúrate de que el texto tenga **buen contraste** con el fondo — texto oscuro sobre claro, o claro sobre oscuro. Y nunca uses solo el color para marcar algo, porque no todos ven el color igual.',
            },
          ],
          callout: {
            en: 'If you find yourself spending more time on the look than the content, stop. Nobody was ever promoted for a slide transition.',
            es: 'Si te descubres pasando más tiempo en el aspecto que en el contenido, para. A nadie lo han ascendido por una transición de diapositiva.',
          },
          calloutEmoji: '🛑',
        },
        {
          type: 'sort',
          prompt: {
            en: 'Helps a work presentation, or hurts it?',
            es: '¿Ayuda a una presentación de trabajo, o le hace daño?',
          },
          buckets: [
            { id: 'helps', emoji: '👍', label: { en: 'Helps', es: 'Ayuda' } },
            { id: 'hurts', emoji: '👎', label: { en: 'Hurts', es: 'Hace daño' } },
          ],
          items: [
            {
              id: 'a',
              emoji: '🔤',
              bucket: 'helps',
              label: { en: 'The same font and colours on every slide', es: 'La misma fuente y colores en cada diapositiva' },
              why: {
                en: 'Consistency is most of what makes a deck look professional.',
                es: 'La consistencia es casi todo lo que hace que se vea profesional.',
              },
            },
            {
              id: 'b',
              emoji: '💫',
              bucket: 'hurts',
              label: { en: 'Text that spins in on every slide', es: 'Texto que gira al entrar en cada diapositiva' },
              why: {
                en: 'Animation draws attention away from the point and reads as unserious at work.',
                es: 'La animación distrae del punto y se ve poco seria en el trabajo.',
              },
            },
            {
              id: 'c',
              emoji: '🌗',
              bucket: 'helps',
              label: { en: 'Dark text on a light background', es: 'Texto oscuro sobre fondo claro' },
              why: {
                en: 'Strong contrast is what makes text readable from the back of a room.',
                es: 'El buen contraste es lo que hace el texto legible desde el fondo del salón.',
              },
            },
            {
              id: 'd',
              emoji: '🎪',
              bucket: 'hurts',
              label: { en: 'A different colour scheme on each slide', es: 'Un esquema de colores distinto en cada diapositiva' },
              why: {
                en: 'It looks scattered and makes the deck feel like several unrelated documents.',
                es: 'Se ve disperso y hace que la presentación se sienta como varios documentos sin relación.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Same fonts, colours, and arrangement throughout.', es: 'Mismas fuentes, colores y acomodo en todo.' },
            { en: 'Skip animations and transitions at work.', es: 'Sáltate animaciones y transiciones en el trabajo.' },
            { en: 'Strong contrast; never colour alone to make a point.', es: 'Buen contraste; nunca solo color para marcar algo.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job6-l6',
      emoji: '🔎',
      minutes: 5,
      title: { en: 'Check before sharing', es: 'Revisa antes de compartir' },
      steps: [
        {
          type: 'teach',
          title: { en: 'The last five minutes', es: 'Los últimos cinco minutos' },
          body: [
            {
              en: 'Before a deck leaves your hands: read every slide for **spelling**, check the **order** makes sense, and run it in **presentation mode** once so you see it the way the room will.',
              es: 'Antes de que una presentación salga de tus manos: lee cada diapositiva buscando **errores de ortografía**, revisa que el **orden** tenga sentido, y córrela una vez en **modo presentación** para verla como la verá la sala.',
            },
            {
              en: 'Presentation mode catches things the editing view hides — text running off the edge, a slide you meant to delete, two slides that say the same thing.',
              es: 'El modo presentación atrapa cosas que la vista de edición esconde — texto que se sale de la orilla, una diapositiva que ibas a borrar, dos diapositivas que dicen lo mismo.',
            },
            {
              en: 'Then ask what they actually want: **the PowerPoint file**, **a shared link**, or **a PDF**. All three are normal answers and it costs nothing to ask.',
              es: 'Luego pregunta qué quieren en realidad: **el archivo de PowerPoint**, **un enlace compartido**, o **un PDF**. Las tres son respuestas normales y no cuesta nada preguntar.',
            },
          ],
        },
        {
          type: 'action',
          title: { en: 'Build a four-slide deck', es: 'Arma una presentación de cuatro diapositivas' },
          body: [
            {
              en: 'On a computer, make a short "new employee orientation" deck with exactly four slides: a **title** slide, a **schedule** slide, a **safety reminder** slide, and a **who to contact / what happens next** slide.',
              es: 'En una computadora, haz una presentación corta de «orientación para empleados nuevos» con exactamente cuatro diapositivas: **título**, **horario**, **recordatorio de seguridad**, y **a quién contactar / qué sigue**.',
            },
            {
              en: 'Use a built-in theme, keep each slide to a title and three short bullets, then run it in presentation mode before you call it done.',
              es: 'Usa un tema incluido, mantén cada diapositiva con un título y tres viñetas cortas, y córrela en modo presentación antes de darla por terminada.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Check spelling, slide order, and run presentation mode.', es: 'Revisa ortografía, orden, y corre el modo presentación.' },
            { en: 'Presentation mode catches what editing view hides.', es: 'El modo presentación atrapa lo que la vista de edición esconde.' },
            { en: 'Ask whether they want the file, a link, or a PDF.', es: 'Pregunta si quieren el archivo, un enlace, o un PDF.' },
          ],
        },
      ],
    },
  ],
}
