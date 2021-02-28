import React, { useState, useEffect } from 'react'
import '../styles.css'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'

function Cart() {

    const [products, setproducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setproducts(loadCart())
    }, [reload])

    const loadAllProducts = () => {
        return (
            <div>
                {products.map(prod => {
                    return (
                        <div key={prod._id} className="col-12 my-2">
                            <Card key={prod._id} product={prod} addtoCart={false} setReload={setReload} reload={reload} />
                        </div>
                    )
                })}
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <h1>section for checkout</h1>
            </div>
        )
    }




    return (
        <Base title="Cart Page" description="Welcome to Cart Page">
            <div className="row">
                <div className="col-6 text-center">{loadAllProducts()}</div>
                <div className="col-6">{loadCheckout()}</div>
            </div>
        </Base>
    )
}

export default Cart
