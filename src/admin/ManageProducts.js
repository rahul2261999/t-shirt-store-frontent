import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { deleteProduct, getAllProducts } from './helper/adminapicall'


const ManageProducts = () => {

    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated()

    const preload = () => {
        getAllProducts()
            .then(res => {
                if (res.error) {
                    console.log(res.error);
                } else {
                    setProducts(res)
                }
            })
            
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteProd = productId => {
        deleteProduct(productId, user._id, token)
            .then(res => {
                if (res.error) {
                    console.log(res.error);
                }
                preload()
            })
    }





    return (
        <Base title="Welcome admin" description="Manage products here">
            <h2 className="mb-4">All products:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {products.length} Products</h2>

                    {products.map((prod, index) => {
                        return (
                            <div key={prod._id} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{prod.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/product/update/${prod._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => { deleteProd(prod._id) }} className="btn btn-danger"> Delete
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

export default ManageProducts
