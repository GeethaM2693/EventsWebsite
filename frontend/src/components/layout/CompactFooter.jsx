import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import { BRAND } from '../../data/site'

const variants = {
  default: {
    note: `© 2026 ${BRAND} · Listings shown are sample data, not verified events.`,
    links: [['About', '#'], ['Contact', '#'], ['List your event', '/list-event'], ['Privacy', '#']],
  },
  organizer: {
    note: `© 2026 ${BRAND} · Organizer support: organizers@[yourdomain].com`,
    links: [['Listing guidelines', '#'], ['Contact', '#'], ['Privacy', '#'], ['Terms', '#']],
  },
}

export default function CompactFooter({ variant = 'default' }) {
  const { note, links } = variants[variant]
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-wrap justify-between gap-4 py-8 text-sm text-muted">
        <span>{note}</span>
        <span className="flex flex-wrap gap-5">
          {links.map(([label, to]) => <Link key={label} to={to}>{label}</Link>)}
        </span>
      </Container>
    </footer>
  )
}
