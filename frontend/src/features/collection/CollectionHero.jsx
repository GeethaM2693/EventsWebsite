import Container from '../../components/ui/Container'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Eyebrow from '../../components/ui/Eyebrow'
import PageTitle from '../../components/ui/PageTitle'
import PhotoPlaceholder from '../../components/ui/PhotoPlaceholder'

export default function CollectionHero({ collection: c, total }) {
  return (
    <section className="bg-primary-soft">
      <Container className="flex flex-wrap items-end gap-x-14 gap-y-8 pt-12 pb-10">
        <div className="flex-[3_1_480px]">
          <Breadcrumb className="text-primary-deep" items={[{ label: 'Home', to: '/' }, { label: 'Explore', to: '/explore' }, { label: c.crumb }]} />
          <Eyebrow className="mt-5">{c.eyebrow}</Eyebrow>
          <PageTitle lead={c.titleA} emphasis={c.titleB} size="lg" className="mt-2.5" />
          <p className="mt-4 mb-0 max-w-[560px] text-[18px] leading-[1.6] text-primary-deep">{c.intro}</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-bold text-primary-deep">
            <span>{total} events</span><span>·</span><span>{c.span}</span>
          </div>
        </div>
        <PhotoPlaceholder tone={c.heroTone} label={c.heroPhoto} className="aspect-[4/3] flex-[2_1_320px] rounded-card" />
      </Container>
    </section>
  )
}
