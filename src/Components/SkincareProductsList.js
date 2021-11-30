import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveRecommendedData, clearRecommendedData } from '../redux/recommendedReducer';
import './SkincareProductsList.scss'
import RecommendedChart from './RecommendedChart';

function SkincareProductsList(props) {

    const [products, setProducts] = useState([])

    useEffect(() => {

        const getData = async () => {
            try {
                const result = await axios.get(`/api/skincare/products`);
                setProducts(productsFromDb(result.data));
                const resultRecommended = await axios.get(`/api/skincare/products/all/recommended`);
                props.saveRecommendedData(resultRecommended.data);
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

    // convert database column names to js names
    const productsFromDb = (dbProducts) => {
        return dbProducts.map(({ id, image, name, type, price, size, review, is_recommended }) => {
            return {
                id,
                image,
                name,
                type,
                price,
                size,
                review,
                isRecommended: is_recommended
            }
        })
    }

    return (

        <main className="skincare-product-list">
            <h1>Skincare Products List</h1>
            {props.user.id && props.user.isAdmin ?
                //id 0 means add item  
                <Link to={`/beauty/skincare/admin/0`}>
                    <button>Admin Add Product</button>
                </Link>
                : null}
            <section className="product-list">
                {products.map((item) => {
                    const { id, type, name, image } = item;
                    return (
                        <Link
                            to={{
                                pathname: `/beauty/skincare/reviews/${id}`,
                                state: item,
                            }}
                            className="product"
                            key={id}
                        >
                            <h2>{name}</h2>
                            <h3>{type}</h3>
                            <img src={image} alt={`skincare product: ${name}`} className="product-image" />
                        </Link>)
                })}
            </section>
            <RecommendedChart />
        </main>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    saveRecommendedData,
    clearRecommendedData
}


export default connect(mapStateToProps, mapDispatchToProps)(SkincareProductsList);

