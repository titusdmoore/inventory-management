import { int, mediumint, mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";
import { TABLE_PREFIX } from "~/db/index";

export const itemsTable = mysqlTable(`${TABLE_PREFIX}items`, {
	// While rather annoying if you try to make a FK from a serial field, you will get an error. So we are doing this manually.
	id: int().primaryKey().autoincrement(),
	name: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	// Price is stored in cents to avoid floating point errors, to convert to dollars, divide by 100
	price: int().notNull().default(0),
	quantity: mediumint({ unsigned: true }).notNull().default(0),
});

// Item Meta allows for items to have meta values that are not standardized between all items.
export const itemMetaTable = mysqlTable(`${TABLE_PREFIX}item_meta`, {
	id: serial().primaryKey(),
	itemId: int('item_id').notNull().references(() => itemsTable.id),
	key: varchar({ length: 255 }).notNull(),
	value: text().notNull(),
});
