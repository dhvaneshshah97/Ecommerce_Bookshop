import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
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

    return (
        <>
            <Layout title="Profile" description="Update your profile here" className="container-fluid">
                <h2 className="mb-4">Profile update</h2>
                {JSON.stringify(values)}
            </Layout>
        </>
    )

}

export default Profile;