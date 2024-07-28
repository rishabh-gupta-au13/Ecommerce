
  
import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./utils/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    // url: process.env.NEXT_PUBLIC_DB_URL,

    url:'postgresql://uniai_owner:tePi8V5GMmvr@ep-blue-fire-a1i6joor.ap-southeast-1.aws.neon.tech/uniai?sslmode=require'
  }
});
