import { useRef, useState } from 'react'
import Container from '../components/ui/Container'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import { FormErrors } from '../components/ui/FormField'
import WhyList from '../features/list-event/WhyList'
import Steps from '../features/list-event/Steps'
import Faq from '../features/list-event/Faq'
import SuccessPanel from '../features/list-event/SuccessPanel'
import { EventStep, OrganizerStep, TicketsStep } from '../features/list-event/FormStep'
import { api } from '../lib/api'
import { buildPayload, setIn, stepForField } from '../lib/listing'

export default function ListEventPage() {
  const [step, setStep] = useState(1)
  const [entry, setEntry] = useState('paid')
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState(null)
  const [busy, setBusy] = useState(false)
  const [formKey, setFormKey] = useState(0) // bumping this remounts the inputs to clear them
  const values = useRef({})
  const draft = useRef(null) // { id, token } once a draft has been saved

  // Mirror every input into `values` as it changes (events bubble up from the three forms).
  const onChange = (e) => {
    const { name, type, value, checked, files } = e.target
    if (!name) return
    let v = value
    if (type === 'checkbox' && name === 'event.goodFor') {
      const list = new Set(values.current.event?.goodFor ?? [])
      if (checked) list.add(value)
      else list.delete(value)
      v = [...list]
    } else if (type === 'checkbox') v = checked
    else if (type === 'file') {
      values.current = setIn(values.current, 'photoCount', files.length)
      return
    }
    values.current = setIn(values.current, name, v)
    if (errors[name]) setErrors(({ [name]: _gone, ...rest }) => rest)
  }

  const send = async (asDraft) => {
    setBusy(true)
    setNotice(null)
    try {
      const body = buildPayload(values.current, entry, { draft: asDraft })
      const res = draft.current
        ? await api.put(`/organizer/submissions/${draft.current.id}`, body, { headers: { 'X-Edit-Token': draft.current.token } })
        : await api.post('/organizer/submissions', body)
      if (asDraft) {
        draft.current = { id: res.data.id, token: res.data.editToken ?? draft.current?.token }
        setNotice({ text: 'Draft saved. You can keep editing and submit when ready.' })
        setErrors({})
      } else {
        draft.current = null
        setErrors({})
        setStep(4)
      }
    } catch (err) {
      if (err.fields) {
        setErrors(err.fields)
        setStep(Math.min(...Object.keys(err.fields).map(stepForField)))
        setNotice({ error: true, text: 'Please fix the highlighted fields.' })
      } else {
        setNotice({ error: true, text: err.message })
      }
    } finally {
      setBusy(false)
    }
  }

  const reset = () => {
    values.current = {}
    draft.current = null
    setErrors({})
    setNotice(null)
    setFormKey((k) => k + 1)
    setStep(1)
  }

  return (
    <>
      <Container as="section" className="pt-14">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'List your event' }]} />
        <h1 className="m-0 mt-3.5 text-[clamp(38px,5.6vw,72px)] font-light leading-[1.02] tracking-[-0.035em]">
          List your event.<br />
          <span className="font-bold text-primary">Reach people making plans.</span>
        </h1>
        <p className="mt-6 mb-0 max-w-[620px] text-[19px] leading-[1.55] text-muted">
          Exhibitions, festivals, markets, workshops, concerts and meetups across Hyderabad — shown to people browsing what to do today, this weekend and this month.
        </p>
      </Container>

      <WhyList />

      <Container as="section" aria-labelledby="l-form" className="flex flex-wrap items-start gap-x-14 gap-y-8 pt-24">
        <div className="flex-[1_1_260px] lg:sticky lg:top-6">
          <SectionHeading id="l-form" lead="Submit" emphasis="your event" className="!text-[clamp(28px,3vw,36px)]" />
          <p className="mt-3 mb-0 text-base leading-relaxed text-muted">Takes about five minutes. Every listing is reviewed before it goes live.</p>
          <Steps step={step} onGo={setStep} />
        </div>

        <div className="min-w-0 flex-[3_1_520px] rounded-card border border-line bg-surface p-[clamp(20px,4vw,40px)]">
          {/* All steps stay mounted (just hidden) so typed values survive Back/Continue. */}
          <FormErrors.Provider value={errors}>
            <div key={formKey} onChange={onChange}>
              <OrganizerStep hidden={step !== 1} onNext={() => setStep(2)} />
              <EventStep hidden={step !== 2} onBack={() => setStep(1)} onNext={() => setStep(3)} />
              <TicketsStep
                hidden={step !== 3}
                entry={entry}
                onEntry={setEntry}
                onBack={() => setStep(2)}
                onSubmit={() => send(false)}
                onDraft={() => send(true)}
                busy={busy}
                notice={notice}
              />
            </div>
          </FormErrors.Provider>
          {step === 4 && <SuccessPanel onReset={reset} />}
        </div>
      </Container>

      <Faq />
    </>
  )
}
