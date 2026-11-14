import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './tool.css'
import Keyboard from '../components/Keyboard'
import Fretboard from '../components/Fretboard'
import Staff from '../components/Staff'
import ReportButton from '../components/ReportButton'
import MiniMap from '../components/MiniMap'
import { CHORD_GROUPS, findChord } from '../data/chords'
import { SCALE_GROUPS, findScale } from '../data/scales'
import { baseMidi, DEGREE_COLORS, spellNotes, TONICS, tonicName } from '../lib/music'
import { scrollXFor } from '../lib/keys'
import { playNotes, stopPlaying } from '../lib/audio'
import { loc, t, tr } from '../lib/i18n'

const KEY = 'musagete:tool'
const DEFAULTS = { tonic: 'C', kind: 'chord', type: 'maj', mode: 'degrees', legend: true, staff: true }
const LEGEND = [
  [1, 'Fondamentale'], [2, 'Seconda'], [3, 'Terza'], [4, 'Quarta'], [5, 'Quinta'], [6, 'Sesta'], [7, 'Settima'],
]

const INSTRUMENT_LABELS = { keyboard: 'Tastiera', guitar: 'Chitarra', bass: 'Basso' }
const findType = (kind, id) => (kind === 'chord' ? findChord(id) : findScale(id))

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY))
    if (s && TONICS.some((t) => t.id === s.tonic) && findType(s.kind, s.type)) return { ...DEFAULTS, ...s }
  } catch {
    // dati assenti o rovinati: valori di partenza
  }
  return DEFAULTS
}

function PlayIcon({ playing }) {
  return playing ? (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1.5" fill="#fff" />
      <rect x="14" y="5" width="4" height="14" rx="1.5" fill="#fff" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" fill="#fff" />
    </svg>
  )
}

function Row({ selected, onClick, children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (selected) ref.current?.scrollIntoView({ block: 'center' })
  }, [selected])
  return (
    <button type="button" ref={ref} className={`pick-row${selected ? ' is-selected' : ''}`} onClick={onClick} role="option" aria-selected={selected}>
      {children}
    </button>
  )
}

function TonicPanel({ value, kind, onPick }) {
  return (
    <div className="panel panel-tonic" role="listbox" aria-label={t('Tonica')}>
      {TONICS.map((t) => (
        <Row key={t.id} selected={t.id === value} onClick={() => onPick(t.id)}>
          {tonicName(t, kind)}
        </Row>
      ))}
    </div>
  )
}

// per la ricerca: minuscole, senza accenti, ♭ -> b e ♯ -> #
const norm = (t) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/♭/g, 'b')
    .replace(/♯/g, '#')
    .replace(/♮/g, '')

function TypePanel({ kind, type, tab, onTab, onPick }) {
  const [query, setQuery] = useState('')
  const needle = norm(query.trim())
  const source = loc(tab === 'chord' ? CHORD_GROUPS : SCALE_GROUPS)
  const groups = source
    .map((g) => ({ ...g, items: needle ? g.items.filter((it) => norm(it.name).includes(needle)) : g.items }))
    .filter((g) => g.items.length > 0)

  const changeTab = (t) => {
    setQuery('')
    onTab(t)
  }

  return (
    <div className="panel panel-type" role="listbox" aria-label={t('Tipo')}>
      <div className="seg seg-small" role="group">
        <button type="button" className={tab === 'chord' ? 'is-on' : ''} onClick={() => changeTab('chord')}>{t('Accordi')}
        </button>
        <button type="button" className={tab === 'scale' ? 'is-on' : ''} onClick={() => changeTab('scale')}>{t('Scale')}
        </button>
      </div>
      <input
        type="search"
        className="pick-search"
        placeholder={tab === 'chord' ? t('Cerca un accordo') : t('Cerca una scala')}
        aria-label={tab === 'chord' ? t('Cerca un accordo') : t('Cerca una scala')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {groups.length === 0 && <p className="pick-empty">{t('Nessun risultato per “{query}”', { query })}</p>}
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="pick-title">{g.title}</h3>
          {g.items.map((it) => (
            <Row key={it.id} selected={kind === tab && it.id === type} onClick={() => onPick(tab, it.id)}>
              {it.name}
            </Row>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Tool({ instrument }) {
  const [st, setSt] = useState(load)
  const [menu, setMenu] = useState(null) // null | 'tonic' | 'type'
  const [tab, setTab] = useState(st.kind)
  const [playing, setPlaying] = useState(false)
  const [view, setView] = useState({ x: 0, w: 1, total: 1 })
  const [scrollReq, setScrollReq] = useState({ x: 0, n: 0, smooth: false })

  const root = TONICS.find((t) => t.id === st.tonic)
  const def = findType(st.kind, st.type)
  const notes = useMemo(() => spellNotes(root, def.notes), [root, def])
  const highlights = useMemo(() => new Map(notes.map((n) => [n.pc, n])), [notes])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(st))
    } catch {
      // ignorato: le scelte valgono solo per questa sessione
    }
  }, [st])

  // quando cambia tonica o tipo: ferma il suono e porta la tastiera sulle note
  useEffect(() => {
    stopPlaying()
    setPlaying(false)
    setScrollReq((r) => ({ x: Math.max(0, scrollXFor(baseMidi(root)) - 6), n: r.n + 1, smooth: r.n > 0 }))
  }, [st.tonic, st.kind, st.type, root])

  useEffect(() => () => stopPlaying(), [])

  const update = (patch) => setSt((s) => ({ ...s, ...patch }))
  const jump = useCallback((x) => setScrollReq((r) => ({ x: Math.max(0, x), n: r.n + 1, smooth: true })), [])

  const toggleMenu = (name) => {
    if (menu === name) setMenu(null)
    else {
      if (name === 'type') setTab(st.kind)
      setMenu(name)
    }
  }

  const togglePlay = () => {
    if (playing) {
      stopPlaying()
      setPlaying(false)
      return
    }
    // il basso suona due ottave sotto la tastiera, la chitarra una (la loro gamma reale)
    const base = baseMidi(root) + instrumentShift(instrument)
    const midis = [...notes].sort((a, b) => a.semi - b.semi).map((n) => base + n.semi)
    const isScale = st.kind === 'scale'
    if (isScale) midis.push(base + 12)
    setPlaying(true)
    playNotes(midis, { kind: st.kind, arpeggio: instrument !== 'keyboard', instrument, onEnd: () => setPlaying(false) })
  }

  return (
    <section className="tool">
      <div className="tool-controls">
        <button type="button" className="pill pill-tonic" onClick={() => toggleMenu('tonic')} aria-haspopup="listbox" aria-expanded={menu === 'tonic'}>
          <span>{tonicName(root, st.kind)}</span>
          <span className="pill-arrow">{menu === 'tonic' ? '▴' : '▾'}</span>
        </button>
        <button type="button" className="pill pill-type" onClick={() => toggleMenu('type')} aria-haspopup="listbox" aria-expanded={menu === 'type'}>
          <span className={`pill-text${def.name.length > 10 ? ' is-long' : ''}`}>{tr(def.name)}</span>
          <span className="pill-arrow">{menu === 'type' ? '▴' : '▾'}</span>
        </button>
        <button type="button" className="play" onClick={togglePlay} aria-label={playing ? t('Ferma') : t('Ascolta')}>
          <PlayIcon playing={playing} />
        </button>
      </div>

      <p className="tool-notes">{notes.map((n) => n.name.toUpperCase()).join(' — ')}</p>

      <div className="seg" role="group" aria-label={t('Cosa mostrare nei pallini')}>
        <button type="button" className={st.mode === 'degrees' ? 'is-on' : ''} onClick={() => update({ mode: 'degrees' })}>{t('Gradi')}
        </button>
        <button type="button" className={st.mode === 'notes' ? 'is-on' : ''} onClick={() => update({ mode: 'notes' })}>{t('Note')}
        </button>
      </div>

      {instrument === 'keyboard' ? (
        <>
          <MiniMap view={view} onJump={jump} />
          <Keyboard highlights={highlights} mode={st.mode} scrollReq={scrollReq} onView={setView} />
        </>
      ) : (
        <Fretboard instrument={instrument} highlights={highlights} mode={st.mode} />
      )}

      <div className="legend staff-card">
        <button type="button" className="legend-head" onClick={() => update({ staff: !st.staff })} aria-expanded={st.staff}>
          <span>{t('SPARTITO')}</span>
          <span aria-hidden="true">{st.staff ? '▴' : '▾'}</span>
        </button>
        {st.staff && (
          <Staff
            notes={[...notes].sort((a, b) => a.semi - b.semi)}
            base={baseMidi(root)}
            kind={st.kind}
          />
        )}
      </div>

      <div className="legend">
        <button type="button" className="legend-head" onClick={() => update({ legend: !st.legend })} aria-expanded={st.legend}>
          <span>{t('LEGENDA GRADI')}</span>
          <span aria-hidden="true">{st.legend ? '▴' : '▾'}</span>
        </button>
        {st.legend && (
          <ul className="legend-list">
            {LEGEND.map(([deg, label]) => (
              <li key={deg}>
                <span className="dot dot-small" style={{ background: DEGREE_COLORS[deg].bg, color: DEGREE_COLORS[deg].ink }}>
                  {deg}
                </span>
                {tr(label)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="report-wrap">
        <ReportButton
          variant="link"
          context={t('Strumento: {kind} {name}, {instrument}', { kind: tonicName(root, st.kind), name: tr(def.name), instrument: tr(INSTRUMENT_LABELS[instrument]) })}
        />
      </div>

      {menu && (
        <>
          <div className="scrim" onClick={() => setMenu(null)} />
          {menu === 'tonic' ? (
            <TonicPanel value={st.tonic} kind={st.kind} onPick={(id) => { update({ tonic: id }); setMenu(null) }} />
          ) : (
            <TypePanel
              kind={st.kind}
              type={st.type}
              tab={tab}
              onTab={setTab}
              onPick={(kind, id) => { update({ kind, type: id }); setMenu(null) }}
            />
          )}
        </>
      )}
    </section>
  )
}
