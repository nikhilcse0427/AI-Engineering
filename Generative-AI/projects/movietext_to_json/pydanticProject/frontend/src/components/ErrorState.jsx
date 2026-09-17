import { AlertTriangle } from 'lucide-react'
import Button from './Button'

export default function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again in a moment.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-5">
      <div className="flex items-center gap-2 text-rose-300">
        <AlertTriangle className="h-5 w-5" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-rose-200/90">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
