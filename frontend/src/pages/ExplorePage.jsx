import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/ui/Container'
import Breadcrumb from '../components/ui/Breadcrumb'
import PageTitle from '../components/ui/PageTitle'
import SearchBar from '../components/ui/SearchBar'
import UnderlineTabs from '../components/ui/UnderlineTabs'
import EmptyState from '../components/ui/EmptyState'
import { ErrorNotice, Spinner } from '../components/ui/LoadState'
import EventCard from '../components/events/EventCard'
import Button from '../components/ui/Button'
import ExploreFilters from '../features/explore/ExploreFilters'
import ResultsToolbar from '../features/explore/ResultsToolbar'
import MapResults from '../features/explore/MapResults'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'
import { exploreTabs } from '../data/filters'

const PAGE_SIZE = 9
const TAB_PARAM = { Today: 'today', Tomorrow: 'tomorrow', 'This Weekend': 'weekend', 'Next Week': 'next-week', 'This Month': 'month' }
const PRICE_PARAM = { 'Any price': '', Free: 'free', 'Under ₹500': 'under-500', '₹500 – ₹1,500': '500-1500', 'Above ₹1,500': 'above-1500' }
const SORT_PARAM = { Recommended: 'recommended', 'Soonest first': 'soonest', Nearest: 'recommended', 'Price: low to high': 'price-asc' }

const initialFilters = { categories: [], area: 'All of Hyderabad', price: 'Any price', goodFor: [] }

export default function ExplorePage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Today')
  const [view, setView] = useState('list')
  const [sort, setSort] = useState('Recommended')
  const [filters, setFilters] = useState(initialFilters)
  const [pageState, setPageState] = useState({ key: '', page: 1 })
  const [events, setEvents] = useState([])

  const params = {
    tab: TAB_PARAM[tab],
    category: filters.categories,
    area: filters.area,
    price: PRICE_PARAM[filters.price],
    goodFor: filters.goodFor,
    sort: SORT_PARAM[sort],
    limit: PAGE_SIZE,
  }
  const key = JSON.stringify(params)

  // Any filter change starts again from page 1 (the stored page only counts for the filters it was set under).
  const page = pageState.key === key ? pageState.page : 1
  const setPage = (fn) => setPageState({ key, page: fn(page) })

  const result = useFetch((signal) => api.get('/events', { params: { ...params, page }, signal }), [key, page])
  const { data, loading, error, reload } = result

  useEffect(() => {
    if (!data) return
    setEvents((prev) => (data.meta.page === 1 ? data.data : [...prev, ...data.data]))
  }, [data])

  const patch = (p) => setFilters((f) => ({ ...f, ...p }))
  const toggleCategory = (name) =>
    patch({ categories: filters.categories.includes(name) ? filters.categories.filter((c) => c !== name) : [...filters.categories, name] })
  const onTab = (t) => (t === 'Custom Dates' ? navigate('/dates') : setTab(t))

  const total = data?.meta.total ?? 0
  const hasMore = data ? data.meta.page < data.meta.pages : false
  const fresh = data && data.meta.page === page // false while a new filter's first page is still loading

  const onSearch = (e) => {
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('q')?.toString().trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  return (
    <Container>
      <section className="pt-14">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Explore' }]} />
        <PageTitle lead="Explore" emphasis="Hyderabad" className="mt-3.5" />
        <SearchBar id="x-search" onSubmit={onSearch} className="mt-7" />
        <UnderlineTabs items={exploreTabs} value={tab} onChange={onTab} label="Date shortcuts" className="mt-5 border-b border-line" />
      </section>

      <div className="flex flex-wrap items-start gap-10 pt-8 pb-24">
        <ExploreFilters
          filters={filters}
          onToggleCategory={toggleCategory}
          onChange={patch}
          onClear={() => setFilters(initialFilters)}
        />
        <section aria-labelledby="x-results" className="min-w-0 flex-[999_1_560px]">
          <ResultsToolbar
            count={total}
            label={tab}
            view={view}
            onView={setView}
            sort={sort}
            onSort={setSort}
            activeCategories={filters.categories}
            onRemoveCategory={toggleCategory}
          />

          {error && events.length === 0 && <ErrorNotice error={error} onRetry={reload} className="mt-7" />}
          {!error && !fresh && events.length === 0 && <Spinner className="mt-7" />}

          {fresh && events.length === 0 && (
            <EmptyState className="mt-7" title="No events match these filters">
              Try a different date or clear a filter.
            </EmptyState>
          )}

          {events.length > 0 && (view === 'list' ? (
            <>
              <div className={`mt-7 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-6 gap-y-7 transition-opacity ${loading && page === 1 ? 'opacity-60' : ''}`}>
                {events.map((e) => (
                  <EventCard key={e.id} event={e} pill={e.date} pillIcon={false} meta={`${e.category} · ${e.time}`} />
                ))}
              </div>
              {hasMore && (
                <div className="mt-10 text-center">
                  <Button variant="outline" disabled={loading} onClick={() => setPage((p) => p + 1)} className="!min-h-12 !bg-surface !px-7">
                    {loading ? 'Loading…' : 'Show more events'}
                  </Button>
                </div>
              )}
              {error && <ErrorNotice error={error} onRetry={reload} className="mt-7" />}
            </>
          ) : (
            <MapResults events={events} />
          ))}
        </section>
      </div>
    </Container>
  )
}
