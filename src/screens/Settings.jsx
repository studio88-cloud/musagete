import { LANGUAGES, NOTE_STYLES } from '../lib/lang'
import { INSTRUMENTS } from '../components/InstrumentMenu'
import { t, tr } from '../lib/i18n'

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
            {o.disabled && <small>{t('presto')}</small>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Settings({ lang, onLang, noteStyle, onNoteStyle, notes, instrument, onInstrument, onBack }) {
  return (
    <section className="settings">
      <button type="button" className="btn btn-secondary" onClick={onBack}>{t('‹ Indietro')}
      </button>
      <h1 className="set-title">{t('Impostazioni')}</h1>

      <Choice
        label={t('Lingua')}
        value={lang}
        onChange={onLang}
        options={LANGUAGES.map((l) => ({ id: l.id, label: l.label, lang: l.id, disabled: !l.ready }))}
      />

      <Choice
        label={t('Nomi delle note')}
        value={noteStyle}
        onChange={onNoteStyle}
        options={NOTE_STYLES.map((s) => ({ id: s, label: s === 'auto' ? t('Automatico') : NOTE_LABELS[s] }))}
      />
      <p className="set-hint">
        {noteStyle === 'auto'
          ? t('Con questa lingua si usa {v}.', { v: notes === 'solfege' ? t('il solfeggio (Do Re Mi)') : t('le lettere (C D E)') })
          : t('Gli accordi restano sempre in lettere (C, Dm, G7).')}
      </p>

      <Choice
        label={t('Strumento')}
        value={instrument}
        onChange={onInstrument}
        options={INSTRUMENTS.map((i) => ({ id: i.id, label: tr(i.label) }))}
      />
    </section>
  )
}
