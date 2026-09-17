import { Braces, Eraser, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import JsonViewer from '../components/JsonViewer'
import Loader from '../components/Loader'
import Textarea from '../components/Textarea'
import { useToast } from '../context/ToastContext'
import { parseMovie } from '../lib/api'
import { addHistoryItem } from '../lib/history'

const SAMPLE =
  'Inception (2010), directed by Christopher Nolan, is a mind-bending sci-fi thriller starring Leonardo DiCaprio, Joseph Gordon-Levitt, and Ellen Page. It explores dream infiltration and was a massive blockbuster hit, widely praised with around 4.5/5 ratings.'

const FIELDS = [
  'Title',
  'Year',
  'Director',
  'Genres',
  'Cast',
  'Rating',
  'Success',
  'Summary',
]

export default function Extract() {
  const { success, error: toastError } = useToast()
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleExtract() {
    if (text.trim().length < 10) {
      setError('Add a bit more detail — at least a short movie description.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await parseMovie(text.trim())
      setResult(data)
      addHistoryItem({ input: text.trim(), result: data })
      success('Movie schema ready')
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        (err.message?.includes('Network Error')
          ? 'Cannot reach the API. Start it with: uvicorn api:app --reload'
          : err.message) ||
        'Extraction failed'
      setError(typeof message === 'string' ? message : JSON.stringify(message))
      toastError('Could not extract schema')
    } finally {
      setLoading(false)
    }
  }

  function handleClear() {
    setText('')
    setResult(null)
    setError('')
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-semibold text-[#579DFF]">Converter</p>
        <h1 className="text-2xl font-bold tracking-tight text-[#F7F8F9] sm:text-3xl">
          Extract workspace
        </h1>
        <p className="mt-1 text-sm text-[#8C9BAB]">
          Paste a movie description on the left. Get structured JSON on the right.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="flex min-h-[520px] flex-col">
          <div className="mb-1 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-[#F7F8F9]">Movie description</h2>
              <p className="mt-0.5 text-xs text-[#8C9BAB]">
                Write or paste anything about a film
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setText(SAMPLE)}
              disabled={loading}
            >
              Try sample
            </Button>
          </div>

          <Textarea
            id="extract-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: The Dark Knight (2008), Christopher Nolan’s crime epic with Christian Bale and Heath Ledger…"
            disabled={loading}
            className="mt-3 flex-1"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={handleExtract} loading={loading} disabled={loading}>
              <Sparkles className="h-4 w-4" />
              Extract movie schema
            </Button>
            <Button variant="secondary" onClick={handleClear} disabled={loading}>
              <Eraser className="h-4 w-4" />
              Clear
            </Button>
          </div>

          {error && (
            <div className="mt-4">
              <ErrorState message={error} onRetry={handleExtract} />
            </div>
          )}
        </Card>

        <div className="flex min-h-[520px] flex-col gap-4">
          {loading ? (
            <Card className="flex flex-1 items-center justify-center">
              <Loader label="Reading your notes and building a movie schema…" />
            </Card>
          ) : result ? (
            <JsonViewer
              data={result}
              filename={`${result.movie_title?.replace(/\s+/g, '-').toLowerCase() || 'movie'}.json`}
            />
          ) : (
            <EmptyState
              icon={Braces}
              title="JSON output appears here"
              description="After you extract, you’ll get validated movie fields as JSON:"
              action={
                <ul className="mt-1 flex flex-wrap justify-center gap-2">
                  {FIELDS.map((field) => (
                    <li
                      key={field}
                      className="rounded-md border border-white/10 bg-[#12171F] px-2.5 py-1 text-xs font-medium text-[#B3B9C4]"
                    >
                      {field}
                    </li>
                  ))}
                </ul>
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}
