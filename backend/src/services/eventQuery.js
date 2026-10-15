import { escapeRegex, list } from '../utils/http.js'
import { addDays, getToday, parseDay, rangeForTab } from '../utils/dates.js'

const PRICE = {
  free: { 'price.amount': 0 },
  'under-500': { 'price.amount': { $gt: 0, $lt: 500 } },
  '500-1500': { 'price.amount': { $gte: 500, $lte: 1500 } },
  'above-1500': { 'price.amount': { $gt: 1500 } },
}

const TIME_OF_DAY = {
  morning: { startHour: { $lt: 12 } },
  afternoon: { startHour: { $gte: 12, $lt: 17 } },
  evening: { startHour: { $gte: 17, $lt: 21 } },
  'late-night': { startHour: { $gte: 21 } },
}

export const SORTS = {
  recommended: { featured: -1, trendingScore: -1, startDate: 1 },
  soonest: { startDate: 1, startHour: 1 },
  'price-asc': { 'price.amount': 1, startDate: 1 },
  trending: { trendingScore: -1, startDate: 1 },
}

// Build a Mongo filter from the query string used by Explore, Search and Collections.
export function buildEventFilter(query) {
  const and = []

  // Date: ?tab=today|tomorrow|weekend|next-week|month  or  ?from=YYYY-MM-DD&to=YYYY-MM-DD
  const range = query.tab ? rangeForTab(query.tab) : null
  let from = range?.[0] ?? parseDay(query.from)
  let to = range?.[1] ?? parseDay(query.to)
  if (from && !to) to = addDays(from, 3650) // open-ended: everything from `from` onwards
  if (!from && to) from = getToday()
  if (from && to) and.push({ endDate: { $gte: from }, startDate: { $lte: to } })

  const categories = list(query.category)
  if (categories.length) and.push({ group: { $in: categories } })

  const areas = list(query.area).filter((a) => a !== 'All of Hyderabad')
  if (areas.length) and.push({ areaGroup: { $in: areas } })

  if (PRICE[query.price]) and.push(PRICE[query.price])

  const goodFor = list(query.goodFor)
  if (goodFor.length) and.push({ goodFor: { $all: goodFor } })

  const times = list(query.timeOfDay).map((t) => TIME_OF_DAY[t]).filter(Boolean)
  if (times.length) and.push({ $or: times })

  if (query.featured === 'true') and.push({ featured: true })

  if (query.q?.trim()) {
    const rx = new RegExp(escapeRegex(query.q.trim()), 'i')
    and.push({ $or: [{ title: rx }, { type: rx }, { venue: rx }] })
  }

  return and.length ? { $and: and } : {}
}
