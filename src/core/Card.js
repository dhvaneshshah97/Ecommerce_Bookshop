import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cartHelpers';



const Card = ({
    product,
    showViewProductButton = true,
    showAddToCart = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    run = undefined,
    setRun = f => f,
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        })
    }

    const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }
    const showAddtocartButton = () => {
        if (showAddToCart) {
            if (product.quantity > 0) {
                return (
                    <button className="btn btn-outline-warning mt-2 mb-2" onClick={addToCart}>Add to cart</button>
                );
            } else {
                return (
                    <button disabled className="btn btn-outline-warning mt-2 mb-2" onClick={addToCart} style={{ cursor: 'not-allowed' }}>Add to cart</button>
                );
            }
        }
    }

    const handleChange = (event, productId) => {
        let { value } = event.target;
        const valueOfQty = parseInt(value);
        setCount(valueOfQty);
        if (valueOfQty >= 1) {
            updateItem(productId, valueOfQty);
        }
    }

    const showCartUpdate = () => {
        if (cartUpdate) {
            return (
                <div className="input-group mb-2 mt-2" >
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{ color: 'white', fontWeight: 'bold', background: '#4d4dff' }}>Qty</span>
                    </div>
                    <select type="number" onChange={(e) => { handleChange(e, product._id); setRun(!run) }} value={count} style={{ width: '70px' }}>
                        {quantityArray.map((qty, i) => (<option key={i} val={qty}>{qty}</option>))}
                    </select>
                </div>
            )
        }
    }

    const showRemoveProduct = () => {
        if (showRemoveProductButton) {
            return (
                <button className="btn btn-outline-danger mt-2 mb-2" onClick={() => { removeItem(product._id); setRun(!run) }}>Remove Product</button>
            );
        }
    }

    return (
        <div className="card" style={{ border: '0.2px black solid' }}>
            <div className="card-header name g-font">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
                <p className="lead mt-2">{product.description.substring(0, 100)}</p>
                <p className="black-9">${product.price}</p>
                <Link to={`/product/${product._id}`}>
                    {showViewProductButton && (<button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button>)}
                </Link>
                {showRemoveProduct()}
                {showCartUpdate()}
                {showAddtocartButton()}
            </div>
        </div>
    );
}

export default Card;