import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BasketProvider } from "./context/basketContext.jsx";
import { FilterProvider } from "./context/filterContext.jsx";
import { LengthProvider } from "./context/lengthContext.jsx";
import { SearchProvider } from "./context/searchContext.jsx";
import { ThemeProvider } from "./context/themeContext.jsx";
import { FavoritesProvider } from "./context/favoritesContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <BasketProvider>
                <FilterProvider>
                    <LengthProvider>
                        <SearchProvider>
                            <FavoritesProvider>
                                <App />
                            </FavoritesProvider>
                        </SearchProvider>
                    </LengthProvider>
                </FilterProvider>
            </BasketProvider>
        </ThemeProvider>
    </StrictMode>
);
