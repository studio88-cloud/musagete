import { useState } from 'react'
import star from '../assets/icons/icn_stella.svg'
import check from '../assets/icons/icn_spunta.svg'
import backpack from '../assets/icons/icn_zaino.svg'
import avatar from '../assets/icons/icn_profilo.svg'
import { CHAPTERS } from '../data/chapters'
import { HANDBOOK } from '../data/handbook'
import { chapterStatus, firstOpen } from '../lib/progress'
import ReportButton from '../components/ReportButton'

const NAME_KEY = 'musagete:name'
const DEFAULT_NAME = 'Allievo'

function loadName() {
  try {
    return localStorage.getItem(NAME_KEY) || DEFAULT_NAME
  } catch {
    return DEFAULT_NAME
  }
}

export default function Profile({ completed, intro, onCompleteNext, onToggleIntro, onReset }) {
  const [name, setName] = useState(loadName)
  const [editing, setEditing] = useState(false)

  const saveName = (value) => {
    const clean = value.trim().slice(0, 24) || DEFAULT_NAME
    setName(clean)
    setEditing(false)
    try {
      localStorage.setItem(NAME_KEY, clean)
    } catch {
      // ignorato: il nome vale solo per questa sessione
    }
  }

  const current = firstOpen(completed)
  const currentTitle = CHAPTERS.find((c) => c.n === current)?.title
  const unlockedChapters = completed.length + (current ? 1 : 0)
  const unlockedHandbook = HANDBOOK.filter(
    (e) => chapterStatus(e.chapter, completed) !== 'locked',
  ).length

  return (
    <section className="profile">
      <img className="avatar" src={avatar} alt="Avatar" width="98" height="98" />

      {editing ? (
        <input
          className="pf-name-input"
          autoFocus
          defaultValue={name}
          maxLength={24}
          aria-label="Il tuo nome"
          onBlur={(e) => saveName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur()
          }}
        />
      ) : (
        <button type="button" className="pf-name" onClick={() => setEditing(true)} title="Tocca per modificare">
          {name}
        </button>
      )}

      <p className="pf-level">
        {current ? `Sei al capitolo ${current}` : 'Hai completato tutti i capitoli'}
        {currentTitle && <span>{currentTitle}</span>}
      </p>

      <div className="pf-stats">
        <div className="pf-stat">
          <img src={star} alt="" />
          <div className="pf-stat-text">
            <span className="pf-stat-value">
              {unlockedHandbook} / {HANDBOOK.length}
            </span>
            <span className="pf-stat-label">Voci del Prontuario</span>
          </div>
        </div>
        <div className="pf-stat">
          <img src={check} alt="" />
          <div className="pf-stat-text">
            <span className="pf-stat-value">
              {unlockedChapters} / {CHAPTERS.length}
            </span>
            <span className="pf-stat-label">Capitoli sbloccati</span>
          </div>
        </div>
      </div>

      <div className={`pf-intro${intro ? '' : ' is-pending'}`}>
        <img src={backpack} alt="" />
        <div>
          <span className="pf-intro-title">
            {intro ? 'Prima di partire completato' : 'Prima di partire'}
          </span>
          <span className="pf-intro-sub">
            {intro ? 'Hai completato il modulo facoltativo' : 'Modulo facoltativo, ancora da fare'}
          </span>
        </div>
      </div>

      <div className="pf-help">
        <ReportButton context="Profilo" />
      </div>

      <div className="pf-beta">
        <p className="muted">Strumenti di prova (solo beta). Tocca il nome per cambiarlo.</p>
        <div className="stub-actions">
          <button type="button" className="btn btn-primary" onClick={onCompleteNext}>
            Completa il prossimo capitolo
          </button>
          <button type="button" className="btn btn-secondary" onClick={onToggleIntro}>
            {intro ? 'Segna "Prima di partire" da fare' : 'Segna "Prima di partire" completato'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onReset}>
            Azzera i progressi
          </button>
        </div>
      </div>
    </section>
  )
}
