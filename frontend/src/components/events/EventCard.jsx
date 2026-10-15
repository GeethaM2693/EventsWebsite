import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import PhotoPlaceholder from '../ui/PhotoPlaceholder'
import SaveButton from './SaveButton'

// Boxed card with time pill, save heart and a Details link.
// `pill` is the text on the photo (default: time, with a clock icon); `meta` is the eyebrow line.
export default function EventCard({ event, pill, pillIcon = true, meta }) {
  const { id, title, category, time, venue, price, photo, tone } = event
  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-line bg-surface">
      <PhotoPlaceholder tone={tone} label={photo} className="aspect-[4/3]">
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[13px] font-extrabold text-primary-deep">
          {pillIcon && <Clock size={14} strokeWidth={2.2} className="text-primary" aria-hidden="true" />}
          {pill ?? time}
        </span>
        <SaveButton slug={id} title={title} className="absolute right-2 top-2" />
      </PhotoPlaceholder>

      <div className="flex flex-1 flex-col gap-1.5 px-5 pt-[18px] pb-5">
        <div className="text-xs font-bold uppercase tracking-[0.1em] text-primary">{meta ?? category}</div>
        <h3 className="m-0 text-lg font-bold leading-[1.3]">{title}</h3>
        <div className="text-sm text-muted">{venue}</div>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
          <span className="text-[15px] font-bold">{price}</span>
          <Link to={`/events/${id}`} className="text-sm font-bold">Details</Link>
        </div>
      </div>
    </article>
  )
}
