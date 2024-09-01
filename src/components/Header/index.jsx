import { useContext } from "react";
import { BasketContext } from "../../context/basketContext";
import Search from "./Search";
import "./style.css";
import cart from "./imgs/cart.svg";
import logo from "./imgs/logo.png";
import PropTypes from "prop-types";

function Header({ toggleBasketVisibility, filterSearch }) {
    const [{ basket }] = useContext(BasketContext);

    return (
        <header className="navigation_wrapper">
            <div
                className="logo"
                style={{ backgroundImage: `url("${logo}")` }}
            ></div>

            <Search filterSearch={filterSearch} />

            <div
                className={"cart_div"}
                style={{ backgroundImage: `url("${cart}")` }}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleBasketVisibility();
                }}
            >
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
