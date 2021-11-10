// import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './SkincareProduct.scss';

function SkincareEditReview(props) {

    const [productData, setProductData] = useState(
        // provide default values so product keys are defined
        {
            id: 0,
            image: null,
            name: '',
            type: '',
            price: 0.0,
            size: '',
            review: '',
            isRecommended: false
        }
    )
    const [reviewComment, setReviewComment] = useState('');
    const [userRecommended, setUserRecommended] = useState(false);

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
                setProductData(
                    {
                        id, image, name, type, price, size, review, isRecommended: is_recommended
                    }
                )

            } catch (error) {
                console.log(error)
            }
        }

        getData();
    }, [])

    const handleReviewChange = (event) => {
        const { value } = event.target;
        setReviewComment(value);
    }

    const handleUserRecommended = (event) => {
        const { checked } = event.target;
        setUserRecommended(checked);
    }

    const handleSubmit = async () => {
        try {
            const body = {
                userId: props.user.id,
                productId: productData.id,
                reviewComment,
                userRecommended,
            }
            await axios.post('/api/skincare/comments', body);
            props.history.push(`/beauty/skincare/reviews/${productData.id}`)
        } catch (err) {
            if (err.isAxiosError) {
                alert(err.response.request.responseText);
            } else {
                alert(err);
            }
        }
    }

    const priceFormatter = new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

    // destructure to use in JSX of the return, below
    const { image, type, price, size } = productData;

    return (
        //TODO if no props.user.id send to Login
        <div className="skincare-product-edit">

            <h1>Edit Page</h1>
            <h1>{productData.name}</h1>
            <img src={image} alt={`skincare product: ${productData.name}`} className="product-image" />
            <h4>Type: {type}</h4>
            <h4>Price: {priceFormatter.format(price)}</h4>
            <h4>Size: {size}</h4>

            <h2>Add Your Review:</h2>
            <textarea onChange={handleReviewChange} rows="5" cols="80" required maxlength="500"></textarea>
            <input onChange={handleUserRecommended} type="checkbox" id="recommended" />
            <label for="recommended">Yes! I recommend this product</label>
            <button onClick={handleSubmit}>Submit</button>
            <Link to={`/beauty/skincare/reviews/${props.match.params.id}`} >
                <button>Cancel</button>
            </Link>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(SkincareEditReview);

