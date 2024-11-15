import { A, createAsync, query, reload } from '@solidjs/router';
import { eq } from 'drizzle-orm';
import { createSignal } from 'solid-js';
import { For } from 'solid-js';
import SwitchToggle from '~/components/SwitchToggle';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { db } from '~/db';
import { itemsTable } from '~/db/schema';
import { getPrice } from '~/utils/currency';

const getItems = query(async () => {
  "use server";
  try {
    return await db.select().from(itemsTable);
  } catch (error) {
    console.error(error);
  }
}, "items");

const removeItem = async (id: number) => {
  "use server";
  try {
    await db.delete(itemsTable).where(eq(itemsTable.id, id));
    return reload({ revalidate: getItems.key });
  } catch (error) {
    console.error(error);
  }
};

export default function Items() {
  const items = createAsync(() => getItems());
  const [viewGrid, setViewGrid] = createSignal(true);

  const toggleView = () => { 
    console.log('ran');
    setViewGrid(!viewGrid())
  };

  return (
    <main class="p-4">
      <section class="mb-4 flex justify-between items-center w-full">
        <h1 class="text-2xl font-bold">Items</h1>
        <div class="flex gap-4">
          <Button as="a" href="/items/new">New Item</Button>
          <Button as="button" onClick={toggleView}>Toggle View Type</Button>
        </div>
      </section>
      <section>
        { viewGrid() ? (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <For each={items()} fallback={<div>Loading...</div>}>
              {(item) => (
                <A href={`/items/${item.id}`}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>{getPrice(item.price, true)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      <p>Card Footer</p>
                    </CardFooter>
                  </Card>
                </A>
              )}
            </For>
          </div>
        ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <For each={items()} fallback={<div>Loading...</div>}>
                  {(item) => (
                    <TableRow>
                      <TableCell><A href={`/items/${item.id}`}>{item.name}</A></TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{getPrice(item.price)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell class="flex">
                        <button onClick={() => removeItem(item.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" class="fill-white w-4" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
                        </button>
                      </TableCell>
                    </TableRow>
                  )}
                </For>
              </TableBody>
            </Table>
          )}
      </section>
    </main>
  );
}
