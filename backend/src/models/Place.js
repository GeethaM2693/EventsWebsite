import mongoose from 'mongoose'
import { tones } from '../config/categories.js'

// "Hidden gems" — places rather than dated events.
const placeSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    order: Number,
    name: { type: String, required: true },
    area: String,
    note: String,
    photo: { label: String, tone: { type: String, enum: tones }, url: String },
  },
  { timestamps: true },
)

export default mongoose.model('Place', placeSchema)
