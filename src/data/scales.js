// Scale del menu Strumento (sempre disponibili). Le formule usano i gradi scritti come nei pallini.
import { parseFormula } from '../lib/music'

const RAW = [
  {
    title: 'Maggiore e Modi',
    items: [
      { id: 'ionian-maggiore', name: 'Ionian (Maggiore)', formula: '1 2 3 4 5 6 7' },
      { id: 'dorian', name: 'Dorian', formula: '1 2 ♭3 4 5 6 ♭7' },
      { id: 'phrygian', name: 'Phrygian', formula: '1 ♭2 ♭3 4 5 ♭6 ♭7' },
      { id: 'lydian', name: 'Lydian', formula: '1 2 3 ♯4 5 6 7' },
      { id: 'mixolydian', name: 'Mixolydian', formula: '1 2 3 4 5 6 ♭7' },
      { id: 'aeolian-minore', name: 'Aeolian (Minore)', formula: '1 2 ♭3 4 5 ♭6 ♭7' },
      { id: 'locrian', name: 'Locrian', formula: '1 ♭2 ♭3 4 ♭5 ♭6 ♭7' },
    ],
  },
  {
    title: 'Minore Armonica e Modi',
    items: [
      { id: 'minore-armonica', name: 'Minore Armonica', formula: '1 2 ♭3 4 5 ♭6 7' },
      { id: 'locrian-nat6', name: 'Locrian ♮6', formula: '1 ♭2 ♭3 4 ♭5 6 ♭7' },
      { id: 'ionian-augmented', name: 'Ionian Augmented', formula: '1 2 3 4 ♯5 6 7' },
      { id: 'dorian-sharp4', name: 'Dorian ♯4', formula: '1 2 ♭3 ♯4 5 6 ♭7' },
      { id: 'phrygian-dominant', name: 'Phrygian Dominant', formula: '1 ♭2 3 4 5 ♭6 ♭7' },
      { id: 'lydian-sharp2', name: 'Lydian ♯2', formula: '1 ♯2 3 ♯4 5 6 7' },
      { id: 'superlocrian-diminished', name: 'Superlocrian Diminished', formula: '1 ♭2 ♭3 ♭4 ♭5 ♭6 ♭♭7' },
    ],
  },
  {
    title: 'Minore Melodica e Modi',
    items: [
      { id: 'minore-melodica', name: 'Minore Melodica', formula: '1 2 ♭3 4 5 6 7' },
      { id: 'dorian-flat2', name: 'Dorian ♭2', formula: '1 ♭2 ♭3 4 5 6 ♭7' },
      { id: 'lydian-augmented', name: 'Lydian Augmented', formula: '1 2 3 ♯4 ♯5 6 7' },
      { id: 'lydian-dominant', name: 'Lydian Dominant', formula: '1 2 3 ♯4 5 6 ♭7' },
      { id: 'mixolydian-flat6', name: 'Mixolydian ♭6', formula: '1 2 3 4 5 ♭6 ♭7' },
      { id: 'locrian-nat2', name: 'Locrian ♮2', formula: '1 2 ♭3 4 ♭5 ♭6 ♭7' },
      { id: 'superlocrian', name: 'Superlocrian', formula: '1 ♭2 ♭3 ♭4 ♭5 ♭6 ♭7' },
    ],
  },
  {
    title: 'Pentatoniche e Blues',
    items: [
      { id: 'pentatonica-maggiore', name: 'Pentatonica Maggiore', formula: '1 2 3 5 6' },
      { id: 'pentatonica-minore', name: 'Pentatonica Minore', formula: '1 ♭3 4 5 ♭7' },
      { id: 'blues-maggiore', name: 'Blues Maggiore', formula: '1 2 ♭3 3 5 6' },
      { id: 'blues-minore', name: 'Blues Minore', formula: '1 ♭3 4 ♭5 5 ♭7' },
      { id: 'blues-mista', name: 'Blues Mista', formula: '1 2 ♭3 3 4 ♭5 5 6 ♭7' },
    ],
  },
  {
    title: 'Bebop',
    items: [
      { id: 'bebop', name: 'Bebop', formula: '1 2 3 4 5 6 ♭7 7' },
      { id: 'bebop-maggiore', name: 'Bebop Maggiore', formula: '1 2 3 4 5 ♭6 6 7' },
      { id: 'bebop-minore', name: 'Bebop Minore', formula: '1 2 ♭3 3 4 5 6 ♭7' },
    ],
  },
  {
    title: 'Simmetriche',
    items: [
      { id: 'esatonale', name: 'Esatonale', formula: '1 2 3 ♯4 ♯5 ♭7' },
      { id: 'diminuita-tono-semitono', name: 'Diminuita Tono-Semitono', formula: '1 2 ♭3 4 ♭5 ♭6 6 7' },
      { id: 'diminuita-semitono-tono', name: 'Diminuita Semitono-Tono', formula: '1 ♭2 ♭3 3 ♯4 5 6 ♭7' },
    ],
  },
  {
    title: 'Esotiche',
    items: [
      { id: 'enigmatica', name: 'Enigmatica', formula: '1 ♭2 3 ♯4 ♯5 ♯6 7' },
      { id: 'minore-napoletana', name: 'Minore Napoletana', formula: '1 ♭2 ♭3 4 5 ♭6 7' },
      { id: 'maggiore-armonica', name: 'Maggiore Armonica', formula: '1 2 3 4 5 ♭6 7' },
      { id: 'persiana', name: 'Persiana', formula: '1 ♭2 3 4 ♭5 ♭6 7' },
      { id: 'araba-o-bizantina', name: 'Araba (o Bizantina)', formula: '1 ♭2 3 4 5 ♭6 7' },
      { id: 'ungherese-o-gypsy', name: 'Ungherese (o Gypsy)', formula: '1 2 ♭3 ♯4 5 ♭6 7' },
    ],
  },
  {
    title: 'Orientali',
    items: [
      { id: 'asavari-ascendente', name: 'Asavari Ascendente', formula: '1 2 4 5 ♭6' },
      { id: 'hirajoshi', name: 'Hirajoshi', formula: '1 2 ♭3 5 ♭6' },
      { id: 'insen', name: 'Insen', formula: '1 ♭2 4 5 ♭7' },
      { id: 'miyako-bushi-o-hon-kumoi-shiouzhi', name: 'Miyako-bushi (o Hon Kumoi Shiouzhi)', formula: '1 ♭2 4 5 ♭6' },
      { id: 'iwato', name: 'Iwato', formula: '1 ♭2 4 ♭5 ♭7' },
      { id: 'egiziana', name: 'Egiziana', formula: '1 2 4 5 ♭7' },
      { id: 'vietnamita', name: 'Vietnamita', formula: '1 ♭3 4 5 ♭6' },
    ],
  },
]

export const SCALE_GROUPS = RAW.map((g) => ({
  title: g.title,
  items: g.items.map((s) => ({ ...s, notes: parseFormula(s.formula) })),
}))

export const findScale = (id) =>
  SCALE_GROUPS.flatMap((g) => g.items).find((s) => s.id === id)
