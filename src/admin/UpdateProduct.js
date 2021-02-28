import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Base from '../core/Base'
import { getAllCategories, getProduct, updateProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper/index'

const UpdateProduct = ({ match }) => {
    const { user, token } = isAuthenticated()
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getRedirected: false,
        formData: ""
    })

    const {
        name,
        description,
        price,
        stock,
        photo,
        categories,
        category,
        loading,
        error,
        createdProduct,
        getRedirected,
        formData } = values


    // get categories
    const preload = (productId) => {
        getProduct(productId)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        category: data.category,
                        stock: data.stock,
                        formData: new FormData(),
                    })
                    preloadCategories()
                }
            })
    }

    useEffect(() => {
        preload(match.params.productId)
    }, [])


    const preloadCategories = () => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error
                    })
                }
                else {
                    setValues({
                        categories: data, formData: new FormData()
                    })
                }
            })
    }

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            error: "",
            loading: true
        })

        updateProduct(match.params.productId, user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        photo: "",
                        categories: "",
                        stock: "",
                        loading: true,
                        createdProduct: data.product.name,
                        getRedirected: true,
                    })


                }
            })
            .catch(err => console.log(err))
    }

    const performRedirect = () => {
        if (getRedirected) {
            return <Redirect to="/admin/dashboard" />
        }
    }

    const successMsg = () => (

        <div className="alert alert-success mt-3"
            style={{ display: createdProduct ? "" : "none" }}>
            <h3 className="text-white">{createdProduct} updated successfully</h3>
        </div>
    )

    const errorMsg = () => (
        <div className="alert alert-success mt-3"
            style={{ display: error ? "" : "none" }}>
            <h3 className="text-white">Not able to update product</h3>
        </div>
    )


    const createProductForm = () => (
        <form >
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn w-100 btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories && categories.map((cate, index) => (
                        <option key={index} value={cate._id}>{cate.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-2">
                Update Product
          </button>
        </form>
    );




    return (
        <Base title="Add Product"
            description="Welcome to product Creation"
            className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                Admin Home
            </Link>

            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMsg()}
                    {errorMsg()}
                    {createProductForm()}
                    {performRedirect()}
                </div>
            </div>
        </Base>
    )
}

export default UpdateProduct
