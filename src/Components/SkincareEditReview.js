// import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        review: {
            comment: '',
            isRecommended: false
        }
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

    const priceFormatter = new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

    // destructure to use in JSX of the return, below
    const { image, type, price, size, review, isRecommended } = productData.product;

    return (
        <div className="skincare-product-edit">

            <h1>Edit Page</h1>
            <h1>{productData.product.name}</h1>
            <img src={image} alt={`skincare product: ${productData.product.name}`} className="product-image" />
            <h4>Type: {type}</h4>
            <h4>Price: {priceFormatter.format(price)}</h4>
            <h4>Size: {size}</h4>

            <h2>Add Your Review:</h2>
            <textarea rows="5" cols="80" required maxlength="500"></textarea>
            <input type="checkbox" id="recommended" />
            <label for="recommended">Yes! I recommend this product</label>
            <button>Submit</button>
            <Link to={`/beauty/skincare/reviews/${props.match.params.id}`} >
                <button>Cancel</button>
            </Link>
            <section className="user-review-edit">

            </section>
        </div>
    );
}

export default SkincareEditReview;
