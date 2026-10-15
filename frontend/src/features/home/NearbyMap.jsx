import { Link } from 'react-router-dom'
import Section from '../../components/ui/Section'
import SectionLink from '../../components/ui/SectionLink'
import MapSketch from '../../components/ui/MapSketch'
import { nearbyEvents } from '../../data/nearby'

export default function NearbyMap() {
  return (
    <Section
      id="near"
      lead="Discover"
      emphasis="near you"
      action={<SectionLink to="/explore">Open full map</SectionLink>}
      subtitle={
        <p className="mt-2.5 mb-0 text-base text-muted">
          Showing events within 5 km of Madhapur. <Link to="#" className="font-semibold">Change location</Link>
        </p>
      }
    >
      <div className="mt-7 flex flex-wrap gap-8">
        <div className="flex-[3_1_480px] overflow-hidden rounded-card border border-line bg-primary-soft">
          <MapSketch variant="nearby" />
        </div>
        <ol className="m-0 flex flex-[2_1_320px] list-none flex-col p-0">
          {nearbyEvents.map((e) => (
            <li key={e.id} className="flex gap-4 border-b border-line py-[18px]">
              <span className="flex size-8 flex-none items-center justify-center rounded-full bg-primary text-[15px] font-extrabold text-white">{e.n}</span>
              <div>
                <div className="text-[17px] font-bold">{e.title}</div>
                <div className="mt-0.5 text-sm text-muted">{e.distance} · {e.venue} · {e.date}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
