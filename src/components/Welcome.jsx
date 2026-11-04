import Logo from './Logo'
import pollyUrl from '../images/polly-intro.webp'

export default function Welcome({ onStart }) {
  return (
    <main className="welcome">
      <Logo />

      <p className="intro">
        <span className="intro-q">Pensi che la musica sia solo questione di orecchio?</span>
        <span className="intro-no">NO!</span>
        <span className="intro-a">C’è un intero universo</span>
        <span className="intro-a">da scoprire dietro ogni nota.</span>
        <span className="intro-sig">Io sono Polly </span>
        <span className="intro-sig2">e ti porto ad esplorarlo!</span>
      </p>

      <img
        className="polly-hero"
        src={pollyUrl}
        alt="Polly, il bassotto viola con macchie nere, seduta sorridente tra due onde sonore dorate"
        width="840"
        height="716"
      />

      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={onStart}>
          Inizia
        </button>
        <button type="button" className="btn btn-secondary" disabled title="Disponibile presto">
          Ho già un account
        </button>
      </div>
    </main>
  )
}
