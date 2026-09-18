/**
 * Accounts.
 *
 * Sits straight after the scam module on purpose. A sign-up form is the single
 * most valuable thing for somebody to fake, so "read the address before you
 * type" has to be fresh before we teach anyone to fill one in — and the order
 * here enforces it: the lesson makes the judgement call first and does the
 * typing second.
 *
 * It also has to come before job2 "Work email", which quietly assumes the
 * learner already has an inbox.
 */

// One friendly, obviously-invented site, reused so the form is familiar by the
// time she has to fill it in for real.
const LIBRARY = {
  name: { en: 'Green Valley Library', es: 'Biblioteca Valle Verde' },
  url: 'greenvalleylibrary.org',
  secure: true,
}

const HINTS = {
  hintEmail: { en: 'rosa.mendez@correo.com', es: 'rosa.mendez@correo.com' },
  hintPassword: { en: 'the green house on the corner', es: 'la casa verde de la esquina' },
}

export default {
  id: 'macc',
  icon: 'key',
  color: 'brand',
  title: { en: 'Your accounts', es: 'Tus cuentas' },
  subtitle: {
    en: 'What an account is, and making one here',
    es: 'Qué es una cuenta, y crear la tuya aquí',
  },
  lessons: [
    {
      id: 'macc-l1',
      icon: 'key',
      minutes: 6,
      title: { en: 'What an account is', es: 'Qué es una cuenta' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Your own drawer at a big desk', es: 'Tu propio cajón en un escritorio grande' },
          body: [
            {
              en: 'Lots of people use the same website. An __account__ is how the website knows which things are **yours** and not somebody else’s.',
              es: 'Mucha gente usa el mismo sitio web. Una __cuenta__ es cómo el sitio sabe cuáles cosas son **tuyas** y no de otra persona.',
            },
            {
              en: 'It is only two things: your **email address**, which is your name there, and a **password**, which is how you show it is really you.',
              es: 'Son nada más dos cosas: tu **correo electrónico**, que es tu nombre ahí, y una **contraseña**, que es cómo demuestras que de verdad eres tú.',
            },
            {
              en: 'That is the whole idea. Every account you will ever make is that same pair.',
              es: 'Esa es toda la idea. Cada cuenta que hagas en tu vida es ese mismo par.',
            },
          ],
          callout: {
            en: 'Your email is not a secret — you give it out all the time. The password is the only part nobody else should have.',
            es: 'Tu correo no es un secreto — lo das todo el tiempo. La contraseña es la única parte que nadie más debe tener.',
          },
          calloutTone: 'brand',
          calloutIcon: 'bulb',
          visual: {
            sim: 'signup',
            config: {
              goal: 'fill',
              site: LIBRARY,
              prefill: { email: 'rosa.mendez@correo.com', password: 'la casa verde' },
              ...HINTS,
            },
          },
        },
        {
          type: 'teach',
          title: {
            en: 'A good password is long, not complicated',
            es: 'Una buena contraseña es larga, no complicada',
          },
          body: [
            {
              en: '**la casa verde del abuelo** is a better password than **X7#kq2!**. It is longer, and you will still remember it next month.',
              es: '**la casa verde del abuelo** es mejor contraseña que **X7#kq2!**. Es más larga, y el mes que entra te la vas a seguir acordando.',
            },
            {
              en: 'Leave out the things anyone could look up: your name, your birthday, your children’s names.',
              es: 'Deja fuera lo que cualquiera podría averiguar: tu nombre, tu cumpleaños, los nombres de tus hijos.',
            },
            {
              en: 'Use a different one for your bank than for everything else. If you only ever change one, change that one.',
              es: 'Usa una distinta para tu banco que para todo lo demás. Si nada más vas a cambiar una, que sea esa.',
            },
          ],
          callout: {
            en: 'Writing your passwords in a notebook you keep at home is fine. A notebook in a drawer is safer than a password you forget.',
            es: 'Anotar tus contraseñas en un cuaderno que guardas en tu casa está bien. Un cuaderno en un cajón es más seguro que una contraseña que se te olvida.',
          },
          calloutTone: 'sun',
          calloutIcon: 'bulb',
        },
        {
          type: 'choice',
          prompt: {
            en: 'Which of these would be the best password?',
            es: '¿Cuál de estas sería la mejor contraseña?',
          },
          options: [
            {
              id: 'a',
              label: { en: 'el perro azul de mi tía', es: 'el perro azul de mi tía' },
              correct: true,
            },
            {
              id: 'b',
              label: { en: 'Rosa1957', es: 'Rosa1957' },
              why: {
                en: 'A name and a year. Those are the first two things anyone guesses.',
                es: 'Un nombre y un año. Esas son las dos primeras cosas que cualquiera adivina.',
              },
            },
            {
              id: 'c',
              label: { en: 'pass123', es: 'pass123' },
              why: {
                en: 'Too short, and it is on every list of first guesses. Being long is what makes one safe.',
                es: 'Muy corta, y está en todas las listas de primeros intentos. Lo que hace segura a una contraseña es que sea larga.',
              },
            },
          ],
        },
        {
          type: 'teach',
          title: {
            en: 'Before you type a password, read the address',
            es: 'Antes de escribir una contraseña, lee la dirección',
          },
          body: [
            {
              en: 'You already know this one. A sign-up form is exactly where somebody would put a fake page, because a password is what they want.',
              es: 'Esto ya lo sabes. Un formulario para crear una cuenta es justo donde alguien pondría una página falsa, porque lo que quieren es una contraseña.',
            },
            {
              en: 'So before you type anything into one: look at the address at the top. Is it the place you meant to be?',
              es: 'Entonces, antes de escribir nada en uno: mira la dirección de arriba. ¿Es el lugar al que querías llegar?',
            },
            {
              en: 'If you got there by tapping a link somebody sent you, that is the moment to stop and go there yourself instead.',
              es: 'Si llegaste tocando un enlace que alguien te mandó, ese es el momento de parar y llegar tú misma.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'This page opened after you tapped a link in an email. **Do you type your password?**',
            es: 'Esta página se abrió después de que tocaste un enlace en un correo. **¿Escribes tu contraseña?**',
          },
          visual: {
            sim: 'signup',
            config: {
              goal: 'password',
              site: {
                name: { en: 'Secure Bank Access', es: 'Acceso Seguro Banco' },
                url: 'banco-seguro-acceso.info',
                secure: false,
              },
              hintPassword: { en: 'do not type anything here', es: 'no escribas nada aquí' },
            },
          },
          options: [
            {
              id: 'a',
              label: {
                en: 'No. Close it, and go to the bank by typing its address myself.',
                es: 'No. La cierro, y llego al banco escribiendo yo misma su dirección.',
              },
              correct: true,
            },
            {
              id: 'b',
              label: { en: 'Yes — it says it is the bank.', es: 'Sí — dice que es el banco.' },
              why: {
                en: 'Anybody can put a bank’s name on a page. The address is the part that cannot be faked, and that one is not the bank.',
                es: 'Cualquiera puede ponerle el nombre de un banco a una página. La dirección es lo que no se puede fingir, y esa no es la del banco.',
              },
            },
            {
              id: 'c',
              label: { en: 'Just my email, not my password.', es: 'Nada más mi correo, no mi contraseña.' },
              why: {
                en: 'With your email they can already start trying passwords on the real bank. Give them nothing at all.',
                es: 'Con tu correo ya pueden empezar a probar contraseñas en el banco de verdad. No les des nada.',
              },
            },
          ],
        },
        {
          type: 'sim',
          sim: 'signup',
          prompt: {
            en: 'Now you. Fill this in with a pretend email and a password you invent.',
            es: 'Ahora tú. Llena esto con un correo inventado y una contraseña que se te ocurra.',
          },
          footerHint: {
            en: 'Make it up — nothing here is real and nothing is saved.',
            es: 'Invéntalo — aquí nada es real y nada se guarda.',
          },
          config: { goal: 'fill', site: LIBRARY, ...HINTS },
        },
        {
          type: 'recap',
          points: [
            {
              en: 'An account is an email address plus a password.',
              es: 'Una cuenta es un correo más una contraseña.',
            },
            { en: 'Your email is not secret. Your password is.', es: 'Tu correo no es secreto. Tu contraseña sí.' },
            {
              en: 'Long beats complicated. Three words you would never put together.',
              es: 'Larga le gana a complicada. Tres palabras que nunca juntarías.',
            },
            {
              en: 'Read the address at the top before you type a password into anything.',
              es: 'Lee la dirección de arriba antes de escribir una contraseña en cualquier cosa.',
            },
          ],
        },
      ],
    },

    {
      id: 'macc-l2',
      icon: 'cloud',
      minutes: 5,
      title: { en: 'Your Computer Basics account', es: 'Tu cuenta de Computación Básica' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Where your lessons live right now', es: 'Dónde viven tus lecciones ahora mismo' },
          body: [
            {
              en: 'Every checkmark you have earned is kept **on this phone**, inside this app. Nowhere else.',
              es: 'Cada palomita que te has ganado está guardada **en este teléfono**, dentro de esta app. En ningún otro lado.',
            },
            {
              en: 'That works well. But if you open the app on a different phone, or on a computer, it starts at the beginning there — because on that one it has never met you.',
              es: 'Eso funciona bien. Pero si abres la app en otro teléfono, o en una computadora, ahí empieza desde el principio — porque en ese aparato nunca te ha conocido.',
            },
            {
              en: 'An account fixes that. It keeps a copy for you, so your lessons follow you instead of staying behind.',
              es: 'Una cuenta arregla eso. Te guarda una copia, para que tus lecciones te sigan en vez de quedarse atrás.',
            },
          ],
          callout: {
            en: 'You can keep using this app forever without one. Nothing here is locked behind an account.',
            es: 'Puedes seguir usando esta app para siempre sin una. Aquí nada está bajo llave por no tener cuenta.',
          },
          calloutTone: 'brand',
          calloutIcon: 'cloud',
        },
        {
          type: 'teach',
          title: { en: 'Nothing you have done gets lost', es: 'Nada de lo que ya hiciste se pierde' },
          body: [
            {
              en: 'When you make the account, everything you have already finished comes with you. It is added, not replaced.',
              es: 'Cuando hagas la cuenta, todo lo que ya terminaste se va contigo. Se suma, no se reemplaza.',
            },
            {
              en: 'And if one day you use two devices, the app puts the two together and keeps every checkmark from each.',
              es: 'Y si algún día usas dos aparatos, la app junta los dos y conserva todas las palomitas de cada uno.',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'Where the button is', es: 'Dónde está el botón' },
          body: [
            {
              en: 'On your lessons screen, right at the top, there is a small **gear**. Tap it to open **Settings**.',
              es: 'En tu pantalla de lecciones, hasta arriba, hay un **engrane** chiquito. Tócalo para abrir **Ajustes**.',
            },
            {
              en: 'Scroll down a little. You will find a group called **Your progress**, with a button that says **Save my progress**.',
              es: 'Baja un poquito. Vas a encontrar un grupo que dice **Tu progreso**, con un botón que dice **Guardar mi progreso**.',
            },
            {
              en: 'That button opens the same kind of form you just practised on.',
              es: 'Ese botón abre el mismo tipo de formulario en el que acabas de practicar.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'signup',
          prompt: {
            en: 'One more practice run — just the password box, the part where people get stuck.',
            es: 'Un ensayo más — nada más la casilla de la contraseña, que es donde la gente se atora.',
          },
          footerHint: {
            en: 'A practice one. You will type the real one in a moment.',
            es: 'Una de práctica. La de verdad la escribes en un momento.',
          },
          config: {
            goal: 'password',
            site: {
              name: { en: 'Computer Basics', es: 'Computación Básica' },
              // Must match the address the app actually lives at. This lesson
              // is the one that teaches reading the address bar, so a practice
              // form showing a different address from the real one would be
              // teaching the wrong thing in the worst possible place.
              url: 'computerbasics.app',
              secure: true,
            },
            hintPassword: { en: 'my kitchen window', es: 'la ventana de mi cocina' },
          },
        },
        {
          type: 'action',
          title: { en: 'Now do it for real', es: 'Ahora hazlo de verdad' },
          body: [
            {
              en: 'Leave this lesson when you are ready — your finished lessons stay finished. Then: **gear → Your progress → Save my progress**.',
              es: 'Sal de esta lección cuando estés lista — tus lecciones terminadas se quedan terminadas. Luego: **engrane → Tu progreso → Guardar mi progreso**.',
            },
            {
              en: 'Tap **I don’t have an account yet**. Type your real email, choose a password of eight or more, and tap **Create an account**.',
              es: 'Toca **Todavía no tengo cuenta**. Escribe tu correo de verdad, elige una contraseña de ocho o más, y toca **Crear una cuenta**.',
            },
            {
              en: 'Then check your email for a message from us, and open the link inside it. That is what finishes setting up the account.',
              es: 'Luego revisa tu correo, busca un mensaje nuestro, y abre el enlace que trae. Eso es lo que termina de crear la cuenta.',
            },
            {
              en: 'Then write the password in your notebook. Today, while you still remember it.',
              es: 'Luego anota la contraseña en tu cuaderno. Hoy, mientras todavía te acuerdas.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            {
              en: 'Your progress lives on this phone until you make an account.',
              es: 'Tu progreso vive en este teléfono hasta que hagas una cuenta.',
            },
            {
              en: 'An account keeps a copy, so your lessons follow you to another device.',
              es: 'Una cuenta guarda una copia, para que tus lecciones te sigan a otro aparato.',
            },
            {
              en: 'Gear → Your progress → Save my progress.',
              es: 'Engrane → Tu progreso → Guardar mi progreso.',
            },
            {
              en: 'Nothing you have already finished gets lost when you sign up.',
              es: 'Nada de lo que ya terminaste se pierde al crear la cuenta.',
            },
          ],
        },
      ],
    },
  ],
}
