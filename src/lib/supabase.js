import { createClient } from '@supabase/supabase-js'

/**
 * The Supabase client, or `null` when the app has not been given a project.
 *
 * Accounts are optional — the app has always worked with nothing but
 * localStorage and must keep working that way. So a missing or blank
 * environment variable is not an error: it means "this build has no accounts",
 * and every caller checks for null rather than assuming a client exists. That
 * also keeps `npm run dev` working for anyone who clones the repo without a
 * Supabase project of their own.
 *
 * The publishable key ships inside the bundle. That is by design, and is safe
 * only because every table has row-level security enabled, so this key can
 * reach nothing but the signed-in user's own rows. The secret/service_role key
 * bypasses those policies entirely and must never appear in client code.
 */

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

export const supabase =
  url && key
    ? createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          // A "forgot password" email sends the learner back here with a
          // recovery token in the URL fragment. This is what notices it and
          // turns it into a session, which is the only way they can then set a
          // new password — so it has to stay on.
          detectSessionInUrl: true,
          flowType: 'pkce',
        },
      })
    : null

/** Whether this build can offer accounts at all. */
export const accountsEnabled = Boolean(supabase)
