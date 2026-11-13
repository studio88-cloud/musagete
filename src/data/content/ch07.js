import { mk, md, F, page } from './helpers'

const C = md(60, [0, 4, 7])
const G = md(55, [0, 4, 7])
const G7 = md(55, [0, 4, 7, 10])
const D7 = md(62, [0, 4, 7, 10])
const Am = md(57, [0, 3, 7])
const Dm = md(62, [0, 3, 7])
const Em = md(64, [0, 3, 7])
const F_ = md(60, [5, 9, 12])

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'Cos’è una modulazione', min: 4 },
    { id: 2, kind: 'lesson', title: 'Le tonalità vicine', min: 4 },
    { id: 3, kind: 'lesson', title: 'L’accordo pivot', min: 4 },
    { id: 4, kind: 'lesson', title: 'Altri modi di modulare', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci il cambio di tonalità', min: 5 },
    { id: 6, kind: 'build', title: 'Modula sullo strumento', min: 5 },
    { id: 7, kind: 'apply', title: 'Modula da Do maggiore a Sol maggiore', min: 6 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Cambiare centro', 'Modulare significa passare da una tonalità a un’altra e fermarsi lì: il nuovo accordo di riferimento diventa la tonica. Non è una dominante secondaria, che dura un attimo. Qui il brano cambia davvero casa.', 'Modulazione = nuova tonica stabile.', { notes: [] }, 'Cambiamo casa, non solo stanza!'),
        page('Tonicizzare o modulare?', 'Una dominante secondaria porta a un accordo e poi si torna alla tonalità di prima. Nella modulazione, dopo l’arrivo, si resta nella nuova tonalità per più battute e la si conferma con una cadenza completa, per esempio Am – D7 – G in Sol maggiore.', 'Cadenza nella nuova tonalità = modulazione.', { notes: [], play: [Am, D7, G], progression: true, chords: [{ fn: 'ii', sym: 'Am' }, { fn: 'V7', sym: 'D7' }, { fn: 'I', sym: 'G' }] }, 'Una cadenza conferma il nuovo centro!'),
      ],
    },
    2: {
      pages: [
        page('Le tonalità più vicine', 'Le tonalità vicine a Do maggiore sono quelle che hanno quasi le stesse note. Sono Sol maggiore (un diesis di differenza), Fa maggiore (un bemolle) e le tre relative minori: La, Mi e Re minore. Con queste la modulazione suona naturale.', 'Vicine a Do: Sol, Fa, La min, Mi min, Re min.', { notes: [] }, 'Più note in comune, più facile è il passaggio!'),
        page('Sol maggiore e la dominante', 'Il passaggio più comune è quello alla tonalità della dominante. Da Do a Sol cambia una sola nota: il Fa diventa Fa♯. La scala di Sol maggiore: Sol La Si Do Re Mi Fa♯ Sol.', 'Sol maggiore: un diesis, il Fa♯.', { base: 55, notes: mk(55, [[0, 1, '1'], [2, 2, '2'], [4, 3, '3'], [5, 4, '4'], [7, 5, '5'], [9, 6, '6'], [11, 7, '7'], [12, 1, '1']]), play: md(55, [0, 2, 4, 5, 7, 9, 11, 12]) }, 'Un solo diesis di differenza!'),
      ],
    },
    3: {
      pages: [
        page('Un accordo che appartiene a due tonalità', 'L’accordo pivot è un accordo che si trova in entrambe le tonalità. In Do maggiore Em è il iii, in Sol maggiore è il vi. Si usa come cerniera: prima lo si ascolta nella vecchia tonalità, poi in quella nuova.', 'Pivot = stesso accordo, due funzioni.', { base: 64, notes: mk(64, F.min), play: md(64, [0, 3, 7]), chord: true }, 'Em è la cerniera!'),
        page('Dal pivot alla cadenza', 'Dopo il pivot si prosegue con gli accordi della nuova tonalità. Per passare da Do a Sol si può suonare: C – Em – Am – D7 – G. Em è il pivot, D7 è il V7 della nuova tonalità e G il suo I.', 'C – Em (pivot) – Am – D7 – G', { notes: [], play: [C, Em, Am, D7, G], progression: true, chords: [{ fn: 'I → ', sym: 'C' }, { fn: 'iii = vi', sym: 'Em' }, { fn: 'ii', sym: 'Am' }, { fn: 'V7', sym: 'D7' }, { fn: 'I', sym: 'G' }] }, 'Senti il cambio?'),
      ],
    },
    4: {
      pages: [
        page('Per dominante', 'Un altro modo è inserire la dominante della nuova tonalità senza preparazione, come D7 dopo il Do, e arrivare a Sol. Si sfrutta la forza del V7 per imporre la nuova tonica, senza accordo pivot.', 'D7 → G impone la nuova tonalità.', { notes: [], play: [C, F_, D7, G], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'IV', sym: 'F' }, { fn: 'V7 di G', sym: 'D7' }, { fn: 'I', sym: 'G' }] }, 'Veloce ed efficace!'),
        page('Per cambio di modo e per stacco', 'Si può passare da Do maggiore a Do minore: stessa tonica, modo diverso. Oppure si può staccare: la frase finisce e il brano riparte in un’altra tonalità, spesso un tono sopra. È il “cambio di tono” di tante canzoni pop.', 'Cambio di modo: C → Cm · Stacco: si riparte più su.', { notes: [], play: [C, md(60, [0, 3, 7])], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'i', sym: 'Cm' }] }, 'Stessa tonica, colore diverso!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: questa progressione modula?', kind: 'progression', play: [C, F_, G7, C], options: ['No: resta sempre nella stessa tonalità', 'Sì: passa a una nuova tonalità', 'Sì: passa da maggiore a minore', 'Non si può dire'], answer: 0, explanation: 'Gli accordi girano intorno al I e si torna a casa: la tonalità non cambia.' },
        { prompt: 'Ascolta: questa progressione modula?', kind: 'progression', play: [C, Em, Am, D7, G, Am, D7, G], options: ['No: resta sempre nella stessa tonalità', 'Sì: si ferma in una nuova tonalità e la conferma', 'No: è solo una breve deviazione', 'Cambia solo il modo'], answer: 1, explanation: 'Dopo il D7 si arriva a un nuovo punto di riposo e lo si conferma con una nuova cadenza: è una modulazione.' },
        { prompt: 'Ascolta: a metà frase c’è un accordo estraneo, ma poi si torna a casa. Che cos’è?', kind: 'progression', play: [C, md(57, [0, 4, 7, 10]), Dm, G7, C], options: ['Una tonicizzazione', 'Una modulazione', 'Un cambio di modo', 'Una cadenza sospesa'], answer: 0, explanation: 'La deviazione è breve e la tonalità di partenza non si abbandona: è una tonicizzazione.' },
        { prompt: 'Ascolta: dopo la prima frase, che cosa succede?', kind: 'progression', play: [C, F_, G7, C, md(62, [0, 4, 7]), G, md(57, [0, 4, 7, 10]), md(62, [0, 4, 7])], options: ['Il brano finisce', 'La stessa frase riparte più in alto, in una nuova tonalità', 'Si passa al modo minore', 'La tonalità non cambia'], answer: 1, explanation: 'È un cambio di tonalità per stacco: la frase ricomincia un tono sopra, senza preparazione.' },
        { prompt: 'Ascolta: la tonica resta la stessa ma il colore cambia. Che cosa succede?', kind: 'progression', play: [C, md(60, [0, 3, 7])], options: ['Cambio di tonica', 'Cambio di modo', 'Cambio di ottava', 'Nessun cambio'], answer: 1, explanation: 'La tonica resta la stessa, ma da maggiore diventa minore.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Che cosa distingue una modulazione da una tonicizzazione?', options: ['La durata e la cadenza nella nuova tonalità', 'Il numero di note', 'Il tempo del brano', 'Lo strumento usato'], answer: 0, explanation: 'Nella modulazione ci si ferma nella nuova tonalità e la si conferma con una cadenza.' },
        { prompt: 'Quale tonalità è vicina a Do maggiore?', options: ['Fa♯ maggiore', 'Sol maggiore', 'Re♭ maggiore', 'Si maggiore'], answer: 1, explanation: 'Sol maggiore ha una sola nota diversa da Do maggiore.' },
        { prompt: 'Che cos’è un accordo pivot?', options: ['Un accordo comune a due tonalità', 'Un accordo di settima di dominante', 'Un accordo che ha la quinta alterata', 'Un accordo in terzo rivolto'], answer: 0, explanation: 'Fa da cerniera: ha una funzione in entrambe le tonalità.' },
        { prompt: 'Em in Do maggiore è il iii. In Sol maggiore è...', options: ['ii', 'iv', 'vi', 'vii°'], answer: 2, explanation: 'Mi minore è il sesto grado di Sol maggiore.' },
        { prompt: 'Per modulare a Sol maggiore, quale V7 serve?', options: ['G7', 'D7', 'A7', 'C7'], answer: 1, explanation: 'La dominante di Sol è Re: D7.' },
      ],
    },
  },
}
