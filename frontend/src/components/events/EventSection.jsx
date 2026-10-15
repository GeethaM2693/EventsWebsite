import Section from '../ui/Section'

// Section whose content is a list of event cards. `layout` decides how they're arranged.
const layouts = {
  detailed: 'grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6',
  compact: 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-6 gap-y-8',
  editorial: 'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-8 gap-y-12',
  wide: 'grid grid-cols-[repeat(auto-fill,minmax(min(100%,480px),1fr))] gap-x-8 gap-y-12',
}

export default function EventSection({ layout = 'detailed', gap = 'mt-8', children, ...sectionProps }) {
  return (
    <Section {...sectionProps}>
      <div className={`${gap} ${layouts[layout]}`}>{children}</div>
    </Section>
  )
}
