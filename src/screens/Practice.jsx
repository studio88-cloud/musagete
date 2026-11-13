import { useEffect, useState } from 'react'
import { Example } from './HandbookEntry'
import { practiceFor } from '../data/practice'
import { CHAPTERS } from '../data/chapters'

const KEY = 'musagete:practice'
const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}
const save = (v) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(v))
  } catch {
    /* senza memoria locale la spunta resta solo per questa visita */
  }
}

// "In pratica": cosa suonare, come esercitarsi, errori comuni e obiettivi di un capitolo.
export default function Practice({ chapter, instrument = 'keyboard', onExit }) {
  const data = practiceFor(chapter)
  const title = CHAPTERS.find((c) => c.n === chapter)?.title ?? ''
  const [checked, setChecked] = useState(() => load()[chapter] ?? [])
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])
  if (!data) return null

  const toggle = (i) => {
    const next = checked.includes(i) ? checked.filter((x) => x !== i) : [...checked, i]
    setChecked(next)
    save({ ...load(), [chapter]: next })
  }
  const tip = (t) => (t ? t[instrument] ?? t.all : null)

  return (
    <section className="hbe prac">
      <button type="button" className="ic-back" onClick={onExit}>
        ‹ Capitolo {chapter}
      </button>
      <h2 className="ic-title">In pratica</h2>
      <p className="hbe-sub">{`Capitolo ${chapter} · ${title}`}</p>

      <article className="lesson-card">
        <p className="lesson-body">{data.intro}</p>

        <h3 className="prac-h">Suona</h3>
        {data.play.map((p) => (
          <div key={p.title} className="prac-item">
            <h4 className="prac-t">{p.title}</h4>
            <p className="lesson-body">{p.text}</p>
            {tip(p.tips) && <p className="prac-tip">{tip(p.tips)}</p>}
            {p.example && <Example ex={p.example} instrument={instrument} />}
          </div>
        ))}

        <h3 className="prac-h">{data.phrase.title}</h3>
        <p className="lesson-body">{data.phrase.text}</p>
        <Example ex={data.phrase.example} instrument={instrument} />

        <h3 className="prac-h">Come esercitarsi</h3>
        <ol className="prac-list">
          {data.how.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>

        <h3 className="prac-h">Errori comuni</h3>
        <ul className="hbe-points">
          {data.mistakes.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <h3 className="prac-h">I tuoi obiettivi</h3>
        <p className="prac-note">Spunta quello che ti riesce. Resta salvato su questo dispositivo.</p>
        <ul className="prac-goals">
          {data.goals.map((g, i) => (
            <li key={g}>
              <label>
                <input type="checkbox" checked={checked.includes(i)} onChange={() => toggle(i)} />
                <span>{g}</span>
              </label>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}
