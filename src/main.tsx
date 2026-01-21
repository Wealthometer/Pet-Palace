"use client"

import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

// Ensure Clerk is loaded before rendering the app
createRoot(document.getElementById("root")!).render(<App />)
