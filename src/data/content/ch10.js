import { mk, md, page } from './helpers'

const G7 = md(55, [0, 4, 7, 10])
const C = md(60, [0, 4, 7])

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'La sesta napoletana', min: 4 },
    { id: 2, kind: 'lesson', title: 'Le seste aumentate', min: 4 },
    { id: 3, kind: 'lesson', title: 'Il diminuito di passaggio', min: 4 },
    { id: 4, kind: 'lesson', title: 'Le mediante cromatiche', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci gli accordi cromatici', min: 5 },
    { id: 6, kind: 'build', title: 'Costruisci gli accordi cromatici', min: 5 },
    { id: 7, kind: 'apply', title: 'Inserisci un accordo cromatico in un giro', min: 5 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Il ♭II maggiore', 'La sesta napoletana è un accordo maggiore costruito sul secondo grado abbassato (♭II). In Do è Re♭ maggiore. Contiene due note fuori scala, Re♭ e La♭, e si usa per creare un forte colore prima della dominante.', 'Napoletana = ♭II maggiore', { base: 65, notes: mk(65, [[0, 4, '4'], [3, 6, '♭6'], [8, 2, '♭2']]), play: md(53, [0, 3, 8]), chord: true }, 'Re♭ maggiore in Do: che colore!'),
        page('Perché “sesta”', 'Di solito si suona in primo rivolto, con la terza al basso: Fa La♭ Re♭. Visto dal basso, Fa–Re♭ è una sesta, da cui il nome. Va quasi sempre alla dominante e poi alla tonica: ♭II6 – V – I.', 'Cadenza: ♭II6 – V7 – I', { notes: [], play: [md(53, [0, 3, 8]), G7, C], progression: true, chords: [{ fn: '♭II6', sym: 'D♭/F' }, { fn: 'V7', sym: 'G7' }, { fn: 'I', sym: 'C' }] }, 'Dramatico e potente!'),
      ],
    },
    2: {
      pages: [
        page('L’intervallo di sesta aumentata', 'Tra il La♭ (♭6) e il Fa♯ (♯4) c’è una sesta aumentata. Questo intervallo risolve verso l’esterno: il La♭ scende al Sol e il Fa♯ sale al Sol, e così si arriva a una stessa nota, l’ottava del Sol, sulla dominante.', 'Sesta aumentata → ottava sulla dominante.', { base: 65, notes: mk(65, [[1, 4, '♯4'], [3, 6, '♭6'], [7, 1, '1']]), play: md(56, [0, 4, 10]), chord: true }, 'Due note che si aprono a ventaglio!'),
        page('Italiana, francese, tedesca', 'Sopra la sesta aumentata si aggiunge una terza nota (Do, l’1) e il risultato è la sesta italiana: La♭ Do Fa♯. Aggiungendo il Re si ha la francese, aggiungendo il Mi♭ la tedesca. La tedesca suona come un La♭7 ma risolve sulla dominante.', 'It: ♭6 1 ♯4 · Fr: ♭6 1 2 ♯4 · Ted: ♭6 1 ♭3 ♯4', { base: 65, notes: mk(65, [[1, 4, '♯4'], [3, 6, '♭6'], [7, 1, '1'], [10, 3, '♭3']]), play: md(56, [0, 4, 7, 10]), chord: true }, 'Quella tedesca è la più usata!'),
      ],
    },
    3: {
      pages: [
        page('Un ponte cromatico', 'Un diminuito di passaggio è un accordo °7 inserito tra due accordi diatonici per collegarli con un movimento cromatico. In C – C♯°7 – Dm7, il basso sale per semitoni: Do, Do♯, Re.', 'C – C♯°7 – Dm7', { notes: [], play: [C, md(61, [0, 3, 6, 9]), md(62, [0, 3, 7, 10])], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: '♯i°7', sym: 'C♯°7' }, { fn: 'iim7', sym: 'Dm7' }] }, 'Cromatismo in salita!'),
        page('Altri usi del °7', 'Il °7 può sostituire un V7♭9 senza la fondamentale: B°7 al posto di G7♭9 porta al Do. Ha quattro note a distanza di terza minore, quindi ogni nota può fare da fondamentale e si può risolvere in quattro direzioni.', 'Il °7 è simmetrico: ogni nota può fare da radice.', { base: 59, notes: mk(59, [[0, 7, '1'], [3, 2, '♭3'], [6, 4, '♭5'], [9, 6, '♭♭7']]), play: md(59, [0, 3, 6, 9]), chord: true }, 'Un accordo di quattro volti!'),
      ],
    },
    4: {
      pages: [
        page('Radici a distanza di terza', 'Le mediante cromatiche sono accordi le cui radici distano una terza ma che non appartengono alla tonalità. Do maggiore e Mi maggiore hanno una sola nota in comune (Mi). Il passaggio è inatteso, ma suona subito naturale.', 'Mediante cromatica = radici a terza, una nota comune.', { notes: [], play: [C, md(59, [0, 5, 9])], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: '♯III', sym: 'E' }] }, 'Do e Mi: solo una nota in comune!'),
        page('Quali usare', 'Rispetto al Do le più usate sono La♭ (♭VI), Mi♭ (♭III), Mi (♯III) e La (♯VI). Sono molto usate nelle colonne sonore perché danno un senso di meraviglia senza bisogno di preparazione.', 'Do → La♭ · Mi♭ · Mi · La', { notes: [], play: [C, md(56, [0, 4, 7])], progression: true, chords: [{ fn: 'I', sym: 'C' }, { fn: '♭VI', sym: 'A♭' }] }, 'Atmosfere da cinema!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che accordo cromatico senti prima di G7?', kind: 'progression', play: [md(53, [0, 3, 8]), G7, C], options: ['Sesta napoletana', 'Dominante secondaria', 'Mediante cromatica', 'Accordo sospeso'], answer: 0, explanation: 'Fa La♭ Re♭ è il ♭II in primo rivolto: sesta napoletana.' },
        { prompt: 'Ascolta: che tipo di accordo senti?', kind: 'chord', play: md(56, [0, 4, 7, 10]), options: ['Napoletana', 'Sesta aumentata', 'Accordo diminuito', 'Accordo sospeso'], answer: 1, explanation: 'La♭ Do Mi♭ Fa♯: è la sesta tedesca, con suono da settima di dominante.' },
        { prompt: 'Ascolta: che relazione c’è tra i due accordi?', kind: 'progression', play: [C, md(59, [0, 5, 9])], options: ['Cadenza autentica', 'Mediante cromatica', 'Cadenza plagale', 'Modulazione per dominante'], answer: 1, explanation: 'Do ed Mi maggiore: radici a distanza di terza, una sola nota in comune.' },
        { prompt: 'Ascolta: che cosa c’è tra Do e Re minore settima?', kind: 'progression', play: [C, md(61, [0, 3, 6, 9]), md(62, [0, 3, 7, 10])], options: ['Dominante secondaria', 'Diminuito di passaggio', 'Napoletana', 'Sesta aumentata'], answer: 1, explanation: 'Do♯°7 collega Do e Re minore con un basso cromatico.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Che cos’è la sesta napoletana?', options: ['Il ♭II maggiore, di solito in primo rivolto', 'Il V grado alterato', 'Una scala a sei note', 'Un accordo sospeso'], answer: 0, explanation: 'È un accordo maggiore sul secondo grado abbassato.' },
        { prompt: 'In Do maggiore la sesta napoletana è formata da...', options: ['Re♭ – Fa – La♭', 'Re – Fa♯ – La', 'Re – Fa – La', 'Mi♭ – Sol – Si♭'], answer: 0, explanation: 'Re♭ maggiore: Re♭ Fa La♭.' },
        { prompt: 'Dove risolvono le seste aumentate?', options: ['Sul I', 'Sul IV', 'Sul V', 'Sul vi'], answer: 2, explanation: 'La sesta aumentata si apre a ottava sulla dominante.' },
        { prompt: 'Quale sesta aumentata contiene ♭6 1 ♭3 ♯4?', options: ['Italiana', 'Francese', 'Tedesca', 'Napoletana'], answer: 2, explanation: 'La tedesca ha anche il ♭3.' },
        { prompt: 'Le mediante cromatiche hanno radici a distanza di...', options: ['una seconda', 'una terza', 'una quarta', 'una quinta'], answer: 1, explanation: 'Sono accordi in relazione di terza, fuori dalla tonalità, con una nota in comune.' },
      ],
    },
  },
}
