import { DEGREE_COLORS } from '../lib/music'

// Accordatura standard, dalla corda più acuta (in alto) alla più grave (in basso). Note MIDI.
const STRINGS = {
  guitar: [64, 59, 55, 50, 45, 40], // Mi4 Si3 Sol3 Re3 La2 Mi2
  bass: [43, 38, 33, 28], // Sol2 Re2 La1 Mi1
}
const THICKNESS = {
  guitar: [1, 1.2, 1.8, 2.6, 3.4, 4.2],
  bass: [2, 2.8, 3.6, 4.4],
}
const LABELS = { guitar: 'chitarra', bass: 'basso' }

const WIDTH = 390
const X0 = 26 // capotasto
const FRET_W = 28.8
const FRETS = 12
const TOP = 40
const GAP = 27
const R = 13 // raggio dei pallini
const ROMAN = { 3: 'III', 5: 'V', 7: 'VII', 9: 'IX', 12: 'XII' }
const INLAYS = [3, 5, 7, 9, 12]

const fretX = (n) => X0 + n * FRET_W
// corda a vuoto: a sinistra del capotasto; altrimenti il centro dello spazio tra due tasti
const OPEN_X = 13.5
const noteX = (n) => (n === 0 ? OPEN_X : fretX(n) - FRET_W / 2)

// highlights: Map pitch class -> nota; mode: 'degrees' | 'notes'
export default function Fretboard({ instrument, highlights, mode }) {
  const tuning = STRINGS[instrument]
  const lastY = TOP + (tuning.length - 1) * GAP
  const height = lastY + 28
  const midY = TOP + ((tuning.length - 1) * GAP) / 2

  const dots = []
  tuning.forEach((open, s) => {
    for (let f = 0; f <= FRETS; f++) {
      const note = highlights.get((open + f) % 12)
      if (note) dots.push({ key: `${s}-${f}`, x: noteX(f), y: TOP + s * GAP, note })
    }
  })

  const names = [...highlights.values()].map((n) => n.name).join(', ')

  return (
    <svg
      className="fb"
      viewBox={`0 0 ${WIDTH} ${height}`}
      role="img"
      aria-label={`Manico di ${LABELS[instrument]}, note: ${names}`}
    >
      {INLAYS.map((n) => (
        <text key={`n${n}`} className="fb-num" x={noteX(n)} y={14} textAnchor="middle">
          {ROMAN[n]}
        </text>
      ))}

      {INLAYS.map((n) =>
        n === 12 ? (
          <g key="i12" fill="#f5f3ff">
            <circle cx={noteX(n)} cy={midY - 7} r="4.5" />
            <circle cx={noteX(n)} cy={midY + 7} r="4.5" />
          </g>
        ) : (
          <circle key={`i${n}`} cx={noteX(n)} cy={midY} r="4.5" fill="#f5f3ff" />
        ),
      )}

      {Array.from({ length: FRETS }, (_, i) => i + 1).map((n) => (
        <line key={`f${n}`} x1={fretX(n)} x2={fretX(n)} y1={TOP - 8} y2={lastY + 8} stroke="#e2b659" strokeWidth="2.5" />
      ))}

      {tuning.map((_, s) => (
        <line
          key={`s${s}`}
          x1={X0}
          x2={WIDTH - 6}
          y1={TOP + s * GAP}
          y2={TOP + s * GAP}
          stroke="#8d97a3"
          strokeWidth={THICKNESS[instrument][s]}
        />
      ))}

      <rect x={X0 - 3} y={TOP - 10} width="6" height={lastY - TOP + 20} rx="2" fill="#e2b659" />

      {dots.map(({ key, x, y, note }) => {
        const c = DEGREE_COLORS[note.deg]
        const text = mode === 'notes' ? note.name : note.label
        const size = mode === 'notes' ? (text.length > 3 ? 10 : 11.5) : text.length > 2 ? 11.5 : 15
        return (
          <g key={key}>
            <circle cx={x} cy={y} r={R} fill={c.bg} stroke="#1b1428" strokeWidth="1.5" />
            <text className="fb-dot" x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={size} fill={c.ink}>
              {text}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
