import { Heart } from 'lucide-react'
import { useSaved } from '../../context/SavedContext'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import Button from '../../components/ui/Button'
import PhotoPlaceholder from '../../components/ui/PhotoPlaceholder'

export default function FeaturedEvent({ event }) {
  const { id, title, category, date, time, venue, blurb, photo, tone } = event
  const saved = useSaved()
  const on = saved.isSaved('events', id)
  return (
    <Container as="section" aria-label="Featured" className="pt-28">
      <PhotoPlaceholder tone={tone} label={photo} className="h-[clamp(280px,42vw,560px)] overflow-hidden rounded-card" />
      <div className="flex flex-wrap items-start gap-x-16 gap-y-6 pt-8">
        <div className="flex-[1_1_420px]">
          <Eyebrow className="tracking-[0.12em]">Featured this weekend · {category}</Eyebrow>
          <h2 className="mt-3 mb-0 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-0.02em]">{title}</h2>
        </div>
        <div className="flex-[1_1_360px]">
          <p className="m-0 text-[17px] leading-[1.6] text-muted">{blurb}</p>
          <div className="mt-4 text-[15px] font-semibold">{date} · {time} · {venue}</div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button to={`/events/${id}`}>View details</Button>
            <Button variant="ghost" aria-pressed={on} onClick={() => saved.toggle('events', id).catch(() => {})} className="gap-2 !px-[18px]">
              <Heart size={18} strokeWidth={1.8} fill={on ? 'currentColor' : 'none'} aria-hidden="true" />
              {on ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
