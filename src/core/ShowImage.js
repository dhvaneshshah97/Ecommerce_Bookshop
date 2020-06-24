import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url }) => (
    // item is product itself, url - product keyword in browser's url
    <div className="product-img text-center">
        <img 
            src={`${API}/${url}/photo/${item._id}`} 
            alt={item.name} 
            className="mb-5 mx-auto" 
            style={{ maxHeight: '100%', maxWidth: '100%' }} 
        />
    </div>
)

export default ShowImage;