import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './SkincareProduct.scss';

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
        let currProduct
        if (props.location.state) {
          currProduct = props.location.state;
        } else {
          const result = await axios.get(`/api/skincare/products/${props.match.params.id}`);
          const { id, image, name, type, price, size, review, is_recommended } = result.data;
          currProduct = {
            id, image, name, type, price, size, review, isRecommended: is_recommended
          };
        }

        // get the comments
        const currComments = await axios.get(`/api/skincare/comments/${props.match.params.id}`);

        // save to component state
        setProductData({
          product: currProduct,
          comments: commentsFromDbComments(currComments.data)
        })

      } catch (err) {
        if (err.isAxiosError) {
          console.log(err.response.request.responseText);
        } else {
          console.log(err);
        }
      }
    }

    getData();
  }, [props.location.state, props.match.params.id])

  const getComments = async () => {
    try {
      // get the comments
      const currComments = await axios.get(`/api/skincare/comments/${props.match.params.id}`);

      // save to component state
      setProductData({
        ...productData,
        comments: commentsFromDbComments(currComments.data)
      })

    } catch (err) {
      if (err.isAxiosError) {
        console.log(err.response.request.responseText);
      } else {
        console.log(err);
      }
    }
  }

  const handleDeleteReview = async (id) => {
    try {
      if (props.user.isAdmin) {
        await axios.delete(`/api/skincare/comments/${id}/admin`);
      } else {
        await axios.delete(`/api/skincare/comments/${id}`);
      }
      getComments();
    } catch (err) {
      if (err.isAxiosError) {
        alert(err.response.request.responseText);
      } else {
        alert(err);
      }
    }
  }


  // convert database column names to js names
  const commentsFromDbComments = (dbComments) => {
    return dbComments.map(({ id, user_id, user, review, is_recommended }) => {
      return {
        id,
        userId: user_id,
        user,
        review,
        isRecommended: is_recommended
      }
    })
  }

  const priceFormatter = new Intl.NumberFormat('en-US',
    { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

  // destructure to use in JSX of the return, below
  const { id, image, type, price, size, review, isRecommended } = productData.product;

  return (
    <div className="skincare-product">

      <h1>{productData.product.name}</h1>
      {props.user.id && props.user.isAdmin ?  
      <Link
        to={{
          pathname: `/beauty/skincare/admin/${id}`,
          state: productData.product,
        }}
      >
        <button>Admin Edit</button>
      </Link> 
      : null }
     
      <img src={image} alt={`skincare product: ${productData.product.name}`} className="product-image" />
      <h4>Type: {type}</h4>
      <h4>Price: {priceFormatter.format(price)}</h4>
      <h4>Size: {size}</h4>
      <h4>Review: {review}</h4>
      <h4>Recommended: {isRecommended ? 'yes' : 'no'}</h4>

      <h2>Reviews:</h2>
      <Link
        to={{
          pathname: `/beauty/skincare/reviews/edit/${id}`,
          state: productData.product,
        }}
        className="product"
        key={id}
      >
        <button>Add a Review</button>
      </Link>
      <section className="product-reviews">
        {productData.comments.map((comment) => {
          const { userId, user, review, isRecommended } = comment;
          return (
            <div className="product-reviews-indiv" key={comment.id}>
              <h2>User Name: {user}</h2>
              <p>{review}</p>
              <h3>Recommended: {isRecommended ? 'yes' : 'no'}</h3>
              {props.user.id && (props.user.id === userId || props.user.isAdmin) ?
                <button onClick={() => handleDeleteReview(comment.id)}>Delete</button> : null
              }
            </div>)
        })}
      </section>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(SkincareProduct);
