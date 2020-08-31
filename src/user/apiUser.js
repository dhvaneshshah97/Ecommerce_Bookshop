import { API } from '../config';

export const read = async (userId, token) => {
    try {
        const rawResponse = await fetch(`${API}/user/${userId}`, {
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

export const update = async (userId, token, user) => {
    try {
        const rawResponse = await fetch(`${API}/user/${userId}`, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
            },
            body: JSON.stringify(user),

        });
        const response = rawResponse.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateUserLocalStorageInfo = (user, next) => {
    if (typeof window !== undefined) {
        if (localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'));
            auth.user = user
            localStorage.setItem('jwt', JSON.stringify(auth));
            next();
        }
    }
}

export const getPurchaseHistory = async (userId, token) => {
    try {
        const rawResponse = await fetch(`${API}/orders/by/user/${userId}`, {
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