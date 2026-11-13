// Esercizi "Applica" (Modello C), versione provvisoria.
// C1 'prog': percorri una progressione, accordo per accordo, toccando le note sullo strumento.
// C2 'harm': armonizza una melodia scegliendo l'accordo per ogni battuta.
// Capitolo 1 (solo scale) non ha un passo "Applica" di questo tipo: resta come prima.
import { TONICS, parseFormula, spellNotes, baseMidi } from '../lib/music'

const ROLE = {
  1: 'fondamentale', 3: 'terza maggiore', '♭3': 'terza minore', 4: 'quarta giusta', 5: 'quinta giusta', '♭5': 'quinta diminuita',
  '♭♭7': 'settima diminuita', 6: 'sesta maggiore', 7: 'settima maggiore', '♭7': 'settima minore', 9: 'nona maggiore', '♭9': 'nona minore',
}

// chord(simbolo, funzione, tonica, formula, nome, { bass })
const chord = (sym, fn, rootId, formula, name, opts = {}) => {
  const root = TONICS.find((t) => t.id === rootId)
  const spelled = spellNotes(root, parseFormula(formula))
  const expected = spelled.map((n) => ({ pc: n.pc, label: n.label, deg: n.deg, name: n.name, role: ROLE[n.label] || n.label }))
  const base = baseMidi(root)
  const midis = spelled.map((n) => base + ((n.pc - root.pc + 12) % 12)).sort((a, b) => a - b)
  if (opts.bass != null) {
    const bi = midis.findIndex((m) => m % 12 === opts.bass)
    if (bi > 0) midis.unshift(midis.splice(bi, 1)[0] - 12)
  }
  return { sym, fn, name, expected, midis, bassPc: opts.bass ?? null, why: opts.why || '' }
}
const prog = (prompt, chords, extra = {}) => ({ kind: 'prog', prompt, chords, ...extra })

// altezza MIDI di un gradino del pentagramma (Mi4 = 0, scala di Do)
const LET = [0, 2, 4, 5, 7, 9, 11]
export const midiOfStep = (step) => {
  const idx = 2 + step // 0 = Do
  const oct = 4 + Math.floor(idx / 7)
  return 12 * (oct + 1) + LET[((idx % 7) + 7) % 7]
}

const CH = {
  // capitolo 1: tre scale da suonare sullo strumento (stesso modello della progressione, ma ogni voce è una scala)
  1: [prog('Suona le scale: Sol maggiore – Fa maggiore – La minore naturale – Do minore armonico', [
    chord('Sol', '', 'G', '1 2 3 4 5 6 7', 'Sol maggiore', { why: 'Ha un solo diesis, il Fa♯.' }),
    chord('Fa', '', 'F', '1 2 3 4 5 6 7', 'Fa maggiore', { why: 'Ha un solo bemolle, il Si♭.' }),
    chord('Lam', '', 'A', '1 2 ♭3 4 5 ♭6 ♭7', 'La minore naturale', { why: 'Ha le stesse note di Do maggiore, ma parte dal La.' }),
    chord('Dom Arm', '', 'C', '1 2 ♭3 4 5 ♭6 7', 'Do minore armonico', { why: 'È la minore naturale con il settimo grado alzato: tra il La♭ e il Si c’è un intervallo di tre semitoni.' }),
  ], { scale: true })],
  2: [prog('Suona la progressione Do – La minore – Fa – Sol', [
    chord('C', 'I', 'C', '1 3 5', 'Do maggiore'),
    chord('Am', 'vi', 'A', '1 ♭3 5', 'La minore'),
    chord('F', 'IV', 'F', '1 3 5', 'Fa maggiore'),
    chord('G', 'V', 'G', '1 3 5', 'Sol maggiore'),
  ])],
  3: [prog('Suona gli accordi di Do maggiore: I – II – V – I', [
    chord('C', 'I', 'C', '1 3 5', 'Do maggiore'),
    chord('Dm', 'ii', 'D', '1 ♭3 5', 'Re minore'),
    chord('G', 'V', 'G', '1 3 5', 'Sol maggiore'),
    chord('C', 'I', 'C', '1 3 5', 'Do maggiore'),
  ])],
  4: [{
    kind: 'harm',
    prompt: 'Armonizza la melodia: scegli un accordo per ogni battuta',
    melody: [{ step: 0, dur: 'half', label: 'Mi' }, { step: 2, dur: 'half', label: 'Sol' }, { step: 1, dur: 'half', label: 'Fa' }, { step: 3, dur: 'half', label: 'La' }, { step: 4, dur: 'half', label: 'Si' }, { step: 6, dur: 'half', label: 'Re' }],
    options: [chord('C', 'I', 'C', '1 3 5', 'Do maggiore'), chord('F', 'IV', 'F', '1 3 5', 'Fa maggiore'), chord('G', 'V', 'G', '1 3 5', 'Sol maggiore'), chord('Am', 'vi', 'A', '1 ♭3 5', 'La minore')],
    answer: [0, 1, 2],
    why: ['Mi e Sol fanno parte di Do maggiore.', 'Fa e La fanno parte di Fa maggiore.', 'Si e Re fanno parte di Sol maggiore.'],
  }],
  5: [prog('Costruisci una linea di basso: tocca la nota più bassa giusta per ogni accordo', [
    chord('C', 'I', 'C', '1 3 5', 'Do maggiore', { bass: 0 }),
    chord('G/B', 'V rivolto', 'G', '1 3 5', 'Sol maggiore con il Si al basso', { bass: 11, why: 'Il basso sale per gradi: Do, Si, La, Sol.' }),
    chord('Am', 'vi', 'A', '1 ♭3 5', 'La minore', { bass: 9 }),
    chord('G', 'V', 'G', '1 3 5', 'Sol maggiore', { bass: 7 }),
  ])],
  6: [prog('Arricchisci il giro con la dominante secondaria', [
    chord('C', 'I', 'C', '1 3 5', 'Do maggiore'),
    chord('A7', 'V7/ii', 'A', '1 3 5 ♭7', 'La settima', { why: 'È la dominante di Re minore.' }),
    chord('Dm', 'ii', 'D', '1 ♭3 5', 'Re minore'),
    chord('G7', 'V', 'G', '1 3 5 ♭7', 'Sol settima'),
  ])],
  7: [prog('Modula da Do maggiore a Sol maggiore', [
    chord('C', 'I', 'C', '1 3 5', 'Do maggiore'),
    chord('Am', 'vi / ii', 'A', '1 ♭3 5', 'La minore', { why: 'È l’accordo pivot: appartiene a tutte e due le tonalità.' }),
    chord('D7', 'V di Sol', 'D', '1 3 5 ♭7', 'Re settima'),
    chord('G', 'I di Sol', 'G', '1 3 5', 'Sol maggiore'),
  ])],
  8: [prog('Prendi in prestito un accordo dal modo minore', [
    chord('C', 'I', 'C', '1 3 5', 'Do maggiore'),
    chord('F', 'IV', 'F', '1 3 5', 'Fa maggiore'),
    chord('Fm', '♭IV', 'F', '1 ♭3 5', 'Fa minore', { why: 'Preso in prestito da Do minore.' }),
    chord('C', 'I', 'C', '1 3 5', 'Do maggiore'),
  ])],
  9: [prog('Suona la scala giusta su ogni accordo: G7♭9 – F7♯11 – Aø7 – C7alt', [
    chord('G7♭9', '', 'G', '1 ♭2 3 4 5 ♭6 ♭7', 'Sol frigio dominante', { why: 'È la dominante del minore: ♭2 e ♭6 sono le sue note caratteristiche.' }),
    chord('F7♯11', '', 'F', '1 2 3 ♯4 5 6 ♭7', 'Fa lidio dominante', { why: 'Il ♯4 corrisponde alla ♯11 dell’accordo.' }),
    chord('Aø7', '', 'A', '1 2 ♭3 4 ♭5 ♭6 ♭7', 'La locrio ♮2', { why: 'Un locrio con la seconda maggiore: più dolce sul semidiminuito.' }),
    chord('C7alt', '', 'C', '1 ♭2 ♯2 3 ♭5 ♭6 ♭7', 'Do alterata', { why: 'Contiene ♭9, ♯9, ♭5 e ♭13: tutte le alterazioni della dominante.' }),
  ], { scale: true })],
  10: [prog('Suona gli accordi su cui improvvisi con la pentatonica di La minore', [
    chord('Am7', 'im7', 'A', '1 ♭3 5 ♭7', 'La minore settima'),
    chord('Dm7', 'ivm7', 'D', '1 ♭3 5 ♭7', 'Re minore settima'),
    chord('E7', 'V', 'E', '1 3 5 ♭7', 'Mi settima'),
    chord('Am7', 'im7', 'A', '1 ♭3 5 ♭7', 'La minore settima'),
  ])],
  11: [prog('Inserisci l’accordo cromatico nel giro', [
    chord('C', 'I', 'C', '1 3 5', 'Do maggiore'),
    chord('C♯dim7', '♯I°', 'C♯', '1 ♭3 ♭5 ♭♭7', 'Do♯ diminuito settima'),
    chord('Dm', 'ii', 'D', '1 ♭3 5', 'Re minore'),
    chord('G7', 'V', 'G', '1 3 5 ♭7', 'Sol settima'),
  ])],
  12: [prog('Arricchisci il II–V–I con le estensioni', [
    chord('Dm7', 'iim7', 'D', '1 ♭3 5 ♭7', 'Re minore settima'),
    chord('G9', 'V', 'G', '1 3 5 ♭7 9', 'Sol nona'),
    chord('Cmaj9', 'I', 'C', '1 3 5 7 9', 'Do maggiore nona'),
  ])],
  13: [prog('Riarmonizza il giro con una sostituzione di tritono', [
    chord('C', 'I', 'C', '1 3 5', 'Do maggiore'),
    chord('Am', 'vi', 'A', '1 ♭3 5', 'La minore'),
    chord('Dm', 'ii', 'D', '1 ♭3 5', 'Re minore'),
    chord('D♭7', '♭II7', 'D♭', '1 3 5 ♭7', 'Re♭ settima', { why: 'Sostituisce Sol settima: hanno in comune Fa e Si.' }),
  ])],
  14: [prog('Suona il blues in Fa', [
    chord('F7', 'I7', 'F', '1 3 5 ♭7', 'Fa settima'),
    chord('B♭7', 'IV7', 'B♭', '1 3 5 ♭7', 'Si♭ settima'),
    chord('F7', 'I7', 'F', '1 3 5 ♭7', 'Fa settima'),
    chord('C7', 'V7', 'C', '1 3 5 ♭7', 'Do settima'),
  ])],
  15: [prog('Suona il ponte dell’Anatole', [
    chord('D7', 'III7', 'D', '1 3 5 ♭7', 'Re settima'),
    chord('G7', 'VI7', 'G', '1 3 5 ♭7', 'Sol settima'),
    chord('C7', 'II7', 'C', '1 3 5 ♭7', 'Do settima'),
    chord('F7', 'V7', 'F', '1 3 5 ♭7', 'Fa settima'),
  ])],
  16: [prog('Suona una frase con accordi per quarte che salgono', [
    chord('D·G·C', '', 'D', '1 4 ♭7', 'Re – Sol – Do'),
    chord('E·A·D', '', 'E', '1 4 ♭7', 'Mi – La – Re'),
    chord('F·B♭·E♭', '', 'F', '1 4 ♭7', 'Fa – Si♭ – Mi♭'),
  ])],
  17: [prog('Suona il negativo di C – F – G7 – C (asse di Do)', [
    chord('Cm', 'Cm', 'C', '1 ♭3 5', 'Do minore', { why: 'Il negativo di Do Mi Sol è Sol Mi♭ Do: Do minore.' }),
    chord('Gm', 'Gm', 'G', '1 ♭3 5', 'Sol minore', { why: 'Il negativo di Fa La Do è Re Si♭ Sol: Sol minore.' }),
    chord('Fm6', 'Fm6', 'F', '1 ♭3 5 6', 'Fa minore sesta', { why: 'Il negativo di Sol Si Re Fa è Do La♭ Fa Re: Fm6.' }),
    chord('Cm', 'Cm', 'C', '1 ♭3 5', 'Do minore'),
  ]), prog('Suona il negativo di Dm7 – G7 – CΔ (asse di Do)', [
    chord('Gm7', 'Gm7', 'G', '1 ♭3 5 ♭7', 'Sol minore settima', { why: 'Il negativo di Re Fa La Do è Fa Re Si♭ Sol: Gm7.' }),
    chord('Fm6', 'Fm6', 'F', '1 ♭3 5 6', 'Fa minore sesta', { why: 'Il negativo di G7 è Fm6.' }),
    chord('Cm♭6', 'Cm♭6', 'C', '1 ♭3 5 ♭6', 'Do minore ♭6', { why: 'Il negativo di Do Mi Sol Si è Do Mi♭ Sol La♭.' }),
  ])],
  18: [prog('Arrangia la canzone: suona gli accordi del giro', [
    chord('C', 'I', 'C', '1 3 5', 'Do maggiore'),
    chord('Am7', 'VI', 'A', '1 ♭3 5 ♭7', 'La minore settima'),
    chord('Dm7', 'iim7', 'D', '1 ♭3 5 ♭7', 'Re minore settima'),
    chord('G7', 'V', 'G', '1 3 5 ♭7', 'Sol settima'),
  ])],
  19: [prog('Il tuo primo brano: suona gli accordi del giro', [
    chord('Cmaj7', 'I', 'C', '1 3 5 7', 'Do maggiore settima'),
    chord('Am7', 'VI', 'A', '1 ♭3 5 ♭7', 'La minore settima'),
    chord('Dm7', 'iim7', 'D', '1 ♭3 5 ♭7', 'Re minore settima'),
    chord('G7', 'V', 'G', '1 3 5 ♭7', 'Sol settima'),
  ])],
}

export const applyFor = (chapter) => CH[chapter] || null
