import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';


const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setSuccess('');
        setName(e.target.value);
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        // make request to API to create category
        const data = await createCategory(user._id, token, { name });
        if (data.error) {
            setError(true);
        } else {
            setSuccess(true);
        }
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted" >Name</label>
                <input type="text" className="form-control" autoFocus value={name} onChange={handleChange} required />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>


    );

    const checkError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>Category should be unique</div>
    )

    const checkSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>Your category {name} is created successfully</div>
    );


    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="text-success"><i className="fas fa-angle-left" /> Back to dashboard</Link>
            </div>
        );
    }

    return (
        <Layout title="Add a new Category" description={`Hi ${user.name}, ready to add a new category?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {checkError()}
                    {checkSuccess()}
                    {newCategoryForm()}
                    {goBack()}
                </div>

            </div>
        </Layout>
    );
}

export default AddCategory;
