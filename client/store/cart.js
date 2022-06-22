import axios from 'axios'

// ACTION TYPE
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHANGE_QUANTITY = 'CHANGE_QUANTITY';

// ACTION CREATOR
export const getCart = (cartItems) => {
    return {
        type: GET_CART,
        cartItems
    }
}

export const _addToCart = (cartItems) => {
    return {
        type: ADD_TO_CART,
        cartItems
    }
} 

export const _removeFromCart = (cartItems) => {
    return {
        type: REMOVE_FROM_CART,
        cartItems
    }
}

export const _changeQuantity = (cartItems) => {
    return {
        type: CHANGE_QUANTITY,
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

export const addToCart = (orderId, productId, quantity) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.put(`/api/orders/cart/add/${orderId}/${productId}`, {quantity});
            dispatch(_addToCart(data));
        }
        catch(err) {
            console.log(err);
        }
    }
}

export const removeFromCart = (orderId, productId) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.put(`/api/orders/cart/remove/${orderId}/${productId}`);
            dispatch(_removeFromCart(data));
        }
        catch(err) {
            console.log(err);
        }
    }
}

export const changeQuantity = (item) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.put('/api/orders/cart/quantity', item);
            dispatch(_changeQuantity(data));
        }
        catch (err) {
            console.log(err);
        }
    }
}

// REDUCER
export default function cartReducer(state = [], action) {
    switch(action.type) {
        case GET_CART:
            return action.cartItems;
        case ADD_TO_CART:
            return action.cartItems;
        case REMOVE_FROM_CART:
            return action.cartItems;
        case CHANGE_QUANTITY:
            return action.cartItems;
        default:
            return state
    }
}