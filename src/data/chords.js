// Accordi del menu Strumento. Il Delta (Δ) include già la settima maggiore.
import { parseFormula } from '../lib/music'

const RAW = [
  {
    title: 'Triadi',
    items: [
      { id: 'maj', name: 'Maggiore', formula: '1 3 5' },
      { id: 'min', name: 'Minore', formula: '1 ♭3 5' },
      { id: 'dim', name: 'Diminuito', formula: '1 ♭3 ♭5' },
      { id: 'aug', name: 'Eccedente', formula: '1 3 ♯5' },
    ],
  },
  {
    title: 'Quadriadi',
    items: [
      { id: 'maj7', name: 'Δ', formula: '1 3 5 7' },
      { id: 'dom7', name: '7', formula: '1 3 5 ♭7' },
      { id: 'mmaj7', name: 'mΔ', formula: '1 ♭3 5 7' },
      { id: 'min7', name: 'm7', formula: '1 ♭3 5 ♭7' },
      { id: 'hdim7', name: 'ø7', formula: '1 ♭3 ♭5 ♭7' },
      { id: 'dim7', name: '°7', formula: '1 ♭3 ♭5 ♭♭7' },
      { id: 'maj7s5', name: 'Δ/♯5', formula: '1 3 ♯5 7' },
    ],
  },
  {
    title: 'Sospesi',
    items: [
      { id: 'sus2', name: 'sus2', formula: '1 2 5' },
      { id: 'sus4', name: 'sus4', formula: '1 4 5' },
      { id: 'sus4-7', name: '7sus4', formula: '1 4 5 ♭7' },
    ],
  },
  {
    title: 'Sesta',
    items: [
      { id: 'six', name: '6', formula: '1 3 5 6' },
      { id: 'min6', name: 'm6', formula: '1 ♭3 5 6' },
    ],
  },
]

export const CHORD_GROUPS = RAW.map((g) => ({
  title: g.title,
  items: g.items.map((c) => ({ ...c, notes: parseFormula(c.formula) })),
}))

export const findChord = (id) =>
  CHORD_GROUPS.flatMap((g) => g.items).find((c) => c.id === id)
