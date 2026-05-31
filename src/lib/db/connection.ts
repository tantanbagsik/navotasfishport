import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_pCe0ST6yHuYN@ep-proud-sound-aph3o3tc-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

export const sql = neon(DATABASE_URL)
