import { createApp } from './app.js'
import { connectDB, disconnectDB } from './config/db.js'
import { env } from './config/env.js'

try {
  await connectDB()
} catch (err) {
  console.error(`\nCould not start: ${err.message}\n`)
  process.exit(1)
}

const server = createApp().listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port}/api (${env.nodeEnv})`)
})

const shutdown = () => server.close(async () => { await disconnectDB(); process.exit(0) })
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
