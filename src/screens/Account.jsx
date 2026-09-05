import { useState } from 'react'
import { useAuth } from '../state/auth'
import { useApp } from '../state/store'
import { useT } from '../i18n'
import { Button, Card, Field, ChevronLeft, Check } from '../components/ui'
import Icon from '../components/icons'

/**
 * Signing up, signing in, and getting back in after forgetting a password.
 *
 * One screen with a mode rather than three screens, because the difference
 * between "sign up" and "sign in" is not obvious to someone new — they think
 * of it as "get to my stuff". The heading and the button change; the form
 * mostly doesn't.
 *
 * Nothing here is a gate. Every path out leads back to the app, and a learner
 * who never opens this screen loses nothing at all.
 */

const MIN_PASSWORD = 8

export default function Account({ onBack }) {
  const t = useT()
  const auth = useAuth()
  const { syncState } = useApp()

  // 'in' | 'up' | 'forgot' | 'sent' | 'reset'
  const [mode, setMode] = useState(auth.recovering ? 'reset' : 'in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [fieldError, setFieldError] = useState(null)
  const [busy, setBusy] = useState(false)

  const go = (next) => {
    setMode(next)
    setError(null)
    setFieldError(null)
  }

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setFieldError(null)

    if (mode !== 'reset' && !email.trim()) return setFieldError({ on: 'email', key: 'authNeedEmail' })
    if (mode !== 'forgot' && password.length < MIN_PASSWORD)
      return setFieldError({ on: 'password', key: 'authPasswordShort' })

    setBusy(true)
    const run =
      mode === 'up'
        ? auth.signUp(email, password)
        : mode === 'in'
          ? auth.signIn(email, password)
          : mode === 'forgot'
            ? auth.requestPasswordReset(email)
            : auth.updatePassword(password)
    const { error: key } = await run
    setBusy(false)

    if (key) return setError(t(key))
    if (mode === 'forgot') return go('sent')
    // Signing in or setting a new password lands them back in the app; the
    // store notices the new session and folds their progress together.
    onBack()
  }

  if (auth.session && mode !== 'reset') return <SignedIn onBack={onBack} syncState={syncState} />

  const titleKey = { in: 'authSignIn', up: 'authCreate', forgot: 'authForgotTitle', sent: 'authSentTitle', reset: 'authNewPasswordTitle' }[mode]

  return (
    <div className="mx-auto min-h-dvh max-w-lg pb-16">
      <Header title={t(titleKey)} onBack={onBack} t={t} />

      <div className="flex flex-col gap-5 px-5 pt-6">
        {mode === 'sent' ? (
          <>
            <Card tone="grass" className="flex flex-col gap-2">
              <span className="text-grass">
                <Icon name="mail" className="h-8 w-8" />
              </span>
              <p className="leading-snug">{t('authSentBody', { email })}</p>
            </Card>
            <Button full onClick={() => go('in')}>
              {t('authBackToSignIn')}
            </Button>
          </>
        ) : (
          <>
            <p className="leading-snug text-ink-soft text-pretty">
              {t(
                mode === 'up' ? 'authCreateBlurb' : mode === 'forgot' ? 'authForgotBlurb' : mode === 'reset' ? 'authNewPasswordBlurb' : 'authSignInBlurb'
              )}
            </p>

            <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
              {mode !== 'reset' && (
                <Field
                  id="email"
                  label={t('authEmail')}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={setEmail}
                  disabled={busy}
                  error={fieldError?.on === 'email' ? t(fieldError.key) : null}
                />
              )}

              {mode !== 'forgot' && (
                <Field
                  id="password"
                  label={t(mode === 'reset' ? 'authNewPassword' : 'authPassword')}
                  type="password"
                  autoComplete={mode === 'in' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={setPassword}
                  disabled={busy}
                  showLabel={t('authShow')}
                  hideLabel={t('authHide')}
                  hint={mode === 'in' ? null : t('authPasswordHint', { n: MIN_PASSWORD })}
                  error={fieldError?.on === 'password' ? t(fieldError.key) : null}
                />
              )}

              {error && (
                <p className="rounded-2xl border-2 border-berry/25 bg-berry-soft p-3 leading-snug font-semibold" role="alert">
                  {error}
                </p>
              )}

              <Button full type="submit" disabled={busy}>
                {busy
                  ? t('authWorking')
                  : t({ in: 'authSignIn', up: 'authCreate', forgot: 'authSendReset', reset: 'authSavePassword' }[mode])}
              </Button>
            </form>

            {/* Switching between the two is the most common thing someone
                needs here, so it is a plain visible choice, not fine print. */}
            {mode === 'in' && (
              <div className="flex flex-col gap-3">
                <Button full variant="neutral" onClick={() => go('up')}>
                  {t('authNoAccount')}
                </Button>
                <Button full variant="ghost" onClick={() => go('forgot')}>
                  {t('authForgot')}
                </Button>
              </div>
            )}
            {mode === 'up' && (
              <Button full variant="neutral" onClick={() => go('in')}>
                {t('authHaveAccount')}
              </Button>
            )}
            {mode === 'forgot' && (
              <Button full variant="ghost" onClick={() => go('in')}>
                {t('authBackToSignIn')}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function SignedIn({ onBack, syncState }) {
  const t = useT()
  const auth = useAuth()
  return (
    <div className="mx-auto min-h-dvh max-w-lg pb-16">
      <Header title={t('authAccountTitle')} onBack={onBack} t={t} />
      <div className="flex flex-col gap-5 px-5 pt-6">
        <Card className="flex flex-col gap-3">
          <p className="text-sm font-bold tracking-widest text-ink-soft uppercase">
            {t('authSignedInAs')}
          </p>
          <p className="text-[1.05rem] font-extrabold break-all">{auth.email}</p>
          <SyncLine syncState={syncState} t={t} />
        </Card>
        <p className="leading-snug text-ink-soft text-pretty">{t('authSignedOutKeepsProgress')}</p>
        <Button full variant="neutral" onClick={auth.signOut}>
          {t('authSignOut')}
        </Button>
      </div>
    </div>
  )
}

export function SyncLine({ syncState, t }) {
  const map = {
    syncing: { key: 'syncSyncing', tone: 'text-ink-soft', icon: 'cloud' },
    saved: { key: 'syncSaved', tone: 'text-grass', icon: 'check' },
    offline: { key: 'syncOffline', tone: 'text-ink-soft', icon: 'cloud' },
    idle: { key: 'syncIdle', tone: 'text-ink-soft', icon: 'cloud' },
  }
  const s = map[syncState] || map.idle
  return (
    <p className={`flex items-center gap-2 text-[0.95rem] font-semibold ${s.tone}`}>
      {s.icon === 'check' ? <Check className="h-4 w-4" /> : <Icon name="cloud" className="h-5 w-5" />}
      {t(s.key)}
    </p>
  )
}

function Header({ title, onBack, t }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 border-b-2 border-line bg-cream/90 px-3 pt-[max(0.8rem,env(safe-area-inset-top))] pb-3 backdrop-blur-md">
      <button
        type="button"
        onClick={onBack}
        aria-label={t('back')}
        className="rounded-full p-1.5 text-ink-soft active:bg-cream-deep"
      >
        <ChevronLeft />
      </button>
      <h1 className="text-[1.15rem] font-extrabold tracking-tight">{title}</h1>
    </header>
  )
}
