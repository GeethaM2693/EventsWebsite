import Event from '../models/Event.js'
import Place from '../models/Place.js'
import SavedItem from '../models/SavedItem.js'
import { serializeEvent, serializePlace } from '../services/serialize.js'
import { getToday, rangeForTab } from '../utils/dates.js'
import { HttpError } from '../utils/http.js'

const mine = (req, kind) => ({ clientId: req.clientId, kind })

// GET /api/saved/ids — which hearts should be filled, across the whole site.
export async function savedIds(req, res) {
  const items = await SavedItem.find({ clientId: req.clientId }).select('kind slug -_id')
  res.json({
    data: {
      events: items.filter((i) => i.kind === 'event').map((i) => i.slug),
      places: items.filter((i) => i.kind === 'place').map((i) => i.slug),
    },
  })
}

// GET /api/saved — the Saved Events page: upcoming (grouped by date), past, places.
export async function getSaved(req, res) {
  const items = await SavedItem.find({ clientId: req.clientId }).sort({ createdAt: -1 })
  const eventSlugs = items.filter((i) => i.kind === 'event').map((i) => i.slug)
  const placeSlugs = items.filter((i) => i.kind === 'place').map((i) => i.slug)

  const [events, places] = await Promise.all([
    Event.find({ slug: { $in: eventSlugs } }).sort({ startDate: 1, startHour: 1 }),
    Place.find({ slug: { $in: placeSlugs } }).sort({ order: 1 }),
  ])

  const today = getToday()
  const [wkFrom, wkTo] = rangeForTab('weekend', today)
  const upcoming = events.filter((e) => e.endDate >= today)
  const past = events.filter((e) => e.endDate < today)

  const groups = [
    { label: 'This weekend', events: upcoming.filter((e) => e.endDate >= wkFrom && e.startDate <= wkTo) },
    { label: 'Later this month', events: upcoming.filter((e) => !(e.endDate >= wkFrom && e.startDate <= wkTo)) },
  ]
    .filter((g) => g.events.length > 0)
    .map((g) => ({ label: g.label, events: g.events.map(serializeEvent) }))

  res.json({
    data: {
      upcoming: { count: upcoming.length, groups },
      past: { count: past.length, events: past.map(serializeEvent) },
      places: { count: places.length, items: places.map(serializePlace) },
    },
  })
}

// GET /api/saved/recommendations — "Based on what you saved": same categories, not yet saved.
export async function recommendations(req, res) {
  const saved = await SavedItem.find(mine(req, 'event')).select('slug')
  const slugs = saved.map((s) => s.slug)
  const groups = (await Event.find({ slug: { $in: slugs } }).select('group')).map((e) => e.group)

  const base = { slug: { $nin: slugs }, endDate: { $gte: getToday() } }
  let picks = groups.length ? await Event.find({ ...base, group: { $in: groups } }).sort({ trendingScore: -1, startDate: 1 }).limit(3) : []
  if (picks.length < 3) {
    const more = await Event.find({ ...base, slug: { $nin: [...slugs, ...picks.map((p) => p.slug)] } }).sort({ trendingScore: -1, startDate: 1 }).limit(3 - picks.length)
    picks = [...picks, ...more]
  }
  res.json({ data: picks.map(serializeEvent) })
}

const MODELS = { event: Event, place: Place }
const kindOf = (param) => {
  if (param === 'events') return 'event'
  if (param === 'places') return 'place'
  throw new HttpError(404, 'Unknown saved type (use events or places)')
}

// PUT /api/saved/:kind/:slug (kind = events|places) — idempotent save.
export async function saveItem(req, res) {
  const kind = kindOf(req.params.kind)
  if (!(await MODELS[kind].exists({ slug: req.params.slug }))) throw new HttpError(404, `${kind} not found`)
  await SavedItem.updateOne({ clientId: req.clientId, kind, slug: req.params.slug }, { $setOnInsert: { clientId: req.clientId, kind, slug: req.params.slug } }, { upsert: true })
  res.status(200).json({ data: { saved: true, kind, slug: req.params.slug } })
}

// DELETE /api/saved/:kind/:slug — idempotent remove.
export async function unsaveItem(req, res) {
  const kind = kindOf(req.params.kind)
  await SavedItem.deleteOne({ clientId: req.clientId, kind, slug: req.params.slug })
  res.json({ data: { saved: false, kind, slug: req.params.slug } })
}
