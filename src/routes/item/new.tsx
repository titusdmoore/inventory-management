import { TextField, TextFieldRoot, TextFieldLabel } from "~/components/ui/textfield";
import { TextArea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

export default function NewItem() {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(e);
  };

  return (
    <main class="w-full h-full p-4">
      <h1 class="text-3xl mb-4">New Item</h1>
      <form onSubmit={handleSubmit}>
        <TextFieldRoot class="w-full max-w-xs">
          <TextFieldLabel>Item Name</TextFieldLabel>
          <TextField type="text" placeholder="Item Name" />
        </TextFieldRoot>
        <div class="grid grid-cols-1 md:grid-cols-2">
          <TextFieldRoot class="w-full max-w-xs">
            <TextFieldLabel>Item Price</TextFieldLabel>
            <TextField type="text" inputmode="numeric" pattern="\d*\.\d{2}" placeholder="Item Price" />
          </TextFieldRoot>
          <TextFieldRoot class="w-full max-w-xs">
            <TextFieldLabel>Quantity</TextFieldLabel>
            <TextField type="number" placeholder="Quantity" min="0" />
          </TextFieldRoot>
        </div>
        <TextFieldRoot class="w-full max-w-xs">
          <TextFieldLabel>Item Description</TextFieldLabel>
          <TextArea placeholder="Description" />
        </TextFieldRoot>
        <Button type="submit" class="mt-6">Create Item</Button>
      </form>
    </main>
  );
}
