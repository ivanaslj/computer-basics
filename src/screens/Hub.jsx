import { useApp } from '../state/store'
import { useT, useTx } from '../i18n'
import { ProgressBar, Gear, Flame } from '../components/ui'
import Icon from '../components/icons'
import { stagger } from '../lib/motion'

/**
 * The very first real choice after onboarding ("what do you want to learn?"),
 * and the permanent home base afterward — every course's Path screen links
 * back here. Picking an available course sets it active and hands off to its
 * own Path screen; coming-soon courses are visible but not enterable, so the
 * intended lineup is honest about what exists today.
 */
// Unlimited practice, deliberately listed apart from the courses: no
// lessons, no completion, no order — just a skill to drill for as long as
// you like.
const PRACTICE_MODES = [
  { id: 'click', icon: 'mouse', titleKey: 'practiceClick', blurbKey: 'practiceClickBlurb' },
  { id: 'drag', icon: 'grab', titleKey: 'practiceDrag', blurbKey: 'practiceDragBlurb' },
  { id: 'type', icon: 'keyboard', titleKey: 'practiceType', blurbKey: 'practiceTypeBlurb' },
]

export default function Hub({ onOpenCourse, onOpenSettings, onOpenPractice }) {
  const t = useT()
  const tx = useTx()
  const { courses, streak, openCourse, profile, totalLessonsDone } = useApp()

  const pick = (course) => {
    if (course.status !== 'available') return
    openCourse(course.id)
    onOpenCourse()
  }

  // Exactly one course icon bobs: the first one with work left in it. Two
  // things moving forever on one screen stops reading as "look here".
  const nudging = courses.find((c) => c.status === 'available' && c.progress.pct < 100)?.id

  // The name is local, so this reads the same signed in, signed out or with no
  // network at all. That is the whole reason it lives in settings.
  const greeting = profile.name
    ? t('helloNamed', { name: profile.name })
    : totalLessonsDone > 0
      ? t('hello')
      : t('helloFirst')

  return (
    <div className="mx-auto min-h-dvh max-w-lg pb-10">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b-2 border-line bg-cream/90 px-5 pt-[max(0.9rem,env(safe-area-inset-top))] pb-3 backdrop-blur-md">
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label={t('profileTitle')}
          className="btn-3d flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"
        >
          <Icon name={profile.avatar || 'monitor'} className="h-6 w-6" />
        </button>
        <span className="flex-1" />
        {streak.count > 0 && (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-sun-soft px-3 py-1 text-sm font-extrabold text-sun">
            <Flame className="h-4 w-4" />
            {streak.count}
          </span>
        )}
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label={t('settings')}
          className="shrink-0 rounded-full p-1.5 text-ink-soft active:bg-cream-deep"
        >
          <Gear />
        </button>
      </header>

      {/* The greeting sits below the header rather than inside it. At the
          largest text size on a narrow phone the header cannot hold an avatar,
          a name, a streak and a gear on one line: flexbox squeezed the name to
          25px and the text spilled out underneath the streak. Down here it has
          the full width, can wrap to as many lines as a long name needs, and
          nothing can collide with it. It also simply reads better large. */}
      <h1 className="px-5 pt-5 text-[1.45rem] leading-tight font-extrabold tracking-tight text-balance">
        {greeting}
      </h1>

      <h2 className="px-5 pt-5 text-sm font-bold tracking-widest text-ink-soft uppercase">
        {t('hubTitle')}
      </h2>
      <p className="px-5 pt-1 pb-1 leading-snug text-ink-soft text-pretty">{t('hubSubtitle')}</p>

      <div className="flex flex-col gap-4 px-5 pt-3">
        {courses.map((course, i) => (
          <CourseCard
            key={course.id}
            course={course}
            tx={tx}
            t={t}
            onTap={() => pick(course)}
            bob={course.id === nudging}
            delay={stagger(i)}
          />
        ))}
      </div>

      <section className="px-5 pt-9">
        <h2 className="text-sm font-bold tracking-widest text-ink-soft uppercase">
          {t('practiceSectionTitle')}
        </h2>
        <p className="mt-1 mb-3 text-[0.95rem] leading-snug text-ink-soft text-pretty">
          {t('practiceSectionBlurb')}
        </p>
        <div className="flex flex-col gap-3">
          {PRACTICE_MODES.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onOpenPractice(m.id)}
              // The stagger index carries on from the course cards above, so
              // the page cascades once from the top rather than twice.
              style={stagger(courses.length + i)}
              className="anim-enter btn-3d flex items-center gap-4 rounded-2xl border-2 border-b-4 border-line bg-surface px-5 py-4 text-left"
            >
              <span className="text-brand">
                <Icon name={m.icon} className="h-7 w-7" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[1.05rem] leading-tight font-extrabold">{t(m.titleKey)}</span>
                <span className="block text-[0.95rem] leading-snug text-ink-soft">{t(m.blurbKey)}</span>
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function CourseCard({ course, tx, t, onTap, bob, delay }) {
  const comingSoon = course.status !== 'available'
  return (
    <button
      type="button"
      onClick={onTap}
      disabled={comingSoon}
      style={delay}
      className={`anim-enter btn-3d rounded-3xl border-2 p-5 text-left ${
        comingSoon
          ? 'border-line bg-cream-deep/60 shadow-none'
          : 'border-line bg-surface shadow-[0_4px_0_var(--color-line)]'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* The bob lives on this span, never on the button: an infinite
            animation on the button would outrank :active and kill the press. */}
        <span className={`${comingSoon ? 'text-ink-soft/40' : 'text-brand'} ${bob ? 'anim-bob' : ''}`}>
          <Icon name={course.icon} className="h-9 w-9" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className={`text-[1.2rem] leading-tight font-extrabold ${comingSoon ? 'text-ink-soft' : ''}`}>
              {tx(course.title)}
            </h2>
            {comingSoon && (
              <span className="shrink-0 rounded-full bg-sun-soft px-2 py-0.5 text-xs font-bold text-sun">
                {t('hubComingSoon')}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[0.95rem] leading-snug text-ink-soft text-pretty">
            {tx(course.subtitle)}
          </p>
          {!comingSoon && (
            <div className="mt-3 flex items-center gap-3">
              <ProgressBar value={course.progress.pct} className="flex-1" />
              <span className="text-sm font-bold whitespace-nowrap text-ink-soft tabular-nums">
                {course.progress.done}/{course.progress.total}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
