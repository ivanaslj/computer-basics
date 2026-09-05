import { useCallback, useEffect, useRef, useState } from 'react'
import { useApp } from './state/store'
import { useAppUpdate, applyUpdate } from './lib/updates'
import { useAuth } from './state/auth'
import Onboarding from './screens/Onboarding'
import Hub from './screens/Hub'
import Path from './screens/Path'
import Lesson from './screens/Lesson'
import Settings from './screens/Settings'
import Account from './screens/Account'
import Practice from './screens/Practice'

/**
 * Screen routing. Deliberately not a router library: there are five screens,
 * the app is installed to a home screen rather than linked to, and a beginner
 * pressing the browser's back button mid-lesson would be a worse experience
 * than the in-app back buttons we control.
 */
export default function App() {
  const { settings } = useApp()
  const auth = useAuth()
  const [route, setRoute] = useState({ name: 'path' })
  const updateReady = useAppUpdate()

  const go = useCallback((name, params = {}) => {
    setRoute({ name, ...params })
    window.scrollTo({ top: 0 })
  }, [])

  // Android's hardware back button, and the browser's, should mean "go up one
  // level" while a lesson or Settings is open — and should still leave the app
  // normally from the home screen, rather than trapping the user in it. "Home"
  // is the Hub once no course is selected, or that course's Path otherwise.
  useEffect(() => {
    const onPop = () => setRoute({ name: settings.currentCourseId ? 'path' : 'hub' })
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [settings.currentCourseId])

  useEffect(() => {
    if (route.name !== 'path' && route.name !== 'hub') {
      window.history.pushState({ screen: route.name }, '')
    }
  }, [route.name])

  // A new version swaps itself in silently, but only where nothing is lost by
  // doing it. A lesson's current step, a practice run and half-finished
  // onboarding are the three things held in memory rather than in
  // localStorage; everywhere else a reload costs the learner nothing and they
  // simply have the newest app. If they are busy, the update waits here until
  // they aren't.
  // A password-reset link drops the learner back into the app with a recovery
  // session. Send them straight to the screen that finishes the job, or the
  // link appears to have done nothing at all.
  const sentToReset = useRef(false)
  useEffect(() => {
    if (!auth.recovering) {
      sentToReset.current = false
      return
    }
    if (sentToReset.current) return
    sentToReset.current = true
    setRoute({ name: 'account' })
  }, [auth.recovering])

  const busy = route.name === 'lesson' || route.name === 'practice' || !settings.onboarded
  useEffect(() => {
    if (updateReady && !busy) applyUpdate()
  }, [updateReady, busy])

  // Language is asked during onboarding; "what program" is the very next
  // screen the learner sees, and stays reachable forever after from Path's
  // header — this is the Hub.
  if (!settings.onboarded) return <Onboarding onDone={() => go('hub')} />

  switch (route.name) {
    case 'hub':
      return (
        <Hub
          onOpenCourse={() => go('path')}
          onOpenSettings={() => go('settings')}
          onOpenPractice={(m) => go('practice', { mode: m })}
        />
      )
    case 'practice':
      return <Practice key={route.mode} mode={route.mode} onExit={() => go('hub')} />
    case 'lesson':
      return (
        <Lesson
          key={route.lessonId}
          lessonId={route.lessonId}
          onExit={() => go('path')}
          onNext={(id) => go('lesson', { lessonId: id })}
        />
      )
    case 'settings':
      return (
        <Settings
          onBack={() => go(settings.currentCourseId ? 'path' : 'hub')}
          onOpenAccount={() => go('account')}
        />
      )
    case 'account':
      return <Account onBack={() => go('settings')} />
    default:
      return settings.currentCourseId ? (
        <Path
          onOpenLesson={(id) => go('lesson', { lessonId: id })}
          onOpenSettings={() => go('settings')}
          onOpenHub={() => go('hub')}
        />
      ) : (
        <Hub
          onOpenCourse={() => go('path')}
          onOpenSettings={() => go('settings')}
          onOpenPractice={(m) => go('practice', { mode: m })}
        />
      )
  }
}
