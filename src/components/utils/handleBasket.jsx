export default function handleBasket(basket, addToBasket, removeFromBasket, item) {
    
    const arrayOfCodes = basket.reduce((acc, item) => [...acc, item.code], []);

    if (!arrayOfCodes.includes(item.code)) {
        addToBasket(item);
    } else {
        removeFromBasket(item.code);
    }
}