import React, { useState } from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import { createCategory } from './helper/adminapicall'

const AddCategory = () => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const { user, token } = isAuthenticated()


    const backBtn = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home </Link>
        </div>

    )

    const handleChange = (event) => {
        setError("");
        setName(event.target.value)
    }
    const onSubmit = (event) => {
        event.preventDefault()
        setError("");
        setSuccess(false)
        createCategory(user._id, token, { name }).then(res => {
            if (res.error) {
                setError(true)
            }
            else {
                setError("");
                setSuccess(true)
                setName("")
            }
        })
    }

    const SuccessMes = () => {
        if (success) {
            return <h4 className="text-success">Category Created Successfully</h4>
        }

    }
    const ErrorMsg = () => {
        if (error) {
            return <h4 className="text-success">Failed To Created Category</h4>
        }

    }


    const categoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className="lead">Enter the category</p>
                    <input
                        type="text"
                        className="form-control my-3"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                        required
                        placeholder="for ex. Summer" />
                </div>
                <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
            </form>
        )
    }




    return (
        <Base title="Create a category here"
            description="Add new Category for new tshirt"
            className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md2">
                    {ErrorMsg()}
                    {SuccessMes()}
                    {categoryForm()}
                    {backBtn()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
