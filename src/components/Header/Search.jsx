import {  useState } from "react"

function Search({filterSearch}) {
    const [search, setSearch] = useState('');

    return (
        <div className="nav_search">
            <input
                type="text"
                placeholder="Search by products..."
                className="nav_search__input"
                id="nav_search__input"
                value={search}
                onChange={(e) => setSearch(e.target.value) }
            />
            <button
                className="nav_search__button"
                onClick={() => filterSearch(search) }
            >
                Search
            </button>
        </div>
    );
}

export default Search;
