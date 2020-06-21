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