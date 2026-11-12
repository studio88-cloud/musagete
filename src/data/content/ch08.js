import { mk, md, page } from './helpers'

const C = md(60, [0, 4, 7])
const Fmin = md(65, [0, 3, 7])
const F_ = md(65, [0, 4, 7])

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'I sette modi', min: 4 },
    { id: 2, kind: 'lesson', title: 'Il carattere dei modi', min: 4 },
    { id: 3, kind: 'lesson', title: 'L’interscambio modale', min: 4 },
    { id: 4, kind: 'lesson', title: 'I modi in pratica', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci il modo', min: 5 },
    { id: 6, kind: 'build', title: 'Costruisci i modi sullo strumento', min: 5 },
    { id: 7, kind: 'apply', title: 'Prendi in prestito un accordo', min: 5 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Stesse note, centro diverso', 'Un modo si ottiene suonando le note di una scala maggiore ma partendo da un altro grado. Le note di Do maggiore, partendo dal Re, danno Re Mi Fa Sol La Si Do: è il modo dorico. Il centro è cambiato e quindi il suono.', 'Modo = scala maggiore da un altro grado.', { base: 62, notes: mk(62, [[0, 1, '1'], [2, 2, '2'], [3, 3, '♭3'], [5, 4, '4'], [7, 5, '5'], [9, 6, '6'], [10, 7, '♭7'], [12, 1, '1']]), play: md(62, [0, 2, 3, 5, 7, 9, 10, 12]) }, 'Re dorico: solo tasti bianchi!'),
        page('I sette nomi', 'I sette modi si chiamano: ionio (dal 1° grado), dorico (2°), frigio (3°), lidio (4°), misolidio (5°), eolio (6°) e locrio (7°). Lo ionio è la scala maggiore, l’eolio la minore naturale.', 'Ionio · Dorico · Frigio · Lidio · Misolidio · Eolio · Locrio', { notes: [] }, 'Sette scale con le stesse note!'),
      ],
    },
    2: {
      pages: [
        page('Maggiori: ionio, lidio, misolidio', 'Hanno la terza maggiore. Il lidio ha il quarto grado alzato (♯4): suona luminoso, sognante. Il misolidio ha il settimo abbassato (♭7): suona rock e blues. Qui il Fa lidio.', 'Lidio: ♯4 · Misolidio: ♭7', { base: 65, notes: mk(65, [[0, 1, '1'], [2, 2, '2'], [4, 3, '3'], [6, 4, '♯4'], [7, 5, '5'], [9, 6, '6'], [11, 7, '7'], [12, 1, '1']]), play: md(65, [0, 2, 4, 6, 7, 9, 11, 12]) }, 'Quel ♯4 è inconfondibile!'),
        page('Minori: dorico, eolio, frigio, locrio', 'Hanno la terza minore. Il dorico ha la sesta maggiore, l’eolio la sesta minore (è la minore naturale). Il frigio ha la seconda abbassata (♭2): suono spagnolo. Il locrio ha la quinta abbassata (♭5) ed è instabile.', 'Dorico: 6 · Frigio: ♭2 · Locrio: ♭5', { base: 64, notes: mk(64, [[0, 1, '1'], [1, 2, '♭2'], [3, 3, '♭3'], [5, 4, '4'], [7, 5, '5'], [8, 6, '♭6'], [10, 7, '♭7'], [12, 1, '1']]), play: md(64, [0, 1, 3, 5, 7, 8, 10, 12]) }, 'Mi frigio: senti il ♭2?'),
      ],
    },
    3: {
      pages: [
        page('Accordi in prestito', 'L’interscambio modale consiste nel prendere in prestito accordi dal modo parallelo, cioè quello con la stessa tonica. In Do maggiore si possono usare accordi di Do minore: è un modo di colorare la tonalità senza cambiarla.', 'Interscambio = accordi del modo parallelo.', { notes: [] }, 'Prestiti, non cambi di casa!'),
        page('Gli accordi più usati', 'Da Do minore si prendono più spesso: il iv (Fa minore), il ♭VI (La♭ maggiore) e il ♭VII (Si♭ maggiore). Il ♭III (Mi♭) e il ii° sono meno frequenti. Tutti suonano più scuri dell’accordo originale.', 'iv · ♭VI · ♭VII', { base: 65, notes: mk(65, [[0, 4, '4'], [3, 6, '♭6'], [7, 1, '1']]), play: md(65, [0, 3, 7]), chord: true }, 'Fa minore: il iv preso dal minore!'),
        page('L’effetto del iv minore', 'La successione I – IV – iv – I è un classico. Il Fa maggiore è luminoso, il Fa minore cambia colore con una sola nota: il La diventa La♭. Fa nascere un senso di malinconia, spesso usato nelle ballate.', 'Do – Fa – Fa minore – Do', { notes: [], play: [C, F_, Fmin, C], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'IV', sym: 'F' }, { fn: 'iv', sym: 'Fm' }, { fn: 'I', sym: 'C' }] }, 'Senti il cielo che si oscura?'),
      ],
    },
    4: {
      pages: [
        page('Vamp modali', 'Con i modi spesso si usano pochi accordi che si ripetono. Il dorico si riconosce con i – IV (Dm7 – G7), il misolidio con I – ♭VII (Sol – Fa), il lidio con I – II (Fa – Sol). L’accordo caratteristico evidenzia la nota caratteristica.', 'Dorico: i–IV · Misolidio: I–♭VII · Lidio: I–II', { notes: [], play: [md(55, [0, 4, 7]), md(53, [0, 4, 7])], progression: true, chords: [{ fn: 'I', sym: 'G' }, { fn: '♭VII', sym: 'F' }] }, 'Questo è il suono misolidio!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che modo senti?', play: md(62, [0, 2, 3, 5, 7, 9, 10, 12]), options: ['Ionio', 'Dorico', 'Frigio', 'Misolidio'], answer: 1, explanation: 'Terza minore e sesta maggiore: è il modo dorico.' },
        { prompt: 'Ascolta: che modo senti?', play: md(55, [0, 2, 4, 5, 7, 9, 10, 12]), options: ['Misolidio', 'Lidio', 'Eolio', 'Locrio'], answer: 0, explanation: 'Terza maggiore e settima minore: è il misolidio.' },
        { prompt: 'Ascolta: che modo senti?', play: md(65, [0, 2, 4, 6, 7, 9, 11, 12]), options: ['Ionio', 'Dorico', 'Lidio', 'Frigio'], answer: 2, explanation: 'Il quarto grado alzato (♯4) caratterizza il modo lidio.' },
        { prompt: 'Ascolta: che modo senti?', play: md(64, [0, 1, 3, 5, 7, 8, 10, 12]), options: ['Eolio', 'Locrio', 'Dorico', 'Frigio'], answer: 3, explanation: 'La seconda abbassata (♭2) caratterizza il modo frigio.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Quale grado caratterizza il modo dorico rispetto all’eolio?', options: ['Il ♭2', 'Il ♯4', 'La sesta maggiore', 'Il ♭7'], answer: 2, explanation: 'Il dorico ha la sesta maggiore, l’eolio la sesta minore.' },
        { prompt: 'Quale modo ha il quarto grado alzato?', options: ['Lidio', 'Frigio', 'Misolidio', 'Locrio'], answer: 0, explanation: 'Il lidio ha la ♯4.' },
        { prompt: 'Il modo misolidio ha...', options: ['la settima maggiore', 'la settima minore', 'la seconda minore', 'la quinta diminuita'], answer: 1, explanation: 'Misolidio = maggiore con ♭7.' },
        { prompt: 'Da dove si prendono gli accordi nell’interscambio modale?', options: ['Dalla relativa', 'Dal modo parallelo', 'Dalla dominante', 'Da un’altra scala maggiore qualunque'], answer: 1, explanation: 'Si prendono dal modo con la stessa tonica, per esempio Do minore per Do maggiore.' },
        { prompt: 'Quale accordo si prende da Do minore in Do maggiore?', options: ['Fa minore', 'Re maggiore', 'Sol minore', 'La maggiore'], answer: 0, explanation: 'Il iv minore: Fa minore.' },
      ],
    },
  },
}
