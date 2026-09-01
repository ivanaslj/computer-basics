import { dev } from '../../i18n/content.js'

/**
 * Module 1 — The absolute basics.
 *
 * Assumes nothing at all. The first lesson's real job is to lower fear: most
 * people this course is for believe they can break the computer by pressing
 * the wrong thing, and until that belief goes, nothing else sticks.
 */

const DESKTOP_ICONS = [
  { id: 'browser', emoji: '🌐', label: { en: 'Internet', es: 'Internet' }, x: 6, y: 8 },
  { id: 'docs', emoji: '📁', label: { en: 'My Documents', es: 'Mis documentos' }, x: 6, y: 32 },
  { id: 'photos', emoji: '🖼️', label: { en: 'Photos', es: 'Fotos' }, x: 6, y: 56 },
  { id: 'mail', emoji: '📧', label: { en: 'Mail', es: 'Correo' }, x: 26, y: 8 },
  { id: 'trash', emoji: '🗑️', label: { en: 'Trash', es: 'Papelera' }, x: 26, y: 32 },
]

const ICON_MENU = [
  { id: 'open', label: { en: 'Open', es: 'Abrir' } },
  { id: 'rename', label: { en: 'Rename', es: 'Cambiar nombre' } },
  { id: 'copy', label: { en: 'Copy', es: 'Copiar' } },
  { id: 'divider1', divider: true },
  { id: 'delete', label: { en: 'Delete', es: 'Eliminar' } },
]

export default {
  id: 'm1',
  number: 1,
  emoji: '🌱',
  color: 'brand',
  title: { en: 'The absolute basics', es: 'Lo más básico' },
  subtitle: {
    en: 'What a computer is, and how to touch it without worry',
    es: 'Qué es una computadora, y cómo tocarla sin preocuparte',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm1-l1',
      emoji: '👋',
      minutes: 3,
      title: { en: 'You cannot break it', es: 'No la puedes romper' },
      steps: [
        {
          type: 'teach',
          title: { en: 'First, the good news', es: 'Primero, la buena noticia' },
          body: [
            {
              en: 'A computer is a **tool**. Like a stove or a car. It does what you tell it, and it waits patiently when you do nothing.',
              es: 'Una computadora es una **herramienta**. Como una estufa o un carro. Hace lo que le dices, y espera con paciencia cuando no haces nada.',
            },
            {
              en: 'You are not going to break it by pressing the wrong thing. Almost everything can be undone, closed, or simply ignored.',
              es: 'No la vas a romper por presionar algo equivocado. Casi todo se puede deshacer, cerrar, o simplemente ignorar.',
            },
          ],
          callout: {
            en: 'If you ever feel lost, you can always turn the computer off and start again. Nothing is lost forever.',
            es: 'Si alguna vez te sientes perdida, siempre puedes apagar la computadora y volver a empezar. Nada se pierde para siempre.',
          },
          calloutEmoji: '🌤️',
        },
        {
          type: 'teach',
          title: { en: 'You already know a lot', es: 'Ya sabes bastante' },
          visual: { art: 'phone-vs-computer' },
          body: [
            {
              en: 'You use a phone. That means you already understand the big ideas: apps, buttons, typing, pictures.',
              es: 'Usas un teléfono. Eso significa que ya entiendes las ideas grandes: aplicaciones, botones, escribir, fotos.',
            },
            {
              en: 'A computer works the same way, with one difference. On your phone you **touch** the screen. On a computer you move a little **arrow** around the screen, and then click.',
              es: 'La computadora funciona igual, con una diferencia. En tu teléfono **tocas** la pantalla. En la computadora mueves una **flechita** por la pantalla, y luego haces clic.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'On a computer, how do you point at something?',
            es: 'En una computadora, ¿cómo señalas algo?',
          },
          options: [
            {
              id: 'a',
              emoji: '↖️',
              label: {
                en: 'Move a little arrow to it, then click',
                es: 'Muevo una flechita hasta eso, y hago clic',
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '👆',
              label: { en: 'Touch the screen with my finger', es: 'Toco la pantalla con el dedo' },
              why: {
                en: 'That is the phone way. Most computer screens do not respond to your finger — you move the arrow instead.',
                es: 'Así es en el teléfono. La mayoría de las pantallas de computadora no responden al dedo — en vez de eso, mueves la flechita.',
              },
            },
            {
              id: 'c',
              emoji: '🗣️',
              label: { en: 'Say it out loud', es: 'Lo digo en voz alta' },
              why: {
                en: 'Computers can listen, but that is a later trick. For now: the arrow.',
                es: 'Las computadoras pueden escuchar, pero eso es para después. Por ahora: la flechita.',
              },
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'Take your time', es: 'Tómate tu tiempo' },
          body: [
            {
              en: 'Nobody is timing you. The computer will wait all day. If a lesson feels fast, go back and read it again — that is not a mistake, that is how learning works.',
              es: 'Nadie te está tomando el tiempo. La computadora puede esperar todo el día. Si una lección se siente rápida, regrésate y léela otra vez — eso no es un error, así se aprende.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'You click something and a window you did not expect opens. What is the right thing to do?',
            es: 'Haces clic en algo y se abre una ventana que no esperabas. ¿Qué es lo correcto?',
          },
          options: [
            {
              id: 'a',
              emoji: '🙂',
              label: { en: 'Close it and carry on. No harm done.', es: 'Cerrarla y seguir. No pasó nada.' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '😰',
              label: { en: 'Turn everything off and call for help', es: 'Apagar todo y pedir ayuda' },
              why: {
                en: 'You could — but you almost never need to. An unexpected window is normal, and closing it is enough.',
                es: 'Podrías — pero casi nunca hace falta. Una ventana inesperada es normal, y cerrarla es suficiente.',
              },
            },
            {
              id: 'c',
              emoji: '🚫',
              label: { en: 'Never touch that part again', es: 'Nunca volver a tocar esa parte' },
              why: {
                en: 'Curiosity is how you learn this. Open it, look at it, close it. That is the whole method.',
                es: 'La curiosidad es como se aprende esto. Ábrelo, míralo, ciérralo. Ese es todo el método.',
              },
            },
          ],
        },
        {
          type: 'recap',
          title: { en: 'What you learned', es: 'Lo que aprendiste' },
          points: [
            {
              en: 'A computer is a tool. You are in charge of it.',
              es: 'La computadora es una herramienta. Tú mandas.',
            },
            {
              en: 'You will not break it by pressing the wrong thing.',
              es: 'No la vas a romper por presionar algo equivocado.',
            },
            {
              en: 'On a phone you touch. On a computer you move an arrow and click.',
              es: 'En el teléfono tocas. En la computadora mueves una flecha y haces clic.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm1-l2',
      emoji: '🧩',
      minutes: 4,
      title: { en: 'The parts of a computer', es: 'Las partes de una computadora' },
      steps: [
        {
          type: 'teach',
          title: { en: 'A laptop, part by part', es: 'Una laptop, parte por parte' },
          visual: { sim: 'hardware', config: { variant: 'laptop', showLabels: true } },
          body: [
            {
              en: 'A __laptop__ is a computer that folds shut, like a book. Everything it needs is built in.',
              es: 'Una __laptop__ es una computadora que se dobla como un libro. Todo lo que necesita ya viene adentro.',
            },
            {
              en: 'The __screen__ is where you look. The __keyboard__ is where you type. The __trackpad__ is the smooth square you slide your finger on to move the arrow.',
              es: 'La __pantalla__ es donde miras. El __teclado__ es donde escribes. El __panel táctil__ es el cuadro liso donde deslizas el dedo para mover la flecha.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'hardware',
          prompt: { en: 'Tap the **screen**.', es: 'Toca la **pantalla**.' },
          config: { variant: 'laptop', target: 'screen' },
        },
        {
          type: 'sim',
          sim: 'hardware',
          prompt: { en: 'Now tap the **trackpad**.', es: 'Ahora toca el **panel táctil**.' },
          config: { variant: 'laptop', target: 'trackpad' },
        },
        {
          type: 'teach',
          title: { en: 'A desktop computer', es: 'Una computadora de escritorio' },
          visual: { sim: 'hardware', config: { variant: 'desktop', showLabels: true } },
          body: [
            {
              en: 'Some computers come in separate pieces that sit on a desk. The __tower__ is the box that does the thinking. The screen, keyboard and mouse all plug into it.',
              es: 'Algunas computadoras vienen en piezas separadas que van sobre un escritorio. La __torre__ es la caja que hace el trabajo. La pantalla, el teclado y el ratón se conectan a ella.',
            },
            {
              en: 'The __mouse__ is the little shape you slide on the desk. Slide it, and the arrow on the screen slides too.',
              es: 'El __ratón__ es la figurita que deslizas sobre el escritorio. Lo deslizas, y la flecha en la pantalla se desliza también.',
            },
          ],
          callout: {
            en: 'A trackpad and a mouse do exactly the same job. Laptops usually have a trackpad; desk computers usually have a mouse.',
            es: 'El panel táctil y el ratón hacen exactamente lo mismo. Las laptops suelen traer panel táctil; las de escritorio suelen traer ratón.',
          },
        },
        {
          type: 'sim',
          sim: 'hardware',
          prompt: { en: 'Tap the **mouse**.', es: 'Toca el **ratón**.' },
          config: { variant: 'desktop', target: 'mouse' },
        },
        {
          type: 'sim',
          sim: 'hardware',
          prompt: { en: 'Tap the **tower** — the box that does the thinking.', es: 'Toca la **torre** — la caja que hace el trabajo.' },
          config: { variant: 'desktop', target: 'tower' },
        },
        {
          type: 'recap',
          points: [
            { en: 'Screen: where you look.', es: 'Pantalla: donde miras.' },
            { en: 'Keyboard: where you type.', es: 'Teclado: donde escribes.' },
            {
              en: 'Mouse or trackpad: how you move the arrow.',
              es: 'Ratón o panel táctil: cómo mueves la flecha.',
            },
            {
              en: 'Tower: the box that does the thinking, on desk computers.',
              es: 'Torre: la caja que hace el trabajo, en las de escritorio.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm1-l3',
      emoji: '⏻',
      minutes: 4,
      title: { en: 'Turning it on and off', es: 'Encenderla y apagarla' },
      steps: [
        {
          type: 'teach',
          title: { en: 'One button starts everything', es: 'Un botón lo empieza todo' },
          body: [
            {
              en: 'Every computer has a __power button__. It has this symbol on it: **⏻** — a circle with a line through the top.',
              es: 'Toda computadora tiene un __botón de encendido__. Tiene este símbolo: **⏻** — un círculo con una rayita arriba.',
            },
            {
              en: 'On a laptop it is usually at the top right of the keyboard. On a desk computer it is on the front of the tower.',
              es: 'En una laptop suele estar arriba a la derecha del teclado. En una de escritorio está al frente de la torre.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'hardware',
          prompt: {
            en: 'Find the **power button** on this laptop and tap it.',
            es: 'Encuentra el **botón de encendido** en esta laptop y tócalo.',
          },
          config: { variant: 'laptop', target: 'power' },
        },
        {
          type: 'teach',
          title: { en: 'Then wait', es: 'Luego espera' },
          body: [
            {
              en: 'Press it **once** and let go. Then wait. It can take a full minute before anything useful appears.',
              es: 'Presiónalo **una vez** y suéltalo. Luego espera. Puede tardar un minuto entero antes de que aparezca algo útil.',
            },
            {
              en: 'Pressing it over and over does not make it faster. It is like pressing a lift button ten times.',
              es: 'Presionarlo una y otra vez no lo hace más rápido. Es como picarle diez veces al botón del elevador.',
            },
          ],
          callout: {
            en: 'A black screen with a small light on does not mean it is broken. It means it is still waking up.',
            es: 'Una pantalla negra con una lucecita encendida no significa que esté descompuesta. Significa que todavía está despertando.',
          },
          calloutEmoji: '⏳',
        },
        {
          type: 'teach',
          title: { en: 'Turning it off properly', es: 'Apagarla como se debe' },
          body: [
            {
              en: 'To turn a computer off, you do **not** hold the power button. You tell it to shut down, and it tidies up first — saving things, closing things.',
              es: 'Para apagar la computadora, **no** mantienes presionado el botón. Le dices que se apague, y ella recoge primero — guardando y cerrando cosas.',
            },
            {
              en: dev(
                'Click the **Start** button in the bottom-left corner, then the power symbol, then **Shut down**.',
                'Click the **apple** in the top-left corner, then **Shut Down**.'
              ),
              es: dev(
                'Haz clic en el botón de **Inicio** en la esquina de abajo a la izquierda, luego en el símbolo de encendido, y luego en **Apagar**.',
                'Haz clic en la **manzana** en la esquina de arriba a la izquierda, y luego en **Apagar**.'
              ),
            },
          ],
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: {
            en: dev(
              'Shut this computer down properly. Start with the **Start** button in the corner.',
              'Shut this computer down properly. Start with the **apple** in the corner.'
            ),
            es: dev(
              'Apaga esta computadora como se debe. Empieza con el botón de **Inicio** en la esquina.',
              'Apaga esta computadora como se debe. Empieza con la **manzana** en la esquina.'
            ),
          },
          config: { goal: 'shutdown', icons: DESKTOP_ICONS.slice(0, 3) },
        },
        {
          type: 'choice',
          prompt: {
            en: 'You are done for the night but you want to carry on tomorrow where you left off. What is easiest?',
            es: 'Ya terminaste por hoy pero quieres seguir mañana donde te quedaste. ¿Qué es lo más fácil?',
          },
          options: [
            {
              id: 'a',
              emoji: '💤',
              label: {
                en: 'Just close the laptop lid. It goes to sleep and wakes up where you left it.',
                es: 'Solo cerrar la tapa de la laptop. Se duerme y despierta donde la dejaste.',
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🔌',
              label: { en: 'Pull the plug out of the wall', es: 'Desconectarla de la pared' },
              why: {
                en: 'That stops it mid-sentence. It usually survives, but anything unsaved can be lost. Sleep or shut down instead.',
                es: 'Eso la corta a media frase. Casi siempre sobrevive, pero lo que no guardaste se puede perder. Mejor duérmela o apágala.',
              },
            },
            {
              id: 'c',
              emoji: '⏻',
              label: {
                en: 'Hold the power button until it goes dark',
                es: 'Mantener el botón de encendido hasta que se apague',
              },
              why: {
                en: 'That is the emergency method, for when the computer has completely frozen. Save it for then.',
                es: 'Ese es el método de emergencia, para cuando la computadora se congela por completo. Guárdalo para eso.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Press the power button once, then wait.', es: 'Presiona el botón una vez, y espera.' },
            {
              en: dev(
                'Turn it off with Start → power → Shut down.',
                'Turn it off with the apple menu → Shut Down.'
              ),
              es: dev(
                'Apágala con Inicio → encendido → Apagar.',
                'Apágala con el menú de la manzana → Apagar.'
              ),
            },
            {
              en: 'Closing the lid just puts it to sleep — that is fine for short breaks.',
              es: 'Cerrar la tapa solo la duerme — eso está bien para descansos cortos.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm1-l4',
      emoji: '🖥️',
      minutes: 3,
      title: { en: 'The desktop and icons', es: 'El escritorio y los iconos' },
      steps: [
        {
          type: 'teach',
          title: { en: 'This screen is your desk', es: 'Esta pantalla es tu escritorio' },
          visual: { sim: 'desktop', config: { icons: DESKTOP_ICONS } },
          body: [
            {
              en: 'When the computer finishes waking up, this is what you see. It is called the __desktop__ — think of it as the top of a real desk, where you leave the things you use often.',
              es: 'Cuando la computadora termina de despertar, esto es lo que ves. Se llama el __escritorio__ — piénsalo como la superficie de un escritorio real, donde dejas las cosas que usas seguido.',
            },
            {
              en: 'Each little picture with a name under it is an __icon__. An icon is a door: tapping it the right way opens something.',
              es: 'Cada dibujito con un nombre debajo es un __icono__. Un icono es una puerta: si lo tocas de la forma correcta, abre algo.',
            },
          ],
        },
        {
          type: 'teach',
          title: {
            en: dev('The bar along the bottom', 'The bar along the bottom'),
            es: dev('La barra de abajo', 'La barra de abajo'),
          },
          body: [
            {
              en: dev(
                'Along the bottom of the screen is the __taskbar__. The little squares on the left open the **Start menu**, which is a list of everything on the computer.',
                'Along the bottom of the screen is the __dock__. It holds the apps you use most, ready to open with a click.'
              ),
              es: dev(
                'A lo largo de abajo de la pantalla está la __barra de tareas__. Los cuadritos de la izquierda abren el **menú Inicio**, que es una lista de todo lo que hay en la computadora.',
                'A lo largo de abajo de la pantalla está el __dock__. Guarda las aplicaciones que más usas, listas para abrirse con un clic.'
              ),
            },
            {
              en: 'The clock lives down there too, on the right.',
              es: 'El reloj también vive por ahí, a la derecha.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: {
            en: 'Find the icon called **Photos** and tap it once.',
            es: 'Encuentra el icono que dice **Fotos** y tócalo una vez.',
          },
          config: { goal: 'click', target: 'photos', icons: DESKTOP_ICONS },
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: {
            en: dev(
              'Now open the **Start menu** in the bottom-left corner.',
              'Now open the **apple menu** in the top-left corner.'
            ),
            es: dev(
              'Ahora abre el **menú Inicio** en la esquina de abajo a la izquierda.',
              'Ahora abre el **menú de la manzana** en la esquina de arriba a la izquierda.'
            ),
          },
          config: { goal: 'start', icons: DESKTOP_ICONS },
        },
        {
          type: 'recap',
          points: [
            { en: 'The desktop is your main screen.', es: 'El escritorio es tu pantalla principal.' },
            {
              en: 'An icon is a little picture that opens something.',
              es: 'Un icono es un dibujito que abre algo.',
            },
            {
              en: dev(
                'The taskbar runs along the bottom, with Start at the left.',
                'The dock runs along the bottom, and the apple menu is at the top left.'
              ),
              es: dev(
                'La barra de tareas va abajo, con Inicio a la izquierda.',
                'El dock va abajo, y el menú de la manzana está arriba a la izquierda.'
              ),
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm1-l5',
      emoji: '👆',
      minutes: 5,
      title: { en: 'One click, or two?', es: '¿Un clic, o dos?' },
      steps: [
        {
          type: 'teach',
          title: { en: 'The difference that trips everyone up', es: 'La diferencia que confunde a todos' },
          visual: { art: 'click-types' },
          body: [
            {
              en: 'On your phone, one tap opens things. On a computer, one click only **points** at something — it does not open it.',
              es: 'En tu teléfono, un toque abre las cosas. En la computadora, un clic solo **señala** algo — no lo abre.',
            },
            {
              en: 'To open something you click **twice, quickly**. That is called a __double click__.',
              es: 'Para abrir algo haces clic **dos veces, rápido**. Eso se llama __doble clic__.',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'One click = choosing', es: 'Un clic = elegir' },
          body: [
            {
              en: 'A single click puts a highlight around something, to say "this one". It is how you choose a file before moving it or deleting it.',
              es: 'Un clic sencillo pone un resaltado alrededor de algo, para decir «este». Así eliges un archivo antes de moverlo o borrarlo.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: {
            en: 'Tap **Mail** once, to choose it. Just one tap.',
            es: 'Toca **Correo** una vez, para elegirlo. Solo un toque.',
          },
          config: { goal: 'click', target: 'mail', icons: DESKTOP_ICONS },
        },
        {
          type: 'teach',
          title: { en: 'Two clicks = opening', es: 'Dos clics = abrir' },
          body: [
            {
              en: 'Two quick clicks in the same spot opens it. The trick is **quickly** — two slow clicks are just two single clicks.',
              es: 'Dos clics rápidos en el mismo lugar lo abren. El truco es que sean **rápidos** — dos clics lentos son solo dos clics sencillos.',
            },
            {
              en: 'It takes practice, and everybody misses it at first. If nothing opens, just try again a little faster.',
              es: 'Requiere práctica, y a todos se les pasa al principio. Si no se abre nada, inténtalo otra vez un poco más rápido.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: {
            en: 'Now **open** My Documents — tap it twice, quickly.',
            es: 'Ahora **abre** Mis documentos — tócalo dos veces, rápido.',
          },
          config: {
            goal: 'doubleclick',
            target: 'docs',
            icons: DESKTOP_ICONS,
            opensWindow: {
              emoji: '📁',
              title: { en: 'My Documents', es: 'Mis documentos' },
              body: {
                en: 'It opened. This is what a window looks like — you will learn all about these next.',
                es: 'Se abrió. Así se ve una ventana — vas a aprender todo sobre ellas en el siguiente módulo.',
              },
            },
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'You want to open a photo. How many clicks?',
            es: 'Quieres abrir una foto. ¿Cuántos clics?',
          },
          options: [
            { id: 'a', emoji: '👆👆', label: { en: 'Two quick clicks', es: 'Dos clics rápidos' }, correct: true },
            {
              id: 'b',
              emoji: '👆',
              label: { en: 'One click', es: 'Un clic' },
              why: {
                en: 'One click would only highlight it. To open it, you need two quick clicks.',
                es: 'Un clic solo lo resaltaría. Para abrirlo, necesitas dos clics rápidos.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'One click chooses. Two quick clicks open.', es: 'Un clic elige. Dos clics rápidos abren.' },
            {
              en: 'If nothing opens, the two clicks were too slow. Try again.',
              es: 'Si no se abre nada, los dos clics fueron muy lentos. Inténtalo otra vez.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm1-l6',
      emoji: '📋',
      minutes: 4,
      title: { en: 'Right-click: the helpful menu', es: 'Clic derecho: el menú útil' },
      steps: [
        {
          type: 'teach',
          title: { en: 'The second button', es: 'El segundo botón' },
          body: [
            {
              en: 'A mouse has two buttons. Everything so far used the **left** one. The **right** one does something different: it opens a short list of things you can do with whatever you clicked on.',
              es: 'El ratón tiene dos botones. Todo lo anterior usaba el **izquierdo**. El **derecho** hace algo distinto: abre una lista corta de cosas que puedes hacer con lo que hayas señalado.',
            },
            {
              en: 'That list is called a __menu__. Right-clicking is how you ask the computer: "what can I do with this?"',
              es: 'Esa lista se llama __menú__. El clic derecho es como preguntarle a la computadora: «¿qué puedo hacer con esto?»',
            },
          ],
          callout: {
            en: dev(
              'On a trackpad with no separate buttons, press with **two fingers** at once instead.',
              'On a Mac trackpad, press with **two fingers** at once. (Or hold Control and click.)'
            ),
            es: dev(
              'En un panel táctil sin botones separados, presiona con **dos dedos** a la vez.',
              'En el panel táctil de la Mac, presiona con **dos dedos** a la vez. (O mantén Control y haz clic.)'
            ),
          },
          calloutEmoji: '✌️',
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: {
            en: 'Right-click on **Photos**. Here on your phone, **press and hold** it instead.',
            es: 'Haz clic derecho en **Fotos**. Aquí en tu teléfono, **mantén presionado**.',
          },
          config: {
            goal: 'longpress',
            target: 'photos',
            icons: DESKTOP_ICONS,
            menu: ICON_MENU,
          },
        },
        {
          type: 'teach',
          title: { en: 'Reading the menu', es: 'Leer el menú' },
          body: [
            {
              en: 'The menu that appears is just a list of words. Read them. Each one is something you can do — **Open**, **Rename**, **Copy**, **Delete**.',
              es: 'El menú que aparece es solo una lista de palabras. Léelas. Cada una es algo que puedes hacer — **Abrir**, **Cambiar nombre**, **Copiar**, **Eliminar**.',
            },
            {
              en: 'If none of them is what you wanted, click anywhere else and the menu disappears. Nothing happens.',
              es: 'Si ninguna es lo que querías, haz clic en cualquier otro lado y el menú desaparece. No pasa nada.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'desktop',
          prompt: {
            en: 'Press and hold **My Documents**, then choose **Rename** from the menu.',
            es: 'Mantén presionado **Mis documentos**, y elige **Cambiar nombre** en el menú.',
          },
          config: {
            goal: 'menu',
            target: 'docs',
            menuTarget: 'rename',
            icons: DESKTOP_ICONS,
            menu: ICON_MENU,
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'A menu popped up and you do not want any of it. What do you do?',
            es: 'Apareció un menú y no quieres nada de ahí. ¿Qué haces?',
          },
          options: [
            {
              id: 'a',
              emoji: '👆',
              label: { en: 'Click somewhere empty. It goes away.', es: 'Hacer clic en un lugar vacío. Se va.' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🎲',
              label: { en: 'Pick the first thing on the list', es: 'Elegir lo primero de la lista' },
              why: {
                en: 'Never pick something just to make a menu go away. Clicking empty space closes it safely.',
                es: 'Nunca elijas algo solo para que se vaya el menú. Hacer clic en un espacio vacío lo cierra sin riesgo.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            {
              en: 'Right-click asks "what can I do with this?"',
              es: 'El clic derecho pregunta «¿qué puedo hacer con esto?»',
            },
            {
              en: 'A menu is just a list of words. Read it, then choose or click away.',
              es: 'Un menú es solo una lista de palabras. Léela, y elige o haz clic afuera.',
            },
            {
              en: 'Opening a menu never changes anything by itself.',
              es: 'Abrir un menú nunca cambia nada por sí solo.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm1-l7',
      emoji: '📜',
      minutes: 3,
      title: { en: 'There is more below', es: 'Hay más abajo' },
      steps: [
        {
          type: 'teach',
          title: { en: 'The screen is a window, not the whole page', es: 'La pantalla es una ventana, no toda la página' },
          body: [
            {
              en: 'Most pages are longer than the screen. What you see is the top part. The rest is below, waiting.',
              es: 'La mayoría de las páginas son más largas que la pantalla. Lo que ves es la parte de arriba. El resto está abajo, esperando.',
            },
            {
              en: 'Moving down a page is called __scrolling__. You do it all the time on your phone — this is the same thing.',
              es: 'Bajar por una página se llama __desplazarse__. Lo haces todo el tiempo en tu teléfono — es lo mismo.',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'Three ways to scroll', es: 'Tres formas de desplazarte' },
          body: [
            {
              en: '**The wheel.** A mouse has a small wheel between its two buttons. Roll it away from you to go down.',
              es: '**La rueda.** El ratón tiene una ruedita entre sus dos botones. Gírala hacia adelante para bajar.',
            },
            {
              en: '**Two fingers.** On a trackpad, slide two fingers up and down together.',
              es: '**Dos dedos.** En el panel táctil, desliza dos dedos juntos hacia arriba y abajo.',
            },
            {
              en: '**The bar.** There is often a thin bar down the right edge you can drag.',
              es: '**La barra.** Muchas veces hay una barra delgada en la orilla derecha que puedes arrastrar.',
            },
          ],
          callout: {
            en: 'If a button someone told you about is not there — scroll down. It is almost always just below the edge.',
            es: 'Si un botón que te dijeron no aparece — desplázate hacia abajo. Casi siempre está justo debajo de la orilla.',
          },
          calloutEmoji: '👇',
        },
        {
          type: 'sim',
          sim: 'scroll',
          prompt: {
            en: 'This page has a green button at the very bottom. Scroll down and tap it.',
            es: 'Esta página tiene un botón verde hasta abajo. Desplázate y tócalo.',
          },
          config: {
            title: { en: 'Doctor’s appointment', es: 'Cita con el doctor' },
            targetLabel: { en: 'Confirm my appointment', es: 'Confirmar mi cita' },
            decoyLabel: { en: 'See other times', es: 'Ver otros horarios' },
            paragraphs: [
              {
                en: 'Thank you for choosing our clinic. Please read the information below before confirming.',
                es: 'Gracias por elegir nuestra clínica. Por favor lee la información antes de confirmar.',
              },
              {
                en: 'Your appointment is on Tuesday at 10:30 in the morning, with Dr. Ramirez, in the building on Second Street.',
                es: 'Tu cita es el martes a las 10:30 de la mañana, con la Dra. Ramírez, en el edificio de la calle Segunda.',
              },
              {
                en: 'Please arrive fifteen minutes early. Bring a list of any medicines you take, and your insurance card if you have one.',
                es: 'Por favor llega quince minutos antes. Trae una lista de los medicamentos que tomas, y tu tarjeta del seguro si tienes.',
              },
              {
                en: 'If you cannot come, let us know at least a day ahead so we can offer the time to somebody else.',
                es: 'Si no puedes venir, avísanos con al menos un día de anticipación para poder ofrecer el horario a alguien más.',
              },
              {
                en: 'Parking is free in the lot behind the building. The entrance is on the left-hand side as you face the doors.',
                es: 'El estacionamiento es gratis en el lote detrás del edificio. La entrada está del lado izquierdo viendo hacia las puertas.',
              },
            ],
          },
        },
        {
          type: 'recap',
          points: [
            {
              en: 'Pages are usually longer than the screen.',
              es: 'Las páginas casi siempre son más largas que la pantalla.',
            },
            {
              en: 'Scroll with the mouse wheel, two fingers on a trackpad, or the bar on the right.',
              es: 'Desplázate con la rueda del ratón, dos dedos en el panel táctil, o la barra de la derecha.',
            },
            {
              en: 'Missing button? Scroll down before you worry.',
              es: '¿Falta un botón? Desplázate hacia abajo antes de preocuparte.',
            },
          ],
        },
      ],
    },
  ],
}
