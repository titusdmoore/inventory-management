import { TextField, TextFieldRoot, TextFieldLabel } from "~/components/ui/textfield";
import { TextArea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

export default function NewItem() {
  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      const data = new FormData(e.target as HTMLFormElement);
      let dataObj = Array.from(data.entries()).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      let response = await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify(dataObj),
      });

      if (response.ok) {

        return;
      }

      throw new Error("Failed to create item");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main class="w-full h-full p-4">
      <h1 class="text-3xl mb-4">New Item</h1>
      <form onSubmit={handleSubmit}>
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
