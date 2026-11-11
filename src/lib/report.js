// Segnalazione di un problema: apre la posta con un messaggio già compilato.
// ⚠️ Sostituisci l'indirizzo con quello che riceverà le segnalazioni.
export const REPORT_EMAIL = 'tua-email@esempio.it'
export const APP_VERSION = 'beta 1'

export function buildReport(context) {
  const lines = [
    'Descrivi qui il problema:',
    '',
    '',
    '',
    '— Non cancellare le righe qui sotto: ci aiutano a capire cosa è successo —',
    `App: Musagete ${APP_VERSION}`,
  ]
  if (context) lines.push(`Dove: ${context}`)
  lines.push(
    `Dispositivo: ${navigator.userAgent}`,
    `Schermo: ${window.innerWidth}×${window.innerHeight}`,
    `Lingua: ${navigator.language}`,
  )
  const subject = `Segnalazione Musagete${context ? ` – ${context}` : ''}`
  const body = lines.join('\n')
  return {
    subject,
    href: `mailto:${REPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  }
}
