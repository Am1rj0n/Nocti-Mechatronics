import { useMemo } from 'react'
import { getMissed, clearMissed } from '../utils/storage'
import data from '../data/mechatronicsData.json'
import './Pages.css'

export default function MissedQuestions() {
  const missed = useMemo(() => getMissed(), [])

  // Group by category
  const byCategory = {}
  missed.forEach(m => {
    if (!byCategory[m.category]) byCategory[m.category] = []
    byCategory[m.category].push(m)
  })

  if (missed.length === 0) {
    return (
      <div className="fade-in">
        <h1 className="page-heading">Missed Questions</h1>
        <p className="page-desc">Questions you get wrong are tracked here so you can focus on weak areas.</p>
        <p className="empty-state">No missed questions yet. Keep studying!</p>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="page-header-row">
        <div>
          <h1 className="page-heading">Missed Questions</h1>
          <p className="page-desc">{missed.length} questions tracked, sorted by frequency.</p>
        </div>
        <button className="ctrl-btn" onClick={() => { clearMissed(); window.location.reload() }} style={{ color: 'var(--error)' }}>
          Clear All
        </button>
      </div>

      {/* Top missed overall */}
      <div className="missed-list">
        {missed.map((m, i) => (
          <div key={i} className="missed-card">
            <div className="missed-count">{m.count}×</div>
            <div className="missed-info">
              <p className="missed-q">{m.question}</p>
              <p className="missed-correct">Correct answer: <strong>{m.correct}</strong></p>
              <span className="missed-cat">{m.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Breakdown by category */}
      <div style={{ marginTop: 40 }}>
        <h2 className="section-heading">Weak Areas by Unit</h2>
        <div className="stats-row" style={{ marginBottom: 24 }}>
          {Object.entries(byCategory).sort((a, b) => b[1].length - a[1].length).map(([cat, items]) => (
            <div key={cat} className="stat-card">
              <span className="stat-value" style={{ color: 'var(--error)' }}>{items.reduce((a, m) => a + m.count, 0)}</span>
              <span className="stat-label">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
