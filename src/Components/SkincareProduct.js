// import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function SkincareProduct(props) {

  const [productData, setProductData] = useState({
    // provide default values so product keys are defined
    product: {
      id: 0,
      image: null,
      name: '',
      type: '',
      price: 0.0,
      size: '',
      review: '',
      isRecommended: false
    },
    comments: []
  })

  useEffect(() => {

    const getData = async () => {
      try {
        // get the product
        const currProduct = await axios.get(`/api/skincare/products/${props.match.params.id}`);

        // get the comments
        const currComments = await axios.get(`/api/skincare/comments/${props.match.params.id}`);

        // save to component state
        const { id, image, name, type, price, size, review, is_recommended } = currProduct.data;
        setProductData({
          product: {
            id, image, name, type, price, size, review, isRecommended: is_recommended //
          },
          comments: currComments.data
        })

      } catch (error) {
        console.log(error)
      }
    }

    getData();
  }, [])

  // destructure to use in JSX of the return, below
  const { image, type, price, size, review, isRecommended } = productData.product;

  return (
    <div className="skincare-product">

      <h1>{productData.product.name}</h1>
      <img src={image} alt="skincare product" className="product-image" />
      <h4>Type: {type}</h4>
      <h4>Price: {price}</h4>
      <h4>Size: {size}</h4>
      <h4>Review: {review}</h4>
      <h4>Recommended: {isRecommended ? 'yes' : 'no'}</h4>
      <h4>first comment's user: {productData.comments[0]?.user}</h4>

      <h4>comments length: {productData.comments.length}</h4>
    </div>
  );
}

export default SkincareProduct;
