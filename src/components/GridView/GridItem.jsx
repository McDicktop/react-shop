import PropTypes from "prop-types";
import { useContext } from "react";
import { BasketContext } from "../../context/basketContext";
import { FavoritesContext } from "../../context/favoritesContext";
import handleBasket from "../utils/handleBasket";
import Liked from "../../assets/favorite_button";
import Unliked from "../../assets/unliked";

function GridItem({ product }) {
    const [{ basket, addToBasket, removeFromBasket }] =
        useContext(BasketContext);
    const [{ favorites, addToFavorites, removeFromFavorites }] =
        useContext(FavoritesContext);

    return (
        <li
            onClick={(e) => {
                if (!e.target.classList.contains("btn_buy")) {
                    window.location.replace(`/${product.code}/`);
                }
            }}
            className="product_wrapper"
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    if (favorites.find((el) => el === product.code)) {
                        removeFromFavorites(product.code);
                    } else {
                        addToFavorites(product.code);
                    }
                }}
                className="like"
            >
                {favorites.find((el) => el === product.code) ? (
                    <Unliked />
                ) : (
                    <Liked />
                )}
            </div>

            <img className="product_image" src={product.image} alt="image" />
            <div>
                <div className="product_price">{`$${product.price}`}</div>
                <p className="product_name">{product.name}</p>
                <div className="product_rating">{product.rating}</div>
            </div>

            <button
                onClick={() =>
                    handleBasket(basket, addToBasket, removeFromBasket, product)
                }
                className="btn_buy"
            >{`${
                basket
                    .reduce((acc, item) => [...acc, item.code], [])
                    .includes(product.code)
                    ? "remove from cart"
                    : "add to cart"
            }`}</button>
        </li>
    );
}

GridItem.propTypes = {
    product: PropTypes.object.isRequired,
};

export default GridItem;
