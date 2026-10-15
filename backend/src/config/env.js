import 'dotenv/config'

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5001),
  mongoUri: process.env.MONGODB_URI ?? '',
  clientOrigins: (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173').split(',').map((s) => s.trim()),
  adminApiKey: process.env.ADMIN_API_KEY || null,
  appToday: process.env.APP_TODAY || null,
}

export const isProd = env.nodeEnv === 'production'
