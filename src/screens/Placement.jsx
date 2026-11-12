import pollyStand from '../images/polly-stand.webp'

// Domanda iniziale: fare il test di due domande o saltare "Prima di partire"
export default function Placement({ onTest, onSkip }) {
  return (
    <section className="place" aria-label="Domanda iniziale">
      <div className="place-hero">
        <p className="place-bubble">Ti faccio due domande veloci</p>
        <img className="place-polly" src={pollyStand} alt="Polly, il bassotto viola, in piedi che sorride" />
      </div>
      <h1 className="place-title">Sai già leggere la musica?</h1>
      <p className="place-text">
        Se conosci pentagramma, note e ritmo puoi saltare “Prima di partire” e iniziare subito. Altrimenti ti
        accompagno io: bastano circa 20 minuti.
      </p>
      <button type="button" className="btn btn-primary" onClick={onTest}>
        Fai il test
      </button>
      <button type="button" className="btn btn-secondary place-skip" onClick={onSkip}>
        Salta
      </button>
    </section>
  )
}
