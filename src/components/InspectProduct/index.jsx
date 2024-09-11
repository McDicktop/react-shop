import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BasketContext } from "../../context/basketContext";
import handleBasket from "../utils/handleBasket";
import shop from "../../config/shop.json";
import getProducts from "../utils/getProducts";
import backBtn from "./imgs/back.svg";
import "./style.css";

function InspectProduct() {
    const { code } = useParams();

    const [{ basket, addToBasket, removeFromBasket }] =
        useContext(BasketContext);

    const [obj, setObj] = useState(null);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        const getProductItem = (value) => {
            const products = getProducts(shop);

            if (products.map((el) => el.code).includes(value)) {
                return setObj(products.filter((el) => el.code === value)[0]);
            }

            return setIsEmpty(true);
        };

        getProductItem(code);
    }, [code]);

    return (
        <>
            {obj && !isEmpty && (
                <div className="card-wrapper">
                    <div className="card-inspect">

                        <div className="inspect-buttons">

                        <button
                            onClick={() => {
                                window.location.replace(`/`);
                            }}
                            style={{ backgroundImage: `url("${backBtn}")` }}
                            className="backBtn"
                        ></button>
                                                <button
                            onClick={() =>
                                handleBasket(
                                    basket,
                                    addToBasket,
                                    removeFromBasket,
                                    obj
                                )
                            }
                            className="toCart"
                        >{`${
                            basket
                                .reduce((acc, item) => [...acc, item.code], [])
                                .includes(code)
                                ? "remove from cart"
                                : "add to cart"
                        }`}</button>
                        </div>


                        <img className="card-img" src={obj.image} alt="image" />
                        <div className="card-desc">
                            <h2 className="card-price">{`$${obj.price}`}</h2>
                            <h3>{obj.name}</h3>
                            <article>{obj.desc}</article>
                            <h4 className="card_rate">{`Rating - ${obj.rating}`}</h4>
                        </div>


                    </div>
                </div>
            )}

            {isEmpty && !obj && <p>Empty json parse</p>}
        </>
    );
}

export default InspectProduct;
