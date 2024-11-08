import { useLocation } from "@solidjs/router";
import { Button } from "~/components/ui/button";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";
  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center p-3 text-gray-200">
        <li class={`border-b-2 ${active("/item/new")} mx-1.5 sm:mx-6`}>
          <Button as="a" href="/item/new">New Item</Button>
        </li>
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">Home</a>
        </li>
        <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
          <a href="/about">About</a>
        </li>
        <li class={`border-b-2 ${active("/item")} mx-1.5 sm:mx-6`}>
          <a href="/item">Items</a>
        </li>
      </ul>
    </nav>
  );
}
