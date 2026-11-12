import { DEGREE_COLORS } from '../lib/music'

// Tastiera di una ottava (Do4–Do5) che si adatta alla larghezza dello schermo.
// notes: [{ midi, deg, label }]
const WHITE_PCS = [0, 2, 4, 5, 7, 9, 11, 12]
const BLACK_AFTER = { 0: 1, 2: 3, 5: 6, 7: 8, 9: 10 } // pc del tasto bianco -> pc del nero
const W = 44
const H = 150
const BW = 28
const BH = 92
const BASE = 60

export default function LessonKeys({ notes }) {
  const by = new Map(notes.map((n) => [n.midi, n]))
  const white = WHITE_PCS.map((pc, i) => ({ midi: BASE + pc, x: i * W }))
  const black = white
    .filter((k) => BLACK_AFTER[k.midi - BASE] !== undefined && k.midi - BASE < 12)
    .map((k) => ({ midi: k.midi + 1, x: k.x + W - BW / 2 }))

  const dot = (n, cx, cy) => {
    const c = DEGREE_COLORS[n.deg]
    return (
      <g key={`d${n.midi}`}>
        <circle cx={cx} cy={cy} r="13" fill={c.bg} stroke="#1b1428" strokeWidth="2" />
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={c.ink}>
          {n.label}
        </text>
      </g>
    )
  }

  return (
    <svg
      className="lkeys"
      viewBox={`0 0 ${W * 8} ${H + 22}`}
      role="img"
      aria-label={`Tastiera da Do a Do con evidenziate: ${notes.map((n) => n.label).join(', ')}`}
    >
      <text x="2" y="12" fontSize="13" fontWeight="700" fill="#C28AE3">Do4</text>
      <text x={W * 8 - 2} y="12" fontSize="13" fontWeight="700" fill="#C28AE3" textAnchor="end">Do5</text>
      <g transform="translate(0 20)">
        {white.map((k) => (
          <rect
            key={k.midi}
            x={k.x + 1}
            y="0"
            width={W - 2}
            height={H}
            rx="4"
            fill={by.has(k.midi) ? '#CDB171' : '#f5f3ff'}
          />
        ))}
        {black.map((k) => (
          <rect
            key={k.midi}
            x={k.x}
            y="0"
            width={BW}
            height={BH}
            rx="4"
            fill={by.has(k.midi) ? '#7c3aed' : '#2a1f42'}
            stroke="#1b1428"
            strokeWidth="2"
          />
        ))}
        {white.filter((k) => by.has(k.midi)).map((k) => dot(by.get(k.midi), k.x + W / 2, H - 24))}
        {black.filter((k) => by.has(k.midi)).map((k) => dot(by.get(k.midi), k.x + BW / 2, BH - 20))}
      </g>
    </svg>
  )
}
