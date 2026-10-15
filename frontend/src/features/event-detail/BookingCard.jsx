import { useState } from 'react'
import { CalendarPlus } from 'lucide-react'
import Button from '../../components/ui/Button'

const stepper = 'size-11 cursor-pointer rounded-[10px] border-0 bg-primary-soft text-xl font-extrabold text-primary-deep'

export default function BookingCard({ pass }) {
  const [day, setDay] = useState(pass.days[0].id)
  const [qty, setQty] = useState(2)
  const current = pass.days.find((d) => d.id === day)
  const priced = pass.price > 0
  const total = priced ? `₹${(qty * pass.price).toLocaleString('en-IN')}` : 'Free'

  return (
    <aside aria-labelledby="d-book" className="flex flex-[1_1_320px] flex-col gap-5 rounded-card border border-line bg-surface p-7 lg:sticky lg:top-6">
      <div>
        <h2 id="d-book" className="m-0 text-[13px] font-bold uppercase tracking-widest text-primary">{priced ? 'Entry pass' : 'Entry'}</h2>
        <div className="mt-1.5 text-[34px] font-extrabold tracking-[-0.02em]">
          {priced ? <>₹{pass.price.toLocaleString('en-IN')} <span className="text-[15px] font-medium text-muted">{pass.unit}</span></> : pass.priceLabel}
        </div>
      </div>

      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-2.5 text-sm font-bold">Choose a date</legend>
        <div className="grid grid-cols-2 gap-2.5">
          {pass.days.map((d) => {
            const on = d.id === day
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={on}
                onClick={() => setDay(d.id)}
                className={`min-h-16 cursor-pointer rounded-control px-3.5 py-2 text-left ${on ? 'border-2 border-primary bg-primary-soft text-primary-deep' : 'border border-line bg-surface text-ink'}`}
              >
                <span className="block text-[13px] font-semibold">{d.weekday}</span>
                <span className="block text-lg font-extrabold">{d.label}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <div>
        <div className="mb-2.5 text-sm font-bold">Passes</div>
        <div className="flex items-center justify-between rounded-control border border-line p-1">
          <button type="button" aria-label="Fewer passes" onClick={() => setQty((q) => Math.max(1, q - 1))} className={stepper}>−</button>
          <span aria-live="polite" className="text-lg font-extrabold">{qty}</span>
          <button type="button" aria-label="More passes" onClick={() => setQty((q) => Math.min(10, q + 1))} className={stepper}>+</button>
        </div>
      </div>

      <div className="flex items-baseline justify-between border-t border-line pt-4">
        <span className="text-[15px] text-muted">Total · {current.weekday} {current.label}</span>
        <span className="text-[22px] font-extrabold">{total}</span>
      </div>

      <Button to="#" className="!min-h-14 !bg-accent text-[19px] !text-white hover:!bg-accent/90">{priced ? 'Get passes' : 'Reserve a spot'}</Button>
      <Button variant="outline" className="!min-h-12 !bg-surface">
        <CalendarPlus size={18} aria-hidden="true" />
        Add to calendar
      </Button>
      <p className="m-0 text-[13px] leading-relaxed text-muted">
        Passes are sold by the organizer via [ticketing partner]. Refund policy: [organizer policy].
      </p>
    </aside>
  )
}
