import { useState } from 'react'

// Tonalità in senso orario partendo da Do: [maggiore, minore relativa, armatura]
const KEYS = [
  ['Do', 'La', 'nessuna alterazione'],
  ['Sol', 'Mi', '1 diesis (Fa♯)'],
  ['Re', 'Si', '2 diesis (Fa♯, Do♯)'],
  ['La', 'Fa♯', '3 diesis (Fa♯, Do♯, Sol♯)'],
  ['Mi', 'Do♯', '4 diesis (Fa♯, Do♯, Sol♯, Re♯)'],
  ['Si', 'Sol♯', '5 diesis (Fa♯, Do♯, Sol♯, Re♯, La♯)'],
  ['Fa♯ / Sol♭', 'Re♯ / Mi♭', '6 diesis o 6 bemolli'],
  ['Re♭', 'Si♭', '5 bemolli (Si♭, Mi♭, La♭, Re♭, Sol♭)'],
  ['La♭', 'Fa', '4 bemolli (Si♭, Mi♭, La♭, Re♭)'],
  ['Mi♭', 'Do', '3 bemolli (Si♭, Mi♭, La♭)'],
  ['Si♭', 'Sol', '2 bemolli (Si♭, Mi♭)'],
  ['Fa', 'Re', '1 bemolle (Si♭)'],
]
const SHORT = ['Do', 'Sol', 'Re', 'La', 'Mi', 'Si', 'Fa♯', 'Re♭', 'La♭', 'Mi♭', 'Si♭', 'Fa']
const SHORT_MIN = ['La', 'Mi', 'Si', 'Fa♯', 'Do♯', 'Sol♯', 'Re♯', 'Si♭', 'Fa', 'Do', 'Sol', 'Re']

const pt = (r, i) => {
  const a = (i * 30 - 90) * (Math.PI / 180)
  return [150 + r * Math.cos(a), 150 + r * Math.sin(a)]
}

export default function CircleOfFifths() {
  const [sel, setSel] = useState(0)
  const k = KEYS[sel]
  const left = KEYS[(sel + 11) % 12]
  const right = KEYS[(sel + 1) % 12]
  return (
    <div className="cof">
      <svg viewBox="0 0 300 300" className="cof-svg" role="group" aria-label="Circolo delle quinte">
        {KEYS.map((_, i) => {
          const [x, y] = pt(112, i)
          const [mx, my] = pt(72, i)
          const on = i === sel
          return (
            <g key={i} onClick={() => setSel(i)} style={{ cursor: 'pointer' }} role="button" tabIndex={0} aria-label={`${KEYS[i][0]} maggiore, ${KEYS[i][1]} minore`} aria-pressed={on} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSel(i)}>
              <circle cx={x} cy={y} r="24" className={`cof-maj${on ? ' is-on' : ''}`} />
              <text x={x} y={y + 5} textAnchor="middle" className="cof-t">{SHORT[i]}</text>
              <circle cx={mx} cy={my} r="17" className={`cof-min${on ? ' is-on' : ''}`} />
              <text x={mx} y={my + 3.5} textAnchor="middle" className="cof-t2">{SHORT_MIN[i]}m</text>
            </g>
          )
        })}
      </svg>
      <div className="cof-info" aria-live="polite">
        <strong>{k[0]} maggiore · {k[1]} minore</strong>
        <span>Armatura: {k[2]}</span>
        <span>Tonalità vicine: {left[0]} (una quinta sotto) e {right[0]} (una quinta sopra)</span>
      </div>
    </div>
  )
}
