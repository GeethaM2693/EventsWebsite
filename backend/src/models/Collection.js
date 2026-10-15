import mongoose from 'mongoose'
import { tones } from '../config/categories.js'

const { Schema } = mongoose

// One page template, many collections — only this data differs between them.
const collectionSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    label: { type: String, required: true },
    crumb: String,
    eyebrow: String,
    titleA: String,
    titleB: String,
    intro: String,
    span: String,
    heroTone: { type: String, enum: tones },
    heroPhoto: String,
    dateTab: String,
    subs: [String],
    badge: { type: String, enum: ['time', 'date'], default: 'date' },
    featured: { type: String, required: true }, // event slug
    tipTitle: String,
    tip: String,
    groups: [
      {
        _id: false,
        a: String,
        b: String,
        items: [{ _id: false, event: { type: String, required: true }, tag: String }], // event slug + sub-filter tag
      },
    ],
  },
  { timestamps: true },
)

export default mongoose.model('Collection', collectionSchema)
