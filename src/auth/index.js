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

// below method simply store user data in localstorage when user first time signed in
export const authenticate = (data) => {
    if (window !== undefined){
        localStorage.setItem('jwt',JSON.stringify(data));
    }
}

export const signout = async (history) => {
    //first, remove signin details from localstorage
    if (window !== undefined){
        localStorage.removeItem('jwt');
    }

    // then, redirect to signin/home page
    history.push('/signin');

    // and then, send request to backend which in turn will give message that you can use to display.
    const rawResponse = await fetch(`${API}/signout`, {
        method: "GET",
    });

    // one new thing that I got to know today is that fetch will give you the response in ReadableStream which you can assign as rawResponse, now you have to convert it into json format so you can use the response data, so for that you should call rawResponse.json(), but again this will give you a promise object which again you have to make it into json, so for that you can use another .then() in .then().catch() structure or another await to make it into json.
    // const response = rawResponse.json();
    const response =  await rawResponse.json();
    console.log(response.message);
    
}


// below method is checked whether user is authenticated or not, i.e., user is signed in or not
export const isAuthenticated = () => {
    if (typeof window === undefined) {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        // you just have to return something basically so it understands that it does have local storage item with key 'jwt'. You can return either true or the below return value.
        return JSON.parse(localStorage.getItem('jwt'))  
    } else {
        return false
    }

}