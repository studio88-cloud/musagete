// Esercizi "Costruisci" (Modello A): l'utente tocca le note sullo strumento.
// Ogni esercizio: richiesta, tonica e formula (grado per grado, come nelle lezioni).
// Si controlla il NOME della nota, non la posizione sullo strumento.
// bass: (facoltativo) nota che deve essere la più bassa di quelle toccate.
import { TONICS, parseFormula, spellNotes } from '../lib/music'

// Nome del grado, usato nel commento dopo "Verifica"
const ROLE = {
  1: 'fondamentale', 2: 'seconda maggiore', 3: 'terza maggiore', '♭3': 'terza minore', 4: 'quarta giusta', '♯4': 'quarta eccedente',
  5: 'quinta giusta', '♭5': 'quinta diminuita', '♯5': 'quinta eccedente', 6: 'sesta maggiore', '♭6': 'sesta minore', '♯6': 'sesta aumentata',
  7: 'settima maggiore', '♭7': 'settima minore', '♭♭7': 'settima diminuita', 9: 'nona maggiore', '♭9': 'nona minore',
}

const ex = (prompt, rootId, formula, name, opts = {}) => {
  const root = TONICS.find((t) => t.id === rootId)
  const spelled = spellNotes(root, parseFormula(formula))
  return {
    prompt,
    name,
    expected: spelled.map((n) => ({ pc: n.pc, label: n.label, deg: n.deg, name: n.name, role: ROLE[n.label] })),
    bassPc: opts.bass ?? null,
    why: opts.why || '',
  }
}

const CH = {
  1: [
    ex('Costruisci la scala di Do maggiore', 'C', '1 2 3 4 5 6 7', 'Do maggiore'),
    ex('Costruisci la scala di Sol maggiore', 'G', '1 2 3 4 5 6 7', 'Sol maggiore', { why: 'Ha un diesis: il Fa♯.' }),
    ex('Costruisci la scala di La minore naturale', 'A', '1 2 ♭3 4 5 ♭6 ♭7', 'La minore naturale', { why: 'Ha le stesse note di Do maggiore.' }),
  ],
  2: [
    ex('Costruisci l’accordo di Do maggiore', 'C', '1 3 5', 'Do maggiore'),
    ex('Costruisci l’accordo di La minore', 'A', '1 ♭3 5', 'La minore'),
    ex('Costruisci l’accordo di Sol settima', 'G', '1 3 5 ♭7', 'Sol settima', { why: 'La settima di dominante ha la settima minore.' }),
  ],
  3: [
    ex('Costruisci l’accordo sul II grado di Do maggiore', 'D', '1 ♭3 5', 'Re minore'),
    ex('Costruisci l’accordo sul V grado di Do maggiore', 'G', '1 3 5', 'Sol maggiore'),
    ex('Costruisci l’accordo sul VII grado di Do maggiore', 'B', '1 ♭3 ♭5', 'Si diminuito'),
  ],
  4: [
    ex('Costruisci il V7 di Do maggiore', 'G', '1 3 5 ♭7', 'Sol settima'),
    ex('Costruisci il II7 di Do maggiore', 'D', '1 ♭3 5 ♭7', 'Re minore settima'),
    ex('Costruisci il IV di Do maggiore', 'F', '1 3 5', 'Fa maggiore'),
  ],
  5: [
    ex('Costruisci Do maggiore con il Mi al basso', 'C', '1 3 5', 'Do maggiore, primo rivolto', { bass: 4, why: 'Nel primo rivolto la nota più bassa è la terza.' }),
    ex('Costruisci Do maggiore con il Sol al basso', 'C', '1 3 5', 'Do maggiore, secondo rivolto', { bass: 7, why: 'Nel secondo rivolto la nota più bassa è la quinta.' }),
    ex('Costruisci Fa maggiore con il La al basso', 'F', '1 3 5', 'Fa maggiore, primo rivolto', { bass: 9 }),
  ],
  6: [
    ex('Costruisci la dominante di Re minore', 'A', '1 3 5 ♭7', 'La settima'),
    ex('Costruisci la dominante di Sol maggiore', 'D', '1 3 5 ♭7', 'Re settima'),
    ex('Costruisci la dominante di La minore', 'E', '1 3 5 ♭7', 'Mi settima'),
  ],
  7: [
    ex('Costruisci Re settima, la dominante di Sol maggiore', 'D', '1 3 5 ♭7', 'Re settima'),
    ex('Costruisci la scala di Sol maggiore', 'G', '1 2 3 4 5 6 7', 'Sol maggiore'),
    ex('Costruisci La minore, l’accordo pivot tra Do e Sol', 'A', '1 ♭3 5', 'La minore', { why: 'È il VI grado di Do e il II di Sol.' }),
  ],
  8: [
    ex('Costruisci Re dorico', 'D', '1 2 ♭3 4 5 6 ♭7', 'Re dorico'),
    ex('Costruisci Fa lidio', 'F', '1 2 3 ♯4 5 6 7', 'Fa lidio'),
    ex('Costruisci Sol misolidio', 'G', '1 2 3 4 5 6 ♭7', 'Sol misolidio'),
  ],
  9: [
    ex('Costruisci il frigio dominante di Sol', 'G', '1 ♭2 3 4 5 ♭6 ♭7', 'Sol frigio dominante', { why: 'È il quinto modo della minore armonica di Do.' }),
    ex('Costruisci il lidio dominante di Fa', 'F', '1 2 3 ♯4 5 6 ♭7', 'Fa lidio dominante', { why: 'È un misolidio con il ♯4.' }),
    ex('Costruisci il locrio ♮2 di La', 'A', '1 2 ♭3 4 ♭5 ♭6 ♭7', 'La locrio ♮2', { why: 'È il sesto modo della minore melodica di Do.' }),
  ],
  10: [
    ex('Costruisci la pentatonica minore di La', 'A', '1 ♭3 4 5 ♭7', 'La pentatonica minore'),
    ex('Costruisci la scala blues di Do', 'C', '1 ♭3 4 ♭5 5 ♭7', 'Do blues'),
    ex('Costruisci la scala per toni interi di Do', 'C', '1 2 3 ♯4 ♯5 ♭7', 'Do per toni interi'),
  ],
  11: [
    ex('Costruisci la sesta napoletana in Do minore: Re♭ maggiore', 'D♭', '1 3 5', 'Re♭ maggiore'),
    ex('Costruisci la sesta aumentata italiana: La♭, Do, Fa♯', 'A♭', '1 3 ♯6', 'La♭ – Do – Fa♯'),
    ex('Costruisci la settima diminuita su Do♯', 'C♯', '1 ♭3 ♭5 ♭♭7', 'Do♯ diminuito settima'),
  ],
  12: [
    ex('Costruisci Do maggiore nona', 'C', '1 3 5 7 9', 'Do maggiore nona'),
    ex('Costruisci Sol settima con la nona minore', 'G', '1 3 5 ♭7 ♭9', 'Sol settima ♭9'),
    ex('Costruisci Do nona di dominante', 'C', '1 3 5 ♭7 9', 'Do nona'),
  ],
  13: [
    ex('Costruisci la sostituzione di tritono di Sol settima: Re♭ settima', 'D♭', '1 3 5 ♭7', 'Re♭ settima'),
    ex('Sostituisci Do con La minore', 'A', '1 ♭3 5', 'La minore', { why: 'Ha due note in comune con Do: Do e Mi.' }),
    ex('Sostituisci Do con Mi minore', 'E', '1 ♭3 5', 'Mi minore', { why: 'Ha due note in comune con Do: Mi e Sol.' }),
  ],
  14: [
    ex('Costruisci Re minore settima ♭5', 'D', '1 ♭3 ♭5 ♭7', 'Re semidiminuito'),
    ex('Costruisci Sol settima con la nona minore', 'G', '1 3 5 ♭7 ♭9', 'Sol settima ♭9'),
    ex('Costruisci Do minore', 'C', '1 ♭3 5', 'Do minore'),
  ],
  15: [
    ex('Costruisci la prima dominante del ponte: Re settima', 'D', '1 3 5 ♭7', 'Re settima', { why: 'È il III7 dell’Anatole in Si♭: dominante di Sol.' }),
    ex('Costruisci la seconda dominante del ponte: Sol settima', 'G', '1 3 5 ♭7', 'Sol settima', { why: 'È il VI7: dominante di Do.' }),
    ex('Costruisci il diminuito di passaggio: Mi diminuito settima', 'E', '1 ♭3 ♭5 ♭♭7', 'Mi diminuito settima', { why: 'Collega E♭ a B♭/F con il basso che sale per semitoni.' }),
  ],
  16: [
    ex('Costruisci l’accordo per quarte Re – Sol – Do', 'D', '1 4 ♭7', 'Re – Sol – Do'),
    ex('Costruisci l’accordo per quarte La – Re – Sol', 'A', '1 4 ♭7', 'La – Re – Sol'),
    ex('Costruisci l’accordo per quarte Do – Fa – Si♭', 'C', '1 4 ♭7', 'Do – Fa – Si♭'),
  ],
  17: [
    ex('Il negativo di Do maggiore: costruisci Do minore', 'C', '1 ♭3 5', 'Do minore'),
    ex('Il negativo di Sol settima: costruisci Fa minore sesta', 'F', '1 ♭3 5 6', 'Fa minore sesta'),
    ex('Il negativo di Fa maggiore: costruisci Sol minore', 'G', '1 ♭3 5', 'Sol minore'),
    ex('Il negativo di Do maggiore settima: costruisci Do minore ♭6', 'C', '1 ♭3 5 ♭6', 'Do minore ♭6'),
  ],
  18: [
    ex('Costruisci La minore settima', 'A', '1 ♭3 5 ♭7', 'La minore settima'),
    ex('Costruisci Fa maggiore settima', 'F', '1 3 5 7', 'Fa maggiore settima'),
    ex('Costruisci Sol settima', 'G', '1 3 5 ♭7', 'Sol settima'),
  ],
  19: [
    ex('Tocca la terza e la settima di Sol settima', 'G', '3 ♭7', 'Si e Fa'),
    ex('Tocca la terza e la settima di Re minore settima', 'D', '♭3 ♭7', 'Fa e Do'),
    ex('Tocca la terza e la settima di Do maggiore settima', 'C', '3 7', 'Mi e Si'),
  ],
}

export const buildFor = (chapter) => CH[chapter] || null
