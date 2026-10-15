import Event from '../models/Event.js'
import Place from '../models/Place.js'
import { SORTS, buildEventFilter } from '../services/eventQuery.js'
import { serializeEvent, serializePlace } from '../services/serialize.js'

const find = (query, sortKey, limit) => Event.find(buildEventFilter(query)).sort(SORTS[sortKey]).limit(limit)

// GET /api/home — every homepage section in one round trip.
export async function getHome(req, res) {
  const [featured, today, trending, weekend, exhibitions, markets, family, business, month, places] = await Promise.all([
    Event.findOne({ featured: true }),
    find({ tab: 'today' }, 'soonest', 4),
    find({ tab: 'month' }, 'trending', 6),
    find({ tab: 'weekend' }, 'recommended', 4),
    find({ tab: 'month', category: 'Exhibitions & Expos' }, 'soonest', 4),
    find({ tab: 'month', category: 'Food & Markets' }, 'soonest', 4),
    find({ tab: 'month', category: 'Family & Kids' }, 'soonest', 4),
    find({ tab: 'month', category: 'Business & Tech' }, 'soonest', 4),
    find({ tab: 'month' }, 'soonest', 30),
    Place.find().sort({ order: 1 }).limit(4),
  ])
  const s = (docs) => docs.map(serializeEvent)

  // Month agenda: events grouped under the day they start (or today, if already running).
  const agenda = new Map()
  for (const e of month) {
    const key = e.startDate.toISOString().slice(0, 10)
    if (!agenda.has(key)) agenda.set(key, [])
    agenda.get(key).push(serializeEvent(e))
  }

  res.json({
    data: {
      featured: featured ? serializeEvent(featured) : null,
      today: s(today), trending: s(trending), weekend: s(weekend),
      exhibitions: s(exhibitions), markets: s(markets), family: s(family), business: s(business),
      month: [...agenda].map(([date, items]) => ({ date, items })),
      places: places.map(serializePlace),
    },
  })
}
