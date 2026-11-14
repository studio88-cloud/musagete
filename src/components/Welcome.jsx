import Logo from './Logo'
import pollyUrl from '../images/polly-intro.webp'
import { t } from '../lib/i18n'

export default function Welcome({ onStart }) {
  return (
    <main className="welcome">
      <Logo />

      <p className="intro">
        <span className="intro-q">{t('Pensi che la musica sia solo questione di orecchio?')}</span>
        <span className="intro-no">{t('No!')}</span>
        <span className="intro-a">{t('C’è un intero universo da scoprire dietro ogni nota.')}</span>
        <span className="intro-sig">{t('Io sono Polly e ti porto ad esplorarlo!')}</span>
      </p>

      <img
        className="polly-hero"
        src={pollyUrl}
        alt={t('Polly, il bassotto viola con macchie nere, seduta sorridente tra due onde sonore dorate')}
        width="840"
        height="716"
      />

      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={onStart}>{t('Inizia')}
        </button>
        <button type="button" className="btn btn-secondary" disabled title={t('Disponibile presto')}>{t('Ho già un account')}
        </button>
      </div>
    </main>
  )
}
