import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';


const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) =>
            isAuthenticated() && isAuthenticated().user.role === 1 ? (<Component {...props} />) : (<Redirect to={{
                pathname: "/",
                // below state property is extremely useful. It is for coming back to this dashboard or any other component which require private route(only signed in user can see that page) after signin.
                state: {
                    message: `Admin Resource. Access denied!`,
                    from: props.location,
                }
            }} />)
        }
        />
    )
}

export default AdminRoute;