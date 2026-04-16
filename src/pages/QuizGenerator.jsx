import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Bookmark } from 'lucide-react'
import data from '../data/mechatronicsData.json'
import { saveScore, trackMissed, getMissed } from '../utils/storage'
import './Pages.css'

export default function QuizGenerator() {
  const [phase, setPhase] = useState('setup')
  const [selectedUnits, setSelectedUnits] = useState(new Set(data.categories))
  const [difficulty, setDifficulty] = useState(new Set(['Easy', 'Medium', 'Hard']))
  const [numQuestions, setNumQuestions] = useState(10)
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(15)
  const [timeLeft, setTimeLeft] = useState(0)
  const [useMissedOnly, setUseMissedOnly] = useState(false)

  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [bookmarks, setBookmarks] = useState(new Set())

  useEffect(() => {
    if (phase !== 'active' || !timerEnabled || timeLeft <= 0) return
    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(id); finishQuiz(); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [phase, timerEnabled, timeLeft])

  const toggleUnit = (u) => setSelectedUnits(prev => { const n = new Set(prev); n.has(u) ? n.delete(u) : n.add(u); return n })
  const toggleDiff = (d) => setDifficulty(prev => { const n = new Set(prev); n.has(d) ? n.delete(d) : n.add(d); return n })
  const toggleBookmark = (idx) => setBookmarks(prev => { const n = new Set(prev); n.has(idx) ? n.delete(idx) : n.add(idx); return n })

  const missedData = getMissed()
  const missedIds = new Set(missedData.map(m => parseInt(m.id)))

  const startQuiz = () => {
    if (selectedUnits.size === 0) return

    let pool
    if (useMissedOnly && missedIds.size > 0) {
      // Only use questions the user has gotten wrong before
      pool = data.questions.filter(q => missedIds.has(q.id) && selectedUnits.has(q.category))
      if (pool.length === 0) pool = data.questions.filter(q => missedIds.has(q.id))
    } else {
      pool = data.questions.filter(q => selectedUnits.has(q.category) && difficulty.has(q.difficulty))
      if (pool.length === 0) pool = data.questions.filter(q => selectedUnits.has(q.category))
    }

    // Fisher-Yates shuffle for true randomization
    const shuffled = [...pool]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    // Cap to pool size — NEVER repeat questions
    const count = Math.min(Math.max(1, numQuestions), shuffled.length)
    const qs = shuffled.slice(0, count).map((q, i) => ({ ...q, _uid: i }))
    setQuestions(qs)
    setAnswers({})
    setBookmarks(new Set())
    setCurrentIdx(0)
    setTimeLeft(timerMinutes * 60)
    setPhase('active')
  }

  const handleSelect = (optIdx) => {
    if (answers[currentIdx] !== undefined) return
    const q = questions[currentIdx]
    const isCorrect = optIdx === q.correct
    setAnswers(prev => ({ ...prev, [currentIdx]: { selected: optIdx, correct: isCorrect } }))
    if (!isCorrect) trackMissed(q.id, q.question, q.options[q.correct], q.category)
  }

  const finishQuiz = () => {
    const score = Object.values(answers).filter(a => a.correct).length
    saveScore('nocti_scores', { val: score, total: questions.length, percent: Math.round((score / questions.length) * 100), type: useMissedOnly ? 'Missed Review' : 'Quiz' })
    setPhase('results')
  }

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  // ── SETUP ──
  if (phase === 'setup') {
    return (
      <div className="fade-in">
        <h1 className="page-heading">Quiz</h1>
        <p className="page-desc">Configure your practice session.</p>
        <div className="setup-card">
          {/* Practice Missed toggle */}
          {missedData.length > 0 && (
            <div className="setup-section">
              <label className="cb-label missed-toggle" style={{ background: useMissedOnly ? 'var(--error-bg)' : undefined, borderColor: useMissedOnly ? 'var(--error)' : undefined }}>
                <input type="checkbox" checked={useMissedOnly} onChange={() => setUseMissedOnly(!useMissedOnly)} />
                <span>🔥 Practice Most Missed ({missedData.length} questions)</span>
              </label>
            </div>
          )}

          <div className="setup-section">
            <label className="setup-label">Units</label>
            <div className="checkbox-grid">
              {data.categories.map(cat => (
                <label key={cat} className="cb-label">
                  <input type="checkbox" checked={selectedUnits.has(cat)} onChange={() => toggleUnit(cat)} />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {!useMissedOnly && (
            <div className="setup-section">
              <label className="setup-label">Difficulty</label>
              <div className="checkbox-grid">
                {['Easy', 'Medium', 'Hard'].map(d => (
                  <label key={d} className="cb-label">
                    <input type="checkbox" checked={difficulty.has(d)} onChange={() => toggleDiff(d)} />
                    <span>{d}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="setup-row">
            <div className="setup-section" style={{ flex: 1 }}>
              <label className="setup-label">Number of questions</label>
              <input type="number" className="num-input" min={1} max={60} value={numQuestions} onChange={e => setNumQuestions(parseInt(e.target.value) || 1)} />
            </div>
            <div className="setup-section" style={{ flex: 1 }}>
              <label className="setup-label">
                <input type="checkbox" checked={timerEnabled} onChange={() => setTimerEnabled(!timerEnabled)} style={{ marginRight: 8 }} />
                Timer (minutes)
              </label>
              <input type="number" className="num-input" min={1} max={180} value={timerMinutes} disabled={!timerEnabled} onChange={e => setTimerMinutes(parseInt(e.target.value) || 1)} />
            </div>
          </div>
          <button className="start-btn" onClick={startQuiz} disabled={selectedUnits.size === 0}>Start Quiz</button>
        </div>
      </div>
    )
  }

  // ── RESULTS ──
  if (phase === 'results') {
    const score = Object.values(answers).filter(a => a.correct).length
    const pct = Math.round((score / questions.length) * 100)
    const bookmarkedList = [...bookmarks].sort((a, b) => a - b)
    return (
      <div className="fade-in">
        <div className="results-hero">
          <span className={classNames('results-pct', { perfect: pct === 100 })}>{pct}%</span>
          <p className="results-sub">{score} of {questions.length} correct</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="start-btn" onClick={() => setPhase('setup')}>New Quiz</button>
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
            {questions.map((_, i) => {
              const a = answers[i]
              const cls = a ? (a.correct ? 'jump-correct' : 'jump-wrong') : 'jump-skip'
              return <button key={i} className={`jump-btn ${cls} ${bookmarks.has(i) ? 'jump-bookmarked' : ''}`} onClick={() => { setCurrentIdx(i); setPhase('review') }}>{i + 1}</button>
            })}
          </div>
        </div>
        <div className="results-review">
          {questions.map((q, i) => {
            const a = answers[i]; const isCorrect = a?.correct; const wasSkipped = a === undefined
            return (
              <div key={i} className={classNames('review-card', { correct: isCorrect, wrong: !isCorrect && !wasSkipped, skipped: wasSkipped })}>
                <div className="review-q-row">
                  <span className="review-num">{i + 1}</span>
                  <p className="review-q">{q.question}</p>
                  {bookmarks.has(i) && <Bookmark size={14} style={{ color: '#f5a623', marginLeft: 'auto', flexShrink: 0 }} />}
                </div>
                {!wasSkipped && (<><p className="review-answer">Your answer: <strong>{q.options[a.selected]}</strong></p>{!isCorrect && <p className="review-correct">Correct: <strong>{q.options[q.correct]}</strong></p>}<p className="review-exp">{q.explanation}</p></>)}
                {wasSkipped && <p className="review-answer">Skipped</p>}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ── REVIEW ──
  if (phase === 'review') {
    const q = questions[currentIdx]; const a = answers[currentIdx]
    return (
      <div className="fade-in">
        <div className="quiz-topbar"><span className="quiz-progress">Review: {currentIdx + 1} / {questions.length}</span><span className="quiz-unit-badge">{q.category}</span></div>
        <h2 className="quiz-question">{q.question}</h2>
        <div className="quiz-options-list">
          {q.options.map((opt, i) => {
            let cls = 'quiz-opt'
            if (i === q.correct) cls += ' opt-correct'
            else if (a?.selected === i && !a?.correct) cls += ' opt-wrong'
            else cls += ' opt-dim'
            return <div key={i} className={cls}><span className="opt-letter">{String.fromCharCode(65 + i)}</span><span className="opt-text">{opt}</span></div>
          })}
        </div>
        <div className={classNames('inline-feedback', a?.correct ? 'fb-correct' : 'fb-wrong')} style={{ marginTop: 20 }}>
          <strong>{a?.correct ? '✓ Correct' : a ? '✗ Incorrect' : 'Skipped'}</strong><p>{q.explanation}</p>
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
  const q = questions[currentIdx]; const curAnswer = answers[currentIdx]; const answered = curAnswer !== undefined
  return (
    <div className="fade-in">
      <div className="quiz-topbar">
        <span className="quiz-progress">{currentIdx + 1} / {questions.length}</span>
        {timerEnabled && <span className="quiz-timer">{formatTime(timeLeft)}</span>}
        <button className={classNames('bookmark-btn', { active: bookmarks.has(currentIdx) })} onClick={() => toggleBookmark(currentIdx)} title="Bookmark"><Bookmark size={16} /></button>
        <span className="quiz-unit-badge">{q.category}</span>
      </div>
      <div className="quiz-progress-bar"><div className="quiz-progress-fill" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} /></div>
      <h2 className="quiz-question">{q.question}</h2>
      <div className="quiz-options-list">
        {q.options.map((opt, i) => {
          let cls = 'quiz-opt'
          if (answered) { if (i === q.correct) cls += ' opt-correct'; else if (curAnswer.selected === i && !curAnswer.correct) cls += ' opt-wrong'; else cls += ' opt-dim' }
          return <button key={i} className={cls} onClick={() => handleSelect(i)}><span className="opt-letter">{String.fromCharCode(65 + i)}</span><span className="opt-text">{opt}</span></button>
        })}
      </div>
      {answered && (<div className={classNames('inline-feedback', curAnswer.correct ? 'fb-correct' : 'fb-wrong')}><strong>{curAnswer.correct ? '✓ Correct' : '✗ Incorrect'}</strong><p>{q.explanation}</p></div>)}
      <div className="quiz-nav">
        <button className="ctrl-btn" disabled={currentIdx === 0} onClick={() => setCurrentIdx(i => i - 1)}>← Previous</button>
        {currentIdx < questions.length - 1 ? <button className="ctrl-btn primary" disabled={!answered} onClick={() => setCurrentIdx(i => i + 1)}>Next →</button> : <button className="ctrl-btn finish" onClick={finishQuiz}>Finish</button>}
      </div>
    </div>
  )
}
