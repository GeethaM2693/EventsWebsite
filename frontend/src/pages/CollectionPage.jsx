import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Lightbulb } from 'lucide-react'
import Container from '../components/ui/Container'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import LoadState from '../components/ui/LoadState'
import EventCard from '../components/events/EventCard'
import CollectionHero from '../features/collection/CollectionHero'
import { CollectionSwitcher, DateAndSortBar, SubFilters } from '../features/collection/CollectionControls'
import FeaturedPick from '../features/collection/FeaturedPick'
import RelatedCollections from '../features/collection/RelatedCollections'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'

export default function CollectionPage() {
  const { slug } = useParams()
  if (!slug) return <Navigate to="/collections/weekend" replace />
  // key resets the sub-filter when switching collections
  return <CollectionView key={slug} slug={slug} />
}

function CollectionView({ slug }) {
  const [sub, setSub] = useState('All')
  const list = useFetch((signal) => api.get('/collections', { signal }), [])
  const page = useFetch((signal) => api.get(`/collections/${slug}`, { params: { sub: sub === 'All' ? undefined : sub }, signal }), [slug, sub])

  if (page.error?.status === 404) {
    return (
      <Container className="py-24">
        <EmptyState title="That collection doesn't exist" actions={<Button to="/collections/weekend">Plan your weekend</Button>}>
          Try one of the collections from the homepage.
        </EmptyState>
      </Container>
    )
  }

  return (
    <LoadState state={page} className="min-h-[60vh]">
      {({ data: c }) => {
        const collections = list.data?.data ?? []
        return (
          <>
            <CollectionHero collection={c} total={c.eventCount} />
            <Container className="pb-24">
              <CollectionSwitcher current={slug} collections={collections} />
              <DateAndSortBar activeDate={c.dateTab} />
              <SubFilters subs={c.subs} value={sub} onChange={setSub} />

              {c.featured && <FeaturedPick event={c.featured} />}

              <aside aria-label="Tip" className="mt-6 flex items-start gap-3 rounded-card bg-accent-soft px-5 py-4">
                <Lightbulb size={20} className="mt-0.5 flex-none text-accent" aria-hidden="true" />
                <p className="m-0 text-[15px] leading-relaxed text-ink"><strong>{c.tipTitle}</strong> {c.tip}</p>
              </aside>

              <div className={page.loading ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
                {c.groups.map((g) => (
                  <section key={g.a + g.b} className="pt-14">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h2 className="m-0 text-[clamp(26px,2.6vw,34px)] font-light tracking-[-0.02em]">{g.a} <span className="font-bold text-primary">{g.b}</span></h2>
                      <span className="text-[15px] font-semibold text-muted">{g.items.length} {g.items.length === 1 ? 'event' : 'events'}</span>
                    </div>
                    <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
                      {g.items.map((e) => (
                        <EventCard key={`${g.a}-${e.id}`} event={e} pill={e.badge} pillIcon={c.badge === 'time'} meta={`${e.category} · ${e.tag}`} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {c.groups.length === 0 && (
                <EmptyState className="mt-10" title="Nothing here for this filter yet">Try another filter or a wider date range.</EmptyState>
              )}
            </Container>
            {collections.length > 0 && <RelatedCollections current={slug} collections={collections} />}
            <div className="pb-24" />
          </>
        )
      }}
    </LoadState>
  )
}
