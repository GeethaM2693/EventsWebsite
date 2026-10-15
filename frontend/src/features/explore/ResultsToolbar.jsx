import { X } from 'lucide-react'
import { sortOptions } from '../../data/filters'

export default function ResultsToolbar({ count, label, view, onView, sort, onSort, activeCategories, onRemoveCategory }) {
  const toggle = (on) =>
    `min-h-11 cursor-pointer border-0 px-4 text-sm font-bold ${on ? 'bg-primary text-white' : 'bg-surface text-primary'}`
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="x-results" className="m-0 text-[22px] font-bold">
          {count} events · <span className="text-primary">{label}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-muted">
            Sort
            <select value={sort} onChange={(e) => onSort(e.target.value)} className="min-h-11 rounded-control border border-line bg-surface px-2.5 text-sm font-semibold text-ink">
              {sortOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
          <div role="group" aria-label="View" className="flex overflow-hidden rounded-control border border-line bg-surface">
            <button type="button" aria-pressed={view === 'list'} onClick={() => onView('list')} className={toggle(view === 'list')}>Cards</button>
            <button type="button" aria-pressed={view === 'map'} onClick={() => onView('map')} className={toggle(view === 'map')}>Map</button>
          </div>
        </div>
      </div>

      {activeCategories.length > 0 && (
        <div className="mt-3.5 flex flex-wrap gap-2">
          {activeCategories.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => onRemoveCategory(name)}
              className="flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border border-primary bg-primary-soft px-3 text-[13px] font-semibold text-primary-deep"
            >
              {name}
              <X size={14} aria-hidden="true" />
              <span className="sr-only">Remove filter</span>
            </button>
          ))}
        </div>
      )}
    </>
  )
}
