import Container from './Container'
import SectionHeading from './SectionHeading'

// Standard homepage band: heading + optional right-side action, then content.
export default function Section({ id, lead, emphasis, trail, action, subtitle, className = 'pt-28', children }) {
  return (
    <Container as="section" aria-labelledby={id} className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <SectionHeading id={id} lead={lead} emphasis={emphasis} trail={trail} />
        {action}
      </div>
      {subtitle}
      {children}
    </Container>
  )
}
