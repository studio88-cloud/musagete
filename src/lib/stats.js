import { useCallback, useEffect, useRef, useState } from 'react'

// Statistiche dello studio: XP, tempo, risposte date e giuste. Salvate sul dispositivo.
const KEY = 'musagete:stats'
export const XP_PER_ANSWER = 10
const EMPTY = { xp: 0, seconds: 0, answered: 0, correct: 0 }
const MAX_STRETCH = 30 * 60 // un tratto continuo conta al massimo 30 minuti (app lasciata aperta)

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY))
    if (raw && typeof raw === 'object') {
      const num = (v) => (Number.isFinite(v) && v >= 0 ? Math.round(v) : 0)
      return { xp: num(raw.xp), seconds: num(raw.seconds), answered: num(raw.answered), correct: num(raw.correct) }
    }
  } catch {
    // storage non disponibile o dati rovinati: si riparte da zero
  }
  return { ...EMPTY }
}

// active: true mentre l'utente è dentro una lezione, un esercizio o un quiz
export function useStats(active) {
  const [stats, setStats] = useState(load)
  const since = useRef(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(stats))
    } catch {
      // ignorato: le statistiche valgono solo per questa sessione
    }
  }, [stats])

  const addSeconds = useCallback((s) => {
    if (s > 0) setStats((st) => ({ ...st, seconds: st.seconds + Math.min(Math.round(s), MAX_STRETCH) }))
  }, [])

  // Tempo di studio: conta solo mentre la schermata è attiva e visibile
  useEffect(() => {
    const stop = () => {
      if (since.current != null) {
        addSeconds((Date.now() - since.current) / 1000)
        since.current = null
      }
    }
    const start = () => {
      if (since.current == null && !document.hidden) since.current = Date.now()
    }
    const onVisibility = () => (document.hidden ? stop() : active && start())
    if (active) start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      stop()
    }
  }, [active, addSeconds])

  const addAnswer = useCallback((right) => {
    setStats((st) => ({
      ...st,
      answered: st.answered + 1,
      correct: st.correct + (right ? 1 : 0),
      xp: st.xp + (right ? XP_PER_ANSWER : 0),
    }))
  }, [])

  const resetStats = useCallback(() => setStats({ ...EMPTY }), [])

  return { stats, addAnswer, resetStats }
}

// 20 → "< 1 min" · 90 → "2 min" · 3600 → "1 h" · 5100 → "1 h 25 min"
export function formatTime(seconds) {
  const m = Math.round(seconds / 60)
  if (seconds > 0 && m < 1) return '< 1 min'
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  const r = m % 60
  return r ? `${h} h ${r} min` : `${h} h`
}

// 1250 → "1.250" (senza dipendere dalla lingua del dispositivo)
export const formatXp = (xp) => String(xp).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
export const formatAccuracy = (s) => (s.answered ? `${Math.round((s.correct / s.answered) * 100)}%` : '–')
