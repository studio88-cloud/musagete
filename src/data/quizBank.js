import { Q, shuffle } from './quizGen'
import { BANK_A } from './quizBankA'
import { BANK_B } from './quizBankB'
import { BANK_C } from './quizBankC'

// Banca di domande per capitolo: le domande originali del quiz + le nuove (fisse o generate).
// A ogni quiz se ne estraggono a caso quante servono, senza ripetizioni.
const EXTRA = Object.fromEntries(
  Array.from({ length: 20 }, (_, c) => [c, [...(BANK_A[c] || []), ...(BANK_B[c] || []), ...(BANK_C[c] || [])]]),
)

// domanda originale: si rimescolano le opzioni tenendo allineati i suggerimenti
function reshuffle(q) {
  const idx = shuffle(q.options.map((_, i) => i))
  return {
    ...q,
    options: idx.map((i) => q.options[i]),
    answer: idx.indexOf(q.answer),
    hints: q.hints ? idx.map((i) => q.hints[i]) : undefined,
  }
}

const clean = (q) => q && q.options && q.options.length >= 4 && new Set(q.options).size === q.options.length && q.answer >= 0 && !/[♭♯]{2}/.test(JSON.stringify(q.options) + q.prompt)

function make(entry) {
  if (typeof entry === 'function') {
    for (let i = 0; i < 40; i++) {
      const q = entry()
      if (clean(q)) return q
    }
    return null
  }
  if (Array.isArray(entry)) {
    const [prompt, correct, wrongs, explanation] = entry
    return Q(prompt, correct, wrongs, explanation)
  }
  return reshuffle(entry)
}

// numero di domande disponibili per un capitolo
export const bankSize = (chapter, base = []) => {
  const seen = new Set(base.map((q) => q.prompt))
  const extra = (EXTRA[chapter] || []).filter((e) => !(Array.isArray(e) && seen.has(e[0])))
  return base.length + extra.length
}

// base: domande originali del quiz; count: quante se ne mostrano
export function drawQuestions(chapter, base, count) {
  const seen = new Set(base.map((q) => q.prompt))
  const pool = [...base, ...(EXTRA[chapter] || []).filter((e) => !(Array.isArray(e) && seen.has(e[0])))]
  const out = []
  const prompts = new Set()
  for (const entry of shuffle(pool)) {
    if (out.length >= count) break
    const q = make(entry)
    if (!q || prompts.has(q.prompt)) continue
    prompts.add(q.prompt)
    out.push(q)
  }
  return out
}
