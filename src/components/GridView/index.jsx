import PropTypes from "prop-types";
import {
    useEffect,
    useContext,
    useState,
    useCallback,
    forwardRef,
    useImperativeHandle,
} from "react";

import GridAd from "./GridAd";
import GridItem from "./GridItem";
import Filter from "./Filter";
import Search from "./Search";
import ToggleBtn from "./ToggleBtn";
import FavBtn from "./FavBtn";

import { FilterContext } from "../../context/filterContext";
import { LengthContext } from "../../context/lengthContext";
import { FavoritesContext } from "../../context/favoritesContext";

import shopContent from "../../config/shop.json";
import ads from "../../config/ads.json";
import getProducts from "../utils/getProducts";
import scrollToTop from "../utils/scrollToTop";

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

    function filterSearch(search) {
        ref.current.filterSearch(search);
    }

    const [{ filter, setSearch }] = useContext(FilterContext);
    const [{ changeLength }] = useContext(LengthContext);
    const [{ favorites }] = useContext(FavoritesContext);

    const products = getProducts(shopContent);
    const adsArray = getProducts(ads);

    const amount = import.meta.env.VITE_AMOUNT_PER_PAGE;
    const adAmount = import.meta.env.VITE_AD_AMOUNT;

    const [filteredData, setFilteredData] = useState(products);
    const [page, setPage] = useState(1);
    const [isFavOn, setIsFavOn] = useState(false);
    const [favData, setFavData] = useState(
        favorites.map((el) => products.find((product) => product.code === el))
    );

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
        if (isFavOn) {
            setIsFavOn(false);
        }

        const filtered = filterProducts(products),
            founded = findProducts(filtered, filter.search),
            sorted = sortProducts(founded);

        setFilteredData(sorted);
        changeLength(sorted.length);
        setFirstPage();
        scrollToTop();
        if (isFavOn) {
            setIsFavOn(false);
        }
    }, [filter]);

    useEffect(() => {
        if (isFavOn) {
            setFavData(
                favorites.map((el) =>
                    products.find((product) => product.code === el)
                )
            );
    
            changeLength(favData.length);
            setFirstPage();
            return;
        }
        changeLength(filteredData.length)
    }, [isFavOn, favorites]);

    return (
        <>
            <div className="filters">
                <p className="avalibleProd">{`${
                    isFavOn
                        ? "Your favorites:"
                        : `There are ${filteredData.length} products avalible`
                }`}</p>
                <Search filterSearch={filterSearch} />
                <Filter products={products} />
                <ToggleBtn />
                <FavBtn setIsFavOn={setIsFavOn} isFavOn={isFavOn} />
            </div>

            <ul className="grid_wrapper">
                {!isFavOn &&
                    filteredData
                        .slice(amount * (page - 1), amount * page)
                        .map((el, index) => {
                            return (
                                <>
                                    {index === +adAmount && (
                                        <GridAd
                                            key={`ad_${index}`}
                                            obj={
                                                adsArray[
                                                    Math.floor(
                                                        Math.random() *
                                                            adsArray.length
                                                    )
                                                ]
                                            }
                                        />
                                    )}
                                    <GridItem
                                        key={`item_${index}`}
                                        product={el}
                                    />
                                </>
                            );
                        })}

                {isFavOn &&
                    favData
                        .slice(amount * (page - 1), amount * page)
                        .map((el, index) => {
                            return (
                                <>
                                    <GridItem
                                        key={`item_${index}`}
                                        product={el}
                                    />
                                </>
                            );
                        })}
            </ul>
        </>
    );
});

GridView.propTypes = {
    setFirstPage: PropTypes.func.isRequired,
};

export default GridView;
