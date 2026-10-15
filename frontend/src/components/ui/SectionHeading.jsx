// Light lead-in + bold olive emphasis, e.g. <SectionHeading lead="Happening" emphasis="today" />
export default function SectionHeading({ id, lead, emphasis, trail, as: Tag = 'h2', className = '' }) {
  return (
    <Tag
      id={id}
      className={`m-0 text-[clamp(28px,3vw,40px)] font-light tracking-[-0.02em] ${className}`}
    >
      {lead} <span className="font-bold text-primary">{emphasis}</span>
      {trail && ` ${trail}`}
    </Tag>
  )
}
