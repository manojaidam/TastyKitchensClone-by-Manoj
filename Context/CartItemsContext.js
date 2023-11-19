import React from 'react'

const CartItemsContext = React.createContext({
  cartItems: [],
  setCartItems: () => {},
  updateQuantity: () => {},
  onDeleteItem: () => {},
})

export default CartItemsContext
