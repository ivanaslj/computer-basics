import { supabase } from './supabase.js'
import { mergeStates, summarise } from './merge.js'

/**
 * Moving a learner's progress to and from the server. The rules for combining
 * two copies live in `merge.js`, which is deliberately free of any network or
 * browser dependency so it can be tested on its own.
 */

// A request that never settles is worse than one that fails: the status line
// would sit on "Saving…" forever while the learner wonders whether their work
// is safe. On a phone that has wandered out of signal, "failed" is the honest
// answer, and the next change retries anyway.
const TIMEOUT_MS = 15000
const deadline = () => AbortSignal.timeout(TIMEOUT_MS)

/** The signed-in user's stored state, or null if they have none yet. */
export async function pull(userId) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('progress')
    .select('state')
    .eq('user_id', userId)
    .abortSignal(deadline())
    .maybeSingle()
  if (error) throw error
  return data?.state ?? null
}

/**
 * Write the state up.
 *
 * Deliberately an upsert of the *already merged* state rather than a blind
 * overwrite: callers always pull and merge first, so a second device that was
 * offline for a week cannot flatten what happened in the meantime.
 */
export async function push(userId, state) {
  if (!supabase) return
  const { error } = await supabase
    .from('progress')
    .upsert({ user_id: userId, state }, { onConflict: 'user_id' })
    .abortSignal(deadline())
  if (error) throw error

  // Best-effort: the summary is a convenience for a feature that does not
  // exist yet, and is always rederivable from `state`. It must never be the
  // reason a learner's actual progress fails to save.
  try {
    await supabase.from('profiles').update(summarise(state)).eq('id', userId).abortSignal(deadline())
  } catch {
    /* ignore */
  }
}

/**
 * Sign-in, and every sync after it: take what the server has, fold it together
 * with what this device has, keep the result in both places. Returns the
 * merged state so the caller can adopt it.
 */
export async function syncNow(userId, localState) {
  const remote = await pull(userId)
  const merged = remote ? mergeStates(remote, localState) : localState
  await push(userId, merged)
  return merged
}
