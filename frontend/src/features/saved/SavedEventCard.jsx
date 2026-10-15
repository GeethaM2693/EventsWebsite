import { Link } from 'react-router-dom'
import { CalendarPlus, Trash2 } from 'lucide-react'
import PhotoPlaceholder from '../../components/ui/PhotoPlaceholder'

export default function SavedEventCard({ event, onRemove }) {
  const { id, title, date, time, venue, price, photo, tone } = event
  return (
    <article className="flex flex-wrap overflow-hidden rounded-card border border-line bg-surface">
      <PhotoPlaceholder tone={tone} label={photo} className="min-h-[160px] flex-[1_1_200px]" />
      <div className="flex flex-[3_1_360px] flex-wrap items-center justify-between gap-4 p-5">
        <div className="min-w-0 flex-[1_1_260px]">
          <div className="text-xs font-bold uppercase tracking-[0.1em] text-primary">{date} · {time}</div>
          <h3 className="m-0 mt-1.5 text-xl font-bold leading-[1.3]">
            <Link to={`/events/${id}`} className="text-ink no-underline hover:text-primary">{title}</Link>
          </h3>
          <div className="mt-1 text-[15px] text-muted">{venue} · {price}</div>
        </div>
        <div className="flex items-center gap-2.5">
          <button type="button" className="flex min-h-11 cursor-pointer items-center gap-2 rounded-control border border-line bg-surface px-3.5 text-sm font-bold text-primary">
            <CalendarPlus size={18} aria-hidden="true" />
            Add to calendar
          </button>
          <button
            type="button"
            aria-label={`Remove ${title} from saved`}
            onClick={onRemove}
            className="flex size-11 cursor-pointer items-center justify-center rounded-control border border-line bg-surface text-muted hover:text-accent"
          >
            <Trash2 size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
