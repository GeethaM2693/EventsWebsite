import { Link } from 'react-router-dom'
import PhotoPlaceholder from '../ui/PhotoPlaceholder'

// Boxed 3:2 card: category, title, date · venue, price. Used for exhibitions, markets, family.
export default function EventCardCompact({ event }) {
  const { id, title, category, date, venue, price, photo, tone } = event
  return (
    <article className="relative flex flex-col overflow-hidden rounded-card border border-line bg-surface">
      <PhotoPlaceholder tone={tone} label={photo} className="aspect-[3/2]" />
      <div className="flex flex-col gap-1.5 px-5 pt-[18px] pb-[22px]">
        <div className="text-xs font-bold uppercase tracking-[0.1em] text-primary">{category}</div>
        <h3 className="m-0 text-lg font-bold leading-[1.3]">
          <Link to={`/events/${id}`} className="text-ink no-underline before:absolute before:inset-0">{title}</Link>
        </h3>
        <div className="text-sm text-muted">{date} · {venue}</div>
        <div className="text-sm font-semibold">{price}</div>
      </div>
    </article>
  )
}
