import { mk, md, n, page } from './helpers'

const CM7 = md(60, [0, 4, 7, 11])

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'Accordi paralleli e impressionismo', min: 4 },
    { id: 2, kind: 'lesson', title: 'Accordi per quarte', min: 4 },
    { id: 3, kind: 'lesson', title: 'Politonalità e poliaccordi', min: 4 },
    { id: 4, kind: 'lesson', title: 'Pedali e armonia modale', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci i colori moderni', min: 5 },
    { id: 6, kind: 'build', title: 'Costruisci accordi per quarte', min: 5 },
    { id: 7, kind: 'apply', title: 'Componi una frase con accordi paralleli', min: 6 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Il colore prima della funzione', 'Alla fine dell’Ottocento alcuni compositori, come Debussy, usano gli accordi per il loro colore e non per la loro funzione. Gli accordi non devono più risolvere: si ascoltano per il suono che hanno.', 'Colore invece di funzione.', { notes: [] }, 'Gli accordi come pennellate!'),
        page('Gli accordi paralleli', 'Si prende la forma di un accordo e la si sposta identica, grado dopo grado. CΔ – DΔ – EΔ è una successione di accordi paralleli: la struttura resta la stessa, cambia solo l’altezza. Nella teoria tradizionale sarebbe un errore, qui è una scelta espressiva.', 'Stessa forma, altezze diverse.', { notes: [], play: [CM7, md(62, [0, 4, 7, 11]), md(64, [0, 4, 7, 11])], progression: true, chords: [{ fn: '', sym: 'CΔ' }, { fn: '', sym: 'DΔ' }, { fn: '', sym: 'EΔ' }] }, 'Un’onda di suono che scorre!'),
        page('Scale esatonali', 'La scala esatonale, fatta di soli toni, non ha un centro tonale. Gli impressionisti la usano per ottenere un’atmosfera sospesa e sfuggente. Da questa scala si ricavano accordi eccedenti e dominanti con quinta alterata.', 'Esatonale = nessun centro.', { notes: mk(60, [[0, 1, '1'], [2, 2, '2'], [4, 3, '3'], [6, 4, '♯4'], [8, 5, '♯5'], [10, 7, '♭7'], [12, 1, '1']]), play: md(60, [0, 2, 4, 6, 8, 10, 12]) }, 'Suona come un sogno!'),
      ],
    },
    2: {
      pages: [
        page('Sovrapporre quarte', 'Un accordo per quarte è costruito sovrapponendo quarte giuste invece di terze. Da Do: Do Fa Si♭. Il suono è aperto e ambiguo, perché non è né maggiore né minore.', 'Quartale = quarte giuste sovrapposte.', { notes: mk(60, [[0, 1, '1'], [5, 4, '4'], [10, 7, '♭7']]), play: md(60, [0, 5, 10]), chord: true }, 'Né maggiore né minore!'),
        page('Il suono del jazz modale', 'Gli accordi per quarte sono tipici del jazz modale degli anni Sessanta. Il celebre accordo di “So What” ha quattro quarte giuste sovrapposte, con una terza maggiore in cima. Si suona con un’armonia lenta, su una sola scala.', 'Jazz modale: poche scale, accordi per quarte.', { notes: [] }, 'Spazio e respiro!'),
      ],
    },
    3: {
      pages: [
        page('Due accordi insieme', 'La politonalità sovrappone due tonalità, o due accordi, nello stesso momento. Un poliaccordo si scrive con una barra: D/C significa Re maggiore sopra Do. Le note sono quelle di entrambi gli accordi insieme.', 'Poliaccordo = due triadi sovrapposte.', { notes: [], play: md(60, [0, 4, 7, 14, 18, 21]), chord: true }, 'Due colori insieme!'),
        page('L’accordo di Petruška', 'Nel balletto “Petruška” di Stravinskij compare un celebre accordo: una triade di Do maggiore sovrapposta a una di Fa♯ maggiore. Le due triadi sono a distanza di tritono e il risultato è insieme tesissimo e magnetico.', 'Do maggiore + Fa♯ maggiore', { notes: [n(60, 1, 'C'), n(64, 1, 'E'), n(67, 1, 'G'), n(66, 5, 'F♯'), n(70, 5, 'A♯'), n(61, 5, 'C♯')], play: md(60, [0, 4, 7, 6, 10, 13]), chord: true }, 'Due triadi a un tritono!'),
      ],
    },
    4: {
      pages: [
        page('La nota che resta', 'Un pedale è una nota tenuta nel basso mentre sopra gli accordi cambiano. Il pedale di tonica ancora l’armonia: tutto sembra muoversi, ma il suolo non cambia. È molto usato nella musica modale, nel rock e nelle colonne sonore.', 'Pedale = nota ferma al basso.', { notes: [], play: [md(48, [0, 12, 16, 19]), md(48, [0, 12, 17, 21]), md(48, [0, 11, 14, 19]), md(48, [0, 12, 16, 19])], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'IV/1', sym: 'F/C' }, { fn: 'V/1', sym: 'G/C' }, { fn: 'I', sym: 'C' }] }, 'Il Do non si muove mai!'),
        page('Il pedale di dominante', 'Il pedale può stare anche sulla dominante: sopra il Sol si possono suonare accordi di tonica e sottodominante. Crea una grande tensione, che si scioglie quando il pedale finalmente si muove e arriva alla tonica.', 'Pedale di dominante = tensione che sale.', { notes: [] }, 'Tutto aspetta il Do!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che cosa hanno di particolare questi accordi?', kind: 'progression', play: [CM7, md(62, [0, 4, 7, 11]), md(64, [0, 4, 7, 11])], options: ['Sono paralleli', 'Formano una cadenza autentica', 'Hanno un pedale', 'Sono diminuiti'], answer: 0, explanation: 'La stessa forma si sposta identica: accordi paralleli.' },
        { prompt: 'Ascolta: com’è costruito questo accordo?', kind: 'chord', play: md(60, [0, 5, 10]), options: ['Per terze, maggiore', 'Per quarte', 'Triade eccedente', 'Settima di dominante'], answer: 1, explanation: 'Do Fa Si♭ sono quarte giuste sovrapposte.' },
        { prompt: 'Ascolta: che cosa senti?', kind: 'chord', play: md(60, [0, 4, 7, 6, 10, 13]), options: ['Settima di dominante', 'Due triadi sovrapposte', 'Triade eccedente', 'Accordo per quarte'], answer: 1, explanation: 'Do maggiore e Fa♯ maggiore insieme: poliaccordo.' },
        { prompt: 'Ascolta: che cosa resta fermo?', kind: 'progression', play: [md(48, [0, 12, 16, 19]), md(48, [0, 12, 17, 21]), md(48, [0, 11, 14, 19]), md(48, [0, 12, 16, 19])], options: ['Pedale di tonica', 'Cambio di tonalità', 'Cadenza plagale', 'Modulazione'], answer: 0, explanation: 'Il Do al basso resta fermo mentre gli accordi cambiano.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Che cosa sono gli accordi paralleli?', options: ['Accordi con la stessa fondamentale', 'La stessa forma spostata grado per grado', 'Accordi con quinta alterata', 'Accordi in rivolto'], answer: 1, explanation: 'La struttura resta identica, cambia solo l’altezza.' },
        { prompt: 'Come è costruito un accordo quartale?', options: ['Per terze', 'Per quarte giuste', 'Per seste', 'Per quinte aumentate'], answer: 1, explanation: 'Sovrapponendo quarte giuste.' },
        { prompt: 'Che cos’è la politonalità?', options: ['Una scala di sei note', 'Due tonalità o accordi insieme', 'Un accordo di sette note', 'Un cambio di modo'], answer: 1, explanation: 'Due tonalità sovrapposte nello stesso momento.' },
        { prompt: 'Che cos’è un pedale?', options: ['Una nota tenuta nel basso', 'Un accordo di passaggio', 'Una scala cromatica', 'Una cadenza'], answer: 0, explanation: 'Il basso resta fermo mentre gli accordi cambiano.' },
        { prompt: 'Quale scala è tipica dell’impressionismo?', options: ['Pentatonica maggiore', 'Esatonale', 'Blues', 'Minore armonica'], answer: 1, explanation: 'L’esatonale non ha centro tonale: atmosfera sospesa.' },
      ],
    },
  },
}
