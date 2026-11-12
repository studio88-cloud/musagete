import { md, page } from './helpers'

const C = md(60, [0, 4, 7])
const F_ = md(60, [5, 9, 12])
const G = md(55, [0, 4, 7])
const Am = md(57, [0, 3, 7])
const Bb = md(58, [0, 4, 7])

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'I ruoli in un arrangiamento', min: 4 },
    { id: 2, kind: 'lesson', title: 'Accompagnare con il tuo strumento', min: 5 },
    { id: 3, kind: 'lesson', title: 'Condurre le voci', min: 4 },
    { id: 4, kind: 'lesson', title: 'La forma di un brano', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci i giri di accordi', min: 5 },
    { id: 6, kind: 'build', title: 'Accompagna un giro di accordi', min: 6 },
    { id: 7, kind: 'apply', title: 'Arrangia una canzone semplice', min: 8 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Chi fa che cosa', 'In un arrangiamento ogni strumento ha un ruolo. La melodia canta, il basso dà il fondamento, gli accordi riempiono l’armonia e il ritmo tiene il tempo. Se tutti fanno la stessa cosa, il suono si confonde.', 'Melodia · basso · armonia · ritmo', { notes: [] }, 'Ognuno al suo posto!'),
        page('Lasciare spazio', 'Il segreto di un buon arrangiamento è lasciare spazio. Gli accordi molto fitti nelle note gravi suonano confusi e coprono il basso. Meglio tenere gli accordi nel registro medio e lasciare le note più basse alla linea del basso.', 'Basso in basso, accordi nel mezzo.', { notes: [] }, 'Meno note, più chiarezza!'),
      ],
    },
    2: {
      pages: [
        page('Sulla tastiera', 'Con la tastiera si usano le due mani: la sinistra suona la fondamentale, spesso raddoppiata all’ottava, la destra suona l’accordo. Si possono variare i ritmi: accordi tenuti, ripetuti o spezzati in arpeggio.', 'Sinistra: basso · Destra: accordo', { notes: [] }, 'Due mani, due ruoli!'),
        page('Sulla chitarra', 'La chitarra accompagna con il battere di plettro (strumming) o con arpeggi. Per lo strumming si mantiene un ritmo costante di giù e su e si accentuano i tempi forti. Con gli arpeggi si suonano le corde dell’accordo una alla volta.', 'Strumming o arpeggio.', { notes: [] }, 'Il ritmo è la tua mano destra!'),
        page('Sul basso', 'Il basso suona soprattutto la fondamentale di ogni accordo e la quinta, sui tempi forti. Con più esperienza si passa al walking bass, una linea di note per gradi congiunti che collega le fondamentali, come nel jazz.', 'Fondamentale e quinta · poi walking bass.', { notes: [] }, 'Il basso tiene tutto insieme!'),
      ],
    },
    3: {
      pages: [
        page('Muoversi il meno possibile', 'Condurre le voci significa passare da un accordo all’altro muovendo ogni nota il meno possibile. Da Do (Do Mi Sol) a Fa (Do Fa La) il Do resta fermo, il Mi sale al Fa e il Sol sale al La: poco movimento, suono fluido.', 'Note comuni ferme, le altre per grado.', { notes: [], play: [C, md(60, [0, 5, 9])], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'IV', sym: 'F' }] }, 'Il Do non si muove!'),
        page('Il basso come guida', 'Il basso può guidare il movimento: se scende o sale per gradi, l’armonia scorre in modo naturale. Si usano i rivolti proprio per questo: C – G/B – Am ha un basso Do – Si – La molto cantabile.', 'Basso per gradi, accordi di conseguenza.', { notes: [], play: [C, md(59, [0, 3, 8]), Am], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'V6', sym: 'G/B' }, { fn: 'vi', sym: 'Am' }] }, 'Senti come scorre?'),
      ],
    },
    4: {
      pages: [
        page('Le sezioni', 'Un brano si divide in sezioni: l’introduzione, la strofa, il ritornello, il ponte e la conclusione. La strofa racconta, il ritornello è la parte più memorabile e si ripete uguale, il ponte offre un contrasto prima dell’ultimo ritornello.', 'Intro · strofa · ritornello · ponte · fine', { notes: [] }, 'Una storia in quattro tappe!'),
        page('Costruire l’intensità', 'Un arrangiamento cresce in intensità: si parte con pochi strumenti e si aggiungono man mano più voci e più forza fino al ritornello. Togliere strumenti subito prima è un modo efficace per far risaltare il ritorno.', 'Cresci, poi togli, poi esplodi.', { notes: [] }, 'La dinamica racconta!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che giro di accordi senti?', kind: 'progression', play: [C, F_, md(55, [0, 4, 7]), C], options: ['I – V – vi – IV', 'I – IV – V – I', 'I – vi – IV – V', 'I – ♭VII – IV – I'], answer: 1, explanation: 'Do – Fa – Sol – Do: I – IV – V – I.' },
        { prompt: 'Ascolta: che giro di accordi senti?', kind: 'progression', play: [C, Am, F_, G], options: ['I – IV – V – I', 'I – V – vi – IV', 'I – vi – IV – V', 'I – ♭VII – IV – I'], answer: 2, explanation: 'Do – La minore – Fa – Sol: I – vi – IV – V.' },
        { prompt: 'Ascolta: che giro di accordi senti?', kind: 'progression', play: [C, G, Am, F_], options: ['I – vi – IV – V', 'I – IV – V – I', 'I – ♭VII – IV – I', 'I – V – vi – IV'], answer: 3, explanation: 'Do – Sol – La minore – Fa: I – V – vi – IV.' },
        { prompt: 'Ascolta: che giro di accordi senti?', kind: 'progression', play: [C, Bb, F_, C], options: ['I – ♭VII – IV – I', 'I – V – vi – IV', 'I – IV – V – I', 'I – vi – IV – V'], answer: 0, explanation: 'Do – Si♭ – Fa – Do: I – ♭VII – IV – I.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Qual è il ruolo principale del basso?', options: ['Cantare la melodia', 'Dare il fondamento armonico e ritmico', 'Suonare solo accordi', 'Riempire gli spazi vuoti'], answer: 1, explanation: 'Il basso suona le fondamentali e tiene insieme armonia e ritmo.' },
        { prompt: 'Che cosa significa condurre le voci?', options: ['Cantare più forte', 'Muovere il meno possibile le note tra accordi', 'Cambiare tonalità spesso', 'Suonare sempre in rivolto'], answer: 1, explanation: 'Le note comuni restano ferme e le altre si muovono per grado.' },
        { prompt: 'Passando da Do a Fa, quale nota resta ferma?', options: ['Mi', 'Sol', 'Do', 'Nessuna'], answer: 2, explanation: 'Il Do è in comune: Do Mi Sol e Do Fa La.' },
        { prompt: 'Qual è la sezione più memorabile e ripetuta?', options: ['La strofa', 'Il ponte', 'Il ritornello', 'L’introduzione'], answer: 2, explanation: 'Il ritornello torna uguale ed è quello che resta in mente.' },
        { prompt: 'Quali note suona di solito un bassista sui tempi forti?', options: ['Fondamentale e quinta', 'Terza e settima', 'Nona e tredicesima', 'Solo la quarta'], answer: 0, explanation: 'Fondamentale e quinta sono le note più stabili.' },
      ],
    },
  },
}
