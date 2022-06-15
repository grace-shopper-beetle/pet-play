import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../products'

class AllProducts extends Component {
    componentDidMount() {
        this.props.getAllProducts();
    }
    render() {
        return (
          <div id="products" className="column">
            <h2 className="section-title">All Products</h2>
            <ul className="container">
              {this.props.products.map((product) => (
                <div className="product" key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <h3>{product.name}</h3>
                    <img src={product.image} />
                    <p>{product.price}</p>
                  </Link>
                  <hr />
                </div>
              ))}
            </ul>
          </div>
        );
    }    
    
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const MapDispatchToProps = (dispatch) => ({
    getAllProducts: () => dispatch(fetchAllProducts())
})

export default connect(mapStateToProps, MapDispatchToProps)(AllProducts)