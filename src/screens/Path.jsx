import StageNode from '../components/StageNode'
import { CHAPTERS, INTRO } from '../data/chapters'
import { chapterStatus } from '../lib/progress'
import pollyCelebrate from '../images/polly-celebrate.webp' // la Polly festante di fine quiz

const ROW = 210 // altezza di ogni tappa, in px
const TOP = 24
const LEFT = 20 // posizione orizzontale (%) delle tappe a sinistra
const RIGHT = 80
const HALF = 44 // metà del diametro della tappa

export default function Path({ completed, onOpen }) {
  const items = [
    { kind: 'intro', ...INTRO },
    ...CHAPTERS.map((c) => ({ kind: 'chapter', id: c.n, number: c.n, title: c.title })),
  ]
  const finished = CHAPTERS.every((c) => completed.includes(c.n)) // percorso completato: Polly festeggia in fondo
  const height = TOP + items.length * ROW + 24 + (finished ? 190 : 0)
  const center = (i) => ({ x: i % 2 === 0 ? LEFT : RIGHT, y: TOP + i * ROW + HALF })

  const segments = items.slice(0, -1).map((_, i) => {
    const a = center(i)
    const b = center(i + 1)
    const d = `M ${a.x} ${a.y} C ${a.x} ${a.y + ROW * 0.65}, ${b.x} ${b.y - ROW * 0.65}, ${b.x} ${b.y}`
    return <path key={i} d={d} vectorEffect="non-scaling-stroke" />
  })

  return (
    <div className="path" style={{ height }}>
      <svg
        className="path-line"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {segments}
      </svg>
      {items.map((item, i) => (
        <StageNode
          key={item.id}
          kind={item.kind}
          number={item.number}
          title={item.title}
          status={item.kind === 'chapter' ? chapterStatus(item.number, completed) : undefined}
          progress={0}
          left={center(i).x}
          top={TOP + i * ROW}
          onOpen={() => onOpen(item)}
        />
      ))}
      {finished && <img className="path-polly" src={pollyCelebrate} alt="Polly festeggia: hai completato il percorso!" />}
    </div>
  )
}
