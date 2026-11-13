// Prontuario: 40 voci. Titoli, sottotitoli e testi si modificano (o traducono) qui.
// "chapter" è il capitolo che sblocca la voce (si sblocca quando il capitolo diventa quello attuale).
// Una voce ha: def (definizione), formula, points (elenco), examples (esempi da vedere e ascoltare).
// Speciali: 'interchange' ha una sua tabella, 'circle' ha la mappa interattiva.
import { parseFormula } from '../lib/music'

const nt = (midi, deg, label) => ({ midi, deg, label })

// Scala o accordo da una tonica bianca e da una formula ("1 ♭3 5"); base = tonica
const sc = (label, root, formula, opts = {}) => {
  const notes = parseFormula(formula).map((f) => nt(root + f.semi, f.deg, f.label))
  const play = opts.chord ? notes.map((x) => x.midi) : [...notes.map((x) => x.midi), ...(opts.octave === false ? [] : [root + 12])]
  return { label, base: root, notes, play, chord: Boolean(opts.chord), note: opts.note }
}
const ch = (label, root, formula, note) => sc(label, root, formula, { chord: true, note })
// Progressione: accordi con funzione, sigla e altezze
const pr = (label, list, note) => ({
  label,
  notes: [],
  play: list.map((c) => c[2]),
  progression: true,
  chords: list.map(([fn, sym]) => ({ fn, sym })),
  note,
})

const C = [60, 64, 67]
const Dm = [62, 65, 69]
const Em = [64, 67, 71]
const Fm_ = [65, 69, 72]
const G = [55, 59, 62]
const Am = [57, 60, 64]
const F = [53, 57, 60]
const Cm = [60, 63, 67]
const G7 = [55, 59, 62, 65]
const Dm7 = [62, 65, 69, 72]
const CM7 = [60, 64, 67, 71]

export const HANDBOOK = [
  // ——— Capitolo 1 · Fondamenti
  {
    id: 'notes', chapter: 1, title: 'Note e alterazioni', subtitle: 'Do, Re, Mi… diesis e bemolle',
    def: 'Le note naturali sono sette: Do, Re, Mi, Fa, Sol, La, Si. Il diesis (♯) alza una nota di un semitono, il bemolle (♭) la abbassa di un semitono. Tra due note vicine c’è un tono, tranne tra Mi–Fa e Si–Do, dove c’è un semitono.',
    formula: '12 semitoni = 1 ottava',
    points: ['Tono = 2 semitoni', 'Mi–Fa e Si–Do sono semitoni', 'Do♯ e Re♭ sono la stessa nota con due nomi (enarmonia)'],
    examples: [sc('Le sette note, da Do a Do', 60, '1 2 3 4 5 6 7')],
  },
  {
    id: 'intervals', chapter: 1, title: 'Intervalli', subtitle: 'La distanza tra due note',
    def: 'L’intervallo è la distanza tra due note. Si conta con un numero (seconda, terza, quarta…) e una qualità (giusto, maggiore, minore, eccedente, diminuito).',
    formula: 'Semitoni: unisono 0 · seconda minore 1, maggiore 2 · terza minore 3, maggiore 4 · quarta giusta 5 · quinta giusta 7 · sesta minore 8, maggiore 9 · settima minore 10, maggiore 11 · ottava 12',
    formulaTable: {
      title: 'Quanti semitoni contiene',
      head: ['Intervallo', 'Minore', 'Maggiore', 'Giusto'],
      rows: [
        ['Unisono', '', '', '0'],
        ['Seconda', '1', '2', ''],
        ['Terza', '3', '4', ''],
        ['Quarta', '', '', '5'],
        ['Quinta', '', '', '7'],
        ['Sesta', '8', '9', ''],
        ['Settima', '10', '11', ''],
        ['Ottava', '', '', '12'],
      ],
      foot: 'Un tono = 2 semitoni. Tra Do e Mi ci sono 4 semitoni: è una terza maggiore.',
    },
    points: ['Giusti: unisono, quarta, quinta, ottava', 'Maggiori o minori: seconda, terza, sesta, settima', 'Minore = un semitono in meno del maggiore', 'Eccedente = un semitono in più del giusto o del maggiore; diminuito = un semitono in meno del giusto o del minore', 'Tritono: quarta eccedente o quinta diminuita (6 semitoni)'],
    examples: [ch('Terza maggiore e quinta giusta sopra Do', 60, '1 3 5')],
  },
  {
    id: 'major', chapter: 1, title: 'Scala maggiore', subtitle: 'Tono, tono, semitono, tono, tono, tono, semitono',
    def: 'È la scala di sette note da cui nasce tutta l’armonia tonale. Ha una struttura fissa di toni e semitoni, e ogni nota è un grado numerato da 1 a 7.',
    formula: '1 2 3 4 5 6 7 · T T S T T T S',
    points: ['I semitoni sono tra 3–4 e 7–8', 'I gradi si indicano con i numeri romani: I, II, III…', 'Il 1° grado è la tonica, il 5° la dominante'],
    examples: [sc('Do maggiore', 60, '1 2 3 4 5 6 7'), sc('Sol maggiore (un diesis: Fa♯)', 55, '1 2 3 4 5 6 7'), sc('Fa maggiore (un bemolle: Si♭)', 53, '1 2 3 4 5 6 7')],
  },
  {
    id: 'circle', chapter: 1, title: 'Circolo delle Quinte', subtitle: 'Mappa interattiva delle tonalità',
    def: 'Disponendo le tonalità in cerchio, ogni passo in senso orario sale di una quinta e aggiunge un diesis; in senso antiorario scende di una quinta e aggiunge un bemolle. Tocca una tonalità per vedere l’armatura e la relativa minore.',
    formula: 'Quinta su = +1 ♯ · quinta giù = +1 ♭',
    points: ['Do è in alto, senza alterazioni', 'Le tonalità vicine nel cerchio hanno quasi tutte le note in comune', 'Dentro il cerchio stanno le relative minori'],
    examples: [],
  },
  {
    id: 'keysig', chapter: 1, title: 'Armature di chiave', subtitle: 'Quanti diesis o bemolle ha una tonalità',
    def: 'L’armatura raccoglie all’inizio del brano le alterazioni della tonalità, così non vanno scritte ogni volta.',
    formula: 'Diesis: Fa Do Sol Re La Mi Si · Bemolle: Si Mi La Re Sol Do Fa',
    points: ['Sol 1♯ · Re 2♯ · La 3♯ · Mi 4♯ · Si 5♯', 'Fa 1♭ · Si♭ 2♭ · Mi♭ 3♭ · La♭ 4♭ · Re♭ 5♭', 'Con i diesis, la tonica è mezzo tono sopra l’ultimo diesis'],
    examples: [sc('Re maggiore: Fa♯ e Do♯', 62, '1 2 3 4 5 6 7')],
  },
  {
    id: 'relative', chapter: 1, title: 'Tonalità relative', subtitle: 'Maggiore e minore con le stesse note',
    def: 'La relativa minore di una tonalità maggiore usa le stesse note, ma parte dal suo sesto grado. La tonalità omonima (o parallela) ha la stessa tonica e modo diverso.',
    formula: 'Relativa minore = 6° grado (3 semitoni sotto la tonica)',
    points: ['Do maggiore ↔ La minore (relative)', 'Do maggiore ↔ Do minore (omonime)', 'Hanno la stessa armatura le relative, non le omonime'],
    examples: [sc('La minore naturale (stesse note di Do)', 57, '1 2 ♭3 4 5 ♭6 ♭7')],
  },

  // ——— Capitolo 2 · Accordi
  {
    id: 'triads', chapter: 2, title: 'Triadi', subtitle: 'Accordi di tre note: maggiore e minore',
    def: 'La triade si costruisce sovrapponendo due terze: fondamentale, terza e quinta. La qualità dipende dalla terza: maggiore se è maggiore, minore se è minore.',
    formula: 'Maggiore 1 3 5 · Minore 1 ♭3 5',
    points: ['Sigla: C maggiore, Cm minore', 'La quinta resta giusta in entrambe', 'La terza decide il “carattere” dell’accordo'],
    examples: [ch('Do maggiore', 60, '1 3 5'), ch('Do minore', 60, '1 ♭3 5')],
  },
  {
    id: 'dimaug', chapter: 2, title: 'Triade diminuita ed eccedente', subtitle: 'Le due triadi instabili',
    def: 'La triade diminuita ha due terze minori sovrapposte, quella eccedente due terze maggiori. Entrambe sono instabili e vogliono risolvere.',
    formula: 'Diminuita 1 ♭3 ♭5 · Eccedente 1 3 ♯5',
    points: ['Sigla: C° (o Cdim), C+ (o Caug)', 'La diminuita compare sul VII grado della scala maggiore', 'L’eccedente è simmetrica: divide l’ottava in tre parti uguali'],
    examples: [ch('Do diminuito', 60, '1 ♭3 ♭5'), ch('Do eccedente', 60, '1 3 ♯5')],
  },
  {
    id: 'sevenths', chapter: 2, title: 'Accordi di settima', subtitle: 'Quattro note, cinque qualità',
    def: 'Aggiungendo la settima alla triade si ottiene un accordo di quattro note, più ricco e più “di movimento”. Le qualità principali sono cinque.',
    formula: 'maj7 1 3 5 7 · 7 1 3 5 ♭7 · m7 1 ♭3 5 ♭7 · m7♭5 1 ♭3 ♭5 ♭7 · dim7 1 ♭3 ♭5 ♭♭7',
    points: ['Cmaj7 (CΔ): settima maggiore', 'C7: dominante, ha la ♭7 e la 3 maggiore', 'Cm7♭5 si scrive anche Cø'],
    examples: [ch('Do maggiore settima', 60, '1 3 5 7'), ch('Do settima di dominante', 60, '1 3 5 ♭7'), ch('Do minore settima', 60, '1 ♭3 5 ♭7'), ch('Do semidiminuito', 60, '1 ♭3 ♭5 ♭7')],
  },
  {
    id: 'symbols', chapter: 2, title: 'Sigle degli accordi', subtitle: 'Come si legge un cifrato',
    def: 'La sigla dice la nota fondamentale e la qualità dell’accordo. Dopo la lettera si aggiungono i simboli che cambiano o completano l’accordo.',
    formula: 'C · Cm · C° · C+ · Cmaj7 · C7 · Cm7 · Cø · C6 · Csus4 · Cadd9',
    points: ['Nessun simbolo = triade maggiore', 'sus2 e sus4 sostituiscono la terza con la seconda o la quarta', 'add9 aggiunge la nona senza la settima', 'C/E = Do con il Mi al basso'],
    examples: [ch('Csus4: 1 4 5', 60, '1 4 5'), ch('Cadd9: 1 3 5 9', 60, '1 3 5 9')],
  },

  // ——— Capitolo 3 · Armonizzazione della scala
  {
    id: 'harm3', chapter: 3, title: 'Armonizzazione a triadi', subtitle: 'Un accordo su ogni grado',
    def: 'Costruendo una triade su ciascun grado della scala maggiore, usando solo le sue note, si ottengono sette accordi.',
    formula: 'I ii iii IV V vi vii° · maggiori: I IV V · minori: ii iii vi',
    points: ['In Do: C Dm Em F G Am B°', 'I numeri romani maiuscoli sono maggiori, minuscoli minori', 'Il vii° è diminuito'],
    examples: [pr('Gli accordi di Do maggiore', [['I', 'C', C], ['ii', 'Dm', Dm], ['iii', 'Em', Em], ['IV', 'F', F], ['V', 'G', G], ['vi', 'Am', Am], ['vii°', 'B°', [59, 62, 65]]])],
  },
  {
    id: 'harm7', chapter: 3, title: 'Armonizzazione a quattro voci', subtitle: 'Gli accordi di settima della scala',
    def: 'Aggiungendo una terza sopra ogni triade si ottengono gli accordi di settima della tonalità.',
    formula: 'Imaj7 ii7 iii7 IVmaj7 V7 vi7 viiø',
    points: ['In Do: Cmaj7 Dm7 Em7 Fmaj7 G7 Am7 Bm7♭5', 'Solo il V grado è una settima di dominante', 'Il viiø è il semidiminuito'],
    examples: [pr('Settime di Do maggiore', [['Imaj7', 'Cmaj7', CM7], ['ii7', 'Dm7', Dm7], ['iii7', 'Em7', [64, 67, 71, 74]], ['IVmaj7', 'Fmaj7', [65, 69, 72, 76]], ['V7', 'G7', [67, 71, 74, 77]], ['vi7', 'Am7', [57, 60, 64, 67]]])],
  },
  {
    id: 'functions', chapter: 3, title: 'Funzioni armoniche', subtitle: 'Tonica, sottodominante, dominante',
    def: 'Gli accordi si raggruppano in tre funzioni. La tonica dà riposo, la sottodominante si allontana, la dominante crea tensione e chiede di tornare alla tonica.',
    formula: 'T: I, iii, vi · S: ii, IV · D: V, vii°',
    points: ['Il percorso tipico è T → S → D → T', 'Gli accordi della stessa funzione si possono scambiare', 'In Do: T = C Em Am · S = Dm F · D = G B°'],
    examples: [pr('T → S → D → T', [['T', 'C', C], ['S', 'F', F], ['D', 'G', G], ['T', 'C', C]])],
  },

  // ——— Capitolo 4 · Cadenze e progressioni
  {
    id: 'cadences', chapter: 4, title: 'Cadenze', subtitle: 'Le formule che chiudono una frase',
    def: 'Una cadenza è una breve successione di accordi che chiude una frase musicale, come una punteggiatura.',
    formula: 'Perfetta V–I · Plagale IV–I · Sospesa …–V · D’inganno V–vi',
    points: ['Perfetta: la più conclusiva', 'Plagale: il classico “Amen”', 'Sospesa (semicadenza): lascia il discorso aperto', 'D’inganno: al posto del I arriva il vi'],
    examples: [
      pr('Perfetta: G – C', [['V', 'G', G], ['I', 'C', C]]),
      pr('Plagale: F – C', [['IV', 'F', F], ['I', 'C', C]]),
      pr('Sospesa: C – G', [['I', 'C', C], ['V', 'G', G]]),
      pr('D’inganno: G – Am', [['V', 'G', G], ['vi', 'Am', Am]]),
    ],
  },
  {
    id: 'iiVI', chapter: 4, title: 'Il II–V–I', subtitle: 'La cadenza più usata nel jazz',
    def: 'È una sequenza di tre accordi in cui ogni radice scende di quinta: ii, V, I. È la progressione di base della musica jazz e di tanta musica pop.',
    formula: 'Maggiore: ii7 – V7 – Imaj7 · Minore: iiø – V7 – im',
    points: ['In Do: Dm7 – G7 – Cmaj7', 'In La minore: Bm7♭5 – E7 – Am', 'Le radici scendono di quinta'],
    examples: [pr('Dm7 – G7 – Cmaj7', [['ii7', 'Dm7', Dm7], ['V7', 'G7', G7], ['Imaj7', 'Cmaj7', CM7]])],
  },
  {
    id: 'progs', chapter: 4, title: 'Progressioni frequenti', subtitle: 'Giri armonici che si trovano ovunque',
    def: 'Alcune successioni di accordi sono ormai delle formule: si trovano in migliaia di canzoni.',
    formula: 'I–vi–IV–V · I–V–vi–IV · vi–IV–I–V · I–IV–V',
    points: ['I–vi–IV–V è il “giro di Do” degli anni ’50', 'I–V–vi–IV è il più diffuso nel pop moderno', 'I–IV–V sono le tre funzioni principali'],
    examples: [
      pr('I – vi – IV – V', [['I', 'C', C], ['vi', 'Am', Am], ['IV', 'F', F], ['V', 'G', G]]),
      pr('I – V – vi – IV', [['I', 'C', C], ['V', 'G', G], ['vi', 'Am', Am], ['IV', 'F', F]]),
    ],
  },
  {
    id: 'fifths', chapter: 4, title: 'Ciclo delle quinte', subtitle: 'Radici che scendono di quinta',
    def: 'Una progressione in cui la fondamentale di ogni accordo scende di quinta (o sale di quarta) rispetto al precedente, attraversando tutti i gradi della scala.',
    formula: 'I – IV – vii° – iii – vi – ii – V – I',
    points: ['In Do: C F B° Em Am Dm G C', 'Dà un forte senso di movimento verso la tonica', 'Si può abbreviare partendo da un punto qualsiasi'],
    examples: [pr('Da Am a C', [['vi', 'Am', Am], ['ii', 'Dm', Dm], ['V', 'G', G], ['I', 'C', C]])],
  },

  // ——— Capitolo 5 · Rivolti e basso numerato
  {
    id: 'inversions', chapter: 5, title: 'Rivolti', subtitle: 'Cambiare la nota al basso',
    def: 'Un accordo è in stato fondamentale quando la nota più grave è la fondamentale. Se al basso c’è la terza è in primo rivolto, se c’è la quinta in secondo rivolto.',
    formula: 'Fond. 1 3 5 · 1° rivolto 3 5 1 · 2° rivolto 5 1 3',
    points: ['C/E: primo rivolto', 'C/G: secondo rivolto', 'Il rivolto cambia il colore, non l’armonia', 'Con i rivolti il basso può muoversi per gradi'],
    examples: [pr('Stato fondamentale, 1° e 2° rivolto', [['C', 'C', [60, 64, 67]], ['C/E', 'C/E', [52, 55, 60]], ['C/G', 'C/G', [55, 60, 64]]])],
  },
  {
    id: 'figured', chapter: 5, title: 'Basso numerato', subtitle: 'Leggere i numeri sotto il basso',
    def: 'Nel basso numerato si scrive solo la linea del basso e sotto dei numeri che indicano gli intervalli sopra di esso. È la scrittura abbreviata dell’armonia barocca.',
    formula: '6 = 1° rivolto · 6/4 = 2° rivolto · 7 · 6/5 · 4/3 · 4/2',
    points: ['Nessun numero: triade in stato fondamentale', '6: triade in primo rivolto', '6/4: triade in secondo rivolto', '7, 6/5, 4/3, 4/2: stato fondamentale e tre rivolti della settima'],
    examples: [ch('Triade di Do sopra il Do', 60, '1 3 5')],
  },

  // ——— Capitolo 6 · Dominanti secondarie
  {
    id: 'secdom', chapter: 6, title: 'Dominanti secondarie', subtitle: 'Una dominante per ogni grado',
    def: 'Una dominante secondaria è la settima di dominante del grado verso cui si dirige. Si scrive V7/x, dove x è l’accordo di arrivo.',
    formula: 'V7/ii · V7/iii · V7/IV · V7/V · V7/vi',
    points: ['In Do: A7 → Dm · B7 → Em · C7 → F · D7 → G · E7 → Am', 'Introducono una nota estranea alla scala', 'Il V7/V è la più usata'],
    examples: [pr('C – D7 – G7 – C', [['I', 'C', C], ['V7/V', 'D7', [62, 66, 69, 72]], ['V7', 'G7', G7], ['I', 'C', C]])],
  },

  // ——— Capitolo 7 · Modulazione
  {
    id: 'modulation', chapter: 7, title: 'Modulazione', subtitle: 'Cambiare tonalità',
    def: 'Modulare vuol dire passare da una tonalità a un’altra. Il modo più naturale usa un accordo pivot, che appartiene a entrambe le tonalità, seguito da una cadenza nella nuova.',
    formula: 'Pivot → V7 della nuova tonalità → nuova tonica',
    points: ['Le tonalità vicine (una alterazione di differenza) modulano più facilmente', 'In Do: la relativa Am, la dominante G, la sottodominante F', 'Am è vi in Do e ii in Sol: un buon pivot'],
    examples: [pr('Da Do a Sol: C – Am – D7 – G', [['I', 'C', C], ['vi = ii', 'Am', Am], ['V7', 'D7', [62, 66, 69, 72]], ['I', 'G', [55, 59, 62]]])],
  },

  // ——— Capitolo 8 · Modi
  {
    id: 'modes', chapter: 8, title: 'I sette modi', subtitle: 'Sette scale da una sola scala',
    def: 'Partendo da ogni grado della scala maggiore e suonando sempre le stesse note si ottengono i modi. Ognuno ha un suo colore, dato dal grado caratteristico.',
    formula: 'Ionio 1 2 3 4 5 6 7 · Dorico 1 2 ♭3 4 5 6 ♭7 · Frigio 1 ♭2 ♭3 4 5 ♭6 ♭7 · Lidio 1 2 3 ♯4 5 6 7 · Misolidio 1 2 3 4 5 6 ♭7 · Eolio 1 2 ♭3 4 5 ♭6 ♭7 · Locrio 1 ♭2 ♭3 4 ♭5 ♭6 ♭7',
    points: ['Dorico: la 6ª maggiore lo distingue dal minore naturale', 'Frigio: ♭2, suono spagnoleggiante', 'Lidio: ♯4, suono luminoso', 'Misolidio: ♭7, suono da dominante'],
    examples: [sc('Re dorico', 62, '1 2 ♭3 4 5 6 ♭7'), sc('Fa lidio', 65, '1 2 3 ♯4 5 6 7'), sc('Sol misolidio', 55, '1 2 3 4 5 6 ♭7')],
  },
  {
    id: 'interchange', chapter: 8, title: 'Interscambio Modale', subtitle: 'Accordi presi in prestito dai modi',
    def: 'Tabella degli accordi di settima costruiti su ogni grado delle principali scale.',
    formula: '', points: [], examples: [],
  },

  // ——— Capitolo 9 · Scale
  {
    id: 'minorscales', chapter: 9, title: 'Scale minori', subtitle: 'Naturale, armonica e melodica',
    def: 'Esistono tre forme della scala minore. L’armonica alza il settimo grado per avere una sensibile e la melodica alza anche il sesto salendo, per evitare il salto di seconda eccedente.',
    formula: 'Naturale 1 2 ♭3 4 5 ♭6 ♭7 · Armonica 1 2 ♭3 4 5 ♭6 7 · Melodica 1 2 ♭3 4 5 6 7',
    points: ['L’armonica ha una seconda eccedente tra ♭6 e 7', 'La melodica, scendendo, torna alla naturale', 'La minore naturale è il modo eolio'],
    examples: [sc('La minore naturale', 57, '1 2 ♭3 4 5 ♭6 ♭7'), sc('La minore armonica', 57, '1 2 ♭3 4 5 ♭6 7'), sc('La minore melodica (salendo)', 57, '1 2 ♭3 4 5 6 7')],
  },
  {
    id: 'pentatonic', chapter: 9, title: 'Pentatoniche', subtitle: 'Cinque note, molti usi',
    def: 'Le scale pentatoniche hanno cinque note e nessun semitono, per questo suonano bene su moltissimi accordi.',
    formula: 'Maggiore 1 2 3 5 6 · Minore 1 ♭3 4 5 ♭7',
    points: ['La minore è la relativa della maggiore (Do maggiore e La minore)', 'Nel rock e nel blues la minore è la scala base', 'Nessuna nota “sbagliata”: ottima per iniziare a improvvisare'],
    examples: [sc('Do pentatonica maggiore', 60, '1 2 3 5 6'), sc('La pentatonica minore', 57, '1 ♭3 4 5 ♭7')],
  },
  {
    id: 'blues', chapter: 9, title: 'Scala blues', subtitle: 'La pentatonica con la “blue note”',
    def: 'È la pentatonica minore a cui si aggiunge la quinta diminuita, la “blue note”, che dà il tipico colore.',
    formula: '1 ♭3 4 ♭5 5 ♭7',
    points: ['La ♭5 si usa come nota di passaggio', 'Si suona su tutti gli accordi del blues', 'La versione maggiore usa 1 2 ♭3 3 5 6'],
    examples: [sc('Do blues', 60, '1 ♭3 4 ♭5 5 ♭7')],
  },
  {
    id: 'symmetric', chapter: 9, title: 'Scale simmetriche', subtitle: 'Toni interi e diminuita',
    def: 'Sono scale che ripetono lo stesso schema: la scala per toni interi, fatta di soli toni, e la scala diminuita, che alterna tono e semitono.',
    formula: 'Toni interi 1 2 3 ♯4 ♯5 ♭7 · Diminuita 1 2 ♭3 4 ♭5 ♭6 ♭♭7 7',
    points: ['Toni interi: suono sospeso, senza tonica netta', 'Diminuita: si usa sugli accordi di settima diminuita e sulle dominanti alterate', 'Entrambe si ripetono identiche al salto di certi intervalli'],
    examples: [sc('Do per toni interi', 60, '1 2 3 ♯4 ♯5 ♭7'), sc('Do diminuita (tono – semitono)', 60, '1 2 ♭3 4 ♭5 ♭6 ♭♭7 7')],
  },

  // ——— Capitolo 10 · Armonia cromatica
  {
    id: 'neapolitan', chapter: 10, title: 'Sesta napoletana', subtitle: 'L’accordo di ♭II in primo rivolto',
    def: 'È la triade maggiore costruita sul secondo grado abbassato, di solito usata in primo rivolto (da qui il nome “sesta”). Precede la dominante e dà un colore drammatico.',
    formula: '♭II6 → V → I (in minore)',
    points: ['In Do minore: Re♭/Fa (Fa La♭ Re♭)', 'Fa è anche la quarta della scala: è un accordo di sottodominante', 'Risolve sulla dominante, poi sulla tonica'],
    examples: [pr('Fm – D♭/F – G7 – Cm', [['iv', 'Fm', [53, 56, 60]], ['♭II6', 'D♭/F', [53, 56, 61]], ['V7', 'G7', G7], ['i', 'Cm', Cm]])],
  },
  {
    id: 'augsixth', chapter: 10, title: 'Seste aumentate', subtitle: 'Italiana, francese e tedesca',
    def: 'Sono accordi cromatici costruiti sul ♭6 della scala, in cui la sesta aumentata tra ♭6 e ♯4 si allarga verso l’ottava della dominante.',
    formula: 'Italiana ♭6 1 ♯4 · Tedesca ♭6 1 ♭3 ♯4 · Francese ♭6 1 2 ♯4',
    points: ['In Do minore la sesta aumentata è La♭ – Fa♯', 'Le due note si aprono verso Sol–Sol', 'La tedesca suona come una dominante, ma risolve in modo diverso'],
    examples: [pr('Italiana: A♭+6 – G', [['It+6', 'A♭ C F♯', [56, 60, 66]], ['V', 'G', [55, 62, 67]]])],
  },
  {
    id: 'dimpass', chapter: 10, title: 'Diminuito di passaggio', subtitle: 'Collegare due accordi con una settima diminuita',
    def: 'Una settima diminuita tra due accordi riempie il salto cromatico, creando una linea di basso che sale per semitoni.',
    formula: 'I – ♯i° – ii',
    points: ['In Do: C – C♯°7 – Dm', 'Il basso sale per semitoni: Do, Do♯, Re', 'Si ottiene anche come dominante senza fondamentale'],
    examples: [pr('C – C♯° – Dm', [['I', 'C', C], ['♯i°7', 'C♯°7', [61, 64, 67, 70]], ['ii', 'Dm', Dm]])],
  },

  // ——— Capitolo 11 · Estensioni e alterazioni
  {
    id: 'extensions', chapter: 11, title: 'Estensioni', subtitle: 'Nona, undicesima, tredicesima',
    def: 'Le estensioni sono note che si aggiungono sopra la settima, continuando a impilare terze. Sono le note della scala un’ottava sopra: 9 = 2, 11 = 4, 13 = 6.',
    formula: '9 = 2 · 11 = 4 · 13 = 6',
    points: ['Cmaj9 = 1 3 5 7 9', 'Su un accordo maggiore l’11 giusto stona con la terza: si usa ♯11', 'Spesso si omette la quinta'],
    examples: [ch('Do maggiore nona', 60, '1 3 5 7 9'), ch('Do nona di dominante', 60, '1 3 5 ♭7 9')],
  },
  {
    id: 'altered', chapter: 11, title: 'Dominante alterata', subtitle: 'Alterare nona e quinta sul V7',
    def: 'Sulla settima di dominante si possono alterare nona e quinta (♭9, ♯9, ♯11, ♭13) per aumentare la tensione prima di risolvere.',
    formula: '7 + ♭9 · ♯9 · ♯11 · ♭13',
    points: ['G7♭9 → Cm: la ♭9 si risolve sulla quinta', 'G7alt è una famiglia di accordi con più alterazioni', 'La scala alterata (settimo modo del minore melodico) le contiene tutte'],
    examples: [ch('Sol settima ♭9', 55, '1 3 5 ♭7 ♭9')],
  },

  // ——— Capitolo 12 · Sostituzioni
  {
    id: 'tritone', chapter: 12, title: 'Sostituzione di tritono', subtitle: 'V7 al posto di ♭II7',
    def: 'Due settime di dominante a distanza di tritono condividono la terza e la settima (con ruoli scambiati). Per questo la dominante si può sostituire con la settima sul ♭II.',
    formula: 'V7 ↔ ♭II7 (G7 ↔ D♭7)',
    points: ['Le note guida B e F restano uguali', 'Il basso scende per semitoni: ii – ♭II – I', 'In Do: Dm7 – D♭7 – Cmaj7'],
    examples: [pr('Dm7 – D♭7 – Cmaj7', [['ii7', 'Dm7', [53, 57, 60, 62]], ['♭II7', 'D♭7', [53, 56, 59, 61]], ['Imaj7', 'Cmaj7', [55, 59, 60, 64]]])],
  },
  {
    id: 'relsub', chapter: 12, title: 'Sostituzioni diatoniche', subtitle: 'Accordi che hanno due note in comune',
    def: 'Un accordo può sostituirne un altro della stessa funzione quando condivide almeno due note. È un modo semplice per variare un accompagnamento.',
    formula: 'I ↔ iii · vi · IV ↔ ii · V ↔ vii°',
    points: ['C (Do Mi Sol) ↔ Am (La Do Mi) ↔ Em (Mi Sol Si)', 'F (Fa La Do) ↔ Dm (Re Fa La)', 'G7 ↔ B° (Si Re Fa)'],
    examples: [pr('Tonica in tre versioni', [['I', 'C', C], ['vi', 'Am', Am], ['iii', 'Em', Em]])],
  },

  // ——— Capitolo 13 · Armonia jazz avanzata
  {
    id: 'jazzblues', chapter: 13, title: 'Blues jazz', subtitle: 'Dodici battute con le sostituzioni',
    def: 'Il blues jazz mantiene le dodici battute ma ricolora il giro con settime e con ii–V ai suoi punti chiave.',
    formula: 'I7 | IV7 | I7 | I7 | IV7 | IV7 | I7 | VI7 | ii7 | V7 | I7 | V7',
    points: ['In Do: C7 F7 C7 C7 · F7 F7 C7 A7 · Dm7 G7 C7 G7', 'A7 è una dominante secondaria che porta a Dm7', 'Il ii–V finale porta alla ripetizione'],
    examples: [pr('Ultime otto battute', [['IV7', 'F7', [53, 57, 60, 63]], ['I7', 'C7', [55, 58, 60, 64]], ['V7/ii', 'A7', [55, 57, 61, 64]], ['ii7', 'Dm7', Dm7], ['V7', 'G7', G7], ['I7', 'C7', [55, 58, 60, 64]]])],
  },
  {
    id: 'backdoor', chapter: 13, title: 'Backdoor', subtitle: 'Arrivare alla tonica dalla “porta di servizio”',
    def: 'La dominante backdoor è il settimo grado abbassato con settima di dominante (♭VII7), che risolve sulla tonica scendendo di tono. Spesso è preceduta dal iv minore.',
    formula: 'iv7 – ♭VII7 – Imaj7',
    points: ['In Do: Fm7 – B♭7 – Cmaj7', 'Le note guida di B♭7 sono D e A♭', 'La♭ scende su Sol e Re scende su Do'],
    examples: [pr('Fm7 – B♭7 – Cmaj7', [['iv7', 'Fm7', [53, 56, 60, 63]], ['♭VII7', 'B♭7', [53, 56, 58, 62]], ['Imaj7', 'Cmaj7', CM7]])],
  },

  // ——— Capitolo 14 · Dopo la pratica comune
  {
    id: 'quartal', chapter: 14, title: 'Accordi per quarte', subtitle: 'Impilare quarte invece di terze',
    def: 'Gli accordi quartali sono costruiti sovrapponendo quarte giuste. Non hanno un vero colore maggiore o minore e danno un suono aperto e moderno.',
    formula: 'Quarta + quarta: 1 4 ♭7',
    points: ['Re–Sol–Do è l’esempio più comune', 'Si trovano nel jazz modale e nella musica del Novecento', 'Si spostano per gradi senza cambiare struttura'],
    examples: [ch('Re – Sol – Do', 62, '1 4 ♭7')],
  },

  // ——— Capitolo 15 · Armonia negativa
  {
    id: 'negative', chapter: 15, title: 'Armonia negativa', subtitle: 'Riflettere le note come in uno specchio',
    def: 'Ogni nota viene specchiata rispetto a un asse. Con l’asse di Do (tra Mi♭ e Mi) le note si scambiano a coppie.',
    formula: 'Do↔Sol · Re↔Fa · Mi↔Mi♭ · La↔Si♭ · Si↔La♭ · Do♯↔Fa♯',
    points: ['Do maggiore (Do Mi Sol) → Do minore (Sol Mi♭ Do)', 'G7 → Fm6', 'Una cadenza maggiore diventa minore e sospesa'],
    examples: [pr('C – F – G7 – C → Cm – Gm – Fm6 – Cm', [['i', 'Cm', Cm], ['v', 'Gm', [55, 58, 62]], ['iv6', 'Fm6', [53, 56, 60, 62]], ['i', 'Cm', Cm]])],
  },

  // ——— Capitolo 16 · Arrangiare e accompagnare
  {
    id: 'voicings', chapter: 16, title: 'Voicing', subtitle: 'Come disporre le note di un accordo',
    def: 'Il voicing è il modo in cui le note di un accordo sono distribuite sullo strumento. Cambiare il voicing cambia il suono senza cambiare l’accordo.',
    formula: 'Shell 1 3 7 · Drop 2: la 2ª nota dall’alto scende di un’ottava',
    points: ['Shell: solo fondamentale, terza e settima', 'Drop 2: voicing aperto, comodo sulla chitarra', 'Collega gli accordi muovendo meno note possibile'],
    examples: [ch('Cmaj7 shell', 60, '1 3 7'), ch('Cmaj7 completo', 60, '1 3 5 7')],
  },

  // ——— Capitolo 17 · Comporre e improvvisare
  {
    id: 'guide', chapter: 17, title: 'Note guida', subtitle: 'Terza e settima raccontano l’armonia',
    def: 'Le note guida sono la terza e la settima di ogni accordo: da sole definiscono la qualità dell’accordo. Seguirle da un accordo all’altro dà linee melodiche chiare.',
    formula: '3ª e 7ª dell’accordo',
    points: ['Su Dm7 – G7 – Cmaj7 la settima Do scende al Si, poi al Mi', 'Anche Fa (3ª di Dm7) si mantiene fino al Fa di G7', 'Su ogni accordo si improvvisa partendo dalle note guida'],
    examples: [pr('Dm7 – G7 – Cmaj7', [['ii7', 'Dm7', Dm7], ['V7', 'G7', G7], ['Imaj7', 'Cmaj7', CM7]])],
  },
]
