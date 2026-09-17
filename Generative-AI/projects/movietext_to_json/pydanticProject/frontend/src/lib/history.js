const HISTORY_KEY = 'ai-extractor-history'

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  } catch {
    return []
  }
}

export function addHistoryItem(item) {
  const prev = getHistory()
  const next = [
    {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...item,
    },
    ...prev,
  ].slice(0, 50)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
  return next
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY)
  return []
}
