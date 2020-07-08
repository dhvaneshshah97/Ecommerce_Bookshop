import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { read } from './apiCore';
import Card from './Card';
import ShowImage from './ShowImage';
// import Card from './Card';
// import Search from './Search';

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    const loadSingleProduct = async (productId) => {
        const data = await read(productId);
        if (data.error) {
            setError(data.error);
        } else {
            setProduct(data);
        }
    }

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [])

    return (
        <>
            <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)} className="container-fluid">
                <div className="row">
                    <div className="col offset-md-1">
                        <ShowImage item={product} url="product" details={true}/>
                    </div>

                </div>

            </Layout>
        </>
    );
}

export default Product;