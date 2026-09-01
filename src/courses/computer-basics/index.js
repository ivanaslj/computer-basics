import module1 from './module1.js'
import module2 from './module2.js'
import moduleMouse from './moduleMouse.js'
import module3 from './module3.js'
import module4 from './module4.js'
import module5 from './module5.js'
import module6 from './module6.js'
import module7 from './module7.js'
import job1 from './moduleJob1.js'
import job2 from './moduleJob2.js'
import job3 from './moduleJob3.js'
import job4 from './moduleJob4.js'
import job5 from './moduleJob5.js'
import job6 from './moduleJob6.js'
import job7 from './moduleJob7.js'
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
  // Mouse practice sits between "windows and apps" and "files and folders":
  // late enough that clicking has been introduced, early enough that nothing
  // yet assumes the learner can actually drag.
  //
  // The job-skills modules follow the whole foundation, in an order that
  // prevents the usual failure: someone who can make a document but then
  // can't find it, send it, or tell which copy is current. So filing and
  // email come before the apps that produce the files.
  [
    module1,
    module2,
    moduleMouse,
    module3,
    module4,
    module5,
    module6,
    module7,
    job1,
    job2,
    job3,
    job4,
    job5,
    job6,
    job7,
  ]
)
