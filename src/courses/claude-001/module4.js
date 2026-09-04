import { dev } from '../../i18n/content.js'

/**
 * Module 4 — Claude Code & Claude Design. Deliberately an overview, not a deep
 * dive — a full "Claude Code" course is a separate, future track. Here, just
 * enough to try each once and see the value.
 */

export default {
  id: 'c1-m4',
  icon: 'code',
  color: 'berry',
  title: { en: 'Claude Code & Claude Design', es: 'Claude Code y Claude Design' },
  subtitle: {
    en: 'Two more doors into Claude — a taste of each, not the whole tour',
    es: 'Dos puertas más hacia Claude — una probada de cada una, no el recorrido completo',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m4-l1',
      icon: 'code',
      minutes: 3,
      title: { en: 'What Claude Code is', es: 'Qué es Claude Code' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Claude, but working directly on your files', es: 'Claude, pero trabajando directo en tus archivos' },
          body: [
            {
              en: 'Regular Claude talks with you. __Claude Code__ can additionally *read your actual files, run programs, and make real changes on your computer* — while you watch and approve, in plain conversation.',
              es: 'El Claude normal conversa contigo. __Claude Code__ además puede *leer tus archivos de verdad, correr programas, y hacer cambios reales en tu computadora* — mientras tú miras y apruebas, en una conversación normal.',
            },
            {
              en: 'It runs in a __terminal__ (a plain text window for typing commands) or right in your browser at claude.ai/code — no terminal required for that second option.',
              es: 'Corre en una __terminal__ (una ventana de texto sencillo para escribir comandos) o directo en tu navegador en claude.ai/code — sin necesidad de terminal para esa segunda opción.',
            },
            {
              en: 'People assume it is only for programmers because of the name. It genuinely is not — organizing files, reading through a folder of documents, summarizing a project are all things it does well, no coding required from you.',
              es: 'La gente asume que es solo para programadores por el nombre. De verdad no lo es — organizar archivos, leer una carpeta de documentos, resumir un proyecto son cosas que hace bien, sin que tú tengas que programar nada.',
            },
          ],
          callout: {
            en: 'Comes with Pro and Max, not Free (from Module 1).',
            es: 'Viene con Pro y Max, no con Free (de lo que vimos en el Módulo 1).',
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'Do you need to know how to write code to get value out of Claude Code?',
            es: '¿Necesitas saber programar para sacarle provecho a Claude Code?',
          },
          options: [
            {
              id: 'a',
              emoji: '🙅',
              label: { en: 'No — plain-English requests work for plenty of tasks', es: 'No — las peticiones en lenguaje normal sirven para muchas tareas' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '👨‍💻',
              label: { en: "Yes, it's only useful for software developers", es: 'Sí, solo sirve para desarrolladores de software' },
              why: {
                en: 'It is especially powerful for developers, but reading files, organizing folders, and summarizing documents need zero coding knowledge.',
                es: 'Es especialmente poderoso para desarrolladores, pero leer archivos, organizar carpetas y resumir documentos no necesitan saber programar.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Claude Code works directly with your real files, not just chat.', es: 'Claude Code trabaja directo con tus archivos reales, no solo chat.' },
            { en: 'Use it in a terminal, or with no install at all at claude.ai/code.', es: 'Úsalo en una terminal, o sin instalar nada en claude.ai/code.' },
            { en: 'No coding knowledge required for everyday, non-technical tasks.', es: 'No hace falta saber programar para tareas del día a día, no técnicas.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m4-l2',
      icon: 'rocket',
      minutes: 5,
      title: { en: 'Project: your first Claude Code prompt', es: 'Proyecto: tu primer prompt en Claude Code' },
      steps: [
        {
          type: 'action',
          title: { en: 'Get in, then ask one question', es: 'Entra, y luego haz una pregunta' },
          body: [
            {
              en: 'Easiest way in, no installing anything: open claude.ai/code in your browser and sign in.',
              es: 'La forma más fácil de entrar, sin instalar nada: abre claude.ai/code en tu navegador e inicia sesión.',
            },
            {
              en: dev(
                'Prefer the real terminal app on your computer? Open it, paste this, then press Enter: **curl -fsSL https://claude.ai/install.sh | bash** — then type **claude** and press Enter to start.',
                'Prefer the real terminal app on your computer? Open PowerShell, paste this, then press Enter: **irm https://claude.ai/install.ps1 | iex** — then type **claude** and press Enter to start.'
              ),
              es: dev(
                '¿Prefieres la terminal de verdad en tu computadora? Ábrela, pega esto, y presiona Enter: **curl -fsSL https://claude.ai/install.sh | bash** — después escribe **claude** y presiona Enter para empezar.',
                '¿Prefieres la terminal de verdad en tu computadora? Abre PowerShell, pega esto, y presiona Enter: **irm https://claude.ai/install.ps1 | iex** — después escribe **claude** y presiona Enter para empezar.'
              ),
            },
            {
              en: 'Either way, once you are in a folder with some files in it (any folder — documents, photos, whatever you have), copy the question below and send it.',
              es: 'De cualquier forma, una vez que estés en una carpeta con algunos archivos (cualquier carpeta — documentos, fotos, lo que tengas), copia la pregunta de abajo y envíala.',
            },
          ],
          copyText: {
            en: 'Look at the files in this folder and tell me, in plain English, what each one is.',
            es: 'Mira los archivos de esta carpeta y dime, en palabras simples, qué es cada uno.',
          },
          linkUrl: 'https://claude.ai/code',
          linkLabel: { en: 'Open claude.ai/code', es: 'Abrir claude.ai/code' },
        },
        {
          type: 'recap',
          points: [
            { en: 'claude.ai/code needs no install at all.', es: 'claude.ai/code no necesita instalar nada.' },
            { en: 'A plain question about real files is a perfectly good first try.', es: 'Una pregunta simple sobre archivos reales es un buen primer intento.' },
            { en: 'You just had Claude Code look at something real on your computer.', es: 'Acabas de hacer que Claude Code viera algo real en tu computadora.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m4-l3',
      icon: 'broom',
      minutes: 5,
      title: { en: 'Project: make your first skill', es: 'Proyecto: crea tu primer skill' },
      steps: [
        {
          type: 'teach',
          title: { en: 'skill-creator builds skills for you', es: 'skill-creator crea skills por ti' },
          body: [
            {
              en: 'Back in Module 3 we mentioned __skill-creator__ — a skill whose whole job is helping you build your own. Install it once inside Claude Code, and you can make a skill any time you have a task worth repeating.',
              es: 'En el Módulo 3 mencionamos __skill-creator__ — un skill cuyo trabajo es ayudarte a crear los tuyos. Instálalo una vez dentro de Claude Code, y puedes crear un skill cuando tengas una tarea que valga la pena repetir.',
            },
          ],
        },
        {
          type: 'action',
          title: { en: 'Install it', es: 'Instálalo' },
          body: [
            {
              en: 'Inside Claude Code (claude.ai/code, or your terminal from the last lesson), copy this and send it.',
              es: 'Dentro de Claude Code (claude.ai/code, o tu terminal de la lección pasada), copia esto y envíalo.',
            },
            {
              en: 'Once it installs, type /skill-creator and pick "Create" to try making a skill for something you actually do often.',
              es: 'Una vez instalado, escribe /skill-creator y elige «Create» para intentar hacer un skill de algo que hagas seguido.',
            },
          ],
          copyText: '/plugin install skill-creator@claude-plugins-official',
        },
        {
          type: 'recap',
          points: [
            { en: 'skill-creator is installed the same way any plugin is: /plugin install.', es: 'skill-creator se instala igual que cualquier plugin: /plugin install.' },
            { en: 'Once installed, /skill-creator walks you through building one.', es: 'Una vez instalado, /skill-creator te guía para crear uno.' },
            { en: 'You now have the tool to turn any repeat task into a reusable skill.', es: 'Ya tienes la herramienta para convertir cualquier tarea repetida en un skill reutilizable.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m4-l4',
      icon: 'palette',
      minutes: 3,
      title: { en: 'What Claude Design is', es: 'Qué es Claude Design' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Describe it, then click to fix it', es: 'Descríbelo, y luego dale clic para ajustarlo' },
          body: [
            {
              en: '__Claude Design__ turns a written description into a real visual — a poster, a one-page flyer, a simple slide, a landing page mockup — that you can then click on to move, resize, or edit directly, no design software needed.',
              es: '__Claude Design__ convierte una descripción escrita en un visual real — un póster, un volante de una página, una diapositiva sencilla, una maqueta de página web — que luego puedes clicar para mover, cambiar de tamaño o editar directamente, sin necesitar software de diseño.',
            },
            {
              en: 'It lives at claude.ai/design, works entirely in your browser, and comes with Pro and Max.',
              es: 'Vive en claude.ai/design, funciona por completo en tu navegador, y viene con Pro y Max.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'What do you get back after describing a design to Claude Design?',
            es: '¿Qué recibes después de describirle un diseño a Claude Design?',
          },
          options: [
            {
              id: 'a',
              emoji: '🖱️',
              label: { en: 'A visual you can click on to edit directly', es: 'Un visual que puedes clicar para editar directamente' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '📝',
              label: { en: 'Only a written description of what it would look like', es: 'Solo una descripción escrita de cómo se vería' },
              why: {
                en: 'It builds the actual visual, not just a description of one — and you can then click into it to change things.',
                es: 'Construye el visual de verdad, no solo una descripción — y luego le puedes dar clic para cambiar cosas.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Claude Design turns a description into a real, editable visual.', es: 'Claude Design convierte una descripción en un visual real y editable.' },
            { en: 'It lives at claude.ai/design, no extra software needed.', es: 'Vive en claude.ai/design, sin necesitar software extra.' },
            { en: 'Posters, flyers, slides, and page mockups are all fair game.', es: 'Pósters, volantes, diapositivas y maquetas de páginas son posibles.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m4-l5',
      icon: 'image',
      minutes: 5,
      title: { en: 'Project: make something with Claude Design', es: 'Proyecto: crea algo con Claude Design' },
      steps: [
        {
          type: 'action',
          title: { en: 'Describe something small and real', es: 'Describe algo pequeño y real' },
          body: [
            {
              en: 'Open Claude Design and describe one simple thing you could actually use — a flyer for a garage sale, a one-page agenda for a meeting, a simple thank-you card.',
              es: 'Abre Claude Design y describe algo sencillo que de verdad podrías usar — un volante para una venta de garaje, una agenda de una página para una junta, una tarjeta de agradecimiento simple.',
            },
            {
              en: 'When it appears, click directly on a piece of it — the text, a color, a shape — and try changing just that one thing.',
              es: 'Cuando aparezca, dale clic directo a una parte — el texto, un color, una figura — e intenta cambiar solo esa cosa.',
            },
          ],
          copyText: {
            en: 'Make a simple one-page flyer for a neighborhood garage sale this Saturday, 9am to 2pm.',
            es: 'Haz un volante sencillo de una página para una venta de garaje del vecindario este sábado, de 9am a 2pm.',
          },
          linkUrl: 'https://claude.ai/design',
          linkLabel: { en: 'Open claude.ai/design', es: 'Abrir claude.ai/design' },
        },
        {
          type: 'recap',
          points: [
            { en: 'A short, plain description is enough to start.', es: 'Una descripción corta y simple basta para empezar.' },
            { en: 'Click any part of the result to edit it directly.', es: 'Dale clic a cualquier parte del resultado para editarla directamente.' },
            { en: 'You have now tried every door into Claude covered in this course.', es: 'Ya probaste todas las puertas hacia Claude que vimos en este curso.' },
          ],
        },
      ],
    },
  ],
}
