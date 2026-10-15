import { isProd } from '../config/env.js'
import { HttpError } from '../utils/http.js'

export const notFound = (req, res) => {
  res.status(404).json({ error: { message: `Route not found: ${req.method} ${req.originalUrl}` } })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) return res.status(err.status).json({ error: { message: err.message, ...(err.fields && { fields: err.fields }) } })
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return res.status(400).json({ error: { message: err.message } })
  }
  console.error(err)
  res.status(500).json({ error: { message: isProd ? 'Something went wrong' : err.message } })
}
