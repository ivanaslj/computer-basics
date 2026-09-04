import { dev } from '../../i18n/content.js'

/**
 * Module 2 — Getting fluent. Finding your way around claude.ai day-to-day,
 * the handful of keyboard shortcuts worth knowing, and how to ask well.
 */

export default {
  id: 'c1-m2',
  icon: 'bolt',
  color: 'grass',
  title: { en: 'Getting fluent', es: 'Ganar soltura' },
  subtitle: {
    en: 'Finding your way around, and asking in a way that gets a good answer',
    es: 'Moverte con soltura, y preguntar de una forma que dé una buena respuesta',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m2-l1',
      icon: 'folders',
      minutes: 3,
      title: { en: 'Finding your way around', es: 'Moverte por la aplicación' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Every chat you have ever had is saved', es: 'Cada chat que has tenido se guarda' },
          body: [
            {
              en: "Claude keeps a running list of your past chats down the side of the screen. Nothing is lost when you close the tab or start something new — everything is there to reopen later.",
              es: 'Claude guarda una lista de tus chats anteriores a un lado de la pantalla. No se pierde nada cuando cierras la pestaña o empiezas algo nuevo — todo está ahí para volver a abrirlo después.',
            },
            {
              en: 'Give an important chat a clearer name (most chats can be renamed from that same list) so you can find it again in a week, not just today.',
              es: 'Ponle un nombre más claro a un chat importante (casi todos los chats se pueden renombrar desde esa misma lista) para poder encontrarlo en una semana, no solo hoy.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'You had a great chat with Claude last Tuesday about restructuring your team\'s meetings, and you want to pick it back up. What do you do?',
            es: 'Tuviste un buen chat con Claude el martes pasado sobre reorganizar las juntas de tu equipo, y quieres retomarlo. ¿Qué haces?',
          },
          options: [
            {
              id: 'a',
              emoji: '🗂️',
              label: { en: 'Find it in your list of past chats and reopen it', es: 'Encontrarlo en tu lista de chats anteriores y reabrirlo' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '➕',
              label: { en: 'Start a brand new chat and explain everything again', es: 'Empezar un chat nuevo y explicar todo otra vez' },
              why: {
                en: 'That works, but it throws away everything Claude already knew from Tuesday. Reopening the old chat picks up right where you left off.',
                es: 'Funciona, pero tira todo lo que Claude ya sabía del martes. Reabrir el chat viejo continúa justo donde lo dejaste.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Past chats are saved automatically — nothing to do to keep them.', es: 'Los chats anteriores se guardan solos — no hay que hacer nada para conservarlos.' },
            { en: 'Rename an important one so future-you can find it.', es: 'Cambia el nombre a uno importante para que tu yo futuro lo encuentre.' },
            { en: 'Reopen a past chat to continue it, rather than starting over.', es: 'Reabre un chat anterior para continuarlo, en vez de empezar de cero.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m2-l2',
      icon: 'keyboard',
      minutes: 4,
      title: { en: 'Keyboard shortcuts for Claude', es: 'Atajos de teclado para Claude' },
      steps: [
        {
          type: 'teach',
          title: { en: 'A couple worth building into habit', es: 'Un par que vale la pena volver costumbre' },
          body: [
            {
              en: 'On claude.ai, [[Ctrl]] + [[Shift]] + [[O]] starts a brand new chat instantly, without touching the mouse.',
              es: 'En claude.ai, [[Ctrl]] + [[Shift]] + [[O]] empieza un chat nuevo al instante, sin tocar el ratón.',
            },
            {
              en: dev(
                'On a Mac, it is [[Command]] + [[Shift]] + [[O]] — same idea, the usual key swap.',
                'On a Mac, it is [[Command]] + [[Shift]] + [[O]] — same idea, the usual key swap.'
              ),
              es: 'En Mac, es [[Command]] + [[Shift]] + [[O]] — la misma idea, el cambio de tecla de siempre.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'keys',
          prompt: { en: 'Start a new chat.', es: 'Empieza un chat nuevo.' },
          config: {
            combo: dev(['Ctrl', 'Shift', 'O'], ['Command', 'Shift', 'O']),
            letters: ['O', 'K', 'F', 'N'],
          },
        },
        {
          type: 'teach',
          title: { en: 'Jumping to an old chat', es: 'Saltar a un chat anterior' },
          body: [
            {
              en: dev(
                '[[Ctrl]] + [[K]] opens a quick search box that jumps straight to any past chat by name — much faster than scrolling the list.',
                '[[Command]] + [[K]] opens a quick search box that jumps straight to any past chat by name — much faster than scrolling the list.'
              ),
              es: dev(
                '[[Ctrl]] + [[K]] abre una casilla de búsqueda rápida que salta directo a cualquier chat anterior por nombre — mucho más rápido que desplazarse por la lista.',
                '[[Command]] + [[K]] abre una casilla de búsqueda rápida que salta directo a cualquier chat anterior por nombre — mucho más rápido que desplazarse por la lista.'
              ),
            },
          ],
          callout: {
            en: 'One more good one to know: [[Esc]] stops Claude mid-answer if it is heading somewhere you did not want.',
            es: 'Otro bueno para saber: [[Esc]] detiene a Claude a medio responder si va por un camino que no querías.',
          },
        },
        {
          type: 'sim',
          sim: 'keys',
          prompt: { en: 'Open the search box to jump to an old chat.', es: 'Abre la casilla de búsqueda para saltar a un chat anterior.' },
          config: {
            combo: dev(['Ctrl', 'K'], ['Command', 'K']),
            letters: ['K', 'O', 'F', 'N'],
          },
        },
        {
          type: 'recap',
          points: [
            { en: dev('New chat: Ctrl + Shift + O.', 'New chat: ⌘ + Shift + O.'), es: dev('Chat nuevo: Ctrl + Shift + O.', 'Chat nuevo: ⌘ + Shift + O.') },
            { en: dev('Search past chats: Ctrl + K.', 'Search past chats: ⌘ + K.'), es: dev('Buscar chats anteriores: Ctrl + K.', 'Buscar chats anteriores: ⌘ + K.') },
            { en: 'Esc stops a response that is going the wrong way.', es: 'Esc detiene una respuesta que va por mal camino.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m2-l3',
      icon: 'target',
      minutes: 4,
      title: { en: 'Asking well', es: 'Preguntar bien' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Three things that always help', es: 'Tres cosas que siempre ayudan' },
          body: [
            {
              en: '**Say what you want.** Not just the topic — the actual outcome. "Summarize this" is fine; "summarize this in 3 bullet points for my boss" is better.',
              es: '**Di qué quieres.** No solo el tema — el resultado real. «Resume esto» está bien; «resume esto en 3 puntos para mi jefe» es mejor.',
            },
            {
              en: '**Give it the context it needs.** Paste the email, attach the document, describe the situation. Claude cannot see anything you have not told it.',
              es: '**Dale el contexto que necesita.** Pega el correo, adjunta el documento, describe la situación. Claude no puede ver nada que no le hayas contado.',
            },
            {
              en: '**Keep talking.** The first answer is a draft, not a verdict. "Shorter." "More formal." "Try again, but funnier." It remembers what you were doing.',
              es: '**Sigue hablando.** La primera respuesta es un borrador, no un veredicto. «Más corto». «Más formal». «Intenta de nuevo, pero más chistoso». Recuerda en qué estaban.',
            },
          ],
          callout: {
            en: 'Nobody writes the perfect prompt on the first try, including people who do this every day. Iterating is the normal way to use it, not a sign you did it wrong.',
            es: 'Nadie escribe el prompt perfecto al primer intento, ni la gente que lo hace todos los días. Iterar es la forma normal de usarlo, no una señal de que lo hiciste mal.',
          },
          calloutIcon: 'shuffle',
        },
        {
          type: 'choice',
          prompt: {
            en: 'Claude\'s first draft of your report summary is too long. What is the best next move?',
            es: 'El primer borrador del resumen de tu reporte quedó muy largo. ¿Cuál es el mejor siguiente paso?',
          },
          options: [
            {
              id: 'a',
              emoji: '✂️',
              label: { en: 'Reply "make this half as long" in the same chat', es: 'Responder «hazlo la mitad de largo» en el mismo chat' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🔄',
              label: { en: 'Start over from scratch in a new chat', es: 'Empezar de cero en un chat nuevo' },
              why: {
                en: 'No need — Claude already has the full report and the draft. Just ask for the change directly.',
                es: 'No hace falta — Claude ya tiene el reporte completo y el borrador. Solo pide el cambio directamente.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Say the outcome you want, not just the topic.', es: 'Di el resultado que quieres, no solo el tema.' },
            { en: 'Give it the context — paste, attach, describe.', es: 'Dale el contexto — pega, adjunta, describe.' },
            { en: 'Keep refining in the same chat. That is normal, not a failure.', es: 'Sigue afinando en el mismo chat. Eso es normal, no un fracaso.' },
          ],
        },
      ],
    },
  ],
}
