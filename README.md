# Computer Basics

A phone-first course that teaches complete beginners how to use a computer.
Short lessons, hands-on practice on mock interfaces, and no way to fail.

Built as an installable PWA: you hand someone a link, they add it to their home
screen, and it works from then on with or without a connection.

<p align="center">
  <img src="docs/screenshots/home-path.png" width="200" alt="Lesson path screen" />
  <img src="docs/screenshots/practice-double-click.png" width="200" alt="Practicing a double-click on a mock desktop" />
  <img src="docs/screenshots/spotting-a-scam.png" width="200" alt="A lesson on spotting a fake tech-support warning" />
  <img src="docs/screenshots/shortcut-cheatsheet.png" width="200" alt="Windows and Mac keyboard shortcut cheat sheet" />
</p>

## Why this exists

Most tutorials for first-time computer users are either written for people who
already know the vocabulary, or are a video you can't practice along with. The
gap this fills: someone who has a phone but has never really used a laptop —
who doesn't know what a "browser" is, or that a single click and a double
click do different things, and who gets discouraged fast when something makes
them feel dumb.

So the design choices follow from that, not from what would look impressive:

- **No punishing failure states.** Getting something wrong costs nothing —
  there's no score, no lives, no timer, just a gentle explanation and another
  try.
- **Practice, not description.** "Click the X to close a window" is a
  simulated mini desktop you actually click on, not a paragraph to read.
- **Meets people on the device they have.** It's built mobile-first because
  that's the device most beginners are comfortable on, even while the lessons
  teach a laptop/desktop.
- **A real link, not an app-store account.** Progressive Web App, installable
  to the home screen with one tap, works offline after the first load — no
  $99/year developer account standing between "finished building this" and
  "my mom can use it."

## What's in the course

Seven modules, 31 lessons, built around eight interactive simulations rather
than static screenshots — a working mock desktop, window manager, file
explorer with real drag-and-drop, a browser with tabs and search results
(ads and a scam included, on purpose), a keyboard where modifier keys latch
so a touchscreen can practice real shortcuts, and a mock AI chat:

1. **The absolute basics** — turning a computer on/off, the desktop, icons,
   one click vs. two, right-click menus, scrolling
2. **Windows and apps** — opening, closing vs. minimising, switching between
   windows, `Alt+Tab` / `Cmd+Tab`
3. **Files and folders** — what a file/folder is, making one, moving,
   renaming, where downloads go
4. **Using a browser** — address bar vs. search box, tabs, back/reload,
   bookmarks
5. **Searching, safely** — writing a good search, telling an ad from a real
   result, spotting a scam
6. **Using AI helpers** — what one is, asking a good question, what to
   double-check
7. **Keyboard shortcuts** — copy/paste/undo, screenshots, a side-by-side
   Windows/Mac cheat sheet

Every lesson is tailored to the learner's actual computer (Windows or Mac,
chosen once at setup) and is fully bilingual — English and Spanish, including
every screen, prompt, and piece of feedback, not just the menus.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script          | What it does                                              |
| --------------- | --------------------------------------------------------- |
| `npm run dev`   | Dev server                                                 |
| `npm run build` | Checks the curriculum, then builds to `dist/`              |
| `npm run check` | Checks the curriculum only (see below)                     |
| `npm run lint`  | oxlint                                                     |
| `npm run icons` | Regenerates the app icons in `public/icons/`               |

### Testing on a phone

Installing to a home screen and working offline both need a **secure origin**.
`localhost` counts; `http://192.168.x.x` does not — over plain http the service
worker never registers, so you'd be testing the app without the two things that
make it an app.

So there's a self-signed cert for LAN testing. Generate it once:

```bash
mkdir -p .certs && openssl req -x509 -nodes -days 825 -newkey rsa:2048 \
  -keyout .certs/key.pem -out .certs/cert.pem -config .certs/openssl.cnf
```

`.certs/openssl.cnf` lists the addresses the cert is valid for — add your
machine's LAN IP there if it changes. Then:

```bash
npm run build
HTTPS=1 npx vite preview --port 4173     # the real build, service worker and all
HTTPS=1 npm run dev                       # or the dev server, for iterating
```

Both print a `Network:` URL to open on the phone. The phone will warn that the
certificate isn't trusted — that's expected for a self-signed cert on your own
network. Tap through it (Chrome: *Advanced → Proceed*; Safari: *Show Details →
visit this website*) and the service worker registers normally.

`.certs/` is gitignored. The certificate is only ever used by the dev and
preview servers; it has nothing to do with the production build.

### Deploying

`dist/` is a static folder — Netlify, Vercel, Cloudflare Pages, GitHub Pages,
anything. It must be served over **HTTPS** (or localhost) or the service worker
won't register and the app won't install or work offline.

Serving from a subpath (GitHub Pages, say) needs the base path at build time:

```bash
BASE_PATH=/computer-basics/ npm run build
```

---

## How it is put together

```
src/
  curriculum/     the course — one file per module, plain data
  components/
    sims/         the mock computer: desktop, windows, files, browser, keyboard
    Art.jsx       hand-drawn diagrams (phone vs. computer, the cheat sheet, …)
    StepView.jsx  renders one step of a lesson
    ui.jsx        buttons, cards, sheets, the rich-text renderer
  screens/        Onboarding, Path (home), Lesson, Settings
  state/store.jsx all progress and settings
  lib/
    storage.js    the only file that touches persistence
    gestures.js   tap → click, double tap → double-click, hold → right-click
  i18n/           UI strings, plus the content resolver
```

### Writing content

A lesson is a list of steps. Any text can be a plain string, a `{ en, es }`
pair, or `dev(windows, mac)` to differ by platform — and these nest.

```js
{
  id: 'm3-l4',
  emoji: '✋',
  minutes: 4,
  title: { en: 'Moving a file', es: 'Mover un archivo' },
  steps: [
    { type: 'teach', title: …, body: [ … ], visual: { art: 'file-vs-folder' } },
    { type: 'sim',   sim: 'files', prompt: …, config: { goal: 'move', … } },
    { type: 'choice', prompt: …, options: [{ id, label, correct }, …] },
    { type: 'sort',  prompt: …, buckets: [ … ], items: [ … ] },
    { type: 'recap', points: [ … ] },
  ],
}
```

Inside any string: `**bold**`, `__a term being defined__`, `[[Ctrl]]` for a key cap.

`npm run check` validates every lesson — missing translations, a simulation
pointing at something that isn't on screen, a question with no right answer, a
wrong answer with no explanation, a lesson with no recap. It runs as part of
`npm run build`, so those can't ship.

### The simulations

Each one takes the same props — `config`, `onSolved`, `onMistake(message)`,
`showHint`, `solved` — so a lesson names one by string. They chrome themselves
as Windows or Mac based on the learner's setup.

Touch gestures stand in for mouse actions (`src/lib/gestures.js`): one tap is a
click, two quick taps a double-click, press-and-hold a right-click. That mapping
is what makes it possible to practise mouse skills on a phone.

---

## Design rules

These are deliberate; changing them changes the app's character.

- **Nothing punishes.** No lives, no score, no timer. A wrong answer explains
  itself and hands the step straight back.
- **Help escalates on its own.** A hint offer after one miss, the answer after
  two. Naming steps spell out what to type, so nobody can get stuck.
- **Show, don't tell.** Where a lesson can be practised on a mock interface
  rather than described, it is.
- **Every term gets defined the first time it appears.**
- **Locking is guidance, not a wall** — a locked lesson offers "open it anyway".

---

## What v1 leaves out, on purpose

No accounts, no backend, no payments, no analytics. Progress lives in
`localStorage` on the device.

When accounts are wanted, `src/lib/storage.js` is the seam: give `load`/`save` a
networked implementation plus a merge strategy, and add the `state.account`
check in `src/state/store.jsx`. Nothing in the screens or the curriculum has to
change. Settings has the place a sign-in section would go.
