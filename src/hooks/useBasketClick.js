import { useState, useEffect, useRef } from "react";

const useBasketClick = () => {
    const [isBasketVisible, setIsBasketVisible] = useState(false);
    const basketRef = useRef(null);

    const toggleBasketVisibility = () => {
        setIsBasketVisible((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log(event.target)
            if (
                basketRef.current &&
                !basketRef.current.contains(event.target) &&
                event.target !== document.querySelector(".cart_div") &&
                event.target.className !== "btn_buy" &&
                event.target.className !== "toCart"
            ) {
                setIsBasketVisible(false);
            }
        };

        if (isBasketVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isBasketVisible]);

    return { isBasketVisible, toggleBasketVisibility, basketRef };
};

export default useBasketClick;
