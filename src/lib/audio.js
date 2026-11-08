// Suono provvisorio con la Web Audio API (nessuna libreria).
// Verrà sostituito dai campioni di tastiera, chitarra e basso.
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

// midis: elenco di note; sequence=true le suona una dopo l'altra (scale), altrimenti insieme (accordi)
export function playNotes(midis, { sequence = false, onEnd } = {}) {
  stopPlaying()
  const c = getCtx()
  if (!c || midis.length === 0) {
    onEnd?.()
    return
  }
  const master = c.createGain()
  master.gain.value = 0.5
  master.connect(c.destination)
  const t0 = c.currentTime + 0.05
  const step = 0.3
  const dur = sequence ? 0.55 : 1.8
  const vol = sequence ? 0.5 : 0.3 / Math.sqrt(midis.length)
  midis.forEach((m, i) => tone(c, master, m, t0 + (sequence ? i * step : 0), dur, vol))
  const total = (sequence ? (midis.length - 1) * step : 0) + dur
  const timer = setTimeout(() => {
    current = null
    onEnd?.()
  }, total * 1000 + 100)
  current = { master, timer }
}
