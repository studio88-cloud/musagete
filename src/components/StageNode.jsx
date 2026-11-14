import bloccata from '../assets/icons/tappa_stato_bloccata.svg'
import completata from '../assets/icons/tappa_completata_anello.svg'
import attuale from '../assets/icons/tappa_attuale_progress.svg'
import zaino from '../assets/icons/tappa_speciale_zaino.svg'
import pollyThink from '../images/polly-think.webp'
import pollyThinkSx from '../images/polly-think-sx.webp' // versione per le tappe a sinistra (disegnata a specchio, con la chiave dritta)
import { t, tr } from '../lib/i18n'

const RING_RADIUS = 53
const RING_LENGTH = 2 * Math.PI * RING_RADIUS

const STATUS_TEXT = { done: 'completato', current: 'in corso', locked: 'bloccato', intro: 'facoltativo' }

// kind: 'intro' | 'chapter'; status: 'done' | 'current' | 'locked'; progress: 0-1
export default function StageNode({ kind, number, title, status, progress = 0, left, top, onOpen }) {
  const isIntro = kind === 'intro'
  const state = isIntro ? 'intro' : status
  const label = number ? `${number} ${title}` : title
  const locked = state === 'locked'

  return (
    <div className="stage" style={{ left: `${left}%`, top }}>
      <button
        type="button"
        className={`stage-btn is-${state}`}
        disabled={locked}
        onClick={onOpen}
        aria-label={`${label}, ${tr(STATUS_TEXT[state])}`}
      >
        {state === 'locked' && <img className="stage-img" src={bloccata} alt="" />}
        {state === 'done' && <img className="stage-img" src={completata} alt="" />}
        {state === 'intro' && <img className="stage-img" src={zaino} alt="" />}
        {state === 'current' && (
          <>
            <img className="stage-disc" src={attuale} alt="" />
            <svg className="stage-ring" viewBox="0 0 144 144" aria-hidden="true">
              {progress > 0 && (
                <circle
                  className="ring-bar"
                  cx="72"
                  cy="72"
                  r={RING_RADIUS}
                  strokeDasharray={`${RING_LENGTH * progress} ${RING_LENGTH}`}
                />
              )}
            </svg>
            <span className="stage-num">{number}</span>
            <img
              className={`stage-polly${left < 50 ? ' is-right' : ''}`}
              src={left < 50 ? pollyThinkSx : pollyThink}
              alt=""
              width="200"
              height="171"
            />
          </>
        )}
      </button>
      <p className={`stage-title is-${state}`}>{label}</p>
      {isIntro && <span className="stage-tag">{t('Facoltativo')}</span>}
    </div>
  )
}
