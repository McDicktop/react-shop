import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

const BasketContext = createContext();

const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState(() => {
        const savedBasket = localStorage.getItem('basket');

        return savedBasket ? JSON.parse(savedBasket) : [];
    });

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket));
    }, [basket])

    const addToBasket = (item) => {
        setBasket([...basket, { ...item, amount: 1 }]);
    };

    const removeFromBasket = (code) => {
        setBasket(basket.filter((el) => el.code !== code));
    };

    const addProduct = (code) => {
        if (basket.find((el) => el.code === code).amount < 10)
            setBasket(
                basket.map((el) =>
                    el.code === code ? { ...el, amount: ++el.amount } : el
                )
            );
    };

    const removeProduct = (code) => {
        if (basket.find((el) => el.code === code).amount > 1)
            setBasket(
                basket.map((el) =>
                    el.code === code ? { ...el, amount: --el.amount } : el
                )
            );
    };

    const removeAll = () => {
        setBasket([]);
    };

    return (
        <BasketContext.Provider
            value={[
                {
                    basket,
                    addToBasket,
                    removeFromBasket,
                    addProduct,
                    removeProduct,
                    removeAll,
                },
            ]}
        >
            {children}
        </BasketContext.Provider>
    );
};

BasketProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { BasketContext, BasketProvider };
