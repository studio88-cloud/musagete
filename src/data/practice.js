import { nt, sc } from './handbook'

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
  const notes = midis
    .filter((m) => (seen.has(m) ? false : seen.add(m)))
    .sort((a, b) => a - b)
    .map((m) => nt(m, 1 + [0, 2, 4, 5, 7, 9, 11].indexOf((m - base) % 12), String(1 + [0, 2, 4, 5, 7, 9, 11].indexOf((m - base) % 12))))
  return { label, base, notes, play: midis, chord: false, melody: true }
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
        example: sc('Do maggiore', 60, '1 2 3 4 5 6 7'),
      },
      {
        title: 'Un’altra tonalità: Sol maggiore',
        text: 'Ripeti la stessa cosa partendo da Sol. Cambia una sola nota: il Fa diventa Fa♯. Se la scala non “suona” come la prima, controlla proprio quella nota.',
        tips: { all: 'Ti serve lo schema tono – tono – semitono – tono – tono – tono – semitono: è lo stesso per ogni tonalità.' },
        example: sc('Sol maggiore', 67, '1 2 3 4 5 6 7'),
      },
      {
        title: 'Maggiore e minore a confronto',
        text: 'Suona Do maggiore e subito dopo La minore naturale: sono le stesse note, ma cambia il punto di partenza. Senti come la seconda suona più scura.',
        example: sc('La minore naturale', 57, '1 2 ♭3 4 5 ♭6 ♭7'),
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

export const practiceFor = (chapter) => PRACTICE[chapter] ?? null
