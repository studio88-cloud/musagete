export const INSTRUMENTS = [
  { id: 'keyboard', label: 'Tastiera' },
  { id: 'guitar', label: 'Chitarra' },
  { id: 'bass', label: 'Basso' },
]

export default function InstrumentMenu({ value, onChange }) {
  return (
    <div className="instrument">
      <label htmlFor="instrument-select" className="sr-only">
        Strumento
      </label>
      <select
        id="instrument-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {INSTRUMENTS.map((i) => (
          <option key={i.id} value={i.id}>
            {i.label}
          </option>
        ))}
      </select>
    </div>
  )
}
