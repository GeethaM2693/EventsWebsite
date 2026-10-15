import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { BRAND } from '../../data/site'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-primary-deep no-underline">
      <span className="flex size-[34px] items-center justify-center rounded-[10px] bg-primary">
        <MapPin size={18} strokeWidth={2} color="#fff" aria-hidden="true" />
      </span>
      {BRAND}
    </Link>
  )
}
