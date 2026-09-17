/**
 * Which screen the app opens on from cold.
 *
 * Its own module because two places need to agree on the answer: App, which
 * actually renders it, and the launch animation, which shows it on the
 * monitor's screen before handing over. If those two ever disagreed the camera
 * would zoom into one screen and land on a different one — a mismatch that is
 * invisible reading either file on its own, and obvious to the person using it.
 */
export function launchScreen(settings) {
  if (!settings.onboarded) return 'onboarding'
  // currentCourseId is set the first time a course is opened and never
  // cleared, so in practice a returning learner lands here rather than on the
  // hub — they go straight back to the course they were in the middle of.
  return settings.currentCourseId ? 'path' : 'hub'
}
