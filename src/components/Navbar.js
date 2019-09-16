import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function Navbar(props) {
    const { isLoggedIn } = props;
    return (
        <div className="header">
            <div className="logo"></div>
            <div className="header-links">
                <Link to={ROUTES.LANDING} className="link">Home</Link>
                <Link to={ROUTES.ABOUT} className="link">About</Link>
                <Link to={ROUTES.WRITER} className="link">Editor</Link>
                <Link to={isLoggedIn ? ROUTES.SIGN_IN : ROUTES.SIGN_OUT} className="link">{isLoggedIn ? 'Sign Out' : 'Sign In'}</Link>
                <Link to={ROUTES.SIGN_UP} styles={isLoggedIn && 'display: none'} className="link">Sign Up</Link>
            </div>
        </div>
    )
}
