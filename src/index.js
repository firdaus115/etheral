import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LandingPage from "./pages/LandingPage";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router";
// import { BrowserRouter } from "react-router-dom"; // ✅ Correct import path

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
