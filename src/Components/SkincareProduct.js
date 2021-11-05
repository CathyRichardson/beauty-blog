// import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function SkincareProduct(props) {

  const [product, setProduct] = useState([])

  // useEffect(async () => {
  //   try {
  //     // try getting all the products to show frontend is connecting to backend
  //     const { data } = await axios.get(`/api/skincare/products`);
  //     setProducts(data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])

  return (
    <div className="skincare-product">
        <h1>Skincare Product</h1>
        <h2>product id: {props.match.params.id}</h2>
    </div>


    // <div className="app">
    //   {/* just display the products list for now  */}
    //   <h1> Products List </h1>
    //   {products.map((item, index) => {
    //     return <p key={index}>{item.name}</p>
    //   })}
    // </div>


  );
}

export default SkincareProduct;
