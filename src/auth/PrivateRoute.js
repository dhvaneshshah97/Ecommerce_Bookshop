import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) =>
            isAuthenticated() ? (<Component {...props} />) : (<Redirect to={{
                pathname: "/signin",
                // not sure about this line of code, maybe it is for coming back to this dashboard after signin
                state: {from: props.location}
            }} />)
        }
        />
    )
}

export default PrivateRoute;