// import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function SkincareProduct(props) {

  // const [product, setProduct] = useState({});
  // const [comments, setComments] = useState([])
  const [productData, setProductData] = useState({ product: {}, comments: [] })

  useEffect(() => {

    const getData = async () => {
      try {
        // get the product
        const currProduct = await axios.get(`/api/skincare/products/${props.match.params.id}`);
        // setProduct(currProduct.data);
        // get the comments
        const currComments = await axios.get(`/api/skincare/comments/${props.match.params.id}`);
        //  setComments(currComments.data);
        setProductData({
          product: currProduct.data,
          comments: currComments.data
        })
      } catch (error) {
        console.log(error)
      }
    }

    getData();
  }, [])

  return (
    <div className="skincare-product">
      <h1>Skincare Product</h1>
      <h2>product: {productData.product.name}</h2>
      <h3>first comment's user: {productData.comments[0]?.user}</h3>
      {/* <h3>first comment's user: {productData.comments[0].is_recommended}</h3> */}
      <h3>comments length: {productData.comments.length}</h3>
    </div>
  );
}

export default SkincareProduct;
