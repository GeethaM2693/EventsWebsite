import { Link, useParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionLink from '../components/ui/SectionLink'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import LoadState from '../components/ui/LoadState'
import EventCardEditorial from '../components/events/EventCardEditorial'
import DetailHeader from '../features/event-detail/DetailHeader'
import PhotoGallery from '../features/event-detail/PhotoGallery'
import BookingCard from '../features/event-detail/BookingCard'
import { About, OrganizerCard, Schedule, Venue } from '../features/event-detail/DetailBody'
import { toDetailView } from '../data/eventDetail'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'

export default function EventDetailPage() {
  const { id } = useParams()
  const state = useFetch((signal) => api.get(`/events/${id}`, { signal }), [id])

  if (state.error?.status === 404) {
    return (
      <Container className="py-24">
        <EmptyState title="We couldn't find that event" actions={<Button to="/explore">Explore events</Button>}>
          It may have been removed, or the link is wrong. <Link to="/" className="font-semibold">Back to the homepage</Link>
        </EmptyState>
      </Container>
    )
  }

  return (
    <LoadState state={state} className="min-h-[60vh]">
      {(res) => <EventView event={toDetailView(res)} />}
    </LoadState>
  )
}

function EventView({ event }) {
  return (
    <>
      <Container>
        <DetailHeader event={event} />
        <PhotoGallery photos={event.photos} />
        <div className="mt-12 flex flex-wrap items-start gap-12">
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-14">
            <About event={event} />
            {event.schedule.length > 0 && <Schedule event={event} />}
            <Venue event={event} />
            <OrganizerCard event={event} />
          </div>
          <BookingCard key={event.id} pass={event.pass} />
        </div>
      </Container>

      {event.similar.length > 0 && (
        <Section id="d-more" lead="You might" emphasis="also like" className="pt-24 pb-24" action={<SectionLink to="/explore">Explore more</SectionLink>}>
          <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-8 gap-y-12">
            {event.similar.map((e) => <EventCardEditorial key={e.id} event={e} />)}
          </div>
        </Section>
      )}
    </>
  )
}
