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
                        <Card  product={product} showAddToCart={false} cartUpdate={true} />
                    </div>))}
            </div>
        )
    }

    const noItemMessage = () => (
        <>
        <h3>Your cart is empty</h3>  <Link to="/shop"><h4>Continue shopping</h4></Link>
        </>
    )

    return (
        <>
            <Layout
                title="Shopping Cart"
                description="Manage your cart items. Add/remove checkout or continue shopping."
                className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-3">
                        {items.length > 0 ? showItems(items) : noItemMessage()}
                    </div>
                    <div className="col-sm-12 col-md-6 offset-3">
                        <p>checkout options</p>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Cart;