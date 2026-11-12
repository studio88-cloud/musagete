import { useEffect, useRef, useState } from 'react'
import ExitDialog from '../components/ExitDialog'
import iconCheck from '../assets/icons/icn_spunta.svg'
import iconX from '../assets/icons/icn_X.svg'
import iconAccuracy from '../assets/icons/icn_accuracy.svg'
import iconTime from '../assets/icons/icn_time.svg'
import iconXp from '../assets/icons/icn_xp.svg'
import pollyWave from '../images/polly-wave.webp'
import pollySad from '../images/polly-sad.webp'
import pollyCelebrate from '../images/polly-celebrate.webp'
import { quizFor } from '../data/quizzes'
import { playNotes, stopPlaying } from '../lib/audio'

const XP_PER_ANSWER = 10

function BackArrow() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 4l-8 8 8 8" />
    </svg>
  )
}

function CloseX() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  )
}

const fmtTime = (s) => `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`

function Results({ step, data, result, onRetry, onDone }) {
  const pct = Math.round((result.correct / result.total) * 100)
  const passed = result.passed
  const isQuiz = data.kind === 'quiz'
  const title = passed ? (isQuiz ? 'Quiz superato!' : 'Esercizio completato!') : 'Non ancora!'
  const sub = passed
    ? `Hai risposto correttamente a ${result.correct} domande su ${result.total}.`
    : `Servono almeno ${Math.round(data.passMark * 100)}% di risposte giuste. Ripassa le lezioni e riprova.`
  return (
    <section className="lesson" aria-label="Risultato">
      <header className="steps-head">
        <button type="button" className="steps-icbtn" aria-label="Chiudi" onClick={() => onDone(passed)}>
          <CloseX />
        </button>
        <div className="steps-titlebox">
          <h1 className="steps-title">{`${step.id ? `${step.id}. ` : ''}${step.title}`}</h1>
        </div>
      </header>
      <article className="lesson-card res">
        <h2 className="lesson-h res-h">{title}</h2>
        <p className="res-sub">{sub}</p>
        <dl className="res-stats">
          <div>
            <img src={iconAccuracy} alt="" height="46" />
            <dt>Precisione</dt>
            <dd>{pct}%</dd>
          </div>
          <div>
            <img src={iconTime} alt="" height="46" />
            <dt>Tempo</dt>
            <dd>{fmtTime(result.seconds)}</dd>
          </div>
          <div>
            <img src={iconXp} alt="" height="46" />
            <dt>XP</dt>
            <dd>{`+${result.xp}`}</dd>
          </div>
        </dl>
        <img className="res-polly" src={passed ? pollyCelebrate : pollySad} alt="" />
        {passed ? (
          <button type="button" className="btn btn-primary" onClick={() => onDone(true)}>
            Torna ai passi del capitolo
          </button>
        ) : (
          <>
            <button type="button" className="btn btn-primary" onClick={onRetry}>
              Riprova il quiz
            </button>
            <button type="button" className="btn btn-secondary res-second" onClick={() => onDone(false)}>
              Torna ai passi del capitolo
            </button>
          </>
        )}
      </article>
    </section>
  )
}

export default function Quiz({ chapter, step, data: dataProp, skipResults = false, onAnswer, onDone, onExit, instrument = 'keyboard' }) {
  const data = dataProp || quizFor(chapter, step.id)
  const total = data.questions.length
  const [i, setI] = useState(0)
  const [sel, setSel] = useState(null)
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [askExit, setAskExit] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState(null)
  const startRef = useRef(Date.now())
  const sheetBtn = useRef(null)
  const q = data.questions[i]
  const ok = checked && sel === q.answer

  useEffect(() => () => stopPlaying(), [])
  useEffect(() => {
    if (checked) sheetBtn.current?.focus()
  }, [checked])

  const listen = () => {
    if (playing) {
      stopPlaying()
      setPlaying(false)
      return
    }
    setPlaying(true)
    const shift = instrument === 'bass' ? -12 : 0
    const src = Array.isArray(q.play[0]) ? q.play.map((c) => c.map((m) => m + shift)) : q.play.map((m) => m + shift)
    playNotes(src, { kind: q.kind || 'scale', arpeggio: instrument !== 'keyboard', onEnd: () => setPlaying(false) })
  }

  const check = () => {
    stopPlaying()
    setPlaying(false)
    setChecked(true)
    onAnswer?.(sel === q.answer)
    if (sel === q.answer) setCorrect((c) => c + 1)
  }

  const next = () => {
    if (i + 1 < total) {
      setI(i + 1)
      setSel(null)
      setChecked(false)
      window.scrollTo({ top: 0 })
      return
    }
    const seconds = Math.round((Date.now() - startRef.current) / 1000)
    const score = correct / total
    if (skipResults) {
      onDone(data.passMark ? score >= data.passMark : true)
      return
    }
    setResult({
      correct,
      total,
      seconds,
      xp: correct * XP_PER_ANSWER,
      passed: data.passMark ? score >= data.passMark : true,
    })
  }

  const retry = () => {
    setI(0)
    setSel(null)
    setChecked(false)
    setCorrect(0)
    setResult(null)
    startRef.current = Date.now()
  }

  if (result) return <Results step={step} data={data} result={result} onRetry={retry} onDone={onDone} />

  const feedback = ok
    ? `Esatto! ${q.explanation}`
    : `Purtroppo no. La risposta giusta è: ${q.options[q.answer]}. ${(q.hints && q.hints[sel]) || q.explanation}`

  return (
    <section className="lesson" aria-label={`${step.id ? `${step.id}. ` : ''}${step.title}`}>
      <header className="steps-head">
        <button type="button" className="steps-icbtn" aria-label="Esci" onClick={() => setAskExit(true)}>
          <BackArrow />
        </button>
        <div className="steps-titlebox">
          <h1 className="steps-title">{`${step.id ? `${step.id}. ` : ''}${step.title}`}</h1>
          <div className="steps-progress">
            <span className="steps-count">{`Domanda ${i + 1} di ${total}`}</span>
            <div className="steps-bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={i + 1} aria-label="Avanzamento">
              <div className="steps-bar-fill" style={{ width: `${((i + 1) / total) * 100}%` }} />
            </div>
          </div>
        </div>
      </header>

      <article className="lesson-card">
        <h2 className="quiz-q">{q.prompt}</h2>
        {q.play && (
          <button type="button" className="btn btn-secondary quiz-listen" onClick={listen}>
            {playing ? 'Ferma' : 'Ascolta'}
          </button>
        )}
        <div className="opts" role="radiogroup" aria-label="Risposte">
          {q.options.map((text, k) => {
            const isRight = checked && k === q.answer
            const isWrong = checked && k === sel && k !== q.answer
            return (
              <button
                key={text}
                type="button"
                role="radio"
                aria-checked={sel === k}
                className={`opt${sel === k ? ' is-sel' : ''}${isRight ? ' is-right' : ''}${isWrong ? ' is-wrong' : ''}${checked && !isRight && !isWrong ? ' is-dim' : ''}`}
                disabled={checked}
                onClick={() => setSel(k)}
              >
                <span>{text}</span>
                {isRight && <img src={iconCheck} alt="Giusta" width="34" height="34" />}
                {isWrong && <img src={iconX} alt="Sbagliata" width="30" height="30" />}
                {!checked && sel === k && <span className="opt-dot" aria-hidden="true" />}
              </button>
            )
          })}
        </div>
        <button type="button" className="btn btn-primary quiz-check" disabled={sel === null || checked} onClick={check}>
          Verifica
        </button>
      </article>

      {checked && (
        <>
          <div className="sheet-backdrop" />
          <div className={`sheet ${ok ? 'is-ok' : 'is-bad'}`} role="status" aria-live="polite">
            <div className="sheet-row">
              <img src={ok ? pollyWave : pollySad} alt="" />
              <p className="sheet-bubble">{feedback}</p>
            </div>
            <button ref={sheetBtn} type="button" className="btn btn-primary" onClick={next}>
              {i + 1 < total ? 'Continua' : 'Vedi il risultato'}
            </button>
          </div>
        </>
      )}

      {askExit && <ExitDialog onStay={() => setAskExit(false)} onLeave={onExit} />}
    </section>
  )
}
