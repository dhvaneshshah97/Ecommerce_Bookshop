import React, { useState, useEffect } from 'react'
import { getBraintreeClientToken, processPayment } from './apiCore';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import { emptyCart } from './cartHelpers';

const Checkout = ({ products, run = undefined, setRun = f => f }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: '',
        loading: false,
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
        setData({ ...data, loading: true });
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
                setData({ ...data, success: response.success });
                //empty cart
                emptyCart(() => {
                    console.log("payment success and empty cart");
                    setRun(!run);
                    setData({ ...data, loading: false, success: response.success })
                });
                // create order

            } catch (error) {
                console.log(error);
                setData({ ...data, loading: false, error: error })
            }
        } catch (error) {
            // console.log("drop-in error:", error);
            setData({ ...data, error: error, loading: false });
        }

    }

    const showDropIn = () => (
        <div>
            {data.clientToken && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: "vault",
                            }
                        }}
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
            style={{ display: data.success ? '' : 'none' }}>
            Thanks! Your payment was successful
        </div>
    )

    const showLoading = (
        <div className="btn btn-success mt-2 btn-block" type="button" style={{cursor:'pointer'}}> 
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span><span className="ml-1" style={{color:'white', fontWeight:'bold'}}>Waiting for successful payment</span>
        </div>
    )

    return (
        <>
            <h3 className="mb-3">Total: ${getTotal()}</h3>
            {showSuccess}
            {showCheckout()}
            {data.loading ? showLoading : ''}
        </>
    )
}

export default Checkout;