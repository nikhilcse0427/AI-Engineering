import { useState } from 'react'
import { runAnalyzer, runChat, runLinkedIn, runPipeline } from './api/client'
import './App.css'

const TABS = [
  {
    id: 'pipeline',
    label: 'Text Pipeline',
    description: 'Edit → Script → Hinglish conversion',
  },
  {
    id: 'analyzer',
    label: 'Safety Analyzer',
    description: 'Parallel toxicity, copyright & sensitivity scores',
  },
  {
    id: 'chat',
    label: 'College Assistant',
    description: 'RAG chatbot for academic & fee questions',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn Writer',
    description: 'AI post generator with reviewer loop',
  },
]

function ResultBlock({ title, children }) {
  if (!children) return null
  return (
    <div className="result-block">
      <h3>{title}</h3>
      <pre>{children}</pre>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('pipeline')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [pipelineInput, setPipelineInput] = useState('')
  const [pipelineResult, setPipelineResult] = useState(null)

  const [analyzerInput, setAnalyzerInput] = useState('')
  const [analyzerResult, setAnalyzerResult] = useState(null)

  const [programme, setProgramme] = useState('BCA')
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  const [linkedinTopic, setLinkedinTopic] = useState('')
  const [linkedinResult, setLinkedinResult] = useState(null)

  const currentTab = TABS.find((tab) => tab.id === activeTab)

  async function handlePipeline(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await runPipeline(pipelineInput)
      setPipelineResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleAnalyzer(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await runAnalyzer(analyzerInput)
      setAnalyzerResult(data.safety_score)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleChat(e) {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = chatInput.trim()
    setChatInput('')
    setLoading(true)
    setError('')

    setChatHistory((prev) => [...prev, { role: 'user', text: userMessage }])

    try {
      const data = await runChat(programme, userMessage)
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: data.reply, queryType: data.query_type },
      ])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleLinkedIn(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await runLinkedIn(linkedinTopic)
      setLinkedinResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">LangGraph Agents</p>
          <h1>Agentic AI Studio</h1>
          <p className="subtitle">
            Run your Python agent workflows from a simple React dashboard.
          </p>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id)
                setError('')
              }}
            >
              <span>{tab.label}</span>
              <small>{tab.description}</small>
            </button>
          ))}
        </aside>

        <main className="panel">
          <div className="panel-header">
            <h2>{currentTab.label}</h2>
            <p>{currentTab.description}</p>
          </div>

          {error && <div className="error-banner">{error}</div>}

          {activeTab === 'pipeline' && (
            <form onSubmit={handlePipeline} className="form">
              <label htmlFor="pipeline-input">Raw text</label>
              <textarea
                id="pipeline-input"
                rows={8}
                value={pipelineInput}
                onChange={(e) => setPipelineInput(e.target.value)}
                placeholder="Paste messy text to clean, script, and convert to Hinglish..."
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Run Pipeline'}
              </button>

              {pipelineResult && (
                <div className="results">
                  <ResultBlock title="Edited Text" children={pipelineResult.edited_text} />
                  <ResultBlock title="Script" children={pipelineResult.script_text} />
                  <ResultBlock title="Hinglish Script" children={pipelineResult.final_text} />
                </div>
              )}
            </form>
          )}

          {activeTab === 'analyzer' && (
            <form onSubmit={handleAnalyzer} className="form">
              <label htmlFor="analyzer-input">Content to analyze</label>
              <textarea
                id="analyzer-input"
                rows={8}
                value={analyzerInput}
                onChange={(e) => setAnalyzerInput(e.target.value)}
                placeholder="Paste text to score for toxicity, copyright risk, and cultural sensitivity..."
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Analyzing...' : 'Analyze Content'}
              </button>

              {analyzerResult && (
                <div className="score-grid">
                  {Object.entries(analyzerResult).map(([key, value]) => (
                    <div key={key} className="score-card">
                      <span>{key.replace(/_/g, ' ')}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              )}
            </form>
          )}

          {activeTab === 'chat' && (
            <div className="chat-panel">
              <div className="programme-row">
                <label htmlFor="programme">Programme</label>
                <select
                  id="programme"
                  value={programme}
                  onChange={(e) => setProgramme(e.target.value)}
                >
                  <option value="BCA">BCA</option>
                  <option value="BBA">BBA</option>
                  <option value="B.Com (H)">B.Com (H)</option>
                </select>
              </div>

              <div className="chat-history">
                {chatHistory.length === 0 && (
                  <p className="empty-state">
                    Ask about attendance, fees, exams, or general college info.
                  </p>
                )}
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`chat-bubble ${msg.role}`}>
                    <p>{msg.text}</p>
                    {msg.queryType && (
                      <span className="tag">Route: {msg.queryType}</span>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleChat} className="chat-form">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your question..."
                  disabled={loading}
                />
                <button type="submit" disabled={loading || !chatInput.trim()}>
                  {loading ? 'Thinking...' : 'Send'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'linkedin' && (
            <form onSubmit={handleLinkedIn} className="form">
              <label htmlFor="linkedin-topic">Topic</label>
              <input
                id="linkedin-topic"
                type="text"
                value={linkedinTopic}
                onChange={(e) => setLinkedinTopic(e.target.value)}
                placeholder="e.g. AI in healthcare, remote work, startup growth"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Generating...' : 'Generate LinkedIn Post'}
              </button>

              {linkedinResult && (
                <div className="results">
                  <div className="meta-row">
                    <span className={`status ${linkedinResult.is_approved ? 'approved' : 'pending'}`}>
                      {linkedinResult.is_approved ? 'Approved' : 'Needs improvement'}
                    </span>
                    <span className="meta">Attempts: {linkedinResult.attempts}</span>
                  </div>
                  <ResultBlock title="Final Draft" children={linkedinResult.draft} />
                  <ResultBlock title="Reviewer Feedback" children={linkedinResult.reviewer_feedback} />
                </div>
              )}
            </form>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
