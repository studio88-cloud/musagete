import { useCallback, useEffect, useState } from 'react'
import { CHAPTERS } from '../data/chapters'

const KEY = 'musagete:progress'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed.completed)) {
        return {
          completed: parsed.completed.filter(Number.isInteger),
          intro: parsed.intro === true,
        }
      }
    }
  } catch {
    // storage non disponibile o dati rovinati: si riparte da zero
  }
  return { completed: [], intro: false }
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
  const reset = useCallback(() => setState({ completed: [], intro: false }), [])

  return { completed: state.completed, intro: state.intro, completeNext, toggleIntro, reset }
}
