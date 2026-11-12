// Audio con la Web Audio API (nessuna libreria).
// Tastiera: campioni di pianoforte in public/samples/keyboard/<nota midi>.mp3 (una ogni 3 semitoni).
// Basso: public/samples/bass/. Chitarra: suono sintetico provvisorio, finché non arrivano i suoi campioni.
const BASE = import.meta.env?.BASE_URL || '/'
const SAMPLE_NOTES = {
  keyboard: [48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84],
  bass: [28, 31, 34, 37, 40, 43, 46, 49, 52],
}
const buffers = {} // strumento -> { midi: AudioBuffer }
const loading = {}
let ctx = null
let current = null

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Scarica i campioni di uno strumento (se ne ha). Si può chiamare in anticipo, anche più volte.
export function preloadSamples(instrument) {
  const notes = SAMPLE_NOTES[instrument]
  if (!notes || loading[instrument]) return
  const c = getCtx()
  if (!c) return
  loading[instrument] = true
  buffers[instrument] = {}
  notes.forEach((m) => {
    fetch(`${BASE}samples/${instrument}/${m}.mp3`)
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error('campione mancante'))))
      .then((ab) => c.decodeAudioData(ab))
      .then((buf) => {
        buffers[instrument][m] = buf
      })
      .catch(() => {
        // senza campione si usa il suono sintetico
      })
  })
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
  return best === null ? null : { base: best, buf: set[best] }
}

function sampleTone(c, out, smp, midi, start, dur, vol) {
  const src = c.createBufferSource()
  src.buffer = smp.buf
  src.playbackRate.value = Math.pow(2, (midi - smp.base) / 12)
  const g = c.createGain()
  const level = vol * 1.8
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
  if (!current) return
  clearTimeout(current.timer)
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
export function playNotes(midis, { kind = 'chord', arpeggio = false, instrument = 'keyboard', onEnd } = {}) {
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
        sorted.forEach((midi, i) => events.push({ midi, at: total + i * 0.17, dur: 1.2, vol: 0.45 }))
        total += 1.2
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
    // accordo in arpeggio: su e poi di nuovo giù-su più lento
    const step = 0.3
    const noteDur = 1.1
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
    const step = 0.32
    const noteDur = 0.7
    midis.forEach((midi, i) => events.push({ midi, at: total + i * step, dur: noteDur, vol: 0.45 }))
    total += (midis.length - 1) * step + noteDur + 0.15 // 2) arpeggio
    block(1.8) // 3) di nuovo insieme
  }

  const t0 = c.currentTime + 0.05
  preloadSamples(instrument)
  events.forEach((e) => {
    const smp = nearestSample(instrument, e.midi)
    if (smp) sampleTone(c, master, smp, e.midi, t0 + e.at, e.dur, e.vol)
    else tone(c, master, e.midi, t0 + e.at, e.dur, e.vol)
  })
  const timer = setTimeout(() => {
    current = null
    onEnd?.()
  }, total * 1000 + 100)
  current = { master, timer }
}
