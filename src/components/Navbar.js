import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function Navbar(props) {
    const { isLoggedIn } = props;
    return (
        <div className="header">
            <div className="logo"></div>
            <div className="header-links">

            </div>
        </div>
    )
}


// <Link to={ROUTES.LANDING} className="link">Home</Link>
//     <Link to={ROUTES.ABOUT} className="link">About</Link>
//     <Link to={ROUTES.ACCOUNT} className="link">Contact</Link>
//     <Link to={isLoggedIn ? ROUTES.SIGN_IN : ROUTES.SIGN_OUT} className="link">{isLoggedIn ? 'Sign Out' : 'Sign In'}</Link>