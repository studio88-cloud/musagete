import star from '../assets/icons/icn_stella.svg'
import lock from '../assets/icons/icn_lucchetto.svg'
import { HANDBOOK } from '../data/handbook'
import { CHAPTERS } from '../data/chapters'
import { chapterStatus } from '../lib/progress'
import { loc, t, tr } from '../lib/i18n'

function Chevron() {
  return (
    <svg className="hb-chevron" viewBox="0 0 14 24" aria-hidden="true">
      <path d="M2 2 L12 12 L2 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Handbook({ completed, onOpen }) {
  // le voci sono raggruppate per capitolo, nell'ordine dei capitoli
  const groups = loc(CHAPTERS).map((c) => ({ c, items: loc(HANDBOOK).filter((e) => e.chapter === c.n) })).filter((g) => g.items.length)
  return (
    <section className="handbook" aria-label={t('Prontuario')}>
      {groups.map(({ c, items }) => (
        <div key={c.n} className="hb-group">
          <h2 className="hb-chap">{c.n}. {c.title}</h2>
          {items.map((entry) => {
            // la voce è disponibile quando il suo capitolo è completato o è quello attuale
            const unlocked = chapterStatus(entry.chapter, completed) !== 'locked'
            return (
              <button
                key={entry.id}
                type="button"
                className={`hb-card${unlocked ? '' : ' is-locked'}`}
                disabled={!unlocked}
                aria-label={unlocked ? entry.title : t('{title}, bloccato: si sblocca con il capitolo {chapter}', { title: entry.title, chapter: entry.chapter })}
                onClick={() => onOpen(entry)}
              >
                <img className="hb-star" src={unlocked ? star : lock} alt="" />
                <span className="hb-text">
                  <span className="hb-title">{entry.title}</span>
                  <span className="hb-sub">{entry.subtitle}</span>
                </span>
                <Chevron />
              </button>
            )
          })}
        </div>
      ))}
    </section>
  )
}
