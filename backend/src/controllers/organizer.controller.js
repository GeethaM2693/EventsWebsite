import Submission from '../models/Submission.js'
import { assertValid, validateSubmission } from '../utils/validate.js'
import { HttpError } from '../utils/http.js'

const receipt = (s, token) => ({ id: s._id, status: s.status, ...(token && { editToken: token }) })

// POST /api/organizer/submissions — { organizer, event, entry, price, ticketLink, photoCount, confirmed, draft? }
export async function createSubmission(req, res) {
  const draft = req.body.draft === true
  const { value, fields } = validateSubmission(req.body, { draft })
  assertValid(fields)
  const s = await Submission.create({ ...value, status: draft ? 'draft' : 'pending' })
  // The edit token is returned once so the browser can keep editing its own draft.
  const withToken = await Submission.findById(s._id).select('+editToken')
  res.status(201).json({ data: receipt(s, withToken.editToken) })
}

// PUT /api/organizer/submissions/:id — update a draft (X-Edit-Token) and optionally submit it.
export async function updateSubmission(req, res) {
  const s = await Submission.findById(req.params.id).select('+editToken')
  if (!s || s.editToken !== req.get('x-edit-token')) throw new HttpError(404, 'Submission not found')
  if (s.status !== 'draft') throw new HttpError(409, 'Only drafts can be edited')

  const draft = req.body.draft === true
  const { value, fields } = validateSubmission(req.body, { draft })
  assertValid(fields)
  Object.assign(s, value, { status: draft ? 'draft' : 'pending' })
  await s.save()
  res.json({ data: receipt(s) })
}
