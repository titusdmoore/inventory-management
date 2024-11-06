import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import { Resizable, ResizablePanel, ResizableHandle } from "~/components/ui/resizable";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <Resizable
          orientation="horizontal"
          class="h-full w-full min-h-screen min-w-screen"
        >
          <ResizablePanel initialSize={.2}>
            My sidebar container
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel initialSize={.8}>
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
