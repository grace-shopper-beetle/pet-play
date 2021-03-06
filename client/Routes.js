import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import AllProducts from './components/AllProducts';
import Home from './components/Home';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import AllUsers from './components/AllUsers';
import AdminProductView from './components/AdminProductView';
import GuestCheckout from './components/GuestCheckout';
import Confirmation from './components/Confirmation';
import {me} from './store'
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';
import UserCheckout from './components/UserCheckout';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path='/' exact component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products" exact component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={UserCheckout} />
            <Route path="/confirmation" component={Confirmation} />
            <Route path="/home" component={Home} />
            <Route path="/admin/users" component={AllUsers} />
            <Route path="/admin/products" exact component={AdminProductView} />
            <Route path="/admin/products/add" component={AddProduct} />
            <Route path="/admin/products/:id" component={EditProduct} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products" exact component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/cart" component={Cart} />
            <Route path="/users" component={Login} />
            <Route path="/checkout" component={GuestCheckout} />
            <Route path="/confirmation" component={Confirmation} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
