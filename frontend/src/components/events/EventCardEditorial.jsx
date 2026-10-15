import { Link } from 'react-router-dom'
import PhotoPlaceholder from '../ui/PhotoPlaceholder'
import SaveButton from './SaveButton'

const sizes = {
  md: { ratio: 'aspect-[4/3]', radius: 'rounded-[14px]', title: 'text-[21px] leading-[1.3]', meta: ['category', 'date'] },
  lg: { ratio: 'aspect-video', radius: 'rounded-card', title: 'text-2xl leading-[1.25]', meta: ['category', 'date', 'time'] },
}

// Borderless photo-first card. `md` (trending, with save) and `lg` (weekend, 16:9).
export default function EventCardEditorial({ event, size = 'md', saveable = false }) {
  const { id, title, venue, price, photo, tone } = event
  const s = sizes[size]
  return (
    <article className="relative flex flex-col gap-2.5">
      <PhotoPlaceholder tone={tone} label={photo} className={`${s.ratio} ${s.radius} mb-1.5 overflow-hidden`}>
        {saveable && <SaveButton slug={id} title={title} className="absolute right-3 top-3" />}
      </PhotoPlaceholder>
      <div className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
        {s.meta.map((k) => event[k]).join(' · ')}
      </div>
      <h3 className={`m-0 font-bold tracking-[-0.01em] ${s.title}`}>
        <Link to={`/events/${id}`} className="text-ink no-underline before:absolute before:inset-0 before:z-0">{title}</Link>
      </h3>
      <div className="text-[15px] text-muted">{venue} · {price}</div>
    </article>
  )
}
