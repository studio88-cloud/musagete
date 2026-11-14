import percorsoOn from '../assets/icons/nav_percorso_active.svg'
import percorsoOff from '../assets/icons/nav_percorso_normal.svg'
import prontuarioOn from '../assets/icons/nav_prontuario_active.svg'
import prontuarioOff from '../assets/icons/nav_prontuario_normal.svg'
import strumentoOn from '../assets/icons/nav_strumento_active.svg'
import strumentoOff from '../assets/icons/nav_strumento_normal.svg'
import profiloOn from '../assets/icons/nav_profilo_active.svg'
import profiloOff from '../assets/icons/nav_profilo_normal.svg'
import { t, tc } from '../lib/i18n'

const TABS = [
  { id: 'path', label: 'Percorso', on: percorsoOn, off: percorsoOff },
  { id: 'handbook', label: 'Prontuario', on: prontuarioOn, off: prontuarioOff },
  { id: 'tool', label: 'Strumento', on: strumentoOn, off: strumentoOff },
  { id: 'profile', label: 'Profilo', on: profiloOn, off: profiloOff },
]

export default function TabBar({ active, onChange }) {
  return (
    <nav className="tabbar" aria-label={t('Navigazione principale')}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`tab${tab.id === active ? ' is-active' : ''}`}
          aria-current={tab.id === active ? 'page' : undefined}
          onClick={() => onChange(tab.id)}
        >
          <img className="tab-icon" src={tab.id === active ? tab.on : tab.off} alt="" />
          <span>{tc('tab', tab.label)}</span>
        </button>
      ))}
    </nav>
  )
}
