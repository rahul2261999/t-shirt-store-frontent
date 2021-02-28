import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { getAllCategories,deleteCategories } from './helper/adminapicall';

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);

    const {user, token} = isAuthenticated()

    const preload = () => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                setCategories(data)
            })
    }

    useEffect(() => {
        preload()
    },[])

    const deleteCate = categoryId => {
        deleteCategories(categoryId, user._id, token)
            .then(res => {
                if (res.error) {
                    console.log(res.error);
                }
                preload()
            })
    }



    return (
        <Base title="Welcome admin" description="Manage Categories here">
            <h2 className="mb-4">All Categories:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {categories.length} Categories</h2>

                    {categories.map((cate) => {
                        return (
                            <div key={cate._id} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{cate.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/category/update/${cate._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => { deleteCate(cate._id) }} className="btn btn-danger"> Delete
                                 </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>

    )
}

export default ManageCategories
