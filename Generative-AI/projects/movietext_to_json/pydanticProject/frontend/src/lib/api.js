import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
})

export async function parseMovie(text) {
  const { data } = await api.post('/parse', { text })
  return data
}

export async function checkHealth() {
  const { data } = await api.get('/health')
  return data
}
