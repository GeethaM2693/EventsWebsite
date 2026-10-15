import { Link } from 'react-router-dom'
import MapSketch from '../../components/ui/MapSketch'

export default function MapResults({ events }) {
  return (
    <div className="mt-7 flex flex-wrap gap-6">
      <div className="min-w-0 flex-[3_1_420px] overflow-hidden rounded-card border border-line">
        <MapSketch variant="city" />
      </div>
      <ol className="m-0 flex min-w-0 flex-[2_1_280px] list-none flex-col p-0">
        {events.slice(0, 6).map((e, i) => (
          <li key={e.id} className="flex gap-3.5 border-b border-line py-4">
            <span className="flex size-8 flex-none items-center justify-center rounded-full bg-primary text-[15px] font-extrabold text-white">{i + 1}</span>
            <span className="flex flex-col">
              <Link to={`/events/${e.id}`} className="text-[17px] font-bold text-ink no-underline hover:text-primary">{e.title}</Link>
              <span className="mt-0.5 text-sm text-muted">{e.time} · {e.venue} · {e.price}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
