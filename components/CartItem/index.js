import {Component} from 'react'
import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'
import Popup from 'reactjs-popup'
import {BiRupee} from 'react-icons/bi'
import {MdDeleteOutline} from 'react-icons/md'
import CartItemsContext from '../../Context/CartItemsContext'
import './index.css'

class CartItem extends Component {
  state = {
    quantity: 1,
  }

  onIncrement = () => {
    this.setState(prev => ({quantity: prev.quantity + 1}))
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prev => ({quantity: prev.quantity - 1}))
    }
  }

  render() {
    const {quantity} = this.state
    const {productItem} = this.props
    const {imageUrl, name, cost, restaurantName, id} = productItem
    return (
      <CartItemsContext.Consumer>
        {value => {
          const {onDeleteItem} = value
          const onDeleteCartItem = () => {
            onDeleteItem(id)
          }
          return (
            <li className="cart-item">
              <div className="image-name-box">
                <img
                  src={imageUrl}
                  alt="cart-img"
                  className="cart-item-image"
                />
                <div>
                  <h2 className="cart-item-name">{name}</h2>
                  <h5 className="cart-item-rest-name">from {restaurantName}</h5>
                </div>
              </div>
              <div className="quantity-box">
                <AiOutlineMinusSquare
                  className="cart-item-quantity-icon"
                  onClick={this.onDecrement}
                />
                <h4 className="cart-item-quantity">{quantity}</h4>
                <AiOutlinePlusSquare
                  className="cart-item-quantity-icon"
                  onClick={this.onIncrement}
                />
              </div>
              <div className="cart-price-box">
                <h1 className="cart-item-price">
                  <BiRupee /> {quantity * cost}
                </h1>
              </div>
              <img
                src={imageUrl}
                alt="cart img"
                className="mob-cart-item-image"
              />
              <div className="cart-item-details">
                <h1 className="cart-item-name">{name}</h1>
                <h5 className="cart-item-rest-name">from {restaurantName}</h5>
                <div className="mob-cart-quantity-box">
                  <AiOutlineMinusSquare
                    className="cart-item-quantity-icon"
                    onClick={this.onDecrement}
                  />
                  <h4 className="cart-item-quantity">{quantity}</h4>
                  <AiOutlinePlusSquare
                    className="cart-item-quantity-icon"
                    onClick={this.onIncrement}
                  />
                </div>
                <h1 className="cart-item-price">
                  <BiRupee /> {quantity * cost}
                </h1>
              </div>
              <Popup
                modal
                className="popup-content"
                trigger={<MdDeleteOutline className="delete-icon" />}
              >
                {close => (
                  <div className="logout-popup-box">
                    <h2 className="are-you-sure-text">
                      Are you sure you want to delete {name} ?
                    </h2>
                    <div className="buttons-box">
                      <button
                        type="button"
                        className="btn cancel"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn confirm"
                        onClick={onDeleteCartItem}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </li>
          )
        }}
      </CartItemsContext.Consumer>
    )
  }
}

export default CartItem
