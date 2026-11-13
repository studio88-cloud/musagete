import { useEffect, useState } from 'react'
import ExitDialog from '../components/ExitDialog'
import Fretboard from '../components/Fretboard'
import LessonKeys from '../components/LessonKeys'
import ReadStaff from '../components/ReadStaff'
import pollyImg from '../images/polly-sit.webp'
import { IT_NAMES, highlightMap } from '../lib/music'
import { lessonFor } from '../data/lessons'
import { playNotes, stopPlaying, instrumentShift } from '../lib/audio'
import { splitLines } from '../lib/text'

function BackArrow() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 4l-8 8 8 8" />
    </svg>
  )
}

export default function Lesson({ chapter, step, instrument = 'keyboard', onFinish, onExit }) {
  const lesson = lessonFor(chapter, step.id)
  const [i, setI] = useState(0)
  const [askExit, setAskExit] = useState(false)
  const [playing, setPlaying] = useState(false)
  const page = lesson.pages[i]
  const total = lesson.pages.length
  const last = i === total - 1
  const highlights = highlightMap(page.notes || [], (pc) => IT_NAMES[[0, 2, 4, 5, 7, 9, 11].indexOf(pc)] ?? '')


  useEffect(() => () => stopPlaying(), [])
  useEffect(() => {
    stopPlaying()
    setPlaying(false)
    window.scrollTo({ top: 0 })
  }, [i])

  const listen = () => {
    if (playing) {
      stopPlaying()
      setPlaying(false)
      return
    }
    setPlaying(true)
    const shift = instrumentShift(instrument)
    const src = page.play || page.notes.map((n) => n.midi)
    if (page.pairs) {
      // due esempi di fila (es. Mi–Fa e poi Si–Do), con una pausa in mezzo
      const seq = page.pairs.flatMap((p, k) => (k ? [null, ...p.map((m) => m + shift)] : p.map((m) => m + shift)))
      playNotes(seq, { kind: 'scale', arpeggio: instrument !== 'keyboard', instrument, onEnd: () => setPlaying(false) })
      return
    }
    if (page.progression) {
      playNotes(src.map((c) => c.map((m) => m + shift)), { kind: 'progression', arpeggio: instrument !== 'keyboard' && !page.form, weights: page.weights, instrument, onEnd: () => setPlaying(false) })
    } else {
      const midis = src.map((m) => m + shift).sort((a, b) => a - b)
      playNotes(midis, { kind: page.chord ? 'chord' : 'scale', arpeggio: instrument !== 'keyboard', instrument, onEnd: () => setPlaying(false) })
    }
  }

  return (
    <section className="lesson" aria-label={`${step.id}. ${step.title}`}>
      <header className="steps-head">
        <button type="button" className="steps-icbtn" aria-label="Esci dalla lezione" onClick={() => setAskExit(true)}>
          <BackArrow />
        </button>
        <div className="steps-titlebox">
          <h1 className="steps-title">{`${step.id}. ${step.title}`}</h1>
          <div className="steps-progress">
            <span className="steps-count">{`Passo ${i + 1} di ${total}`}</span>
            <div className="steps-bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={i + 1} aria-label="Avanzamento della lezione">
              <div className="steps-bar-fill" style={{ width: `${((i + 1) / total) * 100}%` }} />
            </div>
          </div>
        </div>
      </header>

      <article className="lesson-card">
        <h2 className="lesson-h">{page.heading}</h2>
        <p className="lesson-body">{page.body}</p>

        <div className="lesson-remember">
          <strong>Da ricordare</strong>
          {splitLines(page.remember).map((l) => (
            <span key={l} className={`lr-line${l.includes("|") ? " is-bars" : ""}`}>{l}</span>
          ))}
        </div>

        {page.chords && (
          <div className="lchords" role="list" aria-label="Accordi della progressione">
            {page.chords.map((c, k) => (
              <span key={k} className="lchord" role="listitem">
                {c.fn && c.fn !== c.sym && <b>{c.fn}</b>}
                <i>{c.sym}</i>
              </span>
            ))}
          </div>
        )}
        {page.staff && (
          <>
            <h3 className="lesson-sub">Sul pentagramma</h3>
            <ReadStaff items={page.staff.items} timeSig={page.staff.timeSig} endBar={page.staff.endBar} label={`Pentagramma: ${page.staff.items.map((n) => n.label).join(', ')}`} />
          </>
        )}
        {!page.staff && page.notes && page.notes.length > 0 && (
          <>
            <h3 className="lesson-sub">{instrument === 'keyboard' ? 'Sulla tastiera' : 'Sul manico'}</h3>
            {instrument === 'keyboard' ? (
              <LessonKeys notes={page.notes} base={page.base} />
            ) : (
              <Fretboard instrument={instrument} highlights={highlights} mode="degrees" firstPosition />
            )}
          </>
        )}
        {(page.play || (page.notes && page.notes.length > 0)) && (
          <button type="button" className="btn btn-secondary lesson-listen" onClick={listen}>
            {playing ? 'Ferma' : 'Ascolta'}
          </button>
        )}

        <div className="lesson-polly">
          <img src={pollyImg} alt="" />
          <p>{page.polly}</p>
        </div>
      </article>

      <div className="lesson-foot">
        <button type="button" className="btn btn-primary" onClick={() => (last ? onFinish() : setI(i + 1))}>
          {last ? 'Ho finito la lezione' : 'Ho capito, procedi'}
        </button>
      </div>

      {askExit && <ExitDialog onStay={() => setAskExit(false)} onLeave={onExit} />}
    </section>
  )
}
