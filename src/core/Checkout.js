import React, { useState, useEffect } from 'react'
import { getProducts, getBraintreeClientToken } from './apiCore';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: '',
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = async (userId, token) => {
        const data = await getBraintreeClientToken(userId, token);
        if (data.error) {
            setData({ ...data, error: data.error });
        } else {
            setData({ ...data, clientToken: data.clientToken })
        }
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        const total = products.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.count * currentValue.price;
        }, 0);
        return total.toFixed(2);
    }

    const showCheckout = () => {
        return (
            isAuthenticated() ? (<div>{showDropIn()}</div>) :
                (<Link to="/signin"><button className="btn btn-primary">Sign in to checkout</button></Link>)
        )
    }

    const showDropIn = () => (
        <div>
            {data.clientToken && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{ authorization: data.clientToken }}
                        onInstance={(instance) => (data.instance = instance)}
                    />
                    <button className="btn btn-success">Checkout</button>
                </div>
            ) : null}
        </div>
    )

    return (
        <>
            <h3 className="mb-3">Total: ${getTotal()}</h3>
            {showCheckout()}
        </>
    )
}

export default Checkout;