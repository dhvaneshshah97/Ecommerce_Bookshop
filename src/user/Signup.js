import React, { useState } from 'react'
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { signup } from '../auth/index'
const Signup = () => {
    // values is a state variable with value of an obejct
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });

    // destructuring the state variables
    const { name, email, password, error, success } = values;

    // when any of the input changes, it changes state values and in turn, it controls the value for that input
    const handleChange = (event) => {
        const { name, value } = event.target;
        // to update object's state, we need to use this kind of notation(Spread Operator)
        setValues({ ...values, error: false, success: false, [name]: value });
    }

    // when submit button is clicked, below method is called
    const clickSubmit = async (event) => {
        event.preventDefault();
        const data = await signup({ name:name, email:email, password:password });
        if (data.error) {
            setValues({ ...values, error: data.error, success: false });
        } else {
            setValues({ ...values, name: '', email: '', password: '', error: '', success: true });
        }
    }

    // signup form
    const signupForm = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input className="form-control" value={name} type="text" name="name" onChange={handleChange} />
                </div>
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

    // showSuccess component
    const showSuccess = () => {
        return (
            <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
                New Account is created. Please <Link to="/signin">Sign-in</Link>
            </div>
        );
    }

    // this will be rendered on the screen.
    return (
        <Layout title="Signup" description="signup to Node React Ecommerce App" className="container col-md-8 offset-md-2">
            {showError()}
            {showSuccess()}
            {signupForm()}
        </Layout>
    )
}

export default Signup;
