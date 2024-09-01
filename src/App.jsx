import { useRef } from "react";
import Basket from "./components/Basket";
import Carousel from "./components/Carousel/Carousel";
import GridView from "./components/GridView";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import useBasketClick from "./hooks/useBasketClick";
import "./App.css";

function App() {
    const { isBasketVisible, toggleBasketVisibility, basketRef } =
        useBasketClick();

    const refGrid = useRef(null);
    const refPagination = useRef(null);

    function handlePage(page) {
        refGrid.current.changePage(page);
    }

    function filterSearch(search) {
        refGrid.current.filterSearch(search);
    }

    function setFirstPage() {
        refPagination.current.setFirstPage();
    }

    return (
        <>
            <Header
                toggleBasketVisibility={toggleBasketVisibility}
                filterSearch={filterSearch}
            />
            <div className="wrapper">
                <Carousel />
                <GridView setFirstPage={setFirstPage} ref={refGrid} />

                {isBasketVisible && <Basket basketRef={basketRef} />}

                <Pagination handlePage={handlePage} ref={refPagination} />
            </div>
        </>
    );
}

export default App;
