import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/**
 * ACTION CREATORS
 */

const getSingleProduct = (singleProduct) => (
  {
    type: GET_SINGLE_PRODUCT,
    singleProduct
  }
)

export const _updateProduct = (singleProduct) => {
  return {
    type: UPDATE_PRODUCT,
    singleProduct
  }
}

/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    const {data} = await axios.get(`/api/products/${id}`);
    dispatch(getSingleProduct(data));
  }
}

export const updateProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/products/${product.id}`, product);
      dispatch(_updateProduct(data));
      history.push('/admin/products');
    } catch(err) {
      console.log(err);
    }
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.singleProduct;
    case UPDATE_PRODUCT:
      return action.singleProduct;
    default:
      return state
  }
}
