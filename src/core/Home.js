import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';

const Home = (props) => {

    // create state variables as arrays that will hold the products by sell and arrival
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState('');

    const loadProductsBySell = async () => {
        const data = await getProducts('sold');
        if (data.error) {
            setError(data.error);
        } else {
            setProductsBySell(data);
        }
    }

    const loadProductsByArrival = async () => {
        const data = await getProducts('createdAt');
        if (data.error) {
            setError(data.error);
        } else {
            setProductsByArrival(data);
        }
    }

    // this will intialize state variables with data when component mounts for the first time
    useEffect(() => {
        loadProductsBySell();
        loadProductsByArrival();
    }, [])


    return (
        <>
            <Layout title="Home Page" description="Node React Ecommerce App" className="container-fluid">
                <h2 className="mb-4">New Arrival</h2>
                <div className="row">
                    {productsByArrival.map((p, i) => (<Card key={i} product={p} />))}
                </div>

                <h2 className="mb-4">Best Sellers</h2>
                <div className="row">
                    {productsBySell.map((p, i) => (<Card key={i} product={p} />))}
                </div>

            </Layout>
        </>
    )
}

export default Home
