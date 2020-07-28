import React, { useState, useEffect } from 'react'
import { getBraintreeClientToken, processPayment } from './apiCore';
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
            setData({ clientToken: data.clientToken })
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
        );
    }

    const buy = async () => {
        // sent the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        try {
            let getNonce = await data.instance.requestPaymentMethod();
            nonce = getNonce.nonce;
            // once you have nonce (card type, card number) send nonce as 'payment method nonce' to the backend
            // and also total to be charged
            // console.log("send nonce and total to process:", nonce, getTotal(products));
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products),
            }
            try {
                const response = await processPayment(userId, token, paymentData);
                // console.log(response);
                setData({...data, success: response.success});
                //empty cart
                // create order

            } catch (error) {
                
            }
        } catch (error) {
            // console.log("drop-in error:", error);
            setData({...data, error: error});
        }

    }

    const showDropIn = () => (
        <div>
            {data.clientToken && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{ authorization: data.clientToken }}
                        onInstance={(instance) => (data.instance = instance)}
                    />
                    <button className="btn btn-success btn-block" onClick={buy}>Pay</button>
                </div>
            ) : null}
        </div>
    );

    const showSuccess = (
        <div 
            className="alert alert-info"
            style={{display: data.success ? '' : 'none' }}>
            Thanks! Your payment was successful
        </div>
    )

    return (
        <>
            <h3 className="mb-3">Total: ${getTotal()}</h3>
            {showSuccess}
            {showCheckout()}
        </>
    )
}

export default Checkout;