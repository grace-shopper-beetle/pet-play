import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct } from '../store/products';

class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      product_name: '',
      category: 'cat',
      price: 0,
      image: 'https://media.istockphoto.com/vectors/cartoon-dog-cat-animal-frame-border-vector-id659973608?k=20&m=659973608&s=612x612&w=0&h=-pERm6rxOOXIxW6WzZUjaPWggPDseV7I649Q0-ZnA54=',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    event.preventDefault();
    this.props.addProduct({
      product_name: this.state.product_name,
      category: this.state.category,
      price: (this.state.price * 100),
      image: this.state.image,
      description: this.state.description
    });
  }

  render() {
    const product = this.state;
    return (
      <div>
        {this.props.isLoggedIn && this.props.auth.isAdmin ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor='product_name'>Name: </label>
              <input name='product_name' value={product.product_name} onChange={this.handleChange} />
              <label htmlFor='category'>Category: </label>
              <select name='category' onChange={this.handleChange}>
                <option value='cat'>Cat</option>
                <option value='dog'>Dog</option>
              </select>
              <label htmlFor='price'>Price: </label>
              <input name='price' value = {`${product.price}`} type='number' onChange={this.handleChange} />
              <label htmlFor='image'>Image Link: </label>
              <input name='image' value= {product.image} onChange={this.handleChange} />
              <label htmlFor='description'>Description: </label>
              <textarea name='description' value={product.description} onChange={this.handleChange} />
              <button type='submit'>Submit</button>
              <Link to='/admin/products'>Cancel</Link>
            </form>
          </div>
        ) : (
          <p>404 Page Not Found!</p>
        )}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    addProduct: (product) => dispatch(addProduct(product, history))
  }
}

export default connect(mapState, mapDispatch)(AddProduct);
