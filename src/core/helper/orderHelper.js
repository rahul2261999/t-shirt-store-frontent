export const createOrder = (userId, token, orderData) => {
    return fetch(`${API}/create/order/${userId}`, {
        method: "GET",
        header: {
            Accept: "application/json",
            "content-Type": "appliction/json",
            Authorization: "Bearer" + token,
            body: JSON.stringify({ order: orderData })
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}