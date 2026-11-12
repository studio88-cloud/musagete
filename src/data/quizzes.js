// Esercizi e quiz, per capitolo e numero di passo.
// play: note (MIDI) da far ascoltare; answer: indice della risposta giusta;
// hints[i]: spiegazione mostrata se si sceglie l'opzione i; explanation: spiegazione generale.
const CH1 = {
  6: {
    kind: 'ear',
    questions: [
      {
        prompt: 'Ascolta: che intervallo senti?',
        play: [60, 64],
        options: ['Terza minore', 'Terza maggiore', 'Quarta giusta', 'Quinta giusta'],
        answer: 1,
        explanation: 'Dal Do al Mi ci sono 4 semitoni: è una terza maggiore.',
      },
      {
        prompt: 'Ascolta: che intervallo senti?',
        play: [60, 63],
        options: ['Seconda maggiore', 'Terza minore', 'Terza maggiore', 'Quinta giusta'],
        answer: 1,
        explanation: 'Dal Do al Mi♭ ci sono 3 semitoni: è una terza minore.',
      },
      {
        prompt: 'Ascolta: che intervallo senti?',
        play: [60, 67],
        options: ['Quarta giusta', 'Quinta giusta', 'Sesta maggiore', 'Ottava'],
        answer: 1,
        explanation: 'Dal Do al Sol ci sono 7 semitoni: è una quinta giusta.',
      },
      {
        prompt: 'Ascolta: che intervallo senti?',
        play: [60, 72],
        options: ['Quinta giusta', 'Settima maggiore', 'Ottava', 'Terza maggiore'],
        answer: 2,
        explanation: 'Le due note hanno lo stesso nome, a 12 semitoni di distanza: è un’ottava.',
      },
    ],
  },
  9: {
    kind: 'quiz',
    passMark: 0.8,
    questions: [
      {
        prompt: 'Quanti semitoni contiene un’ottava?',
        options: ['10', '11', '12', '14'],
        answer: 2,
        explanation: 'Un’ottava contiene 12 semitoni: da un Do al Do successivo.',
      },
      {
        prompt: 'Tra quali note della scala di Do maggiore c’è un semitono?',
        options: ['Do–Re e Re–Mi', 'Mi–Fa e Si–Do', 'Fa–Sol e La–Si', 'Re–Mi e Sol–La'],
        answer: 1,
        explanation: 'Sono le uniche coppie di note vicine senza un tasto nero in mezzo.',
      },
      {
        prompt: 'Qual è la distanza corretta tra la tonica e la sua terza maggiore?',
        options: ['1 tono e mezzo (3 semitoni)', '2 toni interi (4 semitoni)', '3 toni interi (6 semitoni)', '1 tono intero (2 semitoni)'],
        answer: 1,
        explanation: 'La terza maggiore è di 2 toni interi, cioè 4 semitoni.',
        hints: [
          'Un tono e mezzo (3 semitoni) è una terza minore.',
          null,
          'Tre toni interi (6 semitoni) formano un tritono, più grande di una terza.',
          'Un tono intero (2 semitoni) è una seconda maggiore.',
        ],
      },
      {
        prompt: 'Quale formula descrive la scala minore naturale?',
        options: ['1 2 ♭3 4 5 ♭6 ♭7', '1 2 3 4 5 6 7', '1 2 ♭3 4 5 ♭6 7', '1 ♭2 ♭3 4 5 ♭6 ♭7'],
        answer: 0,
        explanation: 'La minore naturale abbassa di un semitono il 3°, il 6° e il 7° grado.',
        hints: [
          null,
          'Questa è la scala maggiore.',
          'Questa è la minore armonica: il 7° grado è rialzato.',
          'Questa è la scala frigia, con anche il 2° grado abbassato.',
        ],
      },
      {
        prompt: 'Quale armatura ha Sol maggiore?',
        options: ['Un bemolle (Si♭)', 'Un diesis (Fa♯)', 'Due diesis (Fa♯ e Do♯)', 'Nessuna alterazione'],
        answer: 1,
        explanation: 'Sol maggiore ha un solo diesis, il Fa♯.',
        hints: [
          'Un bemolle è l’armatura di Fa maggiore.',
          null,
          'Due diesis sono l’armatura di Re maggiore.',
          'Nessuna alterazione è l’armatura di Do maggiore.',
        ],
      },
    ],
  },
}

// "Prima di partire": quiz finale (passo 4)
const CH0 = {
  4: {
    kind: 'quiz',
    passMark: 0.8,
    questions: [
      {
        prompt: 'Quante linee ha il pentagramma?',
        options: ['4', '5', '6', '7'],
        answer: 1,
        explanation: 'Il pentagramma ha cinque linee e quattro spazi.',
      },
      {
        prompt: 'Intorno a quale linea si avvolge la chiave di violino?',
        options: ['La prima', 'La seconda', 'La terza', 'La quarta'],
        answer: 1,
        explanation: 'La chiave di violino gira intorno alla seconda linea, che \u00e8 il Sol.',
      },
      {
        prompt: 'Come si chiamano, dal basso, le note negli spazi in chiave di violino?',
        options: ['Fa \u2013 La \u2013 Do \u2013 Mi', 'Mi \u2013 Sol \u2013 Si \u2013 Re', 'Do \u2013 Re \u2013 Mi \u2013 Fa', 'La \u2013 Do \u2013 Mi \u2013 Sol'],
        answer: 0,
        explanation: 'Gli spazi sono Fa, La, Do, Mi (\u201cFALADOMI\u201d).',
        hints: [null, 'Queste sono le note sulle linee (con il Fa in cima).', null, null],
      },
      {
        prompt: 'In 4/4, quante pulsazioni dura una minima?',
        options: ['1', '2', '3', '4'],
        answer: 1,
        explanation: 'La minima vale due pulsazioni, il doppio della semiminima.',
      },
      {
        prompt: 'Quale figura dura quattro pulsazioni in 4/4?',
        options: ['Croma', 'Semiminima', 'Minima', 'Semibreve'],
        answer: 3,
        explanation: 'La semibreve riempie da sola l\u2019intera battuta in 4/4.',
      },
    ],
  },
}

// Domanda iniziale: due domande veloci, bisogna rispondere giusto a entrambe
export const PLACEMENT = {
  kind: 'quiz',
  passMark: 1,
  questions: [
    {
      prompt: 'Quale nota si trova sulla seconda linea in chiave di violino?',
      options: ['Mi', 'Sol', 'Si', 'Re'],
      answer: 1,
      explanation: 'La chiave di violino si avvolge sulla seconda linea: \u00e8 il Sol.',
    },
    {
      prompt: 'In 4/4, quante pulsazioni dura una minima?',
      options: ['1', '2', '3', '4'],
      answer: 1,
      explanation: 'La minima vale due pulsazioni.',
    },
  ],
}

export function quizFor(chapter, stepId) {
  if (chapter === 0) return CH0[stepId] || null
  return (chapter === 1 && CH1[stepId]) || null
}
