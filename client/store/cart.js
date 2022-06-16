import axios from 'axios'

// ACTION TYPE
const GET_CART = 'GET_CART'

// ACTION CREATOR
export const getCart = (cartItems) => {
    return {
        type: GET_CART,
        cartItems
    }
}

// THUNK CREATOR
export const fetchCart = (id) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`/api/orders/cart/${id}`)
            dispatch(getCart(data))
        }
        catch(err) {
            console.log(err)
        }
    }
}

// REDUCER
export default function cartReducer(state = [], action) {
    switch(action.type) {
        case GET_CART:
            return action.cartItems
        default:
            return state
    }
}
