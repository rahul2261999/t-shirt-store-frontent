import React, { Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper/index'
import { useHistory } from 'react-router'
const Navigation = () => {
    const history = useHistory()

    return (
        <div>
            <ul className="nav nav-tabs bg">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/" exact>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/cart">Cart</NavLink>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user/dashboard">User Dashboard</NavLink>

                    </li>
                )}
                 {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/dashboard">Admin Dashboard</NavLink>

                    </li>
                )}

                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signin">Sign In</NavLink>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span className="nav-link text-warning"
                            onClick={() => {
                                signout(() => {
                                    history.push('/')
                                })
                            }}>
                            Sign Out
                        </span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Navigation)
