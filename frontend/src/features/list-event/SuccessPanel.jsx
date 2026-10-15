import { CheckCircle2 } from 'lucide-react'
import Button from '../../components/ui/Button'

export default function SuccessPanel({ onReset }) {
  return (
    <div role="status" className="flex flex-col items-center py-10 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-primary-soft text-primary">
        <CheckCircle2 size={32} aria-hidden="true" />
      </span>
      <h3 className="m-0 mt-5 text-[28px] font-bold">Submitted for review</h3>
      <p className="mt-2.5 mb-0 max-w-[420px] text-base leading-relaxed text-muted">
        We'll email you once it's approved. Review time: [your review SLA].
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button to="/">Back to homepage</Button>
        <Button variant="outline" onClick={onReset}>List another event</Button>
      </div>
    </div>
  )
}
