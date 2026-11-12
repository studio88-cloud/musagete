import { mk, md, F, page } from './helpers'

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'Le triadi sui gradi', min: 4 },
    { id: 2, kind: 'lesson', title: 'Le quadriadi sui gradi', min: 4 },
    { id: 3, kind: 'lesson', title: 'Le funzioni armoniche', min: 4 },
    { id: 4, kind: 'lesson', title: 'Armonizzare la minore', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci gli accordi della scala', min: 5 },
    { id: 6, kind: 'build', title: 'Armonizza una scala sullo strumento', min: 5 },
    { id: 7, kind: 'apply', title: 'Suona gli accordi di una tonalità', min: 5 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Un accordo per ogni grado', 'Armonizzare la scala significa costruire un accordo su ciascun suo grado, usando solo le note della scala. Si parte da un grado e si aggiungono la nota due gradi sopra e quella quattro gradi sopra: così si saltano le note una sì e una no.', 'Su ogni grado: nota + terza + quinta, tutte dalla scala.', { notes: mk(60, [[0, 1, '1'], [4, 3, '3'], [7, 5, '5']]), play: md(60, [0, 4, 7]), chord: true }, 'Partiamo dal primo grado!'),
        page('Le qualità degli accordi', 'In Do maggiore le triadi sono: Do, Re minore, Mi minore, Fa, Sol, La minore, Si diminuito. Tre sono maggiori (I, IV, V), tre minori (ii, iii, vi) e una diminuita (vii). Questa sequenza è identica in tutte le tonalità maggiori.', 'Maggiori: I IV V · Minori: ii iii vi · Diminuita: vii°', { base: 62, notes: mk(62, F.min), play: md(62, [0, 3, 7]), chord: true }, 'Ecco il ii grado: Re minore!'),
        page('I numeri romani', 'I gradi si indicano con numeri romani: maiuscoli per gli accordi maggiori, minuscoli per i minori, con ° per il diminuito. In Do maggiore: I, ii, iii, IV, V, vi, vii°. Si può così scrivere una progressione valida in qualsiasi tonalità.', 'I · ii · iii · IV · V · vi · vii°', { notes: [], play: [md(60, [0, 4, 7]), md(62, [0, 3, 7]), md(64, [0, 3, 7]), md(65, [0, 4, 7]), md(67, [0, 4, 7]), md(69, [0, 3, 7]), md(71, [0, 3, 6])], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'ii', sym: 'Dm' }, { fn: 'iii', sym: 'Em' }, { fn: 'IV', sym: 'F' }, { fn: 'V', sym: 'G' }, { fn: 'vi', sym: 'Am' }, { fn: 'vii°', sym: 'B°' }] }, 'Ascolta l’intera scala armonizzata!'),
      ],
    },
    2: {
      pages: [
        page('Le quadriadi sui gradi', 'Aggiungendo un’altra terza a ogni accordo si ottengono le quadriadi. In Do maggiore: CΔ, Dm7, Em7, FΔ, G7, Am7, Bø7. La settima fa parte della scala, quindi non serve alterare nessuna nota.', 'IΔ · ii7 · iii7 · IVΔ · V7 · vi7 · viiø7', { notes: mk(60, F.maj7), play: md(60, [0, 4, 7, 11]), chord: true }, 'Le stesse note, un suono più ricco!'),
        page('Il V7: la dominante', 'L’unica settima di dominante della scala (G7) nasce sul quinto grado. Contiene il tritono tra Si e Fa, un intervallo molto instabile che “chiede” di risolvere sul I. Per questo il V7 è l’accordo più importante della tonalità.', 'V7 = 1 3 5 ♭7 sul quinto grado', { base: 55, notes: mk(55, F.dom7), play: md(55, [0, 4, 7, 10]), chord: true }, 'Senti la tensione di G7?'),
        page('Il settimo grado', 'Sul settimo grado la quadriade è Bø7 (Si Re Fa La), un semidiminuito. Ha la stessa tensione del V7 e infatti spesso lo sostituisce. Ricorda: in maggiore il vii è sempre ø7, non diminuito intero.', 'viiø7 = 1 ♭3 ♭5 ♭7', { base: 59, notes: mk(59, F.hdim7), play: md(59, [0, 3, 6, 10]), chord: true }, 'Il semidiminuito della scala!'),
      ],
    },
    3: {
      pages: [
        page('Le tre funzioni', 'Gli accordi della scala hanno tre funzioni. La tonica dà riposo, la sottodominante allontana dal riposo, la dominante crea tensione e chiede di tornare alla tonica. Ogni accordo appartiene a una di queste famiglie.', 'Tonica = riposo · Sottodominante = movimento · Dominante = tensione', { notes: [], play: [md(60, [0, 4, 7]), md(65, [0, 4, 7]), md(67, [0, 4, 7, 10]), md(60, [0, 4, 7])], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'IV', sym: 'F' }, { fn: 'V7', sym: 'G7' }, { fn: 'I', sym: 'C' }] }, 'Riposo, viaggio, tensione, casa!'),
        page('Chi fa che cosa', 'La tonica è il I, con i suoi sostituti iii e vi. La sottodominante è IV, con ii. La dominante è V, con vii°. Gli accordi della stessa famiglia si possono scambiare tra loro senza cambiare il senso della frase.', 'T: I iii vi · SD: ii IV · D: V vii°', { notes: [], play: [md(60, [0, 4, 7]), md(62, [0, 3, 7]), md(67, [0, 4, 7]), md(60, [0, 4, 7])], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'ii', sym: 'Dm' }, { fn: 'V', sym: 'G' }, { fn: 'I', sym: 'C' }] }, 'Qui ii prende il posto di IV!'),
        page('Il percorso tipico', 'Il percorso più comune va da tonica a sottodominante, poi dominante, poi di nuovo tonica: T – SD – D – T. Si può saltare un passaggio ma, di solito, la dominante torna alla tonica e non il contrario.', 'T → SD → D → T', { notes: [] }, 'Un giro che si ritrova ovunque!'),
      ],
    },
    4: {
      pages: [
        page('Gli accordi della minore', 'In La minore naturale le triadi sono: Am, B°, C, Dm, Em, F, G. In numeri romani: i, ii°, ♭III, iv, v, ♭VI, ♭VII. Gli accordi sono gli stessi di Do maggiore, ma il centro è il La: è la relativa minore.', 'i · ii° · ♭III · iv · v · ♭VI · ♭VII', { base: 57, notes: mk(57, F.min), play: md(57, [0, 3, 7]), chord: true }, 'Stessi accordi, nuovo centro!'),
        page('Il V maggiore', 'Nella minore naturale il quinto grado è minore (Em) e non crea una vera tensione verso il La. Si alza allora il settimo grado (Sol♯) e il V diventa maggiore: E o E7. Così nasce la minore armonica.', 'Minore armonica: V maggiore (E, E7) e vii° (G♯°)', { base: 64, notes: mk(64, F.dom7), play: md(64, [0, 4, 7, 10]), chord: true }, 'Il Sol♯ fa tutta la differenza!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta questo accordo, costruito sul II grado di Do maggiore. Che qualità ha?', kind: 'chord', play: md(62, [0, 3, 7]), options: ['Maggiore', 'Minore', 'Diminuito', 'Eccedente'], answer: 1, explanation: 'Re Fa La: terza minore, quinta giusta. Il ii grado è minore.' },
        { prompt: 'Ascolta questo accordo, costruito sul VII grado di Do maggiore. Che qualità ha?', kind: 'chord', play: md(71, [0, 3, 6]), options: ['Maggiore', 'Minore', 'Diminuito', 'Eccedente'], answer: 2, explanation: 'Si Re Fa: terza minore e quinta bemolle. Il vii è diminuito.' },
        { prompt: 'Ascolta questo accordo, costruito sul V grado di Do maggiore. Che qualità ha?', kind: 'chord', play: md(67, [0, 4, 7]), options: ['Maggiore', 'Minore', 'Diminuito', 'Sospeso'], answer: 0, explanation: 'Sol Si Re: il V grado di una scala maggiore è maggiore.' },
        { prompt: 'Ascolta questo accordo sul V grado con la settima. Come si chiama?', kind: 'chord', play: md(67, [0, 4, 7, 10]), options: ['Settima maggiore', 'Settima di dominante', 'Minore settima', 'Diminuito'], answer: 1, explanation: 'Sol Si Re Fa è la settima di dominante: G7.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Che qualità ha la triade sul IV grado di Do maggiore?', options: ['Minore', 'Maggiore', 'Diminuita', 'Eccedente'], answer: 1, explanation: 'Fa La Do è maggiore: nelle tonalità maggiori I, IV e V sono maggiori.' },
        { prompt: 'Quale grado della scala maggiore ha la triade diminuita?', options: ['II', 'IV', 'VI', 'VII'], answer: 3, explanation: 'La sensibile porta una triade diminuita, nel nostro caso Si Re Fa.' },
        { prompt: 'Che funzione ha l’accordo sul V grado?', options: ['Tonica', 'Sottodominante', 'Dominante', 'Mediante'], answer: 2, explanation: 'Il V è la dominante: crea tensione e chiede di tornare al I.' },
        { prompt: 'Qual è la triade sul VI grado di Do maggiore?', options: ['La maggiore', 'La minore', 'Mi minore', 'La diminuito'], answer: 1, explanation: 'La Do Mi è un accordo minore: vi grado.' },
        { prompt: 'Che accordo di quattro note si forma sul I grado di una scala maggiore?', options: ['Settima di dominante', 'Minore settima', 'Settima maggiore', 'Semidiminuito'], answer: 2, explanation: 'Do Mi Sol Si: CΔ, settima maggiore.' },
      ],
    },
  },
}
