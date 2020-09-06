import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './apiAdmin';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    }

    const { user, token } = isAuthenticated();

    const destroy = async (productId) => {
        const res = alert("Are you sure? If no, press \'Esc\'");
        if (res) {
            try {
                await deleteProduct(productId, user._id, token);
                loadProducts();
            } catch (error) {
                console.log(error);
            }
        }

    }

    useEffect(() => {
        loadProducts();
    }, []);

    const goBack = () => {
        return (
            <div className="mb-4">
                <Link to="/admin/dashboard" className="text-success"><i className="fas fa-angle-left" /> Back to dashboard</Link>
            </div>
        );
    }

    return (
        <>
            <Layout title="Manage Products" description="Perform CRUD on products" className="container-fluid">
                {goBack()}
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Total products {products.length}</h2>
                        <hr />
                        <ul className="list-group">
                            {
                                products.map((p, i) => (
                                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                        <strong>{p.name}</strong>
                                        <Link to={`/admin/product/update/${p._id}`}>
                                            <button className="btn btn-success">Update</button>
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => destroy(p._id)} style={{ cursor: 'pointer' }}>Delete</button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ManageProducts;