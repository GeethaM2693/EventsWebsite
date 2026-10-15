import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import Container from '../components/ui/Container'
import PageTitle from '../components/ui/PageTitle'
import EmptyState from '../components/ui/EmptyState'
import { ErrorNotice, Spinner } from '../components/ui/LoadState'
import { tabExtraClass } from '../components/ui/UnderlineTabs'
import EventCardEditorial from '../components/events/EventCardEditorial'
import DatePanel from '../features/dates/DatePanel'
import { dateTabs, dayLabel, dayToISO, isoToDay, timeOfDayParam } from '../data/dates'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'

const initial = { start: 17, end: 25, offset: 0, times: [] }

export default function DatePickerPage() {
  const [state, setState] = useState(initial)
  const [open, setOpen] = useState(true)
  const [applied, setApplied] = useState(false)
  const { start, end, times } = state
  const ready = start !== null && end !== null

  // Calendar dots: every day in Oct–Dec that has at least one event.
  const calendar = useFetch(
    (signal) => api.get('/events', { params: { from: dayToISO(1), to: dayToISO(92), limit: 50 }, signal }),
    [],
  )
  const eventDays = useMemo(() => {
    const days = new Set()
    for (const e of calendar.data?.data ?? []) {
      const a = isoToDay(e.startDate)
      const b = isoToDay(e.endDate)
      for (let d = Math.max(a ?? 1, 1); d <= Math.min(b ?? 92, 92); d += 1) days.add(d)
    }
    return days
  }, [calendar.data])

  const matches = useFetch(
    (signal) =>
      api.get('/events', {
        params: { from: dayToISO(start), to: dayToISO(end ?? start), timeOfDay: times.map((t) => timeOfDayParam[t]), sort: 'soonest', limit: 50 },
        signal,
      }),
    [start, end, times.join()],
    { enabled: start !== null },
  )
  const results = start === null ? [] : matches.data?.data ?? []
  const count = start === null ? 0 : matches.data?.meta.total ?? 0

  let summary = 'No dates selected'
  let sub = 'Choose a start date'
  if (start !== null && end === null) { summary = `${dayLabel(start)} – …`; sub = 'Now choose an end date' }
  if (ready) {
    const n = end - start + 1
    summary = `${dayLabel(start)} – ${dayLabel(end)}`
    sub = `${n} ${n === 1 ? 'day' : 'days'}${times.length ? ` · ${times.join(', ')}` : ''}`
  }

  // First click = start, second = end; clicking before the start (or a third click) restarts the range.
  const pickDay = (i) =>
    setState((s) => (s.start === null || s.end !== null || i < s.start ? { ...s, start: i, end: null } : { ...s, end: i }))

  return (
    <Container className="pb-24">
      <section className="pt-14">
        <PageTitle lead="Explore" emphasis="Hyderabad" />
        <div role="group" aria-label="Date shortcuts" className="mt-5 flex flex-wrap gap-x-7 border-b border-line">
          {dateTabs.map((t) => (
            <Link key={t} to="/explore" className={`${tabExtraClass} no-underline`}>{t}</Link>
          ))}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="dp-panel"
            onClick={() => setOpen((o) => !o)}
            className={`${tabExtraClass} cursor-pointer !border-primary !font-bold !text-primary`}
          >
            <Calendar size={16} aria-hidden="true" />
            {applied && ready ? summary : 'Custom Dates'}
          </button>
        </div>

        {open && (
          <DatePanel
            state={state}
            eventDays={eventDays}
            loadingCount={matches.loading && !matches.data}
            summary={summary}
            summarySub={sub}
            matchCount={count}
            onPickDay={pickDay}
            onPreset={(p) => setState((s) => ({ ...s, start: p.a, end: p.b, offset: p.a > 31 ? 1 : 0 }))}
            onOffset={(offset) => setState((s) => ({ ...s, offset }))}
            onToggleTime={(t) => setState((s) => ({ ...s, times: s.times.includes(t) ? s.times.filter((x) => x !== t) : [...s.times, t] }))}
            onClear={() => { setState((s) => ({ ...s, start: null, end: null, times: [] })); setApplied(false) }}
            onApply={() => { setOpen(false); setApplied(true) }}
            onClose={() => setOpen(false)}
          />
        )}
      </section>

      {applied && !open && (
        <section className="pt-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[22px] font-bold">{count} events</span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-primary bg-primary-soft px-3.5 text-sm font-bold text-primary-deep"
            >
              {summary}
            </button>
          </div>
        </section>
      )}

      <section aria-label="Matching events" className="pt-10">
        {matches.error && <ErrorNotice error={matches.error} onRetry={matches.reload} />}
        {start !== null && !matches.data && matches.loading && <Spinner />}
        {matches.data && results.length === 0 && (
          <EmptyState title="No events on these dates">Try a wider range or clear the time-of-day filter.</EmptyState>
        )}
        <div className={`grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-6 gap-y-10 transition-opacity ${matches.loading ? 'opacity-60' : ''}`}>
          {results.map((e) => <EventCardEditorial key={e.id} event={e} />)}
        </div>
      </section>
    </Container>
  )
}
