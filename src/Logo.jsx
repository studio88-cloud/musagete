export default function Logo({ className = '' }) {
  return (
    <img
      className={`logo-img ${className}`.trim()}
      src="/logo.webp"
      alt="Musagete"
      width="800"
      height="500"
    />
  )
}
