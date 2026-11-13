// Migrazioni dei dati salvati sul dispositivo.
// Versione 2: è stato inserito il nuovo capitolo 9 (“Modi delle scale minori”), quindi i vecchi capitoli 9–18
// sono diventati 10–19. I progressi già salvati vengono spostati di un numero, così nessuno perde quello che ha fatto.
const SCHEMA_KEY = 'musagete:schema'
const SCHEMA = 2
const FIRST_SHIFTED = 9

const read = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    return null
  }
}
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const shift = (n) => (Number.isInteger(n) && n >= FIRST_SHIFTED ? n + 1 : n)

// { [capitolo]: [...] } con le chiavi dei capitoli successivi all’8 spostate di uno
const shiftKeys = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [Number.isInteger(Number(k)) ? String(shift(Number(k))) : k, v]))

export function migrate() {
  try {
    const version = Number(localStorage.getItem(SCHEMA_KEY)) || 1
    if (version >= SCHEMA) return
    const progress = read('musagete:progress')
    if (progress && Array.isArray(progress.completed)) write('musagete:progress', { ...progress, completed: progress.completed.map(shift) })
    const steps = read('musagete:steps')
    if (steps && typeof steps === 'object') write('musagete:steps', shiftKeys(steps))
    const practice = read('musagete:practice')
    if (practice && typeof practice === 'object') write('musagete:practice', shiftKeys(practice))
    localStorage.setItem(SCHEMA_KEY, String(SCHEMA))
  } catch {
    // storage non disponibile: niente da migrare
  }
}
