import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ItemsProvider } from "./context/ItemsContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ItemsProvider>
        <App />
      </ItemsProvider>
    </BrowserRouter>
  </React.StrictMode>
);