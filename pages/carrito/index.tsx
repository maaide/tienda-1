import CartContext from '@/context/cart/CartContext'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { ProductList, ShippingCart } from '../../components/products'
import { Spinner } from '../../components/ui'
import { useProducts } from '../../hooks'
import { ICartProduct } from '../../interfaces'
import { NumberFormat } from '../../utils'

const CartPage = () => {

  const [cartProducts, setCartProducts] = useState<ICartProduct[]>()
  const [shippingCost, setShippingCost] = useState(0)
  const {setCart} = useContext(CartContext)

  useEffect(() => {
    setCartProducts(JSON.parse(localStorage.getItem('cart')!))
  }, [])

  const { products, isLoadingProducts } = useProducts('/products')

  return (
    <>
      <Head>
        <title>Carrito</title>
      </Head>
      <div className='p-4 flex'>
        <div className='m-auto w-1280'>
          <h1 className='text-[20px] font-semibold mb-4 md:text-[25px]'>CARRITO</h1>
          <div className='block gap-8 1010:flex'>
            <div className='w-full 1010:w-7/12'>
              {
                cartProducts?.length
                  ? cartProducts?.map(product => (
                    <div className='flex gap-4 mb-2 justify-between' key={product._id}>
                      <div className='flex gap-2'>
                        <Link href={`/productos/${product.slug}`}>
                          <img className='w-28 rounded-md 450:w-32' src={product.image} />
                        </Link>
                        <div className='mt-auto mb-auto'>
                          <Link href={`/productos/${product.slug}`}>
                            <h2 className='text-[#1B1B1B] dark:text-neutral-100'>{product.name}</h2>
                          </Link>
                          <div className='flex gap-2'>
                            <span className='font-medium'>${NumberFormat(product.price)}</span>
                            {
                              product.beforePrice
                                ? <span className='text-sm font-light line-through text-[#444444] dark:text-neutral-400'>${NumberFormat(product.beforePrice)}</span>
                                : ''
                            }
                          </div>
                          {
                            product.variation
                              ? <span className='font-light text-[#444444] dark:text-neutral-400'>{product.variation.variation}</span>
                              : ''
                          }
                        </div>
                      </div>
                      <div className='flex gap-4'>
                        <div className='flex border border-main w-fit h-fit mt-auto mb-auto rounded-md'>
                          {
                            product.quantity > 1
                            ? <button className='pt-1 pb-1 pl-3 pr-2 text-main text-sm' onClick={() => {
                              const index = cartProducts.findIndex((item: ICartProduct) => item === product)
                              const productEdit: ICartProduct = cartProducts[index]
                              const updateProduct: ICartProduct = { ...productEdit, quantity: productEdit.quantity - 1 }
                              cartProducts[index] = updateProduct
                              const updateCart = JSON.stringify(cartProducts)
                              localStorage.setItem('cart', updateCart)
                              setCart(JSON.parse(localStorage.getItem('cart')!))
                              setCartProducts(JSON.parse(localStorage.getItem('cart')!))
                            }}>-</button>
                            : <button className='pt-1 pb-1 pl-3 pr-2 text-main/50 cursor-not-allowed text-sm'>-</button>
                          }
                          <span className='text-main m-auto w-4 text-center text-sm'>{product.quantity}</span>
                          {
                            product.quantity < product.stock!
                            ? <button className='pt-1 pb-1 pl-2 pr-3 text-main text-sm' onClick={() => {
                              const index = cartProducts.findIndex((item: ICartProduct) => item === product)
                              const productEdit: ICartProduct = cartProducts[index]
                              const updateProduct: ICartProduct = { ...productEdit, quantity: productEdit.quantity + 1 }
                              cartProducts[index] = updateProduct
                              const updateCart = JSON.stringify(cartProducts)
                              localStorage.setItem('cart', updateCart)
                              setCart(JSON.parse(localStorage.getItem('cart')!))
                              setCartProducts(JSON.parse(localStorage.getItem('cart')!))
                            }}>+</button>
                            : <button className='pt-1 pb-1 pl-2 pr-3 text-main/50 cursor-not-allowed'>+</button>
                          }
                        </div>
                        <button onClick={() => {
                          const cartProduct = JSON.parse(localStorage.getItem('cart')!)
                          const productSelect = cartProduct.filter((item: ICartProduct) => item.name === product.name)
                          if (productSelect.length >= 2) {
                            const products = cartProduct.filter((item: ICartProduct) => item.variation?.variation !== product.variation?.variation)
                            localStorage.setItem('cart', JSON.stringify(products))
                            setCart(products)
                            setCartProducts(products)
                          } else {
                            const products = cartProduct.filter((item: ICartProduct) => item.name !== product.name)
                            localStorage.setItem('cart', JSON.stringify(products))
                            setCart(products)
                            setCartProducts(products)
                          }
                        }}>
                          <IoCloseOutline className='mt-auto mb-auto text-xl' />
                        </button>
                      </div>
                    </div>
                  ))
                  : (
                    <div>
                      <p className='font-light mb-4'>No tienes productos agregados al carrito</p>
                      <Link href='/tienda' className='pt-1.5 pb-1.5 pl-4 pr-4 rounded-md bg-main text-white'>Ir a la tienda</Link>
                    </div>
                  )
              }
            </div>
            <div className='w-full 1010:w-5/12'>
              <div className='bg-[#F5F5F5] p-4 border border-[#F5F5F5] 450:p-6 dark:bg-neutral-800 dark:border-neutral-700'>
                <div className='mb-2 pb-2 border-b dark:border-neutral-700'>
                  <div className='mb-4 border-b pb-4 dark:border-neutral-700'>
                    <ShippingCart setShippingCost={setShippingCost} />
                  </div>
                  <div className='flex gap-2 justify-between mb-1'>
                    <span>Subtotal</span>
                    {
                      cartProducts?.length
                        ? <span>${NumberFormat(cartProducts.reduce((bef, curr) => bef + curr.price * curr.quantity, 0))}</span>
                        : ''
                    }
                  </div>
                  <div className='flex gap-2 justify-between'>
                    <span>Envío</span>
                    <span>${NumberFormat(shippingCost)}</span>
                  </div>
                </div>
                <div className='flex gap-2 justify-between'>
                  <span className='font-medium'>Total</span>
                  {
                    cartProducts?.length
                      ? <span className='font-medium'>${NumberFormat(cartProducts.reduce((bef, curr) => bef + curr.price * curr.quantity, 0) + Number(shippingCost))}</span>
                      : ''
                  }
                </div>
                <div className='mt-3 ml-auto w-full flex'>
                  <Link className='pt-1.5 pb-1.5 w-full rounded-md bg-button text-white' href='/finalizar-compra'><button className='w-full'>Finalizar compra</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        isLoadingProducts
          ? (
            <div className="flex w-full">
              <div className="m-auto mt-16 mb-16">
                <Spinner />
              </div>
            </div>
          )
          : <ProductList products={ products } title='MÁS VENDIDOS' />
      }
    </>
  )
}

export default CartPage