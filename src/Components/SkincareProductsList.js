// import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function SkincareProductsList() {

    const [products, setProducts] = useState([])

    useEffect(async () => {
        try {
            // try getting all the products to show frontend is connecting to backend
            const { data } = await axios.get(`/api/skincare/products`);
            setProducts(data);
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (

        <div className="SkincareProduct">
            <h1>Skincare Products List</h1>
            {/* just display the products list for now  */}
            {products.map((item, index) => {
                return <p key={index}>{item.name}, ${item.price} {item.size}</p>
            })}
        </div>


    );
}

export default SkincareProductsList;
