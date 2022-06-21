import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { closeCart, fetchCart } from '../store/cart';

//**'Proceed to Checkout' button from cart leads to this form page */

class UserCheckout extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart(this.props.auth.id);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.closeCart(this.props.cart[0].order_product.orderId);
  }

  render() {
    return (
  <div className="row">
    <div className="col-75">
      <h1>Checkout</h1>
      <></>
      <div className="container">
        <form onSubmit = {this.handleSubmit} >
          <div className="row">
                <div className="col-50">
                  <h3>Address</h3>
                  <p>{this.props.auth.first_name} {this.props.auth.last_name}</p>
                  <p>{this.props.auth.street_address}</p>
                  <p>{this.props.auth.city}, {this.props.auth.state} {this.props.auth.zipcode}</p>
                </div>

                <div className="col-50">
                  <h3>Payment</h3>
                  <label htmlFor="fname">Accepted Cards</label>
                  <div className="icon-container">
                    <i className="fa fa-cc-visa"></i>
                    <i className="fa fa-cc-amex"></i>
                    <i className="fa fa-cc-mastercard"></i>
                    <i className="fa fa-cc-discover"></i>
                  </div>
                  <label htmlFor="cname">Name on Card</label>
                  <input type="text" id="cname" name="cardname" placeholder="John More Doe" />
                  <label htmlFor="ccnum">Credit card number</label>
                  <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
                  <label htmlFor="expmonth">Exp Month</label>
                  <input type="text" id="expmonth" name="expmonth" placeholder="September" />
                  <label htmlFor="expyear">Exp Year</label>
                  <input type="text" id="expyear" name="expyear" placeholder="2018" />
                  <label htmlFor="cvv">CVV</label>
                  <input type="text" id="cvv" name="cvv" placeholder="352" />
                </div>
          </div>
              <button type="submit" className="btn">Place Your Order</button>
        </form>
      </div>
    </div>

        <div className="col-25">
          <div className="container">
            <h4>Cart
              <span className="price">
                <i className="fa fa-shopping-cart"></i>
                <b>  {(this.props.cart.reduce((total, item) => (total + item.order_product.quantity), 0))}</b>
              </span>
            </h4>
            {this.props.cart.map(item => {
              return (
                <p key={item.id}>{`${item.product_name} x ${item.order_product.quantity}`}<span className="price">{`$${(item.price/100)*item.order_product.quantity}`}</span></p>
              )
            })}
            <hr />
            <p>Total <span className="price"><b>{`$${(this.props.cart.reduce((sum, item) => (sum + (item.price * item.order_product.quantity)), 0))/100}`}</b></span></p>
            <button type='button'><Link to={'/cart'}>Return to Cart</Link></button>
          </div>
        </div>
  </div>
    )
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    cart: state.cart
  }
}

const mapDispatch = (dispatch, {history}) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
    closeCart: (id) => dispatch(closeCart(id, history))
  }
}

export default connect(mapState, mapDispatch)(UserCheckout);
