import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { Link, Redirect } from 'react-router-dom'
import { getCategory, updateCategory } from './helper/adminapicall'

const UpdateCategory = ({ match }) => {

    const [name, setName] = useState("")
    const [isredirect, setRedirect] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const { user, token } = isAuthenticated()

    const preload = (categoryId) => {
        getCategory(categoryId)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                setName(data.name)

            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        preload(match.params.categoryId)
    }, [])

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
        updateCategory(match.params.categoryId, user._id, token, { name })
            .then(res => {
                if (res.error) {
                    setError(true)
                }
                else {
                    setError("");
                    setSuccess(true)
                    setName("")
                    setRedirect(true)
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
                    {isredirect?<Redirect to="/admin/categories/" />:null}
                </div>
            </div>
        </Base>
    )
}

export default UpdateCategory
