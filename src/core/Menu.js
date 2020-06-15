import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout } from '../auth/index';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#FF9900' }
    } else {
        return { color: '#ffffff' }
    }
}

const Menu = ({ history }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-primary ">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>Signup</Link>
                </li>
                <li className="nav-item">
                    <span className="nav-link" onClick={() => signout(history)} style={{cursor:'pointer', color:'white'}}>Sign out</span>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Menu);