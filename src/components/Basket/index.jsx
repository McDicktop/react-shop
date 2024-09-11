import { useContext } from "react";
import { BasketContext } from "../../context/basketContext";
import BasketItem from "./BasketItem";
import PropTypes, { element } from "prop-types";
import "./style.css";

function Basket({ basketRef }) {
    const [{ basket, removeAll }] = useContext(BasketContext);

    return (
        <div className="basket_wrapper" ref={basketRef}>

            <span className="basket_title">
                <span>Items in cart:</span>

            </span>

            <ul>
                {(basket.length > 0 &&
                    basket.map((item, index) => {
                        return (
                            <BasketItem key={`item_${index}`} product={item} />
                        );
                    })) || <p>Basket is empty</p>}
            </ul>
            {basket.length > 0 && (
                <span className="basket_title">

                    <p className="p_total">{`Total: $${basket
                        .reduce(
                            (acc, item) => +acc + item.price * item.amount,
                            []
                        )
                        .toFixed(2)}`}</p>

                    <button onClick={removeAll} className="basket_btn">
                        Clear
                    </button>

                    <button className="basket_btn">
                        Order
                    </button>

                </span>
            )}
        </div>
    );
}

Basket.propTypes = {
    basketRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(element) }),
        // PropTypes.shape({current: PropTypes.instanceOf(component)})
        // PropTypes.shape({current: PropTypes.element})
    ]),
};

export default Basket;
