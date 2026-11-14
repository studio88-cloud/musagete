import { loc, t } from '../lib/i18n'
import { COLUMNS, ROWS } from '../data/interchange'

// Raggruppa le righe per famiglia, mantenendo l'ordine
const groupRows = (rows) =>
  rows.reduce((acc, row) => {
    const last = acc[acc.length - 1]
    if (last && last.name === row.group) last.rows.push(row)
    else acc.push({ name: row.group, rows: [row] })
    return acc
  }, [])

export default function Interchange({ onBack }) {
  const GROUPS = groupRows(loc(ROWS))
  return (
    <section className="ic">
      <button type="button" className="ic-back" onClick={onBack}>{t('‹ Prontuario')}
      </button>
      <h2 className="ic-title">{t('Interscambio Modale')}</h2>
      <p className="ic-intro">{t('Per ogni scala, l’accordo di settima costruito su ciascun grado. Una cella vuota (·) vuol dire che quel grado non fa parte della scala. Scorri la tabella di lato per vedere tutti i gradi.')}
      </p>

      <div className="ic-scroll" tabIndex={0} role="region" aria-label={t('Tabella dell’interscambio modale')}>
        <table className="ic-table">
          <thead>
            <tr>
              <th scope="col" className="ic-corner">{t('Scala')}
              </th>
              {COLUMNS.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          {GROUPS.map((g) => (
            <tbody key={g.name}>
              <tr className="ic-group">
                <th colSpan={COLUMNS.length + 1} scope="colgroup">
                  <span>{g.name}</span>
                </th>
              </tr>
              {g.rows.map((row) => (
                <tr key={row.name}>
                  <th scope="row" className="ic-rowhead">
                    {row.name}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className={cell ? '' : 'is-empty'}>
                      {cell || '·'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <p className="ic-legend">{t('Δ settima maggiore · 7 dominante · m7 minore settima · ø7 semidiminuito · °7 diminuito · mΔ minore con settima maggiore · Δ/♯5 maggiore con quinta eccedente')}
      </p>
    </section>
  )
}
