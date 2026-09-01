import { useState } from 'react'
import { useApp } from '../state/store'
import { useT } from '../i18n'
import { Button, Sheet, ChevronLeft } from '../components/ui'
import ClickPractice from '../components/practice/ClickPractice'
import DragPractice from '../components/practice/DragPractice'
import TypePractice from '../components/practice/TypePractice'

/**
 * Shell for the unlimited practice modes. These are not lessons — no
 * completion, no unlocking, no progress bar — so they live outside the
 * course system entirely and keep only a personal best.
 */

const MODES = {
  click: { Component: ClickPractice, titleKey: 'practiceClick', bestKey: 'best' },
  drag: { Component: DragPractice, titleKey: 'practiceDrag', bestKey: 'best' },
  type: { Component: TypePractice, titleKey: 'practiceType', bestKey: 'bestWpm' },
}

/**
 * True on a touch-first device. `(pointer: coarse)` asks what the *primary*
 * input is, which is the actual question — a laptop with a touchscreen still
 * reports fine, and that is right, because it has a mouse and keyboard too.
 */
function isTouchFirst() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(pointer: coarse)').matches
}

export default function Practice({ mode, onExit }) {
  const t = useT()
  const { practice, recordPractice } = useApp()
  const config = MODES[mode]

  // Shown once per visit rather than stored as a preference — a one-line
  // dismissal is not worth persisting, and someone who switches to a laptop
  // should simply stop seeing it. App.jsx keys this screen by mode, so
  // switching modes remounts and the notice is evaluated fresh.
  const [showNotice, setShowNotice] = useState(isTouchFirst)

  if (!config) return null
  const { Component, titleKey, bestKey } = config
  const best = practice?.[mode]?.[bestKey] || 0

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col">
      <header className="flex items-center gap-2 border-b-2 border-line px-3 pt-[max(0.8rem,env(safe-area-inset-top))] pb-3">
        <button
          type="button"
          onClick={onExit}
          aria-label={t('back')}
          className="rounded-full p-1.5 text-ink-soft active:bg-cream-deep"
        >
          <ChevronLeft />
        </button>
        <h1 className="text-[1.15rem] font-extrabold tracking-tight">{t(titleKey)}</h1>
      </header>

      <main className="flex-1 px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <Component onFinish={(scores) => recordPractice(mode, scores)} best={best} />
      </main>

      <Sheet open={showNotice} onClose={() => setShowNotice(false)} title={t('phoneNoticeTitle')}>
        <p className="mb-5 leading-snug text-ink-soft">
          {mode === 'type' ? t('phoneNoticeTyping') : t('phoneNoticeBody')}
        </p>
        <Button full onClick={() => setShowNotice(false)}>
          {t('phoneNoticeContinue')}
        </Button>
      </Sheet>
    </div>
  )
}
