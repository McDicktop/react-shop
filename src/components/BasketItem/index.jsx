import { useContext } from "react";
import { BasketContext } from "../../context/basketContext";

function BasketItem({ product }) {
    
    const [{ addProduct, removeProduct, removeFromBasket }] = useContext(BasketContext);




    return (

        <li className="basket_li">
            <span className="name">{product.name}</span>
            <span className="price">{`$${product.price}`}</span>
            <div className="amount">
                <button 
                    className="amount_btn"
                    onClick={() => removeProduct(product.code)}
                >-</button>
                <div className="amount_div">{product.amount}</div>
                <button
                    onClick={() => addProduct(product.code)}
                    className="amount_btn"
                >+</button>
            </div>
            <button className="shopBtn" onClick={() => removeFromBasket(product.code)}>
                remove
            </button>
        </li>
    );
}

export default BasketItem;
