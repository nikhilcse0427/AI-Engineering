import { Check, Copy, Download, FileJson } from 'lucide-react'
import { useMemo, useState } from 'react'
import Button from './Button'
import { useToast } from '../context/ToastContext'

function highlightJson(json) {
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = 'text-amber-300'
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'text-[#579DFF]' : 'text-emerald-300'
        } else if (/true|false/.test(match)) {
          cls = 'text-sky-300'
        } else if (/null/.test(match)) {
          cls = 'text-[#8C9BAB]'
        }
        return `<span class="${cls}">${match}</span>`
      },
    )
}

export default function JsonViewer({ data, filename = 'extraction.json' }) {
  const { success, error } = useToast()
  const [copied, setCopied] = useState(false)

  const pretty = useMemo(() => JSON.stringify(data, null, 2), [data])
  const html = useMemo(() => highlightJson(pretty), [pretty])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(pretty)
      setCopied(true)
      success('JSON copied to clipboard')
      setTimeout(() => setCopied(false), 1600)
    } catch {
      error('Unable to copy JSON')
    }
  }

  function handleDownload() {
    const blob = new Blob([pretty], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    success('JSON downloaded')
  }

  return (
    <div className="flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12171F] shadow-xl shadow-black/30">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-[#B3B9C4]">
          <FileJson className="h-4 w-4 text-[#579DFF]" />
          <span className="text-sm font-medium">JSON Output</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      <pre
        className="flex-1 overflow-auto p-4 font-mono text-[13px] leading-relaxed text-[#E6E8EB]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
