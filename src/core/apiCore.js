import { API } from '../config';
import queryString from 'query-string';

export const getProducts = async (sortBy) => {
    const rawResponse = await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET",
    });
    const response = rawResponse.json();
    return response;
}

export const getCategories = async () => {
    const rawResponse = await fetch(`${API}/categories`, {
        method: "GET",
    });
    const response = rawResponse.json();
    return response;
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
    const response = rawResponse.json();
    return response;
}

export const list = async (params) => {
    const query = queryString.stringify(params);
    console.log('query', query);
    const rawResponse = await fetch(`${API}/products/search?${query}`, {
        method: "GET",
    });
    const response = rawResponse.json();
    return response;
}