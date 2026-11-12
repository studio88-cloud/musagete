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
import Placement from './screens/Placement'
import PlacementResult from './screens/PlacementResult'
import { quizFor, PLACEMENT } from './data/quizzes'
import { INTRO } from './data/chapters'
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
  const { completed, intro, asked, completeNext, toggleIntro, setIntroDone, setAsked, reset } = useProgress()
  const [placing, setPlacing] = useState(false)
  const [placeResult, setPlaceResult] = useState(null) // null | 'pass' | 'fail'

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
  } else if (placeResult) {
    content = (
      <PlacementResult
        passed={placeResult === 'pass'}
        onContinue={() => {
          const failed = placeResult === 'fail'
          setPlaceResult(null)
          if (failed) setOpenItem({ kind: 'intro', ...INTRO })
        }}
      />
    )
  } else if (placing) {
    content = (
      <Quiz
        chapter={0}
        step={{ title: 'Test iniziale' }}
        data={PLACEMENT}
        skipResults
        onDone={(passed) => {
          setAsked()
          setPlacing(false)
          if (passed) setIntroDone()
          setPlaceResult(passed ? 'pass' : 'fail')
        }}
        onExit={() => setPlacing(false)}
      />
    )
  } else if (openItem && (openItem.kind === 'chapter' || openItem.kind === 'intro') && openStep) {
    const num = openItem.kind === 'intro' ? 0 : openItem.number
    const finishStep = (passed) => {
      if (passed) {
        markStepDone(num, openStep.id)
        if (openStep.kind === 'quiz') {
          if (num === 0) setIntroDone()
          else if (firstOpen(completed) === num) completeNext()
        }
      }
      setOpenStep(null)
    }
    content =
      openStep.kind === 'lesson' || !quizFor(num, openStep.id) ? (
        <Lesson
          chapter={num}
          step={openStep}
          instrument={instrument}
          onFinish={() => {
            markStepDone(num, openStep.id)
            setOpenStep(null)
          }}
          onExit={() => setOpenStep(null)}
        />
      ) : (
        <Quiz chapter={num} step={openStep} onDone={finishStep} onExit={() => setOpenStep(null)} />
      )
  } else if (openItem && (openItem.kind === 'chapter' || openItem.kind === 'intro')) {
    const num = openItem.kind === 'intro' ? 0 : openItem.number
    content = (
      <ChapterSteps
        chapter={num}
        title={openItem.title}
        done={stepsDone[num] || []}
        onToggle={(id) => toggleStep(num, id)}
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
  } else if (tab === 'path' && !asked) {
    content = (
      <Placement
        onTest={() => setPlacing(true)}
        onSkip={() => {
          setAsked()
          setIntroDone()
        }}
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
