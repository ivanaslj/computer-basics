import { useState } from 'react'
import { FakeScreen, Wallpaper, SystemChrome, WindowFrame } from './chrome'
import { useTx, useLocale } from '../../i18n'

/**
 * A mock web browser: tab strip, back / reload, address bar, bookmark star and
 * bookmarks bar, plus three kinds of page — a search home page, a results page
 * and an article.
 *
 * The results page is where the scam-awareness lessons live, so sponsored
 * results and a fake "your computer is infected" result are first-class parts
 * of the model rather than decoration.
 */

const NUDGE = {
  addressNotSearch: {
    en: 'That box is for **searching**. The bar at the very top is where a web address goes.',
    es: 'Esa casilla es para **buscar**. La barra de hasta arriba es donde va una dirección web.',
  },
  searchNotAddress: {
    en: 'The top bar is for **addresses** you already know. To look something up, use the search box **on the page**.',
    es: 'La barra de arriba es para **direcciones** que ya conoces. Para buscar algo, usa la casilla de búsqueda **en la página**.',
  },
  wrongTab: {
    en: 'That’s a different tab — read the little titles along the top.',
    es: 'Esa es otra pestaña — lee los títulos pequeños de arriba.',
  },
  wrongButton: {
    en: 'Not that button. Take another look at the row of buttons at the top.',
    es: 'Ese botón no. Vuelve a mirar la fila de botones de arriba.',
  },
  isAnAd: {
    en: 'Look closely — that one is marked **Sponsored**. Somebody paid to put it there.',
    es: 'Fíjate bien — ese dice **Patrocinado**. Alguien pagó para ponerlo ahí.',
  },
  isAScam: {
    en: 'That one is a **trick**. Real warnings never arrive as a search result, and no real company asks you to call a number like that.',
    es: 'Ese es un **engaño**. Las advertencias reales nunca llegan como resultado de búsqueda, y ninguna empresa real te pide llamar a un número así.',
  },
  betterOne: {
    en: 'That could work, but there’s a more trustworthy one on the list. Look at the web addresses.',
    es: 'Podría servir, pero hay uno más confiable en la lista. Mira las direcciones web.',
  },
}

const AD_LABEL = { en: 'Sponsored', es: 'Patrocinado' }

export default function BrowserSim({ config = {}, onSolved, onMistake, showHint, solved }) {
  const tx = useTx()
  const { device } = useLocale()
  const {
    goal = 'newtab',
    tabs: initialTabs = [{ id: 't1', title: { en: 'New tab', es: 'Pestaña nueva' }, favicon: '🌐' }],
    target,
    page = 'home',
    url = '',
    results = [],
    bookmarks: initialBookmarks = [],
    pageTitle,
    pageBody,
  } = config

  // Result lists and long pages don't fit legibly inside the little laptop
  // screen on a phone, so those steps render the browser at full app width
  // instead. Everything inside is `cqw`-sized, so it simply scales up.
  const fullWidth = config.chrome === false

  const [tabs, setTabs] = useState(initialTabs)
  const [activeTab, setActiveTab] = useState(initialTabs[0]?.id)
  const [bookmarks, setBookmarks] = useState(initialBookmarks)
  const [saved, setSaved] = useState(false)
  const [picked, setPicked] = useState(null)

  const nudge = (key) => onMistake?.(tx(NUDGE[key]))
  const hint = (id) => showHint && !solved && id === (target || goal)

  const browserName =
    device === 'mac' ? 'Safari' : { en: 'Chrome', es: 'Chrome' }

  /* ------------------------------------------------------------ handlers */

  const newTab = () => {
    if (solved) return
    const id = `t${tabs.length + 1}`
    setTabs((t) => [...t, { id, title: { en: 'New tab', es: 'Pestaña nueva' }, favicon: '🌐' }])
    setActiveTab(id)
    if (goal === 'newtab') onSolved?.()
    else nudge('wrongButton')
  }

  const clickTab = (t) => {
    if (solved) return
    setActiveTab(t.id)
    if (goal === 'switchtab') {
      if (t.id === target) onSolved?.()
      else nudge('wrongTab')
    }
  }

  const closeTab = (t, e) => {
    e.stopPropagation()
    if (solved) return
    if (goal === 'closetab') {
      if (t.id !== target) return nudge('wrongTab')
      setTabs((list) => list.filter((x) => x.id !== t.id))
      onSolved?.()
      return
    }
    setTabs((list) => list.filter((x) => x.id !== t.id))
  }

  const clickAddress = () => {
    if (solved) return
    if (goal === 'address') onSolved?.()
    else if (goal === 'searchbox') nudge('searchNotAddress')
    else nudge('wrongButton')
  }

  const clickPageSearch = () => {
    if (solved) return
    if (goal === 'searchbox') onSolved?.()
    else if (goal === 'address') nudge('addressNotSearch')
    else nudge('wrongButton')
  }

  const clickStar = () => {
    if (solved) return
    if (goal === 'bookmark') {
      setSaved(true)
      setBookmarks((b) => [...b, { id: 'saved', title: pageTitle, favicon: '⭐' }])
      onSolved?.()
    } else nudge('wrongButton')
  }

  const clickBookmark = (b) => {
    if (solved) return
    if (goal === 'openbookmark') {
      if (b.id === target) onSolved?.()
      else
        onMistake?.(
          tx({
            en: 'That’s a different saved page — read the names on the bar.',
            es: 'Esa es otra página guardada — lee los nombres de la barra.',
          })
        )
    }
  }

  const clickToolbar = (id) => {
    if (solved) return
    if ((goal === 'back' || goal === 'reload') && id === goal) onSolved?.()
    else nudge('wrongButton')
  }

  const clickResult = (r) => {
    if (solved) return
    setPicked(r.id)
    if (goal !== 'pickresult') return
    if (r.id === target) return onSolved?.()
    if (r.kind === 'ad') return nudge('isAnAd')
    if (r.kind === 'scam') return nudge('isAScam')
    nudge('betterOne')
  }

  /* -------------------------------------------------------------- render */

  const inner = (
    <>
          {/* Tab strip */}
          <div className="flex items-end gap-[0.6cqw] bg-[#e6e4ea] px-[1.2cqw] pt-[1cqw]">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => clickTab(t)}
                className={`flex max-w-[26cqw] min-w-0 items-center gap-[0.8cqw] rounded-t-[1cqw] px-[1.6cqw] py-[1cqw] text-[2.7cqw] font-semibold ${
                  activeTab === t.id ? 'bg-white text-[#2a2830]' : 'bg-black/5 text-[#6b6875]'
                } ${hint(t.id) ? 'anim-halo' : ''}`}
              >
                <span aria-hidden="true">{t.favicon}</span>
                <span className="truncate">{tx(t.title)}</span>
                <span
                  role="button"
                  tabIndex={0}
                  aria-label="Close tab"
                  onClick={(e) => closeTab(t, e)}
                  onKeyDown={(e) => e.key === 'Enter' && closeTab(t, e)}
                  className={`ml-[0.4cqw] rounded-full px-[0.7cqw] text-[2.6cqw] hover:bg-black/10 ${
                    showHint && goal === 'closetab' && t.id === target && !solved ? 'anim-halo bg-brand-soft' : ''
                  }`}
                >
                  ✕
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={newTab}
              aria-label={tx({ en: 'New tab', es: 'Pestaña nueva' })}
              className={`mb-[0.5cqw] rounded-[0.8cqw] px-[1.4cqw] py-[0.6cqw] text-[3.2cqw] font-bold text-[#4b4855] hover:bg-black/10 ${
                showHint && goal === 'newtab' && !solved ? 'anim-halo bg-brand-soft' : ''
              }`}
            >
              +
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-[1.2cqw] border-b border-black/10 bg-[#f6f5f8] px-[1.6cqw] py-[1.2cqw]">
            {[
              { id: 'back', glyph: '‹' },
              { id: 'forward', glyph: '›' },
              { id: 'reload', glyph: '⟳' },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => clickToolbar(b.id)}
                aria-label={b.id}
                className={`flex h-[5cqw] w-[5cqw] items-center justify-center rounded-full text-[3.4cqw] font-bold text-[#4b4855] hover:bg-black/10 ${
                  showHint && goal === b.id && !solved ? 'anim-halo bg-brand-soft' : ''
                }`}
              >
                {b.glyph}
              </button>
            ))}
            <button
              type="button"
              onClick={clickAddress}
              className={`flex min-w-0 flex-1 items-center gap-[1cqw] rounded-full border border-black/10 bg-white px-[2cqw] py-[1cqw] text-left text-[2.9cqw] text-[#4b4855] ${
                showHint && goal === 'address' && !solved ? 'anim-halo ring-[0.5cqw] ring-brand' : ''
              }`}
            >
              <span aria-hidden="true">🔒</span>
              <span className="truncate">{url || tx({ en: 'Search or type an address', es: 'Busca o escribe una dirección' })}</span>
            </button>
            <button
              type="button"
              onClick={clickStar}
              aria-label={tx({ en: 'Save this page', es: 'Guardar esta página' })}
              className={`flex h-[5cqw] w-[5cqw] items-center justify-center rounded-full text-[3.2cqw] hover:bg-black/10 ${
                showHint && goal === 'bookmark' && !solved ? 'anim-halo bg-brand-soft' : ''
              }`}
            >
              {saved ? '⭐' : '☆'}
            </button>
          </div>

          {/* Bookmarks bar */}
          {bookmarks.length > 0 && (
            <div className="flex items-center gap-[1.4cqw] border-b border-black/10 bg-[#fbfafc] px-[2cqw] py-[0.9cqw]">
              {bookmarks.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => clickBookmark(b)}
                  className={`flex items-center gap-[0.6cqw] rounded-[0.8cqw] px-[1.2cqw] py-[0.5cqw] text-[2.6cqw] font-semibold text-[#4b4855] hover:bg-black/5 ${
                    showHint && goal === 'openbookmark' && b.id === target && !solved ? 'anim-halo bg-brand-soft' : ''
                  }`}
                >
                  <span aria-hidden="true">{b.favicon}</span>
                  <span className="max-w-[22cqw] truncate">{tx(b.title)}</span>
                </button>
              ))}
            </div>
          )}

          {/* Page */}
          <div className={`bg-white ${fullWidth ? '' : 'min-h-0 flex-1 overflow-y-auto'}`}>
            {page === 'home' && (
              <div
                className={`flex flex-col items-center justify-center gap-[2.4cqw] px-[6cqw] ${
                  fullWidth ? 'py-[10cqw]' : 'h-full'
                }`}
              >
                <span className="text-[6cqw] font-extrabold tracking-tight text-[#3c3a44]">
                  {tx({ en: 'Search the web', es: 'Buscar en la web' })}
                </span>
                <button
                  type="button"
                  onClick={clickPageSearch}
                  className={`flex w-full items-center gap-[1.6cqw] rounded-full border-[0.4cqw] border-black/10 px-[3cqw] py-[1.8cqw] text-left text-[3cqw] text-[#7a7684] ${
                    showHint && goal === 'searchbox' && !solved ? 'anim-halo ring-[0.5cqw] ring-brand' : ''
                  }`}
                >
                  <span aria-hidden="true">🔍</span>
                  <span>{tx({ en: 'Type what you want to find', es: 'Escribe lo que quieres encontrar' })}</span>
                </button>
              </div>
            )}

            {page === 'results' && (
              <div className="flex flex-col gap-[2cqw] p-[2.6cqw]">
                {results.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => clickResult(r)}
                    className={`rounded-[1.2cqw] border-[0.35cqw] p-[1.8cqw] text-left transition ${
                      solved && r.id === target
                        ? 'border-grass bg-grass-soft'
                        : picked === r.id && r.id !== target
                          ? 'anim-nudge border-berry bg-berry-soft'
                          : 'border-transparent hover:bg-black/[.03]'
                    } ${showHint && r.id === target && !solved ? 'anim-halo bg-brand-soft' : ''}`}
                  >
                    {r.kind === 'ad' && (
                      <span className="mb-[0.6cqw] inline-block rounded-[0.5cqw] bg-[#e9e6ef] px-[1cqw] py-[0.2cqw] text-[2.3cqw] font-bold text-[#5b5563]">
                        {tx(AD_LABEL)}
                      </span>
                    )}
                    <div className="text-[2.5cqw] font-medium text-[#3c7a3c]">{r.url}</div>
                    <div
                      className={`text-[3.4cqw] leading-tight font-bold ${
                        r.kind === 'scam' ? 'text-[#c0356b]' : 'text-[#1a49b8]'
                      }`}
                    >
                      {tx(r.title)}
                    </div>
                    <div className="mt-[0.4cqw] text-[2.7cqw] leading-snug text-[#5b5563]">
                      {tx(r.snippet)}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {page === 'article' && (
              <div className="p-[3cqw]">
                <h1 className="text-[4.4cqw] leading-tight font-extrabold text-[#2a2830]">
                  {tx(pageTitle)}
                </h1>
                <p className="mt-[1.6cqw] text-[3cqw] leading-relaxed text-[#4b4855]">
                  {tx(pageBody)}
                </p>
                <div className="mt-[2.4cqw] space-y-[1cqw]" aria-hidden="true">
                  {[100, 92, 96, 70].map((w, i) => (
                    <div key={i} className="h-[1.6cqw] rounded-full bg-black/8" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
            )}
          </div>
    </>
  )

  if (fullWidth) {
    return (
      <div
        className="overflow-hidden rounded-[1.4rem] border-2 border-line bg-white"
        style={{ containerType: 'inline-size' }}
        role="group"
        aria-label="Practice browser"
      >
        {inner}
      </div>
    )
  }

  return (
    <FakeScreen label="Practice browser">
      <Wallpaper>
        <WindowFrame
          emoji="🌐"
          title={tx(browserName)}
          style={{ left: '2%', top: '3%', width: '96%', height: device === 'mac' ? '82%' : '84%' }}
          bodyClass="bg-white flex flex-col"
        >
          {inner}
        </WindowFrame>

        <SystemChrome apps={[]} />
      </Wallpaper>
    </FakeScreen>
  )
}
