import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Date | title + meta | price | arrow. Used for list-style sections (business events).
export default function EventRow({ event }) {
  const { id, title, category, date, time, venue, price } = event
  return (
    <Link
      to={`/events/${id}`}
      className="flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-line px-1 py-[22px] text-ink no-underline hover:bg-primary-soft/40"
    >
      <div className="flex-[0_0_140px] text-[15px] font-bold text-primary">{date}</div>
      <div className="flex-[1_1_300px]">
        <div className="text-[19px] font-bold">{title}</div>
        <div className="mt-0.5 text-sm text-muted">{category} · {venue} · {time}</div>
      </div>
      <div className="text-[15px] font-semibold">{price}</div>
      <ArrowRight size={20} className="text-primary" aria-hidden="true" />
    </Link>
  )
}
