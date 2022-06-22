import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

//**'Proceed to Checkout' button from cart leads to this form page */

class GuestCheckout extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault();
    localStorage.removeItem('cart');
  }

  render() {
    const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("this is local storage", localStorageCart)
    const guestCartTotal = localStorageCart.reduce((sum, itemPrice) => {
      const price = itemPrice.price;
      return sum + price
      }, 0
  )
  const cartQuantity = localStorageCart.reduce((previouQuantity, item) => {
    const itemQuantity = item.quantity;
    return previouQuantity + itemQuantity
  }, 0)
    return (
  <div className="row">
    <div className="col-75">
      <h1>Checkout</h1>
      <></>
      <div className="container">
        <form action="/action_page.php" onSubmit = {this.handleSubmit} >
          <div className="row">
                <div className="col-50">
                  <h3>Billing Address</h3>
                  <label htmlFor="first_name"><i className="fa fa-user"></i> First Name</label>
                  <input type="text" id="fname" name="first_name" placeholder="John" required />
                  <label htmlFor="last_name"><i className="fa fa-user"></i> Last Name</label>
                  <input type="text" id="lname" name="last_name" placeholder="Doe" required />
                  <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
                  <input type="text" id="email" name="email" placeholder="john@example.com" required />
                  <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
                  <input type="text" id="adr" name="street_address" placeholder="542 W. 15th Street" required />
                  <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
                  <input type="text" id="city" name="city" placeholder="New York" required />
                  <label htmlFor="state">State</label>
                  <input type="text" id="state" name="state" placeholder="NY" required />
                  <label htmlFor="zip">Zip</label>
                  <input type="text" id="zip" name="zip" placeholder="10001" required />
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text" id="phone" name="phone" placeholder="5555555555" required />
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
              <label>
                <input type="checkbox" name="sameadr" onChange = {this.handleChange} /> Shipping address same as billing
              </label>
              <Link to={'/confirmation'}><button type="submit" className="btn">Place Your Order</button></Link>
        </form>
      </div>
    </div>

        <div className="col-25">
          <div className="container">
            <h4>Cart
              <span className="price">
                <i className="fa fa-shopping-cart"></i>
                <b>  {cartQuantity}</b>
              </span>
            </h4>
            {localStorageCart.map(item => {
              return (
                <p key={item.id}>{`${item.product_name} x ${item.quantity}`}<span className="price">{`$${item.price/100}`}</span></p>
                // wrap item name with <a href="#">'Product name here'</a> to link back to item page?
                // Temporarily removed anchor tag because unsure of how to implement with localStorage
              )
            })}
            <hr />
            <p>Total <span className="price"><b>{`$${guestCartTotal / 100}`}</b></span></p>
            <Link to={'/cart'}><button type='button'>Return to Cart</button></Link>
          </div>
        </div>
  </div>
    )
  }
}

export default (GuestCheckout)
