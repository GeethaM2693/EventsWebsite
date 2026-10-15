import { Bookmark, CalendarDays, MapPin } from 'lucide-react'
import Container from '../../components/ui/Container'

const reasons = [
  { Icon: CalendarDays, title: 'Found by date', text: 'Appear under Today, This Weekend and This Month the moment your dates match.' },
  { Icon: MapPin, title: 'Found nearby', text: 'Show up on the map for people within a few kilometres of your venue.' },
  { Icon: Bookmark, title: 'Saved & remembered', text: 'Visitors save your event and get a reminder before it starts.' },
]

export default function WhyList() {
  return (
    <Container as="section" aria-label="Why list" className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 pt-8">
      {reasons.map(({ Icon, title, text }) => (
        <div key={title} className="rounded-card border border-line bg-surface p-6">
          <Icon size={26} strokeWidth={1.6} className="text-primary" aria-hidden="true" />
          <h2 className="m-0 mt-4 text-xl font-bold">{title}</h2>
          <p className="mt-2 mb-0 text-[15px] leading-relaxed text-muted">{text}</p>
        </div>
      ))}
    </Container>
  )
}
