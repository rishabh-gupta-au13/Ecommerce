import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

console.log(process.env.NEXT_PUBLIC_DB_URL)

const sql = neon(process.env.NEXT_PUBLIC_DB_URL);
import * as schema from './schema'
export const db = drizzle(sql,{schema});
