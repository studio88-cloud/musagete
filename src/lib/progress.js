import { useCallback, useEffect, useState } from 'react'
import { CHAPTERS } from '../data/chapters'

const KEY = 'musagete:progress'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed.completed)) {
        return { completed: parsed.completed.filter(Number.isInteger) }
      }
    }
  } catch {
    // storage non disponibile o dati rovinati: si riparte da zero
  }
  return { completed: [] }
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
      return next ? { completed: [...s.completed, next] } : s
    })
  }, [])

  const reset = useCallback(() => setState({ completed: [] }), [])

  return { completed: state.completed, completeNext, reset }
}
