import Event from '../models/Event.js'
import Place from '../models/Place.js'
import { categories, areaGroups } from '../config/categories.js'
import { serializePlace } from '../services/serialize.js'

// GET /api/categories — browse grid + Explore filter list, with live event counts.
export async function listCategories(req, res) {
  const counts = await Event.aggregate([{ $group: { _id: '$group', count: { $sum: 1 } } }])
  const byName = new Map(counts.map((c) => [c._id, c.count]))
  res.json({ data: categories.map((c) => ({ ...c, eventCount: byName.get(c.name) ?? 0 })) })
}

// GET /api/filters — options for Explore's Area / Price / Good-for controls.
export async function listFilters(req, res) {
  res.json({
    data: {
      areas: ['All of Hyderabad', ...areaGroups.filter((a) => a !== 'Other')],
      prices: [
        { value: '', label: 'Any price' },
        { value: 'free', label: 'Free' },
        { value: 'under-500', label: 'Under ₹500' },
        { value: '500-1500', label: '₹500 – ₹1,500' },
        { value: 'above-1500', label: 'Above ₹1,500' },
      ],
      goodFor: ['Families with kids', 'Outdoors', 'Wheelchair accessible', 'Evening (after 5 PM)'],
      sort: [
        { value: 'recommended', label: 'Recommended' },
        { value: 'soonest', label: 'Soonest first' },
        { value: 'price-asc', label: 'Price: low to high' },
      ],
    },
  })
}

// GET /api/places — hidden gems.
export async function listPlaces(req, res) {
  const places = await Place.find().sort({ order: 1 })
  res.json({ data: places.map(serializePlace) })
}
