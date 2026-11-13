// Motore delle note: grafia corretta (Mi♭, Do♯...), gradi e colori.

export const LETTER_PC = [0, 2, 4, 5, 7, 9, 11] // C D E F G A B
export const IT_NAMES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si']

// Le 17 toniche del menu (nome con lettere, come nel mockup)
export const TONICS = [
  ['C', 0, 0], ['C♯', 0, 1], ['D♭', 1, -1], ['D', 1, 0], ['D♯', 1, 1], ['E♭', 2, -1],
  ['E', 2, 0], ['F', 3, 0], ['F♯', 3, 1], ['G♭', 4, -1], ['G', 4, 0], ['G♯', 4, 1],
  ['A♭', 5, -1], ['A', 5, 0], ['A♯', 5, 1], ['B♭', 6, -1], ['B', 6, 0],
].map(([id, letter, acc]) => ({ id, letter, acc, pc: (LETTER_PC[letter] + acc + 12) % 12 }))

// Grado -> colore (2=9, 4=11, 6=13) e colore del numero scritto dentro il pallino
export const DEGREE_COLORS = {
  1: { bg: '#e3b34b', ink: '#1b1428' },
  2: { bg: '#e8955e', ink: '#1b1428' },
  3: { bg: '#c28ae3', ink: '#1b1428' },
  4: { bg: '#a765c6', ink: '#ffffff' },
  5: { bg: '#9b6bd0', ink: '#ffffff' },
  6: { bg: '#8a4fa6', ink: '#ffffff' },
  7: { bg: '#6e3c8c', ink: '#ffffff' },
}

const MAJOR_SEMI = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11, 9: 14, 11: 17, 13: 21 }

const ACC = { '-2': '♭♭', '-1': '♭', 0: '', 1: '♯', 2: '♯♯' }
export const accidental = (n) => ACC[n] ?? ''

// Nome di una tonica: per gli accordi con le lettere (C, D♭, F♯: sigle), per scale e note singole in solfeggio (Do, Re♭, Fa♯)
export const tonicName = (t, kind) => (kind === 'scale' ? IT_NAMES[t.letter] + accidental(t.acc) : t.id)

// "1 ♭3 5 ♭♭7" -> [{label, semi, deg}]
export function parseFormula(text) {
  return text.trim().split(/\s+/).map((label) => {
    const m = label.match(/^([♯♭]*)(\d+)$/)
    if (!m) throw new Error(`Grado non valido: ${label}`)
    const shift = [...m[1]].reduce((n, c) => n + (c === '♯' ? 1 : -1), 0)
    const num = Number(m[2])
    return { label, semi: MAJOR_SEMI[num] + shift, deg: ((num - 1) % 7) + 1 }
  })
}

// Dalla tonica e dalla formula alle note con nome corretto
export function spellNotes(root, formula) {
  return formula.map(({ label, semi, deg }) => {
    const letter = (root.letter + deg - 1) % 7
    const pc = (root.pc + semi) % 12
    let diff = (pc - LETTER_PC[letter] + 12) % 12
    if (diff > 6) diff -= 12
    return {
      label,
      deg,
      semi,
      pc,
      letter, // 0-6 (Do...Si), serve per il pentagramma
      acc: diff, // alterazione: -2 ♭♭ ... +2 ♯♯
      name: IT_NAMES[letter] + accidental(diff),
    }
  })
}

// Nota di partenza per l'ascolto (intorno al Do centrale)
export function baseMidi(root) {
  return 60 + (root.pc > 6 ? root.pc - 12 : root.pc)
}

// Evidenziazioni per il manico: pitch class -> nota, con `rel` = semitoni sopra la tonica
// (così 9, 11 e 13 restano un'ottava sopra e non vengono ripiegate)
export function highlightMap(notes, nameOf, { octave = false } = {}) {
  const rootNote = notes.find((n) => n.deg === 1) || notes[0]
  const m = new Map()
  notes.forEach((n) => {
    const pc = n.midi % 12
    if (m.has(pc)) {
      // la tonica all'ottava alta ha un suo punto: chiude la scala (chiave pc + 100)
      if (octave && n.deg === 1 && n.midi - rootNote.midi >= 12) m.set(pc + 100, { deg: n.deg, label: n.label, name: nameOf(pc), rel: n.midi - rootNote.midi, pc })
      return
    }
    m.set(pc, { deg: n.deg, label: n.label, name: nameOf(pc), rel: n.midi - rootNote.midi, exact: n.exact })
  })
  return m
}
