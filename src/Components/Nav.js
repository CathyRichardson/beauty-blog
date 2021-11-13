import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

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
