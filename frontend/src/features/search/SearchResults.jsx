import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import Chip from '../../components/ui/Chip'
import PhotoPlaceholder from '../../components/ui/PhotoPlaceholder'
import { tabExtraClass } from '../../components/ui/UnderlineTabs'

const dateTabs = ['Any date', 'Today', 'This Weekend', 'This Month']

// hits: events for the current facet; facets: [{ label, count }] for the whole query; total: all matches.
export default function SearchResults({ q, hits, facets: facetCounts, facet, onFacet, onPickPopular, popular, loading }) {
  const facets = ['All', ...facetCounts.map((f) => f.label)]
  const shown = hits
  const all = facetCounts.reduce((n, f) => n + f.count, 0) // matches across every type, whichever facet is selected
  const count = (f) => (f === 'All' ? facetCounts.reduce((n, x) => n + x.count, 0) : facetCounts.find((x) => x.label === f)?.count ?? 0)

  return (
    <section aria-labelledby="s-res" className="pt-10 pb-24">
      <h1 id="s-res" className="m-0 text-[clamp(28px,3.4vw,40px)] font-light tracking-[-0.02em]">
        {all} {all === 1 ? 'result' : 'results'} for <span className="font-bold text-primary">“{q}”</span>
      </h1>

      <div role="group" aria-label="Date shortcuts" className="mt-5 flex flex-wrap gap-x-7">
        {dateTabs.map((t, i) => (
          <button key={t} type="button" aria-pressed={i === 0} className={`${tabExtraClass} cursor-pointer ${i === 0 ? '!border-primary !font-bold !text-primary' : ''}`}>
            {t}
          </button>
        ))}
        <Link to="/dates" className={tabExtraClass}><Calendar size={16} aria-hidden="true" />Custom Dates</Link>
      </div>

      {all > 0 ? (
        <>
          <div role="group" aria-label="Filter by type" className="mt-5 flex flex-wrap gap-2">
            {facets.map((f) => (
              <Chip key={f} shape="facet" active={f === facet} onClick={() => onFacet(f)}>
                {f} <span className="opacity-70">({count(f)})</span>
              </Chip>
            ))}
          </div>
          <div className={`mt-8 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-6 gap-y-7 transition-opacity ${loading ? 'opacity-60' : ''}`}>
            {shown.map((e) => (
              <article key={e.id} className="relative flex flex-col overflow-hidden rounded-card border border-line bg-surface">
                <PhotoPlaceholder tone={e.tone} label={e.photo} className="aspect-[4/3]">
                  <span className="absolute left-3 top-3 rounded-full bg-surface px-3 py-1.5 text-[13px] font-extrabold text-primary-deep">{e.date}</span>
                </PhotoPlaceholder>
                <div className="flex flex-col gap-1.5 px-5 pt-[18px] pb-5">
                  <div className="text-xs font-bold uppercase tracking-[0.1em] text-primary">{e.type}</div>
                  <h2 className="m-0 text-lg font-bold leading-[1.3]">
                    <Link to={`/events/${e.id}`} className="text-ink no-underline before:absolute before:inset-0 hover:text-primary">{e.title}</Link>
                  </h2>
                  <div className="text-sm text-muted">{e.venue} · {e.price}</div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-card border border-line bg-surface px-6 py-14 text-center">
          <h2 className="m-0 text-2xl font-bold">No events match “{q}”</h2>
          <p className="mt-2.5 mb-0 text-base text-muted">Try a different spelling or a broader word. These are popular right now:</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {popular.map((p) => <Chip key={p} shape="facet" onClick={() => onPickPopular(p)}>{p}</Chip>)}
          </div>
        </div>
      )}
    </section>
  )
}
