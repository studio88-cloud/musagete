import { useEffect, useRef, useState } from 'react'
import ExitDialog from '../components/ExitDialog'
import BuildInstrument from '../components/BuildInstrument'
import { Results } from './Quiz'
import { buildFor } from '../data/build'
import { playNotes, stopPlaying } from '../lib/audio'
import { loc, t, tr } from '../lib/i18n'

const XP_PER_ANSWER = 10

function BackArrow() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 4l-8 8 8 8" />
    </svg>
  )
}

// Modello A · Costruisci: l'utente tocca le note sullo strumento
export default function Build({ chapter, step, instrument = 'keyboard', onAnswer, onDone, onExit }) {
  const list = loc(buildFor(chapter))
  const total = list.length
  const [i, setI] = useState(0)
  const [selected, setSelected] = useState([]) // [{ id, midi }]
  const [result, setResult] = useState(null) // dopo "Verifica"
  const [help, setHelp] = useState(false)
  const [askExit, setAskExit] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [attempted, setAttempted] = useState(false) // ha già risposto a questo esercizio?
  const [final, setFinal] = useState(null)
  const startRef = useRef(Date.now())
  const sheetBtn = useRef(null)
  const fbRef = useRef(null)
  const q = list[i]

  const need = q.expected.length
  const pcs = new Set(selected.map((s) => s.midi % 12))
  const count = pcs.size
  const over = count > need
  const ready = count === need && !result

  useEffect(() => () => stopPlaying(), [])
  useEffect(() => {
    if (result) (sheetBtn.current || fbRef.current)?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [result])
  // se cambia lo strumento a metà esercizio si riparte da zero
  useEffect(() => {
    setSelected([])
    setResult(null)
    setHelp(false)
  }, [instrument])

  const tap = (item) => {
    if (result) return
    playNotes([item.midi], { kind: 'note', instrument })
    setSelected((cur) => (cur.some((s) => s.id === item.id) ? cur.filter((s) => s.id !== item.id) : [...cur, item]))
  }

  const reset = () => {
    stopPlaying()
    setSelected([])
    setResult(null)
    setHelp(false)
  }

  const check = () => {
    stopPlaying()
    const expectedPcs = new Set(q.expected.map((e) => e.pc))
    const wrong = new Set(selected.filter((s) => !expectedPcs.has(s.midi % 12)).map((s) => s.id))
    const missing = new Set([...expectedPcs].filter((pc) => !pcs.has(pc)))
    let bassOk = true
    if (q.bassPc !== null && wrong.size === 0 && missing.size === 0) {
      const lowest = selected.reduce((a, b) => (b.midi < a.midi ? b : a))
      if (lowest.midi % 12 !== q.bassPc) {
        bassOk = false
        wrong.add(lowest.id)
      }
    }
    const ok = wrong.size === 0 && missing.size === 0 && bassOk
    setResult({ expected: q.expected, wrong, missing, ok, bassOk })
    if (!attempted) {
      setAttempted(true)
      onAnswer?.(ok)
      if (ok) setCorrect((c) => c + 1)
    }
  }

  const retry = () => {
    setSelected([])
    setResult(null)
    setHelp(false)
  }

  const next = () => {
    if (i + 1 < total) {
      setI(i + 1)
      setSelected([])
      setResult(null)
      setHelp(false)
      setAttempted(false)
      window.scrollTo({ top: 0 })
      return
    }
    const seconds = Math.round((Date.now() - startRef.current) / 1000)
    setFinal({
      correct,
      total,
      seconds,
      xp: correct * XP_PER_ANSWER,
      passed: true,
      sub: t('Hai trovato subito le note giuste in {correct} esercizi su {total}.', { correct, total }),
    })
  }

  if (final) {
    return <Results step={step} data={{ kind: 'ear', passMark: 0 }} result={final} onRetry={() => {}} onDone={onDone} />
  }

  const names = q.expected.map((e) => e.name).join(', ')
  // fino a 5 note si dice il ruolo di ciascuna (fondamentale, terza…), per le scale si elencano i nomi
  const joinIt = (a) => (a.length > 1 ? t('{list} e {last}', { list: a.slice(0, -1).join(', '), last: a[a.length - 1] }) : a[0])
  const detail = q.expected.length <= 5 ? joinIt(q.expected.map((e) => `${tr(e.role)} (${e.name})`)) : names
  const feedback = result?.ok
    ? t('Ottimo! {name}: {detail}.{v}', { name: q.name, detail, v: q.why ? ` ${q.why}` : '' })
    : result && !result.bassOk
      ? t('Le note ci sono, ma il basso non è giusto: la nota più bassa deve essere {name}.', { name: q.expected.find((e) => e.pc === q.bassPc).name })
      : result
        ? t('Non proprio. {name}: {detail}.{v}', { name: q.name, detail, v: q.why ? ` ${q.why}` : '' })
        : ''
  const helpPc = help && !result ? q.expected[0].pc : null

  return (
    <section className="lesson" aria-label={`${step.id}. ${step.title}`}>
      <header className="steps-head">
        <button type="button" className="steps-icbtn" aria-label={t('Esci')} onClick={() => setAskExit(true)}>
          <BackArrow />
        </button>
        <div className="steps-titlebox">
          <h1 className="steps-title">{`${step.id}. ${step.title}`}</h1>
          <div className="steps-progress">
            <span className="steps-count">{t('Esercizio {n} di {total}', { n: i + 1, total })}</span>
            <div className="steps-bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={i + 1} aria-label={t('Avanzamento')}>
              <div className="steps-bar-fill" style={{ width: `${((i + 1) / total) * 100}%` }} />
            </div>
          </div>
        </div>
      </header>

      <article className="lesson-card bld">
        <h2 className="bld-q">{q.prompt}</h2>
        <p className="bld-sub">{need === 1 ? t('Tocca {need} nota', { need }) : t('Tocca {need} note', { need })}</p>
        <p className={`bld-count${over ? ' is-over' : ''}`} aria-live="polite">{t('{count}/{need} Note', { count, need })}</p>

        <div className="bld-panel">
          <BuildInstrument instrument={instrument} selected={selected} onTap={tap} result={result} helpPc={helpPc} />
        </div>

        <div className="bld-tools">
          <button type="button" className="bld-link" onClick={reset} disabled={selected.length === 0}>{t('Azzera')}
          </button>
          <button type="button" className="bld-link" onClick={() => setHelp(true)} disabled={help || Boolean(result)}>{t('Aiuto')}
          </button>
        </div>

        {help && !result && <p className="bld-help" role="status">{t('Aiuto: parti da {name}{v}.', { name: q.expected[0].name, v: q.expected[0].role ? t(', la {role}', { role: tr(q.expected[0].role) }) : '' })}</p>}

        {result && (
          <div ref={fbRef} className={`bld-fb ${result.ok ? 'is-ok' : 'is-bad'}`} role="status" aria-live="polite">
            {feedback}
          </div>
        )}

        {!result ? (
          <button type="button" className="btn btn-primary quiz-check" disabled={!ready} onClick={check}>{t('Verifica')}
          </button>
        ) : result.ok ? (
          <button ref={sheetBtn} type="button" className="btn btn-primary quiz-check" onClick={next}>
            {i + 1 < total ? t('Continua') : t('Vedi il risultato')}
          </button>
        ) : (
          <div className="sheet-btns bld-btns">
            <button ref={sheetBtn} type="button" className="btn btn-primary" onClick={retry}>{t('Riprova')}
            </button>
            <button type="button" className="btn btn-secondary" onClick={next}>
              {i + 1 < total ? t('Continua') : t('Vedi il risultato')}
            </button>
          </div>
        )}
      </article>

      {askExit && <ExitDialog onStay={() => setAskExit(false)} onLeave={onExit} />}
    </section>
  )
}
