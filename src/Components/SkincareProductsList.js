import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './SkincareProductList.scss'

function SkincareProductsList() {

    const [products, setProducts] = useState([])

    useEffect(() => {

        const getData = async () => {
            try {
                const result = await axios.get(`/api/skincare/products`);
                setProducts(productsFromDb(result.data));
            } catch (error) {
                console.log(error)
            }
        }

        getData();
    }, [])

      // convert database column names to js names
  const productsFromDb = (dbProducts) => {
    return dbProducts.map(({ id, image, name, type, price, size, review, is_recommended }) => {
      return {
        id, 
        image, 
        name, 
        type, 
        price, 
        size, 
        review, 
        isRecommended: is_recommended
      }
    })
  }

    return (

        <main className="skincare-product-list">
            <h1>Skincare Products List</h1>
            {/* just display the products list for now  */}
            <section className="product-list">
                {products.map((item) => {
                    const { id, type, name, image } = item;
                    return (
                        <Link
                            to={{
                                pathname: `/beauty/skincare/reviews/${id}`,
                                state: item,
                            }}
                            className="product"
                            key={id}
                        >
                            <h2>{name}</h2>
                            <h3>{type}</h3>
                            <img src={image} alt={`skincare product: ${name}`} className="product-image" />
                        </Link>)
                })}
            </section>
        </main>


    );
}

export default SkincareProductsList;
