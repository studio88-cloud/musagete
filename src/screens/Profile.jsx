import { CHAPTERS } from '../data/chapters'
import Stub from './Stub'

export default function Profile({ completed, onCompleteNext, onReset }) {
  return (
    <Stub title="Profilo" text="In costruzione.">
      <p className="muted">
        Capitoli completati: {completed.length} / {CHAPTERS.length}
      </p>
      <p className="muted">Strumenti di prova (solo beta)</p>
      <div className="stub-actions">
        <button type="button" className="btn btn-primary" onClick={onCompleteNext}>
          Completa il prossimo capitolo
        </button>
        <button type="button" className="btn btn-secondary" onClick={onReset}>
          Azzera i progressi
        </button>
      </div>
    </Stub>
  )
}
