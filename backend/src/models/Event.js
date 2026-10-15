import mongoose from 'mongoose'
import { areaGroups, categories, tones } from '../config/categories.js'

const { Schema } = mongoose

const scheduleItem = new Schema({ time: String, title: String, note: String }, { _id: false })

const eventSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true }, // display label, e.g. "Food festival"
    group: { type: String, required: true, enum: categories.map((c) => c.name), index: true },
    type: { type: String, required: true }, // search facet, e.g. "Trade fair"

    venue: { type: String, required: true },
    area: { type: String, required: true },
    areaGroup: { type: String, enum: areaGroups, index: true },

    // Whole-day UTC dates; multi-day events span startDate..endDate inclusive.
    startDate: { type: Date, required: true, index: true },
    endDate: { type: Date, required: true, index: true },
    timeLabel: { type: String, required: true }, // e.g. "5 – 11 PM"
    startHour: { type: Number, min: 0, max: 24 }, // 17.5 = 5:30 PM, used for time-of-day filters

    price: {
      label: { type: String, required: true }, // e.g. "₹200 entry"
      amount: { type: Number, default: null, min: 0 }, // null = unknown/trade-only, 0 = free
    },

    photo: {
      label: String, // placeholder caption until real images exist
      tone: { type: String, enum: tones, default: 'soft' },
      url: String,
    },

    goodFor: [String],
    blurb: String, // one-line summary used by the homepage featured band
    featured: { type: Boolean, default: false },
    trendingScore: { type: Number, default: 0 },

    // Detail page (optional per event)
    tags: [String],
    description: [String],
    schedule: [scheduleItem],
    venueInfo: [{ _id: false, label: String, value: String }],
    organizer: { name: String, listedEvents: Number },
  },
  { timestamps: true },
)

eventSchema.index({ title: 'text', type: 'text', venue: 'text' })

export default mongoose.model('Event', eventSchema)
