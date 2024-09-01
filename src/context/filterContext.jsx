import { useState, createContext } from "react";
import PropTypes from "prop-types";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState({
        category: null,
        sort: null,
        search: ''
    });

    const setCategory = (category) => {
        setFilter({ ...filter, ['category']: category})
    };

    const setSort = (sort) => {
        setFilter({ ...filter, ['sort']: sort})
    };

    const setSearch = (search) => {
        setFilter({ ...filter, ['search']: search})
    }

    return (
        <FilterContext.Provider value={[{ filter, setCategory, setSort, setSearch }]}>
            {children}
        </FilterContext.Provider>
    );
};

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { FilterContext, FilterProvider };
