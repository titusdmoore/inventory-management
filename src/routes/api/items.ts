import type { APIEvent } from "@solidjs/start/server";
import { insert } from "solid-js/web";
import { db } from "~/db";
import { itemsTable, usersTable } from "~/db/schema";

// Returns all Items
export async function GET({ request, params }: APIEvent) {
	try {
		// const res = await db.select().from(itemsTable);
		const { searchParams } = new URL(request.url)
			const res = await db.select().from(itemsTable);

		if ( searchParams.has('page') && searchParams.has('items_per_page') ) {
		} 
		return Response.json(res, { status: 200 });
	} catch (error) {
		return new Response("Something went wrong fetching items. Please try again later.", { status: 500 });
	}
}

// Creates a new Item
export async function POST({ request }: APIEvent) {
	try {
		let res = await request.json();

		// TODO: Validate the request body.
		const insertItem: typeof itemsTable.$inferInsert = res;
		const sqlItem = await db.insert(itemsTable).values(insertItem).$returningId();

		return Response.json(sqlItem, { status: 200 });
	} catch (error) {
		// TODO: Check and handle error.
		console.log(error);
		return new Response("Something went wrong creating your item. Please try again later.", { status: 500 });
	}
}
