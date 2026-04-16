export const saveScore = (key, scoreData) => {
  try {
    const history = JSON.parse(localStorage.getItem(key) || '[]')
    history.push({ ...scoreData, timestamp: new Date().toISOString() })
    localStorage.setItem(key, JSON.stringify(history))
  } catch (err) {
    console.error('Failed to save score', err)
  }
}

export const getScores = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    return []
  }
}

// Track missed questions: { questionId: { count, question, correct, category } }
export const trackMissed = (questionId, questionText, correctAnswer, category) => {
  try {
    const missed = JSON.parse(localStorage.getItem('nocti_missed') || '{}')
    if (!missed[questionId]) {
      missed[questionId] = { count: 0, question: questionText, correct: correctAnswer, category }
    }
    missed[questionId].count += 1
    localStorage.setItem('nocti_missed', JSON.stringify(missed))
  } catch (err) {
    console.error('Failed to track missed', err)
  }
}

export const getMissed = () => {
  try {
    const missed = JSON.parse(localStorage.getItem('nocti_missed') || '{}')
    return Object.entries(missed)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count)
  } catch {
    return []
  }
}

export const clearMissed = () => {
  localStorage.removeItem('nocti_missed')
}
