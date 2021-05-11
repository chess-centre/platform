import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import "./assets/css/style.scss";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import ThemedSuspense from "./components/ThemedSuspense";
import { Windmill } from "@windmill/react-ui";
import Theme from "./theme.js";


if (process.env.NODE_ENV === "production") {
  console.log("Initialising GA");
  const trackingId = "UA-194757154-1";
  ReactGA.initialize(trackingId);
}

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

