import { mk, md, page } from './helpers'

const Cm = md(60, [0, 3, 7])
const Gm = md(55, [0, 3, 7])
const Fm6 = md(53, [0, 3, 7, 9])
const C = md(60, [0, 4, 7])
const F_ = md(60, [5, 9, 12])
const G7 = md(55, [0, 4, 7, 10])

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'L’asse di simmetria', min: 4 },
    { id: 2, kind: 'lesson', title: 'Il negativo degli accordi', min: 4 },
    { id: 3, kind: 'lesson', title: 'Una progressione negativa', min: 4 },
    { id: 4, kind: 'lesson', title: 'Usare l’armonia negativa', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci il negativo', min: 5 },
    { id: 6, kind: 'build', title: 'Trova il negativo di un accordo', min: 5 },
    { id: 7, kind: 'apply', title: 'Trasforma una progressione', min: 6 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Uno specchio tra le note', 'L’armonia negativa riflette le note come in uno specchio. Per la tonalità di Do l’asse sta tra il Mi♭ e il Mi, a metà strada tra Do e Sol. Ogni nota va nella posizione opposta rispetto all’asse.', 'Asse di Do: tra Mi♭ e Mi.', { notes: [], play: [60, 67] }, 'Un trucco di simmetria!'),
        page('Le coppie di note', 'Con l’asse di Do le note si scambiano a coppie: Do ↔ Sol, Re ↔ Fa, Mi ↔ Mi♭, La ↔ Si♭, Si ↔ La♭, Do♯ ↔ Fa♯. Ogni nota ha la sua immagine speculare.', 'Do↔Sol · Re↔Fa · Mi↔Mi♭ · La↔Si♭ · Si↔La♭', { notes: [] }, 'Basta imparare le coppie!'),
        page('Maggiore e minore si scambiano', 'Riflettendo le note di Do maggiore (Do Mi Sol) si ottengono Sol, Mi♭ e Do: cioè Do minore. Il negativo di un accordo maggiore è dunque minore, e viceversa. La luce si trasforma in ombra.', 'Do maggiore ↔ Do minore', { notes: mk(60, [[0, 1, '1'], [3, 3, '♭3'], [7, 5, '5']]), play: Cm, chord: true }, 'Il negativo di Do è Do minore!'),
      ],
    },
    2: {
      pages: [
        page('Il negativo di una triade', 'Il metodo è sempre lo stesso: si prendono le note dell’accordo, si trasformano con la tabella delle coppie e si legge il nuovo accordo. Il negativo di Fa maggiore (Fa La Do) è Re Si♭ Sol, cioè Sol minore.', 'F (Fa La Do) → Gm (Sol Si♭ Re)', { base: 55, notes: mk(55, [[0, 1, '1'], [3, 3, '♭3'], [7, 5, '5']]), play: Gm, chord: true }, 'Il negativo di Fa è Sol minore!'),
        page('Il negativo di G7', 'G7 (Sol Si Re Fa) diventa Do La♭ Fa Re, cioè Fa minore con la sesta (Fm6), che ha le stesse note del Dø7. La dominante si trasforma in una sottodominante minore: il “fuoco” del V7 diventa un colore più scuro.', 'G7 → Fm6 (= Dø7)', { base: 65, notes: mk(65, [[0, 1, '1'], [3, 3, '♭3'], [7, 5, '5'], [9, 6, '6']]), play: Fm6, chord: true }, 'Dalla tensione al mistero!'),
      ],
    },
    3: {
      pages: [
        page('I – IV – V7 – I specchiato', 'Prendiamo la cadenza Do – Fa – Sol7 – Do e trasformiamo ogni accordo: Cm, Gm, Fm6, Cm. La progressione originale è luminosa e piena di spinta, quella negativa è scura e sospesa.', 'C – F – G7 – C → Cm – Gm – Fm6 – Cm', { notes: [], play: [C, F_, G7, C], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: 'IV', sym: 'F' }, { fn: 'V7', sym: 'G7' }, { fn: 'I', sym: 'C' }] }, 'Prima l’originale!'),
        page('E ora il negativo', 'Ecco la versione specchiata. Il centro resta Do, ma il colore è minore e la funzione si ribalta: la dominante di prima è ora Fm6, una sottodominante minore.', 'Cm – Gm – Fm6 – Cm', { notes: [], play: [Cm, Gm, Fm6, Cm], progression: true, chords: [{ fn: 'i', sym: 'Cm' }, { fn: 'v', sym: 'Gm' }, { fn: 'iv6', sym: 'Fm6' }, { fn: 'i', sym: 'Cm' }] }, 'Lo stesso percorso, in ombra!'),
      ],
    },
    4: {
      pages: [
        page('Come si usa', 'L’armonia negativa non è un metodo rigido, ma uno strumento per trovare accordi insoliti che suonano bene. Si prende una progressione che conosci, la si riflette e si usa il risultato come variante, oppure si mescolano accordi originali e negativi.', 'Un trucco per trovare suoni nuovi.', { notes: [] }, 'Sperimenta!'),
        page('Un po’ di cautela', 'Il negativo di una melodia si ottiene riflettendo anche le note, ma il risultato può suonare lontano dall’originale. Molti musicisti usano questa idea per armonizzare in modo creativo: l’orecchio ha sempre l’ultima parola.', 'L’orecchio decide.', { notes: [] }, 'Se suona bene, va bene!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Questo è il negativo di Do maggiore. Qual è?', kind: 'chord', play: Cm, options: ['Do minore', 'Sol maggiore', 'Fa minore', 'Mi minore'], answer: 0, explanation: 'Do Mi♭ Sol: riflettendo Do Mi Sol si ottiene Do minore.' },
        { prompt: 'Questo è il negativo di G7. Qual è?', kind: 'chord', play: Fm6, options: ['Re minore settima', 'Fm6', 'CΔ', 'Bø7'], answer: 1, explanation: 'Fa La♭ Do Re: Fm6, equivalente a Dø7.' },
        { prompt: 'Ascolta: quale progressione senti?', kind: 'progression', play: [Cm, Gm, Fm6, Cm], options: ['Cadenza in Do maggiore', 'Il negativo di I–IV–V7–I', 'Un blues', 'Un giro di Do minore classico'], answer: 1, explanation: 'Cm – Gm – Fm6 – Cm è il negativo di C – F – G7 – C.' },
        { prompt: 'Questo è il negativo di Fa maggiore. Qual è?', kind: 'chord', play: Gm, options: ['Sol minore', 'Re minore', 'Sol maggiore', 'La minore'], answer: 0, explanation: 'Fa La Do si trasforma in Re Si♭ Sol: Sol minore.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Dove passa l’asse di simmetria per la tonalità di Do?', options: ['Tra Do e Re', 'Tra Mi♭ e Mi', 'Tra Fa e Sol', 'Tra Sol e La'], answer: 1, explanation: 'È a metà strada tra Do e Sol: tra Mi♭ e Mi.' },
        { prompt: 'Che nota diventa il Re nell’armonia negativa di Do?', options: ['Fa', 'La', 'Si♭', 'Mi'], answer: 0, explanation: 'Re ↔ Fa.' },
        { prompt: 'Qual è il negativo di Do maggiore?', options: ['Sol maggiore', 'Do minore', 'Fa minore', 'La minore'], answer: 1, explanation: 'Do Mi Sol → Sol Mi♭ Do: Do minore.' },
        { prompt: 'Qual è il negativo di G7?', options: ['Fm6', 'Cm', 'D7', 'B♭Δ'], answer: 0, explanation: 'Sol Si Re Fa → Do La♭ Fa Re: Fm6.' },
        { prompt: 'Il negativo di un accordo maggiore è...', options: ['maggiore', 'minore', 'eccedente', 'sospeso'], answer: 1, explanation: 'Maggiore e minore si scambiano.' },
      ],
    },
  },
}
