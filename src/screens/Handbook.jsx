import star from '../assets/icons/icn_stella.svg'
import lock from '../assets/icons/icn_lucchetto.svg'
import { HANDBOOK } from '../data/handbook'
import { chapterStatus } from '../lib/progress'

function Chevron() {
  return (
    <svg className="hb-chevron" viewBox="0 0 14 24" aria-hidden="true">
      <path
        d="M2 2 L12 12 L2 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Handbook({ completed, onOpen }) {
  return (
    <section className="handbook" aria-label="Prontuario">
      {HANDBOOK.map((entry) => {
        // la voce è disponibile quando il suo capitolo è completato o è quello attuale
        const unlocked = chapterStatus(entry.chapter, completed) !== 'locked'
        return (
          <button
            key={entry.id}
            type="button"
            className={`hb-card${unlocked ? '' : ' is-locked'}`}
            disabled={!unlocked}
            aria-label={unlocked ? entry.title : `${entry.title}, bloccato: si sblocca con il capitolo ${entry.chapter}`}
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
    </section>
  )
}
