import { LANGUAGES, NOTE_STYLES } from '../lib/lang'
import { INSTRUMENTS } from '../components/InstrumentMenu'

const NOTE_LABELS = { auto: 'Automatico', solfege: 'Do Re Mi', letters: 'C D E' }

function Choice({ label, value, options, onChange }) {
  return (
    <div className="set-row" role="radiogroup" aria-label={label}>
      <h2 className="set-label">{label}</h2>
      <div className="set-opts">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={value === o.id}
            disabled={o.disabled}
            lang={o.lang}
            className={`set-opt${value === o.id ? ' is-on' : ''}`}
            onClick={() => onChange(o.id)}
          >
            {o.label}
            {o.disabled && <small>presto</small>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Settings({ lang, onLang, noteStyle, onNoteStyle, notes, instrument, onInstrument, onBack }) {
  return (
    <section className="settings">
      <button type="button" className="btn btn-secondary" onClick={onBack}>
        ‹ Indietro
      </button>
      <h1 className="set-title">Impostazioni</h1>

      <Choice
        label="Lingua"
        value={lang}
        onChange={onLang}
        options={LANGUAGES.map((l) => ({ id: l.id, label: l.label, lang: l.id, disabled: !l.ready }))}
      />

      <Choice
        label="Nomi delle note"
        value={noteStyle}
        onChange={onNoteStyle}
        options={NOTE_STYLES.map((s) => ({ id: s, label: NOTE_LABELS[s] }))}
      />
      <p className="set-hint">
        {noteStyle === 'auto'
          ? `Con questa lingua si usa ${notes === 'solfege' ? 'il solfeggio (Do Re Mi)' : 'le lettere (C D E)'}.`
          : 'Gli accordi restano sempre in lettere (C, Dm, G7).'}
      </p>

      <Choice
        label="Strumento"
        value={instrument}
        onChange={onInstrument}
        options={INSTRUMENTS.map((i) => ({ id: i.id, label: i.label }))}
      />
    </section>
  )
}
