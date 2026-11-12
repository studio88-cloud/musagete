import { useState } from 'react'
import backpack from '../assets/icons/icn_zaino.svg'
import avatarImg from '../images/polly-sit.webp'
import xpIcon from '../assets/icons/icn_xp.svg'
import timeIcon from '../assets/icons/icn_time.svg'
import accIcon from '../assets/icons/icn_accuracy.svg'
import { formatAccuracy, formatTime, formatXp } from '../lib/stats'
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

export default function Profile({ completed, intro, stats, onCompleteNext, onToggleIntro, onReset }) {
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
      <span className="avatar">
        <img src={avatarImg} alt="Avatar di Polly" />
      </span>

      {editing ? (
        <>
          <input
            className="pf-name-input"
            autoFocus
            defaultValue={name}
            maxLength={24}
            enterKeyHint="done"
            aria-label="Il tuo nome"
            onBlur={(e) => saveName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur()
            }}
          />
          <p className="pf-name-hint">Massimo 24 caratteri. Premi Invio per salvare.</p>
        </>
      ) : (
        <button type="button" className="pf-name" onClick={() => setEditing(true)} title="Tocca per modificare">
          {name}
        </button>
      )}

      <p className="pf-level">
        {current ? `Sei al capitolo ${current}` : 'Hai completato tutti i capitoli'}
        {currentTitle && <span>{currentTitle}</span>}
      </p>

      <div className="pf-study">
        <div className="pf-stat">
          <img src={accIcon} alt="" />
          <span className="pf-stat-value is-ok">{formatAccuracy(stats)}</span>
          <span className="pf-stat-label">Precisione</span>
        </div>
        <div className="pf-stat">
          <img src={timeIcon} alt="" />
          <span className="pf-stat-value is-time">{formatTime(stats.seconds)}</span>
          <span className="pf-stat-label">Tempo</span>
        </div>
        <div className="pf-stat">
          <img src={xpIcon} alt="" />
          <span className="pf-stat-value is-xp">{formatXp(stats.xp)}</span>
          <span className="pf-stat-label">XP</span>
        </div>
      </div>

      {stats.answered === 0 && <p className="pf-hint">Fai il tuo primo quiz e qui compariranno i tuoi progressi</p>}

      <div className="pf-mini">
        <div className="pf-mini-card">
          <span className="pf-mini-label">Voci Prontuario</span>
          <span className="pf-mini-value">
            {unlockedHandbook} / {HANDBOOK.length}
          </span>
        </div>
        <div className="pf-mini-card">
          <span className="pf-mini-label">Capitoli sbloccati</span>
          <span className="pf-mini-value">
            {unlockedChapters} / {CHAPTERS.length}
          </span>
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
