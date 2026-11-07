import { useEffect, useState } from 'react'
import Welcome from './components/Welcome'
import TopBar from './components/TopBar'
import TabBar from './components/TabBar'
import { INSTRUMENTS } from './components/InstrumentMenu'
import Path from './screens/Path'
import Profile from './screens/Profile'
import Stub from './screens/Stub'
import { useProgress } from './lib/progress'
import './screens.css'

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
  const [tab, setTab] = useState('path')
  const [openItem, setOpenItem] = useState(null)
  const [instrument, setInstrument] = useState(loadInstrument)
  const { completed, completeNext, reset } = useProgress()

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
        <Welcome onStart={() => setScreen('main')} />
      </div>
    )
  }

  const changeTab = (id) => {
    setOpenItem(null)
    setTab(id)
  }

  let content
  if (openItem) {
    content = (
      <Stub
        title={openItem.number ? `${openItem.number} ${openItem.title}` : openItem.title}
        text="In costruzione. Qui comparirà la lista dei passi del capitolo."
        onBack={() => setOpenItem(null)}
      />
    )
  } else if (tab === 'path') {
    content = <Path completed={completed} onOpen={setOpenItem} />
  } else if (tab === 'handbook') {
    content = <Stub title="Prontuario" text="In costruzione." />
  } else if (tab === 'tool') {
    content = <Stub title="Strumento" text="In costruzione. Qui si proverà liberamente lo strumento scelto." />
  } else {
    content = <Profile completed={completed} onCompleteNext={completeNext} onReset={reset} />
  }

  return (
    <div className="app">
      <TopBar instrument={instrument} onInstrumentChange={setInstrument} />
      <main className="screen">{content}</main>
      <TabBar active={tab} onChange={changeTab} />
    </div>
  )
}
