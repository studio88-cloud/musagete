import { useState } from 'react'
import { buildReport, REPORT_EMAIL } from '../lib/report'
import { t } from '../lib/i18n'

// variant: 'button' (pulsante) oppure 'link' (testo piccolo)
export default function ReportButton({ context, variant = 'button' }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const report = open ? buildReport(context) : null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(REPORT_EMAIL)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }
  const close = () => {
    setOpen(false)
    setCopied(false)
  }

  return (
    <>
      <button
        type="button"
        className={variant === 'link' ? 'report-link' : 'btn btn-secondary'}
        onClick={() => setOpen(true)}
      >{t('Segnala un problema')}
      </button>
      {open && (
        <div className="sheet-scrim" onClick={close}>
          <div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={t('Segnala un problema')}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{t('Segnala un problema')}</h2>
            <p>{t('Si aprirà la tua app di posta con un messaggio già compilato: scrivi cosa non va e invialo.')}
            </p>
            <a className="btn btn-primary" href={report.href}>{t('Apri la posta')}
            </a>
            <p className="sheet-note">
              {t('Se non si apre, scrivi a')} <strong>{REPORT_EMAIL}</strong>
            </p>
            <button type="button" className="btn btn-secondary" onClick={copy}>
              {copied ? t('Indirizzo copiato') : t('Copia indirizzo')}
            </button>
            <button type="button" className="sheet-close" onClick={close}>{t('Chiudi')}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
