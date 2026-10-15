import { Link } from 'react-router-dom'
import { ArrowRight, Clock, LayoutGrid, MapPin } from 'lucide-react'

const heading = 'text-xs font-extrabold uppercase tracking-[0.12em] text-primary'
const row = (active) =>
  `flex items-center gap-3.5 rounded-control px-3 py-2 no-underline text-ink ${active ? 'bg-primary-soft' : 'hover:bg-primary-soft/60'}`
const pill = 'min-h-11 cursor-pointer rounded-full border border-line bg-surface px-4 text-sm font-semibold text-ink hover:bg-primary-soft'
const linkPill = `${pill} flex items-center no-underline`

function EmptyPanel({ onPick, recent, popular }) {
  return (
    <>
      <div className="px-3 pt-3 pb-1">
        <div className={heading}>Recent searches</div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {recent.map((r) => (
            <button key={r} type="button" onClick={() => onPick(r)} className={`${pill} flex items-center gap-2`}>
              <Clock size={15} className="text-muted" aria-hidden="true" />{r}
            </button>
          ))}
        </div>
      </div>
      <div className="px-3 pt-4 pb-1">
        <div className={heading}>Popular in Hyderabad this week</div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {popular.map((r) => <button key={r} type="button" onClick={() => onPick(r)} className={pill}>{r}</button>)}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-12 gap-y-4 px-3 pt-4 pb-3">
        <div>
          <div className={heading}>When</div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <Link to="/explore" className={linkPill}>Today</Link>
            <Link to="/collections/weekend" className={linkPill}>This weekend</Link>
            <Link to="/dates" className={linkPill}>Pick dates…</Link>
          </div>
        </div>
        <div>
          <div className={heading}>Browse</div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <Link to="/collections/exhibitions" className={linkPill}>Exhibitions</Link>
            <Link to="/collections/markets" className={linkPill}>Markets</Link>
            <Link to="/collections/family" className={linkPill}>Family</Link>
          </div>
        </div>
      </div>
    </>
  )
}

// `options` is the flat, keyboard-navigable list built by the page: events, categories, places, then "see all".
function SuggestionPanel({ q, options, activeIndex, onPick, onSubmit, loading }) {
  if (q.trim().length < 2) {
    return <div className="px-3 py-5 text-sm text-muted">Keep typing to see suggestions, or press Enter to search.</div>
  }
  if (options.length === 0 && loading) {
    return <div className="px-3 py-5 text-sm text-muted">Searching…</div>
  }
  if (options.length === 0) {
    return (
      <div className="px-3 py-5">
        <div className="text-base font-bold">No matches for “{q}”</div>
        <div className="mt-1 text-sm text-muted">Check the spelling, or try a broader word like “market”, “expo” or “music”.</div>
      </div>
    )
  }
  const group = (kind, title) => {
    const items = options.filter((o) => o.kind === kind)
    if (items.length === 0) return null
    return (
      <div key={kind} className="pb-2">
        <div className={`${heading} px-3 pt-2.5 pb-1.5`}>{title}</div>
        {items.map((o) => {
          const active = o.index === activeIndex
          if (kind === 'event') {
            return (
              <Link key={o.id} to={`/events/${o.id}`} role="option" aria-selected={active} className={row(active)}>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-base">{o.pre}<strong className="font-extrabold">{o.mid}</strong>{o.post}</span>
                  <span className="text-[13px] text-muted">{o.date} · {o.venue}</span>
                </span>
                <span className="flex-none text-[13px] font-semibold text-muted">{o.type}</span>
              </Link>
            )
          }
          const Icon = kind === 'category' ? LayoutGrid : MapPin
          return (
            <button
              key={o.label}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => onPick(o)}
              className={`${row(active)} w-full cursor-pointer border-0 bg-transparent text-left text-base`}
            >
              <Icon size={18} className="text-primary" aria-hidden="true" />
              <span className="flex-1">{o.label}</span>
              <span className="text-[13px] text-muted">{o.count ?? 'Category'}</span>
            </button>
          )
        })}
      </div>
    )
  }
  const seeAll = options.find((o) => o.kind === 'all')
  return (
    <>
      {group('event', 'Events')}
      {group('category', 'Categories')}
      {group('place', 'Areas & venues')}
      <button
        type="button"
        role="option"
        aria-selected={seeAll.index === activeIndex}
        onClick={onSubmit}
        className={`${row(seeAll.index === activeIndex)} w-full cursor-pointer justify-between border-0 border-t border-line bg-transparent text-[15px] font-bold text-primary`}
      >
        <span>See all results for “{q}”</span>
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </>
  )
}

export default function SearchPanel({ q, options, activeIndex, onPick, onSubmit, loading, recent, popular }) {
  return (
    <div id="s-panel" role="listbox" aria-label="Search suggestions" className="mt-2.5 rounded-card border border-line bg-surface p-3 shadow-[0_12px_32px_rgba(32,40,32,0.10)]">
      {q.trim() === '' ? <EmptyPanel onPick={onPick} recent={recent} popular={popular} /> : <SuggestionPanel q={q} options={options} activeIndex={activeIndex} onPick={onPick} onSubmit={onSubmit} loading={loading} />}
      <div className="mt-1 border-t border-line px-3 pt-2.5 text-xs text-muted">↑ ↓ to move · Enter to open · Esc to close</div>
    </div>
  )
}
