// Turns an /api/events/:slug response into what the detail page renders.
// Events that have no extended content yet (schedule, venue notes, …) fall back to these placeholders.
const DEFAULTS = {
  about: ['Details for this event are being confirmed by the organizer.'],
  schedule: [],
  venueNotes: [
    { label: 'Public transport', value: '[Nearest metro / MMTS station]' },
    { label: 'Parking', value: '[Parking details from organizer]' },
  ],
  organizer: { name: '[Organizer name]', initial: 'O', count: '[Number]' },
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// One bookable day per calendar day the event runs (capped, so month-long exhibitions stay usable).
function passDays(startDate, endDate) {
  const days = []
  const start = new Date(`${startDate}T00:00:00Z`)
  const end = new Date(`${endDate}T00:00:00Z`)
  for (let d = new Date(start); d <= end && days.length < 7; d.setUTCDate(d.getUTCDate() + 1)) {
    days.push({ id: d.toISOString().slice(0, 10), weekday: WEEKDAYS[d.getUTCDay()], label: `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}` })
  }
  return days
}

export function toDetailView(api) {
  const { data: e } = api
  const placeholder = (label, tone) => ({ label, tone })
  return {
    id: e.id,
    title: e.title,
    group: e.group,
    date: e.date,
    time: e.time,
    eyebrow: [e.category, ...(e.tags ?? []).slice(0, 2)].join(' · '),
    location: `${e.venue}, Hyderabad`,
    photos: [
      placeholder(e.photo, e.tone),
      placeholder('Photo coming soon', 'accent'),
      placeholder('Photo coming soon', 'soft'),
    ],
    tags: e.tags ?? [],
    about: e.about?.length ? e.about : DEFAULTS.about,
    schedule: e.schedule ?? DEFAULTS.schedule,
    venueInfo: [
      { label: e.venue, value: e.venueInfo?.[0]?.value ?? '[Full venue address from organizer]' },
      ...(e.venueInfo?.length > 1 ? e.venueInfo.slice(1) : DEFAULTS.venueNotes),
    ],
    organizer: e.organizer?.name
      ? { name: e.organizer.name, initial: e.organizer.name[0].toUpperCase(), count: String(e.organizer.listedEvents ?? 1) }
      : DEFAULTS.organizer,
    pass: { price: e.priceAmount, priceLabel: e.price, unit: 'per person', days: passDays(e.startDate, e.endDate) },
    similar: e.similar ?? [],
  }
}
