import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'
import Section from '../../components/ui/Section'

export default function CategoryGrid() {
  return (
    <Section id="categories" lead="Browse" emphasis="categories">
      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] border-t border-line">
        {categories.map(({ name, hint, Icon }) => (
          <Link
            key={name}
            to="/explore"
            className="flex items-center gap-4 border-b border-line px-1 py-[22px] text-ink no-underline hover:bg-primary-soft/40"
          >
            <Icon size={26} strokeWidth={1.6} className="shrink-0 text-primary" aria-hidden="true" />
            <span>
              <span className="block text-[17px] font-bold">{name}</span>
              <span className="text-sm text-muted">{hint}</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}
