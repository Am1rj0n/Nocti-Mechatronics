import { useState, useMemo, useCallback } from 'react'
import classNames from 'classnames'
import { Shuffle } from 'lucide-react'
import data from '../data/mechatronicsData.json'
import './Pages.css'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Flashcards() {
  const [cardIndex, setCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [shuffled, setShuffled] = useState(false)
  const [shuffleKey, setShuffleKey] = useState(0)

  const categories = ['All', ...data.categories]

  const cards = useMemo(() => {
    let pool = selectedCategory === 'All'
      ? data.flashcards
      : data.flashcards.filter(f => f.category === selectedCategory)
    if (shuffled) pool = shuffleArray(pool)
    return pool
  }, [selectedCategory, shuffled, shuffleKey])

  const handleNext = () => {
    setIsFlipped(false)
    setTimeout(() => setCardIndex(prev => (prev + 1) % cards.length), 100)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setTimeout(() => setCardIndex(prev => (prev - 1 + cards.length) % cards.length), 100)
  }

  const handleShuffle = () => {
    setShuffled(true)
    setShuffleKey(k => k + 1)
    setCardIndex(0)
    setIsFlipped(false)
  }

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat)
    setCardIndex(0)
    setIsFlipped(false)
  }

  if (cards.length === 0) {
    return <div className="fade-in"><p className="empty-state">No flashcards for this unit.</p></div>
  }

  const card = cards[cardIndex]

  return (
    <div className="fade-in">
      <div className="page-header-row">
        <div>
          <h1 className="page-heading">Flashcards</h1>
          <p className="page-desc">{cards.length} cards {selectedCategory !== 'All' ? `in ${selectedCategory}` : 'total'}</p>
        </div>
        <button className="ctrl-btn" onClick={handleShuffle} title="Shuffle cards">
          <Shuffle size={16} style={{ marginRight: 6 }} /> Shuffle
        </button>
      </div>

      <div className="filter-row">
        {categories.map(cat => (
          <button
            key={cat}
            className={classNames('filter-pill', { active: selectedCategory === cat })}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flashcard-stage">
        <div
          className={classNames('fc', { flipped: isFlipped })}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="fc-inner">
            <div className="fc-face fc-front">
              <span className="fc-badge">{card.category}</span>
              <p className="fc-term">{card.term}</p>
              <span className="fc-hint">tap to reveal</span>
            </div>
            <div className="fc-face fc-back">
              <p className="fc-def">{card.definition}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fc-controls">
        <button className="ctrl-btn" onClick={handlePrev} disabled={cards.length <= 1}>←</button>
        <span className="fc-counter">{cardIndex + 1} / {cards.length}</span>
        <button className="ctrl-btn" onClick={handleNext} disabled={cards.length <= 1}>→</button>
      </div>
    </div>
  )
}
