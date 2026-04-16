import { useMemo } from 'react'
import { getScores } from '../utils/storage'
import './Pages.css'

export default function Progress() {
  const scores = useMemo(() => getScores('nocti_scores'), [])

  if (scores.length === 0) {
    return (
      <div className="fade-in">
        <h1 className="page-heading">Progress</h1>
        <p className="page-desc">Your improvement over time will appear here after you take a quiz or assessment.</p>
        <p className="empty-state">No data yet — go take a quiz!</p>
      </div>
    )
  }

  const avg = Math.round(scores.reduce((a, s) => a + s.percent, 0) / scores.length)
  const best = Math.max(...scores.map(s => s.percent))
  const latest = scores[scores.length - 1]?.percent ?? 0

  // SVG line graph dimensions
  const W = 800, H = 200, PAD = 40
  const graphW = W - PAD * 2, graphH = H - PAD * 2
  const n = scores.length

  const points = scores.map((s, i) => {
    const x = PAD + (n === 1 ? graphW / 2 : (i / (n - 1)) * graphW)
    const y = PAD + graphH - (s.percent / 100) * graphH
    return { x, y, pct: s.percent, type: s.type }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const areaPath = linePath + ` L${points[points.length - 1].x},${PAD + graphH} L${points[0].x},${PAD + graphH} Z`

  return (
    <div className="fade-in">
      <h1 className="page-heading">Progress</h1>
      <p className="page-desc">Track your improvement across quizzes and assessments.</p>

      {/* Line Graph */}
      <div className="line-chart-wrapper">
        <svg viewBox={`0 0 ${W} ${H}`} className="line-chart-svg">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(pct => {
            const y = PAD + graphH - (pct / 100) * graphH
            return (
              <g key={pct}>
                <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="var(--border-color)" strokeDasharray="4 4" />
                <text x={PAD - 8} y={y + 4} textAnchor="end" fill="var(--text-secondary)" fontSize="11" fontWeight="500">{pct}%</text>
              </g>
            )
          })}

          {/* Gradient fill under line */}
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#areaGrad)" />

          {/* Line */}
          <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Dots */}
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="5" fill="var(--bg-surface)" stroke="var(--accent)" strokeWidth="2.5" />
              <text x={p.x} y={p.y - 12} textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="700">{p.pct}%</text>
            </g>
          ))}
        </svg>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card"><span className="stat-value">{scores.length}</span><span className="stat-label">Total Attempts</span></div>
        <div className="stat-card"><span className="stat-value">{avg}%</span><span className="stat-label">Average</span></div>
        <div className="stat-card"><span className="stat-value">{best}%</span><span className="stat-label">Best</span></div>
        <div className="stat-card"><span className="stat-value">{latest}%</span><span className="stat-label">Latest</span></div>
      </div>

      {/* History */}
      <div style={{ marginTop: 32 }}>
        <h2 className="section-heading">History</h2>
        <div className="results-review">
          {scores.slice().reverse().map((s, i) => (
            <div key={i} className={`review-card ${s.percent >= 80 ? 'correct' : s.percent >= 50 ? 'skipped' : 'wrong'}`}>
              <div className="review-q-row">
                <span className="review-num">{scores.length - i}</span>
                <p className="review-q">{s.type} — {s.val}/{s.total}</p>
                <span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 18 }}>{s.percent}%</span>
              </div>
              <p className="review-answer">{new Date(s.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
