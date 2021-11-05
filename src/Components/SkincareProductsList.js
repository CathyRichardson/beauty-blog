import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';
import './SkincareProductList.scss'

function SkincareProductsList() {

    const [products, setProducts] = useState([])

    useEffect(() => {

        const getData = async () => {
            try {
                // try getting all the products to show frontend is connecting to backend
                // const { data } = await axios.get(`/api/skincare/products`);
                // setProducts(data);
                const result = await axios.get(`/api/skincare/products`);
                setProducts(result.data);
            } catch (error) {
                console.log(error)
            }
        }

        getData();
    }, [])

    return (

        <main className="skincare-product-list">
            <h1>Skincare Products List</h1>
            {/* just display the products list for now  */}
            <section className="product-list">
                {products.map((item) => {
                    return (
                        <Link to={`/beauty/skincare/reviews/${item.id}`} className="product" key={item.id}>
                            <h2>{item.type}</h2>
                            <h3>{item.name}</h3>
                            <img src={item.image} alt="skincare product" className="product-image" />
                        </Link>)
                })}
            </section>
        </main>


    );
}

export default SkincareProductsList;
