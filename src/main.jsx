import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Intro from './components/Intro'
import { AppProvider } from './state/store'
import { AuthProvider } from './state/auth'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Auth wraps progress, not the other way round: the store asks who is
        signed in so it knows whether to sync, so the answer has to exist
        first. With no Supabase project configured it always answers
        "nobody", and everything below behaves exactly as it always has. */}
    <AuthProvider>
      <AppProvider>
        <App />
        {/* Inside the providers, but still outside the router. It has to be
            inside: the animation now shows the real app on the monitor's
            screen, and every screen — even through useT/useTx — reads the
            store. It stays outside App so a route change cannot remount it
            mid-zoom, and so it still covers onboarding.

            The cost is that it re-renders when auth or sync state changes.
            That is harmless: the camera is a Web Animations object attached to
            a DOM node, and its effect is keyed on the phase, so a re-render
            never restarts the move. */}
        <Intro />
      </AppProvider>
    </AuthProvider>
  </StrictMode>
)
