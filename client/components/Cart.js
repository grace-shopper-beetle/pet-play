import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchCart } from '../store/cart'

// When using add to cart for localstorage, use JSON.stringify inside setItem
// When retrieving info from localstorage, use JSON.parse around getItem

class Cart extends Component {
    componentDidMount() {
        this.props.fetchCart(this.props.auth.id)
    }
    render() {
        const localStorageCart = JSON.parse(localStorage.getItem('cart'));
        return (
        <div>
            <h1>Your Cart</h1>
            <Link to={'/products'}>Continue Shopping</Link>
            {this.props.isLoggedIn ? (
                // User is logged in
                this.props.cart ? (
                    // There are items in the cart
                    <div>
                        <div>
                        {this.props.cart.map(item => {
                            return (
                                <div>
                                    <img src={item.image} />
                                    <h3>{item.product_name}</h3>
                                    <p>{`$${item.price/100}`}</p>
                                </div>
                            )
                        })}
                        </ div>
                        <div>
                            <p>Total: {`$${(this.props.cart.reduce((sum, price) => (sum + price), 0))/100}`}</p>
                            <button type='button'><Link to='/confirmation'>Place Order</Link></button>
                        </div>
                    </div>
                ) : (
                    // There are no items in the cart
                    <div>Your cart is empty!</div>
                )
             ) : (
                // User is not logged in
                localStorageCart ? (
                    // There are items in the cart
                    <div>
                        <div>
                        {localStorageCart.map(item => {
                            return (
                                <div>
                                    <img src={item.image} />
                                    <h3>{item.product_name}</h3>
                                    <p>{`$${item.price/100}`}</p>
                                </div>
                            )
                        })}
                        </ div>
                        <div>
                            <p>Total: {`$${(localStorageCart.reduce((sum, price) => (sum + price), 0))/100}`}</p>
                            <button type='button'><Link to='/checkout'>Proceed to Checkout</Link></button>
                        </div>
                    </div>
                ) : (
                    // There are no items in the cart
                    <div>Your cart is empty!</div>
                )
             )}
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



