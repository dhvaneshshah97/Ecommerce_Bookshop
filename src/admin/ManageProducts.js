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
                        <h2 className="text-center">Total products: {products.length}</h2>
                        <hr />
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Update Product</th>
                                    <th scope="col">Delete Product </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p, i) => (
                                    <tr key={i}>
                                        <th scope="row">{p.name}</th>
                                        <td><Link to={`/admin/product/update/${p._id}`}>
                                            <button className="btn btn-success">Update</button>
                                        </Link></td>
                                        <td><button className="btn btn-danger" onClick={() => destroy(p._id)} style={{ cursor: 'pointer' }}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ManageProducts;