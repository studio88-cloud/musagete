import { t, tr } from '../lib/i18n'
export const INSTRUMENTS = [
  { id: 'keyboard', label: 'Tastiera' },
  { id: 'guitar', label: 'Chitarra' },
  { id: 'bass', label: 'Basso' },
]

export default function InstrumentMenu({ value, onChange }) {
  return (
    <div className="instrument">
      <label htmlFor="instrument-select" className="sr-only">{t('Strumento')}
      </label>
      <select
        id="instrument-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {INSTRUMENTS.map((i) => (
          <option key={i.id} value={i.id}>
            {tr(i.label)}
          </option>
        ))}
      </select>
    </div>
  )
}
