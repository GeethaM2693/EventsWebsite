import Collection from '../models/Collection.js'
import Event from '../models/Event.js'
import { serializeEvent } from '../services/serialize.js'
import { HttpError } from '../utils/http.js'

const uniqueSlugs = (c) => [...new Set(c.groups.flatMap((g) => g.items.map((i) => i.event)))]

// GET /api/collections — switcher + "More collections" cards.
export async function listCollections(req, res) {
  const docs = await Collection.find().sort({ order: 1 })
  res.json({
    data: docs.map((c) => ({ slug: c.slug, label: c.label, heroTone: c.heroTone, eventCount: uniqueSlugs(c).length })),
  })
}

// GET /api/collections/:slug?sub=Morning — full page: header band, featured pick, grouped sections.
export async function getCollection(req, res) {
  const c = await Collection.findOne({ slug: req.params.slug })
  if (!c) throw new HttpError(404, 'Collection not found')

  const slugs = [...new Set([c.featured, ...uniqueSlugs(c)])]
  const byslug = new Map((await Event.find({ slug: { $in: slugs } })).map((e) => [e.slug, serializeEvent(e)]))
  const sub = req.query.sub && req.query.sub !== 'All' ? req.query.sub : null

  const groups = c.groups
    .map((g) => ({
      a: g.a,
      b: g.b,
      items: g.items
        .filter((i) => (!sub || i.tag === sub) && byslug.has(i.event))
        .map((i) => {
          const e = byslug.get(i.event)
          return { ...e, tag: i.tag, badge: c.badge === 'time' ? e.time : e.date }
        }),
    }))
    .filter((g) => g.items.length > 0)

  res.json({
    data: {
      slug: c.slug,
      label: c.label,
      crumb: c.crumb,
      eyebrow: c.eyebrow,
      titleA: c.titleA,
      titleB: c.titleB,
      intro: c.intro,
      span: c.span,
      heroTone: c.heroTone,
      heroPhoto: c.heroPhoto,
      dateTab: c.dateTab,
      subs: c.subs,
      badge: c.badge,
      tipTitle: c.tipTitle,
      tip: c.tip,
      eventCount: uniqueSlugs(c).length,
      featured: byslug.get(c.featured) ?? null,
      groups,
    },
  })
}
