import { int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
import { TABLE_PREFIX } from '~/db';

export const usersTable = mysqlTable(`${TABLE_PREFIX}users`, {
	id: serial().primaryKey(),
	firstName: varchar({ length: 255 }).notNull(),
	lastName: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
});
