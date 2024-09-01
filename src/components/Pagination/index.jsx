import {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
    useContext,
} from "react";
import { LengthContext } from "../../context/lengthContext";
import "./style.css";

const Pagination = forwardRef(function Pagination({ handlePage }, ref) {
    const [{ length, changeLength }] = useContext(LengthContext);
    const [page, setPage] = useState(0);
    const amount = import.meta.env.VITE_AMOUNT_PER_PAGE;
    const pages = Math.ceil(length / amount);

    useEffect(() => {
        handlePage(page + 1);
    }, [page, handlePage]);

    useImperativeHandle(ref, () => ({
        setFirstPage() {
            setPage(0);
        },
    }));

    const handlePageClick = (newPage) => {
        setPage(newPage);
    };

    const renderPaginationItems = () => {
        if (pages <= 7) {
            return Array.from({ length: pages }).map((_, index) => (
                <li
                    key={index}
                    className={`pagination_item ${
                        index === page ? "active" : ""
                    }`}
                    onClick={() => handlePageClick(index)}
                >
                    {index + 1}
                </li>
            ));
        }

        const items = [];

        for (let index = 0; index < pages; index++) {
            if (
                index === 0 ||
                index === pages - 1 ||
                (index >= page - 1 && index <= page + 1)
            ) {
                items.push(
                    <li
                        key={index}
                        className={`pagination_item ${
                            index === page ? "active" : ""
                        }`}
                        onClick={() => handlePageClick(index)}
                    >
                        {index + 1}
                    </li>
                );
            } else if (
                (index === 1 && page > 2) ||
                (index === pages - 2 && page < pages - 3)
            ) {
                items.push(
                    <li
                        key={index}
                        className="pagination_item"
                        onClick={() =>
                            handlePageClick(index === 1 ? page - 1 : page + 1)
                        }
                    >
                        {index === 1 ? "<<" : ">>"}
                    </li>
                );
            }
        }

        return items;
    };

    return (
        <div
            className="pagination_container"
            role="navigation"
            aria-label="Pagination"
        >
            <ul className="pagination_ul">{renderPaginationItems()}</ul>
        </div>
    );
});

export default Pagination;
