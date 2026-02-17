import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom"; // import { BrowserRouter } from "react-router-dom"; // ✅ Correct import path

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading....</div>}>
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
reportWebVitals();
