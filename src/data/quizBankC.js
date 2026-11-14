// Domande aggiuntive (vedi quizBankA.js per il formato).
import { gen } from './quizGen'

export const BANK_C = {
  6: [
    ['Che cosa fa V7/V prima del V?', 'Lo prepara con una dominante', ['Lo sostituisce con un minore', 'Lo trasforma in tonica', 'Cambia la tonalità per sempre'], 'V7/V → V7 → I: una catena di dominanti.'],
    ['In Do maggiore, qual è V7/V?', 'D7', ['G7', 'A7', 'E7'], 'La dominante di Sol è Re: D7.'],
    ['Quale nota cromatica compare in D7 nella tonalità di Do maggiore?', 'Fa♯', ['Si♭', 'Do♯', 'Sol♯'], 'La terza di D7 è Fa♯, estranea a Do maggiore.'],
  ],
  9: [
    ['Quale modo si usa su un accordo Δ♯5 come E♭Δ♯5 in Do minore melodica?', 'Lidio aumentato', ['Ionico', 'Lidio dominante', 'Misolidio'], 'Il terzo modo della minore melodica ha ♯4 e ♯5.'],
    ['Quale modo ha come caratteristiche la ♭2 e la 3 (terza maggiore) nella minore armonica?', 'Frigio dominante', ['Frigio', 'Dorico ♯4', 'Ultralocrio'], 'Il frigio dominante: ♭2 con terza maggiore.'],
    ['Qual è il quarto modo della minore armonica?', 'Dorico ♯4', ['Lidio ♯2', 'Frigio dominante', 'Ionico ♯5'], 'Il quarto grado della minore armonica dà il dorico ♯4.'],
    ['Qual è il sesto modo della minore armonica?', 'Lidio ♯2', ['Dorico ♯4', 'Locrio ♮6', 'Ionico ♯5'], 'Il sesto grado della minore armonica dà il lidio ♯2.'],
    ['Qual è il secondo modo della minore armonica?', 'Locrio ♮6', ['Dorico ♯4', 'Ionico ♯5', 'Frigio dominante'], 'Il secondo grado dà il locrio ♮6.'],
    ['Qual è il terzo modo della minore armonica?', 'Ionico ♯5', ['Lidio aumentato', 'Lidio ♯2', 'Locrio ♮6'], 'Il terzo grado dà lo ionico ♯5.'],
  ],
  13: [
    ['Quante note hanno in comune G7 e D♭7?', 'Due: il tritono Si – Fa', ['Nessuna', 'Tre', 'Quattro'], 'Condividono solo la terza e la settima (che si scambiano di ruolo).'],
    ['Quale accordo si usa come sostituto tritonale di C7?', 'G♭7 (o F♯7)', ['F7', 'G7', 'D♭7'], 'Il sostituto tritonale è a sei semitoni: G♭7.'],
    ['Perché il sostituto tritonale funziona?', 'Condivide il tritono dell’accordo originale', ['Ha la stessa fondamentale', 'È un accordo minore', 'Ha la stessa tonalità'], 'La terza e la settima si scambiano di ruolo.'],
  ],
  15: [
    ['Come si chiama la forma di 12 battute su I – IV – V?', 'Blues', ['Anatole', 'AABA', 'Rondò'], 'La forma blues classica ha 12 battute.'],
    ['Quale forma è composta da quattro sezioni da otto battute?', 'AABA', ['Blues', 'ABA', 'Strofa–ritornello'], '4 × 8 = 32 battute.'],
    ['Che cosa succede nella seconda A di una forma AABA?', 'Si ripete la prima A', ['Si cambia tonalità', 'Si passa al ponte', 'Si improvvisa solo'], 'La seconda A ripete la prima, spesso con un finale diverso.'],
    ['Che cosa fa il ponte (B) di una forma AABA?', 'Porta un contrasto armonico e melodico', ['Ripete la A', 'Chiude il brano', 'Fa da introduzione'], 'Il ponte crea contrasto prima del ritorno della A.'],
    ['Qual è la sezione che chiude una forma AABA?', 'L’ultima A', ['Il ponte', 'La coda', 'L’intro'], 'La forma torna alla A per concludere.'],
  ],
  16: [
    ['Qual è un esempio di accordo quartale?', 'Do – Fa – Si♭', ['Do – Mi – Sol', 'Do – Mi♭ – Sol♭', 'Do – Mi – Sol♯'], 'Tre note a distanza di quarta giusta.'],
    ['Quale caratteristica ha un accordo quartale?', 'Suona aperto e ambiguo, senza chiara qualità maggiore o minore', ['Suona sempre maggiore', 'Suona sempre minore', 'Suona come una settima di dominante'], 'Senza terze, non è né maggiore né minore.'],
    ['Quale uso fa Debussy dell’armonia?', 'La usa per colore, più che per direzione', ['La usa solo per le cadenze', 'La evita del tutto', 'Usa solo accordi maggiori'], 'Gli accordi sono timbri, non tappe di una progressione.'],
    ['Che cosa è un accordo per seconde (cluster)?', 'Note vicine suonate insieme', ['Due note a distanza di ottava', 'Un accordo di quarte', 'Una triade'], 'Note a un tono o semitono di distanza.'],
    ['Che cosa indica l’uso di un pedale armonico?', 'Una nota fissa sotto accordi che cambiano', ['Un cambio di tempo', 'Un accordo senza basso', 'Una pausa'], 'Il pedale crea tensione e stabilità insieme.'],
    ['Che cosa significa “modale” riferito alla musica?', 'Che si basa su un modo e non sulle funzioni tonali', ['Che usa solo accordi minori', 'Che è molto veloce', 'Che ha molti cromatismi'], 'Il centro è un suono, non una cadenza.'],
    ['Quale scala minore contiene una seconda aumentata tra il sesto e il settimo grado?', 'Minore armonica', ['Pentatonica', 'Esatonale', 'Blues'], 'La minore armonica ha la seconda aumentata tra ♭6 e 7.'],
    ['Che cosa è un accordo “slash”?', 'Un accordo con una nota al basso diversa dalla fondamentale', ['Un accordo senza terza', 'Un accordo diminuito', 'Un accordo con la nona'], 'Per esempio C/E.'],
    ['Che cosa è un’armonia “statica”?', 'Un’armonia che non cambia per molte battute', ['Un’armonia senza accordi', 'Una successione di cadenze', 'Un’armonia molto veloce'], 'Il suono resta fermo, spesso su un modo.'],
  ],
  18: [
    ['Quale nota si omette di solito nel voicing per fare spazio al basso?', 'La fondamentale', ['La terza', 'La settima', 'La nona'], 'Il bassista suona la fondamentale: la mano può farne a meno.'],
    ['Che cos’è il voicing Drop 2&4?', 'La seconda e la quarta voce dall’alto scendono di un’ottava', ['Solo la quarta scende', 'La terza voce sale', 'Si raddoppia la nota più alta'], 'Si abbassano due voci dall’accordo chiuso.'],
    ['Quale voicing ha le note “5 1 3 7” dal basso verso l’alto?', 'Drop 2', ['Drop 3', 'Drop 2&4', 'Posizione stretta'], 'Un CΔ in Drop 2: Sol, Do, Mi, Si.'],
    ['Che cosa è un voicing a posizione stretta?', 'Le quattro note stanno entro un’ottava', ['Le note sono molto distanti', 'Ci sono solo due note', 'Il basso è un’ottava sotto'], 'Le voci sono vicine tra loro.'],
    ['Che cosa fa il basso in un accompagnamento “in due”?', 'Suona sul primo e sul terzo tempo', ['Suona su ogni tempo', 'Suona sul secondo e sul quarto', 'Non suona'], 'Due note per battuta (in 4/4).'],
  ],
  19: [
    ['Quale scala si usa di solito su un accordo m7?', 'Dorico', ['Lidio', 'Misolidio', 'Ionico'], 'Il dorico è la scelta più comune sul minore settima.'],
    ['Quale scala si usa di solito su un accordo CΔ?', 'Ionico (o lidio)', ['Dorico', 'Frigio', 'Locrio'], 'Su Δ si usano ionico e lidio.'],
    ['Che cosa fa la settima di un accordo, nel passaggio all’accordo seguente?', 'Scende di semitono sulla terza del successivo', ['Sale di quinta', 'Resta ferma', 'Salta di ottava'], 'In un II–V–I la settima di G7 (Fa) scende al Mi, terza di CΔ.'],
  ],
}
