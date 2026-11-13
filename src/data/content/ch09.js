import { mk, md, page } from './helpers'

// Scale (derivate da Do): note da disegnare e altezze da suonare
const scl = (root, list) => ({ base: root, notes: mk(root, list.map(([s, d, l]) => [s, d, l])), play: md(root, list.map(([s]) => s)) })

export default {
  steps: [
    { id: 1, kind: 'lesson', title: 'Il minore armonico e i suoi modi', min: 4 },
    { id: 2, kind: 'lesson', title: 'Il minore melodico e i suoi modi', min: 4 },
    { id: 3, kind: 'lesson', title: 'I modi più usati', min: 5 },
    { id: 4, kind: 'lesson', title: 'Quale scala su quale accordo', min: 4 },
    { id: 5, kind: 'ear', title: 'Riconosci il modo', min: 5 },
    { id: 6, kind: 'build', title: 'Costruisci i modi sullo strumento', min: 5 },
    { id: 7, kind: 'apply', title: 'Scegli la scala giusta', min: 5 },
    { id: 8, kind: 'quiz', title: 'Quiz finale', min: 5 },
  ],
  lessons: {
    1: {
      pages: [
        page('Sette modi dalla minore armonica', 'Anche dalla scala minore armonica si ottengono sette modi, partendo da ciascuno dei suoi gradi, come si è fatto con la maggiore. Le note di Do minore armonica (Do Re Mi♭ Fa Sol La♭ Si) danno, partendo dal Sol, la scala Sol La♭ Si Do Re Mi♭ Fa: è il frigio dominante.', 'Modo = scala minore armonica da un altro grado.', scl(60, [[0, 1, '1'], [2, 2, '2'], [3, 3, '♭3'], [5, 4, '4'], [7, 5, '5'], [8, 6, '♭6'], [11, 7, '7'], [12, 1, '1']]), 'Sette scale da una sola!'),
        page('Il frigio dominante', 'È il quinto modo: Sol La♭ Si Do Re Mi♭ Fa. Ha la ♭2 del frigio ma la terza maggiore: 1 ♭2 3 4 5 ♭6 ♭7. Si usa sul V7 di una tonalità minore, per esempio sul G7♭9 che porta a Do minore. Ha un colore spagnolo, orientale.', 'Frigio dominante: 1 ♭2 3 4 5 ♭6 ♭7 · su G7♭9 → Cm', scl(55, [[0, 1, '1'], [1, 2, '♭2'], [4, 3, '3'], [5, 4, '4'], [7, 5, '5'], [8, 6, '♭6'], [10, 7, '♭7'], [12, 1, '1']]), 'La dominante del minore!'),
        page('Gli altri modi', 'Gli altri cinque modi si usano meno: locrio ♮6, ionico ♯5, dorico ♯4, lidio ♯2 e ultralocrio. Nel Prontuario li trovi tutti e li puoi ascoltare uno per uno.', 'Minore armonica · Locrio ♮6 · Ionico ♯5 · Dorico ♯4 · Frigio dominante · Lidio ♯2 · Ultralocrio', { notes: [] }, 'Tutti nel Prontuario!'),
      ],
    },
    2: {
      pages: [
        page('La minore melodica nel jazz', 'Nel jazz la minore melodica si suona uguale in salita e in discesa: 1 2 ♭3 4 5 6 7. È una scala maggiore con la terza minore. Anche qui, partendo da ciascun grado, nascono sette modi.', 'Minore melodica: 1 2 ♭3 4 5 6 7 · uguale in salita e in discesa', scl(60, [[0, 1, '1'], [2, 2, '2'], [3, 3, '♭3'], [5, 4, '4'], [7, 5, '5'], [9, 6, '6'], [11, 7, '7'], [12, 1, '1']]), 'Una maggiore con la terza minore!'),
        page('I sette modi', 'Sono: minore melodica (1° grado), dorico ♭2 (2°), lidio aumentato (3°), lidio dominante (4°), misolidio ♭6 (5°), locrio ♮2 (6°) e alterata o superlocrio (7°). Ognuno ha un suo accordo, come vedrai nelle prossime lezioni.', 'Minore melodica · Dorico ♭2 · Lidio aumentato · Lidio dominante · Misolidio ♭6 · Locrio ♮2 · Alterata (Superlocrio)', { notes: [] }, 'Quasi tutti servono davvero!'),
      ],
    },
    3: {
      pages: [
        page('Il lidio dominante', 'È il quarto modo: Fa Sol La Si Do Re Mi♭, cioè 1 2 3 ♯4 5 6 ♭7. È un misolidio con la quarta alzata. Si usa sugli accordi 7♯11, come il D♭7 della sostituzione di tritono nel II–V–I di Do.', 'Lidio dominante: 1 2 3 ♯4 5 6 ♭7 · su 7♯11', scl(65, [[0, 1, '1'], [2, 2, '2'], [4, 3, '3'], [6, 4, '♯4'], [7, 5, '5'], [9, 6, '6'], [10, 7, '♭7'], [12, 1, '1']]), 'Una dominante luminosa!'),
        page('L’alterata (superlocrio)', 'È il settimo modo: Si Do Re Mi♭ Fa Sol La, cioè 1 ♭2 ♯2 3 ♭5 ♭6 ♭7. Contiene tutte le alterazioni della dominante: ♭9, ♯9, ♯11 e ♭13. Si usa sul 7alt. Per trovarla: sul C7alt si suona la minore melodica di Re♭, un semitono sopra la fondamentale. Si chiama anche superlocrio.', 'Alterata = Superlocrio · 1 ♭2 ♯2 3 ♭5 ♭6 ♭7 · su 7alt', scl(59, [[0, 1, '1'], [1, 2, '♭2'], [3, 2, '♯2'], [4, 3, '3'], [6, 5, '♭5'], [8, 6, '♭6'], [10, 7, '♭7'], [12, 1, '1']]), 'Tutte le tensioni insieme!'),
        page('Locrio ♮2 e misolidio ♭6', 'Il locrio ♮2 è il sesto modo: La Si Do Re Mi♭ Fa Sol. È un locrio con la seconda maggiore, più dolce: si usa sul semidiminuito (Aø7). Il misolidio ♭6 è il quinto modo ed è un misolidio con la sesta minore: si usa sulla dominante del minore, per esempio sul G7♭13.', 'Locrio ♮2: su ø7 · Misolidio ♭6: su 7♭13', scl(57, [[0, 1, '1'], [2, 2, '2'], [3, 3, '♭3'], [5, 4, '4'], [6, 5, '♭5'], [8, 6, '♭6'], [10, 7, '♭7'], [12, 1, '1']]), 'Due ponti verso il minore!'),
      ],
    },
    4: {
      pages: [
        page('Nel minore armonico', 'Armonizzando la minore armonica si ottengono sette accordi, ciascuno con il suo modo. Nella pratica si usano soprattutto CmΔ, G7♭9 e B°7. Qui gli accordi in Do minore.', 'CmΔ → minore armonica · Dø7 → locrio ♮6 · E♭Δ♯5 → ionico ♯5 · Fm7 → dorico ♯4 · G7♭9 → frigio dominante · A♭Δ → lidio ♯2 · B°7 → ultralocrio', { notes: [] }, 'Accordo e scala vanno in coppia!'),
        page('Nel minore melodico', 'Dalla minore melodica nascono altri sette accordi. Sono molto usati nel jazz, e ognuno suona su un tipo di accordo preciso. Qui gli accordi in Do minore.', 'CmΔ → minore melodica · Dm7 (♭9) → dorico ♭2 · E♭Δ♯5 → lidio aumentato · F7♯11 → lidio dominante · G7♭13 → misolidio ♭6 · Aø7 → locrio ♮2 · B7alt → alterata', { notes: [] }, 'Un accordo, una scala!'),
      ],
    },
  },
  quizzes: {
    5: {
      kind: 'ear',
      questions: [
        { prompt: 'Ascolta: che modo senti?', play: md(55, [0, 1, 4, 5, 7, 8, 10, 12]), options: ['Frigio dominante', 'Frigio', 'Dorico ♭2', 'Locrio ♮2'], answer: 0, explanation: 'La ♭2 con la terza maggiore: è il frigio dominante.' },
        { prompt: 'Ascolta: che modo senti?', play: md(65, [0, 2, 4, 6, 7, 9, 10, 12]), options: ['Lidio', 'Lidio dominante', 'Misolidio', 'Lidio aumentato'], answer: 1, explanation: 'Il ♯4 insieme alla ♭7: è il lidio dominante.' },
        { prompt: 'Ascolta: che modo senti?', play: md(59, [0, 1, 3, 4, 6, 8, 10, 12]), options: ['Locrio', 'Alterata', 'Frigio dominante', 'Lidio aumentato'], answer: 1, explanation: 'Con ♭9, ♯9, ♯11 e ♭13 tutte insieme: è l’alterata, o superlocrio.' },
        { prompt: 'Ascolta: che modo senti?', play: md(57, [0, 2, 3, 5, 6, 8, 10, 12]), options: ['Locrio', 'Locrio ♮2', 'Eolio', 'Dorico ♭2'], answer: 1, explanation: 'Come il locrio ma con la seconda maggiore: è il locrio ♮2.' },
      ],
    },
    8: {
      kind: 'quiz',
      passMark: 0.8,
      questions: [
        { prompt: 'Quale scala si usa di solito su un V7♭9 in una tonalità minore?', options: ['Frigio dominante', 'Lidio dominante', 'Dorico ♭2', 'Lidio aumentato'], answer: 0, explanation: 'Il frigio dominante, quinto modo della minore armonica, ha la ♭2 e la terza maggiore.' },
        { prompt: 'Come si trova la scala alterata su un accordo X7alt?', options: ['Con la minore melodica un semitono sopra la fondamentale', 'Con la minore armonica sulla stessa nota', 'Con il misolidio ♭6', 'Con il modo dorico'], answer: 0, explanation: 'Per esempio C7alt: minore melodica di Re♭.' },
        { prompt: 'Su quale tipo di accordo si usa il lidio dominante?', options: ['7♯11', 'm7♭5', 'Δ♯5', 'mΔ'], answer: 0, explanation: 'Il ♯4 corrisponde alla ♯11 dell’accordo.' },
        { prompt: 'Qual è il settimo modo della minore melodica?', options: ['Alterata (superlocrio)', 'Ultralocrio', 'Locrio ♮2', 'Frigio dominante'], answer: 0, explanation: 'Alterata e superlocrio sono due nomi dello stesso modo. L’ultralocrio è invece il settimo modo della minore armonica.' },
        { prompt: 'Il locrio ♮2 si distingue dal locrio per...', options: ['la seconda maggiore', 'la quinta giusta', 'la settima maggiore', 'la terza maggiore'], answer: 0, explanation: 'Il locrio ha la ♭2, il locrio ♮2 ha la 2 maggiore.' },
      ],
    },
  },
}
