// Banca di domande dei quiz finali, capitoli 10–19 (vedi quizBankA.js).
import { t, tr } from '../lib/i18n'
import { gen, Q, rnd, names, spell, sol, letterOf, noteWrongs, ROOTS, MAJOR_KEYS, MINOR_KEYS } from './quizGen'

// sesta napoletana: ♭II maggiore (♭2 4 ♭6), nella tonalità minore o maggiore
const napolitan = () => {
  const k = rnd(['C', 'G', 'D', 'F', 'B♭', 'A', 'E', 'E♭'])
  const sp = names(k, '♭2 4 ♭6')
  const ans = sp.join(' – ')
  const alt = (i) => { const c = [...sp]; c[i] = rnd(noteWrongs(c[i]).slice(0, 3)); return c.join(' – ') }
  return Q(t('In {key} maggiore, da quali note è formata la sesta napoletana?', { key: sol(k) }), ans, [alt(0), alt(1), alt(2), alt(0)], t('La sesta napoletana è il ♭II maggiore (♭2 – 4 – ♭6): in {key} è {answer}, di solito in primo rivolto.', { key: sol(k), answer: ans }))
}
const germanSixth = () => {
  const k = rnd(['C', 'G', 'D', 'F', 'B♭', 'A', 'E', 'E♭'])
  const sp = names(k, '♭6 1 ♭3 ♯4')
  const ans = sp.join(' – ')
  const alt = (i) => { const c = [...sp]; c[i] = rnd(noteWrongs(c[i]).slice(0, 3)); return c.join(' – ') }
  return Q(t('In {key}, da quali note è formata la sesta tedesca (♭6 – 1 – ♭3 – ♯4)?', { key: sol(k) }), ans, [alt(0), alt(1), alt(2), alt(3)], t('La sesta tedesca contiene ♭6, 1, ♭3 e ♯4: in {key} sono {answer}.', { key: sol(k), answer: ans }))
}
const italianSixth = () => {
  const k = rnd(['C', 'G', 'D', 'F', 'B♭', 'A', 'E'])
  const sp = names(k, '♭6 1 ♯4')
  const ans = sp.join(' – ')
  const alt = (i) => { const c = [...sp]; c[i] = rnd(noteWrongs(c[i]).slice(0, 3)); return c.join(' – ') }
  return Q(t('In {key}, da quali note è formata la sesta italiana (♭6 – 1 – ♯4)?', { key: sol(k) }), ans, [alt(0), alt(1), alt(2), alt(1)], t('La sesta italiana ha solo tre note: ♭6, 1 e ♯4. In {key}: {answer}.', { key: sol(k), answer: ans }))
}
// II–V in tonalità maggiore e II–V–I minore
const iiV = () => {
  const k = rnd(MAJOR_KEYS)
  const L = (i) => letterOf(names(k, '1 2 3 4 5 6 7')[i])
  return Q(t('Qual è il II–V di {key} maggiore?', { key: sol(k) }), `${L(1)}m7 – ${L(4)}7`, [`${L(1)}7 – ${L(4)}m7`, `${L(3)}m7 – ${L(4)}7`, `${L(1)}m7 – ${L(3)}7`], t('Il II–V porta al I: {ii}m7 – {v}7 → {i}Δ.', { ii: L(1), v: L(4), i: L(0) }))
}
const minorIiVI = () => {
  const k = rnd(MINOR_KEYS)
  const L = (i) => letterOf(names(k, '1 2 ♭3 4 5 ♭6 ♭7')[i])
  const ans = `${L(1)}ø7 – ${L(4)}7 – ${L(0)}m7`
  return Q(t('Qual è il II–V–I in {key} minore?', { key: sol(k) }), ans, [`${L(1)}m7 – ${L(4)}7 – ${L(0)}m7`, `${L(1)}ø7 – ${L(4)}m7 – ${L(0)}m7`, `${L(1)}ø7 – ${L(4)}7 – ${L(0)}Δ`, `${L(1)}7 – ${L(4)}7 – ${L(0)}m7`], t('In minore il II è semidiminuito: {answer}.', { answer: ans }))
}

export const BANK_B = {
  10: [
    gen.pent, gen.pent, gen.blue, gen.blue, gen.wholeTone, gen.wholeTone, gen.degMin(), gen.relMinor,
    ['Qual è la formula della pentatonica maggiore?', '1 2 3 5 6', ['1 ♭3 4 5 ♭7', '1 2 ♭3 5 6', '1 2 3 4 5'], 'Cinque note: tonica, seconda, terza, quinta, sesta.'],
    ['Che scala si ottiene aggiungendo la ♭5 alla pentatonica minore?', 'Scala blues', ['Scala esatonale', 'Scala diminuita', 'Scala cromatica'], 'La scala blues ha sei note: 1 ♭3 4 ♭5 5 ♭7.'],
    ['Qual è la formula della scala esatonale?', '1 2 3 ♯4 ♯5 ♭7', ['1 2 ♭3 4 5 6', '1 ♭2 ♭3 4 ♭5 ♭6', '1 2 3 4 5 6'], 'Sei note a distanza di un tono.'],
    ['Come è costruita la scala diminuita (tono–semitono)?', 'Alternando tono e semitono', ['Solo toni interi', 'Solo semitoni', 'Tre toni e un semitono'], 'Alterna T–S–T–S… per otto note.'],
    ['Quante note ha la scala diminuita?', '8', ['6', '7', '12'], 'Otto note, per la sua struttura simmetrica.'],
    ['Quante note ha la scala cromatica in un’ottava (senza ripetere la tonica)?', '12', ['7', '10', '8'], 'Tutti i dodici semitoni.'],
    ['Quale caratteristica ha la scala minore armonica?', 'Ha la settima maggiore', ['Ha la sesta maggiore', 'Ha la quinta diminuita', 'Ha la quarta aumentata'], 'La minore armonica: 1 2 ♭3 4 5 ♭6 7.'],
    ['Quale caratteristica ha la scala minore melodica (ascendente)?', 'Ha la sesta e la settima maggiori', ['Ha la sesta minore', 'Ha la seconda minore', 'Ha la settima minore'], 'La melodica ascendente: 1 2 ♭3 4 5 6 7.'],
    ['Su quale accordo si usa di solito la scala diminuita tono–semitono?', '7♭9', ['Δ', 'm7', 'm6'], 'La tono–semitono è la scala dei dominanti con ♭9.'],
    ['Che cos’è la scala bebop dominante?', 'Il misolidio con la settima maggiore di passaggio', ['La pentatonica con una nota in più', 'La scala esatonale', 'Il lidio dominante'], 'Aggiunge una nota cromatica di passaggio per far cadere gli accordi sui tempi forti.'],
    ['Quale scala ha un suono “sospeso”, senza semitoni?', 'Esatonale', ['Diminuita', 'Cromatica', 'Minore armonica'], 'Le note sono tutte a un tono: nessuna tendenza verso una tonica.'],
    ['Quale scala pentatonica è la relativa della maggiore?', 'La minore', ['La blues', 'L’esatonale', 'La diminuita'], 'La pentatonica minore è un modo della maggiore (sesto grado).'],
  ],
  11: [
    napolitan, napolitan, germanSixth, germanSixth, italianSixth, gen.secDom, gen.tritone, gen.relMinor,
    ['Dove risolve di solito la sesta napoletana?', 'Sul V', ['Sul I', 'Sul IV', 'Sul vi'], 'Prepara la dominante, come un sostituto del IV.'],
    ['Quale sesta aumentata ha quattro suoni e contiene la seconda?', 'Francese', ['Tedesca', 'Italiana', 'Napoletana'], 'La francese: ♭6 1 2 ♯4.'],
    ['Quale sesta aumentata ha solo tre suoni?', 'Italiana', ['Tedesca', 'Francese', 'Napoletana'], 'L’italiana: ♭6 1 ♯4.'],
    ['Quale accordo è enarmonicamente simile alla sesta tedesca?', 'Una settima di dominante', ['Un accordo diminuito', 'Una settima maggiore', 'Un accordo minore'], 'La tedesca coincide con un accordo 7 scritto in modo diverso.'],
    ['Quale intervallo caratterizza le seste aumentate?', 'La sesta aumentata tra ♭6 e ♯4', ['La quarta diminuita', 'La terza minore', 'La settima maggiore'], 'È l’intervallo tra ♭6 e ♯4, che si apre verso l’ottava al V.'],
    ['Che cosa sono le mediante cromatiche?', 'Accordi le cui radici sono a una terza di distanza', ['Accordi sul V grado', 'Accordi sul VII', 'Accordi diminuiti'], 'Collegano tonalità lontane per terze.'],
    ['Quale accordo è un esempio di mediante cromatica in Do maggiore?', 'E♭ o A♭ (♭III, ♭VI)', ['G', 'F', 'D7'], 'Radici a una terza dalla tonica, fuori dalla scala.'],
    ['Che cosa si intende per cromatismo?', 'L’uso di note estranee alla scala', ['L’uso di molte voci', 'Il ritmo veloce', 'L’uso di accordi sospesi'], 'Le note cromatiche non appartengono alla tonalità.'],
    ['Che cosa è un accordo diminuito di passaggio?', 'Un diminuito che collega due accordi diatonici', ['Un accordo che modula', 'Un accordo di dominante', 'Un accordo con la nona'], 'Unisce due accordi con un movimento cromatico del basso.'],
    ['Che funzione ha di solito un accordo di settima diminuita?', 'Dominante con ♭9 senza la fondamentale', ['Tonica', 'Sottodominante', 'Pedale'], 'Per esempio B°7 ≈ G7♭9 senza il Sol.'],
    ['Che cosa fa il basso cromatico?', 'Sale o scende per semitoni', ['Rimane fermo', 'Salta di quinta', 'Si ferma sul V'], 'Le note del basso procedono per semitono.'],
  ],
  12: [
    gen.ext, gen.ext, gen.ext, gen.ext7, gen.ext7, gen.ext7, gen.chordNotes(['7']), gen.chordNotes(['m7']),
    ['A quale grado corrisponde la 11?', 'Alla 4, un’ottava sopra', ['Alla 2', 'Alla 6', 'Alla 7'], 'Le estensioni: 9 = 2, 11 = 4, 13 = 6.'],
    ['Che accordo è Cm9?', 'Cm7 con la nona (Re)', ['C7 con la nona', 'Cm con la sesta', 'C maggiore con la nona'], 'Cm7 più la 9 (Re).'],
    ['Che accordo è C6?', 'Triade maggiore con la sesta aggiunta', ['C7', 'CΔ', 'Cm6'], 'C6 = Do Mi Sol La.'],
    ['Che cos’è un Cadd9?', 'Triade maggiore con la nona, senza la settima', ['C7 con la nona', 'CΔ con la nona', 'Cm con la nona'], 'La 9 si aggiunge a una triade, senza la settima.'],
    ['Quale nota è la 13 di G7?', 'Mi', ['Do', 'Re', 'La'], 'La 13 è la sesta (un’ottava sopra): Mi.'],
    ['Quale nota è la 9 di G7?', 'La', ['Si', 'Fa', 'Mi'], 'La 9 è la seconda un’ottava sopra: La.'],
    ['Che cosa fa il shell voicing?', 'Suona solo fondamentale, terza e settima', ['Suona tutte le note', 'Suona solo la fondamentale', 'Aggiunge le estensioni'], 'Il guscio minimo dell’accordo.'],
    ['Che cos’è un’alterazione?', 'Una nota dell’accordo alzata o abbassata di un semitono', ['Una nota aggiunta in basso', 'Una pausa', 'Un cambio di tonalità'], 'Per esempio ♭9, ♯9, ♯11, ♭13.'],
    ['Quali sono le alterazioni tipiche di un 7alt?', '♭9, ♯9, ♯11 (♭5) e ♭13 (♯5)', ['9, 11 e 13', '♭9 e 13', '♯9 e 11'], 'Tutte le tensioni sono alterate.'],
    ['Quale tensione si evita su un accordo m7?', 'La ♭9 (di solito)', ['La 9', 'L’11', 'La 13'], 'Sui minori si usano 9 e 11; la ♭9 suona a disagio.'],
    ['Che cosa rende un accordo “rootless”?', 'La fondamentale viene omessa', ['La terza viene omessa', 'Ci sono solo due note', 'Il basso suona la quinta'], 'Il bassista suona la fondamentale al posto dell’accordo.'],
  ],
  13: [
    gen.tritone, gen.tritone, gen.tritone, gen.tritoneNotes, gen.tritoneNotes, gen.relSub, gen.relSub, gen.dom7,
    ['Che cos’è il sostituto tritonale?', 'Un V7 con la radice a un tritono dal V7 originale', ['Un accordo minore sullo stesso grado', 'Un accordo diminuito', 'Una dominante secondaria'], 'Condivide con l’originale il tritono tra terza e settima.'],
    ['Quale accordo risolve il sostituto tritonale D♭7?', 'CΔ', ['Dm7', 'FΔ', 'G7'], 'D♭7 risolve su Do per semitono discendente.'],
    ['Che cosa fa il basso in un II–V–I con sostituzione tritonale?', 'Scende per semitoni', ['Sale per quinte', 'Resta sullo stesso suono', 'Salta di ottava'], 'Per esempio Dm7 – D♭7 – CΔ: Re, Re♭, Do.'],
    ['Che accordo corrisponde a B°7?', 'G7♭9 senza la fondamentale', ['CΔ', 'Dm7', 'Am7'], 'B°7 contiene la terza, la quinta, la settima e la ♭9 di G7.'],
    ['Come si sostituisce un accordo di tonica con funzione tonica?', 'Con il iii o il vi', ['Con il IV', 'Con il V', 'Con il ii'], 'Em7 e Am7 sostituiscono CΔ.'],
    ['Quale accordo si usa come sostituto di Dm7 (funzione sottodominante)?', 'FΔ', ['Am7', 'Em7', 'G7'], 'Il IV condivide la funzione del ii.'],
    ['Che cos’è la dominante sostitutiva?', 'Un accordo che prende il posto del V con funzione di dominante', ['Un’altra tonica', 'Un accordo di sottodominante', 'Una cadenza plagale'], 'Per esempio il sostituto tritonale o il vii° al posto del V.'],
    ['Quale accordo è il “backdoor” in Do maggiore?', 'B♭7 (♭VII7)', ['D7', 'A7', 'D♭7'], 'Il ♭VII7 risolve sul I come una dominante “di servizio”.'],
    ['Che cos’è una sostituzione per terze?', 'Cambiare un accordo con un altro a una terza di distanza', ['Cambiare l’ordine delle voci', 'Cambiare il tempo', 'Aggiungere una nota'], 'Per esempio Am7 al posto di CΔ.'],
    ['Quanti semitoni ci sono tra le radici di G7 e D♭7?', '6', ['5', '7', '3'], 'Un tritono: 6 semitoni.'],
  ],
  14: [
    iiV, iiV, minorIiVI, minorIiVI, gen.iiVI, gen.turnaround, gen.turnaround, gen.blues, gen.blues,
    ['Quale sostituzione si fa nel blues jazz alla battuta 4?', 'Un II–V verso il IV', ['Un V7 di V', 'Una cadenza plagale', 'Una pausa'], 'Una battuta con ii–V prepara il IV.'],
    ['Che cos’è una catena di II–V?', 'Una successione di II–V che scende per tonalità', ['Un solo II–V', 'Un V–I ripetuto', 'Un pedale'], 'Per esempio Dm7–G7, Cm7–F7, B♭m7–E♭7…'],
    ['A che tonalità conduce un II–V–I minore in La minore?', 'La minore', ['Do maggiore', 'Mi minore', 'Re minore'], 'Il II–V–I minore porta al i.'],
    ['Quale accordo si usa sul V7 in minore armonico?', 'Una settima di dominante con la terza maggiore', ['Una settima minore', 'Una settima maggiore', 'Un diminuito'], 'V7 con la sensibile.'],
    ['Che cos’è la modulazione per II–V?', 'Un II–V verso la nuova tonalità', ['Un cambio di tempo', 'Una pausa', 'Una nota tenuta'], 'Il II–V indica la nuova tonalità prima di arrivarci.'],
    ['Qual è la scala più usata sul iim7♭5?', 'Locrio (o locrio ♮2)', ['Dorico', 'Lidio', 'Misolidio'], 'Il locrio ♮2 è la scelta più moderna.'],
    ['Che cosa significa “giro” in gergo jazz?', 'Una progressione ciclica che ricomincia', ['Un accordo sospeso', 'Una cadenza', 'Un assolo'], 'Un giro armonico si ripete.'],
    ['Qual è un esempio di progressione modale?', 'Dm7 per molte battute', ['II–V–I', 'Blues', 'Anatole'], 'Gli accordi restano fermi: la musica si basa su un modo.'],
  ],
  15: [
    gen.anatole, gen.anatole, gen.blues, gen.blues, gen.turnaround,
    ['Quante battute ha di solito ciascuna sezione di una forma AABA?', '8', ['4', '12', '16'], 'AABA = 4 × 8 battute.'],
    ['Quale sezione di una forma AABA porta una novità armonica?', 'Il ponte (B)', ['La prima A', 'L’ultima A', 'Il tema'], 'La B ha un’armonia diversa che prepara il ritorno.'],
    ['Che cosa sono i “rhythm changes”?', 'La progressione di I Got Rhythm', ['Un cambio di tempo', 'Un blues minore', 'Una cadenza'], 'Una forma AABA su Anatole con ponte per dominanti.'],
    ['Come si chiama la parte in cui si improvvisa, ripetendo la forma?', 'Chorus', ['Head', 'Intro', 'Coda'], 'Ogni giro della forma è un chorus.'],
    ['Che cosa è l’head?', 'Il tema del brano', ['L’assolo', 'La coda', 'Il ponte'], 'L’head è la melodia di partenza e di chiusura.'],
    ['Che cos’è la forma ABA?', 'Una sezione, un contrasto e il ritorno della prima', ['Tre sezioni diverse', 'Due sezioni uguali', 'Una sola sezione'], 'Il ritorno chiude il cerchio.'],
    ['Che cosa è un vamp?', 'Un breve giro armonico ripetuto', ['Un cambio di tonalità', 'Un assolo', 'Una pausa'], 'Si ripete finché serve.'],
    ['Come si chiama la breve chiusura di un brano?', 'Coda', ['Intro', 'Ponte', 'Chorus'], 'La coda chiude il brano.'],
    ['Che cosa è una forma strofa–ritornello?', 'Alternanza di una parte narrativa e una ripetuta', ['Un blues', 'Un canone', 'Un solo di assolo'], 'La strofa racconta, il ritornello torna uguale.'],
  ],
  16: [
    gen.pent, gen.wholeTone, gen.interval(['4', '5']),
    ['Che effetto dà la scala esatonale?', 'Un suono sospeso, senza centro tonale', ['Un suono molto cadenzato', 'Un suono minore', 'Un suono swing'], 'Non ha semitoni né quinte giuste.'],
    ['Che cos’è un cluster?', 'Un gruppo di note vicine suonate insieme', ['Un accordo di quarte', 'Un accordo di terze', 'Una scala'], 'Per esempio Do – Re – Mi insieme.'],
    ['Quale compositore è associato all’impressionismo musicale?', 'Debussy', ['Bach', 'Mozart', 'Verdi'], 'Debussy è il punto di riferimento dell’impressionismo.'],
    ['Che cosa è il planing?', 'Lo spostamento parallelo di accordi della stessa forma', ['Un tipo di pedale', 'Una cadenza', 'Una scala'], 'È sinonimo di accordi paralleli.'],
    ['Che cosa è l’atonalità?', 'L’assenza di un centro tonale', ['L’uso di due tonalità', 'Una cadenza sospesa', 'Un modo'], 'Non c’è una tonica di riferimento.'],
    ['Quale tecnica usa dodici suoni in una serie?', 'Dodecafonia', ['Impressionismo', 'Politonalità', 'Modalità'], 'La serie di dodici suoni è usata da Schönberg.'],
    ['Quale scala è alla base di molta musica modale?', 'I modi (dorico, lidio, ecc.)', ['La cromatica', 'La esatonale', 'La diminuita'], 'Il centro è un modo, non una tonalità funzionale.'],
    ['Che cos’è un accordo per quinte?', 'Un accordo di quinte giuste sovrapposte', ['Un accordo di terze', 'Una triade', 'Una settima'], 'Per esempio Do – Sol – Re.'],
    ['Quale caratteristica ha un accordo di nona senza terza?', 'Non è né maggiore né minore', ['È sempre maggiore', 'È sempre minore', 'È diminuito'], 'Senza la terza il modo è ambiguo.'],
  ],
  17: [
    gen.negNote, gen.negNote, gen.negNote, gen.negDom, gen.negDom, gen.negTriad, gen.negTriad,
    ['Che cos’è l’armonia negativa?', 'Il riflesso di accordi e note attorno a un asse di simmetria', ['L’uso di accordi minori al posto dei maggiori', 'Un tipo di dissonanza', 'L’armonia senza tonica'], 'Ogni nota viene specchiata rispetto all’asse della tonalità.'],
    ['Con quale nota si scambia la tonica, nell’armonia negativa?', 'Con la quinta', ['Con la quarta', 'Con la terza', 'Con la settima'], 'La tonica si specchia nella quinta (1 ↔ 5).'],
    ['In Do, in quale nota si specchia il Mi?', 'Mi♭', ['Re', 'Fa', 'Sol'], 'Il Mi e il Mi♭ stanno ai lati dell’asse: ♭3 ↔ 3.'],
    ['In Do, in quale nota si specchia il La?', 'Si♭', ['Si', 'Sol', 'La♭'], 'La sesta si specchia nella settima minore (6 ↔ ♭7).'],
    ['In Do, in quale nota si specchia il Si?', 'La♭', ['La', 'Do', 'Si♭'], 'La settima maggiore si specchia nella ♭6 (7 ↔ ♭6).'],
    ['Qual è il negativo di Cm7 in Do?', 'C6', ['CΔ', 'C7', 'Cm6'], 'Il minore settima diventa maggiore con sesta.'],
    ['Qual è il negativo di Dø7 in Do?', 'G7', ['Cm7', 'Fm6', 'E♭Δ'], 'Il semidiminuito diventa un accordo di settima di dominante.'],
    ['Qual è il negativo di Am in Do?', 'E♭', ['A', 'Fm', 'F'], 'La radice si specchia in Mi♭ e la qualità diventa maggiore.'],
    ['Qual è il negativo di Dm in Do?', 'B♭', ['Dm', 'D', 'Gm'], 'La radice Re si specchia in Si♭, la qualità diventa maggiore.'],
    ['Qual è il negativo di F in Do?', 'Gm', ['G', 'Fm', 'Dm'], 'Fa e Sol si scambiano; l’accordo da maggiore diventa minore.'],
    ['Qual è il negativo di G in Do?', 'Fm', ['F', 'Gm', 'Am'], 'Sol e Fa si scambiano; l’accordo da maggiore diventa minore.'],
    ['Che cosa cambia, passando a un’altra tonica?', 'Cambiano i nomi, la forma dello specchio resta uguale', ['La forma si inverte', 'Cambia il numero di coppie', 'Non si può più specchiare'], 'La struttura delle coppie è la stessa per tutte le tonalità.'],
  ],
  18: [
    gen.chordNotes(['7', 'Δ']), gen.iiVI, gen.chordNotes(['m7']), gen.seventhKey([2, 5]),
    ['Che cos’è il voicing Drop 2?', 'La seconda voce dall’alto scende di un’ottava', ['La terza voce sale di un’ottava', 'Si toglie la quinta', 'Si raddoppia la fondamentale'], 'Si prende un accordo chiuso e si abbassa la seconda voce.'],
    ['Che cos’è il voicing Drop 3?', 'La terza voce dall’alto scende di un’ottava', ['La seconda voce sale di un’ottava', 'Si raddoppia la quinta', 'Si toglie la terza'], 'Si abbassa la terza voce dall’alto.'],
    ['Che cosa è il comping?', 'L’accompagnamento ritmico-armonico di un solista', ['Un tipo di assolo', 'Una cadenza', 'Una scala'], 'Il comping sostiene l’improvvisatore.'],
    ['Che cos’è un walking bass?', 'Un basso a note di pari durata che “cammina” tra gli accordi', ['Un basso con note lunghe', 'Un pedale', 'Un basso senza ritmo'], 'Quattro note per battuta, di solito in jazz.'],
    ['Che cos’è un accordo spostato in terzo rivolto?', 'Un accordo con la settima al basso', ['Un accordo senza terza', 'Un accordo con la nona al basso', 'Un accordo in posizione stretta'], 'La settima nella voce più grave.'],
    ['Che cosa sono le note di collegamento (approach notes)?', 'Note che portano a una nota dell’accordo', ['Note che aggiungono tensione estranea', 'Note tenute', 'Pause'], 'Si avvicinano a una nota dell’accordo per semitono.'],
    ['Come si costruisce un arrangiamento?', 'Scegliendo cosa suona ogni strumento e quando', ['Aggiungendo più note', 'Cambiando la tonalità', 'Suonando più forte'], 'Un arrangiamento organizza ruoli e sezioni.'],
    ['Che cos’è la sezione ritmica?', 'Basso, batteria e strumento armonico', ['I solisti', 'Il coro', 'Gli archi'], 'Dà sostegno al brano.'],
    ['Quale effetto hanno le pause in un arrangiamento?', 'Creano respiro e contrasto', ['Rendono il brano più lento', 'Sostituiscono l’accordo', 'Cambiano la tonalità'], 'Lo spazio fa risaltare le frasi.'],
    ['Che cosa significa “call and response”?', 'Una frase a cui un’altra risponde', ['Due solisti insieme', 'Una cadenza', 'Un pedale'], 'Domanda e risposta tra strumenti.'],
  ],
  19: [
    gen.modeOnChord, gen.modeOnChord, gen.pent, gen.blue, gen.iiVI, gen.ext, gen.alt7, gen.tritone,
    ['Che cos’è un motivo?', 'Una breve idea musicale riconoscibile', ['Un accordo', 'Una scala', 'Una cadenza'], 'Il mattone da cui si costruisce una melodia.'],
    ['Che cosa significa sviluppare un motivo?', 'Ripeterlo con variazioni', ['Suonarlo più forte', 'Eliminarlo', 'Cambiare tempo'], 'Si trasforma l’idea mantenendola riconoscibile.'],
    ['Che cosa è una frase musicale?', 'Un’idea che si sviluppa in alcune battute e respira', ['Una sola nota', 'Un accordo', 'Una pausa'], 'Come una frase del linguaggio.'],
    ['Che cos’è la tensione?', 'Il desiderio di risolvere su un suono stabile', ['Un suono forte', 'Una nota breve', 'Un ritmo veloce'], 'Una tensione chiede una risoluzione.'],
    ['Come si prepara una buona melodia?', 'Con note dell’accordo e note di passaggio', ['Con note a caso', 'Con soli salti', 'Con una sola nota'], 'Un equilibrio tra stabilità e movimento.'],
    ['Che cosa è la nota di passaggio?', 'Una nota estranea tra due note dell’accordo', ['Una nota dell’accordo', 'Una pausa', 'Una nota tenuta'], 'Collega due note per grado congiunto.'],
    ['Quale tecnica si usa per improvvisare su un II–V–I?', 'Seguire le note guida da un accordo al successivo', ['Suonare una sola scala', 'Ignorare gli accordi', 'Suonare solo la fondamentale'], 'La settima di un accordo diventa la terza del successivo.'],
    ['Qual è l’uso più comune dell’approccio cromatico?', 'Arrivare per semitono a una nota dell’accordo', ['Allontanarsi dall’armonia', 'Sostituire la scala', 'Cambiare la tonalità'], 'Una nota cromatica porta a una nota stabile.'],
    ['Che cos’è l’imitazione?', 'Ripetere un motivo in un’altra voce', ['Cambiare accordo', 'Alzare la tonalità', 'Suonare più piano'], 'Una voce risponde a un’altra.'],
  ],
}
