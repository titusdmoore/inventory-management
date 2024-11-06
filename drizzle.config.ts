import { defineConfig } from 'drizzle-kit';

// Define the configuration for the Drizzle
export default defineConfig({
  out: './src/drizzle',
  schema: './src/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
