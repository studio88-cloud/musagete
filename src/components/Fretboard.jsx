import { DEGREE_COLORS } from '../lib/music'
import { t } from '../lib/i18n'

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

const X0 = 26 // capotasto
const POS_COLS = 4 // una posizione = 4 tasti
const POS_FRET_W = 89
const WIDTH = 390
const TOP = 40
const GAP = 27
const R = 13 // raggio dei pallini
const ROMAN = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII' }
const INLAY_FRETS = [3, 5, 7, 9, 12]

// corda a vuoto: a sinistra del capotasto; altrimenti il centro dello spazio tra due tasti
const OPEN_X = 13.5

// Una sola posizione da dare all'allievo, a partire dalla tonica più grave (sulla chitarra e sul basso: la corda più bassa
// su cui la tonica sta nei primi 4 tasti, es. il Do al 3° tasto della corda di La). Ogni nota compare una volta sola.
function pickPosition(instrument, highlights) {
  const tuning = STRINGS[instrument]
  const entries = [...highlights.entries()] // [pc, nota]
  const root = entries.find(([, n]) => n.deg === 1) || entries[0]
  const rootPc = root[0]
  // corda più grave su cui la tonica è nei primi 4 tasti (0 = corda a vuoto)
  let rs = tuning.length - 1
  let rf = 0
  for (let s = tuning.length - 1; s >= 0; s--) {
    const fr = (((rootPc - tuning[s]) % 12) + 12) % 12
    if (fr <= 4) {
      rs = s
      rf = fr
      break
    }
  }
  const rootMidi = tuning[rs] + rf
  const nut = rf <= 2 // finestra dal capotasto: corde a vuoto + tasti 1-4
  const base = nut ? 1 : rf - 1
  const inWin = (fr) => (nut ? fr >= 0 && fr <= POS_COLS : fr >= base && fr < base + POS_COLS)
  const dots = []
  let maxFret = base + POS_COLS - 1
  const scalePlaced = entries.length >= 6 ? placeScale(tuning, entries, rootMidi, rs, rf) : null
  entries.forEach(([key, note]) => {
    const pc = note.pc ?? key // l'ottava alta ha chiave pc + 100
    let target = rootMidi
    const exact = note.exact || (note.rel !== undefined && note.rel >= 12) // 9, 11, 13 e i voicing: l'altezza giusta conta, non solo il nome
    if (note.rel !== undefined) target = rootMidi + note.rel
    else while (((target % 12) + 12) % 12 !== pc) target++
    let best = null
    const consider = (win, maxFr = 12, only = false) => {
      tuning.forEach((open, s) => {
        for (let fr = 0; fr <= maxFr; fr++) {
          if (!win(fr) || (open + fr) % 12 !== pc) continue
          if (only && open + fr !== target) continue
          const cost = Math.abs(open + fr - target) * 10 + Math.abs(fr - rf) + (s === rs && fr === rf ? -100 : 0)
          if (!best || cost < best.cost) best = { s, fr, cost }
        }
      })
    }
    if (scalePlaced && scalePlaced.has(key)) {
      const p = scalePlaced.get(key)
      best = { s: p.s, fr: p.fr, cost: 0 }
    }
    if (!best && exact) {
      consider(inWin, 12, true)
      if (!best) consider((fr) => fr <= base + 7, 15, true) // fuori dalla posizione: la finestra si allarga (al massimo 8 tasti)
    }
    if (!best) consider(inWin)
    if (!best) consider(() => true)
    maxFret = Math.max(maxFret, best.fr)
    dots.push({ key: `${best.s}-${best.fr}`, s: best.s, f: best.fr, note })
  })
  // la finestra si adatta alle note scelte: se una cade prima del primo tasto, o sulla corda a vuoto, la si sposta
  let b = base
  let n = nut
  const frets = dots.map((d) => d.f)
  if (frets.includes(0)) {
    n = true
    b = 1
  } else if (!n) {
    b = Math.min(base, ...frets)
  }
  // le scale in fila hanno un tasto in più dopo l'ultima nota e possono arrivare a 10 tasti
  const cols = scalePlaced ? Math.min(Math.max(POS_COLS, maxFret - b + 2), 10) : Math.min(Math.max(POS_COLS, maxFret - b + 1), 8)
  return { nut: n, base: b, dots, cols }
}

// Scale: dalla tonica alla settima (e ottava) in fila. Ogni nota all'altezza esatta, sulla stessa corda
// o su quella più acuta della precedente, con la minima estensione sul manico (al massimo 8 tasti).
function placeScale(tuning, entries, rootMidi, rs, rf) {
  const notes = entries
    .filter(([, n]) => n.rel !== undefined)
    .map(([key, n]) => ({ key, rel: n.rel }))
    .sort((a, b) => a.rel - b.rel)
  if (notes.length < 6 || notes[0].rel !== 0 || notes[notes.length - 1].rel > 12) return null // solo scale, non accordi con estensioni
  const cands = notes.map((n, i) => {
    if (i === 0) return [{ s: rs, fr: rf }]
    const out = []
    tuning.forEach((open, s) => {
      const fr = rootMidi + n.rel - open
      if (fr >= 0 && fr <= 15) out.push({ s, fr })
    })
    return out
  })
  let best = null
  const cur = []
  const walk = (i) => {
    if (i === notes.length) {
      const fr = cur.map((c) => c.fr)
      const lo = Math.min(...fr.filter((f) => f > 0), 99)
      const hi = Math.max(...fr)
      const span = fr.includes(0) ? hi : hi - lo
      if (span > 8) return
      let cost = span * 10 + cur.reduce((t, c) => t + Math.abs(c.fr - rf), 0)
      if (rf > 0) cost += fr.filter((f) => f === 0).length * 15 // si evitano le corde a vuoto, che spezzano la fila
      for (let i = 1; i < cur.length; i++) if (cur[i].s !== cur[i - 1].s) cost += Math.abs(cur[i].fr - cur[i - 1].fr) * 3 // al cambio di corda si resta vicini
      // la forma classica: tre note per corda nelle scale di sette note, due nelle pentatoniche (l'ultima corda prende il resto)
      const ideal = notes.length >= 7 ? 3 : 2
      let run = 1
      for (let i = 1; i <= cur.length; i++) {
        if (i < cur.length && cur[i].s === cur[i - 1].s) run++
        else {
          if (i < cur.length) cost += Math.abs(run - ideal) * 20
          run = 1
        }
      }
      if (!best || cost < best.cost) best = { cost, picks: cur.map((c) => ({ ...c })) }
      return
    }
    for (const c of cands[i]) {
      if (i > 0 && c.s > cur[i - 1].s) continue // mai su una corda più grave
      cur[i] = c
      walk(i + 1)
    }
  }
  walk(0)
  if (!best) return null
  return new Map(notes.map((n, i) => [n.key, best.picks[i]]))
}

// highlights: Map pitch class -> nota; mode: 'degrees' | 'notes'
// firstPosition: mostra una sola posizione (4 tasti) invece di tutto il manico
export default function Fretboard({ instrument, highlights, mode, firstPosition = false }) {
  const tuning = STRINGS[instrument]
  const pos = firstPosition ? pickPosition(instrument, highlights) : null
  const COLS = pos ? pos.cols : 12
  const FRET_W = pos ? (pos.cols === POS_COLS ? POS_FRET_W : (WIDTH - 6 - X0) / pos.cols) : 28.8
  const nut = pos ? pos.nut : true
  const base = pos ? pos.base : 1 // primo tasto mostrato (le colonne vanno da base a base + COLS - 1)
  const fretX = (n) => X0 + n * FRET_W // n = numero di colonna (0 = bordo sinistro)
  const noteX = (f) => (f === 0 && nut ? OPEN_X : fretX(f - base + 1) - FRET_W / 2)
  const lastY = TOP + (tuning.length - 1) * GAP
  const height = lastY + 28
  const midY = TOP + ((tuning.length - 1) * GAP) / 2
  const shown = INLAY_FRETS.filter((n) => n >= base && n < base + COLS)
  const labels = pos && !nut && !shown.includes(base) ? [base, ...shown] : shown

  let dots = []
  if (pos) {
    dots = pos.dots.map((d) => ({ key: d.key, x: noteX(d.f), y: TOP + d.s * GAP, note: d.note }))
  } else {
    tuning.forEach((open, s) => {
      for (let f = 0; f <= 12; f++) {
        const note = highlights.get((open + f) % 12)
        if (note) dots.push({ key: `${s}-${f}`, x: noteX(f), y: TOP + s * GAP, note })
      }
    })
  }

  const names = [...highlights.values()].map((n) => n.name).join(', ')

  return (
    <svg className="fb" viewBox={`0 0 ${WIDTH} ${height}`} role="img" aria-label={t('Manico di {instrument}, note: {names}', { instrument: t(LABELS[instrument]), names })}>
      {labels.map((n) => (
        <text key={`n${n}`} className="fb-num" x={noteX(n)} y={14} textAnchor="middle">
          {ROMAN[n]}
        </text>
      ))}

      {shown.map((n) =>
        n === 12 ? (
          <g key="i12" fill="#f5f3ff">
            <circle cx={noteX(n)} cy={midY - 7} r="4.5" />
            <circle cx={noteX(n)} cy={midY + 7} r="4.5" />
          </g>
        ) : (
          <circle key={`i${n}`} cx={noteX(n)} cy={midY} r="4.5" fill="#f5f3ff" />
        ),
      )}

      {Array.from({ length: COLS }, (_, i) => i + 1).map((n) => (
        <line key={`f${n}`} x1={fretX(n)} x2={fretX(n)} y1={TOP - 8} y2={lastY + 8} stroke="#e2b659" strokeWidth="2.5" />
      ))}

      {tuning.map((_, s) => (
        <line key={`s${s}`} x1={X0} x2={WIDTH - 6} y1={TOP + s * GAP} y2={TOP + s * GAP} stroke="#8d97a3" strokeWidth={THICKNESS[instrument][s]} />
      ))}

      {nut ? (
        <rect x={X0 - 3} y={TOP - 10} width="6" height={lastY - TOP + 20} rx="2" fill="#e2b659" />
      ) : (
        <line x1={X0} x2={X0} y1={TOP - 8} y2={lastY + 8} stroke="#e2b659" strokeWidth="2.5" />
      )}

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
