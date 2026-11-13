import { mk, md, F, page } from './helpers'

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'Le triadi', min: 4 },
    { id: 2, kind: 'lesson', title: 'Le quadriadi', min: 4 },
    { id: 3, kind: 'lesson', title: 'Sospesi e accordi di sesta', min: 3 },
    { id: 4, kind: 'lesson', title: 'Leggere le sigle', min: 3 },
    { id: 5, kind: 'ear', title: 'Riconosci l’accordo', min: 5 },
    { id: 6, kind: 'build', title: 'Costruisci gli accordi sullo strumento', min: 5 },
    { id: 7, kind: 'apply', title: 'Suona Do – La minore – Fa – Sol', min: 5 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Cos’è un accordo', 'Un accordo sono tre o più note suonate insieme. Si costruisce impilando terze: si parte da una nota, la fondamentale, e si aggiungono la terza e la quinta sopra di essa. Con tre note si ha una triade.', 'Triade = fondamentale + terza + quinta.', { notes: mk(60, F.maj), play: md(60, [0, 4, 7]), chord: true }, 'Ascolta come suonano insieme!'),
        page('Maggiore e minore', 'La triade maggiore ha la terza a 4 semitoni dalla fondamentale e suona luminosa. La triade minore ha la terza a 3 semitoni e suona più scura. La quinta, a 7 semitoni, è uguale in entrambe.', 'Maggiore: 1 3 5 · Minore: 1 ♭3 5', { notes: mk(60, F.min), play: md(60, [0, 3, 7]), chord: true }, 'Cambia una sola nota!'),
        page('Diminuita ed eccedente', 'La triade diminuita ha terza minore e quinta abbassata (♭5): suona tesa, instabile. La triade eccedente ha terza maggiore e quinta alzata (♯5): suona sospesa, quasi misteriosa.', 'Diminuita: 1 ♭3 ♭5 · Eccedente: 1 3 ♯5', { notes: mk(60, F.dim), play: md(60, [0, 3, 6]), chord: true }, 'Due suoni che cercano risoluzione!'),
      ],
    },
    2: {
      pages: [
        page('La settima maggiore', 'Aggiungendo un’altra terza sopra la triade si ottiene la settima, e l’accordo diventa una quadriade. Sulla triade maggiore, la settima a 11 semitoni dà la settima maggiore (Δ): un suono morbido, raffinato.', 'Δ = 1 3 5 7', { notes: mk(60, F.maj7), play: md(60, [0, 4, 7, 11]), chord: true }, 'Un suono da jazz e da ballata!'),
        page('Settima di dominante e minore settima', 'La settima di dominante unisce la triade maggiore alla settima minore (♭7): è l’accordo più “in tensione”. La minore settima (m7) unisce la triade minore alla settima minore ed è calda e rilassata.', 'Dominante: 1 3 5 ♭7 · m7: 1 ♭3 5 ♭7', { notes: mk(60, F.dom7), play: md(60, [0, 4, 7, 10]), chord: true }, 'La dominante vuole risolvere!'),
        page('Semidiminuito e diminuito', 'Sulla triade diminuita la settima minore dà il semidiminuito (ø7). La settima diminuita (♭♭7, 9 semitoni) dà il diminuito (°7), formato da sole terze minori sovrapposte.', 'ø7: 1 ♭3 ♭5 ♭7 · °7: 1 ♭3 ♭5 ♭♭7', { notes: mk(60, F.dim7), play: md(60, [0, 3, 6, 9]), chord: true }, 'Tutte terze minori!'),
        page('Minore con settima maggiore', 'La triade minore con la settima maggiore (11 semitoni) dà il minore maggiore settima, o mΔ. Unisce una base scura a una settima luminosa: il risultato è misterioso, quasi sospeso, e si sente spesso nelle colonne sonore.', 'mΔ: 1 ♭3 5 7', { notes: mk(60, F.mmaj7), play: md(60, [0, 3, 7, 11]), chord: true }, 'Buio sotto, luce sopra!'),
        page('Settima maggiore eccedente', 'La settima maggiore con la quinta alzata (♯5, 8 semitoni) dà il Δ♯5. L’accordo conserva la dolcezza del Δ, ma la quinta eccedente lo rende sospeso e instabile. Nasce sul terzo grado della scala minore melodica.', 'Δ♯5: 1 3 ♯5 7', { notes: mk(60, F.maj7s5), play: md(60, [0, 4, 8, 11]), chord: true }, 'Una quinta che vuole salire!'),
      ],
    },
    3: {
      pages: [
        page('Gli accordi sospesi', 'Negli accordi sospesi la terza è sostituita da un’altra nota: la seconda (sus2) o la quarta (sus4). Senza la terza non sono né maggiori né minori e danno un senso di attesa.', 'sus2: 1 2 5 · sus4: 1 4 5', { notes: mk(60, [[0, 1, '1'], [5, 4, '4'], [7, 5, '5']]), play: md(60, [0, 5, 7]), chord: true }, 'Qui manca la terza!'),
        page('Gli accordi di sesta', 'L’accordo di sesta aggiunge alla triade la sesta maggiore: Do6 è Do Mi Sol La. Con la triade minore si ha il m6: Do Mi♭ Sol La. Sono accordi di riposo, usati spesso a fine brano.', '6: 1 3 5 6 · m6: 1 ♭3 5 6', { notes: mk(60, [[0, 1, '1'], [4, 3, '3'], [7, 5, '5'], [9, 6, '6']]), play: md(60, [0, 4, 7, 9]), chord: true }, 'Un finale morbido!'),
      ],
    },
    4: {
      pages: [
        page('Le sigle degli accordi', 'Gli accordi si scrivono con una sigla: il nome della fondamentale, poi la qualità. C è maggiore, Cm è minore, C° è diminuito, C+ è eccedente. Per i suoni di quattro note si aggiunge il tipo di settima.', 'C = maggiore · Cm = minore · C° = diminuito · C+ = eccedente', { notes: [], play: md(60, [0, 4, 7]), chord: true }, 'Una sigla, un suono!'),
        page('Sigle con la settima', 'CΔ (o Cmaj7) è la settima maggiore, C7 è la settima di dominante, Cm7 la minore settima, Cø7 il semidiminuito, C°7 il diminuito, CmΔ il minore con settima maggiore, CΔ♯5 la settima maggiore con quinta eccedente. Il numero 7 da solo significa sempre settima minore sopra la triade maggiore.', 'CΔ = 1 3 5 7 · C7 = 1 3 5 ♭7 · Cm7 = 1 ♭3 5 ♭7', { notes: mk(60, F.dom7), play: md(60, [0, 4, 7, 10]), chord: true }, 'Il 7 solo è di dominante!'),
        page('Leggere Am7', 'Per leggere una sigla si fa in tre passi: fondamentale (La), qualità (m = minore), estensione (7 = settima minore). Am7 è quindi La Do Mi Sol, formato da una triade minore con la settima minore.', 'Am7 = La Do Mi Sol', { base: 57, notes: mk(57, F.min7), play: md(57, [0, 3, 7, 10]), chord: true }, 'Tre passi e sai leggere tutto!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che accordo senti?', kind: 'chord', play: md(60, [0, 4, 7]), options: ['Maggiore', 'Minore', 'Diminuito', 'Eccedente'], answer: 0, explanation: 'La terza è a 4 semitoni e la quinta a 7: è una triade maggiore.' },
        { prompt: 'Ascolta: che accordo senti?', kind: 'chord', play: md(60, [0, 3, 7]), options: ['Maggiore', 'Minore', 'Diminuito', 'Sospeso'], answer: 1, explanation: 'La terza è a 3 semitoni, la quinta giusta: è una triade minore.' },
        { prompt: 'Ascolta: che accordo senti?', kind: 'chord', play: md(60, [0, 4, 7, 10]), options: ['Settima maggiore', 'Settima di dominante', 'Minore settima', 'Semidiminuito'], answer: 1, explanation: 'Triade maggiore con la settima minore: settima di dominante.' },
        { prompt: 'Ascolta: che accordo senti?', kind: 'chord', play: md(60, [0, 3, 6]), options: ['Minore', 'Diminuito', 'Eccedente', 'Sospeso'], answer: 1, explanation: 'Terza minore e quinta abbassata: è una triade diminuita.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Quante note ha una triade?', options: ['2', '3', '4', '5'], answer: 1, explanation: 'Una triade ha tre note: fondamentale, terza e quinta.' },
        { prompt: 'Quali gradi formano una triade minore?', options: ['1 3 5', '1 ♭3 5', '1 ♭3 ♭5', '1 4 5'], answer: 1, explanation: 'La triade minore ha la terza minore (♭3) e la quinta giusta.' },
        { prompt: 'Do – Mi – Sol♯ è una triade...', options: ['maggiore', 'minore', 'diminuita', 'eccedente'], answer: 3, explanation: 'La quinta alzata (♯5) caratterizza la triade eccedente.' },
        { prompt: 'Qual è la formula della settima di dominante?', options: ['1 3 5 7', '1 3 5 ♭7', '1 ♭3 5 ♭7', '1 ♭3 ♭5 ♭7'], answer: 1, explanation: 'Triade maggiore più settima minore: 1 3 5 ♭7.' },
        { prompt: 'Che cosa significa la sigla Am7?', options: ['La maggiore con settima maggiore', 'La minore con settima minore', 'La diminuito', 'La sospeso'], answer: 1, explanation: 'm indica la triade minore, 7 la settima minore.' },
      ],
    },
  },
}
