import { mk, md, page } from './helpers'

const Dm7 = md(62, [0, 3, 7, 10])
const G7 = md(55, [0, 4, 7, 10])
const Db7 = md(61, [0, 4, 7, 10])
const CM7 = md(60, [0, 4, 7, 11])
const Am7 = md(57, [0, 3, 7, 10])

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'La sostituzione tritonale', min: 4 },
    { id: 2, kind: 'lesson', title: 'Sostituire per terze', min: 4 },
    { id: 3, kind: 'lesson', title: 'Diminuiti e II–V di passaggio', min: 4 },
    { id: 4, kind: 'lesson', title: 'Le sostituzioni in pratica', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci la sostituzione', min: 5 },
    { id: 6, kind: 'build', title: 'Sostituisci gli accordi sullo strumento', min: 5 },
    { id: 7, kind: 'apply', title: 'Reharmonizza un giro', min: 6 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Un tritono, due accordi', 'G7 contiene il tritono Si–Fa, la tensione che chiede risoluzione. Anche D♭7 (Re♭ Fa La♭ Do♭) contiene lo stesso tritono: Fa e Do♭, che è un Si. I due accordi hanno quindi le stesse note guida, a ruoli invertiti.', 'G7 e D♭7 condividono il tritono Si–Fa.', { base: 59, notes: mk(59, [[0, 3, '3'], [6, 7, '♭7']]), play: md(59, [0, 6]), chord: true }, 'Lo stesso tritono!'),
        page('Il sostituto tritonale', 'Il sostituto tritonale si trova alla distanza di un tritono dall’accordo originale: D♭7 al posto di G7. Risolve sul Do con un semitono discendente nel basso, Re♭ → Do. È molto usato nel jazz.', 'V7 → ♭II7', { notes: [], play: [Db7, CM7], progression: true, chords: [{ fn: '♭II7', sym: 'D♭7' }, { fn: 'IΔ', sym: 'CΔ' }] }, 'Il basso scende per semitono!'),
      ],
    },
    2: {
      pages: [
        page('Accordi imparentati', 'Alcuni accordi hanno note in comune e possono sostituirsi. CΔ (Do Mi Sol Si) e Am7 (La Do Mi Sol) condividono quasi tutte le note, e lo stesso vale per Em7 (Mi Sol Si Re). Sono i tre accordi di tonica.', 'I ↔ vi ↔ iii', { base: 57, notes: mk(57, [[0, 6, '1'], [3, 1, '♭3'], [7, 3, '5'], [10, 5, '♭7']]), play: Am7, chord: true }, 'Am7 è un CΔ col La al basso!'),
        page('Vii e V', 'Anche il V7 ha un parente: Bø7 (Si Re Fa La) contiene le note guida di G7 e ne ha la stessa funzione. Si può quindi usare Bø7 al posto di G7, anche se il basso diventa più leggero.', 'V7 ↔ viim7♭5', { base: 59, notes: mk(59, [[0, 7, '3'], [3, 2, '5'], [6, 4, '♭7'], [10, 6, '9']]), play: md(59, [0, 3, 6, 10]), chord: true }, 'Senti lo stesso colore?'),
      ],
    },
    3: {
      pages: [
        page('Il diminuito al posto del V7♭9', 'Un accordo di dominante con la ♭9, senza fondamentale, è un diminuito. G7♭9 senza il Sol è Si Re Fa La♭, cioè B°7. Perciò il B°7 si può usare al posto di G7♭9 e risolve sul Do.', 'V7♭9 ≈ vii°7', { base: 59, notes: mk(59, [[0, 3, '3'], [3, 5, '5'], [6, 7, '♭7'], [9, 2, '♭9']]), play: md(59, [0, 3, 6, 9]), chord: true }, 'Un accordo che ne contiene un altro!'),
        page('Il II–V di passaggio', 'Prima di qualunque accordo si può inserire il suo II–V. Per arrivare a Re minore si suona Em7 – A7, il II–V di Re. Il giro C – Dm7 diventa così C – Em7 – A7 – Dm7: più movimento, stessa destinazione.', 'Em7 – A7 → Dm7', { notes: [], play: [md(64, [0, 3, 7, 10]), md(57, [0, 4, 7, 10]), Dm7], progression: true, chords: [{ fn: 'ii/ii', sym: 'Em7' }, { fn: 'V7/ii', sym: 'A7' }, { fn: 'ii', sym: 'Dm7' }] }, 'Arrivare con più passi!'),
      ],
    },
    4: {
      pages: [
        page('Il II–V–I con sostituzione', 'Il giro Dm7 – G7 – CΔ diventa Dm7 – D♭7 – CΔ. La linea del basso scende per semitoni: Re, Re♭, Do. Il suono è più morbido e più “jazz”.', 'Dm7 – D♭7 – CΔ', { notes: [], play: [Dm7, Db7, CM7], progression: true, chords: [{ fn: 'iim7', sym: 'Dm7' }, { fn: '♭II7', sym: 'D♭7' }, { fn: 'IΔ', sym: 'CΔ' }] }, 'Il basso scende dolcemente!'),
        page('La regola d’oro', 'Una sostituzione funziona se mantiene la funzione e non va in conflitto con la melodia. Prima di sostituire un accordo controlla la nota che la melodia suona su di esso: deve far parte dell’accordo nuovo oppure essere un’estensione.', 'Mantieni funzione e melodia.', { notes: [] }, 'Ascolta sempre il risultato!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che cadenza finale senti?', kind: 'progression', play: [Db7, CM7], options: ['V7 – I', '♭II7 – I', 'IV – I', 'ii – I'], answer: 1, explanation: 'D♭7 al posto di G7: sostituzione tritonale, con basso che scende per semitono.' },
        { prompt: 'Ascolta: che cosa c’è al posto del V?', kind: 'progression', play: [Dm7, Db7, CM7], options: ['G7', 'D♭7', 'A7', 'F7'], answer: 1, explanation: 'Il basso Re – Re♭ – Do rivela D♭7.' },
        { prompt: 'Ascolta: su quale accordo risolve questo diminuito?', kind: 'progression', play: [md(59, [0, 3, 6, 9]), md(60, [0, 4, 7])], options: ['Do maggiore', 'Fa maggiore', 'Re minore', 'La minore'], answer: 0, explanation: 'B°7 ≈ G7♭9: risolve su Do.' },
        { prompt: 'Ascolta: che accordo senti?', kind: 'chord', play: Db7, options: ['D♭7', 'Re minore settima', 'CΔ', 'Bø7'], answer: 0, explanation: 'Re♭ Fa La♭ Do♭: è D♭7, il sostituto tritonale di G7.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Qual è il sostituto tritonale di G7?', options: ['D7', 'D♭7', 'A♭7', 'C7'], answer: 1, explanation: 'D♭7 dista un tritono da G7 e ha le stesse note guida.' },
        { prompt: 'Quale tritono hanno in comune G7 e D♭7?', options: ['Do – Fa♯', 'Si – Fa', 'Re – La♭', 'Mi – Si♭'], answer: 1, explanation: 'Si e Fa: terza e settima di G7.' },
        { prompt: 'Quale accordo si può usare al posto di CΔ?', options: ['Am7', 'Dm7', 'G7', 'F7'], answer: 0, explanation: 'Am7 ha quasi le stesse note e la stessa funzione di tonica.' },
        { prompt: 'Il B°7 corrisponde a...', options: ['G7♭9 senza fondamentale', 'C7 senza fondamentale', 'D7 con quinta alterata', 'E7 senza terza'], answer: 0, explanation: 'Si Re Fa La♭ sono le note di G7♭9 tranne il Sol.' },
        { prompt: 'Nel II–V–I con sostituzione tritonale il basso...', options: ['sale per quinte', 'scende per semitoni', 'resta fermo', 'salta di terza'], answer: 1, explanation: 'Re – Re♭ – Do: scende di semitono due volte.' },
      ],
    },
  },
}
