import { nt, sc, ch, pr } from './handbook'

// "In pratica": consigli per applicare ogni capitolo sullo strumento.
// Passo facoltativo, dopo il quiz: non serve per sbloccare il capitolo successivo.
//
// Struttura di ogni capitolo:
//   intro   frase di apertura
//   play    cose da suonare: { title, text, tips?: { all?, keyboard?, guitar?, bass? }, example? }
//   phrase  una frase da imparare a orecchio: { title, text, example }
//   how     come esercitarsi (elenco)
//   mistakes  errori comuni (elenco)
//   goals   obiettivi da spuntare (il progresso resta sul dispositivo)

// Frase da suonare nell'ordine scritto: midis = note in sequenza; i gradi servono per colorare lo strumento
const melody = (label, base, midis) => {
  const seen = new Set()
  const DEG = [1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7]
  const LAB = ['1', '♭2', '2', '♭3', '3', '4', '♭5', '5', '♭6', '6', '♭7', '7']
  const notes = midis
    .filter((m) => (seen.has(m) ? false : seen.add(m)))
    .sort((a, b) => a - b)
    .map((m) => nt(m, DEG[(((m - base) % 12) + 12) % 12], LAB[(((m - base) % 12) + 12) % 12]))
  return { label, base, notes, play: midis, chord: false, melody: true }
}

// Scala con la tonica all'ottava alta: l'ultima nota chiude la scala, anche sullo strumento
const scale = (label, root, formula) => {
  const e = sc(label, root, formula)
  return { ...e, notes: [...e.notes, nt(root + 12, 1, '1')], octaveNote: true }
}

export const PRACTICE = {
  1: {
    intro: 'Hai capito come è fatta una scala. Ora falla suonare: cinque minuti al giorno, piano, valgono più di mezz’ora una volta sola.',
    play: [
      {
        title: 'Do maggiore, su e giù',
        text: 'Suona la scala di Do maggiore salendo e poi scendendo, lentamente, dicendo a voce il nome di ogni nota. Se sbagli, ricomincia dalla prima nota.',
        tips: {
          keyboard: 'Usa solo i tasti bianchi, da Do a Do. Prova con le dita 1 2 3 1 2 3 4 5: il pollice passa sotto dopo il Mi.',
          guitar: 'Parti dal Do sulla quinta corda, terzo tasto, e sali in prima posizione: è la posizione che vedi sullo strumento qui sotto.',
          bass: 'Parti dal Do sulla terza corda, terzo tasto, e sali in prima posizione: è quella che vedi qui sotto.',
        },
        example: scale('Do maggiore', 60, '1 2 3 4 5 6 7'),
      },
      {
        title: 'Un’altra tonalità: Sol maggiore',
        text: 'Ripeti la stessa cosa partendo da Sol. Cambia una sola nota: il Fa diventa Fa♯. Se la scala non “suona” come la prima, controlla proprio quella nota.',
        tips: { all: 'Ti serve lo schema tono – tono – semitono – tono – tono – tono – semitono: è lo stesso per ogni tonalità.' },
        example: scale('Sol maggiore', 67, '1 2 3 4 5 6 7'),
      },
      {
        title: 'Maggiore e minore a confronto',
        text: 'Suona Do maggiore e subito dopo La minore naturale: sono le stesse note, ma cambia il punto di partenza. Senti come la seconda suona più scura.',
        example: scale('La minore naturale', 57, '1 2 ♭3 4 5 ♭6 ♭7'),
      },
    ],
    phrase: {
      title: 'Una melodia che conosci già',
      text: 'Fra Martino è fatta solo con le prime cinque note della scala di Do maggiore. Suonala a orecchio, partendo dal Do: è il modo più rapido per sentire i gradi della scala.',
      example: melody('Fra Martino', 60, [60, 62, 64, 60, 60, 62, 64, 60, 64, 65, 67, 64, 65, 67]),
    },
    how: [
      'Suona lentamente, con un ritmo regolare: la velocità viene dopo.',
      'Dì i nomi delle note a voce mentre suoni: aiuta a legare suono e nome.',
      'Ripeti la scala tre volte di fila senza fermarti, salendo e scendendo.',
      'Poi parti da una nota diversa e usa lo schema tono – semitono per trovare le altre.',
      'Cinque minuti ogni giorno funzionano meglio di un’ora una volta a settimana.',
    ],
    mistakes: [
      'Sbagliare i semitoni: tra Mi e Fa e tra Si e Do non c’è un tono ma un semitono.',
      'Suonare troppo in fretta prima di conoscere la scala: si impara l’errore.',
      'Confondere maggiore e minore: nel minore la terza è abbassata di un semitono.',
      'Dimenticare le alterazioni: in Sol maggiore il Fa è sempre Fa♯.',
    ],
    goals: [
      'Suono la scala di Do maggiore su e giù, senza errori, dicendo i nomi delle note.',
      'Suono la scala di Sol maggiore con il Fa♯.',
      'Riconosco a orecchio se una scala è maggiore o minore.',
    ],
  },
}


// Progressione: ogni accordo = [grado, sigla, altezze]
const prog = (label, list) => pr(label, list)

// Accordi in posizione stretta intorno al Do centrale
const V = {
  C: [60, 64, 67], Dm: [62, 65, 69], Em: [64, 67, 71], F: [60, 65, 69], G: [62, 67, 71], Am: [60, 64, 69], Bdim: [59, 62, 65],
  G7: [59, 62, 65, 67], Dm7: [60, 62, 65, 69], CM7: [60, 64, 67, 71], Cm: [60, 63, 67], Fm: [60, 65, 68], Gm: [62, 67, 70],
}

export const PRACTICE_MORE = {
  2: {
    intro: 'Gli accordi si imparano con le mani: costruiscili sempre dalla fondamentale, contando le terze, finché non li trovi senza pensare.',
    play: [
      {
        title: 'Le quattro triadi su Do',
        text: 'Suona in sequenza C, Cm, C° e C+ partendo sempre dal Do. Ascolta cosa cambia: la terza (maggiore o minore) e la quinta (giusta, diminuita, eccedente).',
        tips: { keyboard: 'Parti dal Do centrale: i tasti neri ti dicono subito dove abbassare terza e quinta.', guitar: 'Suona le note una alla volta (arpeggio) e poi insieme, su tre corde vicine.', bass: 'Suona le tre note una dopo l’altra: fondamentale, terza, quinta.' },
        example: ch('C', 60, '1 3 5'),
      },
      {
        title: 'Dalla triade alla quadriade',
        text: 'Aggiungi la settima a ogni triade: CΔ, C7, Cm7 e Cø7. Suonali di seguito e senti come la settima cambia il carattere dell’accordo.',
        example: ch('C7', 60, '1 3 5 ♭7'),
      },
      {
        title: 'Costruiscili su altre note',
        text: 'Scegli una fondamentale a caso (Sol, Re♭, La) e costruisci sopra la triade maggiore e quella minore. Controlla ogni nota: terza, quinta, e il nome corretto con le alterazioni.',
        example: ch('Sol minore settima', 55, '1 ♭3 5 ♭7'),
      },
    ],
    phrase: {
      title: 'L’arpeggio di Do',
      text: 'Suona una nota alla volta, salendo e scendendo, le note della triade di Do: è il modo più semplice per “sentire” un accordo prima di suonarlo intero.',
      example: melody('Arpeggio di Do', 60, [60, 64, 67, 72, 67, 64, 60]),
    },
    how: [
      'Costruisci l’accordo dicendo a voce i nomi: “Do – Mi – Sol”.',
      'Suona prima le note una a una, poi tutte insieme.',
      'Cambia solo una nota alla volta (la terza, poi la quinta) per sentire la differenza di qualità.',
      'Fai un giro: C, Cm, C°, C+, poi ricomincia da un’altra fondamentale.',
    ],
    mistakes: [
      'Confondere la settima maggiore (CΔ) con la settima di dominante (C7): una è mezzo tono sotto l’ottava, l’altra un tono.',
      'Dimenticare che il diminuito ha la quinta abbassata e l’eccedente la quinta alzata.',
      'Scrivere male i nomi: la terza di Mi♭ è Sol, non Fa♯♯.',
    ],
    goals: [
      'Costruisco le quattro triadi su qualsiasi fondamentale.',
      'Costruisco CΔ, C7, Cm7 e Cø7 senza esitare.',
      'Riconosco a orecchio un accordo maggiore da uno minore.',
    ],
  },
  3: {
    intro: 'Armonizzare vuol dire costruire un accordo su ogni grado della scala. Fatto una volta, resta valido per qualunque tonalità.',
    play: [
      {
        title: 'I sette accordi di Do maggiore',
        text: 'Suona C, Dm, Em, F, G, Am, B° uno dopo l’altro. Dì a voce il grado (I, ii, iii, IV, V, vi, vii°) e senti che ciascuno ha una funzione diversa.',
        example: prog('Armonizzazione di Do a triadi', [['I', 'C', V.C], ['ii', 'Dm', V.Dm], ['iii', 'Em', V.Em], ['IV', 'F', V.F], ['V', 'G', V.G], ['vi', 'Am', V.Am], ['vii°', 'B°', V.Bdim]]),
      },
      {
        title: 'La stessa scala a quattro voci',
        text: 'Aggiungi la settima a ogni accordo: Imaj7, iim7, iiim7, IVmaj7, V7, vim7, viim7♭5. In Do sono CΔ, Dm7, Em7, FΔ, G7, Am7, Bø7.',
        tips: { all: 'Il V7 è l’unico accordo di dominante: lo riconosci subito perché è l’unico con la settima minore sopra la terza maggiore.' },
      },
      {
        title: 'Trasporta in un’altra tonalità',
        text: 'Ripeti la sequenza in Sol maggiore e in Fa maggiore. Cambiano i nomi, non i gradi: se sai i gradi, sai tutte le tonalità.',
      },
    ],
    phrase: {
      title: 'Un ascolto guidato',
      text: 'Suona I – vi – ii – V, il giro più usato: lo ritroverai in canzoni di ogni epoca. Impara a riconoscerlo a orecchio.',
      example: prog('I – vi – ii – V in Do', [['I', 'C', V.C], ['vi', 'Am', V.Am], ['ii', 'Dm', V.Dm], ['V', 'G', V.G]]),
    },
    how: [
      'Dì il grado a voce mentre suoni ogni accordo.',
      'Scrivi su un foglio i sette accordi della tonalità e prova a ricordarli a memoria.',
      'Poi scegli una tonalità a caso e armonizzala senza aiuti.',
    ],
    mistakes: [
      'Mettere il simbolo sbagliato sul vii° (è diminuito, non minore).',
      'Dimenticare le alterazioni in tonalità come Re maggiore.',
      'Confondere ii e vi: hanno funzioni molto diverse anche se entrambi sono minori.',
    ],
    goals: [
      'Armonizzo la scala maggiore a triadi in qualsiasi tonalità.',
      'Armonizzo la scala a quattro voci in Do, Sol e Fa.',
      'Riconosco le tre funzioni: tonica, sottodominante, dominante.',
    ],
  },
  4: {
    intro: 'Cadenze e progressioni sono i mattoni della musica: imparale suonandole in tutte le tonalità.',
    play: [
      {
        title: 'La cadenza perfetta e quella plagale',
        text: 'Suona V – I (G → C) e poi IV – I (F → C). Senti la differenza: la prima “conclude”, la seconda suona come un “amen”.',
        example: prog('V – I e IV – I', [['V', 'G', V.G], ['I', 'C', V.C], ['IV', 'F', V.F], ['I', 'C', V.C]]),
      },
      {
        title: 'Il II–V–I',
        text: 'È la progressione più importante del jazz: Dm7 – G7 – CΔ. Suonala lentamente, ascoltando come le note si muovono poco da un accordo all’altro.',
        example: prog('iim7 – V7 – Imaj7 in Do', [['iim7', 'Dm7', V.Dm7], ['V7', 'G7', V.G7], ['Imaj7', 'CΔ', V.CM7]]),
      },
      {
        title: 'Il ciclo delle quinte',
        text: 'Suona CΔ – FΔ – Bø7 – E7 – Am7 – Dm7 – G7 – CΔ: ogni accordo scende di quinta. È la spina dorsale di tanti standard.',
      },
    ],
    phrase: {
      title: 'La progressione da riconoscere',
      text: 'I – IV – V – I è la più semplice. Suonala e poi cambia solo l’ordine: I – V – vi – IV. Riconoscerle subito ti dà un vantaggio enorme quando ascolti una canzone.',
      example: prog('I – IV – V – I in Do', [['I', 'C', V.C], ['IV', 'F', V.F], ['V', 'G', V.G], ['I', 'C', V.C]]),
    },
    how: [
      'Suona ogni progressione in tre tonalità diverse (Do, Sol, Fa).',
      'Canta la fondamentale di ogni accordo mentre suoni.',
      'Ascolta una canzone e prova a trovare la cadenza finale.',
    ],
    mistakes: [
      'Suonare il II–V–I con gli accordi tutti in posizione fondamentale: le note saltano troppo. Cerca la voce più vicina.',
      'Confondere la cadenza plagale con quella perfetta: nella plagale il basso scende di quarta, nella perfetta scende di quinta.',
      'Dimenticare la settima di dominante nel V7.',
    ],
    goals: [
      'Suono V – I, IV – I e il II–V–I in Do, Sol e Fa.',
      'Riconosco a orecchio una cadenza che conclude.',
      'Trovo il ciclo delle quinte partendo da qualsiasi accordo.',
    ],
  },
  5: {
    intro: 'Il rivolto cambia la nota più bassa, non l’accordo. Imparare a sentirlo ti aiuta a costruire linee di basso migliori.',
    play: [
      {
        title: 'Tre posizioni di C',
        text: 'Suona C in posizione fondamentale, poi C/E e C/G. Sono sempre le stesse note: cambia solo quella più bassa.',
        example: prog('C, C/E, C/G', [['I', 'C', [48, 55, 60, 64]], ['I6', 'C/E', [52, 55, 60, 67]], ['I6/4', 'C/G', [55, 60, 64, 72]]]),
      },
      {
        title: 'Una linea di basso che sale',
        text: 'Suona C – C/E – F: il basso sale per gradi congiunti (Do – Mi – Fa). I rivolti servono a questo: dare una linea al basso.',
        example: prog('Basso che sale', [['I', 'C', [48, 55, 60, 64]], ['I6', 'C/E', [52, 55, 60, 67]], ['IV', 'F', [53, 57, 60, 65]]]),
      },
      {
        title: 'Leggere il basso numerato',
        text: 'Dato un basso con i numeri 6 o 6/4, costruisci l’accordo sopra. Per esempio Mi con 6: l’accordo è C/E.',
      },
    ],
    phrase: {
      title: 'Il basso che cammina',
      text: 'Suona Do, Si, La, Sol, Fa, Mi, Re, Do: la scala che scende. Sopra puoi mettere un accordo per ogni nota e ascoltare i rivolti nascere da soli.',
      example: melody('Scala discendente', 60, [72, 71, 69, 67, 65, 64, 62, 60]),
    },
    how: [
      'Suona gli accordi con la mano destra e il basso con la sinistra (o con il basso, se è il tuo strumento).',
      'Cambia solo la nota più bassa e ascolta come cambia il carattere.',
      'Prova a cantare la linea del basso di una canzone che conosci.',
    ],
    mistakes: [
      'Credere che il rivolto sia un altro accordo: è lo stesso, con un altro basso.',
      'Dimenticare che il secondo rivolto (6/4) è instabile: di solito precede una dominante.',
      'Leggere il 6 come una sesta sopra la tonica invece che sopra il basso.',
    ],
    goals: [
      'Suono C, C/E e C/G e li riconosco a orecchio.',
      'Costruisco una linea di basso che sale per gradi con i rivolti.',
      'Leggo e realizzo un semplice basso numerato.',
    ],
  },
  6: {
    intro: 'Una dominante secondaria è una dominante “presa in prestito” per un altro accordo della tonalità. All’orecchio suona come una piccola deviazione.',
    play: [
      {
        title: 'V7/ii: A7 verso Dm',
        text: 'Suona C – A7 – Dm – G7 – C. L’A7 non fa parte di Do maggiore (ha il Do♯): senti come spinge verso Dm.',
        example: prog('V7/ii in Do', [['I', 'C', V.C], ['V7/ii', 'A7', [57, 61, 64, 67]], ['ii', 'Dm', V.Dm], ['V7', 'G7', V.G7], ['I', 'C', V.C]]),
      },
      {
        title: 'Cerca la dominante giusta',
        text: 'Per ogni accordo della scala di Do (Dm, Em, F, G, Am) trova la sua dominante: A7, B7, C7, D7, E7. Suonali di seguito, ognuno seguito dal suo accordo di arrivo.',
      },
      {
        title: 'Una catena di dominanti',
        text: 'Suona E7 – A7 – D7 – G7 – C: ogni dominante risolve sulla successiva. È un trucco che si trova in tantissimi standard.',
      },
    ],
    phrase: {
      title: 'Riconoscere la nota estranea',
      text: 'Ascolta il giro C – A7 – Dm – G7: la nota che “stona” (Do♯) è proprio la terza della dominante secondaria. Imparare a sentirla ti fa riconoscerle subito.',
      example: prog('C – A7 – Dm – G7', [['I', 'C', V.C], ['V7/ii', 'A7', [57, 61, 64, 67]], ['ii', 'Dm', V.Dm], ['V7', 'G7', V.G7]]),
    },
    how: [
      'Suona prima l’accordo di arrivo e subito dopo la sua dominante, per sentire la tensione.',
      'Scrivi le dominanti secondarie di una tonalità in tabella: grado e sigla.',
      'Cerca A7 nei brani che conosci: è la più comune.',
    ],
    mistakes: [
      'Mettere la dominante secondaria sul grado sbagliato (deve stare a una quinta sopra l’accordo di arrivo).',
      'Dimenticare che l’accordo di arrivo può essere anche minore.',
      'Usare V7/vii°: non funziona, perché il vii° è diminuito.',
    ],
    goals: [
      'Trovo la dominante secondaria di ogni grado della tonalità.',
      'Suono V7/ii, V7/V e V7/vi in Do.',
      'Riconosco a orecchio una deviazione verso un accordo minore.',
    ],
  },
  7: {
    intro: 'Modulare vuol dire cambiare tonalità senza che l’orecchio si perda. Si sente quando una nota alterata o un accordo nuovo ci fa “atterrare” altrove.',
    play: [
      {
        title: 'Dal Do al Sol con un accordo pivot',
        text: 'Suona C – F – Am – D7 – G. L’Am è il pivot: è vim in Do e iim in Sol. Dopo di lui la musica cambia direzione.',
        example: prog('Do → Sol', [['I', 'C', V.C], ['IV', 'F', V.F], ['vi / ii', 'Am', V.Am], ['V7', 'D7', [60, 62, 66, 69]], ['I', 'G', V.G]]),
      },
      {
        title: 'La modulazione per dominante',
        text: 'Passa da Do a Re minore introducendo A7: senti come la nuova dominante annuncia il cambio.',
      },
      {
        title: 'Ritorna alla tonalità d’origine',
        text: 'Torna da Sol a Do con lo stesso pivot (Am), al contrario. Così senti che il percorso è reversibile.',
      },
    ],
    phrase: {
      title: 'Il momento del cambio',
      text: 'Ascolta il giro C – F – Am – D7 – G e cerca il punto in cui la musica cambia: è l’accordo con la nota nuova (Fa♯ nel D7). Imparare a sentire quel momento è metà dell’esercizio.',
      example: prog('Do → Sol', [['I', 'C', V.C], ['IV', 'F', V.F], ['vi / ii', 'Am', V.Am], ['V7', 'D7', [60, 62, 66, 69]], ['I', 'G', V.G]]),
    },
    how: [
      'Parti sempre da due tonalità vicine (con una alterazione di differenza).',
      'Cerca l’accordo comune a entrambe: è il pivot.',
      'Suona lentamente e canta la tonica nuova appena la senti.',
    ],
    mistakes: [
      'Modulare troppo in fretta: la nuova tonalità ha bisogno di una cadenza per essere confermata.',
      'Scegliere un pivot che non c’è davvero in entrambe le tonalità.',
      'Dimenticare la nuova armatura quando scrivi sul pentagramma.',
    ],
    goals: [
      'Trovo i pivot tra due tonalità vicine.',
      'Suono una modulazione da Do a Sol e ritorno.',
      'Riconosco a orecchio il momento in cui la tonalità cambia.',
    ],
  },
  8: {
    intro: 'I modi sono la stessa scala vista da un’altra nota. Per imparare a riconoscerli bisogna suonarli sempre dalla stessa tonica e ascoltare quanto cambia il colore.',
    play: [
      {
        title: 'Sette modi su Do',
        text: 'Suona tutti i modi partendo dal Do: ionico, dorico, frigio, lidio, misolidio, eolio e locrio. Dì a voce quale nota cambia rispetto al precedente.',
        example: scale('Do dorico', 60, '1 2 ♭3 4 5 6 ♭7'),
      },
      {
        title: 'Il colore di ogni modo',
        text: 'Ogni modo ha una nota caratteristica: ♭6 nell’eolio, ♮6 nel dorico, ♭2 nel frigio, ♯4 nel lidio, ♭7 nel misolidio. Suona quella nota in mezzo alla scala e senti dove cade.',
        example: scale('Do lidio', 60, '1 2 3 ♯4 5 6 7'),
      },
      {
        title: 'Interscambio modale',
        text: 'Suona C – F – Fm – C: il Fm viene dal modo minore, preso in prestito. Senti quel passaggio dolce-amaro.',
        example: prog('Interscambio: iv', [['I', 'C', V.C], ['IV', 'F', V.F], ['iv', 'Fm', V.Fm], ['I', 'C', V.C]]),
      },
    ],
    phrase: {
      title: 'Il dorico in una frase',
      text: 'Suona Re – Mi – Fa – Sol – La – Si – Do – Re: è Re dorico, tutti i tasti bianchi. Sentirai subito il suo carattere un po’ “malinconico ma luminoso”.',
      example: scale('Re dorico', 62, '1 2 ♭3 4 5 6 ♭7'),
    },
    how: [
      'Suona un modo al giorno partendo sempre dalla stessa nota.',
      'Suona un accordo fisso (per esempio Cm7) e suona sopra il modo corrispondente.',
      'Canta la nota caratteristica prima di suonarla.',
    ],
    mistakes: [
      'Confondere il modo con la tonalità relativa: Re dorico non è Do maggiore, anche se usa le stesse note.',
      'Dimenticare che l’interscambio modale usa accordi di un altro modo con la stessa tonica.',
      'Suonare i modi senza un accordo o una nota di riferimento: perdi il colore.',
    ],
    goals: [
      'Suono tutti e sette i modi partendo da Do.',
      'Riconosco la nota caratteristica di ogni modo.',
      'Suono un interscambio modale (iv in tonalità maggiore).',
    ],
  },
  9: {
    intro: 'I modi delle minori sono pochi ma colorano tanto. Suonali sopra un accordo, non da soli: così capisci a cosa servono.',
    play: [
      {
        title: 'Frigio dominante su G7♭9',
        text: 'Suona la scala di Sol frigio dominante e poi l’accordo G7♭9. Le note ♭2 e ♭6 danno quel sapore spagnoleggiante, tipico del flamenco.',
        tips: { all: 'Parti dalla dominante: dopo G7♭9 la risoluzione naturale è su Cm.' },
        example: scale('Sol frigio dominante', 55, '1 ♭2 3 4 5 ♭6 ♭7'),
      },
      {
        title: 'Lidio dominante su F7♯11',
        text: 'Suona Fa lidio dominante e subito dopo F7♯11. È il suono delle dominanti “cantate” del jazz: il ♯4 apre l’accordo e lo rende luminoso.',
        example: scale('Fa lidio dominante', 65, '1 2 3 ♯4 5 6 ♭7'),
      },
      {
        title: 'Alterata su una dominante',
        text: 'Su un accordo 7alt (per esempio B7alt) suona la minore melodica un semitono sopra la fondamentale. Con un po’ di pratica diventa un riflesso.',
        example: scale('Si alterata', 59, '1 ♭2 ♯2 3 ♭5 ♭6 ♭7'),
      },
    ],
    phrase: {
      title: 'Cerca il colore',
      text: 'Ascolta un accordo di dominante e prova a sentire se ha ♭9 (frigio dominante), ♯11 (lidio dominante) o ♭9 ♯9 ♯11 ♭13 (alterata). È un’abilità che si costruisce con il tempo.',
    },
    how: [
      'Suona un solo modo alla volta per due minuti sopra un accordo tenuto.',
      'Dì a voce la nota che dà il colore (♭2 nel frigio dominante, ♯4 nel lidio dominante).',
      'Collega ogni modo all’accordo corrispondente: tabella a memoria.',
    ],
    mistakes: [
      'Suonare l’alterata su un accordo di dominante normale: ha troppe tensioni, serve il 7alt.',
      'Confondere frigio dominante e frigio: il primo ha la terza maggiore.',
      'Non risolvere: i modi alterati chiedono una risoluzione sull’accordo di arrivo.',
    ],
    goals: [
      'Suono frigio dominante, lidio dominante e alterata dalla stessa fondamentale.',
      'Collego ogni modo al suo accordo.',
      'Riconosco a orecchio un’alterata rispetto a un lidio dominante.',
    ],
  },
  10: {
    intro: 'Le scale sono il vocabolario con cui costruisci frasi. Impara prima le più usate e suonale su un accordo, non nel vuoto.',
    play: [
      {
        title: 'La pentatonica minore',
        text: 'Suona La pentatonica minore, su e giù. Sono solo cinque note: difficile sbagliare, e funziona su quasi tutto il blues e il rock.',
        tips: { guitar: 'Parti dal La sulla sesta corda, quinto tasto: è la posizione che usano tutti i chitarristi.', bass: 'Parti dal La sulla quarta corda, quinto tasto: è anche una linea di basso classica.' },
        example: scale('La pentatonica minore', 57, '1 ♭3 4 5 ♭7'),
      },
      {
        title: 'Aggiungi la nota blue',
        text: 'Inserisci il ♭5 e ottieni la scala blues. Suona un giro di blues in La e usa la scala sopra: senti come la nota blue crea tensione.',
        example: scale('La blues', 57, '1 ♭3 4 ♭5 5 ♭7'),
      },
      {
        title: 'Le scale simmetriche',
        text: 'Suona la scala per toni interi e quella diminuita. Sono quelle “misteriose”: non c’è una tonica chiara, perché le note si ripetono a intervalli regolari.',
        example: scale('Do per toni interi', 60, '1 2 3 ♯4 ♯5 ♭7'),
      },
    ],
    phrase: {
      title: 'Un riff in pentatonica',
      text: 'Suona La – Do – Re – Mi – Sol e poi torna indietro. Cambia l’ordine, aggiungi pause, ripeti: così nasce un riff.',
      example: melody('Riff in La minore', 57, [57, 60, 62, 64, 67, 64, 62, 60]),
    },
    how: [
      'Suona la scala in tre modi: su e giù, a salti di terza, a gruppi di quattro note.',
      'Usa un accordo di base come riferimento mentre suoni.',
      'Poi cambia il ritmo: stessa scala, frasi diverse.',
    ],
    mistakes: [
      'Suonare la scala in modo meccanico, senza una frase: sembrano esercizi, non musica.',
      'Fermarsi sulla nota blue: è una nota di passaggio, non di arrivo.',
      'Credere che la scala per toni interi vada bene ovunque: funziona su dominanti con ♯5.',
    ],
    goals: [
      'Suono la pentatonica minore in tre tonalità.',
      'Suono la scala blues e uso la nota blue come passaggio.',
      'Riconosco a orecchio una scala simmetrica.',
    ],
  },
  11: {
    intro: 'Gli accordi cromatici “colorano” una progressione con un suono inatteso. Il trucco è sentirli prima di analizzarli.',
    play: [
      {
        title: 'La sesta napoletana',
        text: 'Suona Fm – D♭/F – G7 – Cm. L’accordo di D♭ con il basso su Fa crea un momento drammatico prima della dominante.',
        example: prog('Sesta napoletana in Do minore', [['iv', 'Fm', [56, 60, 65]], ['♭II6', 'D♭/F', [53, 56, 61, 68]], ['V7', 'G7', [55, 59, 62, 65]], ['i', 'Cm', V.Cm]]),
      },
      {
        title: 'La sesta aumentata',
        text: 'Suona Fm – A♭7 – G, con l’A♭7 inteso come sesta tedesca (La♭ Do Mi♭ Fa♯): il La♭ scende al Sol e il Fa♯ sale al Sol. Senti come il Sol sembra l’unica meta possibile.',
      },
      {
        title: 'Il diminuito di passaggio',
        text: 'Suona C – C♯° – Dm: l’accordo diminuito collega due gradi vicini e fa salire il basso in modo fluido.',
      },
    ],
    phrase: {
      title: 'Sentire il cromatismo',
      text: 'Suona Do – Do♯ – Re – Re♯ – Mi: una linea cromatica. Immagina che ogni nota sia il basso di un accordo diverso e prova a costruirci sopra.',
      example: melody('Linea cromatica', 60, [60, 61, 62, 63, 64]),
    },
    how: [
      'Suona la progressione normale e poi quella con l’accordo cromatico: ascolta la differenza.',
      'Cerca nelle canzoni che conosci un momento che ti sorprende: probabilmente è un accordo cromatico.',
      'Controlla sempre il basso: nei cromatismi sale o scende di semitono.',
    ],
    mistakes: [
      'Scegliere il nome sbagliato per le note alterate: la sesta napoletana è ♭II, non ♯I.',
      'Usare la sesta aumentata come se fosse un normale accordo di dominante.',
      'Abusarne: il cromatismo funziona perché è raro.',
    ],
    goals: [
      'Suono una sesta napoletana in Do minore.',
      'Suono un diminuito di passaggio tra I e iim.',
      'Riconosco a orecchio un accordo cromatico in una progressione.',
    ],
  },
  12: {
    intro: 'Le estensioni sono le note “sopra la settima”: 9, 11 e 13. Danno colore agli accordi, ma vanno scelte con orecchio.',
    play: [
      {
        title: 'Dalla settima alla nona',
        text: 'Suona Cm7 e poi Cm9: aggiungi il Re sopra l’accordo e ascolta come si allarga. Poi fai lo stesso con C7 → C9.',
        example: ch('C9', 60, '1 3 5 ♭7 9'),
      },
      {
        title: 'Il II–V–I con le estensioni',
        text: 'Suona Dm9 – G13 – CΔ9 con i voicing a quattro note senza fondamentale: le voci si muovono pochissimo e il risultato è molto elegante.',
        example: prog('iim9 – V13 – Imaj9', [['iim9', 'Dm9', [60, 64, 65, 69]], ['V13', 'G13', [59, 64, 65, 69]], ['Imaj9', 'CΔ9', [59, 62, 64, 67]]]),
      },
      {
        title: 'Dominante alterata',
        text: 'Cambia G7 in G7alt: le note ♭9, ♯9, ♯11 e ♭13 rendono la tensione più forte. Poi risolvi su CΔ e senti quanto è “arrabbiato” l’accordo prima.',
      },
    ],
    phrase: {
      title: 'Voicing da orecchio',
      text: 'Suona un Dm9 con la mano destra e il Re con la sinistra, poi togli il Re: l’accordo suona uguale. Un voicing senza fondamentale suona completo perché il basso (o la band) lo sostiene.',
      example: ch('Dm9', 62, '1 ♭3 5 ♭7 9'),
    },
    how: [
      'Parti sempre dall’accordo base e aggiungi una estensione alla volta.',
      'Controlla che l’estensione non “scontri” con l’accordo: la 11 sulla maggiore è spesso evitata.',
      'Suona due versioni dello stesso accordo, con e senza estensioni, e scegli quella che suona meglio nel contesto.',
    ],
    mistakes: [
      'Mettere la 11 su un accordo maggiore (urta con la terza).',
      'Suonare tutte le estensioni insieme: l’accordo diventa un grappolo.',
      'Dimenticare la settima: senza, l’estensione non ha più senso.',
    ],
    goals: [
      'Costruisco accordi di nona su maggiori, minori e dominanti.',
      'Suono Dm9 – G13 – CΔ9 con voce che si muove poco.',
      'Riconosco a orecchio un accordo alterato rispetto a uno normale.',
    ],
  },
  13: {
    intro: 'Una sostituzione cambia un accordo senza cambiare la funzione. La regola è: stesso scopo, colore diverso.',
    play: [
      {
        title: 'La sostituzione di tritono',
        text: 'Al posto di G7 suona D♭7: hanno le stesse note guida (Si e Fa). Prova Dm7 – D♭7 – CΔ: il basso scende per semitoni.',
        example: prog('iim7 – ♭II7 – Imaj7', [['iim7', 'Dm7', [62, 65, 69, 72]], ['♭II7', 'D♭7', [61, 65, 68, 71]], ['Imaj7', 'CΔ', V.CM7]]),
      },
      {
        title: 'Le sostituzioni diatoniche',
        text: 'Al posto di CΔ puoi suonare Am7 (stessa funzione di tonica) o Em7. Prova C – F – G – C con Am7 al posto del primo C.',
      },
      {
        title: 'Normale e con il tritono',
        text: 'Suona in una frase prima la versione normale (Dm7 – G7 – CΔ) e subito dopo quella con tritono (Dm7 – D♭7 – CΔ). Ascolta cosa cambia nel basso.',
      },
    ],
    phrase: {
      title: 'Il basso cromatico',
      text: 'Suona Re – Re♭ – Do: è il basso della sostituzione di tritono. Sentirai che “scivola” invece di saltare.',
      example: melody('Basso con tritono', 60, [62, 61, 60]),
    },
    how: [
      'Suona la progressione originale, poi quella con sostituzione, e confronta.',
      'Scrivi il basso: se la sostituzione crea una linea cromatica, funziona.',
      'Controlla sempre che le note guida (3 e 7) siano le stesse.',
    ],
    mistakes: [
      'Sostituire un accordo senza controllare la funzione: Am7 può fare da tonica, non da dominante.',
      'Dimenticare che il tritono cambia anche il nome dell’accordo: G7 diventa D♭7, non C♯7 (anche se suonano uguale).',
      'Usare troppe sostituzioni in una stessa battuta: la progressione perde riferimenti.',
    ],
    goals: [
      'Trovo la sostituzione di tritono di ogni dominante.',
      'Suono Dm7 – D♭7 – CΔ in tre tonalità.',
      'Scelgo la sostituzione diatonica adatta per un accordo di tonica.',
    ],
  },
  14: {
    intro: 'L’armonia jazz avanzata chiede orecchio, più che regole. Qui si impara a sentire dove una progressione può “deviare”.',
    play: [
      {
        title: 'Il blues jazz',
        text: 'Suona un blues in Fa e nelle battute 9–10 usa il II–V Gm7 – C7 al posto del solo C7, poi torna su F7. Sembra una piccola cosa, ma cambia il tono di tutto il giro.',
      },
      {
        title: 'Il backdoor',
        text: 'Suona Fm7 – B♭7 – CΔ: la dominante arriva dal “lato di dietro”, dal ♭VII7. Il suono è più morbido di un normale V7.',
        example: prog('Backdoor in Do', [['ivm7', 'Fm7', [60, 63, 65, 68]], ['♭VII7', 'B♭7', [58, 62, 65, 68]], ['Imaj7', 'CΔ', V.CM7]]),
      },
      {
        title: 'Confronta',
        text: 'Suona G7 → CΔ e poi B♭7 → CΔ: entrambi risolvono sulla tonica, ma il percorso è diverso. Un orecchio allenato sente subito quale dei due ha più tensione.',
      },
    ],
    phrase: {
      title: 'Il blues a mente',
      text: 'Impara il giro di blues a 12 battute con la sua versione jazz: la forma è sempre la stessa, cambiano solo gli accordi di passaggio.',
    },
    how: [
      'Suona il giro prima nella versione base, poi con una variante alla volta.',
      'Canta la linea del basso mentre suoni.',
      'Ascolta due versioni dello stesso brano, una semplice e una jazz, e annota le differenze.',
    ],
    mistakes: [
      'Aggiungere troppi accordi di passaggio: il blues perde il suo carattere.',
      'Dimenticare dove cade il ritorno alla tonica nelle ultime battute.',
      'Confondere il backdoor con il V7 normale: il basso va su di tono, non giù di quinta.',
    ],
    goals: [
      'Suono un blues jazz in due tonalità.',
      'Riconosco un backdoor a orecchio.',
      'Scrivo il giro con i gradi (I7, IV7, V7) senza guardare la sigla.',
    ],
  },
  15: {
    intro: 'Le forme sono lo scheletro dei brani: conoscerle ti permette di orientarti in qualsiasi standard.',
    play: [
      {
        title: 'Il blues in 12 battute',
        text: 'Suona il blues di Do: quattro battute su C7, due su F7, due su C7, poi G7, F7, C7, G7. Segui il conteggio ad alta voce.',
        example: prog('Blues in Do', [['I7', 'C7', [60, 64, 67, 70]], ['I7', 'C7', [60, 64, 67, 70]], ['I7', 'C7', [60, 64, 67, 70]], ['I7', 'C7', [60, 64, 67, 70]], ['IV7', 'F7', [60, 63, 65, 69]], ['IV7', 'F7', [60, 63, 65, 69]], ['I7', 'C7', [60, 64, 67, 70]], ['I7', 'C7', [60, 64, 67, 70]], ['V7', 'G7', V.G7], ['IV7', 'F7', [60, 63, 65, 69]], ['I7', 'C7', [60, 64, 67, 70]], ['V7', 'G7', V.G7]]),
      },
      {
        title: 'Il giro di Anatole',
        text: 'La forma AABA di 32 battute: due volte lo stesso tema, il ponte, e poi ancora il tema. Impara a distinguere le sezioni a orecchio.',
      },
      {
        title: 'Il giro delle quinte',
        text: 'Suona un brano la cui armonia scende di quinta ad ogni battuta: ascolta come la musica sembra “cadere” in avanti.',
      },
    ],
    phrase: {
      title: 'Cantare la forma',
      text: 'Canta una melodia che conosci e conta le battute: prova a capire se è un AABA, un blues o un 16 battute. Riconoscere la forma è la base per improvvisare.',
    },
    how: [
      'Suona sempre sulla forma, contando le battute ad alta voce.',
      'Segna sul foglio dove inizia ogni sezione.',
      'Poi suona la forma senza guardare: se ti perdi, riparti dall’inizio.',
    ],
    mistakes: [
      'Perdere il conto delle battute: è l’errore più comune.',
      'Credere che il blues abbia un solo modo di essere suonato: ci sono moltissime varianti.',
      'Saltare il ponte: è la parte che tiene vivo il brano.',
    ],
    goals: [
      'Suono un blues di 12 battute senza guardare.',
      'Riconosco la forma AABA a orecchio.',
      'Trovo le sezioni di uno standard che non conosco.',
    ],
  },
  16: {
    intro: 'Dopo la pratica comune gli accordi non seguono più solo le terze. Il segreto è ascoltare le strutture nuove con orecchio aperto.',
    play: [
      {
        title: 'Accordi per quarte',
        text: 'Costruisci un accordo impilando quarte giuste: Re – Sol – Do. Sembra “sospeso”, perché non ha la terza che dice maggiore o minore.',
        tips: { all: 'Funziona molto bene sopra un basso fermo, perché lascia l’armonia aperta.' },
        example: sc('Accordo per quarte su Re', 62, '1 4 ♭7', { chord: true }),
      },
      {
        title: 'Muovi la struttura',
        text: 'Sposta lo stesso accordo di un tono, poi di un altro: la forma resta uguale ma la tonalità cambia. È il gioco dei “planing”, tipico di Debussy.',
      },
      {
        title: 'Cluster e note aggiunte',
        text: 'Suona C con la nona aggiunta (Do – Mi – Sol – Re), senza la settima: l’accordo suona più “moderno” e aperto.',
      },
    ],
    phrase: {
      title: 'Ascoltare le quarte',
      text: 'Suona Re – Sol – Do insieme e poi uno alla volta: sentirai che l’accordo non cerca una risoluzione. Cerca lo stesso suono in qualche brano modale.',
      example: sc('Quarte su Re', 62, '1 4 ♭7', { chord: true }),
    },
    how: [
      'Suona accordi per quarte su ogni nota della scala maggiore.',
      'Alterna un accordo per quarte con uno per terze: senti come cambia il carattere.',
      'Prova a improvvisare sopra una struttura fissa e senti dove la melodia “vuole” andare.',
    ],
    mistakes: [
      'Aspettare una risoluzione: l’armonia per quarte non la chiede.',
      'Confondere un accordo per quarte con un sus4: il sus4 ha comunque la quinta.',
      'Usare le quarte su una dominante senza il contesto giusto.',
    ],
    goals: [
      'Costruisco accordi per quarte su ogni grado di una scala.',
      'Riconosco a orecchio un accordo per quarte.',
      'Uso un accordo per quarte per aprire un brano.',
    ],
  },
  17: {
    intro: 'L’armonia negativa è uno specchio: ogni accordo ha il suo opposto. Capirlo apre un modo nuovo di sentire le progressioni.',
    play: [
      {
        title: 'Lo specchio di I – IV – V7 – I',
        text: 'In Do l’asse sta fra Mi♭ e Mi: Do diventa Sol, Re diventa Fa, Mi diventa Mi♭ e così via. Suona C – F – G7 – C e poi la sua versione negativa: Cm – Gm – Fm6 – Cm.',
        example: prog('I – IV – V7 – I e il suo negativo', [['I', 'C', V.C], ['IV', 'F', V.F], ['V7', 'G7', V.G7], ['I', 'C', V.C], ['Cm', 'Cm', V.Cm], ['Gm', 'Gm', V.Gm], ['Fm6', 'Fm6', [53, 56, 60, 62]], ['Cm', 'Cm', V.Cm]]),
      },
      {
        title: 'Specchia una nota',
        text: 'Prendi una melodia semplice (Do – Re – Mi) e specchiala intorno all’asse: diventa Sol – Fa – Mi♭. Cantala: è come se la melodia andasse al contrario.',
        example: melody('Do – Re – Mi e il suo specchio: Sol – Fa – Mi♭', 60, [60, 62, 64, 67, 65, 63]),
      },
      {
        title: 'Applicalo a un brano',
        text: 'Prendi un giro semplice e riscrivilo in negativo, un accordo alla volta. Non tutte le versioni suonano bene: scegli solo quelle che funzionano.',
      },
    ],
    phrase: {
      title: 'Il tuo specchio',
      text: 'Suona una melodia di tre note, poi suona la versione specchiata: è un ottimo esercizio per l’orecchio, perché ti costringe a pensare agli intervalli e non solo alle note.',
    },
    how: [
      'Fissa sempre l’asse (per Do maggiore, tra Mi♭ e Mi).',
      'Specchia le note una a una e poi ricostruisci l’accordo.',
      'Controlla il risultato con l’orecchio: se non suona bene, riprova con un asse diverso.',
    ],
    mistakes: [
      'Leggere la fondamentale dell’accordo specchiato dal posto sbagliato: il negativo di F non è “Re”, ma Sol minore (Re Si♭ Sol): si leggono le note, non la sigla.',
      'Applicare la trasformazione a note e accordi in modo incoerente.',
      'Prenderlo come una regola fissa: è un metodo, non una legge.',
    ],
    goals: [
      'Trovo l’asse di una tonalità e specchio una scala.',
      'Specchio una semplice progressione e la suono.',
      'Riconosco a orecchio quando una progressione è il negativo di un’altra.',
    ],
  },
  18: {
    intro: 'Accompagnare vuol dire servire il brano: meno note, scelte con cura. Qui ti alleni a farlo con voicing semplici e puliti.',
    play: [
      {
        title: 'Il voicing a note guida',
        text: 'Suona Dm7 – G7 – CΔ usando solo terza e settima in alto e la fondamentale in basso. Le due voci si muovono pochissimo e l’armonia suona piena con tre note.',
        tips: { keyboard: 'Mano sinistra: la fondamentale. Mano destra: terza e settima.', guitar: 'Suona le note sulle corde centrali e lascia le altre mute: tre note bastano.', bass: 'Alterna la fondamentale e la quinta, e poi aggiungi la terza come nota di passaggio.' },
        example: prog('Voicing a 3 note', [['iim7', 'Dm7', [50, 65, 72]], ['V7', 'G7', [43, 65, 71]], ['Imaj7', 'CΔ', [48, 64, 71]]]),
      },
      {
        title: 'Vari il ritmo',
        text: 'Suona lo stesso giro prima in minime, poi in semiminime, poi con un ritmo sincopato. Senti che il ruolo dell’accompagnamento è soprattutto ritmico.',
      },
      {
        title: 'Lascia spazio',
        text: 'Suona il giro lasciando una battuta di pausa ogni due. Il silenzio è parte dell’arrangiamento: lascia respirare chi canta.',
      },
    ],
    phrase: {
      title: 'Suona con qualcuno',
      text: 'Accompagna una canzone semplice che qualcuno canta o suona: ascolta e adatta il volume. È l’unico modo di imparare davvero a fare l’accompagnatore.',
    },
    how: [
      'Parti sempre da un voicing semplice e aggiungi note solo se servono.',
      'Registrati mentre suoni e riascolta: capirai subito se ti stai mettendo in mostra o stai servendo il brano.',
      'Cambia strumento di ruolo ogni tanto: se suoni la tastiera, prova a suonare il basso.',
    ],
    mistakes: [
      'Suonare troppe note e coprire il solista.',
      'Cambiare voicing a ogni battuta senza motivo: l’orecchio si perde.',
      'Dimenticare il ritmo: un voicing perfetto con un ritmo sbagliato non funziona.',
    ],
    goals: [
      'Suono un II–V–I con voicing a tre note.',
      'Accompagno una melodia semplice con un ritmo regolare.',
      'Lascio spazio al solista senza perdere il filo.',
    ],
  },
  19: {
    intro: 'Comporre e improvvisare sono due facce della stessa abilità: scegliere le note giuste al momento giusto. Le note guida ti danno la rotta.',
    play: [
      {
        title: 'Le note guida sul II–V–I',
        text: 'Suona sulle tre battute di Dm7 – G7 – CΔ solo le terze e le settime: Fa, Fa, Mi. Senti che da sole disegnano già una piccola melodia.',
        example: melody('Linea di note guida', 60, [65, 65, 64]),
      },
      {
        title: 'Aggiungi note di passaggio',
        text: 'Tra una nota guida e l’altra inserisci note della scala o cromatiche. Esempio: Do – Re – Mi – Fa per arrivare a una nota guida in modo naturale.',
        example: melody('Arpeggio e linea', 60, [62, 65, 69, 72, 71, 67, 65, 64]),
      },
      {
        title: 'Componi una frase',
        text: 'Scrivi quattro battute con un motivo e rispondilo nelle quattro successive, cambiando solo la fine. È la forma più semplice per un tema.',
      },
    ],
    phrase: {
      title: 'Domanda e risposta',
      text: 'Suona una frase di due battute e poi rispondi con un’altra che parte uguale e finisce diversa. È il modo più naturale di costruire un assolo e una melodia.',
      example: melody('Domanda e risposta', 60, [64, 67, 72, 71, 67, 64, 62, 60]),
    },
    how: [
      'Suona prima solo le note guida, poi aggiungi una nota alla volta.',
      'Registra le tue idee con il telefono: un motivo che ti viene in mente va fissato subito.',
      'Cerca il tuo motivo prima ancora di scegliere gli accordi.',
    ],
    mistakes: [
      'Suonare troppe note: la melodia migliore è quasi sempre la più semplice.',
      'Ignorare l’armonia sotto: le note guida servono proprio a evitarlo.',
      'Non riascoltare mai quello che si compone.',
    ],
    goals: [
      'Suono le note guida di un II–V–I.',
      'Costruisco una frase di quattro battute con domanda e risposta.',
      'Registro e riascolto una mia idea.',
    ],
  },
}

export const practiceFor = (chapter) => PRACTICE[chapter] ?? PRACTICE_MORE[chapter] ?? null
