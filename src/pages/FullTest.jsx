import { useState } from 'react'
import classNames from 'classnames'
import { Bookmark } from 'lucide-react'
import data from '../data/mechatronicsData.json'
import { saveScore, trackMissed, getScores } from '../utils/storage'
import './Pages.css'

export default function FullTest() {
  const [phase, setPhase] = useState('landing')
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [bookmarks, setBookmarks] = useState(new Set())

  const toggleBookmark = (idx) => setBookmarks(prev => { const n = new Set(prev); n.has(idx) ? n.delete(idx) : n.add(idx); return n })

  const startTest = () => {
    const shuffled = [...data.questions]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setQuestions(shuffled)
    setAnswers({})
    setBookmarks(new Set())
    setCurrentIdx(0)
    setPhase('active')
  }

  const handleAnswer = (optIdx) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: optIdx }))
  }

  const submitTest = () => {
    let score = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) score++
      else if (answers[i] !== undefined) trackMissed(q.id, q.question, q.options[q.correct], q.category)
    })
    saveScore('nocti_scores', { val: score, total: questions.length, percent: Math.round((score / questions.length) * 100), type: 'Full Test' })
    setPhase('results')
  }

  // ── LANDING ──
  if (phase === 'landing') {
    const history = getScores('nocti_scores')
    return (
      <div className="fade-in">
        <h1 className="page-heading">Full Assessment</h1>
        <p className="page-desc">Simulate the real NOCTI exam with all {data.questions.length} questions.</p>
        <div className="setup-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: 8 }}>📝</p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>{data.questions.length} questions from all units</p>
          <button className="start-btn" onClick={startTest}>Begin Assessment</button>
        </div>
        {history.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <h2 className="section-heading">Past Scores</h2>
            <div className="scores-grid">
              {history.slice().reverse().map((h, i) => (
                <div key={i} className="score-card">
                  <span className="score-pct">{h.percent}%</span>
                  <span className="score-detail">{h.val}/{h.total} · {h.type}</span>
                  <span className="score-date">{new Date(h.timestamp).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── RESULTS ──
  if (phase === 'results') {
    const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0)
    const pct = Math.round((score / questions.length) * 100)
    const bookmarkedList = [...bookmarks].sort((a, b) => a - b)

    return (
      <div className="fade-in">
        <div className="results-hero">
          <span className={classNames('results-pct', { perfect: pct === 100 })}>{pct}%</span>
          <p className="results-sub">{score} of {questions.length} correct</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="start-btn" onClick={() => setPhase('landing')}>Dashboard</button>
            <button className="ctrl-btn" onClick={() => { setCurrentIdx(0); setPhase('review') }}>Review All</button>
            {bookmarkedList.length > 0 && (
              <button className="ctrl-btn" style={{ color: '#f5a623' }} onClick={() => { setCurrentIdx(bookmarkedList[0]); setPhase('review') }}>
                <Bookmark size={14} style={{ marginRight: 6 }} /> Bookmarked ({bookmarkedList.length})
              </button>
            )}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h3 className="section-heading">Jump to Question</h3>
          <div className="jump-grid">
            {questions.map((q, i) => {
              const correct = answers[i] === q.correct
              const skipped = answers[i] === undefined
              const cls = skipped ? 'jump-skip' : correct ? 'jump-correct' : 'jump-wrong'
              return (
                <button key={i} className={`jump-btn ${cls} ${bookmarks.has(i) ? 'jump-bookmarked' : ''}`}
                  onClick={() => { setCurrentIdx(i); setPhase('review') }}>
                  {i + 1}
                </button>
              )
            })}
          </div>
        </div>

        <div className="results-review">
          {questions.map((q, i) => {
            const userAns = answers[i]
            const isCorrect = userAns === q.correct
            const wasSkipped = userAns === undefined
            return (
              <div key={i} className={classNames('review-card', { correct: isCorrect, wrong: !isCorrect && !wasSkipped, skipped: wasSkipped })}>
                <div className="review-q-row">
                  <span className="review-num">{i + 1}</span>
                  <p className="review-q">{q.question}</p>
                  {bookmarks.has(i) && <Bookmark size={14} style={{ color: '#f5a623', marginLeft: 'auto', flexShrink: 0 }} />}
                </div>
                <p className="review-answer">Your answer: <strong>{wasSkipped ? 'Skipped' : q.options[userAns]}</strong></p>
                {!isCorrect && !wasSkipped && <p className="review-correct">Correct: <strong>{q.options[q.correct]}</strong></p>}
                {!isCorrect && <p className="review-exp">{q.explanation}</p>}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ── REVIEW ──
  if (phase === 'review') {
    const q = questions[currentIdx]
    const userAns = answers[currentIdx]
    const isCorrect = userAns === q.correct
    return (
      <div className="fade-in">
        <div className="quiz-topbar">
          <span className="quiz-progress">Review: {currentIdx + 1} / {questions.length}</span>
          <span className="quiz-unit-badge">{q.category}</span>
        </div>
        <h2 className="quiz-question">{q.question}</h2>
        <div className="quiz-options-list">
          {q.options.map((opt, i) => {
            let cls = 'quiz-opt'
            if (i === q.correct) cls += ' opt-correct'
            else if (userAns === i && !isCorrect) cls += ' opt-wrong'
            else cls += ' opt-dim'
            return <div key={i} className={cls}><span className="opt-letter">{String.fromCharCode(65 + i)}</span><span className="opt-text">{opt}</span></div>
          })}
        </div>
        <div className={classNames('inline-feedback', isCorrect ? 'fb-correct' : 'fb-wrong')} style={{ marginTop: 20 }}>
          <strong>{isCorrect ? '✓ Correct' : userAns !== undefined ? '✗ Incorrect' : 'Skipped'}</strong>
          <p>{q.explanation}</p>
        </div>
        <div className="quiz-nav" style={{ marginTop: 32 }}>
          <button className="ctrl-btn" disabled={currentIdx === 0} onClick={() => setCurrentIdx(i => i - 1)}>← Previous</button>
          <button className="ctrl-btn" onClick={() => setPhase('results')}>Back to Results</button>
          <button className="ctrl-btn primary" disabled={currentIdx === questions.length - 1} onClick={() => setCurrentIdx(i => i + 1)}>Next →</button>
        </div>
      </div>
    )
  }

  // ── ACTIVE ──
  const q = questions[currentIdx]
  return (
    <div className="fade-in">
      <div className="quiz-topbar">
        <span className="quiz-progress">{currentIdx + 1} / {questions.length}</span>
        <button className={classNames('bookmark-btn', { active: bookmarks.has(currentIdx) })} onClick={() => toggleBookmark(currentIdx)} title="Bookmark">
          <Bookmark size={16} />
        </button>
        <span className="quiz-unit-badge">{q.category}</span>
      </div>
      <div className="quiz-progress-bar"><div className="quiz-progress-fill" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} /></div>

      <h2 className="quiz-question">{q.question}</h2>
      <div className="quiz-options-list">
        {q.options.map((opt, i) => (
          <button key={i} className={classNames('quiz-opt', { 'opt-selected': answers[currentIdx] === i })} onClick={() => handleAnswer(i)}>
            <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
            <span className="opt-text">{opt}</span>
          </button>
        ))}
      </div>
      <div className="quiz-nav">
        <button className="ctrl-btn" disabled={currentIdx === 0} onClick={() => setCurrentIdx(i => i - 1)}>← Previous</button>
        {currentIdx < questions.length - 1 ? (
          <button className="ctrl-btn primary" onClick={() => setCurrentIdx(i => i + 1)}>Next →</button>
        ) : (
          <button className="ctrl-btn finish" onClick={submitTest}>Submit</button>
        )}
      </div>
    </div>
  )
}
