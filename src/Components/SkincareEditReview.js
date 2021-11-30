import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './SkincareEditReview.scss';

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
        <div className="skincare-product-edit">
            <h1>Add Product Review</h1>
            {!props.user.id ?
                <p >Please Sign In</p>
                :
                <main >
                    <section className="product-edit-info">
                        <div>
                            <img src={image} alt={`skincare product: ${productData.name}`} />
                        </div>
                        <div>
                            <h4>{productData.name}</h4>
                            <h4>Type: {type}</h4>
                            <h4>Price: {priceFormatter.format(price)}</h4>
                            <h4>Size: {size}</h4>
                        </div>
                    </section>
                    <section className="add-review-section">
                        <h2>Add Your Review:</h2>
                        <textarea onChange={handleReviewChange} rows="5" cols="80" required maxlength="500">
                        </textarea>
                        <label >
                            <input onChange={handleUserRecommended} type="checkbox" />
                            Yes! I recommend this product
                        </label>
                        <div className="review-buttons">
                            <button onClick={handleSubmit}>Submit</button>
                            <Link to={`/beauty/skincare/reviews/${props.match.params.id}`} >
                                <button>Cancel</button>
                            </Link>
                        </div>
                    </section>
                </main>}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(SkincareEditReview);

