/**
 * Typing practice content, in three stages that build on each other:
 *
 *   letters   — home-row groups, for someone who has never touch-typed and
 *               needs to find keys without looking
 *   words     — high-frequency everyday words, the MonkeyType-style middle
 *   sentences — short realistic lines, so the practice ends somewhere useful
 *
 * Kept as plain data rather than inside the component so a stage can be
 * extended, or a language added, without touching any logic. Spanish lines
 * deliberately include accents and ñ — they are part of typing Spanish, and
 * skipping them would make the practice dishonest.
 */

export const TYPING_STAGES = ['letters', 'words', 'sentences']

const LETTERS = {
  en: [
    'asdf jkl; asdf jkl;',
    'aa ss dd ff jj kk ll',
    'fj fj dk dk sl sl a; a;',
    'as df jk l; as df jk l;',
    'sad lad ask fall glad',
    'a sad lass had a flask',
  ],
  es: [
    'asdf jklñ asdf jklñ',
    'aa ss dd ff jj kk ll ññ',
    'fj fj dk dk sl sl añ añ',
    'as df jk lñ as df jk lñ',
    'sal las dal falda salda',
    'la sala da la falda',
  ],
}

const WORDS = {
  en: [
    'the', 'and', 'you', 'that', 'was', 'for', 'are', 'with', 'his', 'they',
    'have', 'this', 'from', 'one', 'had', 'word', 'but', 'not', 'what', 'all',
    'were', 'when', 'your', 'said', 'there', 'use', 'each', 'which', 'she',
    'how', 'their', 'will', 'other', 'about', 'out', 'many', 'then', 'them',
    'these', 'her', 'would', 'make', 'like', 'him', 'into', 'time', 'has',
    'look', 'two', 'more', 'write', 'see', 'number', 'way', 'could', 'people',
    'than', 'first', 'water', 'been', 'call', 'who', 'now', 'find', 'long',
    'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part', 'work', 'week',
    'name', 'home', 'help', 'thank', 'please', 'email', 'file', 'folder',
  ],
  es: [
    'que', 'de', 'no', 'la', 'el', 'es', 'en', 'lo', 'un', 'por',
    'para', 'con', 'una', 'su', 'del', 'se', 'las', 'los', 'como', 'más',
    'pero', 'sus', 'este', 'ya', 'todo', 'esta', 'muy', 'sin', 'sobre',
    'entre', 'cuando', 'hasta', 'desde', 'nos', 'durante', 'todos', 'uno',
    'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'había', 'ante', 'ellos',
    'e', 'esto', 'antes', 'algunos', 'qué', 'unos', 'yo', 'otro', 'otras',
    'tanto', 'esa', 'estos', 'mucho', 'quien', 'nada', 'poco', 'ella',
    'año', 'día', 'vez', 'casa', 'trabajo', 'nombre', 'gracias', 'favor',
    'correo', 'archivo', 'carpeta', 'ayuda', 'semana', 'hora', 'niño', 'señor',
  ],
}

const SENTENCES = {
  en: [
    'Please send me the file before Friday.',
    'I have attached the report you asked for.',
    'Thank you for your help with this.',
    'The meeting has moved to two in the afternoon.',
    'Let me know if you have any questions.',
    'I am following up on my message from Tuesday.',
    'Could you confirm the total by the end of the day?',
    'The office will be closed on Monday.',
    'I saved the document in the shared folder.',
    'Here is the schedule for next week.',
  ],
  es: [
    'Por favor mándame el archivo antes del viernes.',
    'Te adjunto el reporte que pediste.',
    'Gracias por tu ayuda con esto.',
    'La junta se movió a las dos de la tarde.',
    'Avísame si tienes alguna pregunta.',
    'Doy seguimiento a mi mensaje del martes.',
    '¿Podrías confirmar el total antes de que termine el día?',
    'La oficina estará cerrada el lunes.',
    'Guardé el documento en la carpeta compartida.',
    'Aquí está el horario de la próxima semana.',
  ],
}

const pick = (list, n) => {
  const out = []
  for (let i = 0; i < n; i++) out.push(list[Math.floor(Math.random() * list.length)])
  return out
}

/** Builds one round's target text for a stage and language. */
export function buildText(stage, lang) {
  const l = lang === 'es' ? 'es' : 'en'
  if (stage === 'letters') return pick(LETTERS[l], 3).join(' ')
  if (stage === 'sentences') return pick(SENTENCES[l], 2).join(' ')
  return pick(WORDS[l], 24).join(' ')
}
