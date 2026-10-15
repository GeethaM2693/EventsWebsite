import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Button from '../../components/ui/Button'
import Chip from '../../components/ui/Chip'
import CalendarMonth from './CalendarMonth'
import { dayLabel, presets, timesOfDay } from '../../data/dates'

const navBtn = 'flex size-11 cursor-pointer items-center justify-center rounded-control border border-line bg-surface text-primary disabled:cursor-not-allowed disabled:text-line'

// Popover on desktop, full-screen sheet on phones (max-sm).
export default function DatePanel({ state, eventDays, loadingCount, summary, summarySub, matchCount, onPickDay, onPreset, onOffset, onToggleTime, onClear, onApply, onClose }) {
  const { start, end, offset, times } = state
  const ready = start !== null && end !== null

  return (
    <section
      id="dp-panel"
      role="dialog"
      aria-label="Choose custom dates"
      className="mt-3 flex flex-wrap overflow-hidden rounded-card border border-line bg-surface shadow-[0_16px_40px_rgba(32,40,32,0.12)] max-sm:fixed max-sm:inset-0 max-sm:z-50 max-sm:mt-0 max-sm:overflow-y-auto max-sm:rounded-none"
    >
      <div className="flex flex-[1_1_200px] flex-col gap-1.5 border-r border-line bg-bg p-6 max-sm:border-r-0 max-sm:border-b">
        <div className="mb-1.5 flex items-center justify-between">
          <div className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary">Quick picks</div>
          <button type="button" aria-label="Close" onClick={onClose} className="hidden size-11 cursor-pointer items-center justify-center rounded-control border-0 bg-transparent max-sm:flex">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        {presets.map((p) => {
          const on = start === p.a && end === p.b
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => onPreset(p)}
              className={`min-h-[52px] w-full cursor-pointer rounded-control px-3 py-2 text-left text-[15px] font-bold ${on ? 'border-[1.5px] border-primary bg-surface text-primary-deep' : 'border border-transparent bg-transparent text-ink hover:bg-primary-soft/60'}`}
            >
              {p.label}
              <span className="block text-xs font-medium text-muted">{dayLabel(p.a)} – {dayLabel(p.b)}</span>
            </button>
          )
        })}
      </div>

      <div className="min-w-0 flex-[999_1_560px] px-[clamp(16px,3vw,32px)] py-6">
        <div className="flex items-center justify-between">
          <button type="button" aria-label="Previous months" onClick={() => onOffset(0)} disabled={offset === 0} className={navBtn}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <div className="text-sm text-muted">Pick a start date, then an end date</div>
          <button type="button" aria-label="Next months" onClick={() => onOffset(1)} disabled={offset === 1} className={navBtn}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-10 gap-y-6">
          <CalendarMonth monthIndex={offset} start={start} end={end} eventDays={eventDays} onPick={onPickDay} />
          <CalendarMonth monthIndex={offset + 1} start={start} end={end} eventDays={eventDays} onPick={onPickDay} />
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted">
          <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-accent" />Events on this day</span>
          <span className="flex items-center gap-1.5"><span className="size-3.5 rounded border-[1.5px] border-primary" />Today</span>
        </div>

        <fieldset className="m-0 mt-5 border-0 border-t border-line p-0 pt-4">
          <legend className="float-left mb-2.5 w-full p-0 text-sm font-bold">
            Time of day <span className="font-medium text-muted">(optional)</span>
          </legend>
          <div className="clear-both flex flex-wrap gap-2">
            {timesOfDay.map((t) => (
              <Chip key={t.label} active={times.includes(t.label)} onClick={() => onToggleTime(t.label)}>
                {t.label} <span className="font-medium">{t.sub}</span>
              </Chip>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-[1_1_100%] flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4">
        <div aria-live="polite">
          <div className="text-lg font-extrabold">{summary}</div>
          <div className="text-sm text-muted">{summarySub}</div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button variant="outline" className="!min-h-[52px] !bg-surface !px-5" onClick={onClear}>Clear</Button>
          <button
            type="button"
            onClick={onApply}
            disabled={!ready}
            className="min-h-[52px] cursor-pointer rounded-control border-0 bg-accent px-7 text-[19px] font-bold text-white disabled:cursor-not-allowed disabled:bg-muted"
          >
            {loadingCount ? 'Show events' : `Show ${matchCount} events`}
          </button>
        </div>
      </div>
    </section>
  )
}
