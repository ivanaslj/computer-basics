import { useState } from 'react'
import { useApp } from '../state/store'
import { useT, useTx } from '../i18n'
import { useInstallPrompt } from '../lib/install'
import { Button, Card, Sheet, ProgressBar, ChevronLeft, Check, Field } from '../components/ui'
import Icon from '../components/icons'
import { useAuth } from '../state/auth'
import { SyncLine } from './Account'

/**
 * Where to find the project and its maintainer. All temporary in the sense
 * that they are personal accounts, not Computer Basics ones — when the app
 * gets its own (a Discord server is the next one planned, plus Instagram),
 * add them to LINKS below and swap the address on this line.
 */
const CONTACT_EMAIL = 'itsmamut97@gmail.com'

/**
 * Written install steps, only the ones for this browser (lib/install.js works
 * out which). A browser that offers its own install prompt gets a real button
 * instead, and 'other' keeps the general wording.
 */
const INSTALL_STEPS = {
  'ios-safari': ['installIOS1', 'installIOS2', 'installIOS3'],
  'android-chrome': ['installAndroid1', 'installAndroid2', 'installAndroid3'],
  'desktop-chromium': ['installDesktop1', 'installDesktop2', 'installDesktop3'],
}

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
        {/* Above the account group on purpose: a name and a picture are about
            the person, not about having signed up for anything, and they work
            exactly the same with no account at all. */}
        <Group label={t('profileTitle')}>
          <Card className="flex flex-col gap-4">
            <Field
              id="display-name"
              label={t('profileNameLabel')}
              hint={t('profileNameHint')}
              value={settings.displayName || ''}
              onChange={(v) => setSetting('displayName', v.slice(0, 40))}
              autoComplete="given-name"
            />
            <AvatarPicker
              value={settings.avatarIcon}
              onChange={(v) => setSetting('avatarIcon', v)}
              t={t}
            />
          </Card>
        </Group>

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

        {/* Only once a phone has been picked (by the phone-video course),
            so learners who never open that course never see the question. */}
        {settings.phone && (
          <Group label={t('phoneLabel')}>
            <Choices
              value={settings.phone}
              onChange={(v) => setSetting('phone', v)}
              options={[
                { value: 'iphone', label: t('iphone'), icon: 'apple' },
                { value: 'android', label: t('android'), icon: 'phone' },
              ]}
            />
          </Group>
        )}

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
              ) : INSTALL_STEPS[install.platform] ? (
                <ol className="flex flex-col gap-2.5">
                  {INSTALL_STEPS[install.platform].map((key, i) => (
                    <li
                      key={key}
                      className="flex items-start gap-3 rounded-2xl bg-surface/70 p-3 text-[1rem] leading-snug font-semibold"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-[0.9rem] font-extrabold text-white">
                        {i + 1}
                      </span>
                      <span className="flex-1 pt-0.5">{t(key)}</span>
                      {/* The one button worth a picture: Safari's Share icon
                          is easy to miss, and nothing about it says "install". */}
                      {key === 'installIOS1' && (
                        <span className="shrink-0 rounded-lg border-2 border-brand/30 p-1 text-brand" aria-hidden="true">
                          <Icon name="ios-share" className="h-7 w-7" />
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="rounded-2xl bg-surface/70 p-3 text-[0.95rem] leading-snug font-semibold">
                  {t('installOther')}
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

      {/* Keeping is the big, focused, first button and starting over the small
          one: a stray tap or an Enter key should never cost someone their
          progress. With an account, the reset is recorded as well as applied
          (see mergeResets in lib/merge.js), so the online copy clears with the
          local one on the next sync instead of putting the lessons back. */}
      <Sheet
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title={t('resetConfirmTitle', { course: course ? tx(course.title) : '' })}
      >
        <div className="mb-6 flex flex-col gap-2 text-[1.1rem] leading-snug">
          <p className="font-bold">
            {overall.done === 0
              ? t('resetConfirmBodyNone')
              : overall.done === 1
                ? t('resetConfirmBodyOne')
                : t('resetConfirmBody', { n: overall.done })}
          </p>
          <p className="text-ink-soft">{t('resetConfirmOthers')}</p>
          {auth.session && <p className="text-ink-soft">{t('resetConfirmAccount')}</p>}
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button full autoFocus onClick={() => setConfirmReset(false)}>
            {t('resetKeep')}
          </Button>
          <Button
            variant="neutral"
            size="md"
            className="min-h-12"
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

/**
 * Twenty everyday things to pick as a profile picture, drawn for this purpose
 * (see "profile pictures" in components/icons). Kept apart from the lesson
 * icons on purpose: those mean something specific inside a lesson (a folder,
 * a printer), and picking your own face out of a list of a hundred is a chore
 * rather than a treat.
 *
 * Tapping one twice clears it, which is the only way back to no picture. A
 * picture chosen from the old set still shows until a new one is picked.
 */
const AVATARS = [
  'mug', 'cat', 'dog', 'cactus',
  'house', 'tree', 'mountain', 'sailboat',
  'bicycle', 'guitar', 'camera', 'book',
  'butterfly', 'fish', 'sunflower', 'hummingbird',
  'teapot', 'lighthouse', 'paper-plane', 'chili',
]

function AvatarPicker({ value, onChange, t }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[0.95rem] font-bold">{t('profileAvatarLabel')}</p>
      <p className="text-[0.9rem] leading-snug text-ink-soft">{t('profileAvatarHint')}</p>
      <div className="mt-1 grid grid-cols-4 gap-2">
        {AVATARS.map((name, i) => {
          const active = value === name
          return (
            <button
              key={name}
              type="button"
              onClick={() => onChange(active ? null : name)}
              aria-pressed={active}
              aria-label={t('profileAvatarOption', { n: i + 1 })}
              className={`btn-3d flex aspect-square items-center justify-center rounded-2xl border-2 ${
                active ? 'border-brand bg-brand-soft text-brand' : 'border-line bg-surface text-ink-soft'
              }`}
            >
              <Icon name={name} className="h-9 w-9" />
            </button>
          )
        })}
      </div>
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
