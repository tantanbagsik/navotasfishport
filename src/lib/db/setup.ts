import { createTables, seedData } from './schema'

async function setup() {
  console.log('Setting up database...')
  await createTables()
  await seedData()
  console.log('Database setup complete!')
}

setup().catch(err => {
  console.error('Database setup failed:', err)
  process.exit(1)
})
