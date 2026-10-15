import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import Button from '../../components/ui/Button'

export default function OrganizerCTA() {
  return (
    <Container as="section" aria-labelledby="cta" className="py-28">
      <div className="rounded-card bg-primary-soft px-[clamp(24px,5vw,64px)] py-[clamp(40px,6vw,80px)] text-center">
        <Eyebrow>For organizers</Eyebrow>
        <h2 id="cta" className="mt-3.5 mb-0 text-[clamp(32px,4vw,52px)] font-light tracking-[-0.03em]">
          Hosting something <span className="font-bold text-primary">worth discovering?</span>
        </h2>
        <p className="mx-auto mt-4 mb-0 max-w-[540px] text-[17px] leading-[1.6] text-muted">
          List exhibitions, festivals, workshops and meetups for people across Hyderabad who are looking for their next plan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/list-event" className="!min-h-14 !bg-accent !px-8 text-[19px] hover:!bg-accent/90 !text-white">List Your Event</Button>
          <Button to="#" variant="outline" className="!min-h-14 !px-6 text-base">How listing works</Button>
        </div>
      </div>
    </Container>
  )
}
