import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { UrqlWrapper } from "@config";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Notifications />
      <UrqlWrapper>
        <App />
      </UrqlWrapper>
    </BrowserRouter>
  </React.StrictMode>,
);
