import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem } from './cartHelpers';



const Card = ({ product, showViewProductButton = true, showAddToCart = true }) => {
    const [redirect, setRedirect] = useState(false);

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        })
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }
    const showAddtocartButton = () => {
        if (showAddToCart) {
            return (
                <button className="btn btn-outline-warning mt-2 mb-2" onClick={addToCart}>Add to cart</button>
            );
        }
    }

    return (
        <div className="card" >
            <div className="card-header name g-font">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
                <p className="lead mt-2">{product.description.substring(0, 100)}</p>
                <p className="black-9">${product.price}</p>
                <Link to={`/product/${product._id}`}>
                    {showViewProductButton && (<button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button>)}
                </Link>
                {showAddtocartButton()}
            </div>
        </div>
    );
}

export default Card;