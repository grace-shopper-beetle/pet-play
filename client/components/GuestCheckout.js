import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom' 

//**'Go to Checkout' button from cart leads to this form page */

function GuestCheckout() {
  // constructor() {
  //   super();

  //   this.handleSubmit = this.handleSubmit.bind(this)
  //   this.removeFromCart = this.removeFromCart.bind(this)
  // }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    // this.props.checkout(this.state);
  }
  const removeFromCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  // render() {
    const localStorageCart = JSON.parse(localStorage.getItem('cart'));
    console.log(localStorageCart)
    const guestCartTotal = localStorageCart.reduce((sum, itemPrice) => {
      const price = itemPrice.price * itemPrice.quantity;
      return sum + price
      }, 0
  )
  const cartQuantity = localStorageCart.reduce((previousQuantity, item) => {
    const itemQuantity = item.quantity;
    return previousQuantity + itemQuantity 
  }, 0) 
    return (
  <div className="row">
    <div className="col-75">
      <h1>Checkout</h1>
      <div>
        <h2>Your Cart</h2>
          {localStorageCart.map(item => {
            return (
              <div key={item.id}>
                <img src={item.image}/>
                <h4>{item.name} <span>{`$${item.price}`}</span></h4> {/* add drop down of quantity here */} 
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            )
          })
          }
      </div>
      <div className="container">
        <form action="/action_page.php" onSubmit = {handleSubmit} >
          <div className="row">
                <div className="col-50">
                  <h3>Billing Address</h3>
                  <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
                  <input type="text" id="fname" name="firstname" placeholder="John M. Doe" />
                  <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
                  <input type="text" id="email" name="email" placeholder="john@example.com" />
                  <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
                  <input type="text" id="adr" name="address" placeholder="542 W. 15th Street" />
                  <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
                  <input type="text" id="city" name="city" placeholder="New York" />
      
                  <div className="row">
                    <div className="col-50">
                      <label htmlFor="state">State</label>
                      <input type="text" id="state" name="state" placeholder="NY" />
                    </div>
                    <div className="col-50">
                      <label htmlFor="zip">Zip</label>
                      <input type="text" id="zip" name="zip" placeholder="10001" />
                    </div>
                  </div>
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
      
                  <div className="row">
                    <div className="col-50">
                      <label htmlFor="expyear">Exp Year</label>
                      <input type="text" id="expyear" name="expyear" placeholder="2018" />
                    </div>
                    <div className="col-50">
                      <label htmlFor="cvv">CVV</label>
                      <input type="text" id="cvv" name="cvv" placeholder="352" />
                    </div>
                  </div>
                </div>
      
              
          </div>
              <label>
                <input type="checkbox" checked="checked" name="sameadr"/> Shipping address same as billing
              </label>
              <Link to={'/confirmation'}><button type="submit" className="btn">Place Your Order</button></Link>
        </form>
      </div>
    </div>
      
        <div className="col-25">
          <div className="container">
            <h4>Cart Summary
              <span className="price">
                <i className="fa fa-shopping-cart"></i>
                <b>Total Quantity: {cartQuantity}</b>
              </span>
            </h4>
            {localStorageCart.map(item => {
              return (
                  <p key={item.id}>{`${item.name} x ${item.quantity}`}<span className="price">{`$${item.price * item.quantity}`}</span></p>
                // wrap item name with <a href="#">'Product name here'</a> to link back to item page?
                // Temporarily removed anchor tag because unsure of how to implement with localStorage
              )
            })}
            <hr />
            <p>Total <span className="price"><b>{`$${guestCartTotal}`}</b></span></p>
          </div>
        </div>
  </div>
    )
  } 
// }

// const mapState = (state) => {

// }
// const mapDispatch = (dispatch) => {
//   return {

//     // checkout: (guest) => dispatch(checkoutGuest(guest))
//   }
// }
// connect(mapState, null)
export default (GuestCheckout)
