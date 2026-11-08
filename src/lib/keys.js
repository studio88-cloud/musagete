// Geometria della tastiera: da Do3 a Do6 (3 ottave).
export const FIRST_MIDI = 48
export const LAST_MIDI = 84
export const WHITE_W = 52
export const BLACK_W = 28
export const WHITE_H = 267
export const BLACK_H = 162

const WHITE_PCS = [0, 2, 4, 5, 7, 9, 11]
export const isWhite = (midi) => WHITE_PCS.includes(midi % 12)

export const KEYS = []
{
  let whiteIndex = 0
  for (let midi = FIRST_MIDI; midi <= LAST_MIDI; midi++) {
    if (isWhite(midi)) {
      KEYS.push({ midi, white: true, x: whiteIndex * WHITE_W })
      whiteIndex++
    } else {
      // il tasto nero sta sul confine tra due bianchi, spostato di 3 px
      KEYS.push({ midi, white: false, x: whiteIndex * WHITE_W + 3 - BLACK_W / 2 })
    }
  }
}
export const WHITE_COUNT = KEYS.filter((k) => k.white).length
export const TOTAL_W = WHITE_COUNT * WHITE_W

// Posizione orizzontale del tasto bianco a cui appartiene la nota
export function scrollXFor(midi) {
  const key = KEYS.find((k) => k.midi === midi) ?? KEYS[0]
  if (key.white) return key.x
  return key.x + BLACK_W / 2 - 3 - WHITE_W
}
