import module1 from './module1.js'
import module2 from './module2.js'
import module3 from './module3.js'
import module4 from './module4.js'
import { makeCourse } from '../makeCourse.js'

/**
 * Claude 001 — for people who already use a computer fine and are new to AI,
 * framed around making work easier. Unlike Computer Basics, this moves fast
 * and never re-explains basic computer literacy.
 */
export default makeCourse(
  {
    id: 'claude-001',
    status: 'available',
    icon: 'sparkle',
    title: { en: 'Claude 001', es: 'Claude 001' },
    subtitle: {
      en: 'What Claude is, how to use it well, and five real things to try',
      es: 'Qué es Claude, cómo usarlo bien, y cinco cosas reales para probar',
    },
  },
  [module1, module2, module3, module4]
)
