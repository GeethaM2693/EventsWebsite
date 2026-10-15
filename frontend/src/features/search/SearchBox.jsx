import { Search, X } from 'lucide-react'

export default function SearchBox({ value, onChange, onClear, onSubmit, onKeyDown }) {
  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className="flex items-center gap-2 rounded-card border-2 border-primary bg-surface py-2 pr-2 pl-5 shadow-[0_6px_24px_rgba(32,40,32,0.08)]"
    >
      <label htmlFor="s-q" className="flex text-primary">
        <Search size={22} aria-hidden="true" />
        <span className="sr-only">Search</span>
      </label>
      <input
        id="s-q"
        type="search"
        autoFocus
        autoComplete="off"
        aria-autocomplete="list"
        aria-controls="s-panel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search events, exhibitions, activities..."
        className="h-[52px] min-w-0 flex-1 border-0 bg-transparent text-lg font-medium text-ink outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={onClear}
          className="flex size-11 flex-none cursor-pointer items-center justify-center rounded-control border-0 bg-primary-soft text-primary-deep"
        >
          <X size={18} aria-hidden="true" />
        </button>
      )}
      <button type="submit" className="h-14 flex-none cursor-pointer rounded-control border-0 bg-accent px-7 text-[19px] font-bold text-white">
        Search
      </button>
    </form>
  )
}
