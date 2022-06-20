import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteProduct, fetchAllProducts} from '../store/products'
import {Link} from 'react-router-dom'

class AdminProductView extends Component {
    constructor() {
      super();
      this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.getAllProducts();
    }

    handleDelete(product) {
      this.props.deleteProduct(product);
    }

    render() {
      const products = this.props.products;

        return (
          <div>
          {this.props.isLoggedIn && this.props.auth.isAdmin ? (
            <div id="products" className="column">
              <h2 className="section-title">All Products</h2>
              <ul className="container">
                {products && products.map((product) => (
                  <div className="product" key={product.id}>
                    <h3>{product.product_name}</h3>
                    <img src={product.image} />
                    <h4>Category: {product.category}</h4>
                    <p>{`$${product.price/100}`}</p>
                    <p>{product.description}</p>
                    <button type='button'><Link to={`/admin/products/${product.id}`}>Edit Product</Link></button>
                    <button type='button' onClick={() => this.handleDelete(product)}>Delete Product</button>
                    <hr />
                  </div>
                ))}
              </ul>
            </div>
          ): (
            <p>404 Page Not Found!</p>
          )}
        </div>
        );
    }

}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    products: state.products
  }
}

const MapDispatchToProps = (dispatch, { history }) => ({
    getAllProducts: () => dispatch(fetchAllProducts()),
    deleteProduct: (product) => dispatch(deleteProduct(product, history))
})

export default connect(mapStateToProps, MapDispatchToProps)(AdminProductView)
