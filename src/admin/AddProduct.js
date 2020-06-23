import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
// import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
    const { user, token } = isAuthenticated();

    const [values, setvalues] = useState({
        name: '',
        description: '',
        price: '',
        // list of all categories, we will pull all categories from the backend and then we will populate categories when we try to create a new product
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        productName: '',
        // redirectToProfile: false,
        formData: '',
        success: false,
    });

    // destructuring state variables
    const { name, 
            description, 
            price, 
            categories, 
            category, 
            shipping, 
            quantity, 
            loading, 
            error, 
            productName, 
            formData, 
            success } = values;

    //load categories and set form data
    const init = async () => {
        const data = await getCategories();
        if (data.error) {
            setvalues({ ...values, error: data.error });
        } else {
            setvalues({ ...values, categories: data.categories, formData: new FormData() });
            console.log(categories);
        }
    }

    // now, this time we are not sending json data to backend, instead we are going to send form data as we have photo field this time. So, to send form data to backend, we need to use form API( new FormData()) as below. Now, we have use useEffect hook, because it work as componentDidMount as well as componentDidUpdate. Here, though is behaves as componentDidMount(), so when our component mounts, we have basically FormData API created, and then when state updates, our FromData will get gradually key-value pairs, and once we fill the form there on Front-end, we have all those key-value pairs in our state variable 'formData' which we are going to send to our backend. So inshort, when the handleChange method runs, not only state variables update, but form data is also populated with state variable values. 
    useEffect(() => {
        init();
    }, []);

    const handleChange = (e) => {
        setvalues({ ...values, error: '', success: false })
        const { name } = e.target;
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        console.log(value);
        // setting the value of form data whenever state variable changes its value
        formData.set(name, value);
        setvalues({ ...values, [name]: value });
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        setvalues({ ...values, error: '', loading: true });
        const data = await createProduct(user._id, token, formData);
        if (data.error) {
            setvalues({ ...values, error: data.error });
        } else {
            setvalues({ ...values, name: '', description: '', photo: '', price: '', shipping: '', category: '', quantity: '', loading: false, productName: data.name, success: true })
        }
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4 className="mb-3">Upload Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" name="photo" accept="image/*" onChange={handleChange} />
                </label>
            </div>

            <div className="form-group">
                <lable className="text-muted">Name</lable>
                <input type="text" className="form-control" value={name} name="name" onChange={handleChange} />
            </div>

            <div className="form-group">
                <lable className="text-muted">Description</lable>
                <textarea className="form-control" value={description} name="description" onChange={handleChange} />
            </div>

            <div className="form-group">
                <lable className="text-muted">Price($)</lable>
                <input type="number" className="form-control" value={price} name="price" onChange={handleChange} />
            </div>

            <div className="form-group">
                <lable className="text-muted">Category</lable>
                <select className="form-control" onChange={handleChange} name="category" value={category}>
                    <option value="">Please select</option>
                    {categories && categories.map((category, index) => (
                        <option key={index} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <lable className="text-muted">Quantity</lable>
                <input type="number" className="form-control" value={quantity} name="quantity" onChange={handleChange} />
            </div>

            <div className="form-group">
                <lable className="text-muted">Shipping</lable>
                <select className="form-control" name="shipping" onChange={handleChange} value={shipping}>
                    <option value="">Please select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )


    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Your product {productName} is created!
        </div>
    );


    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add a new Product" description={`Hi ${user.name}, ready to add a new product?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
}

export default AddProduct;