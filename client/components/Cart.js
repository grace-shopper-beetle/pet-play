import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { changeQuantity, fetchCart, removeFromCart } from '../store/cart'

// When using add to cart for localstorage, use JSON.stringify inside setItem
// When retrieving info from localstorage, use JSON.parse around getItem

class Cart extends Component {
    constructor() {
        super();
        // this.state = {
        //     cart: []
        // }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLocalStorageDelete = this.handleLocalStorageDelete(this);
        // this.handleUpdate = this.handleUpdate(this);
    }

    // componentDidMount() {
    //     this.props.fetchCart(this.props.auth.id);
    // }

    componentDidUpdate(prevProps) {
        if (this.props.isLoggedIn && prevProps.auth.id !== this.props.auth.id) {
            this.props.fetchCart(this.props.auth.id);
        }
    }

    handleDelete(orderId, productId) {
        this.props.removeFromCart(orderId, productId);
    }

    handleLocalStorageDelete(productId) {
        if (localStorage.cart) {
            localStorage.cart.filter(items => items.id !== productId);
        }
    }

    // handleUpdate(orderId, productId) {
    //     this.props.changeQuantity(orderId, productId);
    // }

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
                                    <p>{`$${item.price/100}`}</p>
                                    {/* <form onSubmit={() => this.handleUpdate(item.order_product.orderId, item.id)}>
                                        <label htmlFor='quantity'>Quantity: </label>
                                        <input type='number' value={item.order_product.quantity} min={1} max={10} />
                                        <button type='submit'>Update</button>
                                    </form> */}
                                    <button type='button' onClick={() => this.handleDelete(item.order_product.orderId, item.id)} >Remove From Cart</button>
                                </div>
                            )
                        })}
                        </ div>
                        <div>
                            <p>Total: {`$${(this.props.cart.reduce((sum, item) => (sum + item.price), 0))/100}`}</p>
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
                                    <p>{`$${item.price/100}`}</p>
                                    <button type='button' onClick={() => this.handleLocalStorageDelete(item.id)} >Remove From Cart</button>
                                </div>
                            )
                        })}
                        </ div>
                        <div>
                            <p>Total: {`$${(localStorageCart.reduce((sum, item) => (sum + item.price), 0))/100}`}</p>
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
    // changeQuantity: (orderId, productId) => dispatch(changeQuantity(orderId, productId))
})

export default connect(mapState, mapDispatch)(Cart);



