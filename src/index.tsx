import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App";
import "./style.css"

const rootElt = document.getElementById("root");

if ( rootElt ) {
    const root = createRoot(rootElt);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    )
}