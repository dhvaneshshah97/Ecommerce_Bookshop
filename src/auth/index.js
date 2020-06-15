import { API } from '../config';

// when submit method is clicked in signup component, request will come here below.
export const signup = async (user) => {
    const rawResponse = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            // API will respond with json data, so we need to accept json data
            Accept: 'application/json',
            // we tell the back-end that we are sending json data
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    const response = rawResponse.json();
    return response;

}

export const signin = async (user) => {
    const rawResponse = await fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            // API will respond with json data, so we need to accept json data
            Accept: 'application/json',
            // we tell the back-end that we are sending json data
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    const response = rawResponse.json();
    return response;
}

export const authenticate = (data) => {
    if (window !== undefined){
        localStorage.setItem('jwt',JSON.stringify(data));
    }
}