import type { APIEvent } from "@solidjs/start/server";
import { insert } from "solid-js/web";
import { db } from "~/db";
import { itemsTable, usersTable } from "~/db/schema";

// Creates a new Item
export async function POST({ request }: APIEvent) {
	try {
		let req = await request.json();

		// TODO: Validate the request body.
		const insertItem: typeof itemsTable.$inferInsert = req;
		const sqlItem = await db.insert(itemsTable).values(insertItem).$returningId();

		return Response.json(sqlItem, { status: 200 });
	} catch (error) {
		// TODO: Check and handle error.
		console.log(error);
		return new Response("Something went wrong creating your item. Please try again later.", { status: 500 });
	}
}
