import { DEGREE_COLORS, LETTER_PC } from '../lib/music'
import { t } from '../lib/i18n'

// Doppio pentagramma (violino sopra, basso sotto) con le note dell'accordo o della scala.
// Il disegno è in altezza reale (suono reale), uguale per tastiera, chitarra e basso.

const W = 358
const STEP = 5 // mezzo spazio tra due linee
const TB = 80 // linea più bassa del pentagramma di violino (Mi4)
const BT = TB + 70 // linea più alta del pentagramma di basso (La3)
const BB = BT + 40 // linea più bassa del basso (Sol2)
const HEIGHT = BB + 40
const LX = 22 // inizio dei pentagrammi
const RX = 350 // fine
const X0 = 78 // prima nota

const TREBLE = { bottomStep: 30, bottomY: TB } // Mi4
const BASS = { bottomStep: 18, bottomY: BB } // Sol2

const stepOf = (n, midi) => (Math.floor((midi - n.acc) / 12) - 1) * 7 + n.letter
const yOf = (clef, step) => clef.bottomY - (step - clef.bottomStep) * STEP

// linee supplementari necessarie per una nota
function ledgerSteps(clef, step) {
  const out = []
  const top = clef.bottomStep + 8
  if (step < clef.bottomStep) for (let s = clef.bottomStep - 2; s >= step - (step % 2 ? 1 : 0); s -= 2) out.push(s)
  if (step > top) for (let s = top + 2; s <= step + (step % 2 ? 0 : 0) && s <= step; s += 2) out.push(s)
  return out
}

function Accidental({ x, y, acc }) {
  const fill = '#f5f3ff'
  if (acc === 0) return <text x={x} y={y - 1} className="st-acc" fill={fill}>♮</text>
  if (acc === 1) return <text x={x} y={y - 1} className="st-acc" fill={fill}>♯</text>
  if (acc === -1) return <text x={x} y={y - 3} className="st-acc" fill={fill}>♭</text>
  if (acc === -2)
    return (
      <>
        <text x={x - 5} y={y - 3} className="st-acc" fill={fill}>♭</text>
        <text x={x + 3} y={y - 3} className="st-acc" fill={fill}>♭</text>
      </>
    )
  return (
    <path
      d={`M ${x - 4} ${y - 4} L ${x + 4} ${y + 4} M ${x - 4} ${y + 4} L ${x + 4} ${y - 4}`}
      stroke={fill}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  )
}

// Raggruppa le note da disegnare: { n, midi, step, x, dx, col }
function layout(notes, base, kind, shift) {
  const withMidi = notes.map((n) => ({ n, midi: base + n.semi - shift }))
  withMidi.forEach((e) => (e.step = stepOf(e.n, e.midi)))

  if (kind === 'scale') {
    const avail = RX - 8 - X0
    const stepW = Math.min(34, avail / withMidi.length)
    const seen = new Map()
    withMidi.forEach((e, i) => {
      e.x = X0 + i * stepW + 14
      const prev = seen.has(e.step) ? seen.get(e.step) : 0
      e.showAcc = e.n.acc !== prev
      seen.set(e.step, e.n.acc)
      e.accX = e.x - 15
    })
    return withMidi
  }

  // accordo: tutte le note insieme; le seconde adiacenti si alternano ai due lati del gambo
  const cx = (X0 + RX) / 2
  const asc = [...withMidi].sort((a, b) => a.step - b.step)
  asc.forEach((e, i) => {
    const prev = asc[i - 1]
    e.displaced = !!prev && e.step - prev.step === 1 && !prev.displaced
    e.x = cx + (e.displaced ? 11 : 0)
    e.showAcc = e.n.acc !== 0
  })
  const placed = []
  ;[...asc].reverse().forEach((e) => {
    if (!e.showAcc) return
    let col = 0
    while (placed.some((p) => p.col === col && Math.abs(p.step - e.step) < 6)) col++
    placed.push({ step: e.step, col })
    e.accX = cx - 16 - col * 17
  })
  return withMidi
}

function Notes({ clef, items }) {
  return items.map((e, i) => {
    const y = yOf(clef, e.step)
    const color = DEGREE_COLORS[e.n.deg]
    return (
      <g key={i}>
        {ledgerSteps(clef, e.step).map((s) => (
          <line key={s} x1={e.x - 10} x2={e.x + 10} y1={yOf(clef, s)} y2={yOf(clef, s)} stroke="#c4b5fd" strokeWidth="1.2" />
        ))}
        {e.showAcc && <Accidental x={e.accX} y={y} acc={e.n.acc} />}
        <ellipse cx={e.x} cy={y} rx="6.4" ry="4.6" transform={`rotate(-20 ${e.x} ${y})`} fill={color.bg} stroke="#1b1428" strokeWidth="1" />
      </g>
    )
  })
}

const brace = (x, y1, y2) => {
  const w = 10
  const mid = (y1 + y2) / 2
  const k = (mid - y1) * 0.4
  return `M ${x + w} ${y1} C ${x} ${y1 + k} ${x + w} ${mid - k} ${x} ${mid} C ${x + w} ${mid + k} ${x} ${y2 - k} ${x + w} ${y2}`
}

// notes: note con nome (da spellNotes) ordinate per semitono; base: nota MIDI della tonica
export default function Staff({ notes, base, kind }) {
  const list =
    kind === 'scale'
      ? [...notes, { ...notes.find((n) => n.semi === 0), semi: 12 }]
      : notes
  const treble = layout(list, base, kind, 0)
  const bass = layout(list, base, kind, 12)
  const trebleLines = [0, 1, 2, 3, 4].map((i) => TB - i * 10)
  const bassLines = [0, 1, 2, 3, 4].map((i) => BB - i * 10)

  return (
    <svg
      className="staff"
      viewBox={`0 0 ${W} ${HEIGHT}`}
      role="img"
      aria-label={t('Spartito: {v}', { v: notes.map((n) => n.name).join(', ') })}
    >
      <g stroke="#8a7cb0" strokeWidth="1">
        {[...trebleLines, ...bassLines].map((y) => (
          <line key={y} x1={LX} x2={RX} y1={y} y2={y} />
        ))}
      </g>
      <g stroke="#c4b5fd" strokeWidth="1.4">
        <line x1={LX} x2={LX} y1={TB - 40} y2={BB} />
        <line x1={RX} x2={RX} y1={TB - 40} y2={BB} />
      </g>
      <path d={brace(8, TB - 40, BB)} fill="none" stroke="#c4b5fd" strokeWidth="2.6" strokeLinecap="round" />

      {/* chiave di violino: origine sulla linea del Sol */}
      <g transform={`translate(46 ${TB - 10}) scale(4.8 8.3)`} fill="none" stroke="#f5f3ff" strokeWidth="0.42" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -1.4 3.4 C -1.4 4.3 0.5 4.3 0.45 2.9 L 0.1 -7.6 C 0.9 -8.8 2.1 -7.6 1.8 -6.2 C 1.5 -4.8 0.3 -3.8 -0.9 -3.0 C -2.7 -1.8 -2.6 1.5 -0.2 2.0 C 2.0 2.4 3.0 0.4 2.2 -1.0 C 1.5 -2.2 -0.5 -2.1 -1.0 -0.8 C -1.3 0.3 -0.3 1.0 0.5 0.6" />
      </g>
      {/* chiave di basso: origine sulla linea del Fa */}
      <g transform={`translate(38 ${BT + 10}) scale(8 10)`} fill="#f5f3ff" stroke="#f5f3ff" strokeLinecap="round">
        <circle cx="-0.9" cy="0" r="0.55" stroke="none" />
        <path d="M -0.9 0 C -0.9 -1.5 0.9 -1.9 1.9 -0.9 C 2.6 0.2 2.0 2.3 -1.0 3.9" fill="none" strokeWidth="0.7" />
        <circle cx="2.9" cy="-0.5" r="0.28" stroke="none" />
        <circle cx="2.9" cy="0.5" r="0.28" stroke="none" />
      </g>

      <Notes clef={TREBLE} items={treble} />
      <Notes clef={BASS} items={bass} />
    </svg>
  )
}
