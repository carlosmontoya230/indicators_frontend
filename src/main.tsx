import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./app/routes";

import "./styles/index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  );
}
