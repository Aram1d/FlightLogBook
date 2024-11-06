import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UrqlWrapper } from "@config";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UrqlWrapper>
        <App />
      </UrqlWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
