import { DEGREE_COLORS, IT_NAMES, nn } from '../lib/music'
import { t, tr } from '../lib/i18n'

// Strumento da toccare per gli esercizi "Costruisci".
// selected: [{ id, midi }] · onTap({ id, midi })
// result: null | { expected: [{pc,label,deg}], wrong: Set(id), missing: Set(pc) }  (dopo "Verifica")
// helpPc: nota da indicare con "Aiuto"

const PC_NAMES = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si']
const octaveOf = (midi) => Math.floor(midi / 12) - 1
const nameOf = (midi) => `${nn(PC_NAMES[midi % 12])}${octaveOf(midi)}`
const stringName = (ins, s) => { const n = STRING_NAMES[ins][s]; return n === 'Mi acuto' || n === 'Mi grave' ? t(n) : nn(n) }

function Dot({ x, y, expected, r = 13 }) {
  const c = DEGREE_COLORS[expected.deg]
  return (
    <g pointerEvents="none">
      <circle cx={x} cy={y} r={r} fill={c.bg} stroke="#1b1428" strokeWidth="2" />
      <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="central" fontSize={expected.label.length > 2 ? 10.5 : expected.label.length > 1 ? 12.5 : 14} fontWeight="800" fill={c.ink}>
        {expected.label}
      </text>
    </g>
  )
}
function Mark({ x, y, r = 13, dark = false }) {
  return (
    <g pointerEvents="none">
      <circle cx={x} cy={y} r={r} className={dark ? 'bi-bad-dark' : 'bi-bad'} stroke="#1b1428" strokeWidth="2" />
      <path d={`M${x - 5} ${y - 5}L${x + 5} ${y + 5}M${x + 5} ${y - 5}L${x - 5} ${y + 5}`} stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
    </g>
  )
}
function Ghost({ x, y, r = 13, help = false }) {
  return <circle cx={x} cy={y} r={r} className={help ? 'bi-ghost is-help' : 'bi-ghost'} pointerEvents="none" />
}
function Pick({ x, y, r = 8 }) {
  return <circle cx={x} cy={y} r={r} className="bi-pick" pointerEvents="none" />
}

// ——— Tastiera: due ottave, da Do4 a Do6 (si scorre con il dito: servono per i rivolti)
const BASE = 60
const OCT = 2
const WHITE_PCS = [0, 2, 4, 5, 7, 9, 11]
const KW = 44
const KH = 190
const BW = 30
const BH = 118

function Keys({ selected, onTap, result, helpPc }) {
  const white = []
  const black = []
  for (let m = BASE; m <= BASE + 12 * OCT; m++) {
    if (WHITE_PCS.includes(m % 12)) white.push({ midi: m, x: white.length * KW })
    else black.push({ midi: m, x: (white.length - 1) * KW + KW - BW / 2 })
  }
  const total = white.length * KW
  const sel = new Map(selected.map((s) => [s.midi, s]))
  const exp = result ? new Map(result.expected.map((e) => [e.pc, e])) : null
  const missingKeys = result ? new Set([...result.missing].map((pc) => (pc === 0 ? BASE : BASE + pc))) : new Set()

  const state = (midi) => {
    const s = sel.get(midi)
    if (!result) return s ? 'pick' : missingKeys.has(midi) ? 'none' : 'none'
    if (s) return result.wrong.has(s.id) ? 'bad' : 'ok'
    return missingKeys.has(midi) ? 'missing' : 'none'
  }
  const helpMidi = helpPc == null ? null : helpPc === 0 ? BASE : BASE + helpPc

  const keyEl = (k, isBlack) => {
    const st = state(k.midi)
    const w = isBlack ? BW : KW - 2
    const h = isBlack ? BH : KH
    const x = isBlack ? k.x : k.x + 1
    let cls = `bi-key ${isBlack ? 'is-black' : 'is-white'}`
    if (st === 'pick') cls += ' is-pick'
    if (st === 'ok') cls += ' is-ok'
    if (st === 'bad') cls += ' is-bad'
    const cx = x + w / 2
    const cy = h - (isBlack ? 20 : 26)
    return (
      <g
        key={k.midi}
        role="button"
        tabIndex={result ? -1 : 0}
        aria-label={`${nameOf(k.midi)}${sel.has(k.midi) ? t(', selezionata') : ''}`}
        aria-pressed={sel.has(k.midi)}
        onClick={() => !result && onTap({ id: `k${k.midi}`, midi: k.midi })}
        onKeyDown={(e) => !result && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onTap({ id: `k${k.midi}`, midi: k.midi }))}
      >
        <rect x={x} y="0" width={w} height={h} rx="4" className={cls} />
        {st === 'ok' && <Dot x={cx} y={cy} expected={exp.get(k.midi % 12)} />}
        {st === 'bad' && <Mark x={cx} y={cy} dark />}
        {helpMidi === k.midi && st === 'none' && <Ghost x={cx} y={cy} help />}
      </g>
    )
  }

  return (
    <>
    <div className="bi-scroll">
    <svg className="bi bi-wide" viewBox={`0 0 ${total} ${KH + 22}`} role="group" aria-label={t('Tastiera da {a} a {b}, scorrevole', { a: `${IT_NAMES[0]}4`, b: `${IT_NAMES[0]}${4 + OCT}` })}>
      {white.filter((k) => k.midi % 12 === 0).map((k) => (
        <text key={`l${k.midi}`} x={k.x + 3} y="12" className="bi-lbl">{`${IT_NAMES[0]}${octaveOf(k.midi)}`}</text>
      ))}
      <g transform="translate(0 20)">
        {white.map((k) => keyEl(k, false))}
        {black.map((k) => keyEl(k, true))}
        {/* tasti che mancavano: contorno tratteggiato, disegnato sopra i vicini */}
        {[...white.map((k) => [k, false]), ...black.map((k) => [k, true])]
          .filter(([k]) => state(k.midi) === 'missing')
          .map(([k, isBlack]) => (
            <rect key={`m${k.midi}`} x={(isBlack ? k.x : k.x + 1) + 1.5} y="1.5" width={(isBlack ? BW : KW - 2) - 3} height={(isBlack ? BH : KH) - 3} rx="4" className="bi-miss" pointerEvents="none" />
          ))}
      </g>
    </svg>
    </div>
    <p className="bi-hint" aria-hidden="true">{t('← Scorri la tastiera per le altre note →')}</p>
    </>
  )
}

// ——— Chitarra e basso: primi 5 tasti
const TUNING = {
  guitar: [64, 59, 55, 50, 45, 40], // Mi4 Si3 Sol3 Re3 La2 Mi2 (corda più acuta in alto)
  bass: [43, 38, 33, 28], // Sol2 Re2 La1 Mi1
}
const STRING_NAMES = {
  guitar: ['Mi acuto', 'Si', 'Sol', 'Re', 'La', 'Mi grave'],
  bass: ['Sol', 'Re', 'La', 'Mi'],
}
const THICK = { guitar: [1.2, 1.5, 2, 2.8, 3.6, 4.4], bass: [2.4, 3.2, 4, 4.8] }
const X0 = 44
// chitarra e basso (mockup della grafica): 12 tasti
const CFG = {
  guitar: { frets: 12, fw: 24.2, gap: 30, r: 9, marks: [3, 5, 7, 9], dbl: [12], dblOff: 1 },
  bass: { frets: 12, fw: 24.2, gap: 30, r: 9, marks: [3, 5, 7, 9], dbl: [12], dblOff: 0.36 },
}
const NUMERAL = { 3: 'III', 5: 'V', 7: 'VII', 9: 'IX', 12: 'XII' }
const TOP = 30
const OPEN_X = 22

function Frets({ instrument, selected, onTap, result, helpPc }) {
  const { frets: FRETS, fw: FW, gap: GAP, r: DR, marks, dbl, dblOff } = CFG[instrument]
  const fx = (f) => (f === 0 ? OPEN_X : X0 + (f - 0.5) * FW)
  const tuning = TUNING[instrument]
  const W = X0 + FRETS * FW + 6
  const lastY = TOP + (tuning.length - 1) * GAP
  const H = lastY + 30
  const sel = new Map(selected.map((s) => [s.id, s]))
  const exp = result ? new Map(result.expected.map((e) => [e.pc, e])) : null
  const midY = TOP + ((tuning.length - 1) * GAP) / 2

  // nota mancante: si indica la posizione più vicina alle note già toccate
  // (come nel mockup); altrimenti la posizione più bassa sul manico
  const ghostIds = new Set()
  const spot = (pc, avoid) => {
    const near = selected.length > 0
    const cs = selected.map((x) => x.id.split('-').map(Number))
    const cx = near ? cs.reduce((a, c) => a + c[1], 0) / cs.length : 0
    const cy = near ? cs.reduce((a, c) => a + c[0], 0) / cs.length : 0
    let best = null
    tuning.forEach((open, s) => {
      for (let f = near ? 1 : 0; f <= FRETS; f++) {
        if ((open + f) % 12 !== pc || avoid.has(`${s}-${f}`)) continue
        const d = near ? Math.hypot(f - cx, (s - cy) * 1.5) : f
        if (best === null || d < best.d) best = { s, f, d }
      }
    })
    return best
  }
  if (result) {
    result.missing.forEach((pc) => {
      const best = spot(pc, sel)
      if (best) ghostIds.add(`${best.s}-${best.f}`)
    })
  }
  let helpId = null
  if (helpPc != null && !result) {
    const best = spot(helpPc, sel)
    if (best) {
      helpId = `${best.s}-${best.f}`
      ghostIds.add(helpId)
    }
  }

  // punti di riferimento del manico: non si disegnano sotto una nota o il tratteggio
  const occupied = [...selected.map((x) => x.id), ...ghostIds].map((id) => id.split('-').map(Number))
  const covered = (fret, y) => occupied.some(([st, f]) => f === fret && Math.abs(TOP + st * GAP - y) < GAP * 0.6)

  const cells = []
  tuning.forEach((open, s) =>
    Array.from({ length: FRETS + 1 }, (_, f) => f).forEach((f) => {
      const midi = open + f
      const id = `${s}-${f}`
      const x = fx(f)
      const y = TOP + s * GAP
      const picked = sel.get(id)
      const left = f === 0 ? 0 : X0 + (f - 1) * FW
      const width = f === 0 ? X0 : FW
      cells.push(
        <g
          key={id}
          role="button"
          tabIndex={result ? -1 : 0}
          aria-label={t('Corda {s}, {v}: {midi}{v2}', { s: stringName(instrument, s), v: f === 0 ? t('a vuoto') : t('tasto {f}', { f }), midi: nameOf(midi), v2: picked ? t(', selezionata') : '' })}
          aria-pressed={Boolean(picked)}
          onClick={() => !result && onTap({ id, midi })}
          onKeyDown={(e) => !result && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onTap({ id, midi }))}
        >
          <rect x={left} y={y - GAP / 2} width={width} height={GAP} fill="transparent" />
          {f === 0 && !picked && !ghostIds.has(id) && <circle cx={x} cy={y} r={DR - 3} fill="none" stroke="#c4b5fd" strokeWidth="1.5" opacity="0.55" pointerEvents="none" />}
          {picked && !result && <Pick x={x} y={y} r={DR - 2} />}
          {picked && result && (result.wrong.has(id) ? <Mark x={x} y={y} r={DR} /> : <Dot x={x} y={y} expected={exp.get(midi % 12)} r={DR} />)}
          {!picked && ghostIds.has(id) && <Ghost x={x} y={y} r={DR} help={id === helpId} />}
        </g>,
      )
    }),
  )

  return (
    <svg className="bi" viewBox={`0 0 ${W} ${H}`} role="group" aria-label={t('Manico di {instrument}', { instrument: instrument === 'guitar' ? t('chitarra') : t('basso') })}>
      {[...marks, ...dbl].map((n) => (
        <text key={`n${n}`} x={fx(n)} y={14} textAnchor="middle" className="bi-lbl">
          {NUMERAL[n]}
        </text>
      ))}
      {marks.map((n) => (covered(n, midY) ? null : <circle key={`i${n}`} cx={fx(n)} cy={midY} r="4" fill="#f5f3ff" opacity="0.5" />))}
      {dbl.flatMap((n) => [-1, 1].map((d) => covered(n, midY + d * GAP * dblOff) ? null : <circle key={`d${n}${d}`} cx={fx(n)} cy={midY + d * GAP * dblOff} r="4" fill="#f5f3ff" opacity="0.5" />))}
      {Array.from({ length: FRETS }, (_, i) => i + 1).map((n) => (
        <line key={`f${n}`} x1={X0 + n * FW} x2={X0 + n * FW} y1={TOP - 12} y2={lastY + 12} stroke="#e2b659" strokeWidth="2.5" />
      ))}
      {tuning.map((_, s) => (
        <line key={`s${s}`} x1={X0} x2={W - 4} y1={TOP + s * GAP} y2={TOP + s * GAP} stroke="#8d97a3" strokeWidth={THICK[instrument][s]} />
      ))}
      <rect x={X0 - 3} y={TOP - 14} width="6" height={lastY - TOP + 28} rx="2" fill="#e2b659" />
      {cells}
    </svg>
  )
}

export default function BuildInstrument({ instrument, ...props }) {
  return instrument === 'keyboard' ? <Keys {...props} /> : <Frets instrument={instrument} {...props} />
}
