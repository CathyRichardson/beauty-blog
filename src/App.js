import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [products, setProducts] = useState([])

  useEffect(async () => {
    try {
      // try getting all the products to show frontend is connecting to backend
      const { data } = await axios.get(`/api/skincare/products`);
      setProducts(data);
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="App">
      {/* just display the products list for now  */}
      <h1> Products List </h1>
      {products.map((item, index) => {
        return <p key={index}>{item.name}</p>
      })}
    </div>
  );
}

export default App;
