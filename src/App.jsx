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
import ChapterSteps from './screens/ChapterSteps'
import Lesson from './screens/Lesson'
import Quiz from './screens/Quiz'
import { quizFor } from './data/quizzes'
import { firstOpen, useProgress } from './lib/progress'
import { useStepProgress } from './lib/stepProgress'
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
  const [openStep, setOpenStep] = useState(null)
  const { stepsDone, toggleStep, markStepDone } = useStepProgress()
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
    setOpenStep(null)
    setTab(id)
  }

  let content
  if (openItem && openItem.id === 'interchange') {
    content = <Interchange onBack={() => setOpenItem(null)} />
  } else if (openItem && openItem.kind === 'chapter' && openStep) {
    const finishStep = (passed) => {
      if (passed) {
        markStepDone(openItem.number, openStep.id)
        // superato il quiz finale: si sblocca il capitolo successivo
        if (openStep.kind === 'quiz' && firstOpen(completed) === openItem.number) completeNext()
      }
      setOpenStep(null)
    }
    content =
      openStep.kind === 'lesson' || !quizFor(openItem.number, openStep.id) ? (
      <Lesson
        chapter={openItem.number}
        step={openStep}
        instrument={instrument}
        onFinish={() => {
          markStepDone(openItem.number, openStep.id)
          setOpenStep(null)
        }}
        onExit={() => setOpenStep(null)}
      />
      ) : (
        <Quiz chapter={openItem.number} step={openStep} onDone={finishStep} onExit={() => setOpenStep(null)} />
      )
  } else if (openItem && openItem.kind === 'chapter') {
    content = (
      <ChapterSteps
        chapter={openItem.number}
        title={openItem.title}
        done={stepsDone[openItem.number] || []}
        onToggle={(id) => toggleStep(openItem.number, id)}
        onOpenStep={setOpenStep}
        onBack={() => setOpenItem(null)}
        onOpenHandbook={() => changeTab('handbook')}
      />
    )
  } else if (openItem) {
    const isChapter = openItem.kind === 'intro'
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
