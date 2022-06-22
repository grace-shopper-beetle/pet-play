import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, isLoginPage} = props

  return (
    <div className="col-75">
      <h1>{displayName}</h1>
      <div className="container">
      <form onSubmit={handleSubmit} name={name}>
        <div className='row'>
          <div className='col-50'>
            {isLoginPage ? "" : <h3>Account Info</h3>}
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
        </div>
        {isLoginPage ? ("") : (
          <div className="row">
                <div className="col-50">
                  <h3>Address</h3>
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
          </div>)}
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div style={{color: 'red'}}>{error.response.data}</div>}
      </form>
    </div>
</div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
    isLoginPage: true
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
    isLoginPage: false
  }
}

const mapDispatch = (dispatch, {history}) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      if(formName === "login") {
        const user = {
          username: evt.target.username.value,
          password: evt.target.password.value
        }
        dispatch(authenticate(user, formName, history))
      } else {
        const user = {
          username: evt.target.username.value,
          password: evt.target.password.value,
          first_name: evt.target.first_name.value,
          last_name: evt.target.last_name.value,
          email: evt.target.email.value,
          street_address: evt.target.street_address.value,
          city: evt.target.city.value,
          state: evt.target.state.value,
          zipcode: evt.target.zip.value,
          phone: evt.target.phone.value,
        }
        dispatch(authenticate(user, formName, history))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
