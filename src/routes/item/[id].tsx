import { useParams } from "@solidjs/router";

export default function Item() {
  const { id } = useParams();

  return (
    <main>
      <div>Item: {id}</div>
    </main>
  );
}
