import Link from 'next/link'
import React, { useContext } from 'react'
import { ICartProduct } from '../../interfaces'
import { NumberFormat } from '../../utils'
import { IoCloseOutline } from 'react-icons/io5'
import CartContext from '../../context/cart/CartContext'

interface Props {
  setCartView: any
  setCartPc?: any
}

export const NavbarCart: React.FC<Props> = ({ setCartView, setCartPc }) => {

  const {cart, setCart} = useContext(CartContext)

  return (
    <div onMouseEnter={() => setCartPc(false)} onMouseLeave={() => setCartPc(true)} className={`ml-auto p-4 rounded-md shadow-md bg-white z-40 w-full dark:bg-neutral-900 dark:border dark:border-neutral-800 400:w-96`}>
      <h4 className='text-center mb-3 font-semibold pb-2 border-b w-full dark:border-neutral-800 text-[16px]'>CARRITO</h4>
      {
        cart?.length
          ? <>
            {
              cart.map((product: ICartProduct) => (
                <div key={product.slug} className='flex gap-1 justify-between mb-2'>
                  <div className='flex gap-2'>
                    <Link href={`/productos/${product.slug}`} onClick={() => setCartView('hidden')}>
                      <img src={product.image} className='w-24 h-24 mt-auto mb-auto' />
                    </Link>
                    <div className='mt-auto mb-auto'>
                      <Link href={`/productos/${product.slug}`} onClick={() => setCartView('hidden')}><h3 className='text-[16px] text-[#1B1B1B] dark:text-neutral-100'>{product.name}</h3></Link>
                      <div className='flex gap-1 mb-1'>
                        <span className='font-medium'>${NumberFormat(product.price)}</span>
                        {
                          product.beforePrice
                            ? <span className='font-light text-sm line-through text-[#444444] dark:text-neutral-400'>${NumberFormat(product.beforePrice)}</span>
                            : ''
                        }
                      </div>
                      <div className='flex border border-[#444444] w-fit rounded-md dark:border-neutral-500'>
                        {
                          product.quantity > 1
                            ? <button className='pt-1 pb-1 pl-3 pr-2 text-[#444444] text-sm dark:text-neutral-500' onClick={() => {
                              const index = cart.findIndex((item: ICartProduct) => item === product)
                              const productEdit: ICartProduct = cart[index]
                              const updateProduct: ICartProduct = { ...productEdit, quantity: productEdit.quantity - 1 }
                              cart[index] = updateProduct
                              const updateCart = JSON.stringify(cart)
                              localStorage.setItem('cart', updateCart)
                              setCart(JSON.parse(localStorage.getItem('cart')!))
                            }}>-</button>
                            : <button className='pt-1 pb-1 pl-3 pr-2 text-[#444444]/50 cursor-not-allowed text-sm  dark:text-neutral-500/50'>-</button>
                        }
                        <span className='text-[#444444] m-auto w-4 text-center text-sm dark:text-neutral-500'>{product.quantity}</span>
                        {
                          product.quantity < product.stock!
                            ? <button className='pt-1 pb-1 pl-2 pr-3 text-[#444444] text-sm dark:text-neutral-500' onClick={() => {
                              const index = cart.findIndex((item: ICartProduct) => item === product)
                              const productEdit: ICartProduct = cart[index]
                              const updateProduct: ICartProduct = { ...productEdit, quantity: productEdit.quantity + 1 }
                              cart[index] = updateProduct
                              const updateCart = JSON.stringify(cart)
                              localStorage.setItem('cart', updateCart)
                              setCart(JSON.parse(localStorage.getItem('cart')!))
                            }}>+</button>
                            : <button className='pt-1 pb-1 pl-2 pr-3 text-[#444444]/50 cursor-not-allowed text-sm dark:text-neutral-400/50'>+</button>
                        }
                      </div>
                    </div>
                  </div>
                  <button onClick={() => {
                    const cartProduct = JSON.parse(localStorage.getItem('cart')!)
                    const productSelect = cartProduct.filter((item: ICartProduct) => item.name === product.name)
                    if (productSelect.length >= 2) {
                      const products = cartProduct.filter((item: ICartProduct) => item.variation?.variation !== product.variation?.variation)
                      localStorage.setItem('cart', JSON.stringify(products))
                      setCart(products)
                    } else {
                      const products = cartProduct.filter((item: ICartProduct) => item.name !== product.name)
                      localStorage.setItem('cart', JSON.stringify(products))
                      setCart(products)
                    }
                  }}>
                    <IoCloseOutline className='mt-auto mb-auto text-xl' />
                  </button>
                </div>
              ))
            }
            <div className='mt-4'>
              <Link className='pt-1.5 pb-1.5 rounded-md bg-button text-white' onClick={() => setCartView('hidden')} href='/finalizar-compra'><button className='w-full'>Finalizar compra</button></Link>
              <Link href='/carrito' onClick={() => setCartView('hidden')}><button className='w-full mt-4 underline font-light text-[#444444] dark:text-neutral-400'>Ir al carrito</button></Link>
            </div>
          </>
          : <>
            <p className='font-light mb-4 text-[#444444] dark:text-neutral-400'>No tienes productos añadidos al carrito</p>
            <Link className='pt-1.5 pb-1.5 rounded-md bg-main text-white' href='/tienda' onClick={() => setCartView('hidden')}><button className='w-full'>Ir a la tienda</button></Link>
          </>
      }
    </div>
  )
}
