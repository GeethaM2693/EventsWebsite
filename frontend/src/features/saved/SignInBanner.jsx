import { Cloud } from 'lucide-react'
import Button from '../../components/ui/Button'

export default function SignInBanner() {
  return (
    <section aria-label="Sign in" className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 rounded-card border border-line bg-surface p-5">
      <span className="flex size-12 flex-none items-center justify-center rounded-control bg-primary-soft text-primary">
        <Cloud size={22} aria-hidden="true" />
      </span>
      <div className="flex-[1_1_280px]">
        <div className="text-[17px] font-bold">Keep your list on every device</div>
        <div className="mt-0.5 text-[15px] text-muted">Sign in to sync saved events and get a reminder the day before.</div>
      </div>
      <div className="flex gap-3">
        <Button to="#">Sign in</Button>
        <Button to="#" variant="outline">Create account</Button>
      </div>
    </section>
  )
}
