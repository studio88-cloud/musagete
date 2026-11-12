import { CONTENT } from './content'

// Passi di ogni capitolo. Per ora tutti i capitoli usano lo stesso schema di esempio:
// i contenuti veri arriveranno capitolo per capitolo.
// kind: 'lesson' | 'ear' | 'build' | 'apply' | 'quiz'
export const KIND_LABEL = {
  lesson: 'Lezione',
  ear: 'Esercizio',
  build: 'Pratica',
  apply: 'Pratica',
  quiz: 'Test',
}

export const SAMPLE_STEPS = [
  { id: 1, kind: 'lesson', title: 'Le note e l’ottava', min: 3 },
  { id: 2, kind: 'lesson', title: 'Gli intervalli', min: 3 },
  { id: 3, kind: 'lesson', title: 'La scala maggiore', min: 3 },
  { id: 4, kind: 'lesson', title: 'Le scale minori', min: 3 },
  { id: 5, kind: 'lesson', title: 'Tonalità e armatura', min: 3 },
  { id: 6, kind: 'ear', title: 'Intervalli all’orecchio', min: 5 },
  { id: 7, kind: 'build', title: 'Costruisci sullo strumento', min: 5 },
  { id: 8, kind: 'apply', title: 'Applicazione pratica', min: 4 },
  { id: 9, kind: 'quiz', title: 'Quiz finale', min: 6 },
]

// "Prima di partire" (capitolo 0): lettura della musica, circa 20 minuti
export const INTRO_STEPS = [
  { id: 1, kind: 'lesson', title: 'Il pentagramma e la chiave', min: 4 },
  { id: 2, kind: 'lesson', title: 'Le note sul pentagramma', min: 5 },
  { id: 3, kind: 'lesson', title: 'Le durate e il ritmo', min: 5 },
  { id: 4, kind: 'quiz', title: 'Quiz finale', min: 4 },
]

export function stepsFor(chapter) {
  if (chapter === 0) return INTRO_STEPS
  return CONTENT[chapter]?.steps || SAMPLE_STEPS
}
