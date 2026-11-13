// Contenuti delle lezioni, per capitolo e per numero di passo.
// Ogni lezione è una lista di pagine. notes: altezze MIDI da mostrare (60 = Do4);
// deg: grado (per il colore), label: testo nel pallino. base: primo tasto della tastiera (un tasto bianco).

import { CONTENT } from './content'

const n = (midi, deg, label) => ({ midi, deg, label })

// Do maggiore: 60..72
const DO_MAGGIORE = [n(60, 1, '1'), n(62, 2, '2'), n(64, 3, '3'), n(65, 4, '4'), n(67, 5, '5'), n(69, 6, '6'), n(71, 7, '7'), n(72, 1, '1')]

const CH1 = {
  1: {
    pages: [
      {
        heading: 'Le sette note',
        body: 'La musica occidentale usa sette note con nome: Do, Re, Mi, Fa, Sol, La, Si. Dopo il Si il ciclo ricomincia dal Do, un po\u2019 pi\u00f9 acuto.',
        remember: 'Do \u2013 Re \u2013 Mi \u2013 Fa \u2013 Sol \u2013 La \u2013 Si, poi di nuovo Do.',
        notes: [n(60, 1, 'Do'), n(62, 2, 'Re'), n(64, 3, 'Mi'), n(65, 4, 'Fa'), n(67, 5, 'Sol'), n(69, 6, 'La'), n(71, 7, 'Si')],
        polly: 'Ascolta la sequenza!',
      },
      {
        heading: 'L\u2019ottava',
        body: 'Dal Do al Do successivo c\u2019\u00e8 un\u2019ottava: le due note hanno lo stesso nome e sembrano \u201cuguali\u201d, solo una \u00e8 pi\u00f9 acuta. Su una tastiera un\u2019ottava contiene 12 tasti, bianchi e neri.',
        remember: 'Ottava = 12 semitoni: stesso nome, altezza diversa.',
        notes: [n(60, 1, 'Do'), n(72, 1, 'Do')],
        polly: 'Stesso nome, suono pi\u00f9 alto!',
      },
      {
        heading: 'Il semitono',
        body: 'La distanza pi\u00f9 piccola tra due note \u00e8 il semitono: due tasti vicini, bianchi o neri. Tra Mi e Fa e tra Si e Do non c\u2019\u00e8 un tasto nero in mezzo: sono semitoni \u201cnaturali\u201d.',
        remember: 'Semitoni naturali: Mi\u2013Fa e Si\u2013Do.',
        notes: [n(64, 3, 'Mi'), n(65, 4, 'Fa'), n(71, 7, 'Si'), n(72, 1, 'Do')],
        pairs: [[64, 65], [71, 72]],
        polly: 'Qui non c\u2019\u00e8 nessun tasto nero!',
      },
    ],
  },
  2: {
    pages: [
      {
        heading: 'Cos\u2019\u00e8 un intervallo musicale',
        body: 'L\u2019intervallo \u00e8 la distanza tra due note. Si misura contando i gradi della scala che intercorrono tra la prima e la seconda nota, inclusi gli estremi. All\u2019interno della musica tonale, la comprensione degli intervalli \u00e8 la chiave fondamentale per costruire accordi, analizzare le melodie e muoversi con precisione su qualsiasi strumento a corda o a tastiera.',
        remember: 'Da Do a Mi c\u2019\u00e8 un intervallo di terza (Do \u2013 Re \u2013 Mi): si contano i gradi, estremi inclusi.',
        notes: [n(60, 1, '1'), n(64, 3, '3')],
        polly: 'Memorizza bene questo concetto!',
      },
      {
        heading: 'Terza maggiore e terza minore',
        body: 'Due intervalli possono avere lo stesso nome e suonare diversi. Per distinguerli si contano i semitoni, cio\u00e8 le distanze tra un tasto e quello immediatamente vicino, bianco o nero che sia.',
        remember: 'Terza minore = 3 semitoni \u00b7 Terza maggiore = 4 semitoni',
        notes: [n(60, 1, '1'), n(63, 3, '\u266d3'), n(64, 3, '3')],
        polly: 'Ascolta la differenza!',
      },
      {
        heading: 'La quinta giusta',
        body: 'La quinta \u00e8 l\u2019intervallo pi\u00f9 stabile dopo l\u2019ottava. Da Do a Sol si contano cinque gradi e sette semitoni.',
        remember: 'Quinta giusta = 7 semitoni',
        notes: [n(60, 1, '1'), n(67, 5, '5')],
        polly: 'Ci sei quasi!',
      },
    ],
  },
  3: {
    pages: [
      {
        heading: 'La scala maggiore',
        body: 'La scala maggiore \u00e8 una sequenza di sette note con una disposizione precisa di toni e semitoni. Partendo da Do si suonano solo i tasti bianchi: Do Re Mi Fa Sol La Si Do.',
        remember: 'Tono \u2013 Tono \u2013 Semitono \u2013 Tono \u2013 Tono \u2013 Tono \u2013 Semitono',
        notes: DO_MAGGIORE,
        polly: 'Questa formula vale per ogni tonalit\u00e0!',
      },
      {
        heading: 'I gradi della scala',
        body: 'Ogni nota della scala ha un numero, il grado. Il primo grado \u00e8 la tonica, il quinto la dominante. Ragionare per gradi permette di capire la musica in qualsiasi tonalit\u00e0, senza dipendere dai nomi delle note.',
        remember: '1 = tonica \u00b7 5 = dominante',
        notes: [n(60, 1, '1'), n(64, 3, '3'), n(67, 5, '5')],
        polly: 'I gradi sono il tuo linguaggio!',
      },
      {
        heading: 'La stessa formula, un\u2019altra tonalit\u00e0',
        body: 'Cambiando la nota di partenza cambiano i nomi, non i gradi. Da Sol la scala \u00e8 Sol La Si Do Re Mi Fa\u266f Sol: serve il Fa\u266f per mettere i semitoni tra il 3\u00b0 e il 4\u00b0 grado e tra il 7\u00b0 e l\u20198\u00b0.',
        remember: 'Sol maggiore ha un diesis: il Fa\u266f.',
        base: 67,
        notes: [n(67, 1, '1'), n(69, 2, '2'), n(71, 3, '3'), n(72, 4, '4'), n(74, 5, '5'), n(76, 6, '6'), n(78, 7, '7'), n(79, 1, '1')],
        polly: 'Nota il tasto nero!',
      },
    ],
  },
  4: {
    pages: [
      {
        heading: 'La scala minore naturale',
        body: 'Si ottiene dalla maggiore abbassando di un semitono il terzo, il sesto e il settimo grado. Da Do: Do Re Mi\u266d Fa Sol La\u266d Si\u266d Do. Il suono diventa pi\u00f9 scuro e malinconico.',
        remember: 'Minore naturale = 1 2 \u266d3 4 5 \u266d6 \u266d7',
        notes: [n(60, 1, '1'), n(62, 2, '2'), n(63, 3, '\u266d3'), n(65, 4, '4'), n(67, 5, '5'), n(68, 6, '\u266d6'), n(70, 7, '\u266d7'), n(72, 1, '1')],
        polly: 'Senti com\u2019\u00e8 pi\u00f9 scura?',
      },
      {
        heading: 'Armonica e melodica',
        body: 'La minore armonica alza il settimo grado: tra il 6\u00b0 e il 7\u00b0 nasce un salto di tono e mezzo. La minore melodica, in salita, alza sia il sesto sia il settimo grado. Qui senti la armonica.',
        remember: 'Armonica: 1 2 \u266d3 4 5 \u266d6 7 \u00b7 Melodica: 1 2 \u266d3 4 5 6 7',
        notes: [n(60, 1, '1'), n(62, 2, '2'), n(63, 3, '\u266d3'), n(65, 4, '4'), n(67, 5, '5'), n(68, 6, '\u266d6'), n(71, 7, '7'), n(72, 1, '1')],
        polly: 'Senti quel salto particolare?',
      },
      {
        heading: 'Relativa e parallela',
        body: 'Ogni scala maggiore ha una minore relativa che usa le stesse note: parte dal 6\u00b0 grado, tre semitoni sotto la tonica. Da Do maggiore si arriva a La minore. La minore parallela ha invece la stessa tonica: Do maggiore e Do minore.',
        remember: 'Relativa: stesse note, tonica diversa \u00b7 Parallela: stessa tonica.',
        base: 69,
        notes: [n(69, 1, '1'), n(71, 2, '2'), n(72, 3, '\u266d3'), n(74, 4, '4'), n(76, 5, '5'), n(77, 6, '\u266d6'), n(79, 7, '\u266d7'), n(81, 1, '1')],
        polly: 'La minore \u00e8 la cugina della maggiore!',
      },
    ],
  },
  5: {
    pages: [
      {
        heading: 'Cos\u2019\u00e8 una tonalit\u00e0',
        body: 'La tonalit\u00e0 \u00e8 l\u2019insieme di note e di gerarchie costruito intorno a una nota principale, la tonica. Do maggiore usa solo i tasti bianchi: nessuna alterazione.',
        remember: 'Tonalit\u00e0 = tonica + scala.',
        notes: DO_MAGGIORE,
        polly: 'Do \u00e8 il punto di partenza ideale!',
      },
      {
        heading: 'Alterazioni e armatura',
        body: 'Il diesis alza una nota di un semitono, il bemolle la abbassa. Quando una scala ne contiene, si scrivono una volta sola all\u2019inizio del pentagramma: \u00e8 l\u2019armatura di chiave. Cos\u00ec non vanno ripetute a ogni nota.',
        remember: '\u266f alza di un semitono \u00b7 \u266d abbassa di un semitono.',
        notes: [n(65, 4, 'Fa'), n(66, 5, 'Fa\u266f')],
        polly: 'Guarda dove sta il Fa\u266f!',
      },
      {
        heading: 'Fa maggiore ha un bemolle',
        body: 'Fa maggiore \u00e8 Fa Sol La Si\u266d Do Re Mi Fa: il Si\u266d permette di avere il semitono tra il 3\u00b0 e il 4\u00b0 grado. L\u2019armatura ha quindi un solo bemolle.',
        remember: 'Sol maggiore: 1\u266f (Fa\u266f) \u00b7 Fa maggiore: 1\u266d (Si\u266d)',
        base: 65,
        notes: [n(65, 1, '1'), n(67, 2, '2'), n(69, 3, '3'), n(70, 4, '4'), n(72, 5, '5'), n(74, 6, '6'), n(76, 7, '7'), n(77, 1, '1')],
        polly: 'Un diesis o un bemolle: il primo passo!',
      },
    ],
  },
}


// "Prima di partire": staff = note da disegnare sul pentagramma (vedi ReadStaff); play = note da ascoltare
const st = (step, label, dur) => ({ step, label, dur })

const CH0 = {
  1: {
    pages: [
      {
        heading: 'Il pentagramma',
        body: 'La musica si scrive su cinque linee parallele, il pentagramma. Tra le linee ci sono quattro spazi. Linee e spazi si contano sempre dal basso verso l\u2019alto: pi\u00f9 una nota \u00e8 in alto, pi\u00f9 il suono \u00e8 acuto.',
        remember: '5 linee e 4 spazi, contati dal basso.',
        staff: { items: [st(0, '1\u00aa'), st(2, '2\u00aa'), st(4, '3\u00aa'), st(6, '4\u00aa'), st(8, '5\u00aa')] },
        polly: 'Si parte sempre dal basso!',
      },
      {
        heading: 'La chiave di violino',
        body: 'All\u2019inizio del pentagramma c\u2019\u00e8 la chiave, che dice quale nota si trova su quale linea. La chiave di violino si avvolge intorno alla seconda linea: quella linea \u00e8 il Sol.',
        remember: 'Chiave di violino: la seconda linea \u00e8 il Sol.',
        staff: { items: [st(2, 'Sol')] },
        play: [67],
        polly: 'Ecco il tuo punto di riferimento!',
      },
    ],
  },
  2: {
    pages: [
      {
        heading: 'Le note sulle linee',
        body: 'In chiave di violino, dal basso, le cinque linee sono Mi, Sol, Si, Re, Fa. Una frase per ricordarle: \u201cMi Sol Si Re Fa\u201d, una nota ogni due.',
        remember: 'Linee: Mi \u2013 Sol \u2013 Si \u2013 Re \u2013 Fa.',
        staff: { items: [st(0, 'Mi'), st(2, 'Sol'), st(4, 'Si'), st(6, 'Re'), st(8, 'Fa')] },
        play: [64, 67, 71, 74, 77],
        polly: 'Una nota ogni due passi!',
      },
      {
        heading: 'Le note negli spazi',
        body: 'Gli spazi, dal basso, sono Fa, La, Do, Mi: la parola \u201cFALADOMI\u201d li riassume. Linee e spazi insieme formano la scala, nota dopo nota.',
        remember: 'Spazi: Fa \u2013 La \u2013 Do \u2013 Mi.',
        staff: { items: [st(1, 'Fa'), st(3, 'La'), st(5, 'Do'), st(7, 'Mi')] },
        play: [65, 69, 72, 76],
        polly: 'Gli spazi completano il quadro!',
      },
      {
        heading: 'Il Do centrale',
        body: 'Sotto il pentagramma si aggiungono piccole linee, i tagli addizionali. Il Do centrale sta sul primo taglio sotto le cinque linee: \u00e8 il Do al centro della tastiera.',
        remember: 'Do centrale = primo taglio sotto il pentagramma.',
        staff: { items: [st(-2, 'Do')] },
        play: [60],
        polly: 'Il Do centrale \u00e8 la tua casa!',
      },
    ],
  },
  3: {
    pages: [
      {
        heading: 'Le durate delle note',
        body: 'La forma della nota dice quanto dura. In 4/4 la semiminima vale una pulsazione, la minima ne vale due, la semibreve quattro, la croma mezza.',
        remember: 'Semibreve 4 \u00b7 Minima 2 \u00b7 Semiminima 1 \u00b7 Croma \u00bd',
        staff: { items: [st(4, 'semibreve', 'whole'), st(4, 'minima', 'half'), st(4, 'semiminima', 'quarter'), st(4, 'croma', 'eighth')] },
        polly: 'La forma racconta la durata!',
      },
      {
        heading: 'La battuta in 4/4',
        body: 'Le note si raggruppano in battute, separate da una stanghetta. Il 4/4 ha quattro pulsazioni per battuta: i due numeri all\u2019inizio dicono quante e di che tipo (quarti).',
        remember: '4/4 = quattro semiminime in ogni battuta.',
        staff: { items: [st(4, '1', 'quarter'), st(4, '2', 'quarter'), st(4, '3', 'quarter'), st(4, '4', 'quarter')], timeSig: '44', endBar: true },
        polly: 'Batti il tempo con me!',
      },
      {
        heading: 'Le pause',
        body: 'Anche il silenzio ha una durata. Ogni figura ha la sua pausa: stessa durata, ma senza suono. Nella musica le pause contano quanto le note.',
        remember: 'Ogni nota ha la sua pausa, con la stessa durata.',
        notes: [],
        polly: 'Il silenzio fa parte della musica!',
      },
    ],
  },
}

const PLACEHOLDER = {
  pages: [
    {
      heading: 'Lezione in preparazione',
      body: 'I contenuti di questa lezione sono in arrivo. Intanto puoi esplorare il Prontuario e lo Strumento.',
      remember: 'Torna presto: aggiungiamo capitolo per capitolo.',
      notes: [],
      polly: 'Un attimo di pazienza!',
    },
  ],
}

export function lessonFor(chapter, stepId) {
  if (chapter === 0) return CH0[stepId] || PLACEHOLDER
  if (chapter >= 2) return CONTENT[chapter]?.lessons?.[stepId] || PLACEHOLDER
  return (chapter === 1 && CH1[stepId]) || PLACEHOLDER
}
