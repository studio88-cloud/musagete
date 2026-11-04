import { useEffect, useState } from 'react'
import Welcome from './components/Welcome'
import InstrumentMenu, { INSTRUMENTS } from './components/InstrumentMenu'

const STORAGE_KEY = 'musagete:instrument'

function loadInstrument() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (INSTRUMENTS.some((i) => i.id === saved)) return saved
  } catch {
    // storage non disponibile: si usa il valore di default
  }
  return 'keyboard'
}

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [instrument, setInstrument] = useState(loadInstrument)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, instrument)
    } catch {
      // ignorato: la scelta vale solo per questa sessione
    }
  }, [instrument])

  if (screen === 'welcome') {
    return (
      <div className="app">
        <Welcome onStart={() => setScreen('home')} />
      </div>
    )
  }

  const current = INSTRUMENTS.find((i) => i.id === instrument)

  return (
    <div className="app">
      <header className="topbar">
        <span className="brand">Musagete</span>
        <InstrumentMenu value={instrument} onChange={setInstrument} />
      </header>
      <main className="home">
        <section className="card">
          <h2>Capitolo 1: Fondamenti</h2>
          <p>In costruzione. Qui comparirà il percorso a capitoli.</p>
          <p className="muted">Strumento scelto: {current.label}</p>
        </section>
      </main>
    </div>
  )
}
