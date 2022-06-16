import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchCart } from '../store/cart'

class Cart extends Component {
    componentDidMount() {
        this.props.fetchCart(this.props.auth.id)
    }
    render() {
        const localStorageCart = localStorage.getItem('cart');
        const userCartTotal = this.props.cart.reduce((sum, price) => {
            return sum + price
            }, 0
        )
        const guestCartTotal = localStorageCart.reduce((sum, price) => {
            return sum + price
            }, 0
        )
        return (
        <div>
            <h1>Your Cart</h1>
            <Link to={'/products'}>Continue Shopping</Link>
            {this.props.isLoggedIn ? (
            <div>
                {this.props.cart.map(item => {
                    return (
                        <div>
                            <img src={item.image} />
                            <h3>{item.product_name}</h3>
                            <p>{item.price}</p>
                        </div>
                    )}
                )}
                <div>
                    {/* if cart is empty, disable button*/}
                    <p>Total: {userCartTotal}</p>
                    <button type='button'><Link to='/confirmation'>Place Order</Link></button>
                </div>
            </div>
             ) : (
            <div>
                {localStorageCart.map(item => {
                    return (
                        <div>
                            <img src={item.image} />
                            <h3>{item.product_name}</h3>
                            <p>{item.price}</p>
                        </div>
                    )}
                )}
                <div>
                    {/* if cart is empty, disable button*/}
                    <p>Total: {guestCartTotal}</p>
                    <button type='button'><Link to='/checkout'>Proceed to Checkout</Link></button>
                </div>
            </div>
             )
            }
        </div>
        )
    }
}


const mapState = state => {
    return {
      auth: state.auth,
      isLoggedIn: !!state.auth.id,
      cart: state.cart
    }
}

const mapDispatch = (dispatch) => ({
    fetchCart: (id) => dispatch(fetchCart(id))
}) 

export default connect(mapState, mapDispatch)(Cart);



