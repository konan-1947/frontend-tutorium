import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import AppRoutes from "./routes/Routes"; // Import route chính

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* Bọc toàn bộ ứng dụng */}
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
