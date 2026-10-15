import mongoose from 'mongoose'

// A saved event or place, owned by an anonymous browser id until accounts exist.
const savedSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true, index: true },
    kind: { type: String, enum: ['event', 'place'], required: true },
    slug: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
)

savedSchema.index({ clientId: 1, kind: 1, slug: 1 }, { unique: true })

export default mongoose.model('SavedItem', savedSchema)
