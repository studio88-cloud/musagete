import Logo from '../components/Logo'
import { LANGUAGES } from '../lib/lang'

// Primo avvio: scelta della lingua. I nomi sono scritti nella lingua stessa, così si riconoscono sempre.
export default function LanguagePicker({ current, onPick }) {
  return (
    <main className="welcome lang-pick">
      <Logo />
      <h1 className="lang-title" lang="en">
        Choose your language
      </h1>
      <ul className="lang-list" role="radiogroup" aria-label="Language">
        {LANGUAGES.map((l) => (
          <li key={l.id}>
            <button
              type="button"
              role="radio"
              aria-checked={current === l.id}
              disabled={!l.ready}
              className={`lang-opt${current === l.id ? ' is-on' : ''}`}
              lang={l.id}
              onClick={() => onPick(l.id)}
            >
              <span>{l.label}</span>
              {!l.ready && <small>Soon</small>}
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
