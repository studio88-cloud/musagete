// Generatori di domande per i quiz finali: ogni volta scelgono una tonalità, una nota o un accordo diversi.
// Note e scale in solfeggio, accordi in lettere (come nel resto dell'app).
import { TONICS, IT_NAMES, LETTER_PC, accidental, parseFormula, spellNotes } from '../lib/music'

export const rnd = (a) => a[Math.floor(Math.random() * a.length)]
export const shuffle = (a) => {
  const r = [...a]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}
const uniq = (a) => [...new Set(a)]

// domanda con le opzioni mescolate: correct è il testo giusto, wrongs i distrattori
export function Q(prompt, correct, wrongs, explanation, extra = {}) {
  const w = uniq(wrongs).filter((x) => x !== correct)
  const options = shuffle([correct, ...w.slice(0, 3)])
  return { prompt, options, answer: options.indexOf(correct), explanation, ...extra }
}

// ---- note e tonalità ----
export const T = (id) => TONICS.find((t) => t.id === id)
export const MAJOR_KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'F', 'B♭', 'E♭', 'A♭', 'D♭']
export const MINOR_KEYS = ['A', 'E', 'B', 'F♯', 'C♯', 'D', 'G', 'C', 'F', 'B♭', 'E♭']
export const ROOTS = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B']
export const sol = (id) => {
  const t = T(id)
  return IT_NAMES[t.letter] + accidental(t.acc)
}
const LET = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' }
export const letterOf = (name) => {
  const base = name.replace(/[♭♯]+$/, '')
  return LET[base] + name.slice(base.length)
}
export const spell = (id, formula) => spellNotes(T(id), parseFormula(formula))
export const names = (id, formula) => spell(id, formula).map((n) => n.name)
export const ORD = ['primo', 'secondo', 'terzo', 'quarto', 'quinto', 'sesto', 'settimo']
export const ORD_M = ORD
export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const FILL = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do♯', 'Fa♯', 'Si♭', 'Mi♭', 'La♭', 'Re♭', 'Sol♭']
const nameOf = (letter, acc) => IT_NAMES[((letter % 7) + 7) % 7] + accidental(acc)

// distrattori per una nota: stessa lettera alterata, altra grafia, vicine
export function noteWrongs(name, scale = []) {
  const base = name.replace(/[♭♯]+$/, '')
  const letter = IT_NAMES.indexOf(base)
  const acc = name.length - base.length ? (name.endsWith('♯') ? name.length - base.length : -(name.length - base.length)) : 0
  const pc = (LETTER_PC[letter] + acc + 12) % 12
  const out = [nameOf(letter, acc + 1), nameOf(letter, acc - 1)]
  for (const dl of [1, -1]) {
    const l = letter + dl
    let a = (pc - LETTER_PC[((l % 7) + 7) % 7] + 12) % 12
    if (a > 6) a -= 12
    if (Math.abs(a) <= 1) out.push(nameOf(l, a))
  }
  return uniq([...out.filter((x) => !/[♭♯]{2}/.test(x)), ...shuffle(scale), ...shuffle(FILL)]).filter((x) => x !== name)
}

// ---- famiglie di domande ----
export const idOf = (n) => TONICS.find((t) => sol(t.id) === n)?.id
const pickMaj = () => rnd(MAJOR_KEYS)
const pickMin = () => rnd(MINOR_KEYS)

export const gen = {
  // grado di una scala maggiore
  degMaj: (degs = [2, 3, 4, 5, 6, 7]) => () => {
    const k = pickMaj()
    const d = rnd(degs)
    const sc = names(k, '1 2 3 4 5 6 7')
    const ans = sc[d - 1]
    return Q(`Qual è il ${ORD[d - 1]} grado della scala di ${sol(k)} maggiore?`, ans, noteWrongs(ans, sc), `La scala di ${sol(k)} maggiore è ${sc.join(' – ')}: il ${ORD[d - 1]} grado è ${ans}.`)
  },
  // grado di una scala minore naturale
  degMin: (degs = [2, 3, 4, 5, 6, 7]) => () => {
    const k = pickMin()
    const d = rnd(degs)
    const sc = names(k, '1 2 ♭3 4 5 ♭6 ♭7')
    const ans = sc[d - 1]
    return Q(`Qual è il ${ORD[d - 1]} grado della scala di ${sol(k)} minore naturale?`, ans, noteWrongs(ans, sc), `La scala di ${sol(k)} minore naturale è ${sc.join(' – ')}: il ${ORD[d - 1]} grado è ${ans}.`)
  },
  // armatura di chiave
  keySig: () => {
    const k = rnd(['G', 'D', 'A', 'E', 'B', 'F', 'B♭', 'E♭', 'A♭', 'D♭'])
    const sharps = ['Fa♯', 'Do♯', 'Sol♯', 'Re♯', 'La♯', 'Mi♯', 'Si♯']
    const flats = ['Si♭', 'Mi♭', 'La♭', 'Re♭', 'Sol♭', 'Do♭', 'Fa♭']
    const nSharp = { G: 1, D: 2, A: 3, E: 4, B: 5 }
    const nFlat = { F: 1, 'B♭': 2, 'E♭': 3, 'A♭': 4, 'D♭': 5 }
    const txt = (n, s) => `${n} ${s ? (n === 1 ? 'diesis' : 'diesis') : n === 1 ? 'bemolle' : 'bemolli'} (${(s ? sharps : flats).slice(0, n).join(', ')})`
    const isS = k in nSharp
    const n = isS ? nSharp[k] : nFlat[k]
    const ans = txt(n, isS)
    const wrongs = [txt(n, !isS), txt(n + 1 > 6 ? n - 1 : n + 1, isS), txt(Math.max(1, n - 1), isS), txt(n === 1 ? 2 : n - 1, !isS)]
    return Q(`Quale armatura ha ${sol(k)} maggiore?`, ans, wrongs, `${sol(k)} maggiore ha ${ans}.`)
  },
  // relativa minore / maggiore
  relMinor: () => {
    const k = pickMaj()
    const ans = names(k, '1 2 3 4 5 6 7')[5]
    const sc = names(k, '1 2 3 4 5 6 7')
    return Q(`Qual è la relativa minore di ${sol(k)} maggiore?`, `${ans} minore`, [...noteWrongs(ans, sc)].map((x) => `${x} minore`), `La relativa minore parte dal sesto grado: ${sol(k)} maggiore → ${ans} minore.`)
  },
  relMajor: () => {
    const k = pickMin()
    const ans = names(k, '1 2 ♭3 4 5 ♭6 ♭7')[2]
    const sc = names(k, '1 2 ♭3 4 5 ♭6 ♭7')
    return Q(`Qual è la relativa maggiore di ${sol(k)} minore?`, `${ans} maggiore`, noteWrongs(ans, sc).map((x) => `${x} maggiore`), `La relativa maggiore parte dal terzo grado: ${sol(k)} minore → ${ans} maggiore.`)
  },
  // intervalli sopra una nota
  interval: (list) => () => {
    const all = [['una seconda maggiore', '2'], ['una terza minore', '♭3'], ['una terza maggiore', '3'], ['una quarta giusta', '4'], ['una quinta giusta', '5'], ['una sesta maggiore', '6'], ['una settima minore', '♭7'], ['una settima maggiore', '7']]
    const [txt, f] = rnd(list ? all.filter((a) => list.includes(a[1])) : all)
    const k = rnd(ROOTS)
    const sp = spell(k, `1 ${f}`)
    const ans = sp[1].name
    return Q(`Quale nota si trova ${txt} sopra ${sol(k)}?`, ans, noteWrongs(ans), `${txt[0].toUpperCase() + txt.slice(1)} sopra ${sol(k)}: ${ans}.`)
  },
  // triade sul grado di una tonalità maggiore
  triadKey: (degs = [2, 3, 4, 5, 6, 7]) => () => {
    const k = pickMaj()
    const d = rnd(degs)
    const sc = names(k, '1 2 3 4 5 6 7')
    const q = ['', 'm', 'm', '', '', 'm', '°'][d - 1]
    const ans = letterOf(sc[d - 1]) + q
    const wrongs = [letterOf(sc[d - 1]) + (q === '' ? 'm' : ''), letterOf(sc[d - 1]) + (q === '°' ? 'm' : '°'), ...sc.map((n, i) => letterOf(n) + ['', 'm', 'm', '', '', 'm', '°'][i]).filter((_, i) => i !== d - 1)]
    return Q(`Qual è la triade sul ${ORD[d - 1]} grado di ${sol(k)} maggiore?`, ans, wrongs, `Le triadi di ${sol(k)} maggiore sono ${sc.map((n, i) => letterOf(n) + ['', 'm', 'm', '', '', 'm', '°'][i]).join(' – ')}: il ${ORD[d - 1]} grado è ${ans}.`)
  },
  // accordo di settima sul grado
  seventhKey: (degs = [1, 2, 3, 4, 5, 6, 7]) => () => {
    const k = pickMaj()
    const d = rnd(degs)
    const sc = names(k, '1 2 3 4 5 6 7')
    const qs = ['Δ', 'm7', 'm7', 'Δ', '7', 'm7', 'ø7']
    const ans = letterOf(sc[d - 1]) + qs[d - 1]
    const r = letterOf(sc[d - 1])
    const wrongs = [r + (qs[d - 1] === 'm7' ? 'Δ' : 'm7'), r + (qs[d - 1] === '7' ? 'Δ' : '7'), r + (qs[d - 1] === 'ø7' ? 'm7' : 'ø7'), r + '°7']
    return Q(`Qual è l’accordo di settima sul ${ORD[d - 1]} grado di ${sol(k)} maggiore?`, ans, wrongs, `Le settime di ${sol(k)} maggiore sono ${sc.map((n, i) => letterOf(n) + qs[i]).join(' – ')}.`)
  },
  // il grado di un accordo diatonico dato il nome
  chordDeg: () => {
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const d = rnd([2, 3, 4, 5, 6])
    const rn = ['I', 'ii', 'iii', 'IV', 'V', 'vi'][d - 1]
    const q = ['', 'm', 'm', '', '', 'm'][d - 1]
    const chord = letterOf(sc[d - 1]) + q
    return Q(`In ${sol(k)} maggiore, che grado è l’accordo ${chord}?`, rn, ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'].filter((x) => x !== rn), `${chord} sta sul ${ORD[d - 1]} grado di ${sol(k)} maggiore: ${rn}.`)
  },
  // note di un accordo
  chordNotes: (types) => () => {
    const all = [['', '1 3 5'], ['m', '1 ♭3 5'], ['°', '1 ♭3 ♭5'], ['+', '1 3 ♯5'], ['7', '1 3 5 ♭7'], ['Δ', '1 3 5 7'], ['m7', '1 ♭3 5 ♭7'], ['ø7', '1 ♭3 ♭5 ♭7']]
    const [suf, f] = rnd(types ? all.filter((a) => types.includes(a[0])) : all)
    const k = rnd(ROOTS)
    const sp = spell(k, f)
    const ans = sp.map((n) => n.name).join(' – ')
    const wrongs = []
    for (let tries = 0; tries < 60 && wrongs.length < 5; tries++) {
      const i = 1 + Math.floor(Math.random() * (sp.length - 1))
      const alt = sp.map((n) => n.name)
      const cand = noteWrongs(alt[i]).slice(0, 4)
      alt[i] = rnd(cand)
      const s = alt.join(' – ')
      if (s !== ans) wrongs.push(s)
    }
    return Q(`Quali note formano l’accordo ${k}${suf}?`, ans, wrongs, `${k}${suf}: ${sp.map((n) => `${n.label} = ${n.name}`).join(', ')}.`)
  },
  // qualità dalle note
  chordQuality: () => {
    const all = [['maggiore', '1 3 5'], ['minore', '1 ♭3 5'], ['diminuita', '1 ♭3 ♭5'], ['eccedente', '1 3 ♯5']]
    const [q, f] = rnd(all)
    const k = rnd(ROOTS)
    const ans = spell(k, f).map((n) => n.name).join(' – ')
    const cap = (s) => s[0].toUpperCase() + s.slice(1)
    return Q(`${ans} è una triade...`, q, all.map((a) => a[0]), `${cap(q)}: ${f}.`)
  },
  // V7 di una tonalità, II–V–I
  dom7: () => {
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const ans = letterOf(sc[4]) + '7'
    return Q(`Qual è l’accordo di dominante (V7) in ${sol(k)} maggiore?`, ans, [letterOf(sc[3]) + '7', letterOf(sc[4]) + 'm7', letterOf(sc[1]) + '7', letterOf(sc[6]) + 'ø7'], `Il V7 è la settima di dominante costruita sul quinto grado: ${ans}.`)
  },
  iiVI: () => {
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const L = (i) => letterOf(sc[i])
    const ans = `${L(1)}m7 – ${L(4)}7 – ${L(0)}Δ`
    const wrongs = [`${L(1)}7 – ${L(4)}m7 – ${L(0)}Δ`, `${L(3)}Δ – ${L(4)}7 – ${L(0)}Δ`, `${L(1)}m7 – ${L(3)}7 – ${L(0)}Δ`, `${L(5)}m7 – ${L(4)}7 – ${L(0)}Δ`]
    return Q(`Quali accordi formano il II–V–I in ${sol(k)} maggiore?`, ans, wrongs, `II–V–I: ii (m7) sul secondo grado, V7 sul quinto, Δ sul primo: ${ans}.`)
  },
  // sottodominante e dominante (nome della tonalità)
  neighbours: () => {
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const which = rnd([[4, 'dominante (V)'], [3, 'sottodominante (IV)']])
    const ans = sc[which[0]]
    return Q(`Qual è la nota ${which[1]} di ${sol(k)}?`, ans, noteWrongs(ans, sc), `Il ${which[1]} di ${sol(k)} maggiore è ${ans}.`)
  },
  // modi: nota caratteristica
  modeNote: () => {
    const modes = [['dorico', '1 2 ♭3 4 5 6 ♭7', 6, 'la sesta maggiore'], ['frigio', '1 ♭2 ♭3 4 5 ♭6 ♭7', 2, 'la seconda minore'], ['lidio', '1 2 3 ♯4 5 6 7', 4, 'la quarta aumentata'], ['misolidio', '1 2 3 4 5 6 ♭7', 7, 'la settima minore'], ['locrio', '1 ♭2 ♭3 4 ♭5 ♭6 ♭7', 5, 'la quinta diminuita']]
    const [m, f, d, why] = rnd(modes)
    const k = rnd(ROOTS)
    const sp = spell(k, f)
    const ans = sp[d - 1].name
    return Q(`Qual è ${why} di ${sol(k)} ${m}?`, ans, noteWrongs(ans, sp.map((n) => n.name)), `${sol(k)} ${m}: ${sp.map((n) => n.name).join(' – ')}.`)
  },
  // a quale maggiore appartiene il modo
  modeParent: () => {
    const modes = [['ionico', 1], ['dorico', 2], ['frigio', 3], ['lidio', 4], ['misolidio', 5], ['eolio', 6], ['locrio', 7]]
    const [m, d] = rnd(modes.slice(1))
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const note = sc[d - 1]
    return Q(`${note} ${m} appartiene alla scala maggiore di...`, `${sol(k)} maggiore`, noteWrongs(sol(k), sc).map((x) => `${x} maggiore`), `${note} è il ${ORD[d - 1]} grado di ${sol(k)} maggiore, quindi ${note} ${m} usa le stesse note.`)
  },
  // modo da una scala: "Dorico su ... ?"
  modeOnChord: () => {
    const items = [['m7', 'dorico', '1 2 ♭3 4 5 6 ♭7'], ['7', 'misolidio', '1 2 3 4 5 6 ♭7'], ['Δ', 'ionico', '1 2 3 4 5 6 7'], ['ø7', 'locrio', '1 ♭2 ♭3 4 ♭5 ♭6 ♭7']]
    const [suf, mode] = rnd(items)
    const k = rnd(ROOTS)
    return Q(`Quale modo si usa di solito su ${k}${suf}?`, `${sol(k)} ${mode}`, items.filter((i) => i[1] !== mode).map((i) => `${sol(k)} ${i[1]}`), `Su ${suf === 'ø7' ? 'ø7' : suf} si usa il modo ${mode}.`)
  },
  // alterata
  alt7: () => {
    const k = rnd(ROOTS)
    const up = spell(k, '1 ♭2')[1].name
    const sc = names(k, '1 2 3 4 5 6 7')
    return Q(`Quale scala si usa su ${k}7alt?`, `Minore melodica di ${up}`, [`Minore melodica di ${sol(k)}`, `Minore armonica di ${up}`, `Minore melodica di ${noteWrongs(up, sc)[0]}`], `La scala alterata è il settimo modo della minore melodica: si parte un semitono sopra la fondamentale.`)
  },
  // frigio dominante su V7♭9
  phrygDom: () => {
    const k = pickMin()
    const sc = names(k, '1 2 ♭3 4 5 ♭6 7')
    const v = ROOTS.find((r) => sol(r) === sc[4]) || null
    if (!v) return gen.alt7()
    return Q(`In ${sol(k)} minore, quale scala si usa di solito su ${v}7♭9?`, `${sol(v)} frigio dominante`, [`${sol(v)} lidio dominante`, `${sol(v)} misolidio`, `${sol(v)} dorico ♭2`], 'Il frigio dominante è il quinto modo della minore armonica: ha la ♭2 e la terza maggiore.')
  },
  // pentatonica
  pent: () => {
    const minor = rnd([true, false])
    const k = rnd(ROOTS)
    const f = minor ? '1 ♭3 4 5 ♭7' : '1 2 3 5 6'
    const sp = spell(k, f).map((n) => n.name)
    const ans = sp.join(' – ')
    const wrongs = []
    for (let t = 0; t < 60 && wrongs.length < 4; t++) {
      const alt = [...sp]
      const i = 1 + Math.floor(Math.random() * 4)
      alt[i] = rnd(noteWrongs(alt[i]).slice(0, 4))
      const s = alt.join(' – ')
      if (s !== ans) wrongs.push(s)
    }
    return Q(`Quali note formano la pentatonica ${minor ? 'minore' : 'maggiore'} di ${sol(k)}?`, ans, wrongs, `Pentatonica ${minor ? 'minore: 1 ♭3 4 5 ♭7' : 'maggiore: 1 2 3 5 6'}.`)
  },
  blue: () => {
    const k = rnd(ROOTS)
    const sp = spell(k, '1 ♭3 4 ♭5 5 ♭7')
    const ans = sp[3].name
    return Q(`Qual è la blue note della scala blues di ${sol(k)}?`, ans, noteWrongs(ans, sp.map((n) => n.name)), `La blue note è la quinta abbassata: ${ans}.`)
  },
  // estensioni
  ext: () => {
    const items = [['la 9', '2', '7'], ['la ♭9', '♭2', '7'], ['la 13', '6', '7'], ['la ♯11', '♯4', 'Δ']]
    const [txt, f, suf] = rnd(items)
    const k = rnd(ROOTS)
    const ans = spell(k, `1 ${f}`)[1].name
    return Q(`Qual è ${txt} di ${k}${suf}?`, ans, noteWrongs(ans), `${txt[0].toUpperCase() + txt.slice(1)} è il grado ${f.replace(/[♭♯]/, '')}${/[♭♯]/.test(f) ? ' alterato' : ''} una ottava sopra: ${ans}.`)
  },
  ext7: () => {
    const items = [['7♯9', '♯2'], ['7♭9', '♭2'], ['7♯11', '♯4'], ['7♭13', '♭6']]
    const [suf, f] = rnd(items)
    const k = rnd(ROOTS)
    const ans = spell(k, `1 ${f}`)[1].name
    const label = suf.slice(1)
    return Q(`Quale nota alterata aggiunge ${k}${suf} a ${k}7?`, ans, noteWrongs(ans), `${k}${suf} contiene la ${label}, cioè ${ans}.`)
  },
  // sostituzione tritonale
  tritone: () => {
    const k = rnd(ROOTS)
    const pc = (T(k).pc + 6) % 12
    const ans = ROOTS.find((r) => T(r).pc === pc) + '7'
    const wrongs = [rnd(ROOTS) + '7', ROOTS.find((r) => T(r).pc === (T(k).pc + 5) % 12) + '7', ROOTS.find((r) => T(r).pc === (T(k).pc + 1) % 12) + '7', ROOTS.find((r) => T(r).pc === (T(k).pc + 7) % 12) + '7']
    return Q(`Qual è il sostituto tritonale di ${k}7?`, ans, wrongs, `Il sostituto tritonale ha la radice a un tritono (6 semitoni): ${k}7 → ${ans}.`)
  },
  tritoneNotes: () => {
    const k = rnd(ROOTS)
    const sp = spell(k, '1 3 5 ♭7')
    const ans = `${sp[1].name} – ${sp[3].name}`
    return Q(`Quale tritono ha ${k}7 (terza e settima)?`, ans, [`${sp[0].name} – ${sp[2].name}`, `${sp[0].name} – ${sp[3].name}`, `${sp[2].name} – ${sp[3].name}`], `Terza e settima di ${k}7 sono a distanza di tritono: ${ans}.`)
  },
  // sostituto relativo
  relSub: () => {
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const L = (i) => letterOf(sc[i])
    return Q(`In ${sol(k)} maggiore, quale accordo sostituisce ${L(0)}Δ (è il suo relativo minore)?`, `${L(5)}m7`, [`${L(1)}m7`, `${L(2)}m7`, `${L(4)}7`], `${L(5)}m7 ha tre note in comune con ${L(0)}Δ.`)
  },
  // turnaround e blues
  turnaround: () => {
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const L = (i) => letterOf(sc[i])
    const ans = `${L(0)}Δ – ${L(5)}m7 – ${L(1)}m7 – ${L(4)}7`
    return Q(`Quali accordi formano il turnaround I–vi–ii–V in ${sol(k)} maggiore?`, ans, [`${L(0)}Δ – ${L(3)}Δ – ${L(1)}m7 – ${L(4)}7`, `${L(0)}Δ – ${L(2)}m7 – ${L(5)}m7 – ${L(4)}7`, `${L(0)}Δ – ${L(5)}m7 – ${L(4)}7 – ${L(1)}m7`], `I–vi–ii–V: ${ans}.`)
  },
  anatole: () => {
    const k = rnd(['B♭', 'C', 'F', 'E♭', 'G', 'A♭'])
    const sc = names(k, '1 2 3 4 5 6 7')
    const L = (i) => letterOf(sc[i])
    const ans = `${L(2)}7 – ${L(5)}7 – ${L(1)}7 – ${L(4)}7`
    return Q(`Qual è il ponte dell’Anatole in ${sol(k)} (III7 – VI7 – II7 – V7)?`, ans, [`${L(2)}m7 – ${L(5)}m7 – ${L(1)}m7 – ${L(4)}7`, `${L(0)}7 – ${L(3)}7 – ${L(1)}7 – ${L(4)}7`, `${L(4)}7 – ${L(1)}7 – ${L(5)}7 – ${L(2)}7`], `Il ponte è una catena di dominanti che scende per quinte: ${ans}.`)
  },
  // rivolti
  invName: () => {
    const k = rnd(ROOTS)
    const minor = rnd([true, false])
    const sp = spell(k, minor ? '1 ♭3 5' : '1 3 5')
    const inv = rnd([[1, 'primo'], [2, 'secondo']])
    const chord = `${k}${minor ? 'm' : ''}`
    const bass = letterOf(sp[inv[0]].name)
    return Q(`Come si scrive la triade di ${k}${minor ? ' minore' : ' maggiore'} in ${inv[1]} rivolto?`, `${chord}/${bass}`, [`${chord}/${letterOf(sp[3 - inv[0]].name)}`, `${chord}/${k}`, `${chord}7`], `Nel ${inv[1]} rivolto al basso c’è la ${inv[0] === 1 ? 'terza' : 'quinta'}: ${chord}/${bass}.`)
  },
  // armonia negativa
  negNote: () => {
    const t = rnd(['C', 'F', 'G', 'B♭', 'D', 'E♭', 'A', 'A♭'])
    const flats = ['F', 'B♭', 'E♭', 'A♭'].includes(t)
    const style = t === 'C' ? ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Fa♯', 'Sol', 'La♭', 'La', 'Si♭', 'Si'] : flats ? ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'] : ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si']
    const sc = names(t, '1 2 3 4 5 6 7')
    const i = rnd([1, 2, 3, 4, 5, 6])
    const p = T(t).pc
    const src = sc[i]
    const srcPc = (T(t).pc + [0, 2, 4, 5, 7, 9, 11][i]) % 12
    const mir = (((2 * p + 7 - srcPc) % 12) + 12) % 12
    const ans = style[mir]
    return Q(`Nell’armonia negativa in ${sol(t)} maggiore, in quale nota si specchia ${src}?`, ans, noteWrongs(ans, style), `La nota si riflette attorno all’asse della tonalità: ${src} → ${ans}.`)
  },
  negDom: () => {
    const t = rnd(['C', 'F', 'G', 'B♭', 'D', 'E♭', 'A', 'A♭'])
    const sc = names(t, '1 2 3 4 5 6 7')
    const v = letterOf(sc[4]) + '7'
    const ans = letterOf(sc[3]) + 'm6'
    return Q(`In ${sol(t)} maggiore, qual è il negativo di ${v}?`, ans, [letterOf(sc[3]) + 'm7', letterOf(sc[3]) + '7', letterOf(sc[0]) + 'm6'], `Il negativo del V7 è l’accordo minore con sesta sul quarto grado: ${ans}.`)
  },

  fifth: () => {
    const k = pickMaj()
    const up = rnd([true, false])
    const f = names(k, up ? '1 5' : '1 4')[1]
    return Q(`Qual è la tonalità maggiore a una quinta ${up ? 'sopra' : 'sotto'} ${sol(k)} nel circolo delle quinte?`, `${f} maggiore`, noteWrongs(f).map((x) => `${x} maggiore`), 'Salendo di quinta si aggiunge un diesis; scendendo si aggiunge un bemolle.')
  },
  // dominante secondaria
  secDom: () => {
    for (let t = 0; t < 30; t++) {
      const k = pickMaj()
      const sc = names(k, '1 2 3 4 5 6 7')
      const [d, rn] = rnd([[1, 'ii'], [2, 'iii'], [3, 'IV'], [4, 'V'], [5, 'vi']])
      const id = idOf(sc[d])
      if (!id) continue
      const ans = letterOf(names(id, '1 5')[1]) + '7'
      const target = letterOf(sc[d]) + ['', 'm', 'm', '', '', 'm'][d]
      const wrongs = [letterOf(sc[d]) + '7', letterOf(sc[(d + 3) % 7]) + '7', letterOf(sc[(d + 1) % 7]) + '7', letterOf(sc[(d + 4) % 7]) + '7']
      return Q(`In ${sol(k)} maggiore, qual è il V7/${rn} (la dominante di ${target})?`, ans, wrongs, `La dominante di ${target} è una settima di dominante una quinta sopra: ${ans}.`)
    }
    return gen.dom7()
  },
  // nota estranea alla scala in una dominante secondaria
  secDomNote: () => {
    for (let t = 0; t < 30; t++) {
      const k = rnd(['C', 'G', 'F', 'D', 'B♭', 'A'])
      const sc = names(k, '1 2 3 4 5 6 7')
      const d = rnd([1, 2, 3, 5])
      const id = idOf(sc[d])
      if (!id) continue
      const dom = ROOTS.find((r) => sol(r) === names(id, '1 5')[1])
      if (!dom) continue
      const chord = names(dom, '1 3 5 ♭7')
      const extra = chord.filter((x) => !sc.includes(x))
      if (extra.length !== 1) continue
      return Q(`Quale nota estranea alla scala di ${sol(k)} maggiore contiene ${dom}7?`, extra[0], [...chord.filter((x) => x !== extra[0]), ...noteWrongs(extra[0])], `${dom}7 è formato da ${chord.join(' – ')}: solo ${extra[0]} non appartiene alla scala.`)
    }
    return gen.dom7()
  },
  wholeTone: () => {
    const k = rnd(ROOTS)
    const sp = names(k, '1 2 3 ♯4 ♯5 ♭7')
    const ans = sp.join(' – ')
    const wrongs = []
    for (let t = 0; t < 60 && wrongs.length < 4; t++) {
      const alt = [...sp]
      const i = 1 + Math.floor(Math.random() * 5)
      alt[i] = rnd(noteWrongs(alt[i]).slice(0, 4))
      const s = alt.join(' – ')
      if (s !== ans) wrongs.push(s)
    }
    return Q(`Quali note formano la scala esatonale di ${sol(k)}?`, ans, wrongs, 'La scala esatonale procede per soli toni interi (6 note).')
  },
  bassOf: () => {
    const k = rnd(ROOTS)
    const sp = spell(k, '1 3 5')
    const inv = rnd([1, 2])
    const ans = sp[inv].name
    return Q(`Che nota sta al basso in ${k}/${letterOf(ans)}?`, ans, [sp[0].name, sp[3 - inv].name, ...noteWrongs(ans)], `${k}/${letterOf(ans)} è il ${inv === 1 ? 'primo' : 'secondo'} rivolto: al basso c’è ${ans}.`)
  },
  blues: () => {
    const k = rnd(['C', 'F', 'B♭', 'E♭', 'G', 'A', 'D'])
    const sc = names(k, '1 2 3 4 5 6 7')
    const [bar, di, rn] = rnd([[5, 3, 'IV7'], [9, 4, 'V7'], [10, 3, 'IV7'], [3, 0, 'I7']])
    const ans = letterOf(sc[di]) + '7'
    const wrongs = [letterOf(sc[0]) + '7', letterOf(sc[3]) + '7', letterOf(sc[4]) + '7', letterOf(sc[1]) + 'm7']
    return Q(`Nel blues di 12 battute in ${sol(k)}, quale accordo si suona alla battuta ${bar}?`, ans, wrongs, `Nel blues alla battuta ${bar} c’è il ${rn}: ${ans}.`)
  },
  negTriad: () => {
    const t = rnd(['C', 'F', 'G', 'B♭', 'D', 'E♭', 'A', 'A♭'])
    const sc = names(t, '1 2 3 4 5 6 7')
    const major = rnd([true, false])
    const r = letterOf(sc[0])
    const ans = r + (major ? 'm' : '')
    return Q(`In ${sol(t)} maggiore, qual è il negativo di ${r + (major ? '' : 'm')}?`, ans, [r + '7', letterOf(sc[4]) + (major ? '' : 'm'), letterOf(sc[3]) + (major ? 'm' : '')], 'L’accordo di tonica ha come negativo l’accordo con la stessa radice e qualità opposta: maggiore ↔ minore.')
  },
}
