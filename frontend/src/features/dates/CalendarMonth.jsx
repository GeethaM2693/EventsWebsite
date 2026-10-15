import { MONTHS, TODAY, WEEKDAY_HEADERS, dayLabel } from '../../data/dates'

export default function CalendarMonth({ monthIndex, start, end, eventDays, onPick }) {
  const m = MONTHS[monthIndex]
  const cells = []
  for (let k = 0; k < m.lead; k++) cells.push(<div key={`b${k}`} className="h-11" />)

  for (let d = 1; d <= m.days; d++) {
    const i = m.base + d
    const past = i < TODAY
    const isStart = i === start
    const isEnd = i === end
    const edge = isStart || isEnd
    const inRange = start !== null && end !== null && i > start && i < end
    const hasEvents = eventDays.has(i) && !past
    const rangeBg = start !== null && end !== null && start !== end && i >= start && i <= end

    const wrap = `flex h-11 justify-center ${rangeBg ? 'bg-primary-soft' : ''} ${rangeBg && isStart ? 'rounded-l-full' : ''} ${rangeBg && isEnd ? 'rounded-r-full' : ''}`
    let btn = 'relative flex size-11 cursor-pointer items-center justify-center rounded-full border-0 text-[15px] font-semibold disabled:cursor-not-allowed '
    if (edge) btn += 'bg-primary font-extrabold text-white'
    else if (past) btn += 'bg-transparent text-muted line-through'
    else if (i === TODAY) btn += 'border-[1.5px] !border-solid border-primary bg-surface text-ink'
    else btn += `bg-transparent hover:bg-primary-soft ${inRange ? 'text-primary-deep' : 'text-ink'}`

    cells.push(
      <div key={d} className={wrap}>
        <button
          type="button"
          disabled={past}
          aria-pressed={edge}
          aria-label={`${dayLabel(i)}${hasEvents ? ', has events' : ''}${past ? ', unavailable' : ''}`}
          onClick={() => onPick(i)}
          className={btn}
        >
          {d}
          <span className={`absolute bottom-[5px] left-1/2 size-[5px] -translate-x-1/2 rounded-full ${hasEvents ? (edge ? 'bg-white' : 'bg-accent') : 'bg-transparent'}`} />
        </button>
      </div>,
    )
  }

  return (
    <div className="min-w-[280px] flex-1">
      <h2 className="m-0 mb-3 text-center text-base font-bold">{m.name}</h2>
      <div role="grid" className="grid grid-cols-7">
        {WEEKDAY_HEADERS.map((w, i) => (
          <div key={i} className="flex h-8 items-center justify-center text-[13px] font-bold text-muted">{w}</div>
        ))}
        {cells}
      </div>
    </div>
  )
}
