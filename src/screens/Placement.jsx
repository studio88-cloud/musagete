import pollyStand from '../images/polly-stand.webp'
import { t } from '../lib/i18n'

// Domanda iniziale: fare il test di due domande o saltare "Prima di partire"
export default function Placement({ onTest, onSkip }) {
  return (
    <section className="place" aria-label={t('Domanda iniziale')}>
      <div className="place-hero">
        <p className="place-bubble">{t('Ti faccio due domande veloci')}</p>
        <img className="place-polly" src={pollyStand} alt={t('Polly, il bassotto viola, in piedi che sorride')} />
      </div>
      <h1 className="place-title">{t('Sai già leggere la musica?')}</h1>
      <p className="place-text">{t('Se conosci pentagramma, note e ritmo puoi saltare “Prima di partire” e iniziare subito. Altrimenti ti accompagno io: bastano circa 20 minuti.')}
      </p>
      <button type="button" className="btn btn-primary" onClick={onTest}>{t('Fai il test')}
      </button>
      <button type="button" className="btn btn-secondary place-skip" onClick={onSkip}>{t('Salta')}
      </button>
    </section>
  )
}
