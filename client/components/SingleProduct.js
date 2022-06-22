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
    return (
      <div className="card">
        <img src={product.image}/>
        <h1>{product.product_name}</h1>
        <h3>{`$${product.price/100}`}</h3>
        <p>{product.description}</p>
        <p><button type='button'>Add to Cart</button></p>
        <p><Link to={'/products'}>Back</Link></p>
      </div>
    )
  }

}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = (dispatch) => ({
  fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct);
