import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './SkincareProduct.scss';

function AdminEditProduct(props) {

    const [productData, setProductData] = useState({
        // provide default values so product keys are defined
        id: 0,
        image: null,
        name: '',
        type: '',
        price: 0.0,
        size: '',
        review: '',
        isRecommended: false
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

                // save to component state
                setProductData(currProduct);
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

    const priceFormatter = new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

    // destructure to use in JSX of the return, below
    const { id, image, type, price, size, review, isRecommended } = productData;

    return (
        <div className="skincare-product">

            <h1>Admin Edit Product</h1>
            {!props.user.id || !props.user.isAdmin ?
                <p>Please Sign In as an Admin</p>
                :
                <div>
                    <h2>{productData.name}</h2>
                    <img src={image} alt={`skincare product: ${productData.name}`} className="product-image" />
                    <h4>Type: {type}</h4>
                    <h4>Price: {priceFormatter.format(price)}</h4>
                    <h4>Size: {size}</h4>
                    <h4>Review: {review}</h4>
                    <h4>Recommended: {isRecommended ? 'yes' : 'no'}</h4>
                    <button>Submit</button>
                </div>
            }
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(AdminEditProduct);