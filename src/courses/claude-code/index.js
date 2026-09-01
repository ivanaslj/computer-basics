import { makeCourse } from '../makeCourse.js'

/**
 * Reserved slot — a deep dive on Claude Code specifically (Claude 001 only
 * gives it a brief overview). Not written yet; this stub keeps it visible in
 * the Hub as "coming soon" rather than absent, matching the intended lineup.
 */
export default makeCourse(
  {
    id: 'claude-code',
    status: 'coming-soon',
    emoji: '🧑‍💻',
    title: { en: 'Claude Code', es: 'Claude Code' },
    subtitle: {
      en: 'Going deeper with the terminal tool — coming soon',
      es: 'Profundizar en la herramienta de terminal — próximamente',
    },
  },
  [
    {
      id: 'cc-m1',
      number: 1,
      emoji: '🚧',
      color: 'sun',
      title: { en: 'Coming soon', es: 'Próximamente' },
      subtitle: { en: 'This course is being written', es: 'Este curso se está escribiendo' },
      lessons: [
        {
          id: 'cc-m1-l1',
          emoji: '🚧',
          minutes: 1,
          title: { en: 'Coming soon', es: 'Próximamente' },
          steps: [
            {
              type: 'teach',
              title: { en: 'Coming soon', es: 'Próximamente' },
              body: [
                {
                  en: 'This course is being written. Check back soon for a deep dive into Claude Code.',
                  es: 'Este curso se está escribiendo. Vuelve pronto para profundizar en Claude Code.',
                },
              ],
            },
          ],
        },
      ],
    },
  ]
)
