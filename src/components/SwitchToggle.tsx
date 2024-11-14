import { createSignal } from "solid-js";

export type SwitchToggleProps = {
  name: string;
}

export default function SwitchToggle({ name }: SwitchToggleProps) {
  const [ selected, setSelected ] = createSignal('grid');
  return (
    <fieldset class="border rounded-lg flex items-center relative p-1">
      <input type="radio" id="grid" name={name} value="grid" checked={selected() == "grid"} class="hidden peer/grid" onChange={() => { setSelected("grid"); console.log("change 1"); }} />
      <label for="grid" class="peer-checked/grid:bg-sky-600 py-2 px-4 rounded-md">Grid</label>
      <input type="radio" id="table" name={name} value="table" checked={selected() == "table"} class="hidden peer/table" onChange={() => { setSelected("table"); console.log("change"); }}  />
      <label for="table peer-checked/table:bg-sky-600 py-2 px-4 rounded-md">Table</label>
    </fieldset>
  );
}
