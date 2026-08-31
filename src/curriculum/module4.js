import { dev } from '../i18n/content.js'

/**
 * Module 4 — Using a browser.
 *
 * Two ideas do most of the work here: the browser is a window onto the
 * internet (not the internet itself), and the bar at the top is for addresses
 * you already know while the box on the page is for questions you have.
 * Everything else — tabs, back, bookmarks — hangs off those.
 */

const TABS = [
  { id: 't1', favicon: '📰', title: { en: 'The news', es: 'Las noticias' } },
  { id: 't2', favicon: '🍮', title: { en: 'Flan recipe', es: 'Receta de flan' } },
]

export default {
  id: 'm4',
  number: 4,
  emoji: '🌐',
  color: 'brand',
  title: { en: 'Using a browser', es: 'Usar un navegador' },
  subtitle: {
    en: 'The window you look at the internet through',
    es: 'La ventana por la que miras el internet',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm4-l1',
      emoji: '🪟',
      minutes: 4,
      title: { en: 'The internet and the browser', es: 'El internet y el navegador' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Two different things', es: 'Dos cosas distintas' },
          visual: { art: 'internet-vs-browser' },
          body: [
            {
              en: 'The __internet__ is all the pages in the world, sitting on computers elsewhere. You cannot touch it. It is just... out there.',
              es: 'El __internet__ son todas las páginas del mundo, guardadas en computadoras en otros lados. No lo puedes tocar. Simplemente... está allá afuera.',
            },
            {
              en: 'A __browser__ is an app on **your** computer whose only job is to fetch those pages and show them to you. It is the window; the internet is the view.',
              es: 'Un __navegador__ es una aplicación en **tu** computadora cuyo único trabajo es traer esas páginas y mostrártelas. Es la ventana; el internet es la vista.',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'Which browser do you have?', es: '¿Cuál navegador tienes?' },
          body: [
            {
              en: dev(
                'On Windows the usual ones are **Chrome** (a coloured circle) and **Edge** (a blue-green swirl). Both work the same way.',
                'On a Mac the usual one is **Safari** (a blue compass). **Chrome** is common too. Both work the same way.'
              ),
              es: dev(
                'En Windows los comunes son **Chrome** (un círculo de colores) y **Edge** (un remolino azul-verde). Los dos funcionan igual.',
                'En Mac el común es **Safari** (una brújula azul). **Chrome** también es común. Los dos funcionan igual.'
              ),
            },
            {
              en: 'It genuinely does not matter which one you use. Everything in this module works the same in all of them.',
              es: 'De verdad no importa cuál uses. Todo en este módulo funciona igual en todos.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'Somebody says "open your browser". What are they asking for?',
            es: 'Alguien te dice «abre tu navegador». ¿Qué te está pidiendo?',
          },
          options: [
            {
              id: 'a',
              emoji: '🌐',
              label: {
                en: dev(
                  'Open Chrome, Edge, or whatever you use for websites',
                  'Open Safari, Chrome, or whatever you use for websites'
                ),
                es: dev(
                  'Abrir Chrome, Edge, o lo que uses para sitios web',
                  'Abrir Safari, Chrome, o lo que uses para sitios web'
                ),
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🔌',
              label: { en: 'Turn on the internet', es: 'Prender el internet' },
              why: {
                en: 'The internet is already on. The browser is the app you open to look at it.',
                es: 'El internet ya está prendido. El navegador es la aplicación que abres para mirarlo.',
              },
            },
            {
              id: 'c',
              emoji: '📧',
              label: { en: 'Open your email', es: 'Abrir tu correo' },
              why: {
                en: 'Email is one thing you can do *in* a browser, but they are not the same thing.',
                es: 'El correo es una cosa que puedes hacer *en* un navegador, pero no son lo mismo.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'The internet is all the pages out there.', es: 'El internet son todas las páginas de allá afuera.' },
            {
              en: 'A browser is the app that shows them to you.',
              es: 'Un navegador es la aplicación que te las muestra.',
            },
            {
              en: 'Chrome, Safari and Edge are all browsers. Pick any one.',
              es: 'Chrome, Safari y Edge son navegadores. Elige cualquiera.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm4-l2',
      emoji: '🔤',
      minutes: 5,
      title: { en: 'The bar at the top', es: 'La barra de arriba' },
      steps: [
        {
          type: 'teach',
          title: { en: 'An address is like a street address', es: 'Una dirección es como una dirección de casa' },
          visual: { art: 'address-vs-search' },
          body: [
            {
              en: 'Every website has an __address__ — **bbc.com**, **gmail.com**, **wikipedia.org**. It is the exact location of a place, the way "42 Oak Street" is.',
              es: 'Todo sitio web tiene una __dirección__ — **bbc.com**, **gmail.com**, **wikipedia.org**. Es la ubicación exacta de un lugar, igual que «Calle Roble 42».',
            },
            {
              en: 'The wide bar across the top of the browser is the __address bar__. Type an address there and press [[Enter]], and you go straight to that place.',
              es: 'La barra ancha de arriba del navegador es la __barra de direcciones__. Escribe una dirección ahí, presiona [[Enter]], y vas directo a ese lugar.',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'A search box is like asking someone', es: 'Una casilla de búsqueda es como preguntarle a alguien' },
          body: [
            {
              en: 'A __search box__ sits **in the middle of a page**, not at the top of the browser. You type a question into it — "how to make flan" — and it suggests places to go.',
              es: 'Una __casilla de búsqueda__ está **en medio de una página**, no arriba del navegador. Escribes una pregunta ahí — «cómo hacer flan» — y te sugiere a dónde ir.',
            },
            {
              en: 'Address bar: you already know where you are going. Search box: you do not, and you want ideas.',
              es: 'Barra de direcciones: ya sabes a dónde vas. Casilla de búsqueda: no sabes, y quieres ideas.',
            },
          ],
          callout: {
            en: 'Modern browsers accept either one in the top bar, so a mistake here costs you nothing. But knowing the difference stops a lot of confusion.',
            es: 'Los navegadores modernos aceptan las dos cosas en la barra de arriba, así que equivocarte no cuesta nada. Pero saber la diferencia evita mucha confusión.',
          },
        },
        {
          type: 'sim',
          sim: 'browser',
          prompt: {
            en: 'Your niece told you to go to **bbc.com**. Tap where you would type that.',
            es: 'Tu sobrina te dijo que vayas a **bbc.com**. Toca dónde escribirías eso.',
          },
          config: { goal: 'address', page: 'home', tabs: [TABS[0]] },
        },
        {
          type: 'sim',
          sim: 'browser',
          prompt: {
            en: 'Now you want to look up **how to make flan**, and you do not know which website. Tap where you would type that.',
            es: 'Ahora quieres buscar **cómo hacer flan**, y no sabes en qué sitio. Toca dónde escribirías eso.',
          },
          config: { goal: 'searchbox', page: 'home', tabs: [TABS[0]] },
        },
        {
          type: 'recap',
          points: [
            {
              en: 'Address bar, at the very top: for a website you already know.',
              es: 'Barra de direcciones, hasta arriba: para un sitio que ya conoces.',
            },
            {
              en: 'Search box, in the page: for a question you have.',
              es: 'Casilla de búsqueda, en la página: para una pregunta que tienes.',
            },
            { en: 'Press Enter to go.', es: 'Presiona Enter para ir.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm4-l3',
      emoji: '🗂️',
      minutes: 5,
      title: { en: 'Tabs: several pages at once', es: 'Pestañas: varias páginas a la vez' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Like tabs in a folder', es: 'Como las pestañas de una carpeta' },
          body: [
            {
              en: 'A __tab__ lets one browser window hold several pages at the same time. Each tab has a little title along the top, and you click between them.',
              es: 'Una __pestaña__ permite que una ventana del navegador tenga varias páginas al mismo tiempo. Cada pestaña tiene un título arriba, y haces clic para cambiar entre ellas.',
            },
            {
              en: 'This is how you keep a recipe open while you look at something else, without losing the recipe.',
              es: 'Así puedes tener una receta abierta mientras miras otra cosa, sin perder la receta.',
            },
          ],
        },
        {
          type: 'teach',
          title: { en: 'Opening, switching, closing', es: 'Abrir, cambiar, cerrar' },
          body: [
            {
              en: 'The small **+** to the right of the tabs opens a new one.',
              es: 'El **+** pequeño a la derecha de las pestañas abre una nueva.',
            },
            {
              en: 'Click any tab to go to it. Click the tiny **✕** on a tab to close just that page.',
              es: 'Haz clic en cualquier pestaña para ir a ella. Haz clic en la **✕** pequeñita de una pestaña para cerrar solo esa página.',
            },
          ],
          callout: {
            en: 'Closing a **tab** closes one page. Closing the **window** closes all of them at once. That is the difference that catches people out.',
            es: 'Cerrar una **pestaña** cierra una página. Cerrar la **ventana** las cierra todas de golpe. Esa es la diferencia que confunde a la gente.',
          },
          calloutTone: 'berry',
          calloutEmoji: '⚠️',
        },
        {
          type: 'sim',
          sim: 'browser',
          prompt: { en: 'Open a **new tab**.', es: 'Abre una **pestaña nueva**.' },
          config: { goal: 'newtab', page: 'home', tabs: TABS },
        },
        {
          type: 'sim',
          sim: 'browser',
          prompt: {
            en: 'Switch to the tab with the **Flan recipe**.',
            es: 'Cambia a la pestaña de la **Receta de flan**.',
          },
          config: { goal: 'switchtab', target: 't2', page: 'home', tabs: TABS },
        },
        {
          type: 'sim',
          sim: 'browser',
          prompt: {
            en: 'You are done with **The news**. Close just that tab.',
            es: 'Ya terminaste con **Las noticias**. Cierra solo esa pestaña.',
          },
          config: { goal: 'closetab', target: 't1', page: 'home', tabs: TABS },
        },
        {
          type: 'recap',
          points: [
            { en: 'Tabs hold several pages in one window.', es: 'Las pestañas guardan varias páginas en una ventana.' },
            { en: '+ opens a tab, ✕ on the tab closes it.', es: '+ abre una pestaña, ✕ en la pestaña la cierra.' },
            {
              en: 'Closing the window closes every tab in it.',
              es: 'Cerrar la ventana cierra todas sus pestañas.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm4-l4',
      emoji: '⬅️',
      minutes: 3,
      title: { en: 'Back, and starting over', es: 'Atrás, y volver a empezar' },
      steps: [
        {
          type: 'teach',
          title: { en: 'The most useful button on the internet', es: 'El botón más útil del internet' },
          body: [
            {
              en: 'The arrow pointing **left**, at the top of the browser, takes you back to the page you were on before. It works over and over, like retracing your steps.',
              es: 'La flecha que apunta a la **izquierda**, arriba del navegador, te regresa a la página donde estabas antes. Funciona una y otra vez, como desandar tus pasos.',
            },
            {
              en: 'This is the escape hatch. Clicked something odd? Landed somewhere confusing? Press back. You are safe.',
              es: 'Esta es la salida de emergencia. ¿Hiciste clic en algo raro? ¿Llegaste a algún lado confuso? Presiona atrás. Estás a salvo.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'browser',
          prompt: {
            en: 'This page is not what you wanted. Go **back**.',
            es: 'Esta página no es lo que querías. Regresa **atrás**.',
          },
          config: {
            goal: 'back',
            page: 'article',
            url: 'example-shop.com/offers',
            tabs: [{ id: 't1', favicon: '🛒', title: { en: 'Special offers', es: 'Ofertas' } }],
            pageTitle: { en: 'Amazing offers just for you!', es: '¡Ofertas increíbles solo para ti!' },
            pageBody: {
              en: 'This is not the page you were looking for. Nothing bad has happened — you just took a wrong turn.',
              es: 'Esta no es la página que buscabas. No pasó nada malo — solo diste una vuelta equivocada.',
            },
          },
        },
        {
          type: 'teach',
          title: { en: 'When a page misbehaves', es: 'Cuando una página se porta mal' },
          body: [
            {
              en: 'The circular arrow **⟳** next to it is __refresh__. It asks for the page again, fresh.',
              es: 'La flecha circular **⟳** de al lado es __recargar__. Pide la página otra vez, desde cero.',
            },
            {
              en: 'If a page looks broken, half-loaded, or stuck — refresh it before anything else. It fixes most of these.',
              es: 'Si una página se ve rota, a medio cargar, o atorada — recárgala antes que nada. Eso arregla casi todo.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'browser',
          prompt: {
            en: 'This page loaded strangely. **Refresh** it.',
            es: 'Esta página cargó raro. **Recárgala**.',
          },
          config: {
            goal: 'reload',
            page: 'article',
            url: 'news-site.com',
            tabs: [{ id: 't1', favicon: '📰', title: { en: 'The news', es: 'Las noticias' } }],
            pageTitle: { en: 'The news', es: 'Las noticias' },
            pageBody: {
              en: 'Half of this page is missing. That usually means it did not finish arriving.',
              es: 'A esta página le falta la mitad. Eso casi siempre significa que no terminó de llegar.',
            },
          },
        },
        {
          type: 'recap',
          points: [
            {
              en: 'The left arrow goes back. Use it whenever you feel lost.',
              es: 'La flecha izquierda regresa. Úsala cuando te sientas perdida.',
            },
            {
              en: 'The circular arrow refreshes a page that looks broken.',
              es: 'La flecha circular recarga una página que se ve rota.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm4-l5',
      emoji: '⭐',
      minutes: 4,
      title: { en: 'Saving a page for later', es: 'Guardar una página para después' },
      steps: [
        {
          type: 'teach',
          title: { en: 'A bookmark is a ribbon in a book', es: 'Un marcador es un listón en un libro' },
          body: [
            {
              en: 'When you find a page you will want again, save it as a __bookmark__ (some browsers call it a __favourite__). You never have to search for it a second time.',
              es: 'Cuando encuentres una página que vas a querer otra vez, guárdala como __marcador__ (algunos navegadores le dicen __favorito__). Nunca tendrás que buscarla de nuevo.',
            },
            {
              en: 'The **☆ star** near the address bar does it. Click it, and the star fills in. The page is saved.',
              es: 'La **☆ estrella** cerca de la barra de direcciones lo hace. Haz clic, y la estrella se rellena. La página quedó guardada.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'browser',
          prompt: {
            en: 'This is a recipe you will want again. **Save it**.',
            es: 'Esta es una receta que vas a querer otra vez. **Guárdala**.',
          },
          config: {
            goal: 'bookmark',
            page: 'article',
            url: 'cooking.com/flan',
            tabs: [{ id: 't1', favicon: '🍮', title: { en: 'Flan recipe', es: 'Receta de flan' } }],
            pageTitle: { en: 'The best flan', es: 'El mejor flan' },
            pageBody: {
              en: 'Six eggs, one tin of condensed milk, one tin of evaporated milk, a spoon of vanilla.',
              es: 'Seis huevos, una lata de leche condensada, una lata de leche evaporada, una cucharada de vainilla.',
            },
          },
        },
        {
          type: 'teach',
          title: { en: 'Finding them again', es: 'Volver a encontrarlos' },
          body: [
            {
              en: 'Saved pages appear on a thin strip just under the address bar. One click on a name takes you straight there.',
              es: 'Las páginas guardadas aparecen en una franja delgada justo debajo de la barra de direcciones. Un clic en un nombre te lleva directo.',
            },
            {
              en: 'Save the handful you actually use — your bank, your email, the news you read. Not everything.',
              es: 'Guarda las pocas que de verdad usas — tu banco, tu correo, las noticias que lees. No todo.',
            },
          ],
        },
        {
          type: 'sim',
          sim: 'browser',
          prompt: {
            en: 'Open your saved **Flan recipe** from the bar of saved pages.',
            es: 'Abre tu **Receta de flan** guardada desde la barra de páginas guardadas.',
          },
          config: {
            goal: 'openbookmark',
            target: 'flan',
            page: 'home',
            tabs: [{ id: 't1', favicon: '🌐', title: { en: 'New tab', es: 'Pestaña nueva' } }],
            bookmarks: [
              { id: 'bank', favicon: '🏦', title: { en: 'My bank', es: 'Mi banco' } },
              { id: 'flan', favicon: '🍮', title: { en: 'Flan recipe', es: 'Receta de flan' } },
              { id: 'news', favicon: '📰', title: { en: 'The news', es: 'Las noticias' } },
            ],
          },
        },
        {
          type: 'recap',
          points: [
            { en: 'The ☆ star saves the page you are on.', es: 'La estrella ☆ guarda la página donde estás.' },
            {
              en: 'Saved pages sit on the strip under the address bar.',
              es: 'Las páginas guardadas están en la franja debajo de la barra de direcciones.',
            },
            {
              en: 'Save the few you use often — not everything.',
              es: 'Guarda las pocas que usas seguido — no todo.',
            },
          ],
        },
      ],
    },
  ],
}
