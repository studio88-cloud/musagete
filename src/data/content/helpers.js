// Strumenti per scrivere i contenuti dei capitoli.
// n: nota evidenziata (midi, grado per il colore 1–7, testo nel pallino)
// mk: costruisce le note da una tonica e da un elenco [semitoni, grado, testo]
// md: solo le altezze (per far ascoltare)
export const n = (midi, deg, label) => ({ midi, deg, label })
export const mk = (root, list) => list.map(([s, d, l]) => n(root + s, d, l))
export const md = (root, semis) => semis.map((s) => root + s)

// Formule di uso frequente: [semitoni, grado, testo]
export const F = {
  maj: [[0, 1, '1'], [4, 3, '3'], [7, 5, '5']],
  min: [[0, 1, '1'], [3, 3, '♭3'], [7, 5, '5']],
  dim: [[0, 1, '1'], [3, 3, '♭3'], [6, 5, '♭5']],
  aug: [[0, 1, '1'], [4, 3, '3'], [8, 5, '♯5']],
  maj7: [[0, 1, '1'], [4, 3, '3'], [7, 5, '5'], [11, 7, '7']],
  dom7: [[0, 1, '1'], [4, 3, '3'], [7, 5, '5'], [10, 7, '♭7']],
  min7: [[0, 1, '1'], [3, 3, '♭3'], [7, 5, '5'], [10, 7, '♭7']],
  hdim7: [[0, 1, '1'], [3, 3, '♭3'], [6, 5, '♭5'], [10, 7, '♭7']],
  dim7: [[0, 1, '1'], [3, 3, '♭3'], [6, 5, '♭5'], [9, 7, '♭♭7']],
  mmaj7: [[0, 1, '1'], [3, 3, '♭3'], [7, 5, '5'], [11, 7, '7']],
  maj7s5: [[0, 1, '1'], [4, 3, '3'], [8, 5, '♯5'], [11, 7, '7']],
}

// Una pagina di lezione
export const page = (heading, body, remember, extra = {}, polly = '') => ({ heading, body, remember, polly, ...extra })

// Accordo da una sigla (es. 'B♭maj7', 'G7', 'Cm7', 'F♯°7', 'Aø7', 'B♭/F'): altezze in posizione fondamentale tra Fa3 e Mi4
const PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const QUAL = { '': [0, 4, 7], m: [0, 3, 7], 7: [0, 4, 7, 10], m7: [0, 3, 7, 10], Δ: [0, 4, 7, 11], maj7: [0, 4, 7, 11], '°7': [0, 3, 6, 9], 'ø7': [0, 3, 6, 10], 'm7♭5': [0, 3, 6, 10], '°': [0, 3, 6] }
export function cs(sym) {
  const [main, bass] = sym.split('/')
  const m = main.match(/^([A-G])([♭♯]?)(.*)$/)
  if (!m || !QUAL[m[3]]) throw new Error(`Sigla non valida: ${sym}`)
  const pc = (PC[m[1]] + (m[2] === '♯' ? 1 : m[2] === '♭' ? -1 : 0) + 12) % 12
  const root = 53 + ((pc - 53 + 120) % 12)
  const notes = QUAL[m[3]].map((x) => root + x)
  if (bass) {
    const b = bass.match(/^([A-G])([♭♯]?)$/)
    const bpc = (PC[b[1]] + (b[2] === '♯' ? 1 : b[2] === '♭' ? -1 : 0) + 12) % 12
    const low = Math.min(...notes)
    let bm = low - ((low - bpc + 120) % 12 || 12)
    return [bm, ...notes.filter((x) => x % 12 !== bpc || x !== notes.find((y) => y % 12 === bpc))]
  }
  return notes
}

// Forma intera: bars = elenco di battute, ogni battuta una o due sigle ('Cm7 F7'). Si ascolta tutta, con durate
// proporzionate; `rows` sono le righe da leggere (per default quattro battute per riga).
export function formEx(label, bars, per = 4) {
  const chords = bars.flatMap((b) => b.split(' '))
  const weights = bars.flatMap((b) => b.split(' ').map((_, _i, a) => 1 / a.length))
  const rows = []
  for (let i = 0; i < bars.length; i += per) rows.push(`${bars.slice(i, i + per).join(' | ')} |`)
  return { label, notes: [], play: chords.map(cs), progression: true, form: true, weights, rows, chords: [] }
}
