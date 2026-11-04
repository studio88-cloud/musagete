import logoUrl from '../images/logo.webp'

export default function Logo({ className = '' }) {
  return (
    <img
      className={`logo-img ${className}`.trim()}
      src={logoUrl}
      alt="Musagete"
      width="800"
      height="415"
    />
  )
}
