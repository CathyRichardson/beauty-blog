import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise-middleware';
// import productReducer from './productReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    // product: productReducer,
    user: userReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
