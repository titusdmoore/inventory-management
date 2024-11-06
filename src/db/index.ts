import { drizzle } from 'drizzle-orm/mysql2';

// Define the prefix for the tables
export const TABLE_PREFIX = process.env.DATABASE_TABLE_PREFIX || 'im_';

// Initialize the database connection
export const db = drizzle(process.env.DATABASE_URL!);

