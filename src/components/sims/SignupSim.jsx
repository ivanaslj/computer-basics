import { useId, useState } from 'react'
import { useT, useTx } from '../../i18n'
import { Button, Card, Field, Check, Lock } from '../ui'
import Icon from '../icons'

/**
 * A safe fake sign-up form. The learner really types into it; nothing is sent
 * anywhere and nothing is kept.
 *
 * This is the one sim that does NOT sit inside FakeScreen, and that is
 * deliberate. The other sims size everything in `cqw` so the mock desktop keeps
 * its proportions no matter what the learner sets the text size to — which is
 * right for a picture of a screen, and wrong for a form she has to read and
 * type into. At `xlarge` the app's own text is 23px while a `cqw` label inside
 * the little laptop is about 12px, and the person who needs the large setting
 * is exactly the person who needs to read this. So this one is built from the
 * app's own components and theme tokens, like AISim, and scales with the app.
 *
 * The address bar above the form is not decoration and is not optional. A
 * sign-up form is precisely where somebody would put a fake page, because a
 * password is what they are after — so every instance of this sim, live or
 * frozen, shows the address. The scam lesson (m5-l3) teaches "read the address
 * first"; this is where that gets practised rather than repeated.
 */

const NUDGE = {
  emailEmpty: {
    en: 'Type a pretend email in the top box first. Anything you like — it goes nowhere.',
    es: 'Escribe un correo inventado en la casilla de arriba. El que quieras — no va a ningún lado.',
  },
  emailNoAt: {
    en: 'An email address always has one **@** in it, with your name before it and where your email lives after it.',
    es: 'Un correo siempre lleva un **@**, con tu nombre antes y dónde vive tu correo después.',
  },
  emailSpace: {
    en: 'Email addresses never have a space in them. Take the space out.',
    es: 'Los correos nunca llevan espacios. Quita el espacio.',
  },
  emailNoDot: {
    en: 'Almost — it needs an ending after a dot, like **.com**.',
    es: 'Casi — le falta una terminación después del punto, como **.com**.',
  },
  passwordShort: {
    en: 'A few more letters. Eight or more is the rule here, and a short phrase works nicely.',
    es: 'Unas letras más. Aquí la regla son ocho o más, y una frase corta funciona muy bien.',
  },
  passwordCommon: {
    en: 'That one is on every list of first guesses. Try three words that only you would put together.',
    es: 'Esa está en todas las listas de primeros intentos. Prueba con tres palabras que solo a ti se te ocurrirían.',
  },
  passwordIsEmail: {
    en: 'Your password should be different from your email. Something separate, that is easy for **you** to remember.',
    es: 'Tu contraseña debe ser distinta de tu correo. Algo aparte, que a **ti** te sea fácil recordar.',
  },
}

const HINT_LABEL = { en: 'Try this:', es: 'Prueba con esto:' }
const AND_LABEL = { en: 'and this:', es: 'y esto:' }
const DONE_LABEL = {
  en: 'That is exactly it. Nothing was sent anywhere — this form is only for practising.',
  es: 'Así es exactamente. No se mandó nada a ningún lado — este formulario es solo para practicar.',
}

// The first guesses anybody makes. Not a security measure — a teaching one.
const WEAK = [
  'password', '12345678', '123456789', 'qwerty', 'iloveyou', 'letmein',
  'contrasena', 'contraseña', 'password1', '11111111', 'abc12345',
]

// Deliberately not an RFC-correct pattern. It checks the shape a person needs
// to understand — a name, an @, somewhere it lives, a dot, an ending — because
// the point is to be able to explain what is missing.
const EMAIL_OK = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

function checkEmail(value) {
  const v = value.trim()
  // Ordered by which mistake she is most likely to have made, so the nudge she
  // gets is about the thing she actually did.
  if (!v) return 'emailEmpty'
  if (/\s/.test(value)) return 'emailSpace'
  if (!v.includes('@') || v.split('@').length > 2) return 'emailNoAt'
  if (!EMAIL_OK.test(v)) return 'emailNoDot'
  return null
}

function checkPassword(value, min, email) {
  if (value.length < min) return 'passwordShort'
  if (WEAK.includes(value.trim().toLowerCase())) return 'passwordCommon'
  const local = email.trim().toLowerCase().split('@')[0]
  if (local && value.trim().toLowerCase() === local) return 'passwordIsEmail'
  return null
}

/** Long beats complicated, so length and word count are what this rewards. */
function strengthOf(value, min) {
  if (value.length < min) return 'short'
  if (value.length > 15 || value.trim().split(/\s+/).length >= 3) return 'strong'
  return 'ok'
}

export default function SignupSim({ config = {}, onSolved, onMistake, showHint, solved }) {
  const tx = useTx()
  const t = useT()
  const {
    goal = 'fill',
    site = {},
    minPassword = 8,
    hintEmail,
    hintPassword,
    prefill = {},
  } = config

  // Unique per instance: a lesson can show a frozen illustration of this form
  // on one step and the real thing on another, and two inputs sharing an id
  // would leave a <label> pointing at whichever came first.
  const uid = useId()
  const wantsEmail = goal !== 'password'
  const [email, setEmail] = useState(prefill.email || '')
  const [password, setPassword] = useState(prefill.password || '')
  const [fieldError, setFieldError] = useState(null)
  // Separate from `solved`: a frozen illustration is handed solved=true from
  // the start, and it must not claim the learner did anything.
  const [submitted, setSubmitted] = useState(false)

  const nudge = (key) => {
    setFieldError(key)
    onMistake?.(tx(NUDGE[key]))
  }

  const submit = (e) => {
    e.preventDefault()
    if (solved) return

    // Only ever on submit, never as she types. Field puts its error in a
    // role="alert", and revalidating per keystroke would make a screen reader
    // announce "that does not look like an email" after every single letter.
    if (wantsEmail) {
      const bad = checkEmail(email)
      if (bad) return nudge(bad)
    }
    const badPassword = checkPassword(password, minPassword, wantsEmail ? email : '')
    if (badPassword) return nudge(badPassword)

    setFieldError(null)
    setSubmitted(true)
    onSolved?.()
  }

  const frozen = solved
  const strength = strengthOf(password, minPassword)
  const strengthLabel = t(
    strength === 'short' ? 'signupStrengthShort' : strength === 'ok' ? 'signupStrengthOk' : 'signupStrengthStrong'
  )

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-line bg-surface">
      {/* The address bar. `site.secure === false` is drawn as a *look*, not as
          a sentence, so the untrusted state is something she recognises rather
          than something she reads. */}
      <div
        role="img"
        aria-label={t('signupAddressLabel', { url: site.url || '' })}
        className={`flex items-center gap-2 border-b-2 px-4 py-2.5 ${
          site.secure === false ? 'border-berry/40 bg-berry-soft' : 'border-line bg-cream-deep'
        }`}
      >
        {site.secure === false ? (
          <span className="shrink-0 text-berry">
            <Icon name="warning" className="h-[1.1em] w-[1.1em]" />
          </span>
        ) : (
          <span className="shrink-0 text-grass">
            <Lock className="h-[1.1em] w-[1.1em]" />
          </span>
        )}
        <span
          className={`truncate text-[0.95rem] font-bold ${
            site.secure === false ? 'text-berry' : 'text-ink-soft'
          }`}
        >
          {site.url}
        </span>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4 p-5" noValidate>
        <div>
          <h3 className="text-[1.15rem] leading-tight font-extrabold">{tx(site.name || '')}</h3>
          <p className="text-[0.95rem] leading-snug text-ink-soft">{t('authCreate')}</p>
        </div>

        {wantsEmail && (
          <Field
            id={`${uid}-email`}
            label={t('authEmail')}
            type="email"
            inputMode="email"
            // Never invite the phone to autofill her real address into a
            // pretend form, and never prompt a password manager to save a
            // practice password.
            autoComplete="off"
            value={email}
            onChange={(v) => {
              setEmail(v)
              setFieldError(null)
            }}
            disabled={frozen}
            error={fieldError?.startsWith('email') ? tx(NUDGE[fieldError]) : null}
          />
        )}

        <Field
          id={`${uid}-password`}
          label={t('authPassword')}
          type="password"
          autoComplete="off"
          showLabel={t('authShow')}
          hideLabel={t('authHide')}
          hint={t('authPasswordHint', { n: minPassword })}
          value={password}
          onChange={(v) => {
            setPassword(v)
            setFieldError(null)
          }}
          disabled={frozen}
          error={fieldError?.startsWith('password') ? tx(NUDGE[fieldError]) : null}
        />

        <Strength level={strength} label={strengthLabel} empty={password.length === 0} />

        <Button full type="submit" disabled={frozen} className={showHint && !solved ? 'anim-halo' : ''}>
          {t('authCreate')}
        </Button>
      </form>

      {showHint && !solved && (
        <div className="px-5 pb-5">
          {/* Spell out something she can actually type. Same reasoning as the
              rename step in FilesSim: a learner who cannot think of an address
              on the spot otherwise has no way forward at all. No copy button —
              typing it is the whole exercise. */}
          <Card tone="brand" className="flex flex-col gap-1">
            {wantsEmail && hintEmail && (
              <p className="leading-snug">
                <span className="font-extrabold">{tx(HINT_LABEL)}</span> {tx(hintEmail)}
              </p>
            )}
            {hintPassword && (
              <p className="leading-snug">
                <span className="font-extrabold">
                  {tx(wantsEmail && hintEmail ? AND_LABEL : HINT_LABEL)}
                </span>{' '}
                {tx(hintPassword)}
              </p>
            )}
          </Card>
        </div>
      )}

      {submitted && (
        <div className="px-5 pb-5">
          <Card tone="grass" className="flex items-start gap-2">
            <span className="shrink-0 text-grass">
              <Check className="h-[1.2em] w-[1.2em]" />
            </span>
            <p className="leading-snug">{tx(DONE_LABEL)}</p>
          </Card>
        </div>
      )}
    </div>
  )
}

/** Three segments that fill up as the password gets longer. */
function Strength({ level, label, empty }) {
  const filled = empty ? 0 : level === 'short' ? 1 : level === 'ok' ? 2 : 3
  const tone = level === 'short' ? 'bg-sun' : level === 'ok' ? 'bg-brand' : 'bg-grass'
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i < filled ? tone : 'bg-line'}`}
          />
        ))}
      </div>
      <span aria-live="polite" className="text-[0.85rem] font-bold text-ink-soft">
        {empty ? '' : label}
      </span>
    </div>
  )
}
