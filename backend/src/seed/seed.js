// Loads the sample listings (same content as the frontend mock data) into MongoDB.
//   npm run seed          upsert by slug (safe to re-run)
//   npm run seed:reset    wipe events/collections/places first
import { readFileSync } from 'node:fs'
import { connectDB, disconnectDB } from '../config/db.js'
import Collection from '../models/Collection.js'
import Event from '../models/Event.js'
import Place from '../models/Place.js'

const load = (name) => JSON.parse(readFileSync(new URL(`./data/${name}.json`, import.meta.url), 'utf8'))
const YEAR = 2026
const day = (d, month = 9) => new Date(Date.UTC(YEAR, month, d))

const AREA_GROUP = {
  Madhapur: 'Madhapur & Hitech City', Raidurg: 'Madhapur & Hitech City',
  'Banjara Hills': 'Banjara & Jubilee Hills', 'Jubilee Hills': 'Banjara & Jubilee Hills',
  Gachibowli: 'Gachibowli & Kokapet', Kokapet: 'Gachibowli & Kokapet',
  'Necklace Road': 'Secunderabad',
  Golconda: 'Old City', 'Ravindra Bharathi': 'Old City',
  Ameenpur: 'Other',
}

const FAMILY = ['food', 'science', 'puppet', 'cycle', 'bird', 'flea', 'farmers']
const OUTDOORS = ['food', 'indie', 'heritage', 'farmers', 'cycle', 'bird', 'kayak', 'flea', 'science']
const FEATURED_BLURB = 'Two evenings of street-food stalls, Irani chai counters and live music along the lakefront. Arrive after sunset for the lanterns.'
const TRENDING = ['craft', 'indie', 'expo', 'comedy', 'summit', 'makers'] // order from the homepage

// "Free entry" → 0, "₹1,200" → 1200, "From ₹799" → 799, "Trade visitors" → null
function priceAmount(label) {
  if (/free/i.test(label)) return 0
  const m = label.match(/₹\s?([\d,]+)/)
  return m ? Number(m[1].replace(/,/g, '')) : null
}

// "6:30 AM" → 6.5, "10 AM – 9 PM" → 10, "5 – 11 PM" → 17 (meridiem borrowed from the end of the range)
function startHour(label) {
  const [first, last = ''] = label.split(/[–-]/).map((s) => s.trim())
  const m = first.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i)
  if (!m) return null
  let h = Number(m[1]) + (m[2] ? Number(m[2]) / 60 : 0)
  const mer = (m[3] ?? last.match(/AM|PM/i)?.[0] ?? 'AM').toUpperCase()
  if (mer === 'PM' && h < 12) h += 12
  if (mer === 'AM' && h >= 12) h -= 12
  return h
}

function toEventDoc(e, detail) {
  const hour = startHour(e.time)
  const amount = priceAmount(e.price)
  const goodFor = [
    ...(FAMILY.includes(e.id) ? ['Families with kids'] : []),
    ...(OUTDOORS.includes(e.id) ? ['Outdoors'] : []),
    ...(hour !== null && hour >= 17 ? ['Evening (after 5 PM)'] : []),
  ]
  const doc = {
    slug: e.id,
    title: e.title,
    category: e.category,
    group: e.group,
    type: e.type,
    venue: e.venue,
    area: e.area,
    areaGroup: AREA_GROUP[e.area] ?? 'Other',
    startDate: day(e.days[0]),
    endDate: day(e.days[1]),
    timeLabel: e.time,
    startHour: hour,
    price: { label: e.price, amount },
    photo: { label: e.photo, tone: e.tone },
    goodFor,
    featured: e.id === 'food',
    blurb: e.id === 'food' ? FEATURED_BLURB : undefined,
    trendingScore: Math.max(0, TRENDING.length - TRENDING.indexOf(e.id)) * (TRENDING.includes(e.id) ? 10 : 0),
  }
  if (e.id === 'food') {
    Object.assign(doc, {
      tags: detail.tags,
      description: detail.about,
      schedule: detail.schedule,
      venueInfo: detail.venueInfo,
      organizer: { name: detail.organizer.name, listedEvents: 0 },
    })
  }
  return doc
}

const upsert = (Model, docs) =>
  Model.bulkWrite(docs.map((d) => ({ replaceOne: { filter: { slug: d.slug }, replacement: d, upsert: true } })))

async function main() {
  await connectDB()
  if (process.argv.includes('--reset')) {
    await Promise.all([Event.deleteMany({}), Collection.deleteMany({}), Place.deleteMany({})])
    console.log('Cleared events, collections and places')
  }

  const detail = load('food-detail')
  const events = load('events').map((e) => toEventDoc(e, detail))
  const known = new Set(events.map((e) => e.slug))

  const collections = load('collections').map((c) => {
    for (const id of [c.featured, ...c.groups.flatMap((g) => g.items.map(([i]) => i))]) {
      if (!known.has(id)) throw new Error(`Collection "${c.slug}" references unknown event "${id}"`)
    }
    return {
      slug: c.slug, order: c.order, label: c.label, crumb: c.crumb, eyebrow: c.eyebrow,
      titleA: c.titleA, titleB: c.titleB, intro: c.intro, span: c.span,
      heroTone: c.heroTone, heroPhoto: c.heroPhoto, dateTab: c.date, subs: c.subs, badge: c.badge,
      featured: c.featured, tipTitle: c.tipTitle, tip: c.tip,
      groups: c.groups.map((g) => ({ a: g.a, b: g.b, items: g.items.map(([event, tag]) => ({ event, tag })) })),
    }
  })

  const places = load('places').map((p, i) => ({
    slug: p.id, order: i + 1, name: p.name, area: p.area, note: p.note, photo: { label: p.photo, tone: p.tone },
  }))

  await upsert(Event, events)
  await upsert(Collection, collections)
  await upsert(Place, places)
  console.log(`Seeded ${events.length} events, ${collections.length} collections, ${places.length} places`)
  await disconnectDB()
}

main().catch(async (err) => {
  console.error(`Seed failed: ${err.message}`)
  await disconnectDB().catch(() => {})
  process.exit(1)
})
