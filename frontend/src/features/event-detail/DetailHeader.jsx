import { Calendar, Clock, Heart, MapPin, Share2 } from 'lucide-react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Eyebrow from '../../components/ui/Eyebrow'
import { useSaved } from '../../context/SavedContext'

const meta = 'flex items-center gap-2'

export default function DetailHeader({ event }) {
  const savedCtx = useSaved()
  const saved = savedCtx.isSaved('events', event.id)
  return (
    <section className="pt-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Explore', to: '/explore' }, { label: event.group ?? 'Events' }]} />
      <Eyebrow className="mt-5 tracking-[0.12em]">{event.eyebrow}</Eyebrow>
      <div className="mt-2.5 flex flex-wrap items-end justify-between gap-5">
        <h1 className="m-0 text-[clamp(32px,4.6vw,56px)] font-bold leading-[1.05] tracking-[-0.03em]">{event.title}</h1>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => savedCtx.toggle('events', event.id).catch(() => {})}
            className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-control px-4 text-[15px] font-bold text-primary ${saved ? 'border-[1.5px] border-primary bg-primary-soft' : 'border border-line bg-surface'}`}
          >
            <Heart size={18} strokeWidth={1.8} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
            {saved ? 'Saved' : 'Save'}
          </button>
          <button type="button" className="flex min-h-11 cursor-pointer items-center gap-2 rounded-control border border-line bg-surface px-4 text-[15px] font-bold text-primary">
            <Share2 size={18} strokeWidth={1.8} aria-hidden="true" />
            Share
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2 text-base font-semibold">
        <span className={meta}><Calendar size={18} className="text-primary" aria-hidden="true" />{event.date}</span>
        <span className={meta}><Clock size={18} className="text-primary" aria-hidden="true" />{event.time}</span>
        <span className={meta}><MapPin size={18} className="text-primary" aria-hidden="true" />{event.location}</span>
      </div>
    </section>
  )
}
