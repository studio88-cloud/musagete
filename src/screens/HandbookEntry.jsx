import { useEffect, useState } from 'react'
import Fretboard from '../components/Fretboard'
import LessonKeys from '../components/LessonKeys'
import CircleOfFifths from '../components/CircleOfFifths'
import NegativeAxis from '../components/NegativeAxis'
import { IT_NAMES, highlightMap } from '../lib/music'
import { playNotes, stopPlaying, instrumentShift } from '../lib/audio'
import { splitLines } from '../lib/text'
import { CHAPTERS } from '../data/chapters'

const WHITE = [0, 2, 4, 5, 7, 9, 11]

// Porta nel campo della tastiera di un'ottava le note che ne escono (es. la 9ª)
function fold(notes, base) {
  // gli accordi con estensioni (9, 11, 13) restano un'ottava sopra: la tastiera si allarga, non si ripiega
  if (notes.some((n) => /(9|11|13)$/.test(n.label))) return notes
  const seen = new Set()
  return notes
    .map((n) => (n.midi > base + 12 ? { ...n, midi: n.midi - 12 * Math.ceil((n.midi - base - 12) / 12) } : n))
    .filter((n) => (seen.has(n.midi) ? false : seen.add(n.midi)))
}

export function Example({ ex, instrument }) {
  const [playing, setPlaying] = useState(false)
  useEffect(() => () => stopPlaying(), [])
  const base = ex.base ?? 60
  const shown = ex.notes && ex.notes.length ? fold(ex.notes, base) : []
  // le scale si chiudono con la tonica in ottava (un pallino in più, non una nota nuova)
  const isScale = !ex.chord && !ex.progression && !ex.form && !ex.melody && shown.length >= 5 && shown.every((n) => n.midi >= base && n.midi < base + 12)
  const root = shown.find((n) => n.deg === 1)
  const withOct = isScale && root && ex.octaveNote !== false ? [...shown, { ...root, midi: root.midi + 12 }] : shown
  const hl = highlightMap(withOct, (pc) => IT_NAMES[WHITE.indexOf(pc)] ?? '', { octave: ex.octaveNote ?? isScale })

  const listen = () => {
    if (playing) {
      stopPlaying()
      setPlaying(false)
      return
    }
    setPlaying(true)
    const shift = instrumentShift(instrument)
    if (ex.progression) {
      playNotes(ex.play.map((c) => c.map((m) => m + shift)), { kind: 'progression', arpeggio: instrument !== 'keyboard' && !ex.form, weights: ex.weights, instrument, onEnd: () => setPlaying(false) })
    } else {
      const midis = ex.play.map((m) => m + shift)
      if (!ex.melody) midis.sort((a, b) => a - b) // una melodia si suona nell'ordine scritto
      playNotes(midis, { kind: ex.chord ? 'chord' : 'scale', arpeggio: instrument !== 'keyboard', instrument, onEnd: () => setPlaying(false) })
    }
  }

  return (
    <div className="hbe-ex">
      <h3 className="lesson-sub">{ex.label}</h3>
      {ex.rows && (
        <div className="hbe-form" role="list" aria-label="Struttura">
          {ex.rows.map((r, k) => (
            <div key={k} className="hbe-form-row" role="listitem">{r}</div>
          ))}
        </div>
      )}
      {ex.chords && ex.chords.length > 0 && (
        <div className="lchords" role="list" aria-label="Accordi">
          {ex.chords.map((c, k) => (
            <span key={k} className="lchord" role="listitem">
              {c.fn && c.fn !== c.sym && <b>{c.fn}</b>}
              <i>{c.sym}</i>
            </span>
          ))}
        </div>
      )}
      {shown.length > 0 && (instrument === 'keyboard' ? <LessonKeys notes={withOct} base={base} /> : <Fretboard instrument={instrument} highlights={hl} mode="degrees" firstPosition />)}
      <button type="button" className="btn btn-secondary lesson-listen" onClick={listen}>
        {playing ? 'Ferma' : 'Ascolta'}
      </button>
    </div>
  )
}

export default function HandbookEntry({ entry, instrument = 'keyboard', onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [entry.id])
  const chapter = CHAPTERS.find((c) => c.n === entry.chapter)
  return (
    <section className="hbe">
      <button type="button" className="ic-back" onClick={onBack}>
        ‹ Prontuario
      </button>
      <h2 className="ic-title">{entry.title}</h2>
      <p className="hbe-sub">{entry.subtitle}</p>

      <article className="lesson-card">
        <p className="lesson-body">{entry.def}</p>
        {entry.id === 'negmirror' && <NegativeAxis instrument={instrument} />}
        {entry.formula && (
          <div className="lesson-remember">
            <strong>{entry.formulaTable ? entry.formulaTable.title : 'Formula'}</strong>
            {entry.formulaTable ? (
              <>
                {entry.formulaTable.tones ? (
                  <div className="hbe-fns">
                    {entry.formulaTable.rows.map((r, ri) => (
                      <div key={r[0]} className={`hbe-fn is-${entry.formulaTable.tones[ri]}`}>
                        <div className="hbe-fn-head">
                          <b>{r[0]}</b>
                          <i>{r[3]}</i>
                        </div>
                        <div className="hbe-fn-line">
                          <span>{entry.formulaTable.head[1]}</span>
                          <b>{r[1]}</b>
                        </div>
                        <div className="hbe-fn-line">
                          <span>{entry.formulaTable.head[2]}</span>
                          <b>{r[2]}</b>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                <table className="hbe-table">
                  <thead>
                    <tr>
                      {entry.formulaTable.head.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entry.formulaTable.rows.map((r, ri) => (
                      <tr key={r[0]} className={entry.formulaTable.tones ? `hbe-tone is-${entry.formulaTable.tones[ri]}` : undefined}>
                        {r.map((c, k) => (
                          <td key={k}>{c || '–'}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                )}
                {entry.formulaTable.foot && <span className="hbe-table-foot">{entry.formulaTable.foot}</span>}
              </>
            ) : (
              splitLines(entry.formula).map((l) => (
                <span key={l} className={`lr-line${l.includes("|") ? " is-bars" : ""}`}>{l}</span>
              ))
            )}
          </div>
        )}
        {entry.moreTables &&
          entry.moreTables.map((t) => (
            <div key={t.title} className="lesson-remember">
              <strong>{t.title}</strong>
              <table className="hbe-table">
                <thead>
                  <tr>
                    {t.head.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r) => (
                    <tr key={r[0]}>
                      {r.map((c, k) => (
                        <td key={k}>{c || '–'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {t.foot && <span className="hbe-table-foot">{t.foot}</span>}
            </div>
          ))}
        {entry.points.length > 0 && (
          <ul className="hbe-points">
            {entry.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
        {entry.id === 'circle' && <CircleOfFifths />}
        {entry.examples.map((ex) => (
          <Example key={ex.label} ex={ex} instrument={instrument} />
        ))}
        {chapter && <p className="hbe-chapter">Capitolo {chapter.n} · {chapter.title}</p>}
      </article>
    </section>
  )
}
