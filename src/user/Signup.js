import React, { useState } from 'react'
import Layout from '../core/Layout';
import { API } from '../config';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });

    const { name, email, password, error, success } = values;
    const handleChange = (event) => {
        const { name, value } = event.target;
        // to update object's state, we need to use this kind of notation(Spread Operator)
        setValues({ ...values, error: false, success: false, [name]: value });
    }

    const clickSubmit = async (event) => {
        event.preventDefault();
        const data = await signup({ name, email, password });
        if (data.error) {
            setValues({ ...values, error: data.error, success: false });
        } else {
            setValues({ ...values, name: '', email: '', password: '', error: '', success: true });
        }
    }
    const signup = async (user) => {
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

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        );
    }
    const showSuccess = () => {
        return (
            <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
                New Account is created. Please <Link to="/signin">Sign-in</Link>
            </div>
        );
    }

    return (
        <Layout title="Signup" description="signup to Node React Ecommerce App" className="container col-md-8 offset-md-2">
            {showError()}
            {showSuccess()}
            {signupForm()}
        </Layout>
    )
}

export default Signup
