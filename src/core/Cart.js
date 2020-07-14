import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { Link } from 'react-router-dom';
import Card from './Card';
import { getCart } from './cartHelpers';
const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        window.scrollTo(0,0);
        setItems(getCart());
    }, []);

    const showItems = (items) => {
        return (
            <div>
                <h2>
                    Your cart has {items.length} items
                </h2>
                <hr />
                {items.map((product, i) => (
                    <div key={i} className="mb-3">
                        <Card  product={product} showAddToCart={false} />
                    </div>))}
            </div>
        )
    }

    const noItemMessage = () => (
        <h3>Your cart is empty <br /> <Link to="/shop">Continue shopping.</Link></h3>
    )

    return (
        <>
            <Layout
                title="Shopping Cart"
                description="Manage your cart items. Add/remove checkout or continue shopping."
                className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        {items.length > 0 ? showItems(items) : noItemMessage()}
                    </div>
                    <div className="col-6">
                        <p>checkout options</p>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Cart;