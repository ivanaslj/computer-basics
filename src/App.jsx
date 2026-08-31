import { useCallback, useEffect, useState } from 'react'
import { useApp } from './state/store'
import Onboarding from './screens/Onboarding'
import Path from './screens/Path'
import Lesson from './screens/Lesson'
import Settings from './screens/Settings'

/**
 * Screen routing. Deliberately not a router library: there are four screens,
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
  // normally from the home screen, rather than trapping the user in it.
  useEffect(() => {
    const onPop = () => setRoute({ name: 'path' })
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (route.name !== 'path') window.history.pushState({ screen: route.name }, '')
  }, [route.name])

  if (!settings.onboarded) return <Onboarding onDone={() => go('path')} />

  switch (route.name) {
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
      return <Settings onBack={() => go('path')} />
    default:
      return (
        <Path
          onOpenLesson={(id) => go('lesson', { lessonId: id })}
          onOpenSettings={() => go('settings')}
        />
      )
  }
}
