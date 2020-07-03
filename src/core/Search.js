import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { getProducts, getCategories, list } from './apiCore';
import Card from './Card';

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: 'All',
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
        e.preventDefault();
        searchData();
    }

    const searchData = async () => {
        // console.log(search, category);
        if (search || category) {
            const response = await list({ search: search || undefined, category: category });
            if (response.error) {
                console.log(response.error);
            } else {
                setData({ ...data, results: response, searched: true });
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, searched: false });
    }

    const searchForm = () => (
        <div className="container mb-4 " >
            <form onSubmit={searchSubmit} className="mx-auto" style={{width: '800px'}}>
                <span className="input-group-text">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <select className="btn mr-2" onChange={handleChange} name="category" style={{ paddingRight: '0.5px', verticalAlign: "center" }}>
                                <option value="All">All Categories</option>
                                {categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                            </select>
                        </div>
                        <input type="search" className="form-control" onChange={handleChange} name="search" placeholder="Search product by name" />
                    </div>
                    <div className="btn input-group-append" style={{ border: 'none' }}>
                        <div className="input-group-text" style={{ border: 'none' }} onClick={searchSubmit}><i className="fas fa-lg fa-search"></i></div>
                    </div>
                </span>
            </form>
        </div>
    );

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        } 
        if (searched && results.length < 1) {
            return `No products found`;
        }
    }

    const showBooks = (results = []) => (
        <div className="container-fluid mb-3">
            <h3 className="mt-4 mb-4">
                {searchMessage(searched, results)}
            </h3>
            <div className="row">
                {results.map((p, i) => (<Card key={i} product={p} />))}
            </div>
        </div>
    )

    return (
        <div className="row">
            {searchForm()}
            {showBooks(results)}
        </div>

    )
}

export default Search;