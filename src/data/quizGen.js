// Generatori di domande per i quiz finali: ogni volta scelgono una tonalità, una nota o un accordo diversi.
import { t, tr } from '../lib/i18n'
// Note e scale in solfeggio, accordi in lettere (come nel resto dell'app).
import { TONICS, IT_NAMES, LETTER_PC, accidental, parseFormula, spellNotes, nn } from '../lib/music'

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
  const right = tr(correct) // le parole fisse delle risposte (maggiore, dorico…) si traducono qui
  const w = uniq(wrongs.map(tr)).filter((x) => x !== right)
  const options = shuffle([right, ...w.slice(0, 3)])
  return { prompt, options, answer: options.indexOf(right), explanation, ...extra }
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
  return (LET[base] || base) + name.slice(base.length)
}
export const spell = (id, formula) => spellNotes(T(id), parseFormula(formula))
export const names = (id, formula) => spell(id, formula).map((n) => n.name)
export const ORD = ['primo', 'secondo', 'terzo', 'quarto', 'quinto', 'sesto', 'settimo']
export const cap = (s) => s[0].toUpperCase() + s.slice(1)
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
  return uniq([...out.filter((x) => !/[♭♯]{2}/.test(x)), ...shuffle(scale), ...shuffle(FILL.map(nn))]).filter((x) => x !== name)
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
    return Q(t('Qual è il {degree} grado della scala di {key} maggiore?', { degree: tr(ORD[d - 1]), key: sol(k) }), ans, noteWrongs(ans, sc), t('La scala di {key} maggiore è {notes}: il {degree} grado è {answer}.', { key: sol(k), notes: sc.join(' – '), degree: tr(ORD[d - 1]), answer: ans }))
  },
  // grado di una scala minore naturale
  degMin: (degs = [2, 3, 4, 5, 6, 7]) => () => {
    const k = pickMin()
    const d = rnd(degs)
    const sc = names(k, '1 2 ♭3 4 5 ♭6 ♭7')
    const ans = sc[d - 1]
    return Q(t('Qual è il {degree} grado della scala di {key} minore naturale?', { degree: tr(ORD[d - 1]), key: sol(k) }), ans, noteWrongs(ans, sc), t('La scala di {key} minore naturale è {notes}: il {degree} grado è {answer}.', { key: sol(k), notes: sc.join(' – '), degree: tr(ORD[d - 1]), answer: ans }))
  },
  // armatura di chiave
  keySig: () => {
    const k = rnd(['G', 'D', 'A', 'E', 'B', 'F', 'B♭', 'E♭', 'A♭', 'D♭'])
    const sharps = ['Fa♯', 'Do♯', 'Sol♯', 'Re♯', 'La♯', 'Mi♯', 'Si♯']
    const flats = ['Si♭', 'Mi♭', 'La♭', 'Re♭', 'Sol♭', 'Do♭', 'Fa♭']
    const nSharp = { G: 1, D: 2, A: 3, E: 4, B: 5 }
    const nFlat = { F: 1, 'B♭': 2, 'E♭': 3, 'A♭': 4, 'D♭': 5 }
    const txt = (n, s) => {
      const list = (s ? sharps : flats).slice(0, n).map(nn).join(', ')
      return s ? t('{n} diesis ({list})', { n, list }) : n === 1 ? t('{n} bemolle ({list})', { n, list }) : t('{n} bemolli ({list})', { n, list })
    }
    const isS = k in nSharp
    const n = isS ? nSharp[k] : nFlat[k]
    const ans = txt(n, isS)
    const wrongs = [txt(n, !isS), txt(n + 1 > 6 ? n - 1 : n + 1, isS), txt(Math.max(1, n - 1), isS), txt(n === 1 ? 2 : n - 1, !isS)]
    return Q(t('Quale armatura ha {key} maggiore?', { key: sol(k) }), ans, wrongs, t('{key} maggiore ha {answer}.', { key: sol(k), answer: ans }))
  },
  // relativa minore / maggiore
  relMinor: () => {
    const k = pickMaj()
    const ans = names(k, '1 2 3 4 5 6 7')[5]
    const sc = names(k, '1 2 3 4 5 6 7')
    return Q(t('Qual è la relativa minore di {key} maggiore?', { key: sol(k) }), t('{note} minore', { note: ans }), [...noteWrongs(ans, sc)].map((x) => t('{note} minore', { note: x })), t('La relativa minore parte dal sesto grado: {key} maggiore → {answer} minore.', { key: sol(k), answer: ans }))
  },
  relMajor: () => {
    const k = pickMin()
    const ans = names(k, '1 2 ♭3 4 5 ♭6 ♭7')[2]
    const sc = names(k, '1 2 ♭3 4 5 ♭6 ♭7')
    return Q(t('Qual è la relativa maggiore di {key} minore?', { key: sol(k) }), t('{note} maggiore', { note: ans }), noteWrongs(ans, sc).map((x) => t('{note} maggiore', { note: x })), t('La relativa maggiore parte dal terzo grado: {key} minore → {answer} maggiore.', { key: sol(k), answer: ans }))
  },
  // intervalli sopra una nota
  interval: (list) => () => {
    const all = [['una seconda maggiore', '2'], ['una terza minore', '♭3'], ['una terza maggiore', '3'], ['una quarta giusta', '4'], ['una quinta giusta', '5'], ['una sesta maggiore', '6'], ['una settima minore', '♭7'], ['una settima maggiore', '7']]
    const [txt, f] = rnd(list ? all.filter((a) => list.includes(a[1])) : all)
    const k = rnd(ROOTS)
    const sp = spell(k, `1 ${f}`)
    const ans = sp[1].name
    return Q(t('Quale nota si trova {interval} sopra {key}?', { interval: tr(txt), key: sol(k) }), ans, noteWrongs(ans), t('{interval} sopra {key}: {answer}.', { interval: cap(tr(txt)), key: sol(k), answer: ans }))
  },
  // triade sul grado di una tonalità maggiore
  triadKey: (degs = [2, 3, 4, 5, 6, 7]) => () => {
    const k = pickMaj()
    const d = rnd(degs)
    const sc = names(k, '1 2 3 4 5 6 7')
    const q = ['', 'm', 'm', '', '', 'm', '°'][d - 1]
    const ans = letterOf(sc[d - 1]) + q
    const wrongs = [letterOf(sc[d - 1]) + (q === '' ? 'm' : ''), letterOf(sc[d - 1]) + (q === '°' ? 'm' : '°'), ...sc.map((n, i) => letterOf(n) + ['', 'm', 'm', '', '', 'm', '°'][i]).filter((_, i) => i !== d - 1)]
    return Q(t('Qual è la triade sul {degree} grado di {key} maggiore?', { degree: tr(ORD[d - 1]), key: sol(k) }), ans, wrongs, t('Le triadi di {key} maggiore sono {notes}: il {degree} grado è {answer}.', { key: sol(k), notes: sc.map((n, i) => letterOf(n) + ['', 'm', 'm', '', '', 'm', '°'][i]).join(' – '), degree: tr(ORD[d - 1]), answer: ans }))
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
    return Q(t('Qual è l’accordo di settima sul {degree} grado di {key} maggiore?', { degree: tr(ORD[d - 1]), key: sol(k) }), ans, wrongs, t('Le settime di {key} maggiore sono {notes}.', { key: sol(k), notes: sc.map((n, i) => letterOf(n) + qs[i]).join(' – ') }))
  },
  // il grado di un accordo diatonico dato il nome
  chordDeg: () => {
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const d = rnd([2, 3, 4, 5, 6])
    const rn = ['I', 'ii', 'iii', 'IV', 'V', 'vi'][d - 1]
    const q = ['', 'm', 'm', '', '', 'm'][d - 1]
    const chord = letterOf(sc[d - 1]) + q
    return Q(t('In {key} maggiore, che grado è l’accordo {chord}?', { key: sol(k), chord }), rn, ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'].filter((x) => x !== rn), t('{chord} sta sul {degree} grado di {key} maggiore: {rn}.', { chord, degree: tr(ORD[d - 1]), key: sol(k), rn }))
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
    return Q(t('Quali note formano l’accordo {root}{suf}?', { root: k, suf }), ans, wrongs, t('{chord}: {parts}.', { chord: `${k}${suf}`, parts: sp.map((n) => `${n.label} = ${n.name}`).join(', ') }))
  },
  // qualità dalle note
  chordQuality: () => {
    const all = [['maggiore', '1 3 5'], ['minore', '1 ♭3 5'], ['diminuita', '1 ♭3 ♭5'], ['eccedente', '1 3 ♯5']]
    const [q, f] = rnd(all)
    const k = rnd(ROOTS)
    const ans = spell(k, f).map((n) => n.name).join(' – ')
    return Q(t('{answer} è una triade...', { answer: ans }), q, all.map((a) => a[0]), t('{quality}: {formula}.', { quality: cap(tr(q)), formula: f }))
  },
  // V7 di una tonalità, II–V–I
  dom7: () => {
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const ans = letterOf(sc[4]) + '7'
    return Q(t('Qual è l’accordo di dominante (V7) in {key} maggiore?', { key: sol(k) }), ans, [letterOf(sc[3]) + '7', letterOf(sc[4]) + 'm7', letterOf(sc[1]) + '7', letterOf(sc[6]) + 'ø7'], t('Il V7 è la settima di dominante costruita sul quinto grado: {answer}.', { answer: ans }))
  },
  iiVI: () => {
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const L = (i) => letterOf(sc[i])
    const ans = `${L(1)}m7 – ${L(4)}7 – ${L(0)}Δ`
    const wrongs = [`${L(1)}7 – ${L(4)}m7 – ${L(0)}Δ`, `${L(3)}Δ – ${L(4)}7 – ${L(0)}Δ`, `${L(1)}m7 – ${L(3)}7 – ${L(0)}Δ`, `${L(5)}m7 – ${L(4)}7 – ${L(0)}Δ`]
    return Q(t('Quali accordi formano il II–V–I in {key} maggiore?', { key: sol(k) }), ans, wrongs, t('II–V–I: ii (m7) sul secondo grado, V7 sul quinto, Δ sul primo: {answer}.', { answer: ans }))
  },
  // sottodominante e dominante (nome della tonalità)
  neighbours: () => {
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const which = rnd([[4, 'dominante (V)'], [3, 'sottodominante (IV)']])
    const ans = sc[which[0]]
    return Q(t('Qual è la nota {role} di {key}?', { role: tr(which[1]), key: sol(k) }), ans, noteWrongs(ans, sc), t('Il {role} di {key} maggiore è {answer}.', { role: tr(which[1]), key: sol(k), answer: ans }))
  },
  // modi: nota caratteristica
  modeNote: () => {
    const modes = [['dorico', '1 2 ♭3 4 5 6 ♭7', 6, 'la sesta maggiore'], ['frigio', '1 ♭2 ♭3 4 5 ♭6 ♭7', 2, 'la seconda minore'], ['lidio', '1 2 3 ♯4 5 6 7', 4, 'la quarta aumentata'], ['misolidio', '1 2 3 4 5 6 ♭7', 7, 'la settima minore'], ['locrio', '1 ♭2 ♭3 4 ♭5 ♭6 ♭7', 5, 'la quinta diminuita']]
    const [m, f, d, why] = rnd(modes)
    const k = rnd(ROOTS)
    const sp = spell(k, f)
    const ans = sp[d - 1].name
    return Q(t('Qual è {trait} di {key} {mode}?', { trait: tr(why), key: sol(k), mode: tr(m) }), ans, noteWrongs(ans, sp.map((n) => n.name)), t('{key} {mode}: {notes}.', { key: sol(k), mode: tr(m), notes: sp.map((n) => n.name).join(' – ') }))
  },
  // a quale maggiore appartiene il modo
  modeParent: () => {
    const modes = [['ionico', 1], ['dorico', 2], ['frigio', 3], ['lidio', 4], ['misolidio', 5], ['eolio', 6], ['locrio', 7]]
    const [m, d] = rnd(modes.slice(1))
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const note = sc[d - 1]
    return Q(t('{note} {mode} appartiene alla scala maggiore di...', { note, mode: tr(m) }), t('{note} maggiore', { note: sol(k) }), noteWrongs(sol(k), sc).map((x) => t('{note} maggiore', { note: x })), t('{note} è il {degree} grado di {key} maggiore, quindi {note2} {mode} usa le stesse note.', { note, degree: tr(ORD[d - 1]), key: sol(k), note2: note, mode: tr(m) }))
  },
  // modo da una scala: "Dorico su ... ?"
  modeOnChord: () => {
    const items = [['m7', 'dorico', '1 2 ♭3 4 5 6 ♭7'], ['7', 'misolidio', '1 2 3 4 5 6 ♭7'], ['Δ', 'ionico', '1 2 3 4 5 6 7'], ['ø7', 'locrio', '1 ♭2 ♭3 4 ♭5 ♭6 ♭7']]
    const [suf, mode] = rnd(items)
    const k = rnd(ROOTS)
    return Q(t('Quale modo si usa di solito su {root}{suf}?', { root: k, suf }), t('{key} {mode}', { key: sol(k), mode: tr(mode) }), items.filter((i) => i[1] !== mode).map((i) => t('{key} {mode}', { key: sol(k), mode: tr(i[1]) })), t('Su {suf} si usa il modo {mode}.', { suf: suf === 'ø7' ? 'ø7' : suf, mode: tr(mode) }))
  },
  // alterata
  alt7: () => {
    const k = rnd(ROOTS)
    const up = spell(k, '1 ♭2')[1].name
    const sc = names(k, '1 2 3 4 5 6 7')
    return Q(t('Quale scala si usa su {root}7alt?', { root: k }), t('Minore melodica di {direction}', { direction: up }), [t('Minore melodica di {key}', { key: sol(k) }), t('Minore armonica di {direction}', { direction: up }), t('Minore melodica di {note}', { note: noteWrongs(up, sc)[0] })], t('La scala alterata è il settimo modo della minore melodica: si parte un semitono sopra la fondamentale.'))
  },
  // frigio dominante su V7♭9
  phrygDom: () => {
    const k = pickMin()
    const sc = names(k, '1 2 ♭3 4 5 ♭6 7')
    const v = ROOTS.find((r) => sol(r) === sc[4]) || null
    if (!v) return gen.alt7()
    return Q(t('In {key} minore, quale scala si usa di solito su {chord}7♭9?', { key: sol(k), chord: v }), t('{note} frigio dominante', { note: sol(v) }), [t('{note} lidio dominante', { note: sol(v) }), t('{note} misolidio', { note: sol(v) }), t('{key} dorico ♭2', { key: sol(v) })], t('Il frigio dominante è il quinto modo della minore armonica: ha la ♭2 e la terza maggiore.'))
  },
  // pentatonica
  pent: () => {
    const minor = rnd([true, false])
    const k = rnd(ROOTS)
    const f = minor ? '1 ♭3 4 5 ♭7' : '1 2 3 5 6'
    const sp = spell(k, f).map((n) => n.name)
    const ans = sp.join(' – ')
    const wrongs = []
    for (let tries = 0; tries < 60 && wrongs.length < 4; tries++) {
      const alt = [...sp]
      const i = 1 + Math.floor(Math.random() * 4)
      alt[i] = rnd(noteWrongs(alt[i]).slice(0, 4))
      const s = alt.join(' – ')
      if (s !== ans) wrongs.push(s)
    }
    return Q(t('Quali note formano la pentatonica {quality} di {key}?', { quality: tr(minor ? 'minore' : 'maggiore'), key: sol(k) }), ans, wrongs, minor ? t('Pentatonica minore: 1 ♭3 4 5 ♭7.') : t('Pentatonica maggiore: 1 2 3 5 6.'))
  },
  blue: () => {
    const k = rnd(ROOTS)
    const sp = spell(k, '1 ♭3 4 ♭5 5 ♭7')
    const ans = sp[3].name
    return Q(t('Qual è la blue note della scala blues di {key}?', { key: sol(k) }), ans, noteWrongs(ans, sp.map((n) => n.name)), t('La blue note è la quinta abbassata: {answer}.', { answer: ans }))
  },
  // estensioni
  ext: () => {
    const items = [['la 9', '2', '7'], ['la ♭9', '♭2', '7'], ['la 13', '6', '7'], ['la ♯11', '♯4', 'Δ']]
    const [txt, f, suf] = rnd(items)
    const k = rnd(ROOTS)
    const ans = spell(k, `1 ${f}`)[1].name
    return Q(t('Qual è {interval} di {root}{suf}?', { interval: tr(txt), root: k, suf }), ans, noteWrongs(ans), /[♭♯]/.test(f) ? t('{ext} è il grado {n} alterato, un’ottava sopra: {answer}.', { ext: cap(tr(txt)), n: f.replace(/[♭♯]/, ''), answer: ans }) : t('{ext} è il grado {n}, un’ottava sopra: {answer}.', { ext: cap(tr(txt)), n: f, answer: ans }))
  },
  ext7: () => {
    const items = [['7♯9', '♯2'], ['7♭9', '♭2'], ['7♯11', '♯4'], ['7♭13', '♭6']]
    const [suf, f] = rnd(items)
    const k = rnd(ROOTS)
    const ans = spell(k, `1 ${f}`)[1].name
    const label = suf.slice(1)
    return Q(t('Quale nota alterata aggiunge {root}{suf} a {root2}7?', { root: k, suf, root2: k }), ans, noteWrongs(ans), t('{root}{suf} contiene la {label}, cioè {answer}.', { root: k, suf, label, answer: ans }))
  },
  // sostituzione tritonale
  tritone: () => {
    const k = rnd(ROOTS)
    const pc = (T(k).pc + 6) % 12
    const ans = ROOTS.find((r) => T(r).pc === pc) + '7'
    const wrongs = [rnd(ROOTS) + '7', ROOTS.find((r) => T(r).pc === (T(k).pc + 5) % 12) + '7', ROOTS.find((r) => T(r).pc === (T(k).pc + 1) % 12) + '7', ROOTS.find((r) => T(r).pc === (T(k).pc + 7) % 12) + '7']
    return Q(t('Qual è il sostituto tritonale di {root}7?', { root: k }), ans, wrongs, t('Il sostituto tritonale ha la radice a un tritono (6 semitoni): {root}7 → {answer}.', { root: k, answer: ans }))
  },
  tritoneNotes: () => {
    const k = rnd(ROOTS)
    const sp = spell(k, '1 3 5 ♭7')
    const ans = `${sp[1].name} – ${sp[3].name}`
    return Q(t('Quale tritono ha {root}7 (terza e settima)?', { root: k }), ans, [`${sp[0].name} – ${sp[2].name}`, `${sp[0].name} – ${sp[3].name}`, `${sp[2].name} – ${sp[3].name}`], t('Terza e settima di {root}7 sono a distanza di tritono: {answer}.', { root: k, answer: ans }))
  },
  // sostituto relativo
  relSub: () => {
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const L = (i) => letterOf(sc[i])
    return Q(t('In {key} maggiore, quale accordo sostituisce {chord}Δ (è il suo relativo minore)?', { key: sol(k), chord: L(0) }), `${L(5)}m7`, [`${L(1)}m7`, `${L(2)}m7`, `${L(4)}7`], t('{chord}m7 ha tre note in comune con {chord2}Δ.', { chord: L(5), chord2: L(0) }))
  },
  // turnaround e blues
  turnaround: () => {
    const k = pickMaj()
    const sc = names(k, '1 2 3 4 5 6 7')
    const L = (i) => letterOf(sc[i])
    const ans = `${L(0)}Δ – ${L(5)}m7 – ${L(1)}m7 – ${L(4)}7`
    return Q(t('Quali accordi formano il turnaround I–vi–ii–V in {key} maggiore?', { key: sol(k) }), ans, [`${L(0)}Δ – ${L(3)}Δ – ${L(1)}m7 – ${L(4)}7`, `${L(0)}Δ – ${L(2)}m7 – ${L(5)}m7 – ${L(4)}7`, `${L(0)}Δ – ${L(5)}m7 – ${L(4)}7 – ${L(1)}m7`], t('I–vi–ii–V: {answer}.', { answer: ans }))
  },
  anatole: () => {
    const k = rnd(['B♭', 'C', 'F', 'E♭', 'G', 'A♭'])
    const sc = names(k, '1 2 3 4 5 6 7')
    const L = (i) => letterOf(sc[i])
    const ans = `${L(2)}7 – ${L(5)}7 – ${L(1)}7 – ${L(4)}7`
    return Q(t('Qual è il ponte dell’Anatole in {key} (III7 – VI7 – II7 – V7)?', { key: sol(k) }), ans, [`${L(2)}m7 – ${L(5)}m7 – ${L(1)}m7 – ${L(4)}7`, `${L(0)}7 – ${L(3)}7 – ${L(1)}7 – ${L(4)}7`, `${L(4)}7 – ${L(1)}7 – ${L(5)}7 – ${L(2)}7`], t('Il ponte è una catena di dominanti che scende per quinte: {answer}.', { answer: ans }))
  },
  // rivolti
  invName: () => {
    const k = rnd(ROOTS)
    const minor = rnd([true, false])
    const sp = spell(k, minor ? '1 ♭3 5' : '1 3 5')
    const inv = rnd([[1, 'primo'], [2, 'secondo']])
    const chord = `${k}${minor ? 'm' : ''}`
    const bass = letterOf(sp[inv[0]].name)
    return Q(t('Come si scrive la triade di {root} {quality} in {inv} rivolto?', { root: k, quality: tr(minor ? 'minore' : 'maggiore'), inv: tr(inv[1]) }), `${chord}/${bass}`, [`${chord}/${letterOf(sp[3 - inv[0]].name)}`, `${chord}/${k}`, `${chord}7`], t('Nel {inv} rivolto al basso c’è la {note}: {chord}/{bass}.', { inv: tr(inv[1]), note: tr(inv[0] === 1 ? 'terza' : 'quinta'), chord, bass }))
  },
  // armonia negativa
  negNote: () => {
    const ton = rnd(['C', 'F', 'G', 'B♭', 'D', 'E♭', 'A', 'A♭'])
    const flats = ['F', 'B♭', 'E♭', 'A♭'].includes(ton)
    const style = ton === 'C' ? ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Fa♯', 'Sol', 'La♭', 'La', 'Si♭', 'Si'] : flats ? ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'] : ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si']
    const sc = names(ton, '1 2 3 4 5 6 7')
    const i = rnd([1, 2, 3, 4, 5, 6])
    const p = T(ton).pc
    const src = sc[i]
    const srcPc = (T(ton).pc + [0, 2, 4, 5, 7, 9, 11][i]) % 12
    const mir = (((2 * p + 7 - srcPc) % 12) + 12) % 12
    const ans = nn(style[mir])
    return Q(t('Nell’armonia negativa in {key} maggiore, in quale nota si specchia {note}?', { key: sol(ton), note: src }), ans, noteWrongs(ans, style.map(nn)), t('La nota si riflette attorno all’asse della tonalità: {note} → {answer}.', { note: src, answer: ans }))
  },
  negDom: () => {
    const ton = rnd(['C', 'F', 'G', 'B♭', 'D', 'E♭', 'A', 'A♭'])
    const sc = names(ton, '1 2 3 4 5 6 7')
    const v = letterOf(sc[4]) + '7'
    const ans = letterOf(sc[3]) + 'm6'
    return Q(t('In {key} maggiore, qual è il negativo di {chord}?', { key: sol(ton), chord: v }), ans, [letterOf(sc[3]) + 'm7', letterOf(sc[3]) + '7', letterOf(sc[0]) + 'm6'], t('Il negativo del V7 è l’accordo minore con sesta sul quarto grado: {answer}.', { answer: ans }))
  },

  fifth: () => {
    const k = pickMaj()
    const up = rnd([true, false])
    const f = names(k, up ? '1 5' : '1 4')[1]
    return Q(t('Qual è la tonalità maggiore a una quinta {direction} {key} nel circolo delle quinte?', { direction: tr(up ? 'sopra' : 'sotto'), key: sol(k) }), t('{note} maggiore', { note: f }), noteWrongs(f).map((x) => t('{note} maggiore', { note: x })), t('Salendo di quinta si aggiunge un diesis; scendendo si aggiunge un bemolle.'))
  },
  // dominante secondaria
  secDom: () => {
    for (let tries = 0; tries < 30; tries++) {
      const k = pickMaj()
      const sc = names(k, '1 2 3 4 5 6 7')
      const [d, rn] = rnd([[1, 'ii'], [2, 'iii'], [3, 'IV'], [4, 'V'], [5, 'vi']])
      const id = idOf(sc[d])
      if (!id) continue
      const ans = letterOf(names(id, '1 5')[1]) + '7'
      const target = letterOf(sc[d]) + ['', 'm', 'm', '', '', 'm'][d]
      const wrongs = [letterOf(sc[d]) + '7', letterOf(sc[(d + 3) % 7]) + '7', letterOf(sc[(d + 1) % 7]) + '7', letterOf(sc[(d + 4) % 7]) + '7']
      return Q(t('In {key} maggiore, qual è il V7/{rn} (la dominante di {chord})?', { key: sol(k), rn, chord: target }), ans, wrongs, t('La dominante di {chord} è una settima di dominante una quinta sopra: {answer}.', { chord: target, answer: ans }))
    }
    return gen.dom7()
  },
  // nota estranea alla scala in una dominante secondaria
  secDomNote: () => {
    for (let tries = 0; tries < 30; tries++) {
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
      return Q(t('Quale nota estranea alla scala di {key} maggiore contiene {dom}7?', { key: sol(k), dom }), extra[0], [...chord.filter((x) => x !== extra[0]), ...noteWrongs(extra[0])], t('{dom}7 è formato da {notes}: solo {note} non appartiene alla scala.', { dom, notes: chord.join(' – '), note: extra[0] }))
    }
    return gen.dom7()
  },
  wholeTone: () => {
    const k = rnd(ROOTS)
    const sp = names(k, '1 2 3 ♯4 ♯5 ♭7')
    const ans = sp.join(' – ')
    const wrongs = []
    for (let tries = 0; tries < 60 && wrongs.length < 4; tries++) {
      const alt = [...sp]
      const i = 1 + Math.floor(Math.random() * 5)
      alt[i] = rnd(noteWrongs(alt[i]).slice(0, 4))
      const s = alt.join(' – ')
      if (s !== ans) wrongs.push(s)
    }
    return Q(t('Quali note formano la scala esatonale di {key}?', { key: sol(k) }), ans, wrongs, t('La scala esatonale procede per soli toni interi (6 note).'))
  },
  bassOf: () => {
    const k = rnd(ROOTS)
    const sp = spell(k, '1 3 5')
    const inv = rnd([1, 2])
    const ans = sp[inv].name
    return Q(t('Che nota sta al basso in {root}/{ans}?', { root: k, ans: letterOf(ans) }), ans, [sp[0].name, sp[3 - inv].name, ...noteWrongs(ans)], t('{root}/{ans} è il {inv} rivolto: al basso c’è {answer}.', { root: k, ans: letterOf(ans), inv: tr(inv === 1 ? 'primo' : 'secondo'), answer: ans }))
  },
  blues: () => {
    const k = rnd(['C', 'F', 'B♭', 'E♭', 'G', 'A', 'D'])
    const sc = names(k, '1 2 3 4 5 6 7')
    const [bar, di, rn] = rnd([[5, 3, 'IV7'], [9, 4, 'V7'], [10, 3, 'IV7'], [3, 0, 'I7']])
    const ans = letterOf(sc[di]) + '7'
    const wrongs = [letterOf(sc[0]) + '7', letterOf(sc[3]) + '7', letterOf(sc[4]) + '7', letterOf(sc[1]) + 'm7']
    return Q(t('Nel blues di 12 battute in {key}, quale accordo si suona alla battuta {bar}?', { key: sol(k), bar }), ans, wrongs, t('Nel blues alla battuta {bar} c’è il {rn}: {answer}.', { bar, rn, answer: ans }))
  },
  negTriad: () => {
    const ton = rnd(['C', 'F', 'G', 'B♭', 'D', 'E♭', 'A', 'A♭'])
    const sc = names(ton, '1 2 3 4 5 6 7')
    const major = rnd([true, false])
    const r = letterOf(sc[0])
    const ans = r + (major ? 'm' : '')
    return Q(t('In {key} maggiore, qual è il negativo di {chord}?', { key: sol(ton), chord: r + (major ? '' : 'm') }), ans, [r + '7', letterOf(sc[4]) + (major ? '' : 'm'), letterOf(sc[3]) + (major ? 'm' : '')], t('L’accordo di tonica ha come negativo l’accordo con la stessa radice e qualità opposta: maggiore ↔ minore.'))
  },
}
