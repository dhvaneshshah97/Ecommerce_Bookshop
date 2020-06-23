import { API } from '../config';


export const createCategory = async (userId, token, category) => {
    const rawResponse = await fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    });
    const response = rawResponse.json();
    return response;
}

export const createProduct = async (userId, token, product) => {
    const rawResponse = await fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product,
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