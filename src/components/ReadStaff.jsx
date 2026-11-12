// Pentagramma singolo in chiave di violino per le lezioni di lettura.
// items: [{ step, dur, label }] — step: gradini diatonici sopra la prima linea (Mi4 = 0, Sol4 = 2, Do4 = -2);
// dur: 'whole' | 'half' | 'quarter' | 'eighth' (predefinita 'whole').
const W = 340
const GAP = 12 // distanza tra due linee
const BOTTOM = 96 // y della linea più bassa
const H = 160
const LX = 10
const RX = 330

const yOf = (step) => BOTTOM - (step * GAP) / 2

export default function ReadStaff({ items, timeSig, endBar = false, label }) {
  const lines = [0, 1, 2, 3, 4].map((i) => BOTTOM - i * GAP)
  const x0 = timeSig ? 120 : 96
  const span = RX - 22 - x0
  const gap = items.length > 1 ? Math.min(52, span / (items.length - 1)) : 0
  const startX = items.length > 1 ? x0 : x0 + 40
  const xs = items.map((_, i) => startX + i * gap)

  return (
    <svg className="rstaff" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
      <g stroke="#8a7cb0" strokeWidth="1.2">
        {lines.map((y) => (
          <line key={y} x1={LX} x2={RX} y1={y} y2={y} />
        ))}
      </g>
      <line x1={LX} x2={LX} y1={lines[4]} y2={lines[0]} stroke="#c4b5fd" strokeWidth="1.6" />
      {endBar && <line x1={RX} x2={RX} y1={lines[4]} y2={lines[0]} stroke="#c4b5fd" strokeWidth="2.4" />}

      {/* chiave di violino: origine sulla linea del Sol (seconda linea) */}
      <g transform={`translate(44 ${BOTTOM - GAP}) scale(4.8 8.3)`} fill="none" stroke="#f5f3ff" strokeWidth="0.42" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -1.4 3.4 C -1.4 4.3 0.5 4.3 0.45 2.9 L 0.1 -7.6 C 0.9 -8.8 2.1 -7.6 1.8 -6.2 C 1.5 -4.8 0.3 -3.8 -0.9 -3.0 C -2.7 -1.8 -2.6 1.5 -0.2 2.0 C 2.0 2.4 3.0 0.4 2.2 -1.0 C 1.5 -2.2 -0.5 -2.1 -1.0 -0.8 C -1.3 0.3 -0.3 1.0 0.5 0.6" />
      </g>

      {timeSig && (
        <g fill="#f5f3ff" fontSize="34" fontWeight="800" textAnchor="middle">
          <text x="92" y={BOTTOM - 2 * GAP - 4}>{timeSig[0]}</text>
          <text x="92" y={BOTTOM - 4}>{timeSig[1]}</text>
        </g>
      )}

      {items.map((it, i) => {
        const x = xs[i]
        const y = yOf(it.step)
        const dur = it.dur || 'whole'
        const filled = dur === 'quarter' || dur === 'eighth'
        const up = it.step < 4
        const ledgers = []
        for (let s = -2; s >= it.step; s -= 2) ledgers.push(s)
        for (let s = 10; s <= it.step; s += 2) ledgers.push(s)
        return (
          <g key={i}>
            {ledgers.map((s) => (
              <line key={s} x1={x - 14} x2={x + 14} y1={yOf(s)} y2={yOf(s)} stroke="#c4b5fd" strokeWidth="1.4" />
            ))}
            <ellipse
              cx={x}
              cy={y}
              rx={dur === 'whole' ? 9.5 : 8}
              ry="6"
              transform={`rotate(-18 ${x} ${y})`}
              fill={filled ? '#f5f3ff' : '#1b1428'}
              stroke="#f5f3ff"
              strokeWidth="2"
            />
            {dur !== 'whole' && (
              <line
                x1={up ? x + 7.4 : x - 7.4}
                x2={up ? x + 7.4 : x - 7.4}
                y1={y}
                y2={up ? y - 40 : y + 40}
                stroke="#f5f3ff"
                strokeWidth="2"
              />
            )}
            {dur === 'eighth' && (
              <path
                d={up ? `M ${x + 7.4} ${y - 40} q 14 8 8 24` : `M ${x - 7.4} ${y + 40} q 14 -8 8 -24`}
                fill="none"
                stroke="#f5f3ff"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            )}
            {it.label && (
              <text x={x} y={H - 8} textAnchor="middle" fontSize="13" fontWeight="700" fill="#C28AE3">
                {it.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
