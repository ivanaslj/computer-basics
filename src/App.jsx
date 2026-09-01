import { useCallback, useEffect, useState } from 'react'
import { useApp } from './state/store'
import Onboarding from './screens/Onboarding'
import Hub from './screens/Hub'
import Path from './screens/Path'
import Lesson from './screens/Lesson'
import Settings from './screens/Settings'
import Practice from './screens/Practice'

/**
 * Screen routing. Deliberately not a router library: there are five screens,
 * the app is installed to a home screen rather than linked to, and a beginner
 * pressing the browser's back button mid-lesson would be a worse experience
 * than the in-app back buttons we control.
 */
export default function App() {
  const { settings } = useApp()
  const [route, setRoute] = useState({ name: 'path' })

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
      return <Settings onBack={() => go(settings.currentCourseId ? 'path' : 'hub')} />
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
