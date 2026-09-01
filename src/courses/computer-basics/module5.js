/**
 * Module 5 — Searching, and not getting caught.
 *
 * The scam-awareness lesson is the most important one in the course. It is
 * built around recognition rather than rules: the learner sees a real-looking
 * fake, picks it out, and is told exactly which detail gave it away.
 */

const RESULTS_PLUMBER = [
  {
    id: 'ad1',
    kind: 'ad',
    url: 'quickfix-pros.com',
    title: { en: 'Emergency Plumber — Call Now, 24/7', es: 'Plomero de emergencia — Llame ya, 24/7' },
    snippet: {
      en: 'Fast service in your area. Rates from $49. Book online today.',
      es: 'Servicio rápido en tu zona. Desde $49. Reserva hoy en línea.',
    },
  },
  {
    id: 'ad2',
    kind: 'ad',
    url: 'homeservices-deals.net',
    title: { en: 'Top 10 Plumbers Near You (2026)', es: 'Los 10 mejores plomeros cerca de ti (2026)' },
    snippet: {
      en: 'Compare prices instantly. Enter your details to see local results.',
      es: 'Compara precios al instante. Ingresa tus datos para ver resultados locales.',
    },
  },
  {
    id: 'real',
    kind: 'organic',
    url: 'cityofriverside.gov/licensed-trades',
    title: {
      en: 'Licensed plumbers — City of Riverside',
      es: 'Plomeros con licencia — Ciudad de Riverside',
    },
    snippet: {
      en: 'The official list of plumbers licensed to work in the city, with licence numbers.',
      es: 'La lista oficial de plomeros con licencia para trabajar en la ciudad, con números de licencia.',
    },
  },
]

const RESULTS_SCAM = [
  {
    id: 'scam',
    kind: 'scam',
    url: 'pc-alert-security-fix.info',
    title: {
      en: '⚠ WARNING: Your computer may be infected — call 1-800-555-0132',
      es: '⚠ ADVERTENCIA: Tu computadora puede estar infectada — llama al 1-800-555-0132',
    },
    snippet: {
      en: 'Certified technicians standing by. Do not turn off your computer. Call immediately.',
      es: 'Técnicos certificados esperando. No apagues tu computadora. Llama de inmediato.',
    },
  },
  {
    id: 'real',
    kind: 'organic',
    url: 'consumer.ftc.gov/scams/tech-support',
    title: {
      en: 'How to spot a tech support scam',
      es: 'Cómo reconocer una estafa de soporte técnico',
    },
    snippet: {
      en: 'Government guidance on fake warnings, and what to do if you have already called one.',
      es: 'Guía del gobierno sobre advertencias falsas, y qué hacer si ya llamaste a una.',
    },
  },
  {
    id: 'ad',
    kind: 'ad',
    url: 'super-pc-cleaner.com',
    title: { en: 'Speed up your slow PC — free scan', es: 'Acelera tu PC lenta — escaneo gratis' },
    snippet: {
      en: 'Download our tool to remove junk files and boost performance instantly.',
      es: 'Descarga nuestra herramienta para quitar archivos basura y mejorar el rendimiento.',
    },
  },
]

export default {
  id: 'm5',
  number: 5,
  emoji: '🔍',
  color: 'grass',
  title: { en: 'Searching, safely', es: 'Buscar, con seguridad' },
  subtitle: {
    en: 'Finding good answers, and spotting the traps',
    es: 'Encontrar buenas respuestas, y ver las trampas',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm5-l1',
      emoji: '💬',
      minutes: 4,
      title: { en: 'Asking a good question', es: 'Hacer una buena pregunta' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Search with the important words', es: 'Busca con las palabras importantes' },
          body: [
            {
              en: 'A search box is not a person. It matches **words**. So give it the words that matter and leave out the polite ones.',
              es: 'Una casilla de búsqueda no es una persona. Empareja **palabras**. Así que dale las palabras importantes y deja fuera las de cortesía.',
            },
            {
              en: 'Instead of "could you please tell me what time the pharmacy on Main Street closes", type: **pharmacy Main Street hours**.',
              es: 'En vez de «podrías decirme por favor a qué hora cierra la farmacia de la calle Principal», escribe: **farmacia calle Principal horario**.',
            },
          ],
          callout: {
            en: 'Add your town or city to anything local. "Dentist" gives you the world. "Dentist Riverside" gives you your neighbourhood.',
            es: 'Agrega tu ciudad a lo local. «Dentista» te da el mundo. «Dentista Riverside» te da tu colonia.',
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'You want to know why your knee hurts when you climb stairs. What is the better search?',
            es: 'Quieres saber por qué te duele la rodilla al subir escaleras. ¿Cuál es la mejor búsqueda?',
          },
          options: [
            {
              id: 'a',
              emoji: '🎯',
              label: { en: 'knee pain climbing stairs causes', es: 'dolor de rodilla al subir escaleras causas' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '💭',
              label: { en: 'help', es: 'ayuda' },
              why: {
                en: 'Too few words — the search does not know what about. Add the important ones.',
                es: 'Muy pocas palabras — la búsqueda no sabe de qué. Agrega las importantes.',
              },
            },
            {
              id: 'c',
              emoji: '📝',
              label: {
                en: 'Hello, I am wondering if you could kindly explain to me why my knee has been hurting',
                es: 'Hola, me pregunto si podrías explicarme amablemente por qué me ha estado doliendo la rodilla',
              },
              why: {
                en: 'It will still work, but the extra words get in the way. Trim it to the ones that matter.',
                es: 'Sí funcionaría, pero las palabras extra estorban. Recórtala a las que importan.',
              },
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'If you do not find it, change a word', es: 'Si no lo encuentras, cambia una palabra' },
          body: [
            {
              en: 'A bad first search is normal, even for people who do this all day. Change one or two words and try again.',
              es: 'Una primera búsqueda mala es normal, hasta para quien hace esto todo el día. Cambia una o dos palabras e inténtalo otra vez.',
            },
            {
              en: 'Searching is a conversation, not a single command.',
              es: 'Buscar es una conversación, no un solo mandato.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Use the important words, not full sentences.', es: 'Usa las palabras importantes, no oraciones completas.' },
            { en: 'Add your town for anything local.', es: 'Agrega tu ciudad para lo local.' },
            { en: 'Not finding it? Change a word and search again.', es: '¿No lo encuentras? Cambia una palabra y busca otra vez.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm5-l2',
      emoji: '📋',
      minutes: 5,
      title: { en: 'Reading the results', es: 'Leer los resultados' },
      steps: [
        {
          type: 'teach',
          title: { en: 'The first result is not the best result', es: 'El primer resultado no es el mejor' },
          body: [
            {
              en: 'The top few results are often __ads__ — companies **paid** to be put there. They are marked with a small word like **Sponsored** or **Ad**, and it is easy to miss.',
              es: 'Los primeros resultados suelen ser __anuncios__ — empresas que **pagaron** por estar ahí. Vienen marcados con una palabrita como **Patrocinado** o **Anuncio**, y es fácil no verla.',
            },
            {
              en: 'An ad is not necessarily bad. But it was chosen by money, not by being the best answer to your question.',
              es: 'Un anuncio no es necesariamente malo. Pero lo eligió el dinero, no el ser la mejor respuesta a tu pregunta.',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'Read the green address', es: 'Lee la dirección verde' },
          body: [
            {
              en: 'Under each result is the website address. That tells you **who is talking**.',
              es: 'Debajo de cada resultado está la dirección del sitio. Eso te dice **quién está hablando**.',
            },
            {
              en: 'Addresses ending in **.gov** are governments. **.edu** are universities. A hospital or a big newspaper you recognise is usually solid. A name you have never heard, full of dashes, is worth a second look.',
              es: 'Las direcciones que terminan en **.gob** o **.gov** son gobiernos. **.edu** son universidades. Un hospital o un periódico grande que reconoces suele ser confiable. Un nombre que nunca oíste, lleno de guiones, merece una segunda mirada.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'browser',
          prompt: {
            en: 'You searched for a plumber. Tap the result you would **trust the most**.',
            es: 'Buscaste un plomero. Toca el resultado en el que **más confiarías**.',
          },
          config: {
            goal: 'pickresult',
            target: 'real',
            page: 'results',
            chrome: false,
            url: 'search?plumber+riverside',
            results: RESULTS_PLUMBER,
            tabs: [{ id: 't1', favicon: '🔍', title: { en: 'plumber riverside', es: 'plomero riverside' } }],
          },
        },
        {
          type: 'recap',
          points: [
            { en: 'Top results are often paid ads.', es: 'Los primeros resultados suelen ser anuncios pagados.' },
            { en: 'Look for the word Sponsored or Ad.', es: 'Busca la palabra Patrocinado o Anuncio.' },
            {
              en: 'Read the green address to see who is talking.',
              es: 'Lee la dirección verde para ver quién habla.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm5-l3',
      emoji: '🛡️',
      minutes: 6,
      title: { en: 'Spotting a scam', es: 'Reconocer una estafa' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Scams work by rushing you', es: 'Las estafas funcionan apurándote' },
          body: [
            {
              en: 'Almost every scam does the same three things: it **frightens** you, it tells you to act **immediately**, and it gives you a **phone number to call** or a link to click.',
              es: 'Casi toda estafa hace las mismas tres cosas: te **asusta**, te dice que actúes **de inmediato**, y te da un **número para llamar** o un enlace para hacer clic.',
            },
            {
              en: 'That combination is the signal. Real companies do not work that way.',
              es: 'Esa combinación es la señal. Las empresas reales no funcionan así.',
            },
          ],
          callout: {
            en: 'A web page **cannot** know that your computer has a virus. Any page saying it does is lying — every single time, no exceptions.',
            es: 'Una página web **no puede** saber si tu computadora tiene un virus. Cualquier página que lo diga está mintiendo — siempre, sin excepción.',
          },
          calloutTone: 'berry',
          calloutEmoji: '🚨',
        },
        {
          type: 'sim',
          sim: 'browser',
          prompt: {
            en: 'One of these results is a trap. Tap the one that is **safe** to open.',
            es: 'Uno de estos resultados es una trampa. Toca el que es **seguro** abrir.',
          },
          config: {
            goal: 'pickresult',
            target: 'real',
            page: 'results',
            chrome: false,
            url: 'search?computer+running+slow',
            results: RESULTS_SCAM,
            tabs: [
              { id: 't1', favicon: '🔍', title: { en: 'computer slow', es: 'computadora lenta' } },
            ],
          },
        },
        {
          type: 'sort',
          prompt: {
            en: 'Real, or a scam?',
            es: '¿Real, o estafa?',
          },
          buckets: [
            { id: 'ok', emoji: '✅', label: { en: 'Probably real', es: 'Probablemente real' } },
            { id: 'scam', emoji: '🚨', label: { en: 'A scam', es: 'Una estafa' } },
          ],
          items: [
            {
              id: 'a',
              emoji: '📞',
              bucket: 'scam',
              label: {
                en: 'A page appears: "Microsoft has detected a virus. Call this number now."',
                es: 'Aparece una página: «Microsoft detectó un virus. Llame a este número ya.»',
              },
              why: {
                en: 'Microsoft never puts a phone number on your screen. Close the page — do not call.',
                es: 'Microsoft nunca pone un número de teléfono en tu pantalla. Cierra la página — no llames.',
              },
            },
            {
              id: 'b',
              emoji: '🏦',
              bucket: 'ok',
              label: {
                en: 'You type your bank’s address yourself and it asks you to sign in.',
                es: 'Escribes tú misma la dirección de tu banco y te pide iniciar sesión.',
              },
              why: {
                en: 'You went there yourself, so you know where you are. That is the safe way to reach your bank.',
                es: 'Fuiste tú misma, así que sabes dónde estás. Esa es la forma segura de llegar a tu banco.',
              },
            },
            {
              id: 'c',
              emoji: '🎁',
              bucket: 'scam',
              label: {
                en: '"Congratulations! You are today’s lucky visitor. Claim your prize."',
                es: '«¡Felicidades! Eres la visitante afortunada de hoy. Reclama tu premio.»',
              },
              why: {
                en: 'Nobody gives away prizes to strangers on the internet. Close it.',
                es: 'Nadie regala premios a desconocidos en internet. Ciérralo.',
              },
            },
            {
              id: 'd',
              emoji: '📧',
              bucket: 'scam',
              label: {
                en: 'An email from "your bank" says your account will close today unless you click a link.',
                es: 'Un correo de «tu banco» dice que tu cuenta se cerrará hoy si no haces clic en un enlace.',
              },
              why: {
                en: 'Fear plus urgency plus a link. Never click it — open your bank yourself and check.',
                es: 'Miedo, prisa y un enlace. Nunca hagas clic — abre tu banco tú misma y revisa.',
              },
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'What to do instead', es: 'Qué hacer en vez de eso' },
          body: [
            {
              en: '**Close the page.** Use the ✕ on the tab. Nothing bad has happened yet just from seeing it.',
              es: '**Cierra la página.** Usa la ✕ de la pestaña. Nada malo ha pasado solo por verla.',
            },
            {
              en: '**Never call the number.** Never let anyone connect to your computer remotely because a page told you to.',
              es: '**Nunca llames al número.** Nunca dejes que alguien se conecte a tu computadora porque una página te lo dijo.',
            },
            {
              en: '**Ask someone.** If you are unsure, take a photo of the screen and ask a person you trust. That is not a bother — it is the right move.',
              es: '**Pregúntale a alguien.** Si no estás segura, toma una foto de la pantalla y pregúntale a alguien de confianza. No es molestia — es lo correcto.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            {
              en: 'Fear + hurry + a number to call = a scam.',
              es: 'Miedo + prisa + un número al que llamar = estafa.',
            },
            {
              en: 'A web page cannot detect a virus on your computer.',
              es: 'Una página web no puede detectar un virus en tu computadora.',
            },
            {
              en: 'Reach your bank by typing its address yourself, never through a link.',
              es: 'Llega a tu banco escribiendo tú la dirección, nunca por un enlace.',
            },
            {
              en: 'When in doubt, close the page and ask someone.',
              es: 'Si dudas, cierra la página y pregúntale a alguien.',
            },
          ],
        },
      ],
    },
  ],
}
