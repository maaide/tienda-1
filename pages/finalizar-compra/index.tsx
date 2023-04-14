import React, { useState, useEffect } from 'react'
import { Shipping } from '../../components/products'
import { Button2 } from '../../components/ui'
import { ICartProduct, ISell, IShipping } from '../../interfaces'
import { FreeShipping, NumberFormat } from '../../utils'
import Link from 'next/link'
import { AiOutlineLeft, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import Head from 'next/head'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Spinner2 } from '../../components/ui'
import { useRouter } from 'next/router'

const CheckOut = () => {

  const [sell, setSell] = useState<ISell>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    region: '',
    city: '',
    cart: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')!) : [],
    shipping: 0,
    pay: '',
    state: 'Pago iniciado',
    total: 0,
    fbp: Cookies.get('_fbp'),
    fbc: Cookies.get('_fbc'),
    shippingMethod: '',
    shippingState: ''
  })
  const [cart, setCart] = useState<ICartProduct[]>()
  const [shipping, setShipping] = useState<IShipping[]>()
  const [details, setDetails] = useState('hidden')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')

  const router = useRouter()

  const getCart = async () => {
    if (typeof window !== 'undefined') {
      const cartLocal = JSON.parse(localStorage.getItem('cart')!)
      setCart(cartLocal)
      setSell({ ...sell, total: cartLocal.reduce((bef: any, curr: any) => bef + curr.price * curr.quantity, 0) })
      await axios.post('https://server-production-e234.up.railway.app/information', { cart: cartLocal, fbp: Cookies.get('_fbp'), fbc: Cookies.get('_fbc') })
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  const inputChange = async (e: any) => {
    setSell({ ...sell, [e.target.name]: e.target.value })
    if (e.target.name === 'pay' && e.target.value === 'WebPay Plus') {
      const pago = {
        buyOrder: `blaspod${Math.floor(Math.random() * 10000) + 1}`,
        sessionId: `S-${Math.floor(Math.random() * 10000) + 1}`,
        amount: sell.total,
        returnUrl: 'https://blaspod.cl'
      }
      const response = await axios.post('https://server-production-e234.up.railway.app/pay/create', pago)
      setToken(response.data.token)
      setUrl(response.data.url)
    }
  }

  const payChange = (e: any) => {
    setSell({...sell, state: 'No pagado', [e.target.name]: e.target.value})
  }

  const shippingChange = (e: any) => {
    const cartLocal = JSON.parse(localStorage.getItem('cart')!)
    setSell({ ...sell, shippingMethod: e.target.className, shipping: e.target.value, shippingState: 'No empaquetado', total: cartLocal.reduce((bef: any, curr: any) => bef + curr.price * curr.quantity, 0) + Number(e.target.value) })
  }

  const transbankSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitLoading(true)
    await axios.post('https://server-production-e234.up.railway.app/sells', sell)
    const form = document.getElementById('formTransbank') as HTMLFormElement
    if (form) {
      form.submit()
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitLoading(true)
    await axios.post('https://server-production-e234.up.railway.app/sells', sell)
    router.push('/gracias-por-comprar')
  }

  return (
    <>
      <Head>
        <title>Finalizar compra</title>
      </Head>
      <div className='sticky top-14 bg-[#F5F5F5] w-full border border-[#F5F5F5] p-4 shadow-md block 1010:hidden dark:bg-neutral-800 dark:border-neutral-700'>
        <button className='text-[14px] mb-4 flex gap-2' onClick={() => details === 'hidden' ? setDetails('block') : setDetails('hidden')}>{details === 'hidden' ? <AiOutlineDown className='mt-auto mb-auto' /> : <AiOutlineUp className='mt-auto mb-auto' /> } {details === 'hidden' ? 'Mostrar' : 'Ocultar'} resumen del pedido</button>
        <div className={`mb-2 ${details}`}>
          <h2 className='text-[16px] mb-2 md:text-[18px]'>Carrito</h2>
          {
            cart?.length !== 0
              ? cart?.map(product => (
                <div className='flex gap-2 justify-between mb-2' key={product._id}>
                  <div className='flex gap-2'>
                    <img className='w-20 border rounded-md p-1 dark:border-neutral-700' src={product.image} />
                    <div className='mt-auto mb-auto'>
                      <span>{product.name}</span>
                      {
                        product.variation
                          ? <span className='block'>{product.variation.variation}</span>
                          : ''
                      }
                    </div>
                  </div>
                  <div className='flex gap-2 mt-auto mb-auto'>
                    <span className='font-medium'>${NumberFormat(product.price * product.quantity)}</span>
                    {
                      product.beforePrice
                        ? <span className='text-sm line-through'>${NumberFormat(product.beforePrice * product.quantity)}</span>
                        : ''
                    }
                  </div>
                </div>
              ))
              : ''
          }
          <div className='pb-3 border-b dark:border-neutral-700'>
            <h2 className='mb-2 text-[16px] md:text-[18px]'>Cupon de descuento</h2>
            <div className='flex gap-2'>
              <input type='text' placeholder='Cupon' className='border text-[14px] p-1 rounded w-72 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              <Button2>Agregar</Button2>
            </div>
          </div>
          <div className='mt-2 mb-2 pb-2 border-b dark:border-neutral-700'>
            <div className='flex gap-2 justify-between mb-1'>
              <span className='text-[14px]'>Subtotal</span>
              <span className='text-[14px]'>${NumberFormat(sell.cart.reduce((bef, curr) => bef + curr.price * curr.quantity, 0))}</span>
            </div>
            <div className='flex gap-2 justify-between'>
              <span className='text-[14px]'>Envío</span>
              <span className='text-[14px]'>${NumberFormat(Number(sell.shipping))}</span>
            </div>
          </div>
        </div>
        <div className='flex gap-2 justify-between'>
          <span className='font-medium'>Total</span>
          <span className='font-medium'>${NumberFormat(sell.cart.reduce((bef, curr) => bef + curr.price * curr.quantity, 0) + Number(sell.shipping))}</span>
        </div>
      </div>
      <div className='flex p-4'>
        <form className='w-1280 m-auto block 1010:flex' id='formBuy'>
          <div className='w-full pr-0 1010:w-7/12 1010:pr-8'>
            <h1 className='text-[20px] text-main tracking-widest mb-6 font-semibold md:text-[25px] dark:text-white'>FINALIZAR COMPRA</h1>
            <div className='mb-6'>
              <h2 className='text-[16px] tracking-widest font-semibold mb-2 md:text-[18px]'>INFORMACIÓN DE CONTACTO</h2>
              <input type='email' placeholder='Email' name='email' onChange={inputChange} className='border mb-2 p-2 rounded w-full text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              <div className='flex gap-2'>
                <input type='checkbox' />
                <span className='text-sm'>Suscribirse a nuestra lista de emails</span>
              </div>
            </div>
            <div className='mb-6'>
              <h2 className='mb-2 tracking-widest font-semibold text-[16px] md:text-[18px]'>DIRECCIÓN DE ENVÍO</h2>
              <Shipping setShipping={setShipping} sell={sell} setSell={setSell} />
              <div className='flex gap-2 mb-2'>
                <input type='text' placeholder='Nombre' name='firstName' onChange={inputChange} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                <input type='text' placeholder='Apellido' name='lastName' onChange={inputChange} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <input type='text' placeholder='Dirección' name='address' onChange={inputChange} className='border text-sm p-2 rounded w-full mb-2 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              <input type='text' placeholder='Departamento (Opcional)' name='details' onChange={inputChange} className='border text-sm p-2 rounded w-full mb-2 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              <div className='flex gap-2'>
                <span className='mt-auto mb-auto text-sm'>+56</span>
                <input type='text' placeholder='Teléfono' name='phone' onChange={inputChange} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
            </div>
            {
              shipping !== undefined
                ? (
                  <div className='mb-6'>
                    <h2 className='mb-2 tracking-widest font-semibold text-[16px] md:text-[18px]'>ENVÍO</h2>
                    <div className='flex flex-col gap-1'>
                      {
                        FreeShipping.find(free => free === sell.city)
                          ? (
                            <div className='flex gap-2 justify-between p-2 border rounded-md dark:border-neutral-700'>
                              <div className='flex gap-2'>
                                <input type='radio' name='shipping' className='ENVIO EXPRESS' value='0' onChange={shippingChange} />
                                <p className='text-sm mt-auto mb-auto'>Envío express</p>
                              </div>
                              <p className='text-sm'>$0</p>
                            </div>
                          )
                          : ''
                      }
                      {
                        shipping.map(item => (
                            <div className='flex gap-2 justify-between p-2 border rounded-md dark:border-neutral-700' key={item.serviceDescription}>
                              <div className='flex gap-2'>
                                <input type='radio' name='shipping' className={item.serviceDescription} value={item.serviceValue} onChange={shippingChange} />
                                <p className='text-sm mt-auto mb-auto'>{item.serviceDescription}</p>
                              </div>
                              <p className='text-sm'>${NumberFormat(Number(item.serviceValue))}</p>
                            </div>
                          ))
                      }
                    </div>
                  </div>
                )
                : ''
            }
            {
              sell.shippingMethod
                ? (
                  <div className='mb-6'>
                    <h2 className='text-[16px] tracking-widest font-semibold mb-2 md:text-[18px]'>PAGO</h2>
                    {
                      sell.shippingMethod === 'ENVIO EXPRESS'
                        ? (
                          <div className='flex gap-2 p-3 border rounded-md mb-1 dark:border-neutral-700'>
                            <input type='radio' name='pay' value='Pago en la entrega' onChange={payChange} />
                            <p className='text-sm'>Pago en la entrega</p>
                          </div>
                        )
                        : ''
                    }
                    <div className='flex gap-2 p-3 border rounded-md mb-1 dark:border-neutral-700'>
                      <input type='radio' name='pay' value='WebPay Plus' onChange={inputChange} />
                      <p className='text-sm'>WebPay Plus</p>
                    </div>
                    <div className='flex gap-2 p-3 border rounded-md dark:border-neutral-700'>
                      <input type='radio' name='pay' value='MercadoPago' onChange={inputChange} />
                      <p className='text-sm'>MercadoPago</p>
                    </div>
                  </div>
                )
                : ''
            }
            <div className='flex gap-2 justify-between mt-auto mb-auto'>
              <div className='mt-auto mb-auto'><Link href='/carrito'><span className='flex gap-2 text-sm'><AiOutlineLeft className='mt-auto mb-auto' />Regresar al carrito</span></Link></div>
              {
                sell.pay === ''
                  ? <button onClick={(e: any) => e.preventDefault()} className='w-24 h-9 rounded-md bg-button/50 text-white cursor-not-allowed'>{submitLoading ? <Spinner2 /> : 'Pagar'}</button>
                  : sell.pay === 'WebPay Plus'
                    ? (
                      <form action={url} method="POST" id='formTransbank'>
                        <input type="hidden" name="token_ws" value={token} />
                        <button onClick={transbankSubmit} className='w-24 h-9 rounded-md bg-button text-white cursor-pointer'>{submitLoading ? <Spinner2 /> : 'Pagar'}</button>
                      </form>
                    )
                    : sell.pay === 'Pago en la entrega'
                      ? <button onClick={handleSubmit} className='w-24 h-9 rounded-md bg-button text-white'>{submitLoading ? <Spinner2 /> : 'Pagar'}</button>
                      : <button onClick={(e: any) => e.preventDefault()} className='w-24 h-9 rounded-md bg-button/50 text-white cursor-not-allowed'>{submitLoading ? <Spinner2 /> : 'Pagar'}</button>
              }
            </div>
          </div>
          <div className='w-5/12 h-fit border border-[#F5F5F5] p-4 hidden sticky top-28 bg-[#F5F5F5] dark:border-neutral-700 dark:bg-neutral-800 1010:block'>
            <div className='mb-2 pb-2 border-b dark:border-neutral-700'>
              <h2 className='mb-2 text-[18px]'>Carrito</h2>
              {
                cart?.length !== 0
                  ? cart?.map(product => (
                    <div className='flex gap-2 justify-between mb-2' key={product._id}>
                      <div className='flex gap-2'>
                        <img className='w-20 border rounded-md p-1 dark:border-neutral-700' src={product.image} />
                        <div className='mt-auto mb-auto'>
                          <span className='block'>{product.name}</span>
                          <span className='block'>Cantidad: {product.quantity}</span>
                          {
                            product.variation
                              ? <span className='block'>Variación: {product.variation.variation}</span>
                              : ''
                          }
                        </div>
                      </div>
                      <div className='flex gap-2 mt-auto mb-auto'>
                        <span className='font-medium'>${NumberFormat(product.price * product.quantity)}</span>
                        {
                          product.beforePrice
                            ? <span className='text-sm line-through'>${NumberFormat(product.beforePrice * product.quantity)}</span>
                            : ''
                        }
                      </div>
                    </div>
                  ))
                  : ''
              }
            </div>
            <div className='mb-2 pb-3 border-b dark:border-neutral-700'>
              <h2 className='mb-2 text-[18px]'>Cupon de descuento</h2>
              <div className='flex gap-2'>
                <input type='text' placeholder='Cupon' className='border p-1 rounded text-[14px] w-72 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                <Button2>Agregar</Button2>
              </div>
            </div>
            <div className='mb-2 pb-2 border-b dark:border-neutral-700'>
              <div className='flex gap-2 justify-between mb-1'>
                <span className='text-[14px]'>Subtotal</span>
                <span className='text-[14px]'>${NumberFormat(sell.cart.reduce((bef, curr) => bef + curr.price * curr.quantity, 0))}</span>
              </div>
              <div className='flex gap-2 justify-between'>
                <span className='text-[14px]'>Envío</span>
                <span className='text-[14px]'>${NumberFormat(Number(sell.shipping))}</span>
              </div>
            </div>
            <div className='flex gap-2 justify-between'>
              <span className='font-medium'>Total</span>
              <span className='font-medium'>${NumberFormat(sell.cart.reduce((bef, curr) => bef + curr.price * curr.quantity, 0) + Number(sell.shipping))}</span>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CheckOut