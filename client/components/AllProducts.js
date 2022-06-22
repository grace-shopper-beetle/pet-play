import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/products'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
      this.props.getAllProducts();
  }

  render() {
    const products = this.props.products;

      return (
        <div id="products" className="column">
          <h2 className="section-title">All Products</h2>
          <ul className="container">
            <div className="row">
              {products && products.map((product) => (
                <div className="column">
                    <div className="card" key={product.id}>
                      <Link to={`/products/${product.id}`}>
                        <img src={product.image} />
                        <h3>{product.product_name}</h3>
                        <p>{`$${product.price/100}`}</p>
                        <p><button type='button'>Add to Cart</button></p>
                      </Link>
                      <hr />
                    </div>
                </div>
              ))}
            </div>
          </ul>
        </div>
      );
  }

}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    isLoggedIn: !!state.auth.id
  }
}

const MapDispatchToProps = (dispatch) => ({
    getAllProducts: () => dispatch(fetchAllProducts())
})

export default connect(mapStateToProps, MapDispatchToProps)(AllProducts)
