const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function postJson(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.detail || 'Request failed')
  }

  return data
}

export const runPipeline = (raw_input) => postJson('/api/pipeline', { raw_input })

export const runAnalyzer = (raw_text) => postJson('/api/analyze', { raw_text })

export const runChat = (programme, message) =>
  postJson('/api/chat', { programme, message })

export const runLinkedIn = (topic) => postJson('/api/linkedin', { topic })
