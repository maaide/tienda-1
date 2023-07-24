import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useState } from 'react'
import CartContext from '../../context/cart/CartContext'
import { ICartProduct } from '../../interfaces'

interface Props {
  tempCartProduct: ICartProduct
}

export const Button2AddToCart: React.FC<Props> = ({ tempCartProduct }) => {

  const {setCart} = useContext(CartContext)
  const [text, setText] = useState('Añadir al carrito')

  const addToCart = async () => {
    setText('Producto añadido')
    if (localStorage.getItem('cart')) {
      const cart: ICartProduct[] = JSON.parse(localStorage.getItem('cart')!)
      if (cart.find((product: ICartProduct) => product.name === tempCartProduct.name)) {
        const productSelect = cart.find((product: ICartProduct) => product.name === tempCartProduct.name)
        if (productSelect?.variation?.variation === tempCartProduct.variation?.variation) {
          const productIndex = cart.findIndex((product: ICartProduct) => product.name === tempCartProduct.name)
          cart[productIndex].quantity = tempCartProduct.quantity + cart[productIndex].quantity
          localStorage.setItem('cart', JSON.stringify(cart))
          setCart(JSON.parse(localStorage.getItem('cart')!))
          console.log(1)
        } else {
          const cartFinal = cart.concat(tempCartProduct)
          localStorage.setItem('cart', JSON.stringify(cartFinal))
          setCart(JSON.parse(localStorage.getItem('cart')!))
          console.log(2)
        }
      } else {
        const cartFinal = cart.concat(tempCartProduct)
        localStorage.setItem('cart', JSON.stringify(cartFinal))
        setCart(JSON.parse(localStorage.getItem('cart')!))
        console.log(3)
      }
    } else {
      localStorage.setItem('cart', `[${JSON.stringify(tempCartProduct)}]`)
      setCart(JSON.parse(localStorage.getItem('cart')!))
      console.log(4)
    }
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/add-cart`, { name: tempCartProduct.name, price: tempCartProduct.price, quantity: tempCartProduct.quantity, category: tempCartProduct.category, fbp: Cookies.get('_fbp'), fbc: Cookies.get('_fbc') })
    setTimeout(() => {
      setText('Añadir al carrito')
    }, 3000)
  }

  return (
    <button onClick={addToCart} className='pt-1.5 pb-1.5 rounded-md bg-button text-white text-sm pl-3 pr-3 450:pr-6 450:pl-6 580:pr-8 580:pl-8'>
      {text}
    </button>
  )
}
