import React, { useState } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'


const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, email, password, error, success } = values

    const formhandleChange = name => event => {
        setValues({
            ...values, error: false,
            [name]: event.target.value
        })
    }

    const onSubmitHandler = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
            .catch(() => console.log("Error in signup"))
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group py-2">
                            <label className="text-light">Name</label>
                            <input className="form-control" onChange={formhandleChange("name")} type="text" value={name} />
                        </div>
                        <div className="form-group py-2">
                            <label className="text-light">E-mail</label>
                            <input className="form-control" onChange={formhandleChange("email")} type="email" value={email} />
                        </div>
                        <div className="form-group py-2">
                            <label className="text-light" >Password</label>
                            <input className="form-control" onChange={formhandleChange("password")} type="password" value={password} />
                        </div>
                        <button onClick={onSubmitHandler} className="btn btn-success d-block w-100">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div className="alert alert-success col-md-6 offset-sm-3 text-left"
                style={{ display: success ? "" : 'none' }}>
                User Registered Successfully.Please {""}
                <Link to="/signin">Login Here</Link>

            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="alert alert-danger col-md-6 offset-sm-3 text-left" style={{ display: error ? "" : 'none' }}>
                {error}

            </div>
        )
    }


    return (
        <div>
            <Base title="Sign up pade" description="Page for Sign up">
                <p className="text-white"> {JSON.stringify(values)}</p>
                {successMessage()}
                {errorMessage()}
                {signUpForm()}
            </Base>
        </div>
    )
}

export default Signup
