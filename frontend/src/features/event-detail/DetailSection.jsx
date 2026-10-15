import SectionHeading from '../../components/ui/SectionHeading'

export default function DetailSection({ id, lead, emphasis, children }) {
  return (
    <section aria-labelledby={id}>
      <SectionHeading id={id} lead={lead} emphasis={emphasis} className="!text-[clamp(26px,2.6vw,34px)]" />
      <div className="mt-5">{children}</div>
    </section>
  )
}
