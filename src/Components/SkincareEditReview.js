// import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import './SkincareProduct.scss';

function SkincareEditReview(props) {

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
                  currProduct = result.data;
                }
            
                // save to component state
                const { id, image, name, type, price, size, review, is_recommended } = currProduct;
                setProductData({
                    product: {
                        id, image, name, type, price, size, review, isRecommended: is_recommended
                    },
                    // comments: currComments.data
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

            <h1>Edit Page</h1>
            <h1>{productData.product.name}</h1>
            <img src={image} alt={`skincare product: ${productData.product.name}`} className="product-image" />
            <h4>Type: {type}</h4>
            <h4>Price: {price}</h4>
            <h4>Size: {size}</h4>
            <h4>Review: {review}</h4>
            <h4>Recommended: {isRecommended ? 'yes' : 'no'}</h4>

            <h2>Reviews:</h2>
            <button>Submit</button>
            {/* <section className="product-reviews">
                {productData.comments.map((item) => {
                    const { user, review, is_recommended } = item;
                    return (
                        <div className="product-reviews-indiv">
                            <h2>User Name: {user}</h2>
                            <p>{review}</p>
                            <h3>Recommended: {is_recommended ? 'yes' : 'no'}</h3>
                        </div>)
                })}
            </section> */}
        </div>
    );
}

export default SkincareEditReview;
