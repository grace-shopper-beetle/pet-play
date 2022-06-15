import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

/**
 * ACTION CREATORS
 */

const getSingleProduct = (singleProduct) => (
  {
    type: GET_SINGLE_PRODUCT,
    singleProduct
  }
)

/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    const {data} = await axios.get(`/api/products/${id}`);
    dispatch(getSingleProduct(data));
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.singleProduct;
    default:
      return state
  }
}
