import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env, isProd } from './config/env.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import routes from './routes/index.js'

export function createApp() {
  const app = express()
  app.use(helmet())
  app.use(cors({ origin: env.clientOrigins }))
  app.use(express.json({ limit: '1mb' }))
  if (!isProd) app.use(morgan('dev'))

  app.use('/api', routes)
  app.use(notFound)
  app.use(errorHandler)
  return app
}
