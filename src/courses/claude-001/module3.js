/**
 * Module 3 — Extending Claude. The vocabulary (skill / connector / plugin)
 * that everything else in the ecosystem is built from, then a real project:
 * connecting one of your own apps.
 */

export default {
  id: 'c1-m3',
  number: 3,
  emoji: '🧩',
  color: 'sun',
  title: { en: 'Extending Claude', es: 'Extender a Claude' },
  subtitle: {
    en: 'Skills, connectors, and plugins — what each word actually means',
    es: 'Skills, connectors y plugins — qué significa cada palabra',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m3-l1',
      emoji: '🗺️',
      minutes: 4,
      title: { en: 'The conceptual map', es: 'El mapa de conceptos' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Three words, three jobs', es: 'Tres palabras, tres trabajos' },
          body: [
            {
              en: 'A __skill__ teaches Claude *how* to do something — a saved set of instructions for a specific kind of task, like an instruction manual it can follow on request.',
              es: 'Un __skill__ le enseña a Claude *cómo* hacer algo — un conjunto de instrucciones guardadas para un tipo de tarea específico, como un manual que puede seguir cuando se lo pides.',
            },
            {
              en: 'A __connector__ gives Claude *access* to one of your other apps — your Google Drive, your calendar, your team\'s chat tool — so it can read from or act inside something real, not just talk.',
              es: 'Un __connector__ le da a Claude *acceso* a una de tus otras aplicaciones — tu Google Drive, tu calendario, el chat de tu equipo — para que pueda leer o actuar dentro de algo real, no solo hablar.',
            },
            {
              en: 'A __plugin__ bundles several skills and connectors together into one install, built for a specific job — the whole kitchen, stocked and ready, instead of one utensil at a time.',
              es: 'Un __plugin__ empaqueta varios skills y connectors juntos en una sola instalación, hecha para un trabajo específico — toda la cocina, surtida y lista, en vez de un utensilio a la vez.',
            },
          ],
          callout: {
            en: 'Skill = instruction manual. Connector = the plumbing to a real tool. Plugin = both, bundled for a job.',
            es: 'Skill = manual de instrucciones. Connector = la conexión a una herramienta real. Plugin = ambos, empaquetados para un trabajo.',
          },
        },
        {
          type: 'sort',
          prompt: { en: 'Skill, connector, or plugin?', es: '¿Skill, connector, o plugin?' },
          buckets: [
            { id: 'skill', emoji: '📖', label: { en: 'Skill', es: 'Skill' } },
            { id: 'connector', emoji: '🔌', label: { en: 'Connector', es: 'Connector' } },
            { id: 'plugin', emoji: '🧰', label: { en: 'Plugin', es: 'Plugin' } },
          ],
          items: [
            {
              id: 'a',
              emoji: '📅',
              bucket: 'connector',
              label: { en: 'Letting Claude see your calendar', es: 'Dejar que Claude vea tu calendario' },
              why: {
                en: 'That is access to a real app — the definition of a connector.',
                es: 'Eso es acceso a una aplicación real — la definición de un connector.',
              },
            },
            {
              id: 'b',
              emoji: '📝',
              bucket: 'skill',
              label: { en: 'A saved set of steps for formatting a weekly report the same way every time', es: 'Un conjunto de pasos guardado para formatear un reporte semanal siempre igual' },
              why: {
                en: 'A repeatable "how to do this task" instruction is exactly what a skill is.',
                es: 'Una instrucción repetible de «cómo hacer esta tarea» es justo lo que es un skill.',
              },
            },
            {
              id: 'c',
              emoji: '📦',
              bucket: 'plugin',
              label: { en: 'One install that sets up several tools at once for handling customer support', es: 'Una instalación que prepara varias herramientas de golpe para soporte al cliente' },
              why: {
                en: 'Bundling several skills/connectors into one job-focused install is a plugin.',
                es: 'Empaquetar varios skills/connectors en una instalación enfocada en un trabajo es un plugin.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Skill: teaches Claude how to do a task.', es: 'Skill: le enseña a Claude cómo hacer una tarea.' },
            { en: 'Connector: gives Claude access to one of your real apps.', es: 'Connector: le da a Claude acceso a una de tus aplicaciones reales.' },
            { en: 'Plugin: several skills/connectors bundled for one job.', es: 'Plugin: varios skills/connectors empaquetados para un trabajo.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m3-l2',
      emoji: '⭐',
      minutes: 3,
      title: { en: 'Which skills to install first', es: 'Qué skills instalar primero' },
      steps: [
        {
          type: 'teach',
          title: { en: 'You already have more than you think', es: 'Ya tienes más de lo que crees' },
          body: [
            {
              en: 'Before installing anything: Claude can already create real Word documents, Excel spreadsheets (with working formulas), PowerPoint slides, and PDFs, right out of the conversation — no skill to add for that.',
              es: 'Antes de instalar nada: Claude ya puede crear documentos de Word de verdad, hojas de Excel (con fórmulas que funcionan), diapositivas de PowerPoint, y PDFs, directo desde la conversación — no hace falta agregar nada para eso.',
            },
            {
              en: 'For anything more specific to your own job — a particular report format, a recurring workflow — the marketplace of skills built by others is worth a browse once you are comfortable with the basics.',
              es: 'Para algo más específico de tu propio trabajo — un formato de reporte particular, un flujo recurrente — vale la pena explorar el mercado de skills hechos por otros una vez que ya domines lo básico.',
            },
            {
              en: 'And there is one skill worth installing before any other: __skill-creator__, which helps you build your own. You will do exactly that in the next module.',
              es: 'Y hay un skill que vale la pena instalar antes que cualquier otro: __skill-creator__, que te ayuda a crear los tuyos. Eso harás exactamente en el próximo módulo.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'You want a PowerPoint deck made from your notes. What do you need to install first?',
            es: 'Quieres unas diapositivas de PowerPoint hechas a partir de tus notas. ¿Qué necesitas instalar primero?',
          },
          options: [
            {
              id: 'a',
              emoji: '🙅',
              label: { en: 'Nothing — just ask Claude directly', es: 'Nada — solo pídeselo directamente a Claude' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🧩',
              label: { en: 'A "PowerPoint skill" from the marketplace', es: 'Un «skill de PowerPoint» del mercado' },
              why: {
                en: 'Not needed — creating slide decks is already built in.',
                es: 'No hace falta — crear presentaciones ya viene incluido.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Word, Excel, PowerPoint, and PDF creation are already built in — no install.', es: 'Crear Word, Excel, PowerPoint y PDF ya viene incluido — sin instalar nada.' },
            { en: 'The skill marketplace is there for job-specific needs, once you know your way around.', es: 'El mercado de skills está ahí para necesidades específicas de tu trabajo, una vez que ya te ubiques.' },
            { en: 'skill-creator is the one worth installing first — it helps you make your own.', es: 'skill-creator es el que vale la pena instalar primero — te ayuda a crear los tuyos.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m3-l3',
      emoji: '🔌',
      minutes: 5,
      title: { en: 'Project: install a connector', es: 'Proyecto: instala un connector' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Give Claude one real thing to look at', es: 'Dale a Claude una cosa real para ver' },
          body: [
            {
              en: 'On claude.ai, connectors live under your account settings. Look for a section called __Connectors__ (sometimes shown under "Settings" → "Connectors" or a similar wording — Anthropic updates the menu from time to time, so if the exact spot has moved, the search box in Settings will find it).',
              es: 'En claude.ai, los connectors están en la configuración de tu cuenta. Busca una sección llamada __Connectors__ (a veces aparece en «Ajustes» → «Connectors» o algo parecido — Anthropic actualiza el menú de vez en cuando, así que si el lugar exacto cambió, la casilla de búsqueda en Ajustes lo encuentra).',
            },
            {
              en: 'Pick one you actually use — Google Drive and Google Calendar are common first choices — and follow its own sign-in steps to connect it.',
              es: 'Elige uno que de verdad uses — Google Drive y Google Calendar son opciones comunes para empezar — y sigue sus propios pasos de inicio de sesión para conectarlo.',
            },
            {
              en: 'Once it is connected, try asking Claude something that needs it: "what is on my calendar this week?" or "find the budget spreadsheet in my Drive and summarize it."',
              es: 'Una vez conectado, pruébalo pidiéndole a Claude algo que lo necesite: «¿qué tengo en el calendario esta semana?» o «busca la hoja de presupuesto en mi Drive y resúmela».',
            },
          ],
          callout: {
            en: 'Only connect accounts you are comfortable letting Claude read from. You can disconnect any connector the same way you added it, any time.',
            es: 'Conecta solo cuentas que te parezca bien que Claude pueda leer. Puedes desconectar cualquier connector de la misma forma que lo agregaste, cuando quieras.',
          },
          calloutEmoji: '🔒',
        },
        {
          type: 'action',
          title: { en: 'Connect one', es: 'Conecta uno' },
          body: [
            {
              en: 'Open Settings on claude.ai, find Connectors, connect one app you actually use, then ask Claude a real question that needs it.',
              es: 'Abre Ajustes en claude.ai, busca Connectors, conecta una aplicación que de verdad uses, y luego hazle a Claude una pregunta real que lo necesite.',
            },
          ],
          linkUrl: 'https://claude.ai/settings/connectors',
          linkLabel: { en: 'Open Connectors settings', es: 'Abrir ajustes de Connectors' },
        },
        {
          type: 'recap',
          points: [
            { en: 'Connectors live in your account settings on claude.ai.', es: 'Los connectors están en la configuración de tu cuenta en claude.ai.' },
            { en: 'Connect only what you use, and only what you are comfortable sharing.', es: 'Conecta solo lo que usas, y solo lo que te parezca bien compartir.' },
            { en: 'You can disconnect anything, any time.', es: 'Puedes desconectar cualquier cosa, cuando quieras.' },
          ],
        },
      ],
    },
  ],
}
