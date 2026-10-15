import { formatDateLabel } from '../utils/dates.js'

// Shape returned to the frontend: matches the fields the UI cards already use.
export function serializeEvent(e) {
  return {
    id: e.slug,
    title: e.title,
    category: e.category,
    group: e.group,
    type: e.type,
    date: formatDateLabel(e.startDate, e.endDate),
    startDate: e.startDate.toISOString().slice(0, 10),
    endDate: e.endDate.toISOString().slice(0, 10),
    time: e.timeLabel,
    venue: e.venue,
    area: e.area,
    price: e.price.label,
    priceAmount: e.price.amount,
    photo: e.photo?.label,
    photoUrl: e.photo?.url ?? null,
    tone: e.photo?.tone,
    goodFor: e.goodFor,
    featured: e.featured,
    blurb: e.blurb ?? null,
  }
}

export function serializeEventDetail(e) {
  return {
    ...serializeEvent(e),
    tags: e.tags,
    about: e.description,
    schedule: e.schedule,
    venueInfo: e.venueInfo,
    organizer: e.organizer,
  }
}

export const serializePlace = (p) => ({
  id: p.slug,
  n: String(p.order ?? '').padStart(2, '0'),
  name: p.name,
  area: p.area,
  note: p.note,
  photo: p.photo?.label,
  tone: p.photo?.tone,
})
