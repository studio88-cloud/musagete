import { mk, md, F, page } from './helpers'

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'I rivolti delle triadi', min: 4 },
    { id: 2, kind: 'lesson', title: 'I rivolti delle quadriadi', min: 4 },
    { id: 3, kind: 'lesson', title: 'Il basso numerato', min: 4 },
    { id: 4, kind: 'lesson', title: 'Perché si usano i rivolti', min: 3 },
    { id: 5, kind: 'ear', title: 'Riconosci il rivolto', min: 5 },
    { id: 6, kind: 'build', title: 'Suona i rivolti sullo strumento', min: 5 },
    { id: 7, kind: 'apply', title: 'Costruisci una linea di basso', min: 5 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Cos’è un rivolto', 'Un accordo ha lo stesso nome anche se cambia la nota più bassa. Quando al basso c’è la fondamentale l’accordo è in stato fondamentale. Se si sposta al basso un’altra nota si ottiene un rivolto.', 'Stesso accordo, nota al basso diversa.', { notes: mk(60, F.maj), play: md(60, [0, 4, 7]), chord: true }, 'Partiamo dallo stato fondamentale!'),
        page('Il primo rivolto', 'Nel primo rivolto la terza è al basso: Mi Sol Do. Le note sono le stesse di Do maggiore, ma il suono è più leggero e meno stabile. Si indica con 6.', 'Primo rivolto: terza al basso (6).', { base: 64, notes: mk(64, [[0, 3, '3'], [3, 5, '5'], [8, 1, '1']]), play: md(64, [0, 3, 8]), chord: true }, 'Senti come è più leggero?'),
        page('Il secondo rivolto', 'Nel secondo rivolto la quinta è al basso: Sol Do Mi. È l’assetto meno stabile e di solito si usa in momenti precisi, per esempio prima della dominante. Si indica con 6/4.', 'Secondo rivolto: quinta al basso (6/4).', { base: 55, notes: mk(55, [[0, 5, '5'], [5, 1, '1'], [9, 3, '3']]), play: md(55, [0, 5, 9]), chord: true }, 'Il più instabile dei tre!'),
      ],
    },
    2: {
      pages: [
        page('Quattro posizioni', 'Una quadriade ha tre rivolti, oltre allo stato fondamentale. Prendiamo G7 (Sol Si Re Fa). Con la terza al basso, Si Re Fa Sol, si ha il primo rivolto, cifrato 6/5.', 'Primo rivolto: terza al basso (6/5).', { base: 59, notes: mk(59, [[0, 3, '3'], [3, 5, '5'], [6, 7, '♭7'], [8, 1, '1']]), play: md(59, [0, 3, 6, 8]), chord: true }, 'La sensibile al basso!'),
        page('Secondo rivolto', 'Con la quinta al basso, Re Fa Sol Si, si ha il secondo rivolto di G7, cifrato 4/3. Il tritono tra Fa e Si sta ancora nell’accordo ma in una posizione diversa.', 'Secondo rivolto: quinta al basso (4/3).', { base: 62, notes: mk(62, [[0, 5, '5'], [3, 7, '♭7'], [5, 1, '1'], [9, 3, '3']]), play: md(62, [0, 3, 5, 9]), chord: true }, 'Il tritono resta sempre!'),
        page('Terzo rivolto', 'Con la settima al basso, Fa Sol Si Re, si ha il terzo rivolto, cifrato 4/2. La settima al basso vuole scendere di grado: qui il Fa deve andare al Mi.', 'Terzo rivolto: settima al basso (4/2).', { base: 65, notes: mk(65, [[0, 7, '♭7'], [2, 1, '1'], [6, 3, '3'], [9, 5, '5']]), play: md(65, [0, 2, 6, 9]), chord: true }, 'La settima scende!'),
      ],
    },
    3: {
      pages: [
        page('Cos’è il basso numerato', 'Nel basso numerato si scrive solo la linea del basso e sotto ogni nota si mettono delle cifre. Le cifre indicano gli intervalli da costruire sopra il basso. Era il modo di notare l’armonia nel periodo barocco.', 'Basso + cifre = armonia.', { notes: [] }, 'Un codice molto antico!'),
        page('Le cifre da ricordare', 'Per le triadi: niente cifra o 5/3 per lo stato fondamentale, 6 per il primo rivolto, 6/4 per il secondo. Per le quadriadi: 7 per lo stato fondamentale, 6/5, 4/3 e 4/2 per i tre rivolti.', 'Triadi: 5/3 · 6 · 6/4 — Quadriadi: 7 · 6/5 · 4/3 · 4/2', { notes: [] }, 'Se vedi il 6, il basso è la terza!'),
      ],
    },
    4: {
      pages: [
        page('Una linea di basso che scorre', 'I rivolti servono a far muovere il basso per gradi congiunti, invece che a salti. In Do, Sol/Si, La minore, Sol/Si… la linea Do–Si–La scende con grande naturalezza.', 'Rivolti = basso più cantabile.', { notes: [], play: [md(60, [0, 4, 7]), md(59, [0, 3, 8]), md(57, [0, 3, 7])], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'V6', sym: 'G/B' }, { fn: 'vi', sym: 'Am' }] }, 'Senti il basso che scende?'),
        page('Le sigle con la barra', 'Nelle sigle moderne il rivolto si scrive con una barra: dopo la barra c’è la nota al basso. C/E significa Do maggiore con il Mi al basso, ovvero il primo rivolto. C/G è il secondo.', 'C/E = primo rivolto · C/G = secondo rivolto', { base: 64, notes: mk(64, [[0, 3, '3'], [3, 5, '5'], [8, 1, '1']]), play: md(64, [0, 3, 8]), chord: true }, 'La barra dice chi sta al basso!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta questa triade di Do. Che posizione ha?', kind: 'chord', play: md(60, [0, 4, 7]), options: ['Stato fondamentale', 'Primo rivolto', 'Secondo rivolto', 'Terzo rivolto'], answer: 0, explanation: 'Il Do è la nota più bassa: stato fondamentale.' },
        { prompt: 'Ascolta questa triade di Do. Che posizione ha?', kind: 'chord', play: md(64, [0, 3, 8]), options: ['Stato fondamentale', 'Primo rivolto', 'Secondo rivolto', 'Terzo rivolto'], answer: 1, explanation: 'Il Mi, la terza, è la nota più bassa: primo rivolto.' },
        { prompt: 'Ascolta questa triade di Do. Che posizione ha?', kind: 'chord', play: md(55, [0, 5, 9]), options: ['Stato fondamentale', 'Primo rivolto', 'Secondo rivolto', 'Terzo rivolto'], answer: 2, explanation: 'Il Sol, la quinta, è la nota più bassa: secondo rivolto.' },
        { prompt: 'Ascolta questo G7. Che posizione ha?', kind: 'chord', play: md(59, [0, 3, 6, 8]), options: ['Stato fondamentale', 'Primo rivolto', 'Secondo rivolto', 'Terzo rivolto'], answer: 1, explanation: 'Il Si, la terza, è al basso: primo rivolto, 6/5.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Quale nota sta al basso nel primo rivolto?', options: ['La fondamentale', 'La terza', 'La quinta', 'La settima'], answer: 1, explanation: 'Primo rivolto: terza al basso.' },
        { prompt: 'Come si cifra il secondo rivolto di una triade?', options: ['6', '6/4', '5/3', '4/2'], answer: 1, explanation: 'Il secondo rivolto della triade è 6/4.' },
        { prompt: 'Con la quinta al basso, un accordo di settima è in...', options: ['stato fondamentale (7)', 'primo rivolto (6/5)', 'secondo rivolto (4/3)', 'terzo rivolto (4/2)'], answer: 2, explanation: 'La quinta al basso dà il secondo rivolto, cifrato 4/3.' },
        { prompt: 'Che cosa significa C/E?', options: ['Do maggiore con Mi al basso', 'Do minore con Mi al basso', 'Do e Mi insieme come due accordi', 'Mi maggiore con Do al basso'], answer: 0, explanation: 'Dopo la barra c’è la nota al basso: primo rivolto di Do.' },
        { prompt: 'Il rivolto di un accordo cambia...', options: ['il nome dell’accordo', 'la qualità dell’accordo', 'solo la nota più bassa', 'la tonalità'], answer: 2, explanation: 'Le note restano le stesse, cambia quale sta al basso.' },
      ],
    },
  },
}
