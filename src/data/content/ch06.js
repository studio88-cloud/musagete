import { mk, md, F, page } from './helpers'

const C = md(60, [0, 4, 7])
const G = md(55, [0, 4, 7])
const D7 = md(62, [0, 4, 7, 10])
const A7 = md(57, [0, 4, 7, 10])
const Dm = md(62, [0, 3, 7])
const Em = md(64, [0, 3, 7])
const Am = md(57, [0, 3, 7])
const Fmaj = md(65, [0, 4, 7])

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'Cos’è una dominante secondaria', min: 4 },
    { id: 2, kind: 'lesson', title: 'Le dominanti secondarie principali', min: 4 },
    { id: 3, kind: 'lesson', title: 'Come riconoscerle', min: 4 },
    { id: 4, kind: 'lesson', title: 'Usarle nelle progressioni', min: 4 },
    { id: 5, kind: 'ear', title: 'Ascolta la tonicizzazione', min: 5 },
    { id: 6, kind: 'build', title: 'Costruisci le dominanti secondarie', min: 5 },
    { id: 7, kind: 'apply', title: 'Arricchisci un giro di accordi', min: 5 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Una dominante “in prestito”', 'Il V7 risolve sul I. Ma ogni accordo maggiore o minore della tonalità può essere preceduto dalla sua dominante, un accordo di settima di dominante costruito una quinta sopra. Questo accordo si chiama dominante secondaria.', 'Dominante secondaria = V7 di un altro grado.', { notes: mk(62, F.dom7), base: 62, play: D7, chord: true }, 'D7 ha un Fa♯ che non è nella scala di Do!'),
        page('La tonicizzazione', 'Quando una dominante secondaria risolve sul suo accordo, quel grado diventa per un momento la tonica: si dice che viene tonicizzato. D7 – G tonicizza il V grado. L’effetto è come un breve giro in una tonalità vicina.', 'Tonicizzare = trattare un grado come tonica per un istante.', { notes: [], play: [D7, G], progression: true, chords: [{ fn: 'V7/V', sym: 'D7' }, { fn: 'V', sym: 'G' }] }, 'Un attimo di Sol maggiore!'),
      ],
    },
    2: {
      pages: [
        page('V7/V e V7/ii', 'La dominante del V è D7, che porta a Sol. La dominante del ii è A7, che porta a Re minore. Si scrivono V7/V e V7/ii, “V di V” e “V di ii”. Sono le più usate.', 'V7/V = D7 · V7/ii = A7', { notes: [], play: [A7, Dm], progression: true, chords: [{ fn: 'V7/ii', sym: 'A7' }, { fn: 'ii', sym: 'Dm' }] }, 'Ecco il V7/ii!'),
        page('V7/IV, V7/vi e V7/iii', 'La dominante del IV è C7 (porta a Fa), quella del vi è E7 (porta a La minore) e quella del iii è B7 (porta a Mi minore). Il vii° non si tonicizza, perché essendo diminuito non è un vero punto di arrivo.', 'V7/IV = C7 · V7/vi = E7 · V7/iii = B7', { notes: [], play: [md(60, [0, 4, 7, 10]), Fmaj], progression: true, chords: [{ fn: 'V7/IV', sym: 'C7' }, { fn: 'IV', sym: 'F' }] }, 'Il C7 punta al Fa!'),
        page('Come si ricava', 'Si prende l’accordo di arrivo, si sale di una quinta giusta e si costruisce una settima di dominante. Se l’arrivo è il vi (La), la quinta sopra è Mi, quindi si suona E7: Mi Sol♯ Si Re.', 'Arrivo + quinta su = radice della dominante.', { base: 52, notes: mk(52, F.dom7), play: md(52, [0, 4, 7, 10]), chord: true }, 'Una regola semplice!'),
      ],
    },
    3: {
      pages: [
        page('Una nota fuori dalla scala', 'Una dominante secondaria si riconosce perché contiene una nota estranea alla tonalità. In Do maggiore, A7 ha il Do♯, D7 il Fa♯, E7 il Sol♯, B7 il Re♯, C7 il Si♭.', 'La nota estranea tradisce la dominante.', { base: 57, notes: mk(57, F.dom7), play: A7, chord: true }, 'Il Do♯ è l’intruso!'),
        page('Seguire la risoluzione', 'Il modo più sicuro per riconoscerla è guardare dove va: una settima di dominante che scende di quinta verso un accordo diatonico è quasi sempre una dominante secondaria. Se non risolve in quel modo, è un accordo di altro tipo.', 'Settima di dominante + radice che scende di quinta.', { notes: [] }, 'Controlla sempre l’accordo dopo!'),
      ],
    },
    4: {
      pages: [
        page('Dare colore a un giro', 'Prendiamo I–vi–ii–V. Sostituendo il vi con A7 si ha C – A7 – Dm – G7 – C: la dominante secondaria crea una spinta in più verso il ii. Il giro resta lo stesso, ma è più ricco.', 'A7 prima del ii dà spinta.', { notes: [], play: [C, A7, Dm, md(55, [0, 4, 7, 10]), C], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'V7/ii', sym: 'A7' }, { fn: 'ii', sym: 'Dm' }, { fn: 'V7', sym: 'G7' }, { fn: 'I', sym: 'C' }] }, 'Senti quella spinta?'),
        page('Una catena di dominanti', 'Le dominanti secondarie si possono concatenare: ognuna risolve sulla successiva. Per esempio E7 – A7 – D7 – G7 – C, in cui ogni accordo è la dominante del successivo. È una catena molto usata nel jazz e nel ragtime.', 'E7 – A7 – D7 – G7 – C', { notes: [], play: [md(52, [0, 4, 7, 10]), A7, D7, md(55, [0, 4, 7, 10]), C], progression: true, chords: [{ fn: 'V/vi', sym: 'E7' }, { fn: 'V/ii', sym: 'A7' }, { fn: 'V/V', sym: 'D7' }, { fn: 'V7', sym: 'G7' }, { fn: 'I', sym: 'C' }] }, 'Dominanti a catena!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: la dominante secondaria risolve su quale grado di Do maggiore?', kind: 'progression', play: [D7, G], options: ['I', 'IV', 'V', 'vi'], answer: 2, explanation: 'D7 è la dominante di Sol: tonicizza il V grado.' },
        { prompt: 'Ascolta: la dominante secondaria risolve su quale grado di Do maggiore?', kind: 'progression', play: [A7, Dm], options: ['ii', 'iii', 'IV', 'vi'], answer: 0, explanation: 'A7 porta a Re minore: tonicizza il ii.' },
        { prompt: 'Ascolta: la dominante secondaria risolve su quale grado di Do maggiore?', kind: 'progression', play: [md(52, [0, 4, 7, 10]), Am], options: ['ii', 'iii', 'V', 'vi'], answer: 3, explanation: 'E7 porta a La minore: tonicizza il vi.' },
        { prompt: 'Ascolta: la dominante secondaria risolve su quale grado di Do maggiore?', kind: 'progression', play: [md(60, [0, 4, 7, 10]), Fmaj], options: ['II', 'III', 'IV', 'V'], answer: 2, explanation: 'C7 porta a Fa: tonicizza il IV.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Qual è il V7/V in Do maggiore?', options: ['G7', 'D7', 'A7', 'E7'], answer: 1, explanation: 'La dominante di Sol è Re: D7.' },
        { prompt: 'Su quale accordo risolve V7/vi?', options: ['Re minore', 'Mi minore', 'La minore', 'Fa maggiore'], answer: 2, explanation: 'E7 porta a La minore, il vi.' },
        { prompt: 'Quale nota estranea alla scala di Do contiene A7?', options: ['Fa♯', 'Sol♯', 'Do♯', 'Si♭'], answer: 2, explanation: 'A7 è La Do♯ Mi Sol: il Do♯ non è nella scala di Do.' },
        { prompt: 'Che cosa significa tonicizzare un grado?', options: ['Cambiare la tonalità del brano', 'Trattarlo per un istante come tonica', 'Trasporlo un’ottava sopra', 'Eliminarlo dalla progressione'], answer: 1, explanation: 'Si prepara con la sua dominante e lo si tratta come tonica per un attimo, senza cambiare tonalità.' },
        { prompt: 'Quale grado non si tonicizza di solito?', options: ['ii', 'IV', 'vi', 'vii°'], answer: 3, explanation: 'Il vii° è diminuito: non è un buon punto d’arrivo.' },
      ],
    },
  },
}
