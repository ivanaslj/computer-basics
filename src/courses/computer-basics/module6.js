/**
 * Module 6 — Using AI tools.
 *
 * Framed as "a patient person who reads fast", not as magic. The lesson that
 * matters most is the last one: it can be confidently wrong, and the things
 * worth double-checking are exactly the things that would hurt to get wrong.
 */
export default {
  id: 'm6',
  emoji: '✨',
  color: 'brand',
  title: { en: 'Using AI helpers', es: 'Usar asistentes de IA' },
  subtitle: {
    en: 'A patient helper you can ask anything',
    es: 'Un ayudante paciente al que le puedes preguntar de todo',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm6-l1',
      emoji: '🤖',
      minutes: 4,
      title: { en: 'What an AI assistant is', es: 'Qué es un asistente de IA' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Someone who never gets tired of questions', es: 'Alguien que nunca se cansa de preguntas' },
          body: [
            {
              en: 'An __AI assistant__ is a website you type questions into, in ordinary words, and it answers in ordinary words. ChatGPT, Claude and Gemini are the common ones.',
              es: 'Un __asistente de IA__ es un sitio web donde escribes preguntas, con palabras normales, y te responde con palabras normales. ChatGPT, Claude y Gemini son los comunes.',
            },
            {
              en: 'It is not a search engine. A search gives you a list of places to go. An assistant gives you an answer, and you can ask it to explain again, simpler.',
              es: 'No es un buscador. Una búsqueda te da una lista de lugares a dónde ir. Un asistente te da una respuesta, y le puedes pedir que te la explique otra vez, más simple.',
            },
          ],
          callout: {
            en: 'It will never get impatient with you, never sigh, and never think a question is silly. Ask it the thing you were embarrassed to ask a person.',
            es: 'Nunca se va a impacientar, nunca va a suspirar, y nunca va a pensar que tu pregunta es tonta. Pregúntale eso que te daba pena preguntarle a una persona.',
          },
          calloutEmoji: '💛',
        },
        {
          type: 'teach',
          title: { en: 'Things it is genuinely good at', es: 'Cosas en las que de verdad es bueno' },
          body: [
            {
              en: '**Explaining.** "What does this letter from the insurance company mean, in simple words?"',
              es: '**Explicar.** «¿Qué significa esta carta del seguro, en palabras simples?»',
            },
            {
              en: '**Writing.** "Help me write a polite message asking my landlord to fix the tap."',
              es: '**Escribir.** «Ayúdame a escribir un mensaje amable pidiéndole al casero que arregle la llave.»',
            },
            {
              en: '**Translating.** "How do I say this in English?"',
              es: '**Traducir.** «¿Cómo digo esto en inglés?»',
            },
            {
              en: '**Ideas.** "What can I cook with rice, eggs and half an onion?"',
              es: '**Ideas.** «¿Qué puedo cocinar con arroz, huevos y media cebolla?»',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'Which of these is an AI assistant best at?',
            es: '¿En cuál de estas es mejor un asistente de IA?',
          },
          options: [
            {
              id: 'a',
              emoji: '💬',
              label: {
                en: 'Explaining a confusing letter in simpler words',
                es: 'Explicar una carta confusa en palabras más simples',
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🏦',
              label: { en: 'Telling you your bank balance', es: 'Decirte el saldo de tu banco' },
              why: {
                en: 'It cannot see your accounts. Anything private to you, it simply does not have.',
                es: 'No puede ver tus cuentas. Todo lo que es privado tuyo, simplemente no lo tiene.',
              },
            },
            {
              id: 'c',
              emoji: '🔧',
              label: { en: 'Fixing your washing machine', es: 'Arreglar tu lavadora' },
              why: {
                en: 'It can talk you through it, but it has no hands. Some jobs still need a person.',
                es: 'Te puede guiar, pero no tiene manos. Algunos trabajos todavía necesitan una persona.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            {
              en: 'An AI assistant answers questions in plain words.',
              es: 'Un asistente de IA responde preguntas en palabras normales.',
            },
            {
              en: 'It is good at explaining, writing, translating and ideas.',
              es: 'Es bueno para explicar, escribir, traducir y dar ideas.',
            },
            { en: 'No question is too small to ask it.', es: 'Ninguna pregunta es muy pequeña para preguntarle.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm6-l2',
      emoji: '🗨️',
      minutes: 5,
      title: { en: 'Asking it well', es: 'Preguntarle bien' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Tell it who you are and what you need', es: 'Dile quién eres y qué necesitas' },
          body: [
            {
              en: 'Unlike a search box, here you **should** use full sentences. The more you tell it, the better the answer.',
              es: 'Al contrario de una casilla de búsqueda, aquí **sí** conviene usar oraciones completas. Entre más le digas, mejor la respuesta.',
            },
            {
              en: 'Three things help every time: **what you want**, **who it is for**, and **how long** it should be.',
              es: 'Tres cosas ayudan siempre: **qué quieres**, **para quién es**, y **de qué tamaño** debe ser.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'ai',
          prompt: {
            en: 'You want help writing a message to your neighbour. Choose the way of asking that will get the best answer.',
            es: 'Quieres ayuda para escribir un mensaje a tu vecino. Elige la forma de preguntar que dará la mejor respuesta.',
          },
          config: {
            opening: {
              en: 'Hello! What can I help you with today?',
              es: '¡Hola! ¿En qué te puedo ayudar hoy?',
            },
            best: 'good',
            options: [
              {
                id: 'vague',
                text: { en: 'write a message', es: 'escribe un mensaje' },
              },
              {
                id: 'good',
                text: {
                  en: 'Help me write a short, friendly message to my neighbour asking if he can move his car — it is blocking my driveway. Keep it polite.',
                  es: 'Ayúdame a escribir un mensaje corto y amable para mi vecino, pidiéndole que mueva su carro — está tapando mi entrada. Que quede cortés.',
                },
              },
            ],
            vagueReply: {
              en: 'Happy to help! A message to whom, and about what? Let me know and I will write it.',
              es: '¡Con gusto! ¿Un mensaje para quién, y sobre qué? Dime y lo escribo.',
            },
            reply: {
              en: '"Hi Miguel — hope you are well. Would you mind moving your car when you get a chance? It is just in front of my driveway. Thank you!"\n\nWant it shorter, or warmer?',
              es: '«Hola Miguel, espero que estés bien. ¿Podrías mover tu carro cuando puedas? Está justo enfrente de mi entrada. ¡Gracias!»\n\n¿Lo quieres más corto, o más cariñoso?',
            },
          },
        },
        {
          type: 'teach',
          title: { en: 'You can keep talking', es: 'Puedes seguir hablando' },
          body: [
            {
              en: 'The best part: the first answer is a starting point, not the end. Say "shorter", "simpler", "more formal", "explain that last bit again".',
              es: 'Lo mejor: la primera respuesta es un punto de partida, no el final. Dile «más corto», «más simple», «más formal», «explícame otra vez esa última parte».',
            },
            {
              en: 'It remembers what you were talking about, so you do not have to start over.',
              es: 'Recuerda de qué estaban hablando, así que no tienes que empezar de nuevo.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Use full sentences — the opposite of searching.', es: 'Usa oraciones completas — lo contrario de buscar.' },
            {
              en: 'Say what you want, who it is for, and how long.',
              es: 'Di qué quieres, para quién es, y de qué tamaño.',
            },
            {
              en: 'Ask it to try again differently. That is normal.',
              es: 'Pídele que lo intente de otra forma. Eso es normal.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm6-l3',
      emoji: '⚖️',
      minutes: 4,
      title: { en: 'What to double-check', es: 'Qué verificar' },
      steps: [
        {
          type: 'teach',
          title: { en: 'It can be wrong, confidently', es: 'Se puede equivocar, con toda seguridad' },
          body: [
            {
              en: 'An AI assistant sometimes states something incorrect in the same calm, certain voice it uses for everything else. It is not lying — it simply does not always know what it does not know.',
              es: 'Un asistente de IA a veces dice algo incorrecto con la misma voz tranquila y segura que usa para todo lo demás. No está mintiendo — simplemente no siempre sabe lo que no sabe.',
            },
            {
              en: 'So the rule is: the more a wrong answer would cost you, the more you check it somewhere else.',
              es: 'Entonces la regla es: entre más te costaría una respuesta equivocada, más la verificas en otro lado.',
            },
          ],
        },
        {
          type: 'sort',
          prompt: {
            en: 'Would you trust the answer, or check it first?',
            es: '¿Confiarías en la respuesta, o la verificarías primero?',
          },
          buckets: [
            { id: 'trust', emoji: '👍', label: { en: 'Fine to trust', es: 'Se puede confiar' } },
            { id: 'check', emoji: '🔎', label: { en: 'Check it first', es: 'Verificar primero' } },
          ],
          items: [
            {
              id: 'a',
              emoji: '💊',
              bucket: 'check',
              label: {
                en: 'Whether a medicine is safe to take with your other pills',
                es: 'Si un medicamento se puede tomar con tus otras pastillas',
              },
              why: {
                en: 'Health decisions go to a pharmacist or doctor. Use the assistant to prepare your question, not to answer it.',
                es: 'Las decisiones de salud van con el farmacéutico o el doctor. Usa el asistente para preparar tu pregunta, no para responderla.',
              },
            },
            {
              id: 'b',
              emoji: '✉️',
              bucket: 'trust',
              label: {
                en: 'A friendly birthday message it wrote for you',
                es: 'Un mensaje de cumpleaños amable que te escribió',
              },
              why: {
                en: 'You can read it yourself and see if you like it. Nothing to verify.',
                es: 'Tú misma lo puedes leer y ver si te gusta. No hay nada que verificar.',
              },
            },
            {
              id: 'c',
              emoji: '📅',
              bucket: 'check',
              label: {
                en: 'What time a particular shop closes today',
                es: 'A qué hora cierra hoy una tienda en particular',
              },
              why: {
                en: 'It may not have today’s information. Look it up, or call the shop.',
                es: 'Puede no tener la información de hoy. Búscalo, o llámale a la tienda.',
              },
            },
            {
              id: 'd',
              emoji: '🍲',
              bucket: 'trust',
              label: {
                en: 'Ideas for what to cook with what is in your fridge',
                es: 'Ideas de qué cocinar con lo que hay en tu refrigerador',
              },
              why: {
                en: 'Worst case, you do not like the suggestion. No harm in that.',
                es: 'En el peor caso, no te gusta la sugerencia. No pasa nada.',
              },
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'And do not tell it everything', es: 'Y no le cuentes todo' },
          body: [
            {
              en: 'Never type in a password, a bank account number, or a government ID number. There is no reason it would need those, and no assistant will ever ask.',
              es: 'Nunca escribas una contraseña, un número de cuenta bancaria, o un número de identificación oficial. No hay razón para que los necesite, y ningún asistente te los va a pedir.',
            },
            {
              en: 'Everything else — questions, letters, worries, half-remembered words — is fine.',
              es: 'Todo lo demás — preguntas, cartas, preocupaciones, palabras a medio recordar — está bien.',
            },
          ],
          callout: {
            en: 'A good habit: ask it "how would I check that myself?" It will tell you, and now you have both the answer and the source.',
            es: 'Un buen hábito: pregúntale «¿cómo puedo verificar eso yo misma?» Te va a decir, y ahora tienes la respuesta y la fuente.',
          },
        },
        {
          type: 'recap',
          points: [
            {
              en: 'It can be wrong while sounding certain.',
              es: 'Se puede equivocar mientras suena segura.',
            },
            {
              en: 'Health, money and legal answers: always check with a person.',
              es: 'Salud, dinero y temas legales: siempre verifica con una persona.',
            },
            {
              en: 'Never type passwords or account numbers into it.',
              es: 'Nunca le escribas contraseñas ni números de cuenta.',
            },
          ],
        },
      ],
    },
  ],
}
