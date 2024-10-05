import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./components/ThemeContext"; // Import your ThemeProvider
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        {" "}
        {/* Wrap App with ThemeProvider */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
