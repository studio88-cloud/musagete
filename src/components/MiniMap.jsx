import { KEYS, TOTAL_W, WHITE_COUNT } from '../lib/keys'

const MAP_W = 176
const MAP_H = 44
const WHITE = MAP_W / WHITE_COUNT

// view: { x, w, total } della tastiera grande; onJump(x) la sposta
export default function MiniMap({ view, onJump }) {
  const scale = MAP_W / TOTAL_W
  const win = { x: view.x * scale, w: Math.min(MAP_W, view.w * scale) }

  const jump = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    onJump(ratio * TOTAL_W - view.w / 2)
  }

  return (
    <div className="minimap" onClick={jump} role="presentation">
      <svg width={MAP_W} height={MAP_H} viewBox={`0 0 ${MAP_W} ${MAP_H}`} aria-hidden="true">
        {KEYS.filter((k) => k.white).map((k) => (
          <rect key={k.midi} x={k.x * scale} y="0" width={WHITE - 0.6} height={MAP_H} rx="1" fill="#f5f3ff" />
        ))}
        {KEYS.filter((k) => !k.white).map((k) => (
          <rect key={k.midi} x={k.x * scale} y="0" width={5} height={MAP_H * 0.6} rx="1" fill="#7c3aed" />
        ))}
        <rect
          x={win.x + 1}
          y="1"
          width={Math.max(8, win.w - 2)}
          height={MAP_H - 2}
          rx="8"
          fill="rgba(226, 182, 89, 0.28)"
          stroke="#e2b659"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}
