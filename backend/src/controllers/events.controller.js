import Event from '../models/Event.js'
import { buildEventFilter, SORTS } from '../services/eventQuery.js'
import { serializeEvent, serializeEventDetail } from '../services/serialize.js'
import { HttpError, pageMeta, pagination } from '../utils/http.js'

// GET /api/events — Explore / Home sections. See services/eventQuery.js for supported params.
export async function listEvents(req, res) {
  const filter = buildEventFilter(req.query)
  const p = pagination(req.query)
  const sort = SORTS[req.query.sort] ?? SORTS.recommended

  const [docs, total] = await Promise.all([
    Event.find(filter).sort(sort).skip(p.skip).limit(p.limit),
    Event.countDocuments(filter),
  ])
  res.json({ data: docs.map(serializeEvent), meta: pageMeta(total, p) })
}

// GET /api/events/:slug — detail page, with "you might also like".
export async function getEvent(req, res) {
  const event = await Event.findOne({ slug: req.params.slug })
  if (!event) throw new HttpError(404, 'Event not found')

  const similar = await Event.find({ group: event.group, slug: { $ne: event.slug } }).sort({ trendingScore: -1 }).limit(3)
  const fallback =
    similar.length >= 3
      ? similar
      : [...similar, ...(await Event.find({ slug: { $nin: [event.slug, ...similar.map((s) => s.slug)] } }).sort({ trendingScore: -1 }).limit(3 - similar.length))]

  res.json({ data: { ...serializeEventDetail(event), similar: fallback.map(serializeEvent) } })
}
