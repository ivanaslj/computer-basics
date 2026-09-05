import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase, accountsEnabled } from '../lib/supabase'

/**
 * Who is signed in, if anyone.
 *
 * Kept apart from `store.jsx` on purpose: that file owns what a learner has
 * *done*, this one owns who they *are*, and the app works perfectly well with
 * an answer of "nobody". Signing in is an optional extra that makes progress
 * follow the person instead of the browser — it is never a gate in front of a
 * lesson.
 */

const AuthContext = createContext(null)

/**
 * Supabase reports failures in developer English ("Invalid login credentials").
 * Beginners read those as "you did something wrong and I won't tell you what".
 * Map the ones people actually hit onto a key we have real, translated,
 * non-blaming copy for, and fall back to something calm for the rest.
 */
function messageKey(error) {
  if (!error) return null
  const m = (error.message || '').toLowerCase()
  if (m.includes('invalid login credentials')) return 'authWrongDetails'
  if (m.includes('email not confirmed')) return 'authNotConfirmed'
  if (m.includes('user already registered') || m.includes('already been registered'))
    return 'authAlreadyExists'
  if (m.includes('password should be at least') || m.includes('password is too short'))
    return 'authPasswordShort'
  if (m.includes('unable to validate email') || m.includes('invalid email'))
    return 'authBadEmail'
  if (m.includes('for security purposes') || m.includes('rate limit') || m.includes('too many'))
    return 'authTooMany'
  if (m.includes('failed to fetch') || m.includes('network')) return 'authOffline'
  return 'authGeneric'
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  // Starts true so nothing renders a "signed out" state for a split second
  // before the stored session has been read back.
  const [loading, setLoading] = useState(accountsEnabled)
  // Set when the learner arrives from a password-reset email, so the app knows
  // to ask for a new password rather than dropping them on the home screen.
  const [recovering, setRecovering] = useState(false)

  useEffect(() => {
    if (!supabase) return
    let alive = true

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return
      setSession(data.session ?? null)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      if (!alive) return
      setSession(next ?? null)
      setLoading(false)
      if (event === 'PASSWORD_RECOVERY') setRecovering(true)
    })

    return () => {
      alive = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(() => {
    // Every call returns `{ error: <string key> | null }` rather than throwing,
    // so the screens can render a friendly line without a try/catch each.
    const wrap = async (fn) => {
      if (!supabase) return { error: 'authGeneric' }
      try {
        const { error } = await fn()
        return { error: messageKey(error) }
      } catch (err) {
        return { error: messageKey(err) }
      }
    }

    return {
      accountsEnabled,
      session,
      user: session?.user ?? null,
      email: session?.user?.email ?? null,
      loading,
      recovering,

      signUp: (email, password) =>
        wrap(() =>
          supabase.auth.signUp({
            email: email.trim(),
            password,
            // Where the confirmation link brings them back to.
            options: { emailRedirectTo: window.location.origin },
          })
        ),

      signIn: (email, password) =>
        wrap(() => supabase.auth.signInWithPassword({ email: email.trim(), password })),

      signOut: async () => {
        await supabase?.auth.signOut()
        setRecovering(false)
      },

      requestPasswordReset: (email) =>
        wrap(() =>
          supabase.auth.resetPasswordForEmail(email.trim(), {
            redirectTo: window.location.origin,
          })
        ),

      // Used on the screen the reset email lands on.
      updatePassword: async (password) => {
        const result = await wrap(() => supabase.auth.updateUser({ password }))
        if (!result.error) setRecovering(false)
        return result
      },
    }
  }, [session, loading, recovering])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
