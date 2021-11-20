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


    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        if (name === "isRecommended") {
            setProductData({ ...productData, isRecommended: checked });
        } else {
            setProductData({ ...productData, [name]: value });
        }
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const { image, name, type, price, size, review, isRecommended } = productData;
            const body = { image, name, type, price, size, review, isRecommended };
            // update the product
            await axios.put(`/api/skincare/products/${props.match.params.id}`, body);
            // return to skincare products list page
            props.history.push('/beauty/skincare');
        } catch (err) {
            if (err.isAxiosError) {
                console.log(err.response.request.responseText);
            } else {
                console.log(err);
            }
        }
    }

    const priceFormatter = new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

    // destructure to use in JSX of the return, below
    const { image, name, type, price, size, review, isRecommended } = productData;

    return (
        <div className="skincare-product">

            <h1>Admin Edit Product</h1>
            {!props.user.id || !props.user.isAdmin ?
                <p>Please Sign In as an Admin</p>
                :
                <form onSubmit={handleSubmit} className="admin-edit-form">
                    <img src={image} alt={`skincare product: ${name}`} className="product-image" />
                    <label>
                        Product Image:
                        <input type="url" name="image" value={image} required onChange={handleChange} />
                    </label>
                    <label>
                        Product Name:
                        <input type="text" name="name" value={name} required onChange={handleChange} />
                    </label>

                    <label>
                        Product Type:
                        <input type="text" name="type" value={type} required onChange={handleChange} />
                    </label>

                    <label>
                        Product Price ($):
                        <input type="number" min="0" step="0.01" name="price" value={price} required onChange={handleChange} />
                    </label>
                    <label>
                        Product Size:
                        <input type="text" name="size" value={size} required onChange={handleChange} />
                    </label>
                    <label>
                        Product Review:
                        <textarea name="review" value={review} rows="5" cols="80" maxlength="500" required onChange={handleChange} ></textarea>
                    </label>
                    <label>
                        <input type="checkbox" name="isRecommended" checked={isRecommended} onChange={handleChange} />
                        Yes! I recommend this product
                    </label>
                    <Link to={`/beauty/skincare/reviews/${props.match.params.id}`} >
                        <button>Cancel</button>
                    </Link>
                    <input type="submit" value="Submit" className="admin-edit-submit" />
                </form>
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