import { Link } from 'react-router-dom'
import Section from '../../components/ui/Section'

const swatch = { olive: 'bg-primary', deep: 'bg-primary-deep', soft: 'bg-primary-soft', warm: 'bg-accent-soft', accent: 'bg-accent' }

export default function RelatedCollections({ current, collections }) {
  return (
    <Section id="c-rel" lead="More" emphasis="collections" className="pt-20">
      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {collections.filter((c) => c.slug !== current).map((c) => {
          return (
            <Link key={c.slug} to={`/collections/${c.slug}`} className="flex flex-col gap-1.5 rounded-card border border-line bg-surface p-4 text-ink no-underline hover:border-primary">
              <span className={`mb-2 h-10 rounded-control ${swatch[c.heroTone]}`} />
              <span className="text-base font-bold">{c.label}</span>
              <span className="text-sm text-muted">{c.eventCount} events</span>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}
