import { mk, md, page } from './helpers'

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'Le scale pentatoniche', min: 4 },
    { id: 2, kind: 'lesson', title: 'La scala blues', min: 3 },
    { id: 3, kind: 'lesson', title: 'Esatonale e diminuite', min: 4 },
    { id: 4, kind: 'lesson', title: 'Una scala per ogni accordo', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci la scala', min: 5 },
    { id: 6, kind: 'build', title: 'Suona le scale sullo strumento', min: 5 },
    { id: 7, kind: 'apply', title: 'Improvvisa con la pentatonica', min: 6 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Cinque note', 'La scala pentatonica ha cinque note invece di sette. È la più usata nel pop, nel rock e nel blues perché non contiene intervalli di semitono: ogni nota suona bene sopra l’accordo.', 'Pentatonica = 5 note.', { notes: mk(60, [[0, 1, '1'], [2, 2, '2'], [4, 3, '3'], [7, 5, '5'], [9, 6, '6'], [12, 1, '1']]), play: md(60, [0, 2, 4, 7, 9, 12]) }, 'Pentatonica maggiore: 1 2 3 5 6!'),
        page('Pentatonica minore', 'La pentatonica minore ha 1 ♭3 4 5 ♭7. Si ottiene dalla pentatonica maggiore partendo dalla sesta nota: Do pentatonica maggiore e La pentatonica minore usano le stesse note. È la scala base dell’assolo rock.', 'Minore: 1 ♭3 4 5 ♭7', { notes: mk(60, [[0, 1, '1'], [3, 3, '♭3'], [5, 4, '4'], [7, 5, '5'], [10, 7, '♭7'], [12, 1, '1']]), play: md(60, [0, 3, 5, 7, 10, 12]) }, 'Due scale in una!'),
      ],
    },
    2: {
      pages: [
        page('La blue note', 'La scala blues è la pentatonica minore con una nota in più: la quinta abbassata (♭5), detta blue note. Si usa come passaggio tra la quarta e la quinta e dà il tipico suono “sporco” del blues.', 'Blues: 1 ♭3 4 ♭5 5 ♭7', { notes: mk(60, [[0, 1, '1'], [3, 3, '♭3'], [5, 4, '4'], [6, 5, '♭5'], [7, 5, '5'], [10, 7, '♭7'], [12, 1, '1']]), play: md(60, [0, 3, 5, 6, 7, 10, 12]) }, 'La blue note è quella di passaggio!'),
      ],
    },
    3: {
      pages: [
        page('La scala esatonale', 'La scala esatonale ha sei note a distanza di un tono. Non ha semitoni e quindi nessun centro tonale: suona sospesa, onirica. Da Do: Do Re Mi Fa♯ Sol♯ Si♭. Si usa molto sulle dominanti con quinta alterata.', 'Esatonale = 6 note, tutti toni.', { notes: mk(60, [[0, 1, '1'], [2, 2, '2'], [4, 3, '3'], [6, 4, '♯4'], [8, 5, '♯5'], [10, 7, '♭7'], [12, 1, '1']]), play: md(60, [0, 2, 4, 6, 8, 10, 12]) }, 'Nessun semitono!'),
        page('Le scale diminuite: tono – semitono', 'Le scale diminuite sono due, e hanno otto note. La prima alterna tono e semitono: Do Re Mi♭ Fa Sol♭ La♭ La Si. Si usa sull’accordo diminuito. Si ripete identica ogni tre semitoni.', 'Diminuita: tono – semitono – tono – semitono…', { notes: mk(60, [[0, 1, '1'], [2, 2, '2'], [3, 3, '♭3'], [5, 4, '4'], [6, 5, '♭5'], [8, 6, '♭6'], [9, 6, '6'], [11, 7, '7'], [12, 1, '1']]), play: md(60, [0, 2, 3, 5, 6, 8, 9, 11, 12]) }, 'Ripetitiva e simmetrica!'),
        page('Le scale diminuite: semitono – tono', 'La seconda variante parte dal semitono: Do Re♭ Mi♭ Mi Fa♯ Sol La Si♭. È la scala diminuita “di dominante”: si usa sulla settima di dominante, soprattutto con le note ♭9, ♯9 e ♯11.', 'Diminuita di dominante: semitono – tono – semitono – tono…', { notes: mk(60, [[0, 1, '1'], [1, 2, '♭2'], [3, 3, '♭3'], [4, 3, '3'], [6, 4, '♯4'], [7, 5, '5'], [9, 6, '6'], [10, 7, '♭7'], [12, 1, '1']]), play: md(60, [0, 1, 3, 4, 6, 7, 9, 10, 12]) }, 'Stessa scala, partenza diversa!'),
      ],
    },
    4: {
      pages: [
        page('Scegliere la scala giusta', 'Per ogni tipo di accordo c’è una scala che ne contiene le note. Sulla settima maggiore si usa la scala ionica o lidia. Sul minore sesta la dorica. Sul minore settima, se le estensioni non dicono altro, si può scegliere tra frigia, eolia e dorica. Sulla settima di dominante la misolidia. Sul semidiminuito la locria.', 'Δ: ionica/lidia · m6: dorica · m7: frigia/eolia/dorica · 7: misolidia · ø7: locria', { notes: [] }, 'Un accordo, una scala!'),
        page('La scala alterata', 'Sulla dominante che risolve si usa spesso la scala alterata: tutte le note estese sono alterate. Su Sol: Sol La♭ Si♭ Si Re♭ Mi♭ Fa. Dà tutta la tensione possibile prima di risolvere.', 'Alterata: 1 ♭2 ♯2 3 ♭5 ♭6 ♭7', { base: 55, notes: mk(55, [[0, 1, '1'], [1, 2, '♭2'], [3, 3, '♯2'], [4, 3, '3'], [6, 5, '♭5'], [8, 6, '♭6'], [10, 7, '♭7'], [12, 1, '1']]), play: md(55, [0, 1, 3, 4, 6, 8, 10, 12]) }, 'La più tesa di tutte!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che scala senti?', play: md(60, [0, 2, 4, 7, 9, 12]), options: ['Pentatonica maggiore', 'Pentatonica minore', 'Blues', 'Esatonale'], answer: 0, explanation: 'Cinque note con la terza maggiore: pentatonica maggiore.' },
        { prompt: 'Ascolta: che scala senti?', play: md(60, [0, 3, 5, 7, 10, 12]), options: ['Pentatonica maggiore', 'Pentatonica minore', 'Blues', 'Diminuita'], answer: 1, explanation: 'Cinque note con la terza minore: pentatonica minore.' },
        { prompt: 'Ascolta: che scala senti?', play: md(60, [0, 3, 5, 6, 7, 10, 12]), options: ['Pentatonica minore', 'Esatonale', 'Blues', 'Diminuita'], answer: 2, explanation: 'La pentatonica minore con la blue note (♭5): scala blues.' },
        { prompt: 'Ascolta: che scala senti?', play: md(60, [0, 2, 4, 6, 8, 10, 12]), options: ['Diminuita', 'Blues', 'Pentatonica maggiore', 'Esatonale'], answer: 3, explanation: 'Sei note a distanza di un tono: esatonale.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Quante note ha la scala pentatonica?', options: ['4', '5', '6', '7'], answer: 1, explanation: 'Penta significa cinque.' },
        { prompt: 'Qual è la blue note?', options: ['La terza minore', 'La quinta abbassata', 'La settima maggiore', 'La seconda minore'], answer: 1, explanation: 'La blue note è la ♭5.' },
        { prompt: 'Quante note ha la scala esatonale?', options: ['5', '6', '7', '8'], answer: 1, explanation: 'Esa significa sei.' },
        { prompt: 'Quale scala si usa di solito su un accordo m6?', options: ['Lidia', 'Locria', 'Dorica', 'Esatonale'], answer: 2, explanation: 'La dorica ha la terza minore e la sesta maggiore: funziona sul minore sesta. Sul m7 sono possibili anche frigia ed eolia.' },
        { prompt: 'Quali gradi ha la pentatonica minore?', options: ['1 2 3 5 6', '1 ♭3 4 5 ♭7', '1 ♭3 4 ♭5 5 ♭7', '1 2 ♭3 5 6'], answer: 1, explanation: 'È la scala 1 ♭3 4 5 ♭7.' },
      ],
    },
  },
}
