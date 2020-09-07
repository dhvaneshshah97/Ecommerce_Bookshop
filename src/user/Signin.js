import React, { useState } from 'react'
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth/index';
import { Redirect } from 'react-router-dom';

const Signin = (props) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });
    // After explaining message property, let's talk about this from property. Now, when user clicked on dashboard and if he is not signed in first(authenticated), then he will redirect to sign in page, often times we see that when user signin, he goes to that same page from which he was redirected. The same thing here from does. from property comes with location of that page which user was trying to access earlier, so if it has value, we simply push that value using history object. And boom.. user gets back to that page which he was trying to access.
    const { from } = props.location.state || '';
    const handleSubmit = async (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        const userData = await signin({ email, password });
        if (userData.error) {
            setValues({ ...values, error: userData.error, loading: false });
        } else {
            await authenticate(userData);
            if (from) {
                props.history.push(from);
                console.log(from);
            }
            setValues({ ...values, redirectToReferrer: true });
        }

    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value, error: false });
    }

    //destructuring state variables
    const { password, email, error, loading, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    // signin form
    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input className="form-control" type="email" name="email" value={email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input className="form-control" type="password" name="password" value={password} onChange={handleChange} />
                </div>
                <button className="btn btn-outline-primary" >Submit</button>
            </form>
        )
    }

    // showError component
    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        );
    }

    // showLoading component
    const showLoading = () => {
        return (
            <div className="alert alert-success mt-2" style={{ display: loading ? '' : 'none' }}>
                Loading...
            </div>
        );
    }
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
    }

    // this message is derived from state property of Redirect which is in PrivateRoute Component. So at first this message property does not contain any message, bydefault it is empty. But if user is not signed in, and if he/she clicked on Dashboard which is covered by PrivateRoute(only signed in user can access), then from Redirect component of PrivateRoute, this message property will get message specified over there and
    // updated comment - now we are conditionally checking that if user role is one that go to admin dashboard otherwise user dashboard. So dashboard will only be displayed when user sign in. So now there is no point of below code. But let's just keep it that way. and same in above section, let's keep from code as it is.
    const { message } = props.location.state || '';

    const redirectToDashboard = () => {
        if (message) {
            return (<div className="alert alert-danger">{props.location.state.message}</div>)
        }
    }

    const adminCredentials = (
        <div className="card mt-3">
            <div className="card-body">
                <h5 className="card-title">Admin credentials</h5>
                <p className="card-text">email: tom@gmail.com password: tom@123</p>
                <p className="card-text" style={{color:'red', fontStyle:'italic'}}>*Please do not mess around with admin credentials<br/>if you delete any product for testing, make sure you reupload that product with same details as before</p>
            </div>
        </div>
    )

    // const { message } = props.location.state || '';

    return (
        <Layout title="Sign-in Page" description="signin to eCommerce Book-shop" className="container col-md-8 offset-md-2">
            {redirectToDashboard()}
            {showError()}
            {signinForm()}
            {showLoading()}
            {adminCredentials}
            {redirectUser()}
        </Layout>
    )
}

export default Signin;
