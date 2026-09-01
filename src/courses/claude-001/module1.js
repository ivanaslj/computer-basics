/**
 * Module 1 — Meet Claude.
 *
 * Audience for this whole course: people already comfortable with a computer
 * (unlike Computer Basics), brand new to AI, mainly curious about using it for
 * work. So this skips re-explaining what clicking or typing is, and gets to
 * the point faster.
 */

export default {
  id: 'c1-m1',
  emoji: '✨',
  color: 'brand',
  title: { en: 'Meet Claude', es: 'Conoce a Claude' },
  subtitle: {
    en: 'What it is, how it works, and what the plans actually get you',
    es: 'Qué es, cómo funciona, y qué obtienes con cada plan',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m1-l1',
      emoji: '👋',
      minutes: 3,
      title: { en: 'What Claude is', es: 'Qué es Claude' },
      steps: [
        {
          type: 'teach',
          title: { en: 'An assistant you talk to in plain language', es: 'Un asistente al que le hablas en lenguaje normal' },
          body: [
            {
              en: '__Claude__ is an AI assistant made by a company called Anthropic. You type a question or a request in ordinary words, and it writes back — also in ordinary words.',
              es: '__Claude__ es un asistente de IA hecho por una empresa llamada Anthropic. Escribes una pregunta o una petición en palabras normales, y te responde — también en palabras normales.',
            },
            {
              en: '"AI" stands for __artificial intelligence__ — software trained on huge amounts of text, which lets it write, explain, summarize, and reason about almost any topic you bring to it.',
              es: '«IA» significa __inteligencia artificial__ — un programa entrenado con una enorme cantidad de texto, lo que le permite escribir, explicar, resumir y razonar sobre casi cualquier tema que le lleves.',
            },
            {
              en: 'You can reach Claude from a website (__claude.ai__), a phone app, a desktop app, or a tool for your terminal called __Claude Code__ — same assistant, different doors in.',
              es: 'Puedes llegar a Claude desde un sitio web (__claude.ai__), una app de teléfono, una app de escritorio, o una herramienta de terminal llamada __Claude Code__ — el mismo asistente, distintas puertas de entrada.',
            },
          ],
          callout: {
            en: 'Think of it less like a search engine and more like a very well-read colleague you can hand things to: "draft this," "explain that," "help me think through this."',
            es: 'Piénsalo menos como un buscador y más como un colega muy leído al que le puedes encargar cosas: «redacta esto», «explícame aquello», «ayúdame a pensar esto».',
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'Which is the closest description of what Claude actually does?',
            es: '¿Cuál describe mejor lo que realmente hace Claude?',
          },
          options: [
            {
              id: 'a',
              emoji: '💬',
              label: {
                en: 'You describe what you want in plain words, and it responds in plain words',
                es: 'Describes lo que quieres en palabras normales, y responde en palabras normales',
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🔍',
              label: { en: 'It gives you a list of links, like a search engine', es: 'Te da una lista de enlaces, como un buscador' },
              why: {
                en: 'That is a search engine. Claude writes you an actual answer, not a list of places to go look.',
                es: 'Eso es un buscador. Claude te escribe una respuesta de verdad, no una lista de lugares a dónde ir.',
              },
            },
            {
              id: 'c',
              emoji: '🤖',
              label: { en: 'It only works if you already know how to code', es: 'Solo funciona si ya sabes programar' },
              why: {
                en: 'Not at all — most of what Claude is useful for has nothing to do with code. Plain conversation is the main way people use it.',
                es: 'Para nada — la mayoría de lo útil de Claude no tiene que ver con programar. La conversación normal es la forma principal de usarlo.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Claude is an AI assistant you talk to in plain language.', es: 'Claude es un asistente de IA al que le hablas en lenguaje normal.' },
            { en: 'You can reach it on the web, on your phone, on your desktop, or through Claude Code.', es: 'Lo puedes usar en la web, en tu teléfono, en tu escritorio, o con Claude Code.' },
            { en: 'No coding needed for ordinary, everyday use.', es: 'No hace falta programar para el uso normal de cada día.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m1-l2',
      emoji: '💬',
      minutes: 3,
      title: { en: 'How a conversation works', es: 'Cómo funciona una conversación' },
      steps: [
        {
          type: 'teach',
          title: { en: 'One thread, one topic', es: 'Un hilo, un tema' },
          body: [
            {
              en: 'Each conversation with Claude is its own __thread__ (also called a __chat__). Everything you say inside it — earlier messages included — is what Claude has in mind while answering your next one.',
              es: 'Cada conversación con Claude es su propio __hilo__ (también llamado __chat__). Todo lo que dices dentro — incluyendo mensajes anteriores — es lo que Claude tiene presente al responder al siguiente.',
            },
            {
              en: 'That is why starting a __new chat__ for a new topic matters: it clears the slate, so old context does not bleed into an unrelated question.',
              es: 'Por eso importa empezar un __chat nuevo__ para un tema distinto: borra la pizarra, para que el contexto anterior no se mezcle con una pregunta sin relación.',
            },
            {
              en: 'You can also give it something to react to — paste in text, or attach a file (a document, a spreadsheet, an image) — and ask about that specifically.',
              es: 'También le puedes dar algo para que reaccione — pega texto, o adjunta un archivo (un documento, una hoja de cálculo, una imagen) — y pregúntale específicamente sobre eso.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'You just finished asking Claude to help plan a trip, and now you want help writing a completely unrelated work email. What should you do?',
            es: 'Acabas de pedirle a Claude que te ayude a planear un viaje, y ahora quieres ayuda con un correo de trabajo sin relación. ¿Qué deberías hacer?',
          },
          options: [
            {
              id: 'a',
              emoji: '➕',
              label: { en: 'Start a new chat for the email', es: 'Empezar un chat nuevo para el correo' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '↩️',
              label: { en: 'Ask about the email in the same trip chat', es: 'Preguntar sobre el correo en el mismo chat del viaje' },
              why: {
                en: 'It would still work, but the trip details are unrelated clutter Claude has to sift through. A fresh chat keeps things clean and often gives a better answer.',
                es: 'Funcionaría igual, pero los detalles del viaje son ruido sin relación que Claude tiene que revisar. Un chat nuevo mantiene las cosas limpias y suele dar mejor respuesta.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'A chat remembers everything said in it, so far.', es: 'Un chat recuerda todo lo dicho en él, hasta ahora.' },
            { en: 'New topic → new chat, so old context does not get in the way.', es: 'Tema nuevo → chat nuevo, para que el contexto anterior no estorbe.' },
            { en: 'You can paste text or attach files for Claude to work from directly.', es: 'Puedes pegar texto o adjuntar archivos para que Claude trabaje directamente con ellos.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m1-l3',
      emoji: '📊',
      minutes: 3,
      title: { en: 'Usage limits and plans', es: 'Límites de uso y planes' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Free, Pro, and Max', es: 'Free, Pro y Max' },
          body: [
            {
              en: 'Claude has three tiers. __Free__ gets you real conversations at no cost, with a usage limit that resets on a rolling schedule. __Pro__ and __Max__ cost a monthly fee and give meaningfully more usage — plus they unlock __Claude Code__ and __Claude Design__, which Free does not include.',
              es: 'Claude tiene tres niveles. __Free__ te da conversaciones reales sin costo, con un límite de uso que se reinicia cada cierto tiempo. __Pro__ y __Max__ cuestan una cuota mensual y dan mucho más uso — además desbloquean __Claude Code__ y __Claude Design__, que Free no incluye.',
            },
            {
              en: 'Exact numbers change over time and are not the point to memorize here — what matters is: if you are doing serious day-to-day work with Claude, Pro is where the useful tools switch on.',
              es: 'Los números exactos cambian con el tiempo y no es lo que hay que memorizar aquí — lo que importa es: si haces trabajo serio con Claude en el día a día, Pro es donde se activan las herramientas útiles.',
            },
          ],
          callout: {
            en: 'If you ever run out of usage, Claude tells you plainly and shows when it resets — it is not a trick or a dead end, just a pause.',
            es: 'Si alguna vez se te acaba el uso, Claude te lo dice claramente y te muestra cuándo se reinicia — no es una trampa ni un callejón sin salida, solo una pausa.',
          },
          calloutEmoji: '⏳',
        },
        {
          type: 'sort',
          prompt: { en: 'Free plan, or does it need Pro/Max?', es: '¿Plan Free, o necesita Pro/Max?' },
          buckets: [
            { id: 'free', emoji: '🆓', label: { en: 'Works on Free', es: 'Funciona en Free' } },
            { id: 'paid', emoji: '💳', label: { en: 'Needs Pro or Max', es: 'Necesita Pro o Max' } },
          ],
          items: [
            {
              id: 'a',
              emoji: '💬',
              bucket: 'free',
              label: { en: 'Chatting with Claude on the website', es: 'Chatear con Claude en el sitio web' },
              why: {
                en: 'Basic conversation is exactly what Free is for — with a smaller usage limit than the paid plans.',
                es: 'La conversación básica es justo para lo que sirve Free — con un límite de uso más chico que los planes pagados.',
              },
            },
            {
              id: 'b',
              emoji: '🧑‍💻',
              bucket: 'paid',
              label: { en: 'Using Claude Code in a terminal', es: 'Usar Claude Code en una terminal' },
              why: {
                en: 'Claude Code comes with Pro and Max, not Free.',
                es: 'Claude Code viene con Pro y Max, no con Free.',
              },
            },
            {
              id: 'c',
              emoji: '🎨',
              bucket: 'paid',
              label: { en: 'Building a poster with Claude Design', es: 'Hacer un póster con Claude Design' },
              why: {
                en: 'Claude Design is also a Pro/Max feature.',
                es: 'Claude Design también es una función de Pro/Max.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Free, Pro and Max are the three plans — each gives more usage than the last.', es: 'Free, Pro y Max son los tres planes — cada uno da más uso que el anterior.' },
            { en: 'Claude Code and Claude Design need Pro or Max.', es: 'Claude Code y Claude Design necesitan Pro o Max.' },
            { en: 'Hitting a limit just means waiting for the reset — check claude.com/pricing for current numbers.', es: 'Llegar al límite solo significa esperar el reinicio — revisa claude.com/pricing para los números actuales.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'c1-m1-l4',
      emoji: '🚀',
      minutes: 5,
      title: { en: 'Project: install Claude and talk to it', es: 'Proyecto: instala Claude y háblale' },
      steps: [
        {
          type: 'teach',
          title: { en: 'A vague ask gets a vague answer', es: 'Una petición vaga recibe una respuesta vaga' },
          body: [
            {
              en: 'Before you go sign up for real, look at the difference one extra sentence makes. Try both messages below and watch what comes back.',
              es: 'Antes de registrarte de verdad, mira la diferencia que hace una oración extra. Prueba los dos mensajes de abajo y observa lo que responde.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'ai',
          prompt: {
            en: 'Choose how you would ask for help writing a message to a coworker.',
            es: 'Elige cómo le pedirías ayuda para escribir un mensaje a un compañero de trabajo.',
          },
          config: {
            assistantName: { en: 'Claude', es: 'Claude' },
            assistantEmoji: '✨',
            opening: {
              en: 'Hi! What can I help you with?',
              es: '¡Hola! ¿En qué te puedo ayudar?',
            },
            best: 'specific',
            options: [
              { id: 'vague', text: { en: 'write an email', es: 'escribe un correo' } },
              {
                id: 'specific',
                text: {
                  en: "Write a short, friendly email to my coworker Sam letting them know Friday's meeting moved to 3pm. Keep it under 3 sentences.",
                  es: 'Escribe un correo corto y amable a mi compañero Sam avisándole que la junta del viernes se movió a las 3pm. Máximo 3 oraciones.',
                },
              },
            ],
            vagueReply: {
              en: 'Happy to help! Who is it for, and what should it say? Give me the details and I will write it.',
              es: '¡Con gusto! ¿Para quién es, y qué debería decir? Dame los detalles y lo escribo.',
            },
            reply: {
              en: '"Hi Sam — quick update: Friday\'s meeting moved to 3pm. See you then!"\n\nWant it more formal, or shorter?',
              es: '«Hola Sam, aviso rápido: la junta del viernes se movió a las 3pm. ¡Nos vemos ahí!»\n\n¿Lo quieres más formal, o más corto?',
            },
          },
        },
        {
          type: 'action',
          title: { en: 'Now for real', es: 'Ahora de verdad' },
          body: [
            {
              en: 'Go to claude.ai and sign up — it takes about a minute, and the Free plan needs no credit card. If you would rather use your phone, search your app store for "Claude by Anthropic."',
              es: 'Ve a claude.ai y regístrate — toma como un minuto, y el plan Free no pide tarjeta. Si prefieres tu teléfono, busca «Claude by Anthropic» en tu tienda de apps.',
            },
            {
              en: 'Once you are in, send Claude one real message about something actually on your plate this week — be as specific as the example above.',
              es: 'Ya adentro, mándale a Claude un mensaje real sobre algo que de verdad tengas pendiente esta semana — sé tan específica como en el ejemplo de arriba.',
            },
          ],
          linkUrl: 'https://claude.ai',
          linkLabel: { en: 'Open claude.ai', es: 'Abrir claude.ai' },
        },
        {
          type: 'recap',
          points: [
            { en: 'Specific requests get specific, useful answers.', es: 'Las peticiones específicas reciben respuestas específicas y útiles.' },
            { en: 'The Free plan needs no credit card and takes about a minute to join.', es: 'El plan Free no pide tarjeta y toma como un minuto registrarse.' },
            { en: 'You just had a real conversation with Claude.', es: 'Acabas de tener una conversación real con Claude.' },
          ],
        },
      ],
    },
  ],
}
