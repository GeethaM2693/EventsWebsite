import Event from '../models/Event.js'
import Place from '../models/Place.js'
import { categories } from '../config/categories.js'
import { buildEventFilter, SORTS } from '../services/eventQuery.js'
import { serializeEvent } from '../services/serialize.js'
import { escapeRegex, pageMeta, pagination } from '../utils/http.js'

// Words that map a query onto a category (used for the "Categories" suggestions).
const categoryKeys = {
  'Exhibitions & Expos': ['expo', 'exhibition', 'trade', 'fair', 'show'],
  'Food & Markets': ['food', 'market', 'flea', 'bazaar', 'pop-up', 'shopping'],
  'Music & Comedy': ['music', 'concert', 'comedy', 'stand-up', 'gig'],
  'Family & Kids': ['family', 'kids', 'children'],
  'Business & Tech': ['business', 'tech', 'startup', 'job', 'meetup', 'networking'],
}

// GET /api/search?q=market&type=Market — results page, with facet counts.
export async function search(req, res) {
  const q = req.query.q?.trim() ?? ''
  if (!q) return res.json({ data: [], facets: [], meta: pageMeta(0, pagination(req.query)) })

  const base = buildEventFilter({ ...req.query, q })
  const p = pagination(req.query, { defaultLimit: 24 })
  const filter = req.query.type ? { $and: [base, { type: req.query.type }] } : base

  const [docs, total, facets] = await Promise.all([
    Event.find(filter).sort(SORTS[req.query.sort] ?? SORTS.soonest).skip(p.skip).limit(p.limit),
    Event.countDocuments(filter),
    Event.aggregate([{ $match: base }, { $group: { _id: '$type', count: { $sum: 1 } } }, { $sort: { count: -1, _id: 1 } }]),
  ])

  res.json({
    query: q,
    data: docs.map(serializeEvent),
    facets: facets.map((f) => ({ label: f._id, count: f.count })),
    meta: pageMeta(total, p),
  })
}

// GET /api/search/suggest?q=ex — type-ahead (needs 2+ characters).
export async function suggest(req, res) {
  const q = req.query.q?.trim().toLowerCase() ?? ''
  if (q.length < 2) return res.json({ data: { events: [], categories: [], places: [] } })

  const rx = new RegExp(escapeRegex(q), 'i')
  const [events, venues] = await Promise.all([
    Event.find({ title: rx }).sort({ trendingScore: -1 }).limit(4),
    Event.aggregate([{ $match: { venue: rx } }, { $group: { _id: '$venue', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 3 }]),
  ])

  const matched = categories
    .filter((c) => c.name.toLowerCase().includes(q) || (categoryKeys[c.name] ?? []).some((k) => k.startsWith(q) || q.startsWith(k)))
    .slice(0, 2)

  res.json({
    data: {
      events: events.map((e) => {
        const i = e.title.toLowerCase().indexOf(q)
        return { ...serializeEvent(e), match: i >= 0 ? { pre: e.title.slice(0, i), mid: e.title.slice(i, i + q.length), post: e.title.slice(i + q.length) } : null }
      }),
      categories: matched.map((c) => ({ slug: c.slug, label: c.name })),
      places: venues.map((v) => ({ label: v._id, count: v.count })),
    },
  })
}

export async function popular(req, res) {
  res.json({ data: ['food festival', 'expo', 'comedy', 'kids', 'market', 'kayaking'] })
}
