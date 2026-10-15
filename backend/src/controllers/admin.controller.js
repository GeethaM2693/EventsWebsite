import Event from '../models/Event.js'
import Submission from '../models/Submission.js'
import { formCategories } from '../config/categories.js'
import { HttpError, pageMeta, pagination } from '../utils/http.js'

// GET /api/admin/submissions?status=pending
export async function listSubmissions(req, res) {
  const p = pagination(req.query, { defaultLimit: 20 })
  const filter = req.query.status ? { status: req.query.status } : {}
  const [data, total] = await Promise.all([
    Submission.find(filter).sort({ createdAt: -1 }).skip(p.skip).limit(p.limit),
    Submission.countDocuments(filter),
  ])
  res.json({ data, meta: pageMeta(total, p) })
}

const slugify = (t) => t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)

const clock = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  const mer = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, '0')}` : ''} ${mer}`
}

async function uniqueSlug(title) {
  const base = slugify(title) || 'event'
  let slug = base
  for (let n = 2; await Event.exists({ slug }); n += 1) slug = `${base}-${n}`
  return slug
}

// PATCH /api/admin/submissions/:id — { status: 'approved' | 'rejected', note? }. Approving publishes an Event.
export async function reviewSubmission(req, res) {
  const { status, note } = req.body
  if (!['approved', 'rejected'].includes(status)) throw new HttpError(400, 'status must be approved or rejected')
  const s = await Submission.findById(req.params.id)
  if (!s) throw new HttpError(404, 'Submission not found')
  if (s.status !== 'pending') throw new HttpError(409, `Submission is already ${s.status}`)

  if (status === 'approved') {
    const e = s.event
    const hour = e.opensAt ? Number(e.opensAt.slice(0, 2)) + Number(e.opensAt.slice(3)) / 60 : null
    const timeLabel = e.opensAt && e.closesAt ? `${clock(e.opensAt)} – ${clock(e.closesAt)}` : e.opensAt ? clock(e.opensAt) : 'See listing'
    const priceLabel = s.entry === 'paid' ? `From ₹${s.price.toLocaleString('en-IN')}` : s.entry === 'rsvp' ? 'Free · RSVP' : 'Free entry'
    const slug = await uniqueSlug(e.title)
    await Event.create({
      slug, title: e.title, category: e.category, group: formCategories[e.category], type: e.category,
      venue: e.venue, area: e.area, areaGroup: e.area,
      startDate: e.startDate, endDate: e.endDate ?? e.startDate, timeLabel, startHour: hour,
      price: { label: priceLabel, amount: s.entry === 'paid' ? s.price : 0 },
      photo: { label: 'Photo coming soon', tone: 'soft' },
      goodFor: e.goodFor, description: e.description.split(/\n{2,}/), organizer: { name: s.organizer.name },
    })
    s.eventSlug = slug
  }
  s.status = status
  s.reviewNote = note
  await s.save()
  res.json({ data: { id: s._id, status: s.status, eventSlug: s.eventSlug ?? null } })
}
