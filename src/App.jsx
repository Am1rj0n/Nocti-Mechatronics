import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Sun, Moon, BookOpen, Layers, CheckCircle, ClipboardList, Menu, TrendingUp, AlertCircle, Github } from 'lucide-react'
import classNames from 'classnames'

import StudyGuide from './pages/StudyGuide'
import Flashcards from './pages/Flashcards'
import QuizGenerator from './pages/QuizGenerator'
import FullTest from './pages/FullTest'
import Progress from './pages/Progress'
import MissedQuestions from './pages/MissedQuestions'
import Chatbot from './components/Chatbot'

function Layout() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

  const links = [
    { to: '/', icon: <BookOpen size={18} />, label: 'Dictionary' },
    { to: '/flashcards', icon: <Layers size={18} />, label: 'Flashcards' },
    { to: '/quiz', icon: <CheckCircle size={18} />, label: 'Quiz' },
    { to: '/test', icon: <ClipboardList size={18} />, label: 'Assessment' },
    { to: '/progress', icon: <TrendingUp size={18} />, label: 'Progress' },
    { to: '/missed', icon: <AlertCircle size={18} />, label: 'Missed' },
  ]

  return (
    <div className="shell">
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={classNames('sidebar', { open: sidebarOpen })}>
        <nav className="sidebar-links">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={classNames('sidebar-link', { active: location.pathname === l.to })}>
              {l.icon}
              <span>{l.label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <a href="https://github.com/Am1rj0n/Nocti-Mechatronics" target="_blank" rel="noopener noreferrer" className="sidebar-social">
            <Github size={16} />
            <span>GitHub</span>
          </a>
          <button className="theme-toggle" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </aside>

      <main className="main">
        <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={20} />
        </button>
        <div className="content-scroll">
          <Routes>
            <Route path="/" element={<StudyGuide />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/quiz" element={<QuizGenerator />} />
            <Route path="/test" element={<FullTest />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/missed" element={<MissedQuestions />} />
          </Routes>
        </div>
      </main>

      <Chatbot />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}
