import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UrqlWrapper } from "./urqlClient";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UrqlWrapper>
        <App />
      </UrqlWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
