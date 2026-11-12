import pollyWave from '../images/polly-wave.webp'
import pollyThink from '../images/polly-think.webp'

// Esito del test iniziale: superato (si salta "Prima di partire") o non superato (si parte dal ripasso)
export default function PlacementResult({ passed, onContinue }) {
  return (
    <section className="pres" aria-label="Esito del test iniziale">
      <div className="pres-card">
        <h1 className="pres-title">{passed ? 'Ottimo, sai già leggere!' : 'Facciamo un ripasso'}</h1>
        <p className="pres-text">
          {passed ? (
            <>
              Hai completato il test iniziale.
              <br />
              Il capitolo “Prima di partire” è stato saltato.
            </>
          ) : (
            <>
              Bastano 3 lezioni brevi per metterti in pari e affrontare tutto senza problemi.
            </>
          )}
        </p>
        <img
          className="pres-polly"
          src={passed ? pollyWave : pollyThink}
          alt={passed ? 'Polly, il bassotto viola, che saluta' : 'Polly, il bassotto viola, pensierosa'}
        />
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          {passed ? 'Vai al Percorso' : 'Inizia'}
        </button>
      </div>
    </section>
  )
}
