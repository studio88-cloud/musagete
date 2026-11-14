import { DEGREE_COLORS, IT_NAMES } from '../lib/music'
import { t } from '../lib/i18n'

// Tastiera di una ottava (da `base` a `base + 12`) che si adatta alla larghezza dello schermo.
// `base` deve essere un tasto bianco. notes: [{ midi, deg, label }]
const WHITE_PCS = [0, 2, 4, 5, 7, 9, 11]
const W = 44
const H = 150
const BW = 28
const BH = 92

const isWhite = (midi) => WHITE_PCS.includes(midi % 12)
const noteName = (midi) => `${IT_NAMES[WHITE_PCS.indexOf(midi % 12)]}${Math.floor(midi / 12) - 1}`

export default function LessonKeys({ notes, base = 60 }) {
  const by = new Map(notes.map((n) => [n.midi, n]))
  // se ci sono note oltre l'ottava (9, 11, 13) la tastiera sale fino al primo tasto bianco che le contiene
  // se la tonica è un tasto nero la tastiera parte dal tasto bianco subito sotto
  let start = base
  while (!isWhite(start)) start--
  let top = base + 12
  const hi = Math.max(...notes.map((n) => n.midi), 0)
  while (top < hi || !isWhite(top)) top++
  const white = []
  const black = []
  for (let m = start; m <= top; m++) {
    if (isWhite(m)) white.push({ midi: m, x: white.length * W })
    else black.push({ midi: m, x: (white.length - 1) * W + W - BW / 2 })
  }
  const total = white.length * W

  const dot = (n, cx, cy) => {
    const c = DEGREE_COLORS[n.deg]
    const size = n.label.length > 2 ? 10.5 : n.label.length > 1 ? 12.5 : 14
    return (
      <g key={`d${n.midi}`}>
        <circle cx={cx} cy={cy} r="13" fill={c.bg} stroke="#1b1428" strokeWidth="2" />
        <text x={cx} y={cy + 4.5} textAnchor="middle" fontSize={size} fontWeight="800" fill={c.ink}>
          {n.label}
        </text>
      </g>
    )
  }

  return (
    <svg
      className="lkeys"
      viewBox={`0 0 ${total} ${H + 22}`}
      role="img"
      aria-label={t('Tastiera da {start} a {top} con evidenziate: {v}', { start: noteName(start), top: noteName(top), v: notes.map((n) => n.label).join(', ') })}
    >
      <text x="2" y="12" fontSize="13" fontWeight="700" fill="#C28AE3">{noteName(start)}</text>
      <text x={total - 2} y="12" fontSize="13" fontWeight="700" fill="#C28AE3" textAnchor="end">{noteName(top)}</text>
      <g transform="translate(0 20)">
        {white.map((k) => (
          <rect key={k.midi} x={k.x + 1} y="0" width={W - 2} height={H} rx="4" fill={by.has(k.midi) ? '#CDB171' : '#f5f3ff'} />
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
