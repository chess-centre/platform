import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Windmill } from "@windmill/react-ui";
import Theme from "./theme";
import { SidebarProvider } from "./context/SidebarContext";
import ThemedSuspense from "./components/ThemedSuspense";
import "./assets/css/style.css";

ReactDOM.render(
  <SidebarProvider>
    <Suspense fallback={<ThemedSuspense />}>
      <Windmill theme={Theme} dark={false}>
        <App />
      </Windmill>
    </Suspense>
  </SidebarProvider>,
  document.getElementById("root")
);
