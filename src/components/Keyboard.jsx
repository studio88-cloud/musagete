import { useCallback, useEffect, useRef } from 'react'
import { BLACK_H, BLACK_W, KEYS, TOTAL_W, WHITE_H, WHITE_W } from '../lib/keys'
import { DEGREE_COLORS } from '../lib/music'

function Dot({ note, mode }) {
  const c = DEGREE_COLORS[note.deg]
  return (
    <span className={`dot${mode === 'notes' ? ' is-notes' : ''}`} style={{ background: c.bg, color: c.ink }}>
      {mode === 'notes' ? note.name : note.label}
    </span>
  )
}

// highlights: Map pitch class -> nota; mode: 'degrees' | 'notes'
// scrollReq: { x, n, smooth } per spostare la tastiera da fuori
export default function Keyboard({ highlights, mode, scrollReq, onView }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el) el.scrollTo({ left: scrollReq.x, behavior: scrollReq.smooth ? 'smooth' : 'auto' })
  }, [scrollReq])

  const report = useCallback(() => {
    const el = ref.current
    if (el) onView({ x: el.scrollLeft, w: el.clientWidth, total: el.scrollWidth })
  }, [onView])

  useEffect(() => {
    report()
    window.addEventListener('resize', report)
    return () => window.removeEventListener('resize', report)
  }, [report])

  return (
    <div className="kb-scroll" ref={ref} onScroll={report}>
      <div className="kb" style={{ width: TOTAL_W, height: WHITE_H + 24 }}>
        {KEYS.filter((k) => k.midi % 12 === 0).map((k) => (
          <span key={`l${k.midi}`} className="kb-label" style={{ left: k.x + 4 }}>
            Do{Math.floor(k.midi / 12) - 1}
          </span>
        ))}
        {KEYS.filter((k) => k.white).map((k) => {
          const note = highlights.get(k.midi % 12)
          return (
            <div
              key={k.midi}
              className={`key white${note ? ' is-on' : ''}`}
              style={{ left: k.x, width: WHITE_W, height: WHITE_H }}
            >
              {note && <Dot note={note} mode={mode} />}
            </div>
          )
        })}
        {KEYS.filter((k) => !k.white).map((k) => {
          const note = highlights.get(k.midi % 12)
          return (
            <div
              key={k.midi}
              className={`key black${note ? ' is-on' : ''}`}
              style={{ left: k.x, width: BLACK_W, height: BLACK_H }}
            >
              {note && <Dot note={note} mode={mode} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
