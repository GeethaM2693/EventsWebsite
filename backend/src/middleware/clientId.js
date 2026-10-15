import { HttpError } from '../utils/http.js'

// Anonymous visitor id sent by the frontend (X-Client-Id). Replace with the signed-in user once auth exists.
const ID = /^[A-Za-z0-9_-]{16,64}$/

export function requireClientId(req, res, next) {
  const id = req.get('x-client-id')
  if (!id || !ID.test(id)) throw new HttpError(400, 'Missing or invalid X-Client-Id header')
  req.clientId = id
  next()
}
