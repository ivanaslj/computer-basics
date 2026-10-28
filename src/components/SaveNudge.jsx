import { useEffect } from 'react'
import { useApp } from '../state/store'
import { useAuth } from '../state/auth'
import { useT } from '../i18n'
import { shouldShowSaveNudge, NUDGE_TEST } from '../lib/nudge'
import { Button, Card } from './ui'
import Icon from './icons'

let testResetDone = false

/**
 * The calm "save your progress" card at the top of the home screens. When it
 * shows is decided in lib/nudge.js; "Save my progress" opens the same account
 * screen as the button in Settings, which stays where it was.
 *
 * Big text on purpose: this is the one place the app asks something of a
 * learner who did not go looking for it, so it must be easy to read and easy to
 * say no to.
 */
export default function SaveNudge({ onOpenAccount }) {
  const t = useT()
  const auth = useAuth()
  const { saveNudge, totalLessonsDone, dismissSaveNudge, resetSaveNudge } = useApp()

  useEffect(() => {
    if (NUDGE_TEST === 'reset' && !testResetDone) {
      testResetDone = true
      resetSaveNudge()
    }
  }, [resetSaveNudge])

  // Not while the stored session is still being read back: for that moment a
  // signed-in learner looks signed out, and the card would flash at them.
  const show =
    NUDGE_TEST === 'show' ||
    (!auth.loading &&
    shouldShowSaveNudge(
      { lessonsDone: totalLessonsDone, saveNudge },
      { accountsEnabled: auth.accountsEnabled, signedIn: Boolean(auth.session) }
    ))
  if (!show) return null

  return (
    <div className="px-5 pt-5">
      <Card className="flex flex-col gap-4" role="region" aria-label={t('saveNudgeTitle')}>
        <div className="flex items-start gap-3">
          <span className="shrink-0 pt-0.5 text-brand">
            <Icon name="cloud" className="h-8 w-8" />
          </span>
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.3rem] leading-tight font-extrabold text-balance">{t('saveNudgeTitle')}</h2>
            <p className="text-[1.12rem] leading-snug text-pretty">{t('saveNudgeBody')}</p>
          </div>
        </div>
        <Button full onClick={onOpenAccount}>
          {t('accountSaveCta')}
        </Button>
        <Button full variant="neutral" onClick={dismissSaveNudge}>
          {t('saveNudgeLater')}
        </Button>
      </Card>
    </div>
  )
}
