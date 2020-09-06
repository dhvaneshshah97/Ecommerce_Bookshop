import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUserLocalStorageInfo } from './apiUser';

const Profile = (props) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false,
    });

    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = async (userId) => {
        try {
            const data = await read(userId, token);
            setValues({ ...values, name: data.name, email: data.email });

        } catch (error) {
            setValues({ ...values, error: true });
        }
    }

    useEffect(() => {
        init(props.match.params.userId);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value, error: false });
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await update(props.match.params.userId, token, { name, email, password });
            updateUserLocalStorageInfo(data, () => {
                setValues({...values, name: data.name, email: data.email, success: true});
            })

        } catch (error) {
            console.log(error);
        }
    }

    const redirectUser = () => {
        if (success) {
            return <Redirect to="/user/dashboard" />
        }
    }

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange} className="form-control" value={name} name="name" />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange} className="form-control" value={email} name="email" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange} className="form-control" value={password} name="password" />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary mr-2">Update Profile</button>
            <Link className="btn btn-success" to="/user/dashboard">Go back</Link>
        </form>
    )

    return (
        <>
            <Layout title="Profile" description="Update your profile here" className="container-fluid">
                <h2 className="mb-4">Profile update</h2>
                {profileUpdate(name, email, password)}
                {redirectUser()}
            </Layout>
        </>
    )

}

export default Profile;