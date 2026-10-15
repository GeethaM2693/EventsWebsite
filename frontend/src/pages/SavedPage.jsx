import { useState } from 'react'
import Container from '../components/ui/Container'
import Breadcrumb from '../components/ui/Breadcrumb'
import PageTitle from '../components/ui/PageTitle'
import UnderlineTabs from '../components/ui/UnderlineTabs'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import SectionLink from '../components/ui/SectionLink'
import PhotoPlaceholder from '../components/ui/PhotoPlaceholder'
import LoadState from '../components/ui/LoadState'
import EventCardEditorial from '../components/events/EventCardEditorial'
import SavedEventCard from '../features/saved/SavedEventCard'
import SignInBanner from '../features/saved/SignInBanner'
import { useSaved } from '../context/SavedContext'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'

export default function SavedPage() {
  const saved = useFetch((signal) => api.get('/saved', { signal }), [])
  const recs = useFetch((signal) => api.get('/saved/recommendations', { signal }), [])

  return (
    <>
      <Container className="pt-14">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Saved Events' }]} />
        <PageTitle lead="Your" emphasis="saved events" className="mt-3.5" />
        <p className="mt-4 mb-0 max-w-[560px] text-[18px] leading-relaxed text-muted">
          Everything you've saved, in date order — so planning the weekend takes a minute, not an evening.
        </p>
        <SignInBanner />
        <LoadState state={saved} className="min-h-[30vh]">
          {({ data }) => <SavedTabs data={data} onRestored={() => { saved.reload(); recs.reload() }} />}
        </LoadState>
      </Container>

      {recs.data?.data.length > 0 && (
        <Section id="s-rec" lead="Based on" emphasis="what you saved" className="pt-20 pb-24" action={<SectionLink to="/explore">Explore more</SectionLink>}>
          <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-8 gap-y-12">
            {recs.data.data.map((e) => <EventCardEditorial key={e.id} event={e} />)}
          </div>
        </Section>
      )}
      {!recs.data?.data.length && <div className="pb-24" />}
    </>
  )
}

function SavedTabs({ data, onRestored }) {
  const ctx = useSaved()
  const [tab, setTab] = useState('up')
  const [removed, setRemoved] = useState([]) // hidden immediately; undo re-saves them

  const groups = data.upcoming.groups
    .map((g) => ({ ...g, events: g.events.filter((e) => !removed.includes(e.id)) }))
    .filter((g) => g.events.length > 0)
  const upcomingCount = groups.reduce((n, g) => n + g.events.length, 0)

  const remove = (id) => {
    setRemoved((r) => [...r, id])
    ctx.setItem('events', id, false).catch(() => setRemoved((r) => r.filter((x) => x !== id)))
  }
  const restore = async () => {
    await Promise.all(removed.map((id) => ctx.setItem('events', id, true).catch(() => {})))
    setRemoved([])
    onRestored()
  }

  const tabs = [
    { id: 'up', label: `Upcoming (${upcomingCount})` },
    { id: 'past', label: `Past (${data.past.count})` },
    { id: 'places', label: `Places (${data.places.count})` },
  ]

  return (
    <>
      <UnderlineTabs role="tablist" label="Saved lists" items={tabs} value={tab} onChange={setTab} className="mt-10 border-b border-line" />

      {tab === 'up' && (upcomingCount > 0 ? (
        groups.map((g) => {
          const [a, ...rest] = g.label.split(' ')
          return (
            <section key={g.label} className="pt-10">
              <h2 className="m-0 text-[28px] font-light tracking-[-0.02em]">{a} <span className="font-bold text-primary">{rest.join(' ')}</span></h2>
              <div className="mt-5 flex flex-col gap-4">
                {g.events.map((e) => <SavedEventCard key={e.id} event={e} onRemove={() => remove(e.id)} />)}
              </div>
            </section>
          )
        })
      ) : (
        <EmptyState
          dashed
          className="mt-10"
          title="Nothing saved yet"
          actions={
            <>
              <Button to="/explore">Explore events</Button>
              {removed.length > 0 && <Button variant="outline" onClick={restore}>Undo</Button>}
            </>
          }
        >
          Tap the heart on any event to keep it here.
        </EmptyState>
      ))}

      {tab === 'past' && (data.past.count > 0 ? (
        <div className="mt-10 flex flex-col gap-4">
          {data.past.events.map((e) => <SavedEventCard key={e.id} event={e} onRemove={() => remove(e.id)} />)}
        </div>
      ) : (
        <EmptyState className="mt-10" title="No past events yet">
          Events you saved move here after they end, so you can find the organizer again.
        </EmptyState>
      ))}

      {tab === 'places' && (data.places.count > 0 ? (
        <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-6 gap-y-10">
          {data.places.items.map((g) => (
            <article key={g.id} className="flex flex-col gap-2.5">
              <PhotoPlaceholder tone={g.tone} label={g.photo} className="mb-1.5 aspect-[4/3] rounded-[14px]" />
              <div className="text-xs font-bold uppercase tracking-[0.1em] text-primary">Hidden gem · {g.area}</div>
              <h3 className="m-0 text-xl font-bold">{g.name}</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-muted">{g.note}</p>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState className="mt-10" title="No saved places yet">Places you save show up here.</EmptyState>
      ))}
    </>
  )
}
