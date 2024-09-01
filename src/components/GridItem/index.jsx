import { useContext } from "react";
import { BasketContext } from "../../context/basketContext";

function GridItem({ product, adStyle }) {
    const [{ basket, addToBasket, removeFromBasket }] =
        useContext(BasketContext);

    function handleButton(e, item) {
        const arrayOfCodes = basket.reduce((acc, item) => [...acc, item.code], []);

        if (!arrayOfCodes.includes(product.code)) {
            addToBasket(item);
        } else {
            removeFromBasket(item.code);
        }
    }

    return (
        <li className="product_wrapper" style={adStyle}>
            <img className="product_image" src={product.image} alt="image" />
            <div className="product_info">
                <div className="product_price">{`$${product.price}`}</div>
                <p className="product_name">{product.name}</p>
                <div className="product_rating">{product.rating}</div>
            </div>

            <button
                onClick={(e) => handleButton(e, product)}
                className="btn_buy"
            >{`${
                basket.reduce((acc, item) => [...acc, item.code], []).includes(product.code)
                    ? "remove from cart"
                    : "add to cart"
            }`}</button>
        </li>
    );
}

export default GridItem;
