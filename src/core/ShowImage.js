import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url, details= false }) => {
    // item is product itself, url - product keyword in browser's url
    
    const haveDetails = (details) => {
        if (details) {
            return {
                'margin-top':'50px',
                // 'margin-left':'80px',
                'border': '0.5px solid black'
            }
        }
    }

    return(
        <div className="product-img">
        <img 
            src={`${API}/${url}/photo/${item._id}`} 
            alt={item.name} 
            className='mb-5'
            style={haveDetails(details)}

        />
    </div>
    )
    
    }

export default ShowImage;