import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Homepage from "./components/Homepage";
import InspectProduct from "./components/InspectProduct";
import MainPage from "./components/MainPage";
import "./App.css";
import { ThemeContext } from "./context/themeContext";
function App() {


    const [{ theme }] = useContext(ThemeContext);

    return (

        <div className={`${theme}`}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />}>
                        <Route index element={<MainPage />} />
                        <Route path=":code" element={<InspectProduct />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
