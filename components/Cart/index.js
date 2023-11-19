import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import CartItemsContext from '../../Context/CartItemsContext'
import './index.css'

const apiStatusContests = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class Cart extends Component {
  state = {
    isPaymentSuccessful: false,
  }

  onPlaceOrder = () => {
    this.setState({isPaymentSuccessful: true})
  }

  renderCartItems = () => (
    <>
      <CartItemsContext.Consumer>
        {value => {
          const {cartItems} = value

          return cartItems.length >= 1 ? (
            <div className="cart-items-box">
              <div className="t-header">
                <h1 className="t-h-item">Item</h1>
                <h1 className="t-h-item">Quantity</h1>
                <h1 className="t-h-item">Price</h1>
              </div>
              <ul className="cart-items-list">
                {cartItems.map(eachItem => (
                  <CartItem productItem={eachItem} key={eachItem.id} />
                ))}
                <hr className="cart-items-line" />
              </ul>
              <div className="total-price-box">
                <h1 className="order-total-text">Order Total:</h1>
                <div className="box">
                  <h1 className="total-price">
                    <BiRupee />
                  </h1>
                </div>
              </div>
              <div className="plaord-ref-btn-box">
                <button
                  type="button"
                  className="place-order-btn"
                  onClick={this.onRefresh}
                >
                  Refresh
                </button>
                <button
                  type="button"
                  className="place-order-btn"
                  onClick={this.onPlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          ) : (
            this.renderEmptyCartView()
          )
        }}
      </CartItemsContext.Consumer>
      <Footer />
    </>
  )

  renderEmptyCartView = () => (
    <div className="empty-cart-box">
      <img
        src="https://res.cloudinary.com/dtmvgpr2l/image/upload/v1699981982/cooking_1_peu7iu.png"
        alt="empty cart"
        className="bowl-image"
      />
      <h1 className="no-orders-text">No Order Yet!</h1>
      <p className="cart-empty-text">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="order-btn">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderPaymentSuccessView = () => (
    <div className="payment-container">
      <img
        src="https://res.cloudinary.com/dtmvgpr2l/image/upload/v1699982036/check-circle.1_1_c1pilm.png"
        alt="payment success"
        className="pay-success-img"
      />
      <h1 className="pay-success-text">Payment Successful</h1>
      <p className="thanks-text">
        Thank you for ordering.
        <br />
        Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="go-to-home-btn">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderCartRoutePageView = () => {
    const {isPaymentSuccessful} = this.state
    return isPaymentSuccessful
      ? this.renderPaymentSuccessView()
      : this.renderCartItems()
  }

  render() {
    return (
      <div className="cart-container">
        <Header />
        <div className="cart-responsive-box">
          {this.renderCartRoutePageView()}
        </div>
      </div>
    )
  }
}

export default Cart
