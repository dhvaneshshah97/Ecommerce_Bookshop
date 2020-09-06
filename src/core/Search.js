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
        if (category == "All" && search == '') {
            setData({ ...data, results: [] });
        } else {
            searchData();
        }

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
        <form onSubmit={searchSubmit} style={{ width: '700px' }} className="mx-auto" >
            {/* <span className="input-group-text" style={{ borderRadius: '0px', padding: '0px' }}> */}
                <span>
                <div className="input-group" >
                    <div className="input-group-prepend">
                        <select className="btn input-group-text " onChange={handleChange} name="category" style={{ padding: '0px' }} value={category}>
                            <option value="All">All Categories</option>
                            {categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                        </select>
                    </div>
                    <input type="search" className="form-control" onChange={handleChange} name="search" placeholder="Search product by name" style={{ padding: '0 0 0 10px' }} />
                    <div className="btn input-group-append" style={{ border: 'none', backgroundColor: '#ffc220' }}>
                        <div style={{ border: 'none' }} onClick={searchSubmit}><i className="fas fa-lg fa-search"></i></div>
                    </div>
                </div>

            </span>
        </form>
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
        <>
            <h2 className="mt-4 mb-4 col-sm-12">
                {searchMessage(searched, results)}
            </h2>
            {results.map((p, i) => (
                <div className="col-sm-12 col-md-3 mb-3" key={i}>
                    <Card product={p} />
                </div>
            ))}
        </>
    )

    return (
        <div className="container-fluid">
            <div className="row">
                {searchForm()}
            </div>
            <div className="row">
                {showBooks(results)}
            </div>
        </div>
    )
}

export default Search;