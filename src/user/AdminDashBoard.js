import React from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { Link } from "react-router-dom"


const AdminDashBoard = () => {

    const { user: { name, email, role } } = isAuthenticated()

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white"></h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success"> Create Category </Link>
                        <Link to="/admin/create/product" className="nav-link text-success"> Create Product </Link>
                        <Link to="/admin/products" className="nav-link text-success"> Manage Products </Link>
                        <Link to="/admin/orders" className="nav-link text-success"> Manage Orders </Link>

                    </li>
                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        
    }


    return (
        <Base title="Admin DashBoard" description="Manage Your All Product Here" className="conatiner bg-success p-4">
            <div className="row">
                <div className="col-3"> {adminLeftSide()}</div>
                <div className="col-9"> {adminRightSide()}</div>
            </div>


        </Base>
    )
}

export default AdminDashBoard