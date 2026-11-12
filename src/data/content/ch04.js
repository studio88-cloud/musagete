import { md, page } from './helpers'

const C = md(60, [0, 4, 7])
const F_ = md(60, [5, 9, 12])
const G7 = md(55, [0, 4, 7, 10])
const G = md(55, [0, 4, 7])
const Am = md(57, [0, 3, 7])
const Dm7 = md(62, [0, 3, 7, 10])
const CM7 = md(60, [0, 4, 7, 11])

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'Le cadenze', min: 4 },
    { id: 2, kind: 'lesson', title: 'Il II–V–I', min: 4 },
    { id: 3, kind: 'lesson', title: 'Le progressioni più comuni', min: 4 },
    { id: 4, kind: 'lesson', title: 'Il ciclo delle quinte', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci la cadenza', min: 5 },
    { id: 6, kind: 'build', title: 'Suona le cadenze sullo strumento', min: 5 },
    { id: 7, kind: 'apply', title: 'Armonizza una melodia semplice', min: 6 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Cosa sono le cadenze', 'Una cadenza è una formula di due o più accordi che chiude una frase musicale, come una punteggiatura. Ci sono cadenze che concludono, altre che lasciano aperto il discorso.', 'Cadenza = chiusura di una frase.', { notes: [], play: [G7, C], progression: true, chords: [{ fn: 'V7', sym: 'G7' }, { fn: 'I', sym: 'C' }] }, 'Ascolta come chiude!'),
        page('Autentica e plagale', 'La cadenza autentica va dalla dominante alla tonica, V–I, ed è la chiusura più forte, come un punto fermo. La cadenza plagale va dalla sottodominante alla tonica, IV–I: è più dolce ed è quella dell’“Amen”.', 'Autentica: V–I · Plagale: IV–I', { notes: [], play: [F_, C], progression: true, chords: [{ fn: 'IV', sym: 'F' }, { fn: 'I', sym: 'C' }] }, 'Ecco la plagale!'),
        page('Sospesa e d’inganno', 'La semicadenza (o cadenza sospesa) si ferma sulla dominante: è una virgola, la frase resta aperta. La cadenza d’inganno va dal V al vi invece che al I: ci si aspetta il riposo e se ne trova un altro, meno stabile.', 'Sospesa: …V · D’inganno: V–vi', { notes: [], play: [md(55, [0, 4, 7]), Am], progression: true, chords: [{ fn: 'V', sym: 'G' }, { fn: 'vi', sym: 'Am' }] }, 'Una piccola sorpresa!'),
      ],
    },
    2: {
      pages: [
        page('Il percorso più usato nel jazz', 'Il II–V–I è la progressione più importante del jazz. In Do maggiore si suonano Dm7, G7 e CΔ. Il ii prepara, il V crea la tensione e il I la risolve.', 'ii7 – V7 – IΔ', { notes: [], play: [Dm7, G7, CM7], progression: true, chords: [{ fn: 'ii7', sym: 'Dm7' }, { fn: 'V7', sym: 'G7' }, { fn: 'IΔ', sym: 'CΔ' }] }, 'Impara a riconoscerlo ovunque!'),
        page('Le note guida', 'Terza e settima di ogni accordo sono le note che ne definiscono il carattere. Nel II–V–I scendono di semitono da un accordo al successivo: il Do di Dm7 passa al Si di G7, e il Fa di G7 al Mi di CΔ.', 'Le note guida scendono di semitono.', { notes: [] }, 'Piccoli passi, grande effetto!'),
        page('Anche in minore', 'In minore il II–V–I usa il semidiminuito sul ii: in La minore Bø7, E7 e Am7. Il V di solito è maggiore (E7) grazie alla sensibile Sol♯.', 'iiø7 – V7 – i7', { notes: [], play: [md(59, [0, 3, 6, 10]), md(52, [0, 4, 7, 10]), md(57, [0, 3, 7, 10])], progression: true, chords: [{ fn: 'iiø7', sym: 'Bø7' }, { fn: 'V7', sym: 'E7' }, { fn: 'i7', sym: 'Am7' }] }, 'Più scuro, ma lo stesso schema!'),
      ],
    },
    3: {
      pages: [
        page('I – V – vi – IV', 'È il giro più usato nella musica pop: in Do maggiore sono Do, Sol, La minore e Fa. Dà il senso di un viaggio che torna sempre in sé. Cambiando l’ordine si ottengono altre canzoni con lo stesso materiale.', 'I – V – vi – IV', { notes: [], play: [C, md(55, [0, 4, 7]), Am, F_], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'V', sym: 'G' }, { fn: 'vi', sym: 'Am' }, { fn: 'IV', sym: 'F' }] }, 'Lo avrai già sentito mille volte!'),
        page('I – vi – IV – V', 'Questo è il giro del doo-wop degli anni Cinquanta. Parte dalla tonica, passa per la relativa minore, poi la sottodominante e arriva alla dominante, pronta a ripartire dal I.', 'I – vi – IV – V', { notes: [], play: [C, Am, F_, md(55, [0, 4, 7])], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'vi', sym: 'Am' }, { fn: 'IV', sym: 'F' }, { fn: 'V', sym: 'G' }] }, 'Un classico senza tempo!'),
      ],
    },
    4: {
      pages: [
        page('Radici che scendono di quinta', 'Il movimento più naturale tra due accordi è la radice che scende di una quinta (o sale di una quarta), come da Sol a Do. Tutto il II–V–I e la cadenza V–I seguono questa regola.', 'Radice ↓ quinta = movimento forte.', { notes: [] }, 'Il basso fa la strada!'),
        page('Il ciclo completo', 'Concatenando questi passi si ottiene il ciclo delle quinte: I – IV – vii – iii – vi – ii – V – I. In Do: CΔ, FΔ, Bø7, Em7, Am7, Dm7, G7, CΔ. Ogni accordo risolve in quello dopo e tutto resta dentro la scala.', 'I IV vii iii vi ii V I', { notes: [], play: [CM7, md(65, [0, 4, 7, 11]), md(59, [0, 3, 6, 10]), md(64, [0, 3, 7, 10]), md(57, [0, 3, 7, 10]), Dm7, G7, CM7], progression: true, chords: [{ fn: 'IΔ', sym: 'CΔ' }, { fn: 'IVΔ', sym: 'FΔ' }, { fn: 'viiø7', sym: 'Bø7' }, { fn: 'iii7', sym: 'Em7' }, { fn: 'vi7', sym: 'Am7' }, { fn: 'ii7', sym: 'Dm7' }, { fn: 'V7', sym: 'G7' }, { fn: 'IΔ', sym: 'CΔ' }] }, 'Un giro che non finisce mai!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che cadenza senti?', kind: 'progression', play: [G7, C], options: ['Autentica', 'Plagale', 'Sospesa', 'D’inganno'], answer: 0, explanation: 'Dalla dominante alla tonica: cadenza autentica V–I.' },
        { prompt: 'Ascolta: che cadenza senti?', kind: 'progression', play: [F_, C], options: ['Autentica', 'Plagale', 'Sospesa', 'D’inganno'], answer: 1, explanation: 'Dalla sottodominante alla tonica: cadenza plagale IV–I.' },
        { prompt: 'Ascolta: che cadenza senti?', kind: 'progression', play: [C, md(55, [0, 4, 7])], options: ['Autentica', 'Plagale', 'Sospesa', 'D’inganno'], answer: 2, explanation: 'La frase si ferma sulla dominante: è una semicadenza, aperta.' },
        { prompt: 'Ascolta: che cadenza senti?', kind: 'progression', play: [md(55, [0, 4, 7]), Am], options: ['Autentica', 'Plagale', 'Sospesa', 'D’inganno'], answer: 3, explanation: 'Dal V al vi: la tonica attesa non arriva, è una cadenza d’inganno.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Come si chiama la cadenza V–I?', options: ['Plagale', 'Autentica', 'Sospesa', 'D’inganno'], answer: 1, explanation: 'V–I è la cadenza autentica, la chiusura più forte.' },
        { prompt: 'Come si chiama la cadenza IV–I?', options: ['Plagale', 'Autentica', 'Sospesa', 'D’inganno'], answer: 0, explanation: 'IV–I è la cadenza plagale, quella dell’“Amen”.' },
        { prompt: 'Quali accordi formano il II–V–I in Do maggiore?', options: ['Em7 – A7 – DΔ', 'Dm7 – G7 – CΔ', 'FΔ – G7 – CΔ', 'Am7 – D7 – GΔ'], answer: 1, explanation: 'Dm7 (ii), G7 (V) e CΔ (I).' },
        { prompt: 'La cadenza d’inganno si ha quando il V va...', options: ['al I', 'al IV', 'al vi', 'al ii'], answer: 2, explanation: 'Il V invece del I va al vi, accordo che ha due note in comune col I.' },
        { prompt: 'Nel ciclo delle quinte la radice di ogni accordo...', options: ['sale di una quinta', 'scende di una quinta', 'resta ferma', 'sale di una terza'], answer: 1, explanation: 'Radice che scende di quinta (o sale di quarta): il movimento più naturale.' },
      ],
    },
  },
}
