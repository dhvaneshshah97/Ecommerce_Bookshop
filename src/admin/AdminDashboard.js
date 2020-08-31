import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

    // destructuring user from object derived from below method which return an object from local storage. In that whole object, user is a property with its value as object. So that's why we have destructured user like below.
    const { user: { name, email } } = isAuthenticated()

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">View Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">Manage Products</Link>
                    </li>
                </ul>
            </div>
        );
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Admin Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">Admin</li>
                </ul>
            </div>
        );
    }


    return (
        <Layout title="Dashboard" description={'Welcome Back, ' + name} className="container-fluid">
            <div className="row">
                <div className="col-3">{adminLinks()}</div>
                <div className="col-9">{adminInfo()}</div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;