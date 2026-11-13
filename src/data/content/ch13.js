import { mk, md, page } from './helpers'

const Cm7 = md(60, [0, 3, 7, 10])
const Dm7 = md(62, [0, 3, 7, 10])
const G7 = md(55, [0, 4, 7, 10])
const CM7 = md(60, [0, 4, 7, 11])
const Am7 = md(57, [0, 3, 7, 10])

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'Il II–V–I minore', min: 4 },
    { id: 2, kind: 'lesson', title: 'I turnaround', min: 4 },
    { id: 3, kind: 'lesson', title: 'II–V verso altre tonalità', min: 4 },
    { id: 4, kind: 'lesson', title: 'Il blues jazz', min: 5 },
    { id: 5, kind: 'ear', title: 'Riconosci le progressioni jazz', min: 5 },
    { id: 6, kind: 'build', title: 'Suona un II–V–I minore', min: 5 },
    { id: 7, kind: 'apply', title: 'Suona un blues in Fa', min: 8 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Gli accordi in minore', 'In minore il II–V–I usa un semidiminuito sul ii. In Do minore: Dø7, G7 e Cm7. Il ii è semidiminuito perché la scala minore naturale ha il ♭5 sul secondo grado.', 'iiø7 – V7 – i7', { base: 62, notes: mk(62, [[0, 1, '1'], [3, 3, '♭3'], [6, 5, '♭5'], [10, 7, '♭7']]), play: md(62, [0, 3, 6, 10]), chord: true }, 'Il Dø7 apre il giro!'),
        page('Il V7 con ♭9', 'Nel minore la dominante ha di solito la nona abbassata, G7♭9, per avvicinarsi al colore del Do minore. Il suono è più scuro e teso del V7 maggiore. Spesso si usa anche la scala alterata sul V.', 'V7♭9', { base: 55, notes: mk(55, [[0, 1, '1'], [4, 3, '3'], [7, 5, '5'], [10, 7, '♭7'], [12, 2, '♭9']]), play: md(55, [0, 4, 7, 10, 13]), chord: true }, 'La ♭9 è il La♭!'),
        page('Il giro completo', 'Ascolta il giro completo: Dø7 – G7♭9 – Cm7. Il colore è drammatico e viene usato in moltissimi standard jazz, come “Autumn Leaves”.', 'Dø7 – G7♭9 – Cm7', { notes: [], play: [md(62, [0, 3, 6, 10]), md(55, [0, 4, 7, 10, 13]), Cm7], progression: true, chords: [{ fn: 'iiø7', sym: 'Dø7' }, { fn: 'V7♭9', sym: 'G7♭9' }, { fn: 'i7', sym: 'Cm7' }] }, 'Un classico!'),
      ],
    },
    2: {
      pages: [
        page('Tornare all’inizio', 'Il turnaround è una breve progressione alla fine di una sezione che riporta al I. Il più comune è I – vi – ii – V: CΔ, Am7, Dm7, G7. Due battute bastano a ripartire dall’inizio.', 'I – vi – ii – V', { notes: [], play: [CM7, Am7, Dm7, G7], progression: true, chords: [{ fn: 'IΔ', sym: 'CΔ' }, { fn: 'vi7', sym: 'Am7' }, { fn: 'ii7', sym: 'Dm7' }, { fn: 'V7', sym: 'G7' }] }, 'Si ricomincia!'),
        page('Varianti', 'Si può trasformare il vi in una dominante secondaria, A7, e ottenere I – VI7 – ii – V (CΔ, A7, Dm7, G7). Si può anche partire dal iii: iii – VI7 – ii – V (Em7, A7, Dm7, G7).', 'iii – VI7 – ii – V', { notes: [], play: [md(64, [0, 3, 7, 10]), md(57, [0, 4, 7, 10]), Dm7, G7], progression: true, chords: [{ fn: 'iii7', sym: 'Em7' }, { fn: 'VI7', sym: 'A7' }, { fn: 'ii7', sym: 'Dm7' }, { fn: 'V7', sym: 'G7' }] }, 'Una catena di quinte!'),
      ],
    },
    3: {
      pages: [
        page('Un II–V che porta altrove', 'Un II–V non deve per forza portare al I. Gm7 – C7 porta a FΔ, cioè al IV; Am7 – D7 porta a GΔ, cioè al V. Si usano per tonicizzare qualsiasi grado e rendere più mobile il percorso.', 'Gm7 – C7 → FΔ', { notes: [], play: [md(55, [0, 3, 7, 10]), md(60, [0, 4, 7, 10]), md(60, [5, 9, 12, 16])], progression: true, chords: [{ fn: 'ii', sym: 'Gm7' }, { fn: 'V7', sym: 'C7' }, { fn: 'IVΔ', sym: 'FΔ' }] }, 'Si cambia casa a metà frase!'),
        page('Catene di II–V', 'Concatenando i II–V in modo che ognuno porti a un nuovo centro si ottengono sequenze che attraversano tutto il cerchio delle quinte, come in molti standard jazz. Ogni V7 diventa il ii del successivo.', 'II–V consecutivi = modulazioni rapide.', { notes: [] }, 'Un viaggio velocissimo!'),
      ],
    },
    4: {
      pages: [
        page('Le dodici battute', 'Il blues ha una struttura di 12 battute con tre frasi di quattro battute. La forma base usa solo I7, IV7 e V7: | I7 | I7 | I7 | I7 | IV7 | IV7 | I7 | I7 | V7 | IV7 | I7 | I7 |. Gli accordi sono tutti di settima di dominante.', '12 battute: I7 IV7 V7', { notes: [] }, 'La forma più famosa della musica!'),
        page('Il blues jazz', 'Nella versione jazz si aggiungono accordi di passaggio: un II–V verso il IV alla battuta 4, il VI7 alla battuta 8 e il II–V finale. Una forma in Fa: | F7 | B♭7 | F7 | Cm7 F7 | B♭7 | B♭7 | F7 | D7 | Gm7 | C7 | F7 D7 | Gm7 C7 |. Gli ultimi accordi formano il turnaround.', 'Blues jazz = blues + II–V e passaggi', { notes: [] }, 'Più colore, stessa forma!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che progressione senti?', kind: 'progression', play: [md(62, [0, 3, 6, 10]), md(55, [0, 4, 7, 10, 13]), Cm7], options: ['II–V–I maggiore', 'II–V–I minore', 'Cadenza plagale', 'Cadenza sospesa'], answer: 1, explanation: 'Il semidiminuito e la ♭9 indicano un II–V–I minore.' },
        { prompt: 'Ascolta: che progressione senti?', kind: 'progression', play: [Dm7, G7, CM7], options: ['II–V–I maggiore', 'II–V–I minore', 'Turnaround', 'Blues'], answer: 0, explanation: 'Dm7 – G7 – CΔ: il II–V–I maggiore.' },
        { prompt: 'Ascolta: che giro senti?', kind: 'progression', play: [CM7, Am7, Dm7, G7], options: ['I – vi – ii – V', 'I – IV – V – I', 'ii – V – I', 'I – ♭VII – IV'], answer: 0, explanation: 'È il turnaround I – vi – ii – V.' },
        { prompt: 'Ascolta: dove portano questi due accordi?', kind: 'progression', play: [md(55, [0, 3, 7, 10]), md(60, [0, 4, 7, 10])], options: ['A FΔ', 'A CΔ', 'A GΔ', 'A Dm7'], answer: 0, explanation: 'Gm7 – C7 è il II–V di Fa maggiore.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Come è fatto un II–V–I minore?', options: ['iiø7 – V7 – i7', 'ii7 – V7 – IΔ', 'iv – V – i', 'i – IV – V'], answer: 0, explanation: 'Semidiminuito, dominante e minore settima.' },
        { prompt: 'Quale estensione è tipica del V7 in minore?', options: ['La 9 naturale', 'La ♭9', 'L’11', 'La 13 naturale'], answer: 1, explanation: 'La ♭9 dà il colore scuro che richiede il minore.' },
        { prompt: 'Qual è il turnaround più comune?', options: ['I – vi – ii – V', 'I – IV – V', 'ii – V – I', 'I – iii – V'], answer: 0, explanation: 'I – vi – ii – V.' },
        { prompt: 'Quante battute ha il blues?', options: ['8', '12', '16', '32'], answer: 1, explanation: 'La forma è di dodici battute.' },
        { prompt: 'Il II–V di Fa maggiore è...', options: ['Gm7 – C7', 'Am7 – D7', 'Dm7 – G7', 'Em7 – A7'], answer: 0, explanation: 'Il ii di Fa è Sol minore, il V è Do.' },
      ],
    },
  },
}
