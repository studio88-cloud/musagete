import { useEffect, useState } from 'react'
import { playNotes, stopPlaying, instrumentShift } from '../lib/audio'
import { t } from '../lib/i18n'
import { nn } from '../lib/music'

// Le dodici toniche, con il semitono sopra Do (0) che serve a scegliere come scrivere le altre note
const TONICS = [
  ['Do', 0], ['Re♭', 1], ['Re', 2], ['Mi♭', 3], ['Mi', 4], ['Fa', 5],
  ['Fa♯', 6], ['Sol', 7], ['La♭', 8], ['La', 9], ['Si♭', 10], ['Si', 11],
]
const NAMES = {
  mixed: ['Do', 'Do♯', 'Re', 'Mi♭', 'Mi', 'Fa', 'Fa♯', 'Sol', 'La♭', 'La', 'Si♭', 'Si'],
  flats: ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'],
  sharps: ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'],
}
// Do usa la scrittura più comune; le tonalità con i diesis scrivono con i diesis, le altre con i bemolle
const STYLE = ['mixed', 'flats', 'sharps', 'flats', 'sharps', 'flats', 'sharps', 'sharps', 'flats', 'sharps', 'flats', 'sharps']
const DEG = ['1', '♭2', '2', '♭3', '3', '4', '♯4', '5', '♭6', '6', '♭7', '7']
// Le sei coppie: semitoni sopra la tonica che si specchiano (la somma fa sempre 7, oppure 19)
const PAIRS = [[0, 7], [1, 6], [2, 5], [3, 4], [8, 11], [9, 10]]
const COLORS = ['#e2b659', '#f6866a', '#63b3ed', '#9ae66e', '#b794f6', '#4fd1c5']
const pairOf = (i) => PAIRS.findIndex((p) => p.includes(i))

const C = 160
const R = 112
const pos = (i, r = R) => {
  const a = (i * 30 - 90) * (Math.PI / 180)
  return [C + r * Math.cos(a), C + r * Math.sin(a)]
}

// Scheda interattiva: scegli la tonica e vedi come le note si specchiano intorno all'asse
export default function NegativeAxis({ instrument = 'keyboard' }) {
  const [tonic, setTonic] = useState(0)
  const [pair, setPair] = useState(0)
  const [playing, setPlaying] = useState(false)
  useEffect(() => () => stopPlaying(), [])

  const names = NAMES[STYLE[tonic]]
  const name = (i) => nn(names[(tonic + i) % 12])
  const sel = PAIRS[pair]
  const [ax1, ay1] = pos(3.5, 148)
  const [ax2, ay2] = pos(9.5, 148)

  const choosePair = (p) => {
    stopPlaying()
    setPlaying(false)
    setPair(p)
  }
  const listen = () => {
    if (playing) {
      stopPlaying()
      setPlaying(false)
      return
    }
    const shift = instrumentShift(instrument)
    const base = 60 + tonic
    setPlaying(true)
    playNotes([base + sel[0] + shift, base + sel[1] + shift], { kind: 'scale', arpeggio: instrument !== 'keyboard', instrument, onEnd: () => setPlaying(false) })
  }

  return (
    <div className="neg">
      <p className="neg-label">{t('Scegli la tonica')}</p>
      <div className="neg-tonics" role="group" aria-label={t('Tonica')}>
        {TONICS.map(([n, pc]) => (
          <button key={n} type="button" className={`neg-tonic${tonic === pc ? ' is-on' : ''}`} aria-pressed={tonic === pc} onClick={() => { stopPlaying(); setPlaying(false); setTonic(pc) }}>
            {nn(n)}
          </button>
        ))}
      </div>

      <svg className="neg-svg" viewBox="0 0 320 320" role="group" aria-label={t('Specchio intorno all’asse di {tonic}', { tonic: nn(names[tonic]) })}>
        <line x1={ax1} y1={ay1} x2={ax2} y2={ay2} className="neg-axis" />
        <text x={ax1} y={ay1 + 4} textAnchor="middle" className="neg-axis-t">{t('asse')}</text>
        <text x={ax2} y={ay2 + 4} textAnchor="middle" className="neg-axis-t">{t('asse')}</text>
        {PAIRS.map(([a, b], p) => {
          const [x1, y1] = pos(a)
          const [x2, y2] = pos(b)
          return <line key={p} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS[p]} strokeWidth={p === pair ? 5 : 2.5} opacity={p === pair ? 1 : 0.4} strokeLinecap="round" />
        })}
        {Array.from({ length: 12 }, (_, i) => {
          const [x, y] = pos(i)
          const p = pairOf(i)
          const on = p === pair
          return (
            <g key={i} onClick={() => choosePair(p)} style={{ cursor: 'pointer' }} role="button" tabIndex={0} aria-label={t('{i}, grado {i2}, si specchia in {i3}', { i: name(i), i2: DEG[i], i3: name(PAIRS[p].find((x) => x !== i)) })} aria-pressed={on} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && choosePair(p)} opacity={on ? 1 : 0.55}>
              <circle cx={x} cy={y} r="22" fill={COLORS[p]} stroke={i === 0 ? '#f5f3ff' : '#1b1428'} strokeWidth={i === 0 ? 3.5 : 2} />
              <text x={x} y={y - 1} textAnchor="middle" className="neg-note">{name(i)}</text>
              <text x={x} y={y + 11} textAnchor="middle" className="neg-deg">{DEG[i]}</text>
            </g>
          )
        })}
      </svg>
      <p className="neg-axis-info">
        {t('Asse: tra {a} e {b} (e dalla parte opposta, tra {c} e {d}). La forma non cambia mai: con ogni tonica cambiano solo i nomi.', { a: name(3), b: name(4), c: name(9), d: name(10) })}
      </p>

      <div className="neg-pairs" role="list" aria-label={t('Le sei coppie')}>
        {PAIRS.map(([a, b], p) => (
          <button key={p} type="button" role="listitem" className={`neg-pair${p === pair ? ' is-on' : ''}`} aria-pressed={p === pair} onClick={() => choosePair(p)}>
            <span className="neg-dot" style={{ background: COLORS[p] }} />
            <b>{name(a)} ↔ {name(b)}</b>
            <i>{DEG[a]} ↔ {DEG[b]}</i>
          </button>
        ))}
      </div>
      <button type="button" className="btn btn-secondary lesson-listen" onClick={listen}>
        {playing ? t('Ferma') : t('Ascolta {a} e {b}', { a: name(sel[0]), b: name(sel[1]) })}
      </button>
    </div>
  )
}
