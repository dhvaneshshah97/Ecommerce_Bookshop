import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([]);

    function handleToggle(id) {
            // return the first index or -1
            const currentCategoryId = checked.indexOf(id);
            const newChecked = [...checked];
            // if currently checked was not already in checked state > push else pull
            if (currentCategoryId === -1) {
                newChecked.push(id);
            } else {
                newChecked.splice(currentCategoryId, 1);
            }
            // console.log(newChecked);
            setChecked(newChecked);
            handleFilters(newChecked, 'category');
    }

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input onChange={() => handleToggle(c._id)} type="checkbox" className="form-check-input" value={c._id}  />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));

}
export default Checkbox;