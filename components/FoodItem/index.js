import {Component} from 'react'
import './index.css'
import {withRouter} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import {
  AiFillStar,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from 'react-icons/ai'
import CartItemsContext from '../../Context/CartItemsContext'

class FoodItem extends Component {
  state = {
    quantity: 1,
    isShowQuantity: false,
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity >= 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    } else {
      this.setState({isShowQuantity: false})
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    const {restaurantItems} = this.props
    const {isShowQuantity} = this.state
    const {id, name, cost, foodType, imageUrl, rating} = restaurantItems
    return (
      <CartItemsContext.Consumer>
        {value => {
          const {cartItems, setCartItems} = value
          const {quantity} = this.state

          const onAddItemToCart = () => {
            const product = {...restaurantItems, quantity}
            setCartItems(product)
            const {history} = this.props
            history.replace('/cart')
          }

          return (
            <li className="food-item" data-testid="foodItem">
              <img src={imageUrl} alt="food item" className="food-item-image" />
              <div className="food-item-details">
                <h1 className="food-item-name">{name}</h1>
                <p className="food-item-cost">
                  <BiRupee /> {cost}
                </p>
                <p className="food-item-rating">
                  <AiFillStar className="star" /> {rating}
                </p>
                {isShowQuantity === true ? (
                  <div className="quantity-box" data-testid="active-count">
                    {/* <button
                      type="button"
                      data-testid="decrement-count"
                      onClick={this.onDecrement}
                    > */}
                    <AiOutlineMinusSquare
                      onClick={this.onDecrement}
                      className="cart-item-quantity-icon"
                    />
                    {/* </button> */}

                    <p
                      className="cart-item-quantity"
                      data-testid="active-count"
                    >
                      {quantity}
                    </p>
                    {/* <button
                      type="button"
                      onClick={this.onIncrement}
                      data-testid="increment-count"
                    > */}
                    <AiOutlinePlusSquare
                      className="cart-item-quantity-icon"
                      onClick={this.onIncrement}
                    />
                    {/* </button> */}
                  </div>
                ) : (
                  <button
                    type="button"
                    className="add-item-btn"
                    onClick={onAddItemToCart}
                  >
                    Add
                  </button>
                )}
              </div>
            </li>
          )
        }}
      </CartItemsContext.Consumer>
    )
  }
}

export default withRouter(FoodItem)
