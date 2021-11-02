import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../App.scss';

function Nav() {

    return (
        <nav>
            <Link to='/beauty' className="nav-link">Home</Link>
            <Link to='/beauty/skincare' className="nav-link" >Skincare</Link>
            <Link to='/beauty/makeup' className="nav-link">Makeup</Link>
            <Link to='/beauty/haircare' className="nav-link" >Haircare</Link>
        </nav>
    );
}

export default Nav;
