// Traduzioni: i testi nel codice sono in italiano e fanno da chiave. Per le altre lingue c'è un dizionario
// "italiano → lingua" (src/locales/<lingua>.json). Se manca una voce si vede l'italiano.
import en from '../locales/en.json'

const DICTS = { en }
let lang = 'it'
let dict = null
let cache = new WeakMap()

export function setLocale(id) {
  if (id === lang) return
  lang = id
  dict = DICTS[id] || null
  cache = new WeakMap()
}
export const getLocale = () => lang

const fill = (s, vars) => (vars ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : s)

// testo dell'interfaccia: t('Capitolo {n}', { n: 3 })
export const t = (src, vars) => fill(dict?.[src] ?? src, vars)

// stringa semplice (senza segnaposto)
export const tr = (src) => dict?.[src] ?? src

// stesso testo italiano con significati diversi: la voce del dizionario è "contesto|testo"
export const tc = (ctx, src) => dict?.[`${ctx}|${src}`] ?? dict?.[src] ?? src

// traduce tutte le stringhe di un oggetto di contenuto (lezioni, quiz, prontuario…) senza modificare l'originale
export function loc(v) {
  if (!dict || v == null) return v
  if (typeof v === 'string') return dict[v] ?? v
  if (typeof v !== 'object') return v
  const hit = cache.get(v)
  if (hit) return hit
  let out
  if (Array.isArray(v)) out = v.map(loc)
  else if (Object.getPrototypeOf(v) === Object.prototype) {
    out = {}
    for (const [k, x] of Object.entries(v)) out[k] = loc(x)
  } else return v
  cache.set(v, out)
  return out
}
