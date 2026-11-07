// Schermata provvisoria per le parti ancora da costruire
export default function Stub({ title, text, onBack, children }) {
  return (
    <section className="stub">
      <div className="card">
        <h2>{title}</h2>
        <p>{text}</p>
        {children}
        {onBack && (
          <button type="button" className="btn btn-secondary stub-back" onClick={onBack}>
            Indietro
          </button>
        )}
      </div>
    </section>
  )
}
