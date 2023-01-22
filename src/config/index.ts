import dotenv from 'dotenv'

dotenv.config()

const APP_PORT = process.env.APP_PORT ?? 5000
const APP_URL = process.env.APP_URL ?? 'http://localhost'
const APP_API_NAME_VERSION_ROUTE = process.env.APP_API_NAME_VERSION_ROUTE ?? '/api/v1'

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_HOST = process.env.DB_HOST
const DB_PASSWORD = process.env.DB_PASSWORD

const DATABASE_URL = process.env.DATABASE_URL ?? 'postgres://postgres:password@localhost:5432/database_name'

const config = {
  APP_PORT,
  APP_URL,
  APP_API_NAME_VERSION_ROUTE,
  DB_NAME,
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DATABASE_URL
}

export default config
