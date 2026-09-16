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
      </AppProvider>
    </AuthProvider>
    {/* Outside the providers, and outside the router: the launch animation
        needs to cover onboarding too, and it deliberately subscribes to no
        context, so a route change can never remount it mid-zoom. */}
    <Intro />
  </StrictMode>
)
