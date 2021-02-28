import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImgHelper'

const Card = ({
    product,
    addtoCart,
    setReload,
    reload = undefined
}) => {

    const [redirect, setRedirect] = useState(false)


    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    const getRedirected = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{product.name}</div>
            <div className="card-body">
                {getRedirected(redirect)}
                <ImageHelper product={product} />
                <p className="lead bg-success font-weight-normal text-wrap">
                    {product.description}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">Rs {product.price}</p>
                <div className="row">
                    <div className="col-12">
                        {addtoCart ?
                            <button
                                onClick={addToCart}
                                className="btn btn-block btn-outline-success mt-2 mb-2" >
                                Add to Cart
                            </button> :
                            <button
                                onClick={() => {
                                    removeItemFromCart(product._id);
                                    setReload(!reload)

                                }}
                                className="btn btn-block btn-outline-danger mt-2 mb-2">
                                Remove from cart
                             </button>}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Card
