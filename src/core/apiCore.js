import { API } from '../config';
import queryString from 'query-string';

export const getProducts = async (sortBy) => {
    const rawResponse = await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET",
    });
    if (rawResponse.error) {
        console.log(rawResponse.error);
    } else {
        const response = rawResponse.json();
        return response;
    }
}

export const getCategories = async () => {
    const rawResponse = await fetch(`${API}/categories`, {
        method: "GET",
    });
    if (rawResponse.error) {
        console.log(rawResponse.error);
    } else {
        const response = rawResponse.json();
        return response;
    }
}

export const getFilteredProducts = async (skip, limit, filters = {}) => {
    const data = { limit, skip, filters }
    const rawResponse = await fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (rawResponse.error) {
        console.log(rawResponse.error);
    } else {
        const response = rawResponse.json();
        return response;
    }
}

export const list = async (params) => {
    const query = queryString.stringify(params);
    console.log('query', query);
    const rawResponse = await fetch(`${API}/products/search?${query}`, {
        method: "GET",
    });
    if (rawResponse.error) {
        console.log(rawResponse.error);
    } else {
        const response = rawResponse.json();
        return response;
    }
}

export const read = async (productId) => {
    const rawResponse = await fetch(`${API}/product/${productId}`, {
        method: "GET",
    });
    if (rawResponse.error) {
        console.log(rawResponse.error);
    } else {
        const response = rawResponse.json();
        return response;
    }
}

export const listRelated = async (productId) => {
    const rawResponse = await fetch(`${API}/products/related/${productId}`, {
        method: "GET",
    });
    if (rawResponse.error) {
        console.log(rawResponse.error);
    } else {
        const response = rawResponse.json();
        return response;
    }
}

export const getBraintreeClientToken = async (userId, token) => {
    const rawResponse = await fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
        },

    });
    if (rawResponse.error) {
        console.log(rawResponse.error);
    } else {
        const response = rawResponse.json();
        return response;
    }
}

export const processPayment = async (userId, token, paymentData) => {
    const rawResponse = await fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(paymentData),

    });
    if (rawResponse.error) {
        console.log(rawResponse.error);
    } else {
        const response = rawResponse.json();
        return response;
    }
}