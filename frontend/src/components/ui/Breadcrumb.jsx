import { Link } from 'react-router-dom'
import { Fragment } from 'react'

// items: [{ label, to }] — the last item is the current page and renders as plain text.
export default function Breadcrumb({ items, className = 'text-muted' }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && ' / '}
          {item.to ? <Link to={item.to} className="font-semibold">{item.label}</Link> : item.label}
        </Fragment>
      ))}
    </nav>
  )
}
