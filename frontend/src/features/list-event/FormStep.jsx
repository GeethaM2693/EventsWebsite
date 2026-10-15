import Button from '../../components/ui/Button'
import { CheckboxField, FieldGroup, FormErrors, SelectInput, TextArea, TextInput } from '../../components/ui/FormField'
import { useContext } from 'react'
import { Upload } from 'lucide-react'

const grid = 'grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5'
const formCls = 'flex flex-col gap-6'
const title = 'm-0 text-2xl font-bold'

export function OrganizerStep({ hidden, onNext }) {
  return (
    <form hidden={hidden} onSubmit={(e) => e.preventDefault()} className={formCls}>
      <h3 className={title}>1. Organizer details</h3>
      <div className={grid}>
        <TextInput id="o-name" name="organizer.name" label="Organizer or company name" placeholder="e.g. Deccan Events Collective" />
        <SelectInput id="o-type" name="organizer.type" label="Organizer type" options={['Event company', 'Venue', 'Independent organizer', 'Brand or business', 'Community or non-profit']} />
        <TextInput id="o-contact" name="organizer.contact" label="Contact person" placeholder="Full name" />
        <TextInput id="o-email" name="organizer.email" type="email" label="Email" placeholder="you@company.com" />
        <TextInput id="o-phone" name="organizer.phone" type="tel" label="Phone" placeholder="+91" />
        <TextInput id="o-web" name="organizer.website" type="url" label="Website or social link" optional placeholder="https://" />
      </div>
      <div className="flex justify-end"><Button onClick={onNext}>Continue to event details</Button></div>
    </form>
  )
}

export function EventStep({ hidden, onBack, onNext }) {
  return (
    <form hidden={hidden} onSubmit={(e) => e.preventDefault()} className={formCls}>
      <h3 className={title}>2. Event details</h3>
      <TextInput id="e-title" name="event.title" label="Event title" placeholder="e.g. Weekend Makers' Bazaar" />
      <div className={grid}>
        <SelectInput id="e-cat" name="event.category" label="Category" options={['Exhibition or expo', 'Food, flea or pop-up', 'Concert or comedy', 'Culture or festival', 'Family or kids', 'Workshop or class', 'Adventure or outdoors', 'Business, tech or jobs']} />
        <SelectInput id="e-area" name="event.area" label="Area" options={['Madhapur & Hitech City', 'Banjara & Jubilee Hills', 'Gachibowli & Kokapet', 'Secunderabad', 'Old City', 'Other']} />
        <TextInput id="e-start" name="event.startDate" type="date" label="Start date" />
        <TextInput id="e-end" name="event.endDate" type="date" label="End date" />
        <TextInput id="e-from" name="event.opensAt" type="time" label="Opens at" />
        <TextInput id="e-to" name="event.closesAt" type="time" label="Closes at" />
      </div>
      <TextInput id="e-venue" name="event.venue" label="Venue name and address" placeholder="Venue, street, area, PIN code" />
      <TextArea id="e-desc" name="event.description" label="Description" rows={5} placeholder="What will people see, do or eat? Who is it for?" hint="Keep it to 2–3 short paragraphs." />
      <FieldGroup legend="Good for">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {['Families with kids', 'Outdoors', 'Wheelchair accessible', 'Pet-friendly'].map((g) => <CheckboxField key={g} name="event.goodFor" value={g} label={g} />)}
        </div>
      </FieldGroup>
      <div className="flex flex-wrap justify-between gap-3">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Continue to tickets &amp; photos</Button>
      </div>
    </form>
  )
}

function ConfirmField() {
  const error = useContext(FormErrors).confirmed
  return (
    <div>
      <CheckboxField name="confirmed">
        I confirm the details are accurate and I'm authorised to list this event. I agree to the <a href="#" className="font-semibold">listing guidelines</a>.
      </CheckboxField>
      {error && <span role="alert" className="text-[13px] font-semibold text-accent">{error}</span>}
    </div>
  )
}

const entryOptions = [
  { id: 'free', label: 'Free entry' },
  { id: 'paid', label: 'Paid tickets' },
  { id: 'rsvp', label: 'Free, RSVP required' },
]

export function TicketsStep({ hidden, entry, onEntry, onBack, onSubmit, onDraft, busy, notice }) {
  return (
    <form hidden={hidden} onSubmit={(e) => e.preventDefault()} className={formCls}>
      <h3 className={title}>3. Tickets &amp; photos</h3>
      <FieldGroup legend="Entry">
        <div role="radiogroup" className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2.5">
          {entryOptions.map((o) => {
            const on = o.id === entry
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => onEntry(o.id)}
                className={`min-h-[52px] cursor-pointer rounded-control text-[15px] font-bold ${on ? 'border-2 border-primary bg-primary-soft text-primary-deep' : 'border border-line bg-surface text-ink'}`}
              >
                {o.label}
              </button>
            )
          })}
        </div>
      </FieldGroup>

      {entry === 'paid' && (
        <div className={grid}>
          <TextInput id="t-price" name="price" type="number" label="Starting price (₹)" placeholder="e.g. 499" />
          <TextInput id="t-link" name="ticketLink" type="url" label="Ticket link" placeholder="https://" />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-bold">Photos</span>
        <label
          htmlFor="t-photos"
          className="flex cursor-pointer flex-col items-center gap-1.5 rounded-card border-[1.5px] border-dashed border-primary bg-primary-soft/40 px-6 py-10 text-center"
        >
          <Upload size={28} className="text-primary" aria-hidden="true" />
          <span className="text-base font-bold">Drop photos here or choose files</span>
          <span className="text-sm text-muted">Up to 6 landscape photos, JPG or PNG. Your first photo becomes the cover.</span>
          <input id="t-photos" name="photos" type="file" multiple accept="image/*" className="sr-only" />
        </label>
      </div>

      <ConfirmField />

      {notice && <p role="status" className={`m-0 text-sm font-semibold ${notice.error ? 'text-accent' : 'text-primary'}`}>{notice.text}</p>}
      <div className="flex flex-wrap justify-between gap-3">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={onDraft} disabled={busy}>Save draft</Button>
          <Button onClick={onSubmit} disabled={busy}>{busy ? 'Submitting…' : 'Submit for review'}</Button>
        </div>
      </div>
    </form>
  )
}
