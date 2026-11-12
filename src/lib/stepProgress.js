import { useCallback, useEffect, useState } from 'react'

const KEY = 'musagete:steps'

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY))
    if (raw && typeof raw === 'object') return raw
  } catch {
    // storage non disponibile o dati rovinati: si riparte da zero
  }
  return {}
}

// Passi completati per capitolo: { [capitolo]: [id dei passi] }
export function useStepProgress() {
  const [all, setAll] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(all))
    } catch {
      // ignorato: i passi valgono solo per questa sessione
    }
  }, [all])

  const toggle = useCallback((chapter, id) => {
    setAll((a) => {
      const list = a[chapter] || []
      return { ...a, [chapter]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id] }
    })
  }, [])

  const markDone = useCallback((chapter, id) => {
    setAll((a) => {
      const list = a[chapter] || []
      return list.includes(id) ? a : { ...a, [chapter]: [...list, id] }
    })
  }, [])

  const resetSteps = useCallback(() => setAll({}), [])

  return { stepsDone: all, toggleStep: toggle, markStepDone: markDone, resetSteps }
}
