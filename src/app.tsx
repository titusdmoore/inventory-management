import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import { Resizable, ResizablePanel, ResizableHandle } from "~/components/ui/resizable";
import "./app.css";

export default function App() {
  return (
    <Router
      data-kb-theme="dark"
      root={props => (
        <Resizable
          orientation="horizontal"
          class="h-full w-full min-h-screen min-w-screen"
        >
          <ResizablePanel initialSize={.15} class="p-4">
            My sidebar content
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel initialSize={.85}>
            <Nav />
            <Suspense>{props.children}</Suspense>
          </ResizablePanel>
        </Resizable>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
