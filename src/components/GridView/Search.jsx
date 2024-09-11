import { useState } from "react"
import PropTypes from 'prop-types';

function Search({ filterSearch }) {
    const [search, setSearch] = useState('');

    return (
        <div className="nav_search">
            <input
                type="text"
                placeholder="Search by products..."
                className="nav_search__input"
                id="nav_search__input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                className="nav_search__button"
                onClick={() => filterSearch(search)}
            >
                Search
            </button>
        </div>
    );
}

Search.propTypes = {
    filterSearch: PropTypes.func.isRequired,
}

export default Search;
