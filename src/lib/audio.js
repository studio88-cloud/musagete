// Audio con la Web Audio API (nessuna libreria).
// Tastiera: campioni di pianoforte in public/samples/keyboard/<nota midi>.mp3 (una ogni 3 semitoni).
// Basso: public/samples/bass/. Chitarra: public/samples/guitar/ (nome file = altezza MIDI reale).
// Se i campioni della chitarra non si caricano si usa una corda pizzicata sintetica.
const BASE = import.meta.env?.BASE_URL || '/'
const SAMPLE_NOTES = {
  keyboard: [48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84],
  bass: [28, 31, 34, 37, 40, 43, 46, 49, 52],
  // chitarra: i file hanno il nome un'ottava sotto l'altezza reale (Chitarra_Mi2 suona Mi3 = 52): qui contano le altezze reali
  guitar: [40, 43, 46, 49, 52, 55, 58, 61, 64, 67, 70, 73, 76, 79, 82, 85, 88],
}
// Compensazione di volume per nota (porta ogni campione allo stesso livello, circa -23 dBFS RMS)
const SAMPLE_GAIN = {
  guitar: { 40: 0.933, 43: 0.936, 46: 0.938, 49: 0.916, 52: 0.427, 55: 0.591, 58: 0.684, 61: 0.597, 64: 0.477, 67: 0.473, 70: 0.594, 73: 0.931, 76: 0.692, 79: 0.828, 82: 0.845, 85: 0.841, 88: 0.954 },
}
const buffers = {} // strumento -> { midi: AudioBuffer }
const loading = {} // strumento -> Promise (si risolve quando ha finito di scaricare)
const ready = {} // strumento -> true quando i campioni sono tutti pronti (o il tentativo è finito)
let playToken = 0 // serve a ignorare un ascolto messo in attesa e poi fermato
let ctx = null
let current = null

function getCtx() {
  if (!ctx || ctx.state === 'closed') {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state !== 'running') ctx.resume().catch(() => {})
  return ctx
}

// Di quanti semitoni si abbassano gli esempi: il basso suona due ottave sotto la tastiera, la chitarra una (la loro gamma reale)
export function instrumentShift(instrument) {
  return instrument === 'bass' ? -24 : instrument === 'guitar' ? -12 : 0
}

// Quando l'app torna in primo piano il contesto audio può essere rimasto bloccato (Safari lo mette in "interrupted"):
// lo si butta e se ne crea uno nuovo al prossimo tocco. I campioni già scaricati restano validi.
let wasHidden = false
function resetContext() {
  const old = ctx
  ctx = null
  if (old) old.close().catch(() => {})
}
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      wasHidden = true
      stopPlaying()
    } else if (wasHidden) {
      wasHidden = false
      resetContext()
    }
  })
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) resetContext()
  })
}

// Scarica i campioni di uno strumento (se ne ha). Si può chiamare in anticipo, anche più volte.
export function preloadSamples(instrument) {
  const notes = SAMPLE_NOTES[instrument]
  if (!notes) return Promise.resolve()
  if (loading[instrument]) return loading[instrument]
  const c = getCtx()
  if (!c) return Promise.resolve()
  buffers[instrument] = {}
  loading[instrument] = Promise.all(
    notes.map((m) =>
      fetch(`${BASE}samples/${instrument}/${m}.mp3`)
        .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(`HTTP ${r.status}`))))
        .then((ab) => c.decodeAudioData(ab))
        .then((buf) => {
          buffers[instrument][m] = buf
        })
        .catch((e) => {
          console.warn(`Campione ${instrument}/${m}.mp3 non caricato:`, e.message || e)
        }),
    ),
  ).then(() => {
    ready[instrument] = true
    // se non è arrivato nessun campione si riprova al prossimo ascolto
    if (Object.keys(buffers[instrument]).length === 0) {
      delete loading[instrument]
      delete ready[instrument]
    }
  })
  return loading[instrument]
}

// Campione più vicino alla nota (al massimo un semitono di differenza, due ai due estremi della gamma)
function nearestSample(instrument, midi) {
  const set = buffers[instrument]
  if (!set) return null
  const keys = Object.keys(set).map(Number)
  if (keys.length === 0) return null
  const lo = Math.min(...(SAMPLE_NOTES[instrument] || keys))
  const hi = Math.max(...(SAMPLE_NOTES[instrument] || keys))
  const maxD = midi < lo || midi > hi ? 2 : 1
  let best = null
  for (const k of keys) {
    const d = Math.abs(k - midi)
    if (d <= maxD && (best === null || d < Math.abs(best - midi))) best = k
  }
  return best === null ? null : { base: best, buf: set[best], gain: SAMPLE_GAIN[instrument]?.[best] ?? 1 }
}

function sampleTone(c, out, smp, midi, start, dur, vol) {
  const src = c.createBufferSource()
  src.buffer = smp.buf
  src.playbackRate.value = Math.pow(2, (midi - smp.base) / 12)
  const g = c.createGain()
  const level = vol * 1.8 * (smp.gain ?? 1)
  const release = Math.min(0.35, dur)
  g.gain.setValueAtTime(level, start)
  g.gain.setValueAtTime(level, start + Math.max(dur - release, 0.05))
  g.gain.linearRampToValueAtTime(0.0001, start + dur + 0.1)
  src.connect(g)
  g.connect(out)
  src.start(start)
  src.stop(start + dur + 0.15)
}

const freq = (midi) => 440 * Math.pow(2, (midi - 69) / 12)

// Chitarra provvisoria (finché non arrivano i campioni veri): corda pizzicata, algoritmo Karplus-Strong.
const plucks = {} // midi -> { buf, base }
function pluckSample(c, midi) {
  if (plucks[midi]) return plucks[midi]
  const sr = c.sampleRate
  const f = freq(midi)
  const N = Math.max(2, Math.floor(sr / f + 0.5))
  const real = sr / (N - 0.5) // frequenza che il ciclo produce davvero (la media dei due campioni toglie mezzo campione)
  const len = Math.floor(sr * 2.4)
  const buf = c.createBuffer(1, len, sr)
  const d = buf.getChannelData(0)
  // rumore iniziale (sempre lo stesso) leggermente smorzato: il "plettro"
  let seed = 12345 + midi
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1
  const ring = new Float32Array(N)
  let prev = 0
  for (let i = 0; i < N; i++) {
    prev = 0.6 * rnd() + 0.4 * prev
    ring[i] = prev
  }
  const decay = f < 150 ? 0.9985 : f < 400 ? 0.997 : 0.9945
  let idx = 0
  let peak = 0
  for (let n = 0; n < len; n++) {
    const next = (idx + 1) % N
    d[n] = ring[idx]
    ring[idx] = 0.5 * (ring[idx] + ring[next]) * decay
    idx = next
    if (Math.abs(d[n]) > peak) peak = Math.abs(d[n])
  }
  const g = peak > 0 ? 0.9 / peak : 1
  for (let n = 0; n < len; n++) d[n] *= g
  // sample.base scelto in modo che la velocità di lettura corregga l'intonazione: 2^((midi-base)/12) = f/real
  plucks[midi] = { buf, base: midi - 12 * Math.log2(f / real) }
  return plucks[midi]
}

function tone(c, out, midi, start, dur, vol) {
  const g = c.createGain()
  const o1 = c.createOscillator()
  const o2 = c.createOscillator()
  const g2 = c.createGain()
  o1.type = 'triangle'
  o2.type = 'sine'
  o1.frequency.value = freq(midi)
  o2.frequency.value = freq(midi) * 2
  g2.gain.value = 0.25
  o2.connect(g2)
  g2.connect(g)
  o1.connect(g)
  g.connect(out)
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(vol, start + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  o1.start(start)
  o2.start(start)
  o1.stop(start + dur + 0.05)
  o2.stop(start + dur + 0.05)
}

export function stopPlaying() {
  playToken++
  if (!current) return
  clearTimeout(current.timer)
  const end = current.onEnd
  current.onEnd = null
  if (end && wasHidden) setTimeout(end, 0)
  try {
    current.master.gain.cancelScheduledValues(0)
    current.master.gain.setValueAtTime(0, ctx.currentTime)
    current.master.disconnect()
  } catch {
    // già fermato
  }
  current = null
}

// midis: elenco di note
// kind 'scale': le note una dopo l'altra
// kind 'chord': accordo insieme (block), poi in arpeggio, poi di nuovo insieme
// arpeggio: chitarra e basso non suonano mai le note insieme, ma una dopo l'altra
export function playNotes(midis, opts = {}) {
  stopPlaying()
  const instrument = opts.instrument || 'keyboard'
  // se i campioni dello strumento sono ancora in arrivo si aspetta (al massimo 3 secondi) invece di suonare il suono sintetico
  if (SAMPLE_NOTES[instrument] && !ready[instrument]) {
    const token = playToken
    Promise.race([preloadSamples(instrument), new Promise((r) => setTimeout(r, 3000))]).then(() => {
      if (token === playToken) playNow(midis, opts)
    })
    return
  }
  playNow(midis, opts)
}

function playNow(midis, { kind = 'chord', arpeggio = false, instrument = 'keyboard', onEnd } = {}) {
  stopPlaying()
  const c = getCtx()
  if (!c || midis.length === 0) {
    onEnd?.()
    return
  }
  const master = c.createGain()
  master.gain.value = 0.5
  master.connect(c.destination)

  const events = [] // { midi, at, dur, vol }
  let total = 0

  if (kind === 'note') {
    // una sola nota toccata sullo strumento
    midis.forEach((midi) => events.push({ midi, at: 0, dur: 1.2, vol: 0.5 }))
    total = 1.2
  } else if (kind === 'progression') {
    // midis = elenco di accordi: ogni accordo suona insieme, uno dopo l'altro
    midis.forEach((chord) => {
      if (arpeggio) {
        const sorted = [...chord].sort((a, b) => a - b)
        sorted.forEach((midi, i) => events.push({ midi, at: total + i * 0.34, dur: 1.4, vol: 0.45 }))
        total += (sorted.length - 1) * 0.34 + 1.3
      } else {
        const vol = 0.3 / Math.sqrt(chord.length)
        chord.forEach((midi) => events.push({ midi, at: total, dur: 1.1, vol }))
        total += 1.0
      }
    })
    total += 0.4
  } else if (kind === 'scale') {
    const step = 0.3
    const dur = 0.55
    midis.forEach((midi, i) => events.push({ midi, at: i * step, dur, vol: 0.5 }))
    total = (midis.length - 1) * step + dur
  } else if (arpeggio) {
    // accordo in arpeggio: una nota dopo l'altra, con calma
    const step = 0.5
    const noteDur = 1.5
    midis.forEach((midi, i) => events.push({ midi, at: i * step, dur: noteDur, vol: 0.45 }))
    total = (midis.length - 1) * step + noteDur
  } else {
    const blockVol = 0.3 / Math.sqrt(midis.length)
    const block = (dur) => {
      midis.forEach((midi) => events.push({ midi, at: total, dur, vol: blockVol }))
      total += dur
    }
    block(1.1) // 1) accordo insieme
    total += 0.2
    const step = 0.5
    const noteDur = 0.9
    midis.forEach((midi, i) => events.push({ midi, at: total + i * step, dur: noteDur, vol: 0.45 }))
    total += (midis.length - 1) * step + noteDur + 0.15 // 2) arpeggio
    block(1.8) // 3) di nuovo insieme
  }

  const t0 = c.currentTime + 0.05
  preloadSamples(instrument)
  events.forEach((e) => {
    const smp = nearestSample(instrument, e.midi)
    if (smp) sampleTone(c, master, smp, e.midi, t0 + e.at, e.dur, e.vol)
    else if (instrument === 'guitar') sampleTone(c, master, pluckSample(c, e.midi), e.midi, t0 + e.at, e.dur, e.vol)
    else tone(c, master, e.midi, t0 + e.at, e.dur, e.vol)
  })
  const timer = setTimeout(() => {
    current = null
    onEnd?.()
  }, total * 1000 + 100)
  current = { master, timer, onEnd }
}
