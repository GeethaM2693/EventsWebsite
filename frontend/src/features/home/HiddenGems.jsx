import Section from '../../components/ui/Section'
import SectionLink from '../../components/ui/SectionLink'
import PhotoPlaceholder from '../../components/ui/PhotoPlaceholder'
import SaveButton from '../../components/events/SaveButton'

export default function HiddenGems({ places }) {
  return (
    <Section id="gems" lead="Hidden gems" emphasis="& unique experiences" action={<SectionLink to="/collections/hidden-gems">More places</SectionLink>}>
      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-6 gap-y-10">
        {places.map((g) => (
          <article key={g.id} className="flex flex-col gap-2.5">
            <PhotoPlaceholder tone={g.tone} label={g.photo} className="mb-1.5 aspect-[4/5] rounded-[14px]">
              <SaveButton kind="places" slug={g.id} title={g.name} className="absolute right-3 top-3" />
            </PhotoPlaceholder>
            <div className="text-[13px] font-extrabold tracking-[0.08em] text-primary">{g.n} · {g.area}</div>
            <h3 className="m-0 text-xl font-bold">{g.name}</h3>
            <p className="m-0 text-[15px] leading-[1.55] text-muted">{g.note}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
