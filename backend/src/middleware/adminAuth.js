import { timingSafeEqual } from 'node:crypto'
import { env } from '../config/env.js'
import { HttpError } from '../utils/http.js'

export function requireAdmin(req, res, next) {
  if (!env.adminApiKey) throw new HttpError(503, 'Admin API is disabled (set ADMIN_API_KEY)')
  const given = Buffer.from(req.get('x-admin-key') ?? '')
  const real = Buffer.from(env.adminApiKey)
  if (given.length !== real.length || !timingSafeEqual(given, real)) throw new HttpError(401, 'Invalid admin key')
  next()
}
