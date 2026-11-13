import { cs, formEx, page } from './helpers'

const bars = (list) => list.map((b) => b.split(' ').map(cs))
const SEZ_A = ['B♭ G7', 'Cm7 F7', 'Dm7 G7', 'Cm7 F7', 'Fm7 B♭7', 'E♭ E°7', 'B♭/F G7', 'Cm7 F7']
const PONTE = ['D7', 'D7', 'G7', 'G7', 'C7', 'C7', 'F7', 'F7']
// seconda e terza A: le prime sei battute sono uguali, poi Cm7 F7 | B♭
const SEZ_A_FINE = [...SEZ_A.slice(0, 6), 'Cm7 F7', 'B♭']
const full = formEx('', [...SEZ_A, ...SEZ_A_FINE, ...PONTE, ...SEZ_A_FINE])
const blues = formEx('', ['Cm7', 'Cm7', 'Cm7', 'Cm7', 'Fm7', 'Fm7', 'Cm7', 'Cm7', 'A♭7', 'G7', 'Cm7', 'G7'])

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'Che cos’è una forma', min: 4 },
    { id: 2, kind: 'lesson', title: 'L’Anatole: la sezione A', min: 5 },
    { id: 3, kind: 'lesson', title: 'L’Anatole: il ponte', min: 5 },
    { id: 4, kind: 'lesson', title: 'Altre forme: blues minore e quinte', min: 5 },
    { id: 5, kind: 'ear', title: 'Riconosci le forme', min: 5 },
    { id: 6, kind: 'build', title: 'Costruisci gli accordi della forma', min: 5 },
    { id: 7, kind: 'apply', title: 'Suona il ponte dell’Anatole', min: 6 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Una forma è un percorso', 'Un brano jazz si appoggia su una forma: un giro di accordi di lunghezza fissa che si ripete. Il tema si suona una volta, poi ciascuno improvvisa sullo stesso giro, chiamato chorus. Conoscere la forma permette di sapere sempre a che punto si è.', 'Forma = giro che si ripete', { notes: [] }, 'Non perdere mai il filo!'),
        page('Le forme più usate', 'Il blues dura dodici battute. Le canzoni standard durano di solito trentadue battute, divise in quattro sezioni da otto: AABA (due sezioni uguali, un ponte diverso e il ritorno) oppure ABAC (due sezioni simili con finali diversi).', 'Blues = 12 battute · AABA = 32 battute · ABAC = 32 battute', { notes: [] }, 'Dodici o trentadue!'),
        page('La forma AABA', 'Nella forma AABA le prime due sezioni sono uguali (A). La terza, il ponte (B), cambia armonia e spesso tonalità. L’ultima ripete A. Ogni lettera vale otto battute: 8 + 8 + 8 + 8 = 32.', 'A (8) · A (8) · B, il ponte (8) · A (8)', { notes: [] }, 'Il ponte è la sorpresa!'),
      ],
    },
    2: {
      pages: [
        page('Che cos’è l’Anatole', 'L’Anatole (in inglese rhythm changes) è la forma AABA costruita sugli accordi di “I Got Rhythm” di Gershwin. Ha dato origine a centinaia di brani e si suona di solito in Si♭. È la forma jazz più diffusa dopo il blues.', 'Anatole = AABA di 32 battute, di solito in Si♭', { notes: [] }, 'Quasi un linguaggio comune!'),
        page('Le prime quattro battute', 'La sezione A comincia con un turnaround di due battute, ripetuto con una piccola variante: B♭ G7 | Cm7 F7 | Dm7 G7 | Cm7 F7. Sono I – VI7 – iim7 – V7, poi iiim7 – VI7 – iim7 – V7. Ogni battuta ha due accordi.', 'I – VI7 – iim7 – V7 · iiim7 – VI7 – iim7 – V7', { notes: [], play: bars(SEZ_A.slice(0, 4)).flat(), progression: true, chords: [{ fn: 'I', sym: 'B♭' }, { fn: 'VI7', sym: 'G7' }, { fn: 'iim7', sym: 'Cm7' }, { fn: 'V7', sym: 'F7' }, { fn: 'iiim7', sym: 'Dm7' }, { fn: 'VI7', sym: 'G7' }, { fn: 'iim7', sym: 'Cm7' }, { fn: 'V7', sym: 'F7' }] }, 'Un turnaround doppio!'),
        page('Le ultime quattro battute', 'Le battute 5–8 vanno al IV e tornano: Fm7 B♭7 | E♭ E°7 | B♭/F G7 | Cm7 F7. Fm7 B♭7 è il II–V che porta a E♭, il IV grado. E°7 è un diminuito di passaggio. B♭/F è il I in secondo rivolto, poi si riparte con VI7 – iim7 – V7, e si torna all’inizio. Nella seconda e nella terza A le battute 7–8 cambiano: Cm7 F7 | B♭. La seconda A chiude sul I prima del ponte, l’ultima chiude il chorus.', 'Fm7 B♭7 | E♭ E°7 | · B♭/F G7 | Cm7 F7 |', { notes: [], play: bars(SEZ_A.slice(4)).flat(), progression: true, chords: [{ fn: 'iim7/IV', sym: 'Fm7' }, { fn: 'V7/IV', sym: 'B♭7' }, { fn: 'IV', sym: 'E♭' }, { fn: '♯IV°7', sym: 'E°7' }, { fn: 'I', sym: 'B♭/F' }, { fn: 'VI7', sym: 'G7' }, { fn: 'iim7', sym: 'Cm7' }, { fn: 'V7', sym: 'F7' }] }, 'Si va al IV e si torna!'),
      ],
    },
    3: {
      pages: [
        page('Una catena di dominanti', 'Il ponte (B) è fatto di quattro dominanti di fila, due battute ciascuna: D7 | G7 | C7 | F7. Ogni accordo è la dominante del successivo (D7 verso G, G7 verso C, C7 verso F) e l’ultimo, F7, riporta a B♭. Sono i gradi III7 – VI7 – II7 – V7, dominanti secondarie che scendono per quinte.', 'III7 – VI7 – II7 – V7', { notes: [], play: ['D7', 'G7', 'C7', 'F7'].map(cs).map((c) => c), progression: true, chords: [{ fn: 'III7', sym: 'D7' }, { fn: 'VI7', sym: 'G7' }, { fn: 'II7', sym: 'C7' }, { fn: 'V7', sym: 'F7' }] }, 'Ogni accordo spinge il successivo!'),
        page('La forma intera', 'Mettiamo tutto insieme: A A B A, quattro battute per riga. Le prime sei battute di ogni A sono uguali, ma la prima A finisce con Cm7 F7 (per ripartire), mentre la seconda e la terza finiscono con Cm7 F7 | B♭. Ascolta la forma completa, trentadue battute.', 'A, prima volta · B♭ G7 | Cm7 F7 | Dm7 G7 | Cm7 F7 | · Fm7 B♭7 | E♭ E°7 | B♭/F G7 | Cm7 F7 | · A, seconda e terza volta · come sopra fino a E♭ E°7, poi Cm7 F7 | B♭ | · B (ponte) · D7 | D7 | G7 | G7 | · C7 | C7 | F7 | F7 |', { notes: [], play: full.play, progression: true, form: true, weights: full.weights }, 'Trentadue battute, una forma!'),
      ],
    },
    4: {
      pages: [
        page('Il blues minore', 'Il blues minore ha le stesse dodici battute, ma con accordi minori: im7 sul I, ivm7 sul IV e, nell’ultima frase, ♭VI7 – V7 – im7 – V7. La dominante finale riporta all’inizio del chorus. In Do minore: Cm7, Fm7, A♭7, G7.', 'Blues minore · im7 | im7 | im7 | im7 | · ivm7 | ivm7 | im7 | im7 | · ♭VI7 | V7 | im7 | V7 |', { notes: [], play: blues.play, progression: true, form: true, weights: blues.weights }, 'Stessa forma, colore scuro!'),
        page('Il giro delle quinte', 'Molti standard sono costruiti su una catena di II–V che scende per quinte, alternando maggiore e minore. In Si♭ maggiore (Sol minore): Cm7 F7 B♭Δ E♭Δ Aø7 D7 Gm Gm, cioè iim7 – V7 – Imaj7 – IVmaj7 – viiø7 – III7 – vim. Sono otto battute che si ripetono e poi si prosegue con una sezione diversa.', 'Cm7 | F7 | B♭Δ | E♭Δ | · Aø7 | D7 | Gm | Gm |', { notes: [], play: ['Cm7', 'F7', 'B♭Δ', 'E♭Δ', 'Aø7', 'D7', 'Gm', 'Gm'].map(cs), progression: true, chords: [{ fn: 'iim7', sym: 'Cm7' }, { fn: 'V7', sym: 'F7' }, { fn: 'Imaj7', sym: 'B♭Δ' }, { fn: 'IVmaj7', sym: 'E♭Δ' }, { fn: 'viiø7', sym: 'Aø7' }, { fn: 'III7', sym: 'D7' }, { fn: 'vim', sym: 'Gm' }] }, 'Un II–V dopo l’altro!'),
        page('Riconoscere la forma', 'Per riconoscere una forma conta le battute e cerca dove cambia l’armonia. Dodici battute con tre accordi: blues. Trentadue battute con una sezione di dominanti a metà: Anatole. Un giro di II–V che scende per quinte: forma a quinte.', 'Conta le battute e cerca il ponte', { notes: [] }, 'Orecchie aperte!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che apertura è questa?', kind: 'progression', play: bars(['B♭ G7', 'Cm7 F7']).flat(), options: ['I – VI7 – iim7 – V7, l’inizio dell’Anatole', 'Un blues di dodici battute', 'Una cadenza plagale', 'Una catena di dominanti'], answer: 0, explanation: 'Il turnaround I – VI7 – iim7 – V7 apre ogni sezione A dell’Anatole.' },
        { prompt: 'Ascolta: che sequenza senti?', kind: 'progression', play: ['D7', 'G7', 'C7', 'F7'].map(cs), options: ['Una catena di dominanti, come il ponte', 'Un II–V–I', 'Un blues minore', 'Un turnaround'], answer: 0, explanation: 'Quattro dominanti di fila, ognuna a una quinta dalla successiva: è il ponte dell’Anatole.' },
        { prompt: 'Ascolta: che blues è?', kind: 'progression', play: ['Cm7', 'Fm7', 'Cm7', 'G7'].map(cs), options: ['Un blues minore', 'Un blues maggiore', 'Un Anatole', 'Un giro di II–V'], answer: 0, explanation: 'Gli accordi sul I e sul IV sono minori: è il blues minore.' },
        { prompt: 'Ascolta: che cosa fa il secondo accordo?', kind: 'progression', play: ['E♭', 'E°7', 'B♭/F', 'G7'].map(cs), options: ['È un diminuito di passaggio', 'È una dominante normale', 'È un accordo minore', 'Cambia tonalità'], answer: 0, explanation: 'E°7 collega E♭ a B♭/F con il basso che sale per semitoni.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Quante battute ha una forma AABA standard?', options: ['16', '24', '32', '12'], answer: 2, explanation: 'Quattro sezioni da otto battute: 8 + 8 + 8 + 8 = 32.' },
        { prompt: 'In quale tonalità si suona di solito l’Anatole?', options: ['Si♭', 'Do', 'Re', 'La'], answer: 0, explanation: 'La tonalità tradizionale è Si♭ maggiore.' },
        { prompt: 'Com’è fatto il ponte dell’Anatole?', options: ['Una catena di dominanti III7 – VI7 – II7 – V7', 'Un blues di dodici battute', 'Un II–V–I minore', 'Accordi per quarte'], answer: 0, explanation: 'Quattro dominanti che scendono per quinte, due battute ciascuna.' },
        { prompt: 'Quali accordi si usano nel blues minore?', options: ['im7, ivm7 e V7', 'I7, IV7 e V7', 'IΔ, IVΔ e V7', 'iiø7, V7 e im7'], answer: 0, explanation: 'Il blues minore usa im7 e ivm7, con V7 nell’ultima frase.' },
        { prompt: 'Come comincia la sezione A dell’Anatole?', options: ['I – VI7 – iim7 – V7', 'I – IV – V – I', 'iim7 – V7 – Imaj7', 'I7 – IV7 – I7'], answer: 0, explanation: 'Con un turnaround: B♭ G7 | Cm7 F7.' },
      ],
    },
  },
}
