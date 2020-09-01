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
    

    return (
        <>
            <Layout title="Manage Products" description="Perform CRUD on products" className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <ul className="list-group">
                            {
                                products.map((p, i) => (
                                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                        <strong>{p.name}</strong>
                                        <Link to={`/admin/product/update/${p._id}`}>
                                            <span className="badge badge-warning badge-pill">Update</span>
                                        </Link>
                                        <span className="badge badge-danger badge-pill" onClick={() => destroy(p._id)} style={{cursor:'pointer'}}>Delete</span>
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