import "./style.css";
import { useContext } from "react";
import { BasketContext } from "../../context/basketContext";
import Cart from '../../assets/cart';
import PropTypes from "prop-types";

function Header({ toggleBasketVisibility }) {
    const [{ basket }] = useContext(BasketContext);
    return (
        <header className="navigation_wrapper">

            <div
                onClick={() => window.location.replace(`/`)}
                className="logo"
            >Shop tour</div>

            <div
                className={"cart_div"}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleBasketVisibility();
                }}
            >
                <Cart />
                {basket.length > 0 && (
                    <div className="basket_amount">{basket.length}</div>
                )}
            </div>
        </header>
    );
}

Header.propTypes = {
    toggleBasketVisibility: PropTypes.func.isRequired,
};

export default Header;
