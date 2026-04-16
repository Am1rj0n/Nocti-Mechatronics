import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import './Chatbot.css'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hey! Ask me anything about the NOCTI Mechatronics exam and I\'ll explain it.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    const userText = input.trim()
    setMessages(prev => [...prev, { role: 'user', text: userText }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'driaforall/tiny-agent-a:0.5b',
          prompt: userText,
          stream: false,
          system: 'You are a NOCTI Mechatronics Level 1 tutor. Give clear, concise, accurate answers about safety, electrical, mechanical, hydraulic/pneumatic systems, instrumentation, and control systems.'
        })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', text: data.response }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Could not reach Ollama. Make sure it\'s running on localhost:11434.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button className={`imsg-fab ${open ? 'hidden' : ''}`} onClick={() => setOpen(true)}>
        <MessageCircle size={26} />
      </button>

      {/* Chat window */}
      <div className={`imsg-window ${open ? 'open' : ''}`}>
        {/* Header */}
        <div className="imsg-header">
          <div className="imsg-contact">
            <div className="imsg-avatar">AI</div>
            <div>
              <div className="imsg-name">AI Tutor</div>
              <div className="imsg-status">Ollama · tiny-agent-a</div>
            </div>
          </div>
          <button className="imsg-close" onClick={() => setOpen(false)}><X size={18} /></button>
        </div>

        {/* Messages */}
        <div className="imsg-body">
          {messages.map((m, i) => (
            <div key={i} className={`imsg-row ${m.role}`}>
              <div className={`imsg-bubble ${m.role}`}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div className="imsg-row assistant">
              <div className="imsg-bubble assistant typing">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <form className="imsg-input-bar" onSubmit={send}>
          <input
            type="text"
            placeholder="iMessage"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" disabled={!input.trim() || loading} className="imsg-send">
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  )
}
