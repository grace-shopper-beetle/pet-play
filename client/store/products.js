import axios from 'axios'

// ACTION TYPE
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'

// ACTION CREATOR
export const getAllProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    products
  }
}

export const _deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}

export const _addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product
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

export const deleteProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`/api/products/${product.id}`);
      dispatch(_deleteProduct(data));
      history.push('/admin/products');
    } catch(err) {
      console.log(err);
    }
  }
}

export const addProduct = (product, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/products', product);
    dispatch(_addProduct(created));
    history.push('/admin/products');
  };
};

// REDUCER
export default function allProductsReducer(state = [], action) {
  switch(action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id);
    case ADD_PRODUCT:
      return [...state, action.product];
    default:
      return state
  }
}
