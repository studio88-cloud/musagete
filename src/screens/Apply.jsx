import { useEffect, useRef, useState } from 'react'
import ExitDialog from '../components/ExitDialog'
import BuildInstrument from '../components/BuildInstrument'
import ReadStaff from '../components/ReadStaff'
import { Results } from './Quiz'
import { applyFor, midiOfStep } from '../data/apply'
import { playNotes, stopPlaying, instrumentShift } from '../lib/audio'
import { loc, t, tr } from '../lib/i18n'

const XP_PER_ANSWER = 10

function BackArrow() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 4l-8 8 8 8" />
    </svg>
  )
}
const joinIt = (a) => (a.length > 1 ? t('{list} e {last}', { list: a.slice(0, -1).join(', '), last: a[a.length - 1] }) : a[0])
const shiftFor = instrumentShift

// Modello C · Applica (provvisorio): C1 percorri una progressione, C2 armonizza una melodia
export default function Apply({ chapter, step, instrument = 'keyboard', onAnswer, onDone, onExit }) {
  const list = loc(applyFor(chapter))
  const [n, setN] = useState(0) // esercizio
  const [c, setC] = useState(0) // accordo corrente (C1)
  const [selected, setSelected] = useState([])
  const [result, setResult] = useState(null)
  const [choices, setChoices] = useState([]) // C2: scelta per battuta
  const [done, setDone] = useState([]) // C1: esito per accordo (true/false)
  const [attempted, setAttempted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [askExit, setAskExit] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [total, setTotal] = useState(0)
  const [final, setFinal] = useState(null)
  const startRef = useRef(Date.now())
  const btnRef = useRef(null)
  const q = list[n]
  const shift = shiftFor(instrument)

  useEffect(() => () => stopPlaying(), [])
  useEffect(() => {
    if (result) btnRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [result])
  useEffect(() => {
    setSelected([])
    setResult(null)
  }, [instrument])

  const finish = (corr, tot) => {
    const seconds = Math.round((Date.now() - startRef.current) / 1000)
    setFinal({
      correct: corr,
      total: tot,
      seconds,
      xp: corr * XP_PER_ANSWER,
      passed: true,
      sub: q.kind === 'harm' ? t('Hai scelto l’accordo giusto in {corr} battute su {tot}.', { corr, tot }) : q.scale ? t('Hai suonato subito la scala giusta in {corr} casi su {tot}.', { corr, tot }) : t('Hai suonato subito l’accordo giusto in {corr} casi su {tot}.', { corr, tot }),
    })
  }
  const nextExercise = (corr, tot) => {
    if (n + 1 < list.length) {
      setN(n + 1)
      setC(0)
      setSelected([])
      setResult(null)
      setChoices([])
      setDone([])
      setAttempted(false)
      window.scrollTo({ top: 0 })
    } else finish(corr, tot)
  }

  const listen = (chords, asScale = false) => {
    if (playing) {
      stopPlaying()
      setPlaying(false)
      return
    }
    setPlaying(true)
    if (asScale) {
      const m = chords[0].map((x) => x + shift)
      playNotes([...m, m[0] + 12], { kind: 'scale', arpeggio: instrument !== 'keyboard', instrument, onEnd: () => setPlaying(false) })
      return
    }
    playNotes(chords.map((m) => m.map((x) => x + shift)), { kind: 'progression', arpeggio: instrument !== 'keyboard', instrument, onEnd: () => setPlaying(false) })
  }

  const header = (progress, label) => (
    <header className="steps-head">
      <button type="button" className="steps-icbtn" aria-label={t('Esci')} onClick={() => setAskExit(true)}>
        <BackArrow />
      </button>
      <div className="steps-titlebox">
        <h1 className="steps-title">{`${step.id}. ${step.title}`}</h1>
        <div className="steps-progress">
          <span className="steps-count">{label}</span>
          <div className="steps-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label={t('Avanzamento')}>
            <div className="steps-bar-fill" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </header>
  )

  if (final) return <Results step={step} data={{ kind: 'ear', passMark: 0 }} result={final} onRetry={() => {}} onDone={onDone} />

  // ——— C1: progressione
  if (q.kind === 'prog') {
    const ch = q.chords[c]
    const need = ch.expected.length
    const pcs = new Set(selected.map((s) => s.midi % 12))
    const ready = pcs.size === need && !result
    const last = c + 1 >= q.chords.length

    const tap = (item) => {
      if (result) return
      playNotes([item.midi], { kind: 'note', instrument })
      setSelected((cur) => (cur.some((s) => s.id === item.id) ? cur.filter((s) => s.id !== item.id) : [...cur, item]))
    }
    const check = () => {
      stopPlaying()
      const exp = new Set(ch.expected.map((e) => e.pc))
      const wrong = new Set(selected.filter((s) => !exp.has(s.midi % 12)).map((s) => s.id))
      const missing = new Set([...exp].filter((pc) => !pcs.has(pc)))
      let bassOk = true
      if (ch.bassPc !== null && wrong.size === 0 && missing.size === 0) {
        const lowest = selected.reduce((a, b) => (b.midi < a.midi ? b : a))
        if (lowest.midi % 12 !== ch.bassPc) {
          bassOk = false
          wrong.add(lowest.id)
        }
      }
      const ok = wrong.size === 0 && missing.size === 0 && bassOk
      setResult({ expected: ch.expected, wrong, missing, ok, bassOk })
      if (!attempted) {
        setAttempted(true)
        onAnswer?.(ok)
        setTotal((t) => t + 1)
        if (ok) setCorrect((x) => x + 1)
        setDone((d) => {
          const nd = [...d]
          nd[c] = ok
          return nd
        })
      }
    }
    const retry = () => {
      setSelected([])
      setResult(null)
    }
    const next = () => {
      if (last) return nextExercise(correct, total)
      setC(c + 1)
      setSelected([])
      setResult(null)
      setAttempted(false)
    }
    const detail = joinIt(ch.expected.map((e) => `${q.scale ? t('grado {label}', { label: e.label }) : tr(e.role)} (${e.name})`))
    const fb = result?.ok
      ? t('Ottimo! {name}: {detail}.{v}', { name: ch.name, detail, v: ch.why ? ` ${ch.why}` : '' })
      : result && !result.bassOk
        ? t('Le note ci sono, ma la più bassa deve essere {name}.', { name: ch.expected.find((e) => e.pc === ch.bassPc).name })
        : result
          ? t('Non proprio. {name}: {detail}.{v}', { name: ch.name, detail, v: ch.why ? ` ${ch.why}` : '' })
          : ''

    return (
      <section className="lesson" aria-label={`${step.id}. ${step.title}`}>
        {header((c + (result ? 1 : 0)) / q.chords.length, t('{kind} {n} di {total}', { kind: q.scale ? t('Scala') : t('Accordo'), n: c + 1, total: q.chords.length }))}
        <article className="lesson-card bld apl">
          <h2 className="bld-q">{q.prompt}</h2>

          <div className="apl-row" role="list" aria-label={q.scale ? t('Scale') : t('Progressione')}>
            {q.chords.map((x, k) => {
              const st = k < c || (k === c && result?.ok) ? (done[k] === false ? 'miss' : 'done') : k === c ? 'now' : 'todo'
              return (
                <span key={k} className={`apl-chip is-${st}`} role="listitem" aria-current={k === c ? 'step' : undefined} aria-label={x.fn ? t('{sym}, {fn} grado', { sym: x.sym, fn: x.fn }) : x.sym}>
                  {x.sym}
                </span>
              )
            })}
          </div>

          <div className="bld-panel">
            <BuildInstrument instrument={instrument} selected={selected} onTap={tap} result={result} helpPc={null} />
          </div>

          <div className="apl-meta">
            <div className="apl-count">
              <span className="apl-pill" aria-live="polite">{t('{size}/{need} Note', { size: pcs.size, need })}</span>
              <span className="apl-hint">{t('Tocca {need} note', { need })}</span>
            </div>
            <button type="button" className="apl-btn" onClick={() => { stopPlaying(); setSelected([]); setResult(null) }} disabled={selected.length === 0}>{t('Azzera')}
            </button>
            <button type="button" className="apl-btn" onClick={() => (q.scale ? listen([ch.midis], true) : listen(q.chords.map((x) => x.midis)))}>
              {playing ? t('Ferma') : t('Ascolta')}
            </button>
          </div>

          {result && (
            <div className={`bld-fb ${result.ok ? 'is-ok' : 'is-bad'}`} role="status" aria-live="polite">
              {fb}
            </div>
          )}

          {!result ? (
            <button type="button" className="btn btn-primary quiz-check" disabled={!ready} onClick={check}>{t('Verifica')}
            </button>
          ) : result.ok ? (
            <button ref={btnRef} type="button" className="btn btn-primary quiz-check" onClick={next}>
              {last ? t('Vedi il risultato') : q.scale ? t('Scala successiva') : t('Accordo successivo')}
            </button>
          ) : (
            <div className="sheet-btns bld-btns">
              <button ref={btnRef} type="button" className="btn btn-primary" onClick={retry}>{t('Riprova')}
              </button>
              <button type="button" className="btn btn-secondary" onClick={next}>
                {last ? t('Vedi il risultato') : t('Continua')}
              </button>
            </div>
          )}
        </article>
        {askExit && <ExitDialog onStay={() => setAskExit(false)} onLeave={onExit} />}
      </section>
    )
  }

  // ——— C2: armonizza una melodia
  const bars = q.answer.length
  const full = choices.length === bars && choices.every((x) => x != null)
  const pick = (bar, k) => {
    if (result) return
    setChoices((cur) => {
      const nc = Array.from({ length: bars }, (_, i) => cur[i] ?? null)
      nc[bar] = k
      return nc
    })
    playNotes(q.options[k].midis.map((m) => m + shift), { kind: 'chord', arpeggio: instrument !== 'keyboard', instrument })
  }
  const check = () => {
    stopPlaying()
    const res = q.answer.map((a, i) => choices[i] === a)
    setResult({ per: res, ok: res.every(Boolean) })
    const corr = res.filter(Boolean).length
    res.forEach((r) => onAnswer?.(r))
    setCorrect(corr)
    setTotal(bars)
  }
  const listenMelody = () => {
    if (playing) {
      stopPlaying()
      setPlaying(false)
      return
    }
    setPlaying(true)
    const notes = q.melody.map((m) => midiOfStep(m.step) + shift)
    playNotes(notes, {
      kind: 'scale',
      instrument,
      onEnd: () => {
        const chosen = choices.map((k) => (k == null ? null : q.options[k].midis)).filter(Boolean)
        if (chosen.length === 0) return setPlaying(false)
        playNotes(chosen.map((m) => m.map((x) => x + shift)), { kind: 'progression', arpeggio: instrument !== 'keyboard', instrument, onEnd: () => setPlaying(false) })
      },
    })
  }
  const fb = result
    ? result.ok
      ? t('Ottimo! {v}', { v: q.why.join(' ') })
      : t('Non proprio. {v}', { v: q.answer.map((a, i) => t('Battuta {n}: {name}. {why}', { n: i + 1, name: q.options[a].name, why: q.why[i] })).join(' ') })
    : ''

  return (
    <section className="lesson" aria-label={`${step.id}. ${step.title}`}>
      {header(result ? 1 : choices.filter((x) => x != null).length / bars, t('{bars} battute', { bars }))}
      <article className="lesson-card bld apl">
        <h2 className="bld-q">{q.prompt}</h2>
        <ReadStaff items={q.melody} label={t('Melodia: {v}', { v: q.melody.map((m) => m.label).join(', ') })} />
        <div className="apl-bars">
          {q.answer.map((_, bar) => (
            <div key={bar} className="apl-bar">
              <span className="apl-barlbl">{t('Battuta {v} · {label}, {label2}', { v: bar + 1, label: q.melody[bar * 2].label, label2: q.melody[bar * 2 + 1].label })}</span>
              <div className="apl-opts" role="radiogroup" aria-label={t('Accordo per la battuta {n}', { n: bar + 1 })}>
                {q.options.map((o, k) => {
                  const on = choices[bar] === k
                  const st = result ? (on ? (result.per[bar] ? ' is-ok' : ' is-bad') : q.answer[bar] === k && !result.per[bar] ? ' is-want' : '') : on ? ' is-on' : ''
                  return (
                    <button key={k} type="button" role="radio" aria-checked={on} className={`apl-opt${st}`} onClick={() => pick(bar, k)}>
                      <b>{o.fn}</b>
                      <i>{o.sym}</i>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="bld-tools">
          <button type="button" className="bld-link" onClick={listenMelody} disabled={choices.every((x) => x == null)}>
            {playing ? t('Ferma') : t('Ascolta')}
          </button>
          <button type="button" className="bld-link" onClick={() => { stopPlaying(); setChoices([]); setResult(null) }} disabled={choices.length === 0 || Boolean(result)}>{t('Azzera')}
          </button>
        </div>

        {result && (
          <div className={`bld-fb ${result.ok ? 'is-ok' : 'is-bad'}`} role="status" aria-live="polite">
            {fb}
          </div>
        )}

        {!result ? (
          <button type="button" className="btn btn-primary quiz-check" disabled={!full} onClick={check}>{t('Verifica')}
          </button>
        ) : (
          <button ref={btnRef} type="button" className="btn btn-primary quiz-check" onClick={() => nextExercise(correct, total)}>{t('Vedi il risultato')}
          </button>
        )}
      </article>
      {askExit && <ExitDialog onStay={() => setAskExit(false)} onLeave={onExit} />}
    </section>
  )
}
