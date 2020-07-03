import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';
import Search from './Search';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ffff00' }
    } else {
        return { color: '#ffffff' }
    }
}

const Menu = ({ history }) => {
    return (
        <div className="nav nav-tabs bg-primary ">
            <ul className="nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Shop</Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (<li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                </li>)}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (<li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                </li>)}

            </ul>
            <ul className="nav ml-auto">
                {/* It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false. Therefore, if the condition is true, the element right after && will appear in the output. If it is false, React will ignore and skip it. */}
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


    )
}

export default withRouter(Menu);