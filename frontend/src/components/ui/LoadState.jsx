import { AlertCircle } from 'lucide-react'
import Button from './Button'

export function Spinner({ label = 'Loading…', className = '' }) {
  return (
    <div role="status" className={`flex items-center justify-center gap-3 py-16 text-muted ${className}`}>
      <span className="size-5 animate-spin rounded-full border-2 border-line border-t-primary" aria-hidden="true" />
      {label}
    </div>
  )
}

export function ErrorNotice({ error, onRetry, className = '' }) {
  return (
    <div role="alert" className={`flex flex-col items-center gap-3 rounded-card border border-line bg-surface px-6 py-12 text-center ${className}`}>
      <AlertCircle size={28} className="text-accent" aria-hidden="true" />
      <div className="text-lg font-bold">Something went wrong</div>
      <p className="m-0 max-w-[420px] text-[15px] text-muted">{error?.message ?? 'Please try again.'}</p>
      {onRetry && <Button variant="outline" onClick={onRetry}>Try again</Button>}
    </div>
  )
}

// Renders children once data exists; spinner on first load; error with retry if it failed with nothing to show.
export default function LoadState({ state, children, className }) {
  const { data, loading, error, reload } = state
  if (!data && loading) return <Spinner className={className} />
  if (!data && error) return <ErrorNotice error={error} onRetry={reload} className={className} />
  return children(data)
}
