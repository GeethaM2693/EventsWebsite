import Container from '../../components/ui/Container'
import HeroSearch from './HeroSearch'
import DateShortcuts from './DateShortcuts'
import { DEFAULT_CITY, SAMPLE_DATE_LABEL } from '../../data/site'

export default function Hero() {
  return (
    <Container as="section" className="pt-[clamp(64px,9vw,120px)] pb-12 text-center">
      <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-primary">
        {DEFAULT_CITY} · {SAMPLE_DATE_LABEL}
      </div>
      <h1 className="mt-5 mb-0 text-[clamp(44px,7.4vw,92px)] font-light leading-[1.02] tracking-[-0.035em]">
        Your City.<br />
        <span className="font-bold text-primary">Your Next Experience.</span>
      </h1>
      <p className="mx-auto mt-6 mb-0 max-w-[560px] text-[19px] leading-[1.55] text-muted">
        A curated guide to exhibitions, festivals, markets and things worth doing — today, this weekend and all month.
      </p>
      <HeroSearch />
      <DateShortcuts />
    </Container>
  )
}
