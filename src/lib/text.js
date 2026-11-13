// Box gialli "Da ricordare" e formule: se contengono più esempi separati da " · " (o da " — ")
// ognuno va su una riga. Gli elenchi di sigle brevi (I · ii · iii...) restano su una riga sola.
export function splitLines(text) {
  if (!text) return []
  const lines = []
  text.split(' \u2014 ').forEach((chunk) => {
    const parts = chunk.split(' \u00b7 ')
    const long = parts.filter((p) => /\s/.test(p.trim())).length
    if (parts.length > 1 && long >= 2) lines.push(...parts)
    else lines.push(chunk)
  })
  return lines
}
