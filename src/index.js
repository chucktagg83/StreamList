import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// The index.js file is the entry point of the application. It renders the App component inside a React root using ReactDOM.createRoot. The App component is wrapped in React.StrictMode to enable additional checks and warnings for potential issues in the application. The styles.css file is also imported to apply global styles to the application. The rendered content is inserted into the root element with the id "root" in the HTML document.