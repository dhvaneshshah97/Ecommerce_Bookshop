import { API } from '../config';
import queryString from 'query-string';

export const getProducts = async (sortBy) => {
    try {
        const rawResponse = await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=100`, {
            method: "GET",
        });

        const response = rawResponse.json();
        return response;

    } catch (error) {
        console.log(error);
    }

}

export const getCategories = async () => {
    try {
        const rawResponse = await fetch(`${API}/categories`, {
            method: "GET",
        });

        const response = rawResponse.json();
        return response;

    } catch (error) {
        console.log(error);
    }

}

export const getFilteredProducts = async (skip, limit, filters = {}) => {
    try {
        const data = { limit, skip, filters }
        const rawResponse = await fetch(`${API}/products/by/search`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const response = rawResponse.json();
        return response;

    } catch (error) {
        console.log(error);
    }
}

export const list = async (params) => {
    try {
        const query = queryString.stringify(params);
        console.log('query', query);
        const rawResponse = await fetch(`${API}/products/search?${query}`, {
            method: "GET",
        });
        const response = rawResponse.json();
        return response;

    } catch (error) {
        console.log(error);
    }

}

export const read = async (productId) => {
    try {
        const rawResponse = await fetch(`${API}/product/${productId}`, {
            method: "GET",
        });

        const response = rawResponse.json();
        return response;

    } catch (error) {
        console.log(error);
    }

}

export const listRelated = async (productId) => {
    try {
        const rawResponse = await fetch(`${API}/products/related/${productId}`, {
            method: "GET",
        });
        const response = rawResponse.json();
        return response;

    } catch (error) {
        console.log(error);
    }

}

export const getBraintreeClientToken = async (userId, token) => {
    try {
        const rawResponse = await fetch(`${API}/braintree/getToken/${userId}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
            },

        });
        const response = rawResponse.json();
        return response;

    } catch (error) {
        console.log(error);
    }

}

export const processPayment = async (userId, token, paymentData) => {
    try {
        const rawResponse = await fetch(`${API}/braintree/payment/${userId}`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
            },
            body: JSON.stringify(paymentData),

        });
        const response = rawResponse.json();
        return response;

    } catch (error) {
        console.log(error);
    }
}

export const createOrder = async (userId, token, createOrderData) => {
    try {
        const rawResponse = await fetch(`${API}/order/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
            },
            body: JSON.stringify({ order: createOrderData }),

        });
        const response = rawResponse.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}