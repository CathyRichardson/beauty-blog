import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './userReducer';
import recommendedReducer from './recommendedReducer';

const rootReducer = combineReducers({
    recommended: recommendedReducer,
    user: userReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
