import React from 'react'
import {connect} from 'react-redux'
import { fetchSingleProduct } from '../store/singleProduct'
import { Link } from 'react-router-dom'

class SingleProduct extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
  }

  render() {
    const product = this.props.singleProduct;
    console.log('props', product)
    return (
      <div>
        <img src={product.image} />
        <h1>{product.product_name}</h1>
        <h3>{`$${product.price}`}</h3>
        <button type='button'>Add to Cart</button>
        <p>{product.description}</p>
        <Link to={'/products'}>Back</Link>
      </div>
    )
  }

}

const mapState = (state) => {
  console.log('state', state)
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = (dispatch) => ({
  fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct);
