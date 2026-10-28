import module1 from './module1.js'
import { makeCourse } from '../makeCourse.js'

/**
 * Make a video with your phone. Built first for Ivan's grandmother, who wants
 * to start making videos and hasn't learned her phone yet — so it asks which
 * phone before anything else (`askPhone`, answered into settings.phone), and
 * shows its lessons at the largest text size on a phone (`textSize`; see the
 * boost in screens/Lesson.jsx). Its path, the picker, and anything on a
 * computer keep the learner's own size.
 *
 * Content may use `phone(iphone, android)` alongside `{ en, es }`, the way
 * Computer Basics uses `dev(windows, mac)`.
 */
export default makeCourse(
  {
    id: 'phone-video',
    status: 'available',
    icon: 'phone-video',
    askPhone: true,
    textSize: 'xlarge',
    title: { en: 'Make a video with your phone', es: 'Haz un video con tu celular' },
    subtitle: {
      en: 'Six short lessons, from opening the camera to sending a video to family',
      es: 'Seis lecciones cortitas: de abrir la cámara a mandarle un video a la familia',
    },
  },
  [module1]
)
