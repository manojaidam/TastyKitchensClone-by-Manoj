import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import Cart from './components/Cart'
import RestaurantDetailsRoute from './components/RestaurantDetailsRoute'
import CartItemsContext from './Context/CartItemsContext'
import './App.css'
import PageNotFound from './components/PageNotFound'

class App extends Component {
  state = {
    cartItems: [],
  }

  setCartItems = newProduct => {
    this.setState(prevState => ({
      cartItems: [...prevState.cartItems, newProduct],
    }))
  }

  onDeleteItem = id => {
    const {cartItems} = this.state
    const updatedData = cartItems.filter(each => each.id !== id)
    this.setState({cartItems: updatedData})
  }

  render() {
    const {cartItems} = this.state
    return (
      <CartItemsContext.Provider
        value={{
          cartItems,
          setCartItems: this.setCartItems,
          onDeleteItem: this.onDeleteItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetailsRoute}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/not-found" component={PageNotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartItemsContext.Provider>
    )
  }
}

export default App
