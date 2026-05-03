import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { SearchProvider } from "./context/SearchProvider.tsx";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <SearchProvider>
            <BrowserRouter>
                <StrictMode>
                    <App />
                </StrictMode>
            </BrowserRouter>
        </SearchProvider>
    </AuthProvider>,
);
