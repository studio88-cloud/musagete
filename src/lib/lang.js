// Lingua dell'app e nomi delle note: due scelte indipendenti, salvate sul dispositivo.
import { useCallback, useState } from 'react'

const LANG_KEY = 'musagete:lang'
const NOTES_KEY = 'musagete:notation'

// Ogni lingua si scrive nella lingua stessa. `ready` diventa true quando il file delle traduzioni è pronto.
export const LANGUAGES = [
  { id: 'it', label: 'Italiano', ready: true },
  { id: 'en', label: 'English', ready: false },
  { id: 'es', label: 'Español', ready: false },
  { id: 'fr', label: 'Français', ready: false },
  { id: 'de', label: 'Deutsch', ready: false },
  { id: 'pt', label: 'Português', ready: false },
]

// auto: solfeggio per italiano, spagnolo, francese, portoghese; lettere per le altre lingue
export const NOTE_STYLES = ['auto', 'solfege', 'letters']
const SOLFEGE_LANGS = ['it', 'es', 'fr', 'pt']

const read = (key) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
const write = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    // ignorato: la scelta vale solo per questa sessione
  }
}

export const savedLang = () => {
  const v = read(LANG_KEY)
  return LANGUAGES.some((l) => l.id === v && l.ready) ? v : null
}

// lingua del dispositivo, se disponibile; altrimenti italiano
export const deviceLang = () => {
  const code = (typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'it').slice(0, 2)
  return LANGUAGES.some((l) => l.id === code && l.ready) ? code : 'it'
}

export const resolveNoteStyle = (style, lang) =>
  style === 'solfege' || style === 'letters' ? style : SOLFEGE_LANGS.includes(lang) ? 'solfege' : 'letters'

export function useLang() {
  const [lang, setLangState] = useState(() => savedLang() || deviceLang())
  const [chosen, setChosen] = useState(() => Boolean(savedLang()))
  const [noteStyle, setNoteStyleState] = useState(() => {
    const v = read(NOTES_KEY)
    return NOTE_STYLES.includes(v) ? v : 'auto'
  })
  const setLang = useCallback((id) => {
    setLangState(id)
    setChosen(true)
    write(LANG_KEY, id)
    if (typeof document !== 'undefined') document.documentElement.lang = id
  }, [])
  const setNoteStyle = useCallback((s) => {
    setNoteStyleState(s)
    write(NOTES_KEY, s)
  }, [])
  return { lang, chosen, setLang, noteStyle, setNoteStyle, notes: resolveNoteStyle(noteStyle, lang) }
}
