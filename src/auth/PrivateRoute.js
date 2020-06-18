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
                    message: `Please sign in to access ${props.location.pathname.slice(1)}`,
                    from: props.location,
                }
            }} />)
        }
        />
    )
}

export default PrivateRoute;