/**
 * What can be tapped on each screen of the phone simulation (PhoneSim.jsx),
 * kept apart from the component so the curriculum checker can confirm a step's
 * `target` is really on the screen it names, without a JSX runtime. Same idea
 * as registry.js.
 *
 * Every screen is drawn for both iPhone and Android, with the same ids, so a
 * lesson names one target and works on either phone.
 */
export const PHONE_SCREENS = {
  // The phone from the front, switched on at the home screen.
  body: ['screen'],
  // An app open full screen, and the way back home (iPhone: swipe up from the
  // bar at the bottom; Android: the round home button).
  app: ['home'],
  // The home screen's grid of apps.
  home: ['camera', 'photos', 'whatsapp', 'calls', 'messages', 'clock', 'settings', 'maps'],
  // The camera. state.mode is 'photo' or 'video'; state.recording shows the
  // stop square and the running clock; state.thumb shows the last video.
  camera: ['shutter', 'video-mode', 'photo-mode', 'thumbnail', 'flip'],
  // One video, open. state.playing shows it playing.
  viewer: ['play', 'share', 'trash', 'favorite', 'back'],
  // "Are you sure?" after tapping the trash can.
  confirm: ['confirm-delete', 'cancel'],
  // The share sheet: which app to send the video with.
  share: ['whatsapp', 'messages', 'mail', 'more'],
  // WhatsApp's "send to" list.
  contacts: ['ivan', 'lupita', 'familia'],
  // WhatsApp, ready to send, with the video attached. state.sent shows it sent.
  chat: ['send'],
}

export const PHONE_SCREEN_NAMES = Object.keys(PHONE_SCREENS)
