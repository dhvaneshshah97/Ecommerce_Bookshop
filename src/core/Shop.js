import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import Card from './Card';
import { getCategories } from './apiCore';
import Checkbox from './Checkbox';
import { prices } from './fixedPrices';
import RadioBox from './RadioBox';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: [], 
        }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    const init = async () => {
        const data = await getCategories();
        if (data.error) {
            setCategories(data.error);
        } else {
            setCategories(data.categories);
        }
    }

    useEffect(() => {
        init();
    }, []);

    // two aarguments: 1. filters: expects array of category-IDs 2. filterBy: filter by price or filter by category 
    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        if (filterBy === "price") {
            let pricevalues = handlePrice(filters);
            newFilters.filters[filterBy] = pricevalues;
        }
        setMyFilters(newFilters);
    }

    // fetch array of prices from fixedPrice
    const handlePrice = (value) => {
        const data = prices;
        let array = [];

        for(let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array;
    }

    return (
        <>
            <Layout title="Shop Page" description="Search and find books of your choice" className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <h4>Filter by categories</h4>
                        <ul>
                            <Checkbox categories={categories} handleFilters={handleFilters} />
                        </ul>
                        <h4>Filter by price range</h4>
                        <div>
                            <RadioBox prices={prices} handleFilters={handleFilters} />
                        </div>

                    </div>
                    <div className="col-4">
                        {JSON.stringify(myFilters)}
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Shop;
