import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'

class AllUsers extends Component {
  componentDidMount() {
    if(this.props.isLoggedIn && this.props.auth.isAdmin) {
      this.props.loadUsers();
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.isLoggedIn && this.props.auth.isAdmin && this.props.auth.id !== prevProps.auth.id) {
      this.props.loadUsers();
    }
  }

  render () {
    return (
      <div>
        {this.props.isLoggedIn && this.props.auth.isAdmin ? (
          <div>
            <h2>Users</h2>
            <table>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Street Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Phone Number</th>
                <th>Admin?</th>
              </tr>
              {this.props.users.map(user => {
                return (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.street_address}</td>
                    <td>{user.city}</td>
                    <td>{user.state}</td>
                    <td>{user.zipcode}</td>
                    <td>{user.phone}</td>
                    <td>{user.isAdmin ? ('Yes') : ('No')}</td>
                  </tr>
                )
              })}
            </table>
          </div>
        ) : (
          <p>404 Page Not Found!</p>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    loadUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers);
