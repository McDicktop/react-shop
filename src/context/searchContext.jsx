import { useState, createContext } from "react";
import PropTypes from 'prop-types'
const SearchContext = createContext();


const SearchProvider = ({ children }) => {

    const [search, setSearch] = useState('');

    const createSearch = (searchArg) => {
        setSearch(searchArg);
    }

    return (
        <SearchContext.Provider value={ [ { search, createSearch}]}>
            {children}
        </SearchContext.Provider>
    )
}

SearchProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { SearchContext, SearchProvider}
