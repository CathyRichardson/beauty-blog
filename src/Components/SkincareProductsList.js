// import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './SkincareProductList.scss'

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

        <main className="skincare-product-list">
            <h1>Skincare Products List</h1>
            {/* just display the products list for now  */}
            <section className="product-list">
                {products.map((item, index) => {
                    return (
                        <div className="product" key={index}>
                            <h2>{item.type}</h2>
                            <h3>{item.name}</h3>
                            <img src={item.image} alt="skincare product" className="product-image" />
                        </div>)
                })}
            </section>
        </main>


    );
}

export default SkincareProductsList;
