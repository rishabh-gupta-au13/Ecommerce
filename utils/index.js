// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';

// import { config } from "dotenv";
// config({ path: ".env" });

// console.log(process.env.NEXT_PUBLIC_DB_URL)
// const sql = neon(process.env.NEXT_PUBLIC_DB_URL);
// import * as schema from './schema'
// export const db = drizzle(sql,{schema});

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env" });

const sql = neon('postgresql://uniai_owner:tePi8V5GMmvr@ep-blue-fire-a1i6joor.ap-southeast-1.aws.neon.tech/uniai?sslmode=require');
export const db = drizzle(sql);

