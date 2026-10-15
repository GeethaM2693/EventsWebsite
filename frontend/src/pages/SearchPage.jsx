import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import { ErrorNotice, Spinner } from '../components/ui/LoadState'
import SearchBox from '../features/search/SearchBox'
import SearchPanel from '../features/search/SearchPanel'
import SearchResults from '../features/search/SearchResults'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'
import { addRecent, getRecent } from '../lib/recentSearches'

const POPULAR_FALLBACK = ['food festival', 'expo', 'comedy', 'kids', 'market', 'kayaking']

export default function SearchPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const initial = params.get('q') ?? ''
  const [q, setQ] = useState(initial)
  const [submitted, setSubmitted] = useState(initial !== '')
  const [panelOpen, setPanelOpen] = useState(true)
  const [activeIndex, setActiveIndex] = useState(-1) // -1 = nothing highlighted; Enter then runs the search
  const [facet, setFacet] = useState('All')
  const [recent, setRecent] = useState(getRecent)

  const debouncedQ = useDebounce(q, 200)
  const popular = useFetch((signal) => api.get('/search/popular', { signal }), [])
  const popularList = popular.data?.data ?? POPULAR_FALLBACK

  const wantsSuggest = !submitted && debouncedQ.trim().length >= 2
  const suggest = useFetch((signal) => api.get('/search/suggest', { params: { q: debouncedQ.trim() }, signal }), [debouncedQ], { enabled: wantsSuggest })

  const results = useFetch(
    (signal) => api.get('/search', { params: { q: q.trim(), type: facet === 'All' ? undefined : facet }, signal }),
    [submitted, q, facet],
    { enabled: submitted && q.trim() !== '' },
  )

  // Flat list of suggestion rows, in display order, so arrow keys can walk across groups.
  const options = useMemo(() => {
    const s = wantsSuggest && q.trim().length >= 2 ? suggest.data?.data : null
    if (!s) return []
    const rows = [
      ...s.events.map((e) => ({ ...e, kind: 'event', pre: e.match?.pre ?? e.title, mid: e.match?.mid ?? '', post: e.match?.post ?? '' })),
      ...s.categories.map((c) => ({ ...c, kind: 'category' })),
      ...s.places.map((p) => ({ ...p, kind: 'place' })),
    ]
    if (rows.length > 0) rows.push({ kind: 'all' })
    return rows.map((r, index) => ({ ...r, index }))
  }, [suggest.data, wantsSuggest, q])

  const run = (text = q) => {
    if (!text.trim()) return
    addRecent(text)
    setRecent(getRecent())
    setQ(text)
    setSubmitted(true)
    setFacet('All')
  }
  const edit = (text) => {
    setQ(text)
    setSubmitted(false)
    setPanelOpen(true)
    setActiveIndex(-1)
  }
  const pick = (opt) => (typeof opt === 'string' ? run(opt) : opt.kind === 'category' ? navigate(`/collections/${opt.slug}`) : run(opt.label))

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault() // keep the browser from clearing the field itself
      setPanelOpen(false)
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (options.length === 0) return
      e.preventDefault()
      setPanelOpen(true)
      const step = e.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((i) => (i === -1 ? (step === 1 ? 0 : options.length - 1) : (i + step + options.length) % options.length))
    } else if (e.key === 'Enter' && panelOpen && !submitted) {
      const active = options[activeIndex]
      if (active?.kind === 'event') {
        e.preventDefault()
        navigate(`/events/${active.id}`)
      } else if (active && active.kind !== 'all') {
        e.preventDefault()
        pick(active)
      }
    }
  }

  return (
    <Container className="max-w-[1200px]">
      <section className="max-w-[860px] pt-12">
        <SearchBox
          value={q}
          onChange={edit}
          onClear={() => edit('')}
          onKeyDown={onKeyDown}
          onSubmit={(e) => { e.preventDefault(); run() }}
        />
        {!submitted && panelOpen && (
          <SearchPanel
            q={q}
            options={options}
            activeIndex={activeIndex}
            onPick={pick}
            onSubmit={() => run()}
            loading={suggest.loading}
            recent={recent}
            popular={popularList}
          />
        )}
      </section>

      {submitted && results.error && !results.data && <ErrorNotice error={results.error} onRetry={results.reload} className="mt-10" />}
      {submitted && !results.data && results.loading && <Spinner className="mt-10" />}
      {submitted && results.data && (
        <SearchResults
          q={q}
          hits={results.data.data}
          facets={results.data.facets}
          facet={facet}
          onFacet={setFacet}
          onPickPopular={run}
          popular={popularList}
          loading={results.loading}
        />
      )}
    </Container>
  )
}
