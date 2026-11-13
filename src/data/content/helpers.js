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
