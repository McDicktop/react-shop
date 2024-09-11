import useBasketClick from "../../hooks/useBasketClick";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Basket from "../Basket";

function Homepage() {
    const { toggleBasketVisibility, isBasketVisible, basketRef } =
        useBasketClick();

    return (
        <>
            <Header toggleBasketVisibility={toggleBasketVisibility} />
            {isBasketVisible && <Basket basketRef={basketRef} />}
            <Outlet />
        </>
    );
}

export default Homepage;
