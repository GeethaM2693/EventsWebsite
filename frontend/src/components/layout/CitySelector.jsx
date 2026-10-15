import { ChevronDown, MapPin } from 'lucide-react'
import { DEFAULT_CITY } from '../../data/site'

export default function CitySelector() {
  return (
    <button
      type="button"
      className="flex min-h-11 cursor-pointer items-center gap-1.5 rounded-control border border-line bg-surface px-3 text-[15px] font-semibold text-primary"
    >
      <MapPin size={16} aria-hidden="true" />
      {DEFAULT_CITY}
      <ChevronDown size={16} aria-hidden="true" />
    </button>
  )
}
