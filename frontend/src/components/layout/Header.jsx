import { NavLink } from 'react-router-dom'
import { Heart, Search } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Logo from './Logo'
import CitySelector from './CitySelector'

const navLink = ({ isActive }) =>
  `flex items-center gap-1.5 text-[15px] no-underline ${isActive ? 'font-bold text-primary' : 'font-semibold text-ink hover:text-primary'}`

// variant="simple" is the search page's reduced header (no city selector or search icon).
export default function Header({ variant = 'full' }) {
  const full = variant === 'full'
  return (
    <header className="border-b border-line">
      <Container className="flex flex-wrap items-center gap-x-7 gap-y-3 py-[18px]">
        <Logo />
        {full && <CitySelector />}
        <nav aria-label="Main" className="ml-auto flex flex-wrap items-center gap-x-7 gap-y-2">
          <NavLink to="/explore" className={navLink}>Explore</NavLink>
          <NavLink to="/saved" className={navLink}>
            {full && <Heart size={18} strokeWidth={1.8} className="text-primary" aria-hidden="true" />}
            Saved Events
          </NavLink>
          {full && (
            <NavLink
              to="/search"
              aria-label="Search"
              className="flex size-11 items-center justify-center rounded-control border border-line bg-surface text-primary"
            >
              <Search size={18} aria-hidden="true" />
            </NavLink>
          )}
          <Button to="/list-event" variant="outline">Register as organizer</Button>
        </nav>
      </Container>
    </header>
  )
}
