import React from 'react'
import {connect} from 'react-redux'
import { fetchSingleProduct } from '../store/singleProduct'
import { addToCart, fetchCart } from '../store/cart'
import { Link } from 'react-router-dom'

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      quantity: 1
    }
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleLocalStorageAdd = this.handleLocalStorageAdd.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
    if (this.props.isLoggedIn) {
      this.props.fetchCart(this.props.auth.id);
    } else {
        this.setState({cart: JSON.parse(localStorage.getItem('cart'))});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn && prevProps.auth.id !== this.props.auth.id) {
        this.props.fetchCart(this.props.auth.id);
    }
  }

  handleAddToCart(orderId, productId, quantity) {
    event.preventDefault();
    // console.log('orderId', orderId)
    // console.log('productId', productId)
    // console.log('quantity', quantity)
    this.props.addToCart(orderId, productId, quantity);
  }


  handleLocalStorageAdd(product) {
    let localStorageCart = JSON.parse(localStorage.getItem('cart'));
    if (localStorageCart) {
      localStorageCart.push({...product, ...{quantity: this.state.quantity}})
      localStorage.setItem('cart', JSON.stringify(localStorageCart));
    } else {
      localStorage.setItem('cart', JSON.stringify([{...product, ...{quantity: this.state.quantity}}]))
    }
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
    console.log(this.state.quantity)
  }

  render() {
    const product = this.props.singleProduct;
    const cart = this.props.cart;
    console.log(this.props.cart)

    return (
      <div className="card">
        <img src={product.image}/>
        <h1>{product.product_name}</h1>
        <h3>{`$${product.price/100}`}</h3>
        <div className="description" >
          <p>{product.description}</p>
        </div>
        

        {/* User logged in: */}
        {this.props.isLoggedIn ? (
          // if cart has items:
          cart ? (
            <div>
              {/* this.handleAddToCart(cart[0].order_product.orderId, product.id, this.state.quantity) */}
              <form>
                <label htmlFor='quantity'>Quantity: </label>
                <input type='number' name='quantity' value={this.state.quantity} min={1} max={10} onChange={this.handleChange}/>

                <button onClick={() => this.handleAddToCart(cart[0].order_product.orderId, product.id, this.state.quantity)}>Add to Cart</button>
              </form>
            </div>
            // cart[0] is used to grab the currently open cart's id
          ) : (
            // empty cart, create a new orderId?
            "add product to a new order Id? "
          )
        ) : (
          // Guest Users:
          <div>
              <form>
                <label htmlFor='quantity'>Quantity: </label>
                <input type='number' name='quantity' value={this.state.quantity} min={1} max={10} onChange={this.handleChange}/>

                <button key={product.id} type='button' onClick={() => this.handleLocalStorageAdd(product, this.state.quantity)}>Add to Cart</button>
              </form>
            </div>
        )}

        
        {/* <p><button type='button'>Add to Cart</button></p> */}
        <p><Link to={'/products'}>Back</Link></p>
      </div>
    )
  }

}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    cart: state.cart
  }
}

const mapDispatch = (dispatch) => ({
  fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  fetchCart: (id) => dispatch(fetchCart(id)),
  addToCart: (orderId, productId, quantity) => dispatch(addToCart(orderId, productId, quantity))
})

export default connect(mapState, mapDispatch)(SingleProduct);
