import { ChevronDown } from 'lucide-react'
import Section from '../../components/ui/Section'

const faqs = [
  ['Is there a fee to list?', '[Your listing fee policy.]'],
  ['How long does review take?', '[Your review SLA.] We check dates, venue and photos before publishing.'],
  ['Do you sell tickets?', 'Add your own ticket link; visitors are sent to it from your event page.'],
  ['Can I edit my listing after it\'s live?', 'Yes — changes to dates or venue are re-reviewed.'],
]

export default function Faq() {
  return (
    <Section id="l-faq" lead="Common" emphasis="questions" className="pt-24 pb-24">
      <div className="mt-8 max-w-[860px] border-t border-line">
        {faqs.map(([q, a]) => (
          <details key={q} className="group border-b border-line">
            <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
              {q}
              <ChevronDown size={20} className="flex-none text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="m-0 pb-5 text-base leading-relaxed text-muted">{a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
