import Button from '../../components/ui/Button'
import MapSketch from '../../components/ui/MapSketch'
import DetailSection from './DetailSection'

export function About({ event }) {
  return (
    <DetailSection id="d-about" lead="About" emphasis="this event">
      <div className="flex flex-col gap-4 text-[17px] leading-[1.7]">
        {event.about.map((p) => <p key={p} className="m-0">{p}</p>)}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {event.tags.map((t) => (
          <span key={t} className="rounded-full bg-primary-soft px-3.5 py-1.5 text-sm font-semibold text-primary-deep">{t}</span>
        ))}
      </div>
    </DetailSection>
  )
}

export function Schedule({ event }) {
  return (
    <DetailSection id="d-sched" lead="Schedule" emphasis="each evening">
      <ol className="m-0 flex list-none flex-col p-0">
        {event.schedule.map((s) => (
          <li key={s.time} className="flex gap-6 border-t border-line py-4 last:border-b">
            <span className="flex-[0_0_88px] text-[15px] font-bold text-accent">{s.time}</span>
            <span className="flex flex-col">
              <span className="text-[17px] font-bold">{s.title}</span>
              <span className="mt-0.5 text-[15px] text-muted">{s.note}</span>
            </span>
          </li>
        ))}
      </ol>
    </DetailSection>
  )
}

export function Venue({ event }) {
  return (
    <DetailSection id="d-venue" lead="Venue" emphasis="& getting there">
      <div className="flex flex-wrap gap-6 overflow-hidden rounded-card border border-line bg-surface">
        <div className="flex-[3_1_320px]">
          <MapSketch variant="venue" />
        </div>
        <div className="flex flex-[2_1_240px] flex-col gap-4 p-6">
          {event.venueInfo.map((v) => (
            <div key={v.label}>
              <div className="text-[15px] font-bold">{v.label}</div>
              <div className="mt-0.5 text-sm text-muted">{v.value}</div>
            </div>
          ))}
          <a href="#" className="mt-auto text-[15px] font-bold">Get directions</a>
        </div>
      </div>
    </DetailSection>
  )
}

export function OrganizerCard({ event }) {
  const { initial, name, count } = event.organizer
  return (
    <section aria-labelledby="d-org" className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-card border border-line bg-surface p-6">
      <span className="flex size-14 items-center justify-center rounded-[14px] bg-accent-soft text-xl font-extrabold text-primary-deep">{initial}</span>
      <div className="flex-[1_1_240px]">
        <div className="text-[13px] font-bold uppercase tracking-widest text-primary">Organized by</div>
        <h2 id="d-org" className="m-0 mt-1 text-xl font-bold">{name}</h2>
        <div className="text-sm text-muted">{count} events listed on [Brand]</div>
      </div>
      <Button to="#" variant="outline">Contact organizer</Button>
    </section>
  )
}
