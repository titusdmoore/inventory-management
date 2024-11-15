import { TextField, TextFieldRoot, TextFieldLabel } from "~/components/ui/textfield";
import { TextArea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { action, redirect } from "@solidjs/router";
import { itemsTable } from "~/db/schema";
import { db } from "~/db";

const createItem = action(async (formData: FormData) => {
  "use server";

  try {
    let formattedData: any = {};
    formData.forEach((value, key) => (formattedData[key] = value));

    const insertItem: typeof itemsTable.$inferInsert = formattedData;
    await db.insert(itemsTable).values(insertItem).$returningId();

    return redirect("/items", { revalidate: "items" });
  } catch (error) {
    console.error(error);
  }
});

export default function NewItem() {
  return (
    <main class="w-full h-full p-4">
      <h1 class="text-3xl mb-4">New Item</h1>
      <form action={createItem} method="post">
        <TextFieldRoot class="w-full max-w-xs">
          <TextFieldLabel>Item Name</TextFieldLabel>
          <TextField type="text" placeholder="Item Name" name="name" />
        </TextFieldRoot>
        <div class="grid grid-cols-1 md:grid-cols-2">
          <TextFieldRoot class="w-full max-w-xs">
            <TextFieldLabel>Item Price</TextFieldLabel>
            <TextField type="text" inputmode="numeric" pattern="\d*\.\d{2}" name="price" placeholder="Item Price" />
          </TextFieldRoot>
          <TextFieldRoot class="w-full max-w-xs">
            <TextFieldLabel>Quantity</TextFieldLabel>
            <TextField type="number" placeholder="Quantity" min="0" name="quantity" />
          </TextFieldRoot>
        </div>
        <TextFieldRoot class="w-full max-w-xs">
          <TextFieldLabel>Item Description</TextFieldLabel>
          <TextArea placeholder="Description" name="description" />
        </TextFieldRoot>
        <Button as="input" type="submit" class="mt-6">Create Item</Button>
      </form>
    </main>
  );
}
