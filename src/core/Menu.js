import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#FF9900' }
    } else {
        return { color: '#ffffff' }
    }
}

const Menu = ({ history }) => {
    return (
        <>
            <ul className="nav nav-tabs bg-primary ">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                </li>
                {/* It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false. Therefore, if the condition is true, the element right after && will appear in the output. If it is false, React will ignore and skip it. */}
                {!isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>Signup</Link>
                        </li>
                    </>)
                }
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => signout(history)} style={{ cursor: 'pointer', color: 'white' }}>Sign out</span>
                    </li>)
                }

            </ul>
        </>
    )
}

export default withRouter(Menu);