import { areaGroups, formCategories } from '../config/categories.js'
import { HttpError } from './http.js'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/

const str = (v, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

// Validate the organizer form. Returns { value, fields }; fields is empty when valid.
// `draft` relaxes everything except the organizer's email so a half-finished form can be saved.
export function validateSubmission(body, { draft = false } = {}) {
  const fields = {}
  const need = (key, ok, msg) => { if (!ok) fields[key] = msg }
  const o = body.organizer ?? {}
  const e = body.event ?? {}

  const organizer = {
    name: str(o.name, 120), type: str(o.type, 60), contact: str(o.contact, 120),
    email: str(o.email, 160).toLowerCase(), phone: str(o.phone, 30), website: str(o.website, 300),
  }
  const startDate = e.startDate ? new Date(`${e.startDate}T00:00:00.000Z`) : null
  const endDate = e.endDate ? new Date(`${e.endDate}T00:00:00.000Z`) : startDate
  const event = {
    title: str(e.title, 140), category: str(e.category, 60), area: str(e.area, 60),
    startDate, endDate, opensAt: str(e.opensAt, 5), closesAt: str(e.closesAt, 5),
    venue: str(e.venue, 300), description: str(e.description, 4000),
    goodFor: Array.isArray(e.goodFor) ? e.goodFor.map((g) => str(g, 40)).filter(Boolean).slice(0, 8) : [],
  }
  const entry = ['free', 'paid', 'rsvp'].includes(body.entry) ? body.entry : 'free'
  const price = body.price === '' || body.price == null ? null : Number(body.price)
  const ticketLink = str(body.ticketLink, 400)
  const photoCount = Math.min(6, Math.max(0, parseInt(body.photoCount, 10) || 0))
  const confirmed = body.confirmed === true

  need('organizer.email', EMAIL.test(organizer.email), 'Enter a valid email address')
  if (organizer.website) need('organizer.website', /^https?:\/\//i.test(organizer.website), 'Website must start with http:// or https://')
  if (!draft) {
    need('organizer.name', organizer.name, 'Organizer or company name is required')
    need('organizer.contact', organizer.contact, 'Contact person is required')
    need('organizer.phone', organizer.phone.replace(/\D/g, '').length >= 10, 'Enter a phone number with at least 10 digits')
    need('event.title', event.title.length >= 3, 'Event title is required')
    need('event.category', formCategories[event.category], 'Choose a category')
    need('event.area', areaGroups.includes(event.area), 'Choose an area')
    need('event.startDate', startDate && !Number.isNaN(startDate.getTime()), 'Start date is required')
    need('event.venue', event.venue, 'Venue name and address are required')
    need('event.description', event.description.length >= 20, 'Add a short description (at least 20 characters)')
    if (event.opensAt) need('event.opensAt', TIME.test(event.opensAt), 'Use HH:MM')
    if (event.closesAt) need('event.closesAt', TIME.test(event.closesAt), 'Use HH:MM')
    if (startDate && endDate) need('event.endDate', endDate >= startDate, 'End date cannot be before the start date')
    if (entry === 'paid') {
      need('price', price !== null && Number.isFinite(price) && price >= 0, 'Enter the starting price in ₹')
      if (ticketLink) need('ticketLink', /^https?:\/\//i.test(ticketLink), 'Ticket link must start with http:// or https://')
    }
    need('confirmed', confirmed, 'Please confirm the details are accurate')
  }

  return { value: { organizer, event, entry, price: entry === 'paid' ? price : null, ticketLink, photoCount, confirmed }, fields }
}

export function assertValid(fields) {
  if (Object.keys(fields).length === 0) return
  const err = new HttpError(422, 'Please fix the highlighted fields')
  err.fields = fields
  throw err
}
