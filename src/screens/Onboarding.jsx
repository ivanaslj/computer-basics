import { useState } from 'react'
import { useApp } from '../state/store'
import { useT } from '../i18n'
import { Button, Card, Check } from '../components/ui'
import Icon from '../components/icons'

/**
 * Setup, in four short screens. Two answers actually matter — language and
 * which computer they have — because both change what the rest of the course
 * says. Text size is asked here too, since someone who needs it needs it
 * before they read anything else.
 */
export default function Onboarding({ onDone }) {
  const { settings, setSetting, finishOnboarding } = useApp()
  const t = useT()
  const [step, setStep] = useState(0)
  // `undefined` means "nothing picked yet" — distinct from the 'unsure'
  // option, so no answer looks chosen before they choose one.
  const [device, setDevice] = useState(settings.device ?? undefined)

  const next = () => setStep((s) => s + 1)

  const finish = () => {
    // "Not sure" is stored as Windows because it is far more common, but the
    // learner is told so and can change it in Settings.
    finishOnboarding({ device: device === 'mac' ? 'mac' : 'windows' })
    onDone()
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-6 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <Dots count={4} active={step} />

      <div className="flex flex-1 flex-col justify-center py-6">
        {step === 0 && (
          <div key="0" className="anim-pop flex flex-col items-center gap-6 text-center">
            <LogoMark />
            <h1 className="text-[2.1rem] leading-[1.1] font-extrabold tracking-tight text-balance">
              {t('welcomeTitle')}
            </h1>
            <p className="text-[1.1rem] leading-relaxed text-ink-soft text-pretty">
              {t('welcomeBody')}
            </p>
          </div>
        )}

        {step === 1 && (
          <div key="1" className="anim-pop flex flex-col gap-5">
            <Heading title={t('langQ')} sub={t('langSub')} />
            <OptionList
              value={settings.language}
              onChange={(v) => setSetting('language', v)}
              options={[
                { value: 'en', label: 'English', hint: 'English' },
                { value: 'es', label: 'Español', hint: 'Spanish' },
              ]}
            />
          </div>
        )}

        {step === 2 && (
          <div key="2" className="anim-pop flex flex-col gap-5">
            <Heading title={t('deviceQ')} sub={t('deviceSub')} />
            <OptionList
              value={device}
              onChange={setDevice}
              options={[
                { value: 'windows', label: t('windows'), hint: t('windowsHint'), icon: 'windows' },
                { value: 'mac', label: t('mac'), hint: t('macHint'), icon: 'apple' },
                { value: 'unsure', label: t('unsure'), hint: t('unsureHint'), icon: 'question' },
              ]}
            />
          </div>
        )}

        {step === 3 && (
          <div key="3" className="anim-pop flex flex-col gap-5">
            <Heading title={t('sizeQ')} sub={t('sizeSub')} />
            <Card className="text-center">
              <p className="leading-snug font-semibold">{t('sizeSample')}</p>
            </Card>
            <OptionList
              value={settings.textSize}
              onChange={(v) => setSetting('textSize', v)}
              options={[
                { value: 'normal', label: t('sizeNormal') },
                { value: 'large', label: t('sizeLarge') },
                { value: 'xlarge', label: t('sizeXLarge') },
              ]}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Button full onClick={step === 3 ? finish : next}>
          {step === 0 ? t('letsGo') : step === 3 ? t('startCourse') : t('continue')}
        </Button>
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="py-2 text-center font-bold text-ink-soft"
          >
            {t('back')}
          </button>
        )}
      </div>
    </div>
  )
}

function Heading({ title, sub }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-[1.8rem] leading-[1.15] font-extrabold tracking-tight text-balance">
        {title}
      </h1>
      {sub && <p className="leading-snug text-ink-soft text-pretty">{sub}</p>}
    </div>
  )
}

function OptionList({ value, onChange, options }) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((o) => {
        const active = value === o.value
        return (
          <button
            key={String(o.value)}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={`flex items-center gap-4 rounded-2xl border-2 border-b-4 px-5 py-4 text-left transition active:translate-y-[2px] ${
              active ? 'border-brand bg-brand-soft' : 'border-line bg-surface'
            }`}
          >
            {o.icon && (
              <span className={active ? 'text-brand' : 'text-ink-soft'}>
                <Icon name={o.icon} className="h-7 w-7" />
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="block text-[1.1rem] leading-tight font-extrabold">{o.label}</span>
              {o.hint && (
                <span className="block text-[0.95rem] leading-snug text-ink-soft">{o.hint}</span>
              )}
            </span>
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                active ? 'border-brand bg-brand text-white' : 'border-line'
              }`}
            >
              {active && <Check className="h-4 w-4" />}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function Dots({ count, active }) {
  return (
    <div className="flex justify-center gap-2 pt-2" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`h-2 rounded-full transition-all ${
            i === active ? 'w-8 bg-brand' : 'w-2 bg-line'
          }`}
        />
      ))}
    </div>
  )
}

function LogoMark() {
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-[1.8rem] bg-gradient-to-b from-brand to-[#6d28d9] shadow-[0_10px_24px_-10px_rgb(79_70_229_/_0.8)]">
      <div className="relative">
        <div className="h-11 w-16 rounded-md border-[3px] border-white bg-[#2e2a82]" />
        <div className="mx-auto mt-1 h-1.5 w-20 rounded-full bg-white" />
        <svg viewBox="0 0 24 24" className="absolute top-2.5 left-6 w-4" aria-hidden="true">
          <path
            d="M5 2.5 19 12l-6.2.9 3.1 6.4-2.6 1.3-3.1-6.4L5 18.6z"
            fill="#fff"
            stroke="#2e2a82"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
