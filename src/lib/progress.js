import { useCallback, useEffect, useState } from 'react'
import { CHAPTERS } from '../data/chapters'

const KEY = 'musagete:progress'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed.completed)) {
        const completed = parsed.completed.filter(Number.isInteger)
        const intro = parsed.intro === true
        // chi aveva già dei progressi non rivede la domanda iniziale
        return { completed, intro, asked: parsed.asked === true || intro || completed.length > 0 }
      }
    }
  } catch {
    // storage non disponibile o dati rovinati: si riparte da zero
  }
  return { completed: [], intro: false, asked: false }
}

// Primo capitolo non ancora completato (quello "attuale")
export function firstOpen(completed) {
  for (const { n } of CHAPTERS) if (!completed.includes(n)) return n
  return null
}

// 'done' | 'current' | 'locked'
export function chapterStatus(n, completed) {
  if (completed.includes(n)) return 'done'
  return n === firstOpen(completed) ? 'current' : 'locked'
}

export function useProgress() {
  const [state, setState] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      // ignorato: i progressi valgono solo per questa sessione
    }
  }, [state])

  const completeNext = useCallback(() => {
    setState((s) => {
      const next = firstOpen(s.completed)
      return next ? { ...s, completed: [...s.completed, next] } : s
    })
  }, [])

  const toggleIntro = useCallback(() => setState((s) => ({ ...s, intro: !s.intro })), [])
  const setIntroDone = useCallback(() => setState((s) => ({ ...s, intro: true })), [])
  const setAsked = useCallback(() => setState((s) => ({ ...s, asked: true })), [])
  const reset = useCallback(() => setState({ completed: [], intro: false, asked: false }), [])

  return { completed: state.completed, intro: state.intro, asked: state.asked, completeNext, toggleIntro, setIntroDone, setAsked, reset }
}
