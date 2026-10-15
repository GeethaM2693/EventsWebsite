import Section from '../../components/ui/Section'
import SectionLink from '../../components/ui/SectionLink'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// days: [{ date: 'YYYY-MM-DD', items: [event] }] from /api/home
export default function MonthAgenda({ days }) {
  const agenda = days.map(({ date, items }) => {
    const d = new Date(`${date}T00:00:00Z`)
    return { day: String(d.getUTCDate()), weekday: WEEKDAYS[d.getUTCDay()], month: d.toLocaleString('en-IN', { month: 'long', timeZone: 'UTC' }), items }
  })
  return (
    <Section id="month" lead="Upcoming" emphasis="this month" action={<SectionLink to="/dates">Full {agenda[0].month} calendar</SectionLink>}>
      <div className="mt-7 grid grid-cols-[repeat(auto-fill,minmax(min(100%,520px),1fr))] gap-x-12">
        {agenda.map(({ day, weekday, items }) => (
          <div key={day + weekday} className="flex gap-6 border-t border-line py-5">
            <div className="flex-[0_0_64px]">
              <div className="text-4xl font-extrabold leading-none tracking-[-0.02em] text-accent">{day}</div>
              <div className="mt-1 text-[13px] font-bold uppercase tracking-[0.08em] text-muted">{weekday}</div>
            </div>
            <div className="flex flex-1 flex-col gap-2.5">
              {items.map((e) => (
                <div key={e.id}>
                  <div className="text-[17px] font-bold">{e.title}</div>
                  <div className="mt-0.5 text-sm text-muted">{e.category} · {e.venue}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
