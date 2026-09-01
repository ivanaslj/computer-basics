import { makeCourse } from '../makeCourse.js'

/**
 * Reserved slot — general AI literacy beyond just Claude. Scope not decided
 * yet; this stub keeps it visible in the Hub as "coming soon" rather than
 * absent, matching the intended lineup.
 */
export default makeCourse(
  {
    id: 'ai-001',
    status: 'coming-soon',
    emoji: '🤖',
    title: { en: 'AI 001', es: 'IA 001' },
    subtitle: {
      en: 'AI beyond Claude — coming soon',
      es: 'La IA más allá de Claude — próximamente',
    },
  },
  [
    {
      id: 'ai-m1',
      number: 1,
      emoji: '🚧',
      color: 'sun',
      title: { en: 'Coming soon', es: 'Próximamente' },
      subtitle: { en: 'This course is being written', es: 'Este curso se está escribiendo' },
      lessons: [
        {
          id: 'ai-m1-l1',
          emoji: '🚧',
          minutes: 1,
          title: { en: 'Coming soon', es: 'Próximamente' },
          steps: [
            {
              type: 'teach',
              title: { en: 'Coming soon', es: 'Próximamente' },
              body: [
                {
                  en: 'This course is being written. Check back soon.',
                  es: 'Este curso se está escribiendo. Vuelve pronto.',
                },
              ],
            },
          ],
        },
      ],
    },
  ]
)
