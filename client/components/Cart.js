import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { changeQuantity, fetchCart, removeFromCart } from '../store/cart'

// When using add to cart for localstorage, use JSON.stringify inside setItem
// When retrieving info from localstorage, use JSON.parse around getItem

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: []
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLocalStorageDelete = this.handleLocalStorageDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLocalStorageChange = this.handleLocalStorageChange.bind(this);
    }

    componentDidMount() {
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

    handleDelete(orderId, productId) {
        this.props.removeFromCart(orderId, productId);
    }

    handleLocalStorageDelete(productId) {
        const localStorageCart = JSON.parse(localStorage.getItem('cart'));
        if(localStorageCart.length > 1) {
            let newCart = localStorageCart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(newCart));
            this.setState({cart: newCart});
        } else {
            localStorage.setItem('cart', JSON.stringify([]))
            this.setState({cart: []});
        }
    }

    handleChange(orderId, productId) {
        event.preventDefault();
        this.props.changeQuantity({orderId, productId, quantity: event.target.value})
    }

    handleLocalStorageChange(productId) {
        const localStorageCart = JSON.parse(localStorage.getItem('cart'));
        let updatedCart = localStorageCart.map(product => {
            if(product.id === productId) {
                product.quantity = event.target.value;
            }
            return product;
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        this.setState({cart: updatedCart});
    }

    render() {
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
                            <button type='button'><Link to='/checkout'>Place Order</Link></button>
                        </div>
                    </div>
                ) : (
                    // There are no items in the cart
                    <div>Your cart is empty!</div>
                )
             ) : (
                // User is not logged in
                localStorage.getItem('cart') ? (
                    // There are items in the cart
                    <div>
                        <div>
                        {this.state.cart.map(item => {
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
                            <p>Total: {`$${(this.state.cart.reduce((sum, item) => (sum + (item.price * item.quantity)), 0))/100}`}</p>
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



