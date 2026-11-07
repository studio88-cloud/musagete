import percorsoOn from '../assets/icons/nav_percorso_active.svg'
import percorsoOff from '../assets/icons/nav_percorso_normal.svg'
import prontuarioOn from '../assets/icons/nav_prontuario_active.svg'
import prontuarioOff from '../assets/icons/nav_prontuario_normal.svg'
import strumentoOn from '../assets/icons/nav_strumento_active.svg'
import strumentoOff from '../assets/icons/nav_strumento_normal.svg'
import profiloOn from '../assets/icons/nav_profilo_active.svg'
import profiloOff from '../assets/icons/nav_profilo_normal.svg'

const TABS = [
  { id: 'path', label: 'Percorso', on: percorsoOn, off: percorsoOff },
  { id: 'handbook', label: 'Prontuario', on: prontuarioOn, off: prontuarioOff },
  { id: 'tool', label: 'Strumento', on: strumentoOn, off: strumentoOff },
  { id: 'profile', label: 'Profilo', on: profiloOn, off: profiloOff },
]

export default function TabBar({ active, onChange }) {
  return (
    <nav className="tabbar" aria-label="Navigazione principale">
      {TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`tab${t.id === active ? ' is-active' : ''}`}
          aria-current={t.id === active ? 'page' : undefined}
          onClick={() => onChange(t.id)}
        >
          <img className="tab-icon" src={t.id === active ? t.on : t.off} alt="" />
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
