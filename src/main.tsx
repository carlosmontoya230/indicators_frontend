import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";
import AppRoutes from "./app/routes";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  );
}
