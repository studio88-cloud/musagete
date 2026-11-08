// Interscambio modale: accordo di settima su ogni grado, per le 21 scale (3 famiglie di 7 modi).
// Le colonne sono i gradi cromatici rispetto alla tonica; null = grado assente nella scala.
export const COLUMNS = ['I', '♭II', 'II', '♯II/♭III', 'III', 'IV', '♯IV/♭V', 'V', '♭VI', 'VI/♭♭VII', '♭VII', 'VII']

export const ROWS = [
  { group: 'Maggiore e modi', name: 'Ionian', cells: ['Δ', null, 'm7', null, 'm7', 'Δ', null, '7', null, 'm7', null, 'ø7'] },
  { group: 'Maggiore e modi', name: 'Dorian', cells: ['m7', null, 'm7', 'Δ', null, '7', null, 'm7', null, 'ø7', 'Δ', null] },
  { group: 'Maggiore e modi', name: 'Phrygian', cells: ['m7', 'Δ', null, '7', null, 'm7', null, 'ø7', 'Δ', null, 'm7', null] },
  { group: 'Maggiore e modi', name: 'Lydian', cells: ['Δ', null, '7', null, 'm7', null, 'ø7', 'Δ', null, 'm7', null, 'm7'] },
  { group: 'Maggiore e modi', name: 'Mixolydian', cells: ['7', null, 'm7', null, 'ø7', 'Δ', null, 'm7', null, 'm7', 'Δ', null] },
  { group: 'Maggiore e modi', name: 'Aeolian', cells: ['m7', null, 'ø7', 'Δ', null, 'm7', null, 'm7', 'Δ', null, '7', null] },
  { group: 'Maggiore e modi', name: 'Locrian', cells: ['ø7', 'Δ', null, 'm7', null, 'm7', 'Δ', null, '7', null, 'm7', null] },
  { group: 'Minore armonica e modi', name: 'Minore armonica', cells: ['mΔ', null, 'ø7', 'Δ/♯5', null, 'm7', null, '7', 'Δ', null, null, '°7'] },
  { group: 'Minore armonica e modi', name: 'Locrian ♮6', cells: ['ø7', 'Δ/♯5', null, 'm7', null, '7', 'Δ', null, null, '°7', 'mΔ', null] },
  { group: 'Minore armonica e modi', name: 'Ionian Augmented', cells: ['Δ/♯5', null, 'm7', null, '7', 'Δ', null, null, '°7', 'mΔ', null, 'ø7'] },
  { group: 'Minore armonica e modi', name: 'Dorian ♯4', cells: ['m7', null, '7', 'Δ', null, null, '°7', 'mΔ', null, 'ø7', 'Δ/♯5', null] },
  { group: 'Minore armonica e modi', name: 'Phrygian Dominant', cells: ['7', 'Δ', null, null, '°7', 'mΔ', null, 'ø7', 'Δ/♯5', null, 'm7', null] },
  { group: 'Minore armonica e modi', name: 'Lydian ♯2', cells: ['Δ', null, null, '°7', 'mΔ', null, 'ø7', 'Δ/♯5', null, 'm7', null, '7'] },
  { group: 'Minore armonica e modi', name: 'Superlocrian Diminished', cells: ['°7', 'mΔ', null, 'ø7', 'Δ/♯5', null, 'm7', null, '7', 'Δ', null, null] },
  { group: 'Minore melodica e modi', name: 'Minore melodica', cells: ['mΔ', null, 'm7', 'Δ/♯5', null, '7', null, '7', null, 'ø7', null, 'ø7'] },
  { group: 'Minore melodica e modi', name: 'Dorian ♭2', cells: ['m7', 'Δ/♯5', null, '7', null, '7', null, 'ø7', null, 'ø7', 'mΔ', null] },
  { group: 'Minore melodica e modi', name: 'Lydian Augmented', cells: ['Δ/♯5', null, '7', null, '7', null, 'ø7', null, 'ø7', 'mΔ', null, 'm7'] },
  { group: 'Minore melodica e modi', name: 'Lydian Dominant', cells: ['7', null, '7', null, 'ø7', null, 'ø7', 'mΔ', null, 'm7', 'Δ/♯5', null] },
  { group: 'Minore melodica e modi', name: 'Mixolydian ♭6', cells: ['7', null, 'ø7', null, 'ø7', 'mΔ', null, 'm7', 'Δ/♯5', null, '7', null] },
  { group: 'Minore melodica e modi', name: 'Locrian ♮2', cells: ['ø7', null, 'ø7', 'mΔ', null, 'm7', 'Δ/♯5', null, '7', null, '7', null] },
  { group: 'Minore melodica e modi', name: 'Superlocrian', cells: ['ø7', 'mΔ', null, 'm7', 'Δ/♯5', null, '7', null, '7', null, 'ø7', null] }
]
