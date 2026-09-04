/**
 * Job Skills 2 — Professional email.
 *
 * Phone-teachable almost end to end, which is why it comes early: judgment
 * about recipients, tone, and subject lines is exactly what a phone quiz can
 * drill, and it is the skill an entry-level hire uses on day one.
 */

export default {
  id: 'job2',
  icon: 'mail',
  color: 'brand',
  title: { en: 'Work email', es: 'Correo de trabajo' },
  subtitle: {
    en: 'Write clearly, pick the right recipients, and follow up well',
    es: 'Escribe claro, elige bien a quién le mandas, y da seguimiento',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'job2-l1',
      icon: 'inbox',
      minutes: 4,
      title: { en: 'Read an email like a task', es: 'Lee un correo como una tarea' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Three questions, every time', es: 'Tres preguntas, siempre' },
          body: [
            {
              en: 'Most work emails are asking for something, even when they are wrapped in pleasantries. Before replying, find three things:',
              es: 'Casi todo correo de trabajo pide algo, aunque venga envuelto en cortesías. Antes de responder, encuentra tres cosas:',
            },
            {
              en: '**What is being asked of me? By when? And do I need to reply at all?**',
              es: '**¿Qué me están pidiendo? ¿Para cuándo? ¿Y necesito responder siquiera?**',
            },
            {
              en: 'If you cannot find a request, you may just have been copied for awareness — and no reply is needed.',
              es: 'Si no encuentras una petición, tal vez solo te copiaron para que estés enterada — y no hace falta responder.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: '"Hi — attaching the Q3 numbers for your records. No action needed, just keeping you in the loop." What should you do?',
            es: '«Hola, te adjunto los números del Q3 para tu registro. No necesitas hacer nada, solo para que estés enterada.» ¿Qué haces?',
          },
          options: [
            {
              id: 'a',
              emoji: '👍',
              label: { en: 'Nothing — read it and move on', es: 'Nada — léelo y sigue' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '↩️',
              label: { en: 'Reply "thanks!" to everyone on it', es: 'Responder «¡gracias!» a todos' },
              why: {
                en: 'It says no action is needed. A "thanks!" to the whole list adds an email to everyone\'s inbox for no reason.',
                es: 'Dice que no hace falta hacer nada. Un «¡gracias!» a toda la lista le agrega un correo a la bandeja de todos sin razón.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Look for: what is asked, by when, and whether a reply is needed.', es: 'Busca: qué te piden, para cuándo, y si hace falta responder.' },
            { en: 'Not every email needs a reply.', es: 'No todo correo necesita respuesta.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job2-l2',
      icon: 'file-text',
      minutes: 3,
      title: { en: 'Write a clear subject line', es: 'Escribe un asunto claro' },
      steps: [
        {
          type: 'teach',
          title: { en: 'The subject line is a preview, not a greeting', es: 'El asunto es un adelanto, no un saludo' },
          body: [
            {
              en: 'Your reader sees the subject line before anything else, often in a list of forty others. It should say **what this is about** and, if it matters, **what kind of message it is**.',
              es: 'Tu lector ve el asunto antes que nada, muchas veces en una lista de otros cuarenta. Debe decir **de qué se trata** y, si importa, **qué tipo de mensaje es**.',
            },
            {
              en: 'Good: **Question: September invoice due date**. Bad: **Hi**, **Important**, or an empty subject.',
              es: 'Bien: **Pregunta: fecha de pago de la factura de septiembre**. Mal: **Hola**, **Importante**, o un asunto vacío.',
            },
          ],
          callout: {
            en: 'Starting with a word like **Question:**, **Follow-up:**, or **Meeting request:** tells the reader in one glance what you need from them.',
            es: 'Empezar con una palabra como **Pregunta:**, **Seguimiento:**, o **Solicitud de junta:** le dice al lector de un vistazo qué necesitas.',
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'You need to know if the office will be open on Monday. Best subject line?',
            es: 'Necesitas saber si la oficina abrirá el lunes. ¿Mejor asunto?',
          },
          options: [
            {
              id: 'a',
              emoji: '✅',
              label: { en: 'Question: Is the office open Monday?', es: 'Pregunta: ¿La oficina abre el lunes?' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '❓',
              label: { en: 'Quick question', es: 'Pregunta rápida' },
              why: {
                en: 'Closer, but the reader still has to open it to learn what about. Put the actual topic in.',
                es: 'Más cerca, pero el lector todavía tiene que abrirlo para saber de qué. Pon el tema real.',
              },
            },
            {
              id: 'c',
              emoji: '🚨',
              label: { en: 'URGENT!!', es: '¡¡URGENTE!!' },
              why: {
                en: 'It says nothing about the topic, and all-caps urgency wears out fast — save it for things that genuinely are.',
                es: 'No dice nada del tema, y la urgencia en mayúsculas se desgasta rápido — guárdala para lo que de verdad lo es.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Say what the email is about, in the subject line.', es: 'Di de qué se trata el correo, en el asunto.' },
            { en: 'A leading word like "Question:" or "Follow-up:" helps.', es: 'Una palabra al inicio como «Pregunta:» o «Seguimiento:» ayuda.' },
            { en: 'Never leave it blank.', es: 'Nunca lo dejes vacío.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job2-l3',
      icon: 'pencil',
      minutes: 5,
      title: { en: 'The shape of a work email', es: 'La forma de un correo de trabajo' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Four parts, in order', es: 'Cuatro partes, en orden' },
          body: [
            {
              en: '**Greeting** — "Hi Maria," is fine almost everywhere. **Purpose** — say why you are writing, in the first sentence.',
              es: '**Saludo** — «Hola María,» sirve en casi todos lados. **Motivo** — di por qué escribes, en la primera oración.',
            },
            {
              en: '**Details or the ask** — the specific thing you need, and by when. **Closing** — "Thank you," and your name.',
              es: '**Detalles o la petición** — lo específico que necesitas, y para cuándo. **Cierre** — «Gracias,» y tu nombre.',
            },
            {
              en: 'Short is professional, as long as it is complete. The reader should finish knowing what happened, what you need, and by when.',
              es: 'Corto es profesional, mientras esté completo. El lector debe terminar sabiendo qué pasó, qué necesitas, y para cuándo.',
            },
          ],
          callout: {
            en: 'Put the ask **early**, not buried in paragraph three. Busy people read the first two lines and skim the rest.',
            es: 'Pon la petición **al principio**, no enterrada en el tercer párrafo. La gente ocupada lee las primeras dos líneas y ojea el resto.',
          },
        },
        {
          type: 'sort',
          prompt: {
            en: 'Which part of an email is each of these?',
            es: '¿Qué parte de un correo es cada una?',
          },
          buckets: [
            { id: 'purpose', emoji: '🎯', label: { en: 'The purpose', es: 'El motivo' } },
            { id: 'ask', emoji: '🙋', label: { en: 'The ask', es: 'La petición' } },
            { id: 'closing', emoji: '👋', label: { en: 'The closing', es: 'El cierre' } },
          ],
          items: [
            {
              id: 'a',
              emoji: '📄',
              bucket: 'purpose',
              label: { en: '"I\'m writing about the shipment that arrived Tuesday."', es: '«Te escribo sobre el envío que llegó el martes.»' },
              why: {
                en: 'It tells the reader what this email is about — that is the purpose, and it belongs first.',
                es: 'Le dice al lector de qué trata el correo — ese es el motivo, y va primero.',
              },
            },
            {
              id: 'b',
              emoji: '📅',
              bucket: 'ask',
              label: { en: '"Could you confirm the total by Friday?"', es: '«¿Podrías confirmar el total para el viernes?»' },
              why: {
                en: 'A specific request with a deadline — that is the ask.',
                es: 'Una petición específica con fecha límite — esa es la petición.',
              },
            },
            {
              id: 'c',
              emoji: '🙏',
              bucket: 'closing',
              label: { en: '"Thank you, Ana"', es: '«Gracias, Ana»' },
              why: {
                en: 'A short sign-off with your name closes the email.',
                es: 'Una despedida corta con tu nombre cierra el correo.',
              },
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'Four templates worth keeping', es: 'Cuatro plantillas que vale la pena guardar' },
          body: [
            {
              en: '**Ask a question** — *Subject: Question about [topic]*. "Hi [Name], I\'m working on [task]. Could you please confirm [specific question] by [date]? Thank you, [Your name]"',
              es: '**Hacer una pregunta** — *Asunto: Pregunta sobre [tema]*. «Hola [Nombre], estoy trabajando en [tarea]. ¿Podrías confirmarme [pregunta específica] para [fecha]? Gracias, [Tu nombre]»',
            },
            {
              en: '**Follow up** — *Subject: Follow-up: [topic]*. "Hi [Name], I\'m following up on my message about [topic]. When you have a moment, could you let me know [next step]? Thank you, [Your name]"',
              es: '**Dar seguimiento** — *Asunto: Seguimiento: [tema]*. «Hola [Nombre], doy seguimiento a mi mensaje sobre [tema]. Cuando puedas, ¿me avisas [siguiente paso]? Gracias, [Tu nombre]»',
            },
            {
              en: '**Ask for a meeting** — *Subject: Meeting request: [topic]*. "Hi [Name], could we meet for [length] to discuss [topic]? I\'m available [two or three options]. Best, [Your name]"',
              es: '**Pedir una junta** — *Asunto: Solicitud de junta: [tema]*. «Hola [Nombre], ¿podríamos vernos [duración] para hablar de [tema]? Estoy disponible [dos o tres opciones]. Saludos, [Tu nombre]»',
            },
            {
              en: '**Say no politely** — "Hi [Name], thank you for thinking of me. I\'m not available then because [brief reason], but I could [alternative]. Best, [Your name]"',
              es: '**Decir que no con amabilidad** — «Hola [Nombre], gracias por tomarme en cuenta. No estoy disponible porque [razón breve], pero podría [alternativa]. Saludos, [Tu nombre]»',
            },
          ],
          callout: {
            en: 'These are starting points, not scripts. Swap the words for your own — the *structure* is the useful part.',
            es: 'Son puntos de partida, no guiones. Cambia las palabras por las tuyas — la *estructura* es lo útil.',
          },
          calloutTone: 'grass',
          calloutIcon: 'clipboard',
        },
        {
          type: 'recap',
          points: [
            { en: 'Greeting, purpose, the ask, closing.', es: 'Saludo, motivo, petición, cierre.' },
            { en: 'Put the ask early and say the deadline.', es: 'Pon la petición al principio y di la fecha límite.' },
            { en: 'Short is professional — as long as it is complete.', es: 'Corto es profesional — mientras esté completo.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job2-l4',
      icon: 'people',
      minutes: 4,
      title: { en: 'To, CC, and Reply All', es: 'Para, CC, y Responder a todos' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Who has to act, and who just needs to know', es: 'Quién tiene que actuar, y quién solo necesita saber' },
          body: [
            {
              en: '**To** is for the people you expect to do something. **CC** ("carbon copy") is for people who need to be aware but are not being asked to act.',
              es: '**Para** es para quienes esperas que hagan algo. **CC** («copia») es para quienes necesitan estar enterados pero a quienes no les pides nada.',
            },
            {
              en: '**Reply All** sends your response to everyone on the original. It is occasionally right and very often not — the test is whether *every single person* on that list benefits from reading your reply.',
              es: '**Responder a todos** manda tu respuesta a todos los del original. A veces es correcto y muy seguido no — la prueba es si *cada persona* de esa lista se beneficia de leer tu respuesta.',
            },
          ],
          callout: {
            en: 'Reply All is not the polite default. It clutters inboxes, and can show information to people who did not need it.',
            es: 'Responder a todos no es lo cortés por defecto. Llena bandejas de entrada, y puede mostrar información a quien no la necesitaba.',
          },
          calloutTone: 'berry',
          calloutIcon: 'warning',
        },
        {
          type: 'choice',
          prompt: {
            en: 'Your manager emails you and CCs four teammates: "Ana, can you send me the file?" How do you reply?',
            es: 'Tu jefa te escribe y copia a cuatro compañeros: «Ana, ¿me mandas el archivo?» ¿Cómo respondes?',
          },
          options: [
            {
              id: 'a',
              emoji: '↩️',
              label: { en: 'Reply to just your manager', es: 'Responder solo a tu jefa' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '📢',
              label: { en: 'Reply All with the file', es: 'Responder a todos con el archivo' },
              why: {
                en: 'The four teammates were CC\'d for awareness. Only your manager asked for the file, so only your manager needs the reply.',
                es: 'Los cuatro compañeros fueron copiados para estar enterados. Solo tu jefa pidió el archivo, así que solo ella necesita la respuesta.',
              },
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'A coworker emails the whole team: "Does anyone know the wifi password?" You know it. What now?',
            es: 'Un compañero escribe a todo el equipo: «¿Alguien sabe la contraseña del wifi?» Tú la sabes. ¿Ahora qué?',
          },
          options: [
            {
              id: 'a',
              emoji: '📢',
              label: { en: 'Reply All — everyone might need it', es: 'Responder a todos — a todos les puede servir' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '↩️',
              label: { en: 'Reply to just that person', es: 'Responder solo a esa persona' },
              why: {
                en: 'Reasonable, but here Reply All genuinely helps — it saves the next four people from asking the same question.',
                es: 'Razonable, pero aquí Responder a todos sí ayuda — le ahorra a las siguientes cuatro personas hacer la misma pregunta.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'To = people who should act. CC = people who should know.', es: 'Para = quienes deben actuar. CC = quienes deben saber.' },
            { en: 'Reply All only when everyone truly benefits.', es: 'Responder a todos solo cuando de verdad le sirve a todos.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job2-l5',
      icon: 'paperclip',
      minutes: 4,
      title: { en: 'Attach before you send', es: 'Adjunta antes de enviar' },
      steps: [
        {
          type: 'teach',
          title: { en: 'The classic mistake', es: 'El error clásico' },
          body: [
            {
              en: 'An __attachment__ is a copy of a file sent along with the email. Forgetting it is the single most common email mistake there is — everyone does it.',
              es: 'Un __adjunto__ es una copia de un archivo que se manda con el correo. Olvidarlo es el error de correo más común que existe — a todos les pasa.',
            },
            {
              en: 'Two habits fix it: **attach the file first, before writing anything**, and **mention the attachment in the message** ("I\'ve attached the September report"). If you mention it, you notice when it is missing.',
              es: 'Dos costumbres lo arreglan: **adjunta el archivo primero, antes de escribir nada**, y **menciona el adjunto en el mensaje** («Te adjunto el reporte de septiembre»). Si lo mencionas, te das cuenta cuando falta.',
            },
            {
              en: 'Give the file a sensible name before attaching it. **Q3-Report.pdf** tells the recipient what they have; **doc1final.pdf** does not.',
              es: 'Ponle un nombre sensato al archivo antes de adjuntarlo. **Reporte-Q3.pdf** le dice al que lo recibe qué tiene; **doc1final.pdf** no.',
            },
          ],
          callout: {
            en: 'In Outlook, replying to a message does **not** carry the original attachment along. If they need it back, attach it again.',
            es: 'En Outlook, responder a un mensaje **no** lleva el adjunto original. Si lo necesitan de vuelta, adjúntalo otra vez.',
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'What is the most reliable way to never forget an attachment?',
            es: '¿Cuál es la forma más confiable de nunca olvidar un adjunto?',
          },
          options: [
            {
              id: 'a',
              emoji: '📎',
              label: { en: 'Attach the file first, before writing the message', es: 'Adjuntar el archivo primero, antes de escribir el mensaje' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🧠',
              label: { en: 'Just remember to do it at the end', es: 'Solo acordarte de hacerlo al final' },
              why: {
                en: 'That is exactly the approach that fails — you finish writing, feel done, and hit send. Attach first.',
                es: 'Ese es justo el enfoque que falla — terminas de escribir, te sientes lista, y le das enviar. Adjunta primero.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Attach first, then write.', es: 'Adjunta primero, luego escribe.' },
            { en: 'Mention the attachment in the message.', es: 'Menciona el adjunto en el mensaje.' },
            { en: 'Name the file sensibly before you send it.', es: 'Ponle un nombre sensato al archivo antes de enviarlo.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job2-l6',
      icon: 'bell',
      minutes: 4,
      title: { en: 'Following up without nagging', es: 'Dar seguimiento sin fastidiar' },
      steps: [
        {
          type: 'teach',
          title: { en: 'People are busy, not ignoring you', es: 'La gente está ocupada, no te está ignorando' },
          body: [
            {
              en: 'No reply after a few working days usually means the email got buried, not that you were dismissed. A short, friendly follow-up is completely normal and expected.',
              es: 'Sin respuesta después de unos días hábiles casi siempre significa que el correo se enterró, no que te ignoraron. Un seguimiento corto y amable es completamente normal y esperado.',
            },
            {
              en: 'Keep it brief, restate the ask, and make it easy to answer. Reply on the original thread so they have the context right there.',
              es: 'Que sea breve, repite la petición, y hazla fácil de responder. Responde en el mismo hilo para que tengan el contexto ahí mismo.',
            },
          ],
          callout: {
            en: '"Per my last email" reads as sharp to many people. **"I\'m following up on…"** does the same job without the edge.',
            es: '«Como decía en mi correo anterior» suena cortante para mucha gente. **«Doy seguimiento a…»** hace lo mismo sin el filo.',
          },
          calloutIcon: 'grab',
        },
        {
          type: 'choice',
          prompt: {
            en: 'Three days, no reply to a question you need answered. What is the best move?',
            es: 'Tres días, sin respuesta a una pregunta que necesitas. ¿Cuál es el mejor paso?',
          },
          options: [
            {
              id: 'a',
              emoji: '🫱',
              label: {
                en: 'Reply on the same thread: "Hi — following up on this when you have a moment."',
                es: 'Responder en el mismo hilo: «Hola, doy seguimiento a esto cuando puedas.»',
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '😤',
              label: { en: 'Send a new email saying "Per my last email…"', es: 'Mandar un correo nuevo diciendo «Como decía en mi correo anterior…»' },
              why: {
                en: 'A new email loses the original context, and that phrasing reads as annoyed. Reply on the thread, warmly.',
                es: 'Un correo nuevo pierde el contexto original, y esa frase suena molesta. Responde en el hilo, con calidez.',
              },
            },
            {
              id: 'c',
              emoji: '🤐',
              label: { en: 'Say nothing and hope they remember', es: 'No decir nada y esperar que se acuerden' },
              why: {
                en: 'If you need the answer, it is your job to ask again. Following up is part of the work, not an imposition.',
                es: 'Si necesitas la respuesta, es tu trabajo volver a preguntar. Dar seguimiento es parte del trabajo, no una imposición.',
              },
            },
          ],
        },
        {
          type: 'action',
          title: { en: 'Send one for real', es: 'Manda uno de verdad' },
          body: [
            {
              en: 'On a computer, open your email and write one practice message to yourself — or to a friend who will not mind.',
              es: 'En una computadora, abre tu correo y escribe un mensaje de práctica a ti misma — o a alguien que no le moleste.',
            },
            {
              en: 'Include all four parts (greeting, purpose, ask, closing), a clear subject line, and one attachment. Then check it in your Sent folder to see how it looks to the person receiving it.',
              es: 'Incluye las cuatro partes (saludo, motivo, petición, cierre), un asunto claro, y un adjunto. Luego revísalo en tu carpeta de Enviados para ver cómo lo ve quien lo recibe.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'No reply usually means busy, not ignoring you.', es: 'Sin respuesta casi siempre significa ocupado, no que te ignoran.' },
            { en: 'Follow up on the original thread, briefly and warmly.', es: 'Da seguimiento en el hilo original, breve y con calidez.' },
            { en: 'Use "I\'m following up on…" rather than "per my last email."', es: 'Usa «doy seguimiento a…» en vez de «como decía en mi correo anterior».' },
          ],
        },
      ],
    },
  ],
}
