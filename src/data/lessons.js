// Contenuti delle lezioni. Ogni lezione è una lista di pagine.
// notes: altezze MIDI da mostrare sulla tastiera (60 = Do4); deg: grado e etichetta di ogni nota.
// Per ora c'è una lezione di esempio, usata per tutti i passi di tipo "Lezione".
const SAMPLE = {
  title: 'Gli intervalli',
  pages: [
    {
      heading: 'Cos’è un intervallo musicale',
      body:
        'L’intervallo è la distanza tra due note. Si misura contando i gradi della scala che intercorrono tra la prima e la seconda nota, inclusi gli estremi. All’interno della musica tonale, la comprensione degli intervalli è la chiave fondamentale per costruire accordi, analizzare le melodie e muoversi con precisione su qualsiasi strumento a corda o a tastiera.',
      remember: 'Da Do a Mi c’è un intervallo di terza (Do – Re – Mi): si contano i gradi, estremi inclusi.',
      notes: [
        { midi: 60, deg: 1, label: '1' },
        { midi: 64, deg: 3, label: '3' },
      ],
      polly: 'Memorizza bene questo concetto!',
    },
    {
      heading: 'Terza maggiore e terza minore',
      body:
        'Due intervalli possono avere lo stesso nome e suonare diversi. Per distinguerli si contano i semitoni, cioè le distanze tra un tasto e quello immediatamente vicino, bianco o nero che sia.',
      remember: 'Terza minore = 3 semitoni · Terza maggiore = 4 semitoni',
      notes: [
        { midi: 60, deg: 1, label: '1' },
        { midi: 63, deg: 3, label: '♭3' },
        { midi: 64, deg: 3, label: '3' },
      ],
      polly: 'Ascolta la differenza!',
    },
    {
      heading: 'La quinta giusta',
      body:
        'La quinta è l’intervallo più stabile dopo l’ottava. Da Do a Sol si contano cinque gradi e sette semitoni.',
      remember: 'Quinta giusta = 7 semitoni',
      notes: [
        { midi: 60, deg: 1, label: '1' },
        { midi: 67, deg: 5, label: '5' },
      ],
      polly: 'Ci sei quasi!',
    },
  ],
}

export function lessonFor() {
  return SAMPLE
}
