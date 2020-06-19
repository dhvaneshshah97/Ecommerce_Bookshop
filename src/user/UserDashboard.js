import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';

const Dashboard = () => {

    const { user: { name, email, role } } = isAuthenticated()
    return (
        <Layout title="Dashboard" description={'Welcome Back, ' + name} className="container">
            <div class="card mb-5">
                <h3 class="card-header">User Information</h3>
                <ul class="list-group">
                    <li class="list-group-item">{name}</li>
                    <li class="list-group-item">{email}</li>
                    <li class="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
                </ul>
            </div>

            <div class="card mb-5">
                <h3 class="card-header">Purchase History</h3>
                <ul class="list-group">
                    <li class="list-group-item">history</li>
                </ul>
            </div>
        </Layout>
    )
}

export default Dashboard;