// import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';


function Nav() {

    return (
        <div className='navLinks'>
            <Link to='/beauty'>Home</Link>
            <Link to='/beauty/skincare'>Skincare</Link>
            <Link to='/beauty/makeup'>Makeup</Link>
            <Link to='/beauty/haircare'>Haircare</Link>           
        </div>
    );
}

export default Nav;
