import { useEffect, useState } from 'react'
import Welcome from './components/Welcome'
import TopBar from './components/TopBar'
import TabBar from './components/TabBar'
import { INSTRUMENTS } from './components/InstrumentMenu'
import Path from './screens/Path'
import Profile from './screens/Profile'
import Handbook from './screens/Handbook'
import Interchange from './screens/Interchange'
import Tool from './screens/Tool'
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
  const { completed, intro, completeNext, toggleIntro, reset } = useProgress()

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
  if (openItem && openItem.id === 'interchange') {
    content = <Interchange onBack={() => setOpenItem(null)} />
  } else if (openItem) {
    const isChapter = openItem.kind === 'intro' || openItem.kind === 'chapter'
    content = (
      <Stub
        title={openItem.number ? `${openItem.number} ${openItem.title}` : openItem.title}
        text={
          isChapter
            ? 'In costruzione. Qui comparirà la lista dei passi del capitolo.'
            : 'In costruzione. Qui comparirà la scheda del prontuario.'
        }
        onBack={() => setOpenItem(null)}
      />
    )
  } else if (tab === 'path') {
    content = <Path completed={completed} onOpen={setOpenItem} />
  } else if (tab === 'handbook') {
    content = <Handbook completed={completed} onOpen={setOpenItem} />
  } else if (tab === 'tool') {
    content = <Tool instrument={instrument} />
  } else {
    content = (
      <Profile
        completed={completed}
        intro={intro}
        onCompleteNext={completeNext}
        onToggleIntro={toggleIntro}
        onReset={reset}
      />
    )
  }

  return (
    <div className="app">
      <TopBar instrument={instrument} onInstrumentChange={setInstrument} />
      <main className="screen">{content}</main>
      <TabBar active={tab} onChange={changeTab} />
    </div>
  )
}
