import iconLock from '../assets/icons/icn_lucchetto.svg'
import iconCheck from '../assets/icons/icn_spunta.svg'
import iconCurrent from '../assets/icons/icn_incorso.svg'
import iconQuiz from '../assets/icons/icn_quiz.svg'
import iconLesson from '../assets/icons/icona_lezione.svg'
import iconEar from '../assets/icons/icona_pratica.svg' // il grafico ha scambiato i nomi: questo file è la nota
import iconBuild from '../assets/icons/icona_esercizio.svg' // e questo è la matita
import iconScore from '../assets/icons/icn_spartito.png'
import { KIND_LABEL, stepsFor } from '../data/steps'
import { buildFor } from '../data/build'
import { applyFor } from '../data/apply'

// ---- icone del grafico (src/assets/icons) ----
const KIND_ICON = {
  lesson: iconLesson,
  ear: iconEar, // "Esercizio": la nota
  build: iconBuild, // "Pratica": la matita
  apply: iconBuild,
  quiz: iconQuiz,
}

function KindIcon({ kind }) {
  return <img src={KIND_ICON[kind]} alt="" width="32" height="32" className="step-kind" />
}

function StateIcon({ done, locked, current }) {
  if (done) return <img src={iconCheck} alt="" width="32" height="32" />
  if (locked) return <img src={iconLock} alt="" width="30" height="30" />
  if (current) return <img src={iconCurrent} alt="" width="32" height="32" />
  return <span className="step-empty" aria-hidden="true" />
}

function BackArrow() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 4l-8 8 8 8" />
    </svg>
  )
}

export default function ChapterSteps({ chapter, title, done, onToggle, onOpenStep, onBack, onOpenHandbook }) {
  const steps = stepsFor(chapter)
  const nonQuiz = steps.filter((s) => s.kind !== 'quiz')
  const quizOpen = nonQuiz.every((s) => done.includes(s.id))
  const current = nonQuiz.find((s) => !done.includes(s.id))?.id

  // Lezioni, esercizi all'orecchio, "Costruisci" e quiz si aprono; le applicazioni, per ora, si segnano fatte toccandole.
  const open = (s) =>
    (['lesson', 'ear', 'build', 'apply', 'quiz'].includes(s.kind) && !(s.kind === 'build' && !buildFor(chapter)) && !(s.kind === 'apply' && !applyFor(chapter))
      ? onOpenStep(s)
      : onToggle(s.id))

  const pct = Math.round((done.length / steps.length) * 100)

  return (
    <section className="steps" aria-label={chapter === 0 ? title : `Capitolo ${chapter}`}>
      <header className="steps-head">
        <button type="button" className="steps-icbtn" aria-label="Indietro" onClick={onBack}>
          <BackArrow />
        </button>
        <div className="steps-titlebox">
          <h1 className="steps-title">{chapter === 0 ? title : `Capitolo ${chapter} · ${title}`}</h1>
          <div className="steps-progress">
            <span className="steps-count">{`${done.length}/${steps.length}`}</span>
            <div
              className="steps-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={steps.length}
              aria-valuenow={done.length}
              aria-label="Passi completati"
            >
              <div className="steps-bar-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
        <button type="button" className="steps-icbtn" aria-label="Apri il prontuario del capitolo" onClick={onOpenHandbook}>
          <img src={iconScore} alt="" height="32" />
        </button>
      </header>

      <ol className="steps-list">
        {steps.map((s) => {
          const isQuiz = s.kind === 'quiz'
          const locked = isQuiz && !quizOpen
          const isDone = done.includes(s.id)
          const state = isDone ? 'fatto' : locked ? 'bloccato' : s.id === current ? 'in corso' : 'da fare'
          return (
            <li key={s.id}>
              <button
                type="button"
                className={`step${isQuiz ? ' is-quiz' : ''}${locked ? ' is-locked' : ''}`}
                disabled={locked}
                aria-label={`${s.id}. ${s.title}, ${KIND_LABEL[s.kind]}, ${s.min} minuti, ${state}`}
                onClick={() => open(s)}
              >
                <span className="step-ico">
                  <KindIcon kind={s.kind} />
                </span>
                <span className="step-text">
                  <span className="step-title">{`${s.id}. ${s.title}`}</span>
                  <span className="step-sub">{`${KIND_LABEL[s.kind]} • ${s.min} min.`}</span>
                  {isQuiz && <span className="step-note">80% per sbloccare il capitolo successivo.</span>}
                </span>
                <span className="step-state">
                  <StateIcon done={isDone} locked={locked} current={s.id === current} />
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
