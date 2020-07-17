import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
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
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [size, setSize] = useState(0);

    const loadFilteredResults = async (newFilters) => {
        // console.log(newFilters);
        const data = await getFilteredProducts(skip, limit, newFilters);
        if (data.error) {
            setError(data.error)
        } else {
            setFilteredResults(data.data);
            setSize(data.size);
            setSkip(0);
        }
    }

    const loadMore = async () => {
        // below line will skip first 6 or the 6 products that were being displayed.and will fetch next six(limit) products and display it.
        let toSkip = skip + limit;
        const data = await getFilteredProducts(toSkip, limit, myFilters.filters);
        if (data.error) {
            setError(data.error)
        } else {
            setFilteredResults([...filteredResults, ...data.data]); // ...filteredResults of earlier + new results fetched by load more btn 
            console.log(data.size)
            setSize(data.size);
            setSkip(toSkip);
        }
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5" style={{border:'0.7px solid #8000ff'}}>Load More</button>
            )
        )
    }

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
        loadFilteredResults(myFilters.filters);
        // console.log(filteredResults);

    }, []);

    // two arguments: 1. filters: expects array of category-IDs 2. filterBy: filter by price or filter by category 
    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let pricevalues = handlePrice(filters);
            newFilters.filters[filterBy] = pricevalues;
        }
        setMyFilters(newFilters);
        loadFilteredResults(myFilters.filters);
    }

    // fetch array of prices from fixedPrice
    const handlePrice = (value) => {
        const data = prices;
        let array = [];

        for (let key in data) {
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
                    <div className="col-3">
                        <h4>Filter by categories</h4>
                        <div className="ml-2">
                            <ul>
                                <Checkbox categories={categories} handleFilters={handleFilters} />
                            </ul>
                            <h4>Filter by price range</h4>
                        </div>
                        <div>
                            <RadioBox prices={prices} handleFilters={handleFilters} />
                        </div>

                    </div>
                    <div className="col-9">
                        <h2 className="mb-4">Products</h2>
                        <div className="row">
                            {filteredResults.map((product, i) => (
                                <div key={i} className="col-4 mb-3">
                                    <Card key={i} product={product} />
                                </div>
                            ))}
                        </div>
                        <hr />
                        {loadMoreButton()}
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Shop;
