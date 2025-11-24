import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Make sure your App file is App.jsx
import "./App.css"; // Optional, if you have global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
