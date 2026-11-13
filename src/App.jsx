import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Welcome from './components/Welcome'
import TopBar from './components/TopBar'
import TabBar from './components/TabBar'
import { INSTRUMENTS } from './components/InstrumentMenu'
import Path from './screens/Path'
import Profile from './screens/Profile'
import Handbook from './screens/Handbook'
import Interchange from './screens/Interchange'
import HandbookEntry from './screens/HandbookEntry'
import Tool from './screens/Tool'
import Stub from './screens/Stub'
import ChapterSteps from './screens/ChapterSteps'
import Lesson from './screens/Lesson'
import Quiz from './screens/Quiz'
import Apply from './screens/Apply'
import Practice from './screens/Practice'
import LanguagePicker from './screens/LanguagePicker'
import Settings from './screens/Settings'
import { useLang } from './lib/lang'
import { applyFor } from './data/apply'
import Build from './screens/Build'
import Placement from './screens/Placement'
import PlacementResult from './screens/PlacementResult'
import { quizFor, PLACEMENT } from './data/quizzes'
import { INTRO } from './data/chapters'
import { firstOpen, useProgress } from './lib/progress'
import { useStepProgress } from './lib/stepProgress'
import { useStats } from './lib/stats'
import { preloadSamples } from './lib/audio'
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
  const langState = useLang()
  const [screen, setScreen] = useState(() => (langState.chosen ? 'welcome' : 'language'))
  const [settings, setSettings] = useState(false)
  const [tab, setTab] = useState('path')
  const [openItem, setOpenItem] = useState(null)
  const [instrument, setInstrument] = useState(loadInstrument)
  const [openStep, setOpenStep] = useState(null)
  const { stepsDone, toggleStep, markStepDone, resetSteps } = useStepProgress()
  const { completed, intro, asked, completeNext, toggleIntro, setIntroDone, setAsked, reset } = useProgress()
  const [placing, setPlacing] = useState(false)
  const [placeResult, setPlaceResult] = useState(null) // null | 'pass' | 'fail'
  const { stats, addAnswer, resetStats } = useStats(Boolean(openStep) || placing)

  // il Prontuario torna alla posizione in cui era quando si è aperta una voce
  const hbScroll = useRef(0)
  const wasEntry = useRef(false)
  const inEntry = tab === 'handbook' && Boolean(openItem)
  useLayoutEffect(() => {
    if (wasEntry.current && !inEntry && tab === 'handbook') window.scrollTo(0, hbScroll.current)
    wasEntry.current = inEntry
  }, [inEntry, tab])
  const openHandbookItem = (entry) => {
    hbScroll.current = window.scrollY
    setOpenItem(entry)
  }

  useEffect(() => {
    preloadSamples(instrument) // i campioni si scaricano in anticipo, così il primo ascolto è già quello vero
  }, [instrument])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, instrument)
    } catch {
      // ignorato: la scelta vale solo per questa sessione
    }
  }, [instrument])

  if (screen === 'language') {
    return (
      <div className="app">
        <LanguagePicker
          current={langState.lang}
          onPick={(id) => {
            langState.setLang(id)
            setScreen('welcome')
          }}
        />
      </div>
    )
  }

  if (screen === 'welcome') {
    return (
      <div className="app">
        <Welcome onStart={() => setScreen('main')} />
      </div>
    )
  }

  const changeTab = (id) => {
    hbScroll.current = 0
    setOpenItem(null)
    setOpenStep(null)
    setSettings(false)
    setTab(id)
  }

  let content
  if (settings) {
    content = (
      <Settings
        lang={langState.lang}
        onLang={langState.setLang}
        noteStyle={langState.noteStyle}
        onNoteStyle={langState.setNoteStyle}
        notes={langState.notes}
        instrument={instrument}
        onInstrument={setInstrument}
        onBack={() => setSettings(false)}
      />
    )
  } else if (openItem && openItem.id === 'interchange') {
    content = <Interchange onBack={() => setOpenItem(null)} />
  } else if (openItem && openItem.examples) {
    content = <HandbookEntry entry={openItem} instrument={instrument} onBack={() => setOpenItem(null)} />
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
        instrument={instrument}
        skipResults
        onAnswer={addAnswer}
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
      openStep.kind === 'practice' ? (
        <Practice chapter={num} instrument={instrument} onExit={() => setOpenStep(null)} />
      ) : openStep.kind === 'apply' && applyFor(num) ? (
        <Apply
          chapter={num}
          step={openStep}
          instrument={instrument}
          onAnswer={addAnswer}
          onDone={() => finishStep(true)}
          onExit={() => setOpenStep(null)}
        />
      ) : openStep.kind === 'build' ? (
        <Build
          chapter={num}
          step={openStep}
          instrument={instrument}
          onAnswer={addAnswer}
          onDone={() => finishStep(true)}
          onExit={() => setOpenStep(null)}
        />
      ) : openStep.kind === 'lesson' || !quizFor(num, openStep.id) ? (
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
        <Quiz chapter={num} step={openStep} instrument={instrument} onAnswer={addAnswer} onDone={finishStep} onExit={() => setOpenStep(null)} />
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
    content = <Handbook completed={completed} onOpen={openHandbookItem} />
  } else if (tab === 'tool') {
    content = <Tool instrument={instrument} />
  } else {
    content = (
      <Profile
        completed={completed}
        intro={intro}
        onCompleteNext={completeNext}
        onToggleIntro={toggleIntro}
        stats={stats}
        onReset={() => {
          reset()
          resetSteps()
          resetStats()
        }}
      />
    )
  }

  return (
    <div className="app">
      <div className="rotate-lock" role="alert">
        <span aria-hidden="true">⟳</span>
        <p>Gira il telefono in verticale per usare Musagete</p>
      </div>
      <TopBar instrument={instrument} onInstrumentChange={setInstrument} onSettings={() => setSettings(true)} />
      <main className="screen">{content}</main>
      <TabBar active={tab} onChange={changeTab} />
    </div>
  )
}
