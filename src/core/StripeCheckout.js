import React, { useState, useEffect } from 'react'
import { isAuthenticated } from "../auth/helper"
import { cartEmpty, loadCart } from './helper/cartHelper'
import { Link } from 'react-router-dom'
import StripeCheckoutBtn from 'react-stripe-checkout'
import { API } from '../backend'
import { createOrder } from '../core/helper/orderHelper'


const StripeCheckout = ({
    products,
    setReload = f => f,
    reload = undefined
}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })

    const usertoken = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalPrice = () => {
        if (products) {
            return products.map(product => {
                return product.price
            }).reduce((sum, currentval) => {
                sum += currentval
                return sum
            }, 0)
        }

    }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json",
        }
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then(res => {
                const orderData = {
                    products: products,
                    transaction_id: res.balance_transaction,
                    amount: res.amount,
                    status:"Processing"
                }
                console.log(res.body)
                // createOrder(userId, usertoken, orderData)
                //     .then(res => console.log(res))
                //     .catch(err => console.log(err))
                cartEmpty(()=>console.log("cart is empty"))
                setReload(!reload)
            })
            .catch(err => console.log(err)
            )
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutBtn
                stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                token={makePayment}
                amount={getFinalPrice() * 100}
                name="Buy Tshirts"
                shippingAddress
                billingAddress
            >
                <button className="btn btn-primary">pay with Stripe</button>
            </StripeCheckoutBtn>
        ) : (
                <Link to="/signin">
                    <button className="btn btn-warning">Sign In</button>
                </Link>
            )
    }



    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout
