import { useLocation } from "@solidjs/router";
import { Button } from "~/components/ui/button";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";
  return (
    <nav class="flex flex-col items-start py-4 w-full">
      <ul class="container text-gray-200">
        <li class={`${active("/")}`}>
          <a href="/">Dashboard</a>
        </li>
        <li class={`${active("/about")}`}>
          <a href="/about">About</a>
        </li>
        <li class={`${active("/items")}`}>
          <a href="/items">Items</a>
        </li>
      </ul>
    </nav>
  );
}
