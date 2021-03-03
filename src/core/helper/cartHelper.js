export const addItemToCart = (item, next) => {
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item
        })

        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}

export const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = (productId) => {
    let cart = []
    let newCart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        newCart = cart.filter(product => {
            if (product._id !== productId) {
                return product
            }
        })
        console.log("new cart", newCart)

        localStorage.setItem("cart", JSON.stringify(newCart))
    }
    return newCart
}

export const cartEmpty = next => {
    if (typeof window !== undefined) {
        localStorage.removeItem("cart");
        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}

