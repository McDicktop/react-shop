import { useRef } from "react";
import Carousel from "../Carousel/Carousel";
import GridView from "../GridView";
import Pagination from "../Pagination";
import scrollToTop from "../utils/scrollToTop";

function MainPage() {

    const refGrid = useRef(null);
    const refPagination = useRef(null);

    function handlePage(page) {
        refGrid.current.changePage(page);
        scrollToTop();
    }

    function setFirstPage() {
        refPagination.current.setFirstPage();
    }

    return (
            <div className="wrapper" id="shop_wrapper__id">
                <Carousel />
                <GridView setFirstPage={setFirstPage} ref={refGrid} />
                <Pagination handlePage={handlePage} ref={refPagination} />
            </div>
    );
}

export default MainPage;
