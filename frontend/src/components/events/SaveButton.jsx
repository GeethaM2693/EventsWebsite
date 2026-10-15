import { Heart } from 'lucide-react'
import { useSaved } from '../../context/SavedContext'

// kind: 'events' | 'places'. Filled when this browser has saved the item.
export default function SaveButton({ slug, title, kind = 'events', className = '' }) {
  const saved = useSaved()
  const on = saved.isSaved(kind, slug)
  return (
    <button
      type="button"
      aria-label={`${on ? 'Unsave' : 'Save'} ${title}`}
      aria-pressed={on}
      onClick={() => saved.toggle(kind, slug).catch(() => {})}
      className={`flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-surface text-primary ${className}`}
    >
      <Heart size={18} strokeWidth={1.8} fill={on ? 'currentColor' : 'none'} aria-hidden="true" />
    </button>
  )
}
