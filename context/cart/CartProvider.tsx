import React, { PropsWithChildren, useState, useEffect } from 'react'
import { ICartProduct } from '../../interfaces'
import CartContext from './CartContext'

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const [cart, setCart] = useState<ICartProduct[]>()

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')!))
  }, [])

  return (
    <CartContext.Provider value={{
      cart,
      setCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider