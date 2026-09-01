import { useApp } from '../state/store'
import { useT, useTx } from '../i18n'
import { ProgressBar, Gear, Flame } from '../components/ui'

/**
 * The very first real choice after onboarding ("what do you want to learn?"),
 * and the permanent home base afterward — every course's Path screen links
 * back here. Picking an available course sets it active and hands off to its
 * own Path screen; coming-soon courses are visible but not enterable, so the
 * intended lineup is honest about what exists today.
 */
export default function Hub({ onOpenCourse, onOpenSettings }) {
  const t = useT()
  const tx = useTx()
  const { courses, streak, openCourse } = useApp()

  const pick = (course) => {
    if (course.status !== 'available') return
    openCourse(course.id)
    onOpenCourse()
  }

  return (
    <div className="mx-auto min-h-dvh max-w-lg pb-10">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b-2 border-line bg-cream/90 px-5 pt-[max(0.9rem,env(safe-area-inset-top))] pb-3 backdrop-blur-md">
        <h1 className="flex-1 text-[1.15rem] leading-tight font-extrabold tracking-tight">
          {t('hubTitle')}
        </h1>
        {streak.count > 0 && (
          <span className="flex items-center gap-1 rounded-full bg-sun-soft px-3 py-1 text-sm font-extrabold text-sun">
            <Flame className="h-4 w-4" />
            {streak.count}
          </span>
        )}
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label={t('settings')}
          className="rounded-full p-1.5 text-ink-soft active:bg-cream-deep"
        >
          <Gear />
        </button>
      </header>

      <p className="px-5 pt-4 pb-1 leading-snug text-ink-soft text-pretty">{t('hubSubtitle')}</p>

      <div className="flex flex-col gap-4 px-5 pt-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} tx={tx} t={t} onTap={() => pick(course)} />
        ))}
      </div>
    </div>
  )
}

function CourseCard({ course, tx, t, onTap }) {
  const comingSoon = course.status !== 'available'
  return (
    <button
      type="button"
      onClick={onTap}
      disabled={comingSoon}
      className={`btn-3d rounded-3xl border-2 p-5 text-left ${
        comingSoon
          ? 'border-line bg-cream-deep/60 shadow-none'
          : 'border-line bg-white shadow-[0_4px_0_var(--color-line)]'
      }`}
    >
      <div className="flex items-start gap-4">
        <span className={`text-4xl ${comingSoon ? 'opacity-40 grayscale' : ''}`} aria-hidden="true">
          {course.emoji}
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
