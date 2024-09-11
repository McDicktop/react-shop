import PropTypes from 'prop-types'
import { useContext } from 'react'
import { BasketContext } from '../../context/basketContext'
import Remove from '../../assets/remove'
import Minus from '../../assets/minus'
import Plus from '../../assets/plus'

function BasketItem({ product }) {

    const [{ addProduct, removeProduct, removeFromBasket }] = useContext(BasketContext);

    return (
        <li className="basket_li">
            <img src={product.image} className="basket_img" />
            <span>{product.name}</span>
            <span>{`$${product.price}`}</span>

            <div className="amount">
                <button
                    onClick={() => removeProduct(product.code)}
                ><Minus /></button>
                <div>{product.amount}</div>
                <button
                    onClick={() => addProduct(product.code)}
                ><Plus /></button>
            </div>

            <button onClick={() => removeFromBasket(product.code)}
            ><Remove />
            </button>

        </li>
    );
}

BasketItem.propTypes = {
    product: PropTypes.array.isRequired
}


export default BasketItem;
