import { useState } from 'react'
import data from '../data/mechatronicsData.json'
import './Pages.css'

export default function StudyGuide() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...data.categories]

  const filtered = data.flashcards.filter(card => {
    const matchesCat = activeCategory === 'All' || card.category === activeCategory
    const matchesSearch = search === '' ||
      card.term.toLowerCase().includes(search.toLowerCase()) ||
      card.definition.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  const grouped = {}
  filtered.forEach(card => {
    if (!grouped[card.category]) grouped[card.category] = []
    grouped[card.category].push(card)
  })

  return (
    <div className="fade-in">
      <h1 className="page-heading">Dictionary</h1>
      <p className="page-desc">Every term you need for a perfect score, organized by unit.</p>

      <input
        type="text"
        className="search-box"
        placeholder="Search terms or definitions..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="filter-row">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {Object.keys(grouped).length === 0 && (
        <p className="empty-state">No results match your search.</p>
      )}

      {Object.entries(grouped).map(([category, cards]) => (
        <div key={category} className="guide-section">
          <h2 className="section-heading">{category} <span className="section-count">{cards.length}</span></h2>
          <div className="term-grid">
            {cards.map((card, i) => (
              <div key={i} className="term-card">
                <h3 className="term-name">{card.term}</h3>
                <p className="term-def">{card.definition}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
