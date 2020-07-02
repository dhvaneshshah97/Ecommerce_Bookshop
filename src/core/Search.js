import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { getProducts, getCategories } from './apiCore';
import Card from './Card';

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false,
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = async () => {
        const categoryData = await getCategories();
        console.log(categoryData);
        if (categoryData.error) {
            console.log(categoryData.error);
        } else {
            setData({ ...data, categories: categoryData.categories });
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const searchSubmit = (e) => {
        // e.preventDefault();
    }
    const handleChange = () => {
        //
    }

    return (
        <div className="container mb-4">
            <form onSubmit={searchSubmit}>
                <span className="input-group-text">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <select className="btn mr-2" onChange={handleChange} name="category" style={{paddingRight: '0.5px', verticalAlign:"center"}}>
                                <option value="All">All Categories</option>
                                {categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                            </select>
                        </div>
                        <input type="search" className="form-control" onChange={handleChange} name="search" placeholder="Search product by name" />
                    </div>
                    <div className="btn input-group-append" style={{ border: 'none' }}>
                        <div className="input-group-text" style={{ border: 'none' }}><i className="fas fa-lg fa-search"></i></div>
                    </div>
                </span>
            </form>
        </div>

    )
}

export default Search;