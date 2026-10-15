import mongoose from 'mongoose'
import { randomBytes } from 'node:crypto'

const { Schema } = mongoose

// An organizer's "List your event" form. Reviewed before it becomes an Event.
const submissionSchema = new Schema(
  {
    status: { type: String, enum: ['draft', 'pending', 'approved', 'rejected'], default: 'pending', index: true },
    editToken: { type: String, default: () => randomBytes(16).toString('hex'), select: false },

    organizer: {
      name: String,
      type: { type: String }, // organizer kind: event company, venue, …
      contact: String,
      email: String,
      phone: String,
      website: String,
    },
    event: {
      title: String,
      category: String,
      area: String,
      startDate: Date,
      endDate: Date,
      opensAt: String, // "HH:MM"
      closesAt: String,
      venue: String,
      description: String,
      goodFor: [String],
    },
    entry: { type: String, enum: ['free', 'paid', 'rsvp'], default: 'free' },
    price: Number, // starting price in ₹ when entry = paid
    ticketLink: String,
    photoCount: { type: Number, default: 0 },
    confirmed: { type: Boolean, default: false },

    reviewNote: String,
    eventSlug: String, // set when approved
  },
  { timestamps: true },
)

export default mongoose.model('Submission', submissionSchema)
