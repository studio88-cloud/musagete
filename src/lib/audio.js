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

// midis: elenco di note
// kind 'scale': le note una dopo l'altra
// kind 'chord': accordo insieme (block), poi in arpeggio, poi di nuovo insieme
// arpeggio: chitarra e basso non suonano mai le note insieme, ma una dopo l'altra
export function playNotes(midis, { kind = 'chord', arpeggio = false, onEnd } = {}) {
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

  if (kind === 'progression') {
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
  events.forEach((e) => tone(c, master, e.midi, t0 + e.at, e.dur, e.vol))
  const timer = setTimeout(() => {
    current = null
    onEnd?.()
  }, total * 1000 + 100)
  current = { master, timer }
}
