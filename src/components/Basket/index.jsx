import { useContext } from "react";
import { BasketContext } from "../../context/basketContext";
import BasketItem from "../BasketItem";
import PropTypes from "prop-types";
import "./style.css";

function Basket({basketRef}) {
    const [{ basket, removeAll }] = useContext(BasketContext);

    return (
        <div className="basket_wrapper" ref={basketRef}>
            <span className="basket_title">
                <h3 className="basket_h">Basket</h3>
                <button onClick={removeAll} className="basket_clear">
                    Clear
                </button>
            </span>

            <ul className="basket_ul">
                {(basket.length > 0 &&
                    basket.map((item, index) => {
                        return (
                            <BasketItem key={`item_${index}`} product={item} />
                        );
                    })) || <p>Basket is empty</p>}
            </ul>
            {basket.length > 0 && (
                <p className="p_total">{`Total: $${basket
                    .reduce((acc, item) => +acc + item.price * item.amount, [])
                    .toFixed(2)}`}</p>
            )}
        </div>
    );
}

// Basket.propTypes = {
//     basketRef: PropTypes.oneOfType([
//         PropTypes.func,
//         PropTypes.shape({current: PropTypes.instanceOf(Component)})
//     ]),
// };

export default Basket;
