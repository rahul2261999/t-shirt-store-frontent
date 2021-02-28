import React, { useState } from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth/helper/index'

const Signin = () => {

    const [values, setValues] = useState({
        email: "rahulsaini2261999@gmail.com",
        password: "123456",
        error: "",
        loading: false,
        didRedirect: false,
    })

    const { email, password, error, loading, didRedirect } = values
    const { user } = isAuthenticated();

    const formhandleChange = name => event => {
        setValues({
            ...values, error: false,
            [name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true
        })
        signin({ email, password })
            .then(data => {
                console.log(data);
                if (data.error) {

                    setValues({ ...values, error: data.error, loading: false })
                } else {

                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        })
                    })
                }
            })
            .catch(() => console.log("singing failed"))
    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group py-2">
                            <label className="text-light">E-mail</label>
                            <input onChange={formhandleChange("email")} className="form-control" type="email" value={email} />
                        </div>
                        <div className="form-group py-2">
                            <label className="text-light">Password</label>
                            <input onChange={formhandleChange("password")} className="form-control" type="password" value={password} />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success d-block w-100">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    // alert messages
    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
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

            <Base title="Sign In " description="Page for Sign In">
                {loadingMessage()}
                {errorMessage()}
                <p className="text-white">{JSON.stringify(values)}</p>
                {signInForm()}
                {performRedirect()}
            </Base>

        </div>
    )
}

export default Signin
