import { createSignal } from "solid-js";
import { For } from 'solid-js';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { getPrice } from "~/utils/currency";
import Counter from "./Counter";

export default function ItemsView({ items }: any) {
  const [viewGrid, setViewGrid] = createSignal(true);

  const toggleView = () => { 
    console.log('ran');
    setViewGrid(!viewGrid())
  };


  return (
    <div>
      <Counter />
      <Button as="button" onClick={toggleView}>Toggle View Type</Button>
      <button onClick={toggleView}>
        Toggle Button
      </button>
      { viewGrid() ? (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <For each={items()} fallback={<div>Loading...</div>}>
            {(item) => (
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
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{getPrice(item.price)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>
        )}
    </div>
  );
}
