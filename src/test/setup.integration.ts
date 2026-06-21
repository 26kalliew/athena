import { vi, beforeAll } from 'vitest'

const testUrl = process.env.TEST_DATABASE_URL
const prodUrl = process.env.DATABASE_URL

if (!testUrl) {
  throw new Error('TEST_DATABASE_URL is not set — add it to .env.local before running integration tests')
}
if (testUrl === prodUrl) {
  throw new Error('TEST_DATABASE_URL must differ from DATABASE_URL — refusing to run against production')
}

// Redirect before any @/db import; the Pool reads this at module initialisation time
process.env.DATABASE_URL = testUrl

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}))

beforeAll(async () => {
  const { Pool } = await import('pg')
  const { drizzle } = await import('drizzle-orm/node-postgres')
  const { migrate } = await import('drizzle-orm/node-postgres/migrator')

  const pool = new Pool({ connectionString: testUrl })
  const db = drizzle(pool)
  await migrate(db, { migrationsFolder: './drizzle' })
  await pool.end()
})
