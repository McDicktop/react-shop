import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types'

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (code) => {        
        setFavorites([...favorites, code]);
    };

    const removeFromFavorites = (code) => {
        setFavorites(() => favorites.filter(el => el !== code));
    }

    return (
        <FavoritesContext.Provider value={[{favorites, addToFavorites, removeFromFavorites}]}>
            {children}
        </FavoritesContext.Provider>
    );
};



FavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


export { FavoritesContext, FavoritesProvider };
