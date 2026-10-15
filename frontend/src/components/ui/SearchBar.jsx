import { Search } from 'lucide-react'

// Big search field with terracotta submit button. Used on Home and Explore.
export default function SearchBar({ id, onSubmit, defaultValue, className = '' }) {
  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={`flex max-w-[760px] items-center gap-2 rounded-card border border-line bg-surface py-2 pr-2 pl-5 shadow-[0_1px_2px_rgba(32,40,32,0.04)] ${className}`}
    >
      <label htmlFor={id} className="flex items-center text-muted">
        <Search size={20} aria-hidden="true" />
        <span className="sr-only">Search events</span>
      </label>
      <input
        id={id}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Search events, exhibitions, activities..."
        className="h-12 min-w-0 flex-1 border-0 bg-transparent text-[17px] font-medium text-ink outline-none"
      />
      <button type="submit" className="h-[52px] flex-none cursor-pointer rounded-control border-0 bg-accent px-7 text-[19px] font-bold text-white">
        Search
      </button>
    </form>
  )
}
