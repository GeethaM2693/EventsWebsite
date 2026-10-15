import { Heart } from 'lucide-react'
import { useSaved } from '../../context/SavedContext'
import Button from '../../components/ui/Button'
import PhotoPlaceholder from '../../components/ui/PhotoPlaceholder'

export default function FeaturedPick({ event }) {
  const { id, title, category, date, time, venue, price, photo, tone } = event
  const saved = useSaved()
  const on = saved.isSaved('events', id)
  return (
    <section aria-labelledby="c-feat" className="mt-8 flex flex-wrap overflow-hidden rounded-card border border-line bg-surface">
      <PhotoPlaceholder tone={tone} label={photo} className="min-h-[300px] flex-[3_1_420px]" />
      <div className="flex flex-[2_1_320px] flex-col justify-center gap-2 p-[clamp(24px,3vw,40px)]">
        <div className="text-xs font-bold uppercase tracking-[0.1em] text-primary">Editor's pick · {category}</div>
        <h2 id="c-feat" className="m-0 text-[clamp(24px,2.6vw,32px)] font-bold leading-[1.15] tracking-[-0.02em]">{title}</h2>
        <div className="mt-1 text-[15px] font-semibold">{date} · {time}</div>
        <div className="text-[15px] text-muted">{venue} · {price}</div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button to={`/events/${id}`}>View details</Button>
          <Button variant="ghost" aria-pressed={on} onClick={() => saved.toggle('events', id).catch(() => {})} className="gap-2">
            <Heart size={18} strokeWidth={1.8} fill={on ? 'currentColor' : 'none'} aria-hidden="true" />
            {on ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>
    </section>
  )
}
