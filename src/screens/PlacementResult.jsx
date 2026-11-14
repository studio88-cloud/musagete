import pollyWave from '../images/polly-wave.webp'
import pollyThink from '../images/polly-think.webp'
import { t } from '../lib/i18n'

// Esito del test iniziale: superato (si salta "Prima di partire") o non superato (si parte dal ripasso)
export default function PlacementResult({ passed, onContinue }) {
  return (
    <section className="pres" aria-label={t('Esito del test iniziale')}>
      <div className="pres-card">
        <h1 className="pres-title">{passed ? t('Ottimo, sai già leggere!') : t('Facciamo un ripasso')}</h1>
        <p className="pres-text">
          {passed ? (
            <>
              {t('Hai completato il test iniziale.')}
              <br />
              {t('Il capitolo “Prima di partire” è stato saltato.')}
            </>
          ) : (
            <>{t('Bastano 3 lezioni brevi per metterti in pari e affrontare tutto senza problemi.')}
            </>
          )}
        </p>
        <img
          className="pres-polly"
          src={passed ? pollyWave : pollyThink}
          alt={passed ? t('Polly, il bassotto viola, che saluta') : t('Polly, il bassotto viola, pensierosa')}
        />
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          {passed ? t('Vai al Percorso') : t('Inizia')}
        </button>
      </div>
    </section>
  )
}
