import { Router } from 'express'
import mongoose from 'mongoose'
import { getEvent, listEvents } from '../controllers/events.controller.js'
import { popular, search, suggest } from '../controllers/search.controller.js'
import { getCollection, listCollections } from '../controllers/collections.controller.js'
import { listCategories, listFilters, listPlaces } from '../controllers/catalog.controller.js'

import { savedIds, getSaved, recommendations, saveItem, unsaveItem } from '../controllers/saved.controller.js'
import { createSubmission, updateSubmission } from '../controllers/organizer.controller.js'
import { listSubmissions, reviewSubmission } from '../controllers/admin.controller.js'
import { getHome } from '../controllers/home.controller.js'
import { requireClientId } from '../middleware/clientId.js'
import { requireAdmin } from '../middleware/adminAuth.js'

const router = Router()

router.get('/health', (req, res) => {
  const up = mongoose.connection.readyState === 1
  res.status(up ? 200 : 503).json({ status: up ? 'ok' : 'db-unavailable', time: new Date().toISOString() })
})

router.get('/home', getHome)
router.get('/events', listEvents)
router.get('/events/:slug', getEvent)

router.get('/search', search)
router.get('/search/suggest', suggest)
router.get('/search/popular', popular)

router.get('/collections', listCollections)
router.get('/collections/:slug', getCollection)

router.get('/categories', listCategories)
router.get('/filters', listFilters)
router.get('/places', listPlaces)

// Saved events & places (anonymous per-browser id for now)
router.get('/saved', requireClientId, getSaved)
router.get('/saved/ids', requireClientId, savedIds)
router.get('/saved/recommendations', requireClientId, recommendations)
router.put('/saved/:kind/:slug', requireClientId, saveItem)
router.delete('/saved/:kind/:slug', requireClientId, unsaveItem)

// Organizers: submit a listing for review
router.post('/organizer/submissions', createSubmission)
router.put('/organizer/submissions/:id', updateSubmission)

// Admin review queue (X-Admin-Key)
router.get('/admin/submissions', requireAdmin, listSubmissions)
router.patch('/admin/submissions/:id', requireAdmin, reviewSubmission)

export default router
