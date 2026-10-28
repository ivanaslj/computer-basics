/**
 * When to suggest saving progress to an account.
 *
 * The only way to make one used to be a button deep in Settings, which nobody
 * found. So after the third finished lesson, the home screen asks once, calmly.
 * "Not now" is respected: one more ask after five more lessons, then never
 * again. Pure, so the rule can be read (and tested) apart from the card.
 */

export const FIRST_ASK_AT = 3
export const ASK_AGAIN_AFTER = 5
export const MAX_ASKS = 2

export function shouldShowSaveNudge({ lessonsDone, saveNudge }, { accountsEnabled, signedIn }) {
  // Without a Supabase project there is no account to make; with a session
  // there is already one.
  if (!accountsEnabled || signedIn) return false
  const { dismissals = 0, atLessons = 0 } = saveNudge || {}
  if (dismissals >= MAX_ASKS) return false
  if (dismissals === 0) return lessonsDone >= FIRST_ASK_AT
  return lessonsDone >= atLessons + ASK_AGAIN_AFTER
}

/**
 * A test switch, read once from the address bar so it lasts through in-app
 * navigation:
 *   ?nudge=show   show the card whatever the lesson count, past answers or
 *                 sign-in (for checking how it looks)
 *   ?nudge=reset  forget every "Not now", so the real rule starts over
 */
export const NUDGE_TEST =
  typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('nudge')
