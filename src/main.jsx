import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import PageLoader from "./Routes/PageLoader.jsx";
// import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={<PageLoader />}>
   
      <BrowserRouter>
        <App />
      </BrowserRouter>
 
  </Suspense>
);
