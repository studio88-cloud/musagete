import { mk, md, page } from './helpers'

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'La melodia sull’armonia', min: 4 },
    { id: 2, kind: 'lesson', title: 'Il motivo e il suo sviluppo', min: 4 },
    { id: 3, kind: 'lesson', title: 'Improvvisare passo dopo passo', min: 5 },
    { id: 4, kind: 'lesson', title: 'Dal giro di accordi al brano', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci i materiali musicali', min: 5 },
    { id: 6, kind: 'build', title: 'Improvvisa su un giro di accordi', min: 6 },
    { id: 7, kind: 'apply', title: 'Componi il tuo primo brano', min: 10 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Le note dell’accordo', 'Una melodia suona bene sopra un accordo se, nei momenti importanti, usa le sue note. Sui tempi forti si mettono le note dell’accordo; sui tempi deboli si possono usare le altre note della scala, come passaggio.', 'Tempi forti = note dell’accordo.', { notes: mk(60, [[0, 1, '1'], [4, 3, '3'], [7, 5, '5']]), play: md(60, [0, 4, 7, 12]) }, 'Ascolta l’arpeggio di Do!'),
        page('Tensione e risoluzione', 'Una nota fuori dall’accordo crea tensione, e tende a muoversi verso la nota più vicina dell’accordo. Per esempio il Fa sopra Do maggiore chiede di scendere al Mi. La melodia bella è un equilibrio fra tensione e riposo.', 'Nota estranea → nota dell’accordo più vicina.', { notes: mk(60, [[4, 3, 'Mi'], [5, 4, 'Fa']]), play: [65, 64] }, 'Fa che scende al Mi!'),
      ],
    },
    2: {
      pages: [
        page('Il motivo', 'Un motivo è una breve idea melodica e ritmica, di due o tre note, facile da ricordare. Un brano nasce spesso da un unico motivo, poi ripetuto e trasformato.', 'Motivo = piccola idea riconoscibile.', { notes: mk(60, [[0, 1, '1'], [2, 2, '2'], [4, 3, '3']]), play: md(60, [0, 2, 4]) }, 'Tre note bastano!'),
        page('Lo sviluppo', 'Per sviluppare un motivo si può ripeterlo, ripeterlo su altezze diverse (sequenza), invertire la direzione, cambiare il ritmo o allungarlo. Il motivo Do–Re–Mi seguito da Re–Mi–Fa è una sequenza ascendente.', 'Ripetizione · sequenza · inversione · variazione ritmica', { notes: [], play: md(60, [0, 2, 4, 2, 4, 5]) }, 'Lo stesso disegno, più in alto!'),
      ],
    },
    3: {
      pages: [
        page('Primo passo: la pentatonica', 'Per cominciare a improvvisare basta la pentatonica. Sopra un giro in Do maggiore si usano Do Re Mi Sol La, che sono sicure su tutti gli accordi della tonalità. Si parte con poche note e ritmi semplici.', 'Pentatonica = rete di sicurezza.', { notes: mk(60, [[0, 1, '1'], [2, 2, '2'], [4, 3, '3'], [7, 5, '5'], [9, 6, '6']]), play: md(60, [0, 2, 4, 7, 9, 12]) }, 'Cinque note, tante frasi!'),
        page('Secondo passo: le note guida', 'Poi si inizia a seguire gli accordi: sulla terza e sulla settima di ogni accordo la melodia suona la nota guida. Sul G7 si usano il Si e il Fa, e al cambio di accordo la nota si sposta di un semitono: il Fa va al Mi del Do.', 'Terza e settima: segui le note guida.', { notes: mk(55, [[4, 3, '3'], [10, 7, '♭7']]), base: 55, play: [59, 65] }, 'Si e Fa: l’anima di G7!'),
        page('Terzo passo: il respiro', 'Improvvisare non vuol dire suonare sempre. Le pause fanno parte della frase, come le virgole nel discorso. Una buona frase ha un’idea, un seguito e una conclusione. Dopo la frase, lascia spazio.', 'Una frase = idea, seguito, conclusione.', { notes: [] }, 'Le pause parlano!'),
      ],
    },
    4: {
      pages: [
        page('Una forma classica', 'Una forma molto usata nel jazz e nelle canzoni è la forma AABA, di 32 battute: la sezione A (otto battute) si ripete due volte, poi c’è un ponte B diverso e infine di nuovo A. Il ritorno dell’A dà soddisfazione.', 'AABA = 8 + 8 + 8 + 8 battute.', { notes: [] }, 'Ripetere e contrastare!'),
        page('Dal giro al brano', 'Per comporre si può partire da un giro di accordi, aggiungere una melodia e infine arrangiare. Prova: scegli un giro, inventa un motivo di due o tre note, sviluppalo e dai una forma al brano con strofa, ritornello e ponte.', 'Giro → motivo → sviluppo → forma.', { notes: [] }, 'Ora tocca a te!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che cosa senti?', play: md(60, [0, 4, 7, 12]), options: ['Arpeggio maggiore', 'Scala maggiore', 'Pentatonica minore', 'Arpeggio minore'], answer: 0, explanation: 'Le note Do Mi Sol Do formano l’arpeggio di Do maggiore.' },
        { prompt: 'Ascolta: che cosa senti?', play: md(60, [0, 3, 7, 12]), options: ['Arpeggio maggiore', 'Arpeggio minore', 'Scala blues', 'Scala maggiore'], answer: 1, explanation: 'La terza è minore: arpeggio di Do minore.' },
        { prompt: 'Ascolta: che scala senti?', play: md(60, [0, 3, 5, 7, 10, 12]), options: ['Pentatonica maggiore', 'Esatonale', 'Pentatonica minore', 'Scala maggiore'], answer: 2, explanation: 'Cinque note con la terza minore: pentatonica minore.' },
        { prompt: 'Ascolta: come si sviluppa questo motivo?', play: md(60, [0, 2, 4, 2, 4, 5]), options: ['Sequenza ascendente', 'Scala discendente', 'Arpeggio', 'Scala cromatica'], answer: 0, explanation: 'Il motivo Do–Re–Mi viene ripetuto un grado più in alto: sequenza.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Quali note si usano di solito sui tempi forti?', options: ['Le note estranee', 'Le note dell’accordo', 'Solo la tonica', 'Le note cromatiche'], answer: 1, explanation: 'Sui tempi forti le note dell’accordo danno stabilità.' },
        { prompt: 'Che cos’è una sequenza?', options: ['Un motivo ripetuto su altre altezze', 'Una scala di sette note', 'Una cadenza', 'Un tipo di ritmo'], answer: 0, explanation: 'Lo stesso disegno melodico trasposto.' },
        { prompt: 'Quali sono le note guida di un accordo?', options: ['Fondamentale e quinta', 'Terza e settima', 'Nona e tredicesima', 'Seconda e quarta'], answer: 1, explanation: 'Terza e settima ne definiscono il carattere.' },
        { prompt: 'Quale scala è un buon punto di partenza per improvvisare?', options: ['Esatonale', 'Pentatonica', 'Diminuita', 'Alterata'], answer: 1, explanation: 'La pentatonica suona bene sopra quasi tutti gli accordi della tonalità.' },
        { prompt: 'Quante battute ha una forma AABA classica?', options: ['12', '16', '32', '64'], answer: 2, explanation: 'Quattro sezioni da otto battute: 32 in tutto.' },
      ],
    },
  },
}
