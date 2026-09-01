import module1 from './module1.js'
import module2 from './module2.js'
import module3 from './module3.js'
import module4 from './module4.js'
import module5 from './module5.js'
import module6 from './module6.js'
import module7 from './module7.js'
import { makeCourse } from '../makeCourse.js'

/**
 * The course. Each module is a file of its own; each lesson is a list of steps
 * that the lesson player walks through.
 *
 * Content values may be a plain string, a `{ en, es }` pair, or `dev(a, b)` to
 * vary by Windows/Mac — see src/i18n for how those are resolved.
 */
export default makeCourse(
  {
    id: 'computer-basics',
    status: 'available',
    emoji: '🖥️',
    title: { en: 'Computer Basics', es: 'Computación Básica' },
    subtitle: {
      en: 'The start level — turn it on, click, type, search, stay safe',
      es: 'El nivel inicial — enciéndela, haz clic, escribe, busca, mantente segura',
    },
  },
  [module1, module2, module3, module4, module5, module6, module7]
)
