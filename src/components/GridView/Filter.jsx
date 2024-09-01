import { useContext, useCallback } from "react"
import { FilterContext } from "../../context/filterContext";
import SortTypes from "../../config/sortTypes";
import getAllCats from "../utils/getAllCats";

function Filter({ products }) {

    const [{ setCategory, setSort }] = useContext(FilterContext);

        const sortTypes = SortTypes;
        const categories = getAllCats(products);
        categories.unshift("all");

        const handleCategoryChange = useCallback((e) => {
            setCategory(e.target.value !== 'all' ? e.target.value : null);
        }, [setCategory])
    
        const handleSortChange = useCallback((e) => {
            setSort(e.target.value !== 'relevance' ? e.target.value : null);
        }, [setSort])

    return (
        <div>
            <div className="quantity_container">
                <label className="filter_elems">
                    Categories:
                    <select
                        className="select"
                        id="categories_drop"
                        name="categories_drop"
                        onChange={handleCategoryChange}
                    >
                        {categories.map((el, index) => {
                            return (
                                <option key={index} value={el}>
                                    {el}
                                </option>
                            );
                        })}
                    </select>
                </label>

                <label className="filter_elems">
                    Sort:
                    <select
                        className="select"
                        id="sort_drop"
                        name="sort_drop"
                        onChange={handleSortChange}
                    >
                        {sortTypes.map((el, index) => {
                            return (
                                <option key={index} value={el}>
                                    {el}
                                </option>
                            );
                        })}
                    </select>
                </label>
            </div>
        </div>
    );
}

export default Filter;
