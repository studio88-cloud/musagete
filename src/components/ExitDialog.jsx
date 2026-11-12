import { useEffect, useRef } from 'react'
import iconWarn from '../assets/icons/icn_avviso.svg'

// Finestra di conferma all'uscita da una lezione o da un esercizio.
// Il tocco fuori dalla finestra e il tasto Esc equivalgono a "Continua".
export default function ExitDialog({ onStay, onLeave }) {
  const stayRef = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    stayRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onStay()
      if (e.key === 'Tab') {
        // il focus resta dentro la finestra
        const items = [...document.querySelectorAll('.dlg button')]
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [onStay])

  return (
    <div className="dlg-backdrop" onClick={onStay}>
      <div
        className="dlg"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dlg-title"
        aria-describedby="dlg-text"
        onClick={(e) => e.stopPropagation()}
      >
        <img className="dlg-icon" src={iconWarn} alt="" width="52" height="52" />
        <h2 id="dlg-title" className="dlg-title">Vuoi davvero uscire?</h2>
        <p id="dlg-text" className="dlg-text">
          I progressi di questa sessione non verranno salvati se esci ora.
        </p>
        <button ref={stayRef} type="button" className="btn btn-primary" onClick={onStay}>
          Continua la lezione
        </button>
        <button type="button" className="btn btn-secondary dlg-leave" onClick={onLeave}>
          Esci e perdi i progressi
        </button>
      </div>
    </div>
  )
}
