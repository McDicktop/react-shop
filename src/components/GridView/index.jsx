import {
    useEffect,
    useContext,
    useState,
    useCallback,
    forwardRef,
    useImperativeHandle,
} from "react";
import GridItem from "../GridItem";
import Filter from "./Filter";
import { FilterContext } from "../../context/filterContext";
import { LengthContext } from "../../context/lengthContext";
import shopContent from "../../config/shop.json";
import getProducts from "../utils/getProducts";
import "./style.css";

const GridView = forwardRef(function GridView({ setFirstPage }, ref) {
    useImperativeHandle(ref, () => ({
        changePage(newPage) {
            setPage(newPage);
        },
        filterSearch(searchArg) {
            if (searchArg !== filter.search) {
                setSearch(searchArg);
            }
        },
    }));

    const [{ filter, setSearch }] = useContext(FilterContext);
    const [{ changeLength }] = useContext(LengthContext);

    const products = getProducts(shopContent);
    const amount = import.meta.env.VITE_AMOUNT_PER_PAGE;

    const [filteredData, setFilteredData] = useState(products);
    const [page, setPage] = useState(1);

    const filterProducts = useCallback(
        (productsToFilter) => {
            if (filter.category && filter.category !== "all") {
                return productsToFilter.filter(
                    (el) => el.category === filter.category
                );
            }

            return productsToFilter;
        },
        [filter.category]
    );

    const sortProducts = useCallback(
        (productsToSort) => {
            switch (filter.sort) {
                case "price (ascending)": {
                    return productsToSort.sort((a, b) => +a.price - +b.price);
                }
                case "price (descending)": {
                    return productsToSort.sort((a, b) => +b.price - +a.price);
                }
                case "name": {
                    return productsToSort.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                }
                default: {
                    return productsToSort;
                }
            }
        },
        [filter.sort]
    );

    const findProducts = useCallback(
        (products, searchStr) => {
            let filtered = searchStr
                ? products.filter((el) =>
                      el.name.toLowerCase().includes(searchStr.toLowerCase())
                  )
                : products;

            return filtered;
        },
        [filter.search]
    );

    useEffect(() => {
        const filtered = filterProducts(products),
            founded = findProducts(filtered, filter.search),
            sorted = sortProducts(founded);

        setFilteredData(sorted);
        setPage(1);
        changeLength(sorted.length);
        setFirstPage();
    }, [filter]);

    return (
        <>
            <Filter products={products} />
            <p className="avalibleProd">{`There are ${filteredData.length} products avalible`}</p>
            <div className="shop_wrapper">
                <ul className="grid_wrapper">
                    {filteredData
                        .slice(amount * (page - 1), amount * page)
                        .map((el, index) => {
                            return (
                                <GridItem key={`item_${index}`} product={el} />
                            );
                        })}
                </ul>
            </div>
        </>
    );
});

export default GridView;
