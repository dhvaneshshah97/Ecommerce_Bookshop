import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) =>
            isAuthenticated() ? (<Component {...props} />) : (<Redirect to={{
                pathname: "/signin",
                // below state property is extremely useful. It is for coming back to this dashboard or any other component which require private route(only signed in user can see that page) after signin.
                state: {
                    message: `Please Sign in to get access`,
                    from: props.location,
                }
            }} />)
        }
        />
    )
}

export default PrivateRoute;

//Note : whenever user is signed in as admin, and when he tries to explicitly changes the url from admin/dashboard to user/dashboard, he indeed gets access to that, because it is apparent that, admin itself is an authenticated user, so he does gets an access. But if we don't want that we can write above if-else to check if user is authenticated and his role is 1(admin) then we can  redirect it back to admin/dashboard, else if he is authenticated and role is 0, then go to user/dashboard else simply redirect him to signin page with a message. But let's keep things simple. Let admin be the registered user as well and let him access user/dashboard as well. Afterall admin can be a normal user... :) 