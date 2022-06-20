import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { changeQuantity, fetchCart, removeFromCart } from '../store/cart'

// When using add to cart for localstorage, use JSON.stringify inside setItem
// When retrieving info from localstorage, use JSON.parse around getItem

class Cart extends Component {
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLocalStorageDelete = this.handleLocalStorageDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLocalStorageChange = this.handleLocalStorageChange.bind(this);
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.fetchCart(this.props.auth.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLoggedIn && prevProps.auth.id !== this.props.auth.id) {
            this.props.fetchCart(this.props.auth.id);
        }
    }

    handleDelete(orderId, productId) {
        this.props.removeFromCart(orderId, productId);
    }

    handleLocalStorageDelete(productId) {
        localStorage.cart.filter(items => items.id !== productId);
    }

    handleChange(orderId, productId) {
        event.preventDefault();
        this.props.changeQuantity({orderId, productId, quantity: event.target.value})
    }

    handleLocalStorageChange(productId) {
        localStorage.cart.map(item => {
            if(item.id === productId) {
                item.quantity = event.target.value;
            }
        })
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
                                <div key={item.id}>
                                    <img src={item.image} />
                                    <h3>{item.product_name}</h3>
                                    <p>{`$${(item.price/100)*item.order_product.quantity}`}</p>
                                    <form >
                                        <label htmlFor='quantity'>Quantity: </label>
                                        <input type='number' name='quantity' value={item.order_product.quantity} min={1} max={10} onChange={() => this.handleChange(item.order_product.orderId, item.id)} />
                                    </form>
                                    <button type='button' onClick={() => this.handleDelete(item.order_product.orderId, item.id)} >Remove From Cart</button>
                                </div>
                            )
                        })}
                        </ div>
                        <div>
                            <p>Total: {`$${(this.props.cart.reduce((sum, item) => (sum + (item.price * item.order_product.quantity)), 0))/100}`}</p>
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
                                <div key={item.id}>
                                    <img src={item.image} />
                                    <h3>{item.product_name}</h3>
                                    <p>{`$${(item.price/100)*item.quantity}`}</p>
                                    <form>
                                        <label htmlFor='quantity'>Quantity: </label>
                                        <input type='number' name='quantity' value={item.quantity} min={1} max={10} onChange={() => this.handleLocalStorageChange(item.id)} />
                                    </form>
                                    <button type='button' onClick={() => this.handleLocalStorageDelete(item.id)} >Remove From Cart</button>
                                </div>
                            )
                        })}
                        </ div>
                        <div>
                            <p>Total: {`$${(localStorageCart.reduce((sum, item) => (sum + (item.price * item.quantity)), 0))/100}`}</p>
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
    fetchCart: (id) => dispatch(fetchCart(id)),
    removeFromCart: (orderId, productId) => dispatch(removeFromCart(orderId, productId)),
    changeQuantity: (orderId, productId, quantity) => dispatch(changeQuantity(orderId, productId, quantity))
})

export default connect(mapState, mapDispatch)(Cart);



