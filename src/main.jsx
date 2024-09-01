import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BasketProvider } from "./context/basketContext.jsx";
import { FilterProvider } from "./context/filterContext.jsx";
import { LengthProvider } from "./context/lengthContext.jsx";
import { SearchProvider } from "./context/searchContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BasketProvider>
            <FilterProvider>
                <LengthProvider>
                    <SearchProvider>
                        <App />
                    </SearchProvider>
                </LengthProvider>
            </FilterProvider>
        </BasketProvider>
    </StrictMode>
);
