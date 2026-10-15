import { Link } from 'react-router-dom'
import { Calendar, Map } from 'lucide-react'
import Chip from '../../components/ui/Chip'
import UnderlineTabs, { tabExtraClass } from '../../components/ui/UnderlineTabs'
import { collectionDateTabs } from '../../data/collections'

// collections: [{ slug, label }] from /api/collections
export function CollectionSwitcher({ current, collections }) {
  return (
    <nav aria-label="Collections" className="flex gap-2 overflow-x-auto pt-6 pb-1">
      {collections.map(({ slug, label }) => (
        <Link
          key={slug}
          to={`/collections/${slug}`}
          aria-current={slug === current ? 'page' : undefined}
          className={`flex min-h-11 items-center whitespace-nowrap rounded-full px-4 text-sm font-bold no-underline ${slug === current ? 'border border-primary bg-primary text-white hover:text-white' : 'border border-line bg-surface text-ink hover:bg-primary-soft'}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

export function DateAndSortBar({ activeDate }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line">
      <UnderlineTabs
        items={collectionDateTabs}
        value={activeDate}
        onChange={() => {}}
        label="Date shortcuts"
        extra={<Link to="/dates" className={tabExtraClass}><Calendar size={16} aria-hidden="true" />Custom Dates</Link>}
      />
      <div className="flex items-center gap-4 pb-2">
        <label className="flex items-center gap-2 text-sm text-muted">
          Sort
          <select className="min-h-11 rounded-control border border-line bg-surface px-2.5 text-sm font-semibold text-ink">
            {['Soonest first', 'Recommended', 'Nearest', 'Price: low to high'].map((o) => <option key={o}>{o}</option>)}
          </select>
        </label>
        <Link to="/explore" className="flex min-h-11 items-center gap-1.5 text-sm font-bold no-underline">
          <Map size={16} aria-hidden="true" />Map
        </Link>
      </div>
    </div>
  )
}

export function SubFilters({ subs, value, onChange }) {
  return (
    <div role="group" aria-label="Refine" className="mt-5 flex flex-wrap gap-2">
      {subs.map((s) => <Chip key={s} shape="soft" active={s === value} onClick={() => onChange(s)}>{s}</Chip>)}
    </div>
  )
}
