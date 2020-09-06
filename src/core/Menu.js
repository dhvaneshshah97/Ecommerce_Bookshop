import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';
import { itemTotal } from './cartHelpers';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: 'yellow' }
    } else {
        return { color: 'white' }
    }
}

const Menu = ({ history }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light nav-tabs bg-primary">
            <Link className="navbar-brand" to="/" style={{ color: 'yellow' }}>eCommerce Book-Shop</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/cart')} to="/cart">Cart {/*<i class="fas fa-shopping-cart"></i>*/} <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
                    </li>
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (<li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                    </li>)}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (<li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    </li>)}
                </ul>
                <ul className="navbar-nav ml-auto">
                {
                        !isAuthenticated() && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>Signup</Link>
                                </li>
                            </>)
                    }
                    {
                        isAuthenticated() && (
                            <li className="nav-item">
                                <span className="nav-link" onClick={() => signout(history)} style={{ cursor: 'pointer', color: 'white' }}>Sign out</span>
                            </li>)
                    }
                </ul>

            </div>
        </nav>


    )
}

export default withRouter(Menu);