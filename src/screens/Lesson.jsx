import { useEffect, useState } from 'react'
import ExitDialog from '../components/ExitDialog'
import Fretboard from '../components/Fretboard'
import LessonKeys from '../components/LessonKeys'
import pollyImg from '../images/polly-sit.webp'
import { IT_NAMES } from '../lib/music'
import { lessonFor } from '../data/lessons'
import { playNotes, stopPlaying } from '../lib/audio'

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
  const highlights = new Map(
    page.notes.map((n) => [n.midi % 12, { deg: n.deg, label: n.label, name: IT_NAMES[[0, 2, 4, 5, 7, 9, 11].indexOf(n.midi % 12)] ?? '' }]),
  )

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
    const shift = instrument === 'bass' ? -12 : 0 // il basso suona un'ottava sotto
    const midis = page.notes.map((n) => n.midi + shift).sort((a, b) => a - b)
    playNotes(midis, { kind: 'scale', onEnd: () => setPlaying(false) })
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
          <span>{page.remember}</span>
        </div>

        {page.notes.length > 0 && (
          <>
            <h3 className="lesson-sub">{instrument === 'keyboard' ? 'Sulla tastiera' : 'Sul manico'}</h3>
            {instrument === 'keyboard' ? (
              <LessonKeys notes={page.notes} base={page.base} />
            ) : (
              <Fretboard instrument={instrument} highlights={highlights} mode="degrees" />
            )}
            <button type="button" className="btn btn-secondary lesson-listen" onClick={listen}>
              {playing ? 'Ferma' : 'Ascolta'}
            </button>
          </>
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
