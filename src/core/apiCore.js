import { API } from '../config';

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