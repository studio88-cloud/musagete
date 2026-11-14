import logoUrl from '../images/logo.webp'
import { t } from '../lib/i18n'

export default function Logo({ className = '' }) {
  return (
    <img
      className={`logo-img ${className}`.trim()}
      src={logoUrl}
      alt={t('Musagete')}
      width="800"
      height="415"
    />
  )
}
