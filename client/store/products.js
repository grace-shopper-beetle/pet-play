import axios from 'axios'

// ACTION TYPE
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

// ACTION CREATOR
export const getAllProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    products
  }
}

// THUNK CREATOR
export const fetchAllProducts = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getAllProducts(data))
    } catch(err) {
      console.log(err)
    }
  }
}

// REDUCER
export default function allProductsReducer(state = [], action) {
  switch(action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}