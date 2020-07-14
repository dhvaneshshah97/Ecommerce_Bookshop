import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';
import ShowImage from './ShowImage';
// import Card from './Card';
// import Search from './Search';
import moment from 'moment';
import { addItem } from './cartHelpers'
import { Link, Redirect } from 'react-router-dom';

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [relatedProduct, setRelatedProduct] = useState([]);
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

    const loadSingleProduct = async (productId) => {
        const data = await read(productId);
        if (data.error) {
            setError(data.error);
        } else {
            setProduct(data);
            // fetch related products
            const similarProducts = await listRelated(data._id);
            if (similarProducts.error) {
                setError(similarProducts.error);
            } else {
                setRelatedProduct(similarProducts);
            }
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props])

    const goBack = () => {
        return (
            <span className="col-sm-12 col-md-1" style={{ marginLeft: '20px' }}>
                <Link to="/" className="text-success"><i className="fas fa-angle-left" /> Back</Link>
            </span>
        );
    }
    return (
        <>
            <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)} className="container-fluid">
                <div className="row" style={{ minHeight: '500px' }}>
                    {shouldRedirect(redirect)}
                    {goBack()}
                    <div className="col-sm-12 col-md-2 offset-md-1">
                        <ShowImage item={product} url="product" details={true} />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-sm-12 col-md-5">
                        <div className="card" style={{ border: '0.5px #8000ff solid' }}>
                            <h4 className="card-header g-font name">Product Details</h4>
                            <ul className="list-group">
                                <li className="list-group-item g-font">Book Name: {product.name}</li>
                                <li className="list-group-item g-font">Description: {product && product.description && product.description.substring(0, 100)}</li>
                                <li className="list-group-item g-font">Price: ${product.price}</li>
                                <li className="list-group-item g-font">Category: {product && product.category && product.category.name}</li>
                                <li className="list-group-item g-font">Added on {moment(product.createdAt).fromNow()}</li>
                                <li className="list-group-item g-font">Shipping Available: {product.shipping ? 'Yes' : 'No'}</li>
                                {product.quantity > 0 ? (<li className="list-group-item"><span className="badge badge-primary badge-pill g-font">In Stock</span></li>) : (<li className="list-group-item"><span className=" badge badge-danger badge-pill g-font">Out of Stock</span></li>)}
                                <li className="list-group-item"><button className="btn btn-outline-success" onClick={addToCart}>Add to cart</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <h4 className="mb-4 col-sm-12">Products you may also like</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3 col-sm-12 col-md-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </Layout>
        </>
    );
}

export default Product;