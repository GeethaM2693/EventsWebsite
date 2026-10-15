import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDB() {
  if (!env.mongoUri || env.mongoUri.includes('<password>')) {
    throw new Error('MONGODB_URI is not set. Copy .env.example to .env and paste your Atlas connection string.')
  }
  mongoose.set('strictQuery', true)
  await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 10000 })
  console.log(`MongoDB connected (${mongoose.connection.name})`)
}

export const disconnectDB = () => mongoose.disconnect()
