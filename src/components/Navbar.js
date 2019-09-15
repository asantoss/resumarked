import React from 'react'

export default function Navbar(props) {
    const { isLoggedIn } = props
    return (
        <div className="header">
            <div className="logo"></div>
            <div className="header-links">
                <div className="link">Home</div>
                <div className="link">About</div>
                <div className="link">Contact</div>
                <div className="link">{isLoggedIn ? 'Sign Out' : 'Sign In'}</div>
            </div>
        </div>
    )
}
