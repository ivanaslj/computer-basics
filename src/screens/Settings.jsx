import { useState } from 'react'
import { useApp } from '../state/store'
import { useT, useTx } from '../i18n'
import { useInstallPrompt } from '../lib/install'
import { Button, Card, Sheet, ProgressBar, ChevronLeft, Check } from '../components/ui'
import Icon from '../components/icons'
import { useAuth } from '../state/auth'
import { SyncLine } from './Account'

/**
 * Where to find the project and its maintainer. All temporary in the sense
 * that they are personal accounts, not Computer Basics ones — when the app
 * gets its own (a Discord server is the next one planned, plus Instagram),
 * add them to LINKS below and swap the address on this line.
 */
const CONTACT_EMAIL = 'ivanmartinezmedina97@gmail.com'

const LINKS = [
  { id: 'source', icon: 'code', url: 'https://github.com/ivanaslj/computer-basics', labelKey: 'linkSource' },
  { id: 'github', icon: 'github', url: 'https://github.com/ivanaslj', labelKey: 'linkGithub' },
  { id: 'youtube', icon: 'youtube', url: 'https://www.youtube.com/@Its_mamut', labelKey: 'linkYoutube' },
]

export default function Settings({ onBack, onOpenAccount }) {
  const t = useT()
  const tx = useTx()
  const { settings, setSetting, course, overall, resetProgress, syncState } = useApp()
  const auth = useAuth()
  const install = useInstallPrompt()
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className="mx-auto min-h-dvh max-w-lg pb-16">
      <header className="sticky top-0 z-20 flex items-center gap-2 border-b-2 border-line bg-cream/90 px-3 pt-[max(0.8rem,env(safe-area-inset-top))] pb-3 backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          aria-label={t('back')}
          className="rounded-full p-1.5 text-ink-soft active:bg-cream-deep"
        >
          <ChevronLeft />
        </button>
        <h1 className="text-[1.15rem] font-extrabold tracking-tight">{t('settingsTitle')}</h1>
      </header>

      <div className="flex flex-col gap-7 px-5 pt-6">
        {/* Only shown when this build has a Supabase project configured. With
            none, the app is exactly what it always was and there is nothing
            here to explain. */}
        {auth.accountsEnabled && (
          <Group label={t('accountTitle')}>
            <Card className="flex flex-col gap-3">
              {auth.session ? (
                <>
                  <p className="font-bold break-all">{auth.email}</p>
                  <SyncLine syncState={syncState} t={t} />
                  <Button variant="neutral" size="md" onClick={onOpenAccount}>
                    {t('accountManage')}
                  </Button>
                </>
              ) : (
                <>
                  <p className="leading-snug text-ink-soft text-pretty">{t('accountSaveBlurb')}</p>
                  <Button size="md" onClick={onOpenAccount}>
                    {t('accountSaveCta')}
                  </Button>
                </>
              )}
            </Card>
          </Group>
        )}

        <Group label={t('deviceLabel')}>
          <Choices
            value={settings.device}
            onChange={(v) => setSetting('device', v)}
            options={[
              { value: 'windows', label: t('windows'), icon: 'windows' },
              { value: 'mac', label: t('mac'), icon: 'apple' },
            ]}
          />
        </Group>

        <Group label={t('langLabel')}>
          <Choices
            value={settings.language}
            onChange={(v) => setSetting('language', v)}
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Español' },
            ]}
          />
        </Group>

        <Group label={t('sizeLabel')}>
          <Choices
            value={settings.textSize}
            onChange={(v) => setSetting('textSize', v)}
            options={[
              { value: 'normal', label: t('sizeNormal') },
              { value: 'large', label: t('sizeLarge') },
              { value: 'xlarge', label: t('sizeXLarge') },
            ]}
          />
        </Group>

        <Group label={t('themeLabel')}>
          <Choices
            value={settings.theme}
            onChange={(v) => setSetting('theme', v)}
            options={[
              { value: 'system', label: t('themeSystem'), icon: 'contrast' },
              { value: 'light', label: t('themeLight'), icon: 'sun' },
              { value: 'dark', label: t('themeDark'), icon: 'moon' },
            ]}
          />
        </Group>

        {course && (
          <Group label={t('progressLabel')}>
            <Card className="flex flex-col gap-3">
              <p className="font-bold">
                {tx(course.title)} · {t('lessonsDone', { done: overall.done, total: overall.total })}
              </p>
              <ProgressBar value={overall.pct} />
              <Button variant="neutral" size="md" onClick={() => setConfirmReset(true)}>
                {t('resetProgress')}
              </Button>
            </Card>
          </Group>
        )}

        {!install.installed && (
          <Group label={t('installTitle')}>
            <Card tone="brand" className="flex flex-col gap-3">
              <p className="leading-snug">{t('installBody')}</p>
              {install.canPrompt ? (
                <Button size="md" onClick={install.prompt}>
                  {t('installBtn')}
                </Button>
              ) : (
                <p className="rounded-2xl bg-surface/70 p-3 text-[0.95rem] leading-snug font-semibold">
                  {install.isIOS ? t('installIOS') : t('installOther')}
                </p>
              )}
            </Card>
          </Group>
        )}

        <Group label={t('contactTitle')}>
          <Card className="flex flex-col gap-3">
            <p className="text-[0.98rem] leading-snug text-ink-soft">{t('contactBody')}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn-3d self-start rounded-xl border-2 border-b-4 border-brand-dark bg-brand px-4 py-3 text-[0.9rem] font-bold break-all text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </Card>
        </Group>

        <Group label={t('linksTitle')}>
          <Card className="flex flex-col gap-2">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl px-2 py-2.5 font-bold active:bg-cream-deep"
              >
                <span className="text-brand">
                  <Icon name={l.icon} className="h-6 w-6" />
                </span>
                <span className="flex-1">{t(l.labelKey)}</span>
                <span className="text-ink-soft" aria-hidden="true">
                  <Icon name="link" className="h-5 w-5" />
                </span>
              </a>
            ))}
          </Card>
        </Group>

        <Group label={t('aboutTitle')}>
          <Card className="flex flex-col gap-2">
            <p className="text-[0.98rem] leading-snug text-ink-soft">{t('aboutBody')}</p>
            <p className="flex items-center gap-2 text-sm font-bold text-grass">
              <Check className="h-4 w-4" /> {t('offlineReady')}
            </p>
            {/* Which build is actually running. Makes "the new thing isn't
                there" answerable without guessing at caching. */}
            <p className="text-sm text-ink-soft tabular-nums">
              {t('version', { id: __BUILD_ID__ })}
            </p>
          </Card>
        </Group>

        {/* Accounts and sync would appear here. See src/lib/storage.js for the
            single seam that has to change to support them. */}
      </div>

      <Sheet open={confirmReset} onClose={() => setConfirmReset(false)} title={t('resetConfirmTitle')}>
        <p className="mb-5 leading-snug text-ink-soft">
          {t('resetConfirmBody', { course: course ? tx(course.title) : '' })}
        </p>
        <div className="flex flex-col gap-3">
          <Button full onClick={() => setConfirmReset(false)}>
            {t('cancel')}
          </Button>
          <Button
            full
            variant="danger"
            onClick={() => {
              resetProgress()
              setConfirmReset(false)
              onBack()
            }}
          >
            {t('resetYes')}
          </Button>
        </div>
      </Sheet>
    </div>
  )
}

function Group({ label, children }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-bold tracking-widest text-ink-soft uppercase">{label}</h2>
      {children}
    </section>
  )
}

function Choices({ value, onChange, options }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((o) => {
        const active = value === o.value
        return (
          <button
            key={String(o.value)}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={`flex items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left font-extrabold transition ${
              active ? 'border-brand bg-brand-soft' : 'border-line bg-surface'
            }`}
          >
            {o.icon && (
              <span className={active ? 'text-brand' : 'text-ink-soft'}>
                <Icon name={o.icon} className="h-6 w-6" />
              </span>
            )}
            <span className="flex-1">{o.label}</span>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                active ? 'border-brand bg-brand text-white' : 'border-line'
              }`}
            >
              {active && <Check className="h-3.5 w-3.5" />}
            </span>
          </button>
        )
      })}
    </div>
  )
}
