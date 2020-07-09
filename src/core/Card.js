import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

const Card = ({ product, showViewProductButton = true }) => {
    return (
        <div className="card">
            <div className="card-header">{product.name}</div>
            <div className="card-body">
                <ShowImage item={product} url="product" />
                <p className="lead mt-2">{product.description.substring(0, 100)}</p>
                <p className="black-9">${product.price}</p>
                <Link to={`/product/${product._id}`}>
                    {showViewProductButton && (<button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button>)}
                </Link>
                <button className="btn btn-outline-warning mt-2 mb-2">Add to cart</button>
            </div>
        </div>
    );
}

export default Card;