import { mk, md, page } from './helpers'

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'Le estensioni: 9, 11 e 13', min: 4 },
    { id: 2, kind: 'lesson', title: 'Le alterazioni sulla dominante', min: 4 },
    { id: 3, kind: 'lesson', title: 'Quali estensioni usare', min: 4 },
    { id: 4, kind: 'lesson', title: 'Voicing essenziali', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci le estensioni', min: 5 },
    { id: 6, kind: 'build', title: 'Costruisci gli accordi estesi', min: 5 },
    { id: 7, kind: 'apply', title: 'Arricchisci un II–V–I', min: 6 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Oltre la settima', 'Dopo la settima si possono aggiungere altre terze: la 9, l’11 e la 13. Sono le stesse note di 2, 4 e 6, un’ottava sopra. Nei diagrammi e sugli strumenti le trovi un’ottava sopra la fondamentale.', '9 = 2 (+ ottava) · 11 = 4 (+ ottava) · 13 = 6 (+ ottava)', { notes: mk(60, [[0, 1, '1'], [14, 2, '9'], [4, 3, '3'], [7, 5, '5'], [11, 7, '7']]), play: md(60, [0, 4, 7, 11, 14]), chord: true }, 'CΔ9: ricco e raffinato!'),
        page('Maj9, 9 e m9', 'CΔ9 aggiunge la nona alla settima maggiore. C9 la aggiunge alla settima di dominante. Cm9 la aggiunge alla minore settima. La nona dà più spessore all’accordo senza cambiarne la funzione.', 'Δ9 · 9 · m9', { notes: mk(60, [[0, 1, '1'], [14, 2, '9'], [4, 3, '3'], [7, 5, '5'], [10, 7, '♭7']]), play: md(60, [0, 4, 7, 10, 14]), chord: true }, 'C9 ha la nona sopra la dominante!'),
        page('Undicesima e tredicesima', 'L’11 è la quarta un’ottava sopra e si usa soprattutto sui minori: Cm11. La 13 è la sesta un’ottava sopra e si usa sulle dominanti e sui maggiori: C13. Più si sale, più le note sono facoltative: spesso si omettono quinta e nona.', 'm11 · 13', { notes: mk(60, [[0, 1, '1'], [4, 3, '3'], [21, 6, '13'], [10, 7, '♭7']]), play: md(60, [0, 4, 10, 21]), chord: true }, 'C13: la sesta suona in alto!'),
      ],
    },
    2: {
      pages: [
        page('♭9 e ♯9', 'La dominante può avere la nona alterata. C7♭9 ha il Re♭, C7♯9 ha il Re♯. Sono suoni tesi che spingono con forza verso la risoluzione. Il 7♯9 è l’accordo del rock di Hendrix.', '7♭9 · 7♯9', { notes: mk(60, [[0, 1, '1'], [13, 2, '♭9'], [4, 3, '3'], [7, 5, '5'], [10, 7, '♭7']]), play: md(60, [0, 4, 7, 10, 13]), chord: true }, 'La ♭9 è molto tesa!'),
        page('♯11 e ♭13', 'Si possono alterare anche l’undicesima e la tredicesima: 7♯11 ha il Fa♯, 7♭13 ha il La♭. Insieme alle none alterate formano la dominante “alterata”, adatta quando la tensione deve essere massima.', '7♯11 · 7♭13', { notes: mk(60, [[0, 1, '1'], [4, 3, '3'], [18, 4, '♯11'], [10, 7, '♭7']]), play: md(60, [0, 4, 10, 18]), chord: true }, 'Il ♯11 è da lidio!'),
      ],
    },
    3: {
      pages: [
        page('Le note da evitare', 'Non tutte le estensioni vanno bene su ogni accordo. L’11 naturale sul maggiore urta con la terza (Fa contro Mi) e si evita: si usa invece il ♯11. Anche il ♭13 su un accordo minore con 5 giusta può risultare ambiguo.', 'Sul maggiore: ♯11, non 11.', { notes: [] }, 'La terza non va disturbata!'),
        page('Estensioni per tipo di accordo', 'Δ: 9, ♯11, 13. Dominante: 9, 13, oppure le alterazioni ♭9 ♯9 ♯11 ♭13. m7: 9, 11. ø7: 11, ♭13. Come regola pratica, le estensioni sono le note della scala adatta all’accordo, quindi la scelta viene dal modo.', 'Δ: 9 ♯11 13 · 7: 9 13 · m7: 9 11', { notes: [] }, 'Scegli quelle della scala giusta!'),
      ],
    },
    4: {
      pages: [
        page('Shell voicing', 'Un accordo esteso può essere pesante. Il modo più semplice per suonarlo è lo shell voicing: solo fondamentale, terza e settima. Le tre note bastano a definire l’accordo e lasciano spazio a melodia e basso.', 'Shell = 1 · 3 · 7', { notes: mk(60, [[0, 1, '1'], [4, 3, '3'], [10, 7, '♭7']]), play: md(60, [0, 4, 10]), chord: true }, 'C7 con tre sole note!'),
        page('Rootless voicing', 'Quando c’è già un bassista si può togliere la fondamentale. Su Dm7 si suona Fa La Do Mi, cioè 3 5 7 9, che sono già un Fa maggiore settima. Il suono è moderno e aperto, tipico del piano jazz.', 'Rootless Dm7: 3 5 7 9', { base: 65, notes: mk(65, [[0, 3, '♭3'], [4, 5, '5'], [7, 7, '♭7'], [11, 2, '9']]), play: md(65, [0, 4, 7, 11]), chord: true }, 'Senza fondamentale, ma si sente!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che accordo senti?', kind: 'chord', play: md(60, [0, 4, 7, 11, 14]), options: ['CΔ9', 'C9', 'Cm9', 'C7♭9'], answer: 0, explanation: 'Settima maggiore con la nona: CΔ9.' },
        { prompt: 'Ascolta: che accordo senti?', kind: 'chord', play: md(60, [0, 4, 7, 10, 14]), options: ['CΔ9', 'C9', 'Cm9', 'C6'], answer: 1, explanation: 'Settima di dominante con la nona: C9.' },
        { prompt: 'Ascolta: che accordo senti?', kind: 'chord', play: md(60, [0, 3, 7, 10, 14]), options: ['C9', 'CΔ9', 'Cm9', 'Cø7'], answer: 2, explanation: 'Terza minore, settima minore e nona: Cm9.' },
        { prompt: 'Ascolta: che accordo senti?', kind: 'chord', play: md(60, [0, 4, 7, 10, 15]), options: ['Dominante con 9 naturale', 'Dominante con ♯9', 'Settima maggiore', 'Minore settima'], answer: 1, explanation: 'La nona è alzata di un semitono: 7♯9.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'A quale grado della scala corrisponde la 9?', options: ['Al 2, un’ottava sopra', 'Al 4', 'Al 6', 'Al 7'], answer: 0, explanation: 'La 9 è la seconda nota un’ottava più in alto.' },
        { prompt: 'La 13 corrisponde al grado...', options: ['2', '4', '6', '7'], answer: 2, explanation: 'La 13 è la sesta un’ottava sopra.' },
        { prompt: 'Quale estensione si evita sul maggiore?', options: ['La 9', 'L’11 naturale', 'Il ♯11', 'La 13'], answer: 1, explanation: 'L’11 naturale urta con la terza maggiore.' },
        { prompt: 'Quale nota ha C7♯9 oltre a Do Mi Sol Si♭?', options: ['Re♭', 'Re♯', 'Fa♯', 'La♭'], answer: 1, explanation: 'La ♯9 è il Re♯ (Mi♭).' },
        { prompt: 'Un shell voicing contiene...', options: ['Tutte le note dell’accordo', 'Fondamentale, terza e settima', 'Solo la fondamentale', 'Quinta e nona'], answer: 1, explanation: 'Bastano 1, 3 e 7 per definire l’accordo.' },
      ],
    },
  },
}
