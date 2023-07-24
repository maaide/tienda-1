import React, { useState, useEffect } from 'react'
import { Shipping } from '../../components/products'
import { Button2 } from '../../components/ui'
import { ICartProduct, IClient, IQuantityOffer, ISell, IShipping, IStoreData } from '../../interfaces'
import { NumberFormat } from '../../utils'
import Link from 'next/link'
import Head from 'next/head'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Spinner2 } from '../../components/ui'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const CheckOut = () => {

  const [sell, setSell] = useState<ISell>({
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    email: Cookies.get('email') || '',
    address: Cookies.get('address') || '',
    region: Cookies.get('region') || '',
    city: Cookies.get('city') || '',
    cart: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')!) : [],
    shipping: 0,
    pay: '',
    state: 'Pago iniciado',
    total: 0,
    fbp: Cookies.get('_fbp'),
    fbc: Cookies.get('_fbc'),
    shippingMethod: '',
    shippingState: '',
    subscription: false,
    phone: Number(Cookies.get('phone')) || undefined
  })
  const [cart, setCart] = useState<ICartProduct[]>()
  const [shipping, setShipping] = useState<IShipping[]>()
  const [details, setDetails] = useState('hidden')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [domain, setDomain] = useState('')
  const [storeData, setStoreData] = useState<IStoreData>()
  const [rotate, setRotate] = useState('rotate-90')
  const [saveData, setSaveData] = useState(false)
  const [contactView, setContactView] = useState('hidden')
  const [contactOpacity, setContactOpacity] = useState('opacity-0')
  const [contactMouse, setContactMouse] = useState(false)
  const [shippingView, setShippingView] = useState('hidden')
  const [shippingOpacity, setShippingOpacity] = useState('opacity-0')
  const [shippingMouse, setShippingMouse] = useState(false)

  const { data: session, status } = useSession()

  const user = session?.user as { firstName: string, lastName: string, email: string, _id: string }

  const router = useRouter()

  const getClientData = async () => {
    if (user) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-email/${user.email}`)
      const data: IClient = response.data
      if (data) {
        setSell({...sell, address: data.address ? data.address : '', city: data.city ? data.city : '', details: data.departament ? data.departament : '', email: data.email, firstName: data.firstName ? data.firstName : '', lastName: data.lastName ? data.lastName : '', phone: data.phone ? Number(data.phone) : undefined, region: data.region ? data.region : ''})
      }
    }
  }

  useEffect(() => {
    getClientData()
  }, [session])

  const getCart = async () => {
    if (typeof window !== 'undefined') {
      const cartLocal = JSON.parse(localStorage.getItem('cart')!)
      setCart(cartLocal)
      setSell({ ...sell, total: cartLocal.reduce((bef: any, curr: any) => bef + curr.price * curr.quantity, 0) })
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/information`, { cart: cartLocal, fbp: Cookies.get('_fbp'), fbc: Cookies.get('_fbc') })
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  const getDomain = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/domain`)
    setDomain(response.data.domain)
  }

  useEffect(() => {
    getDomain()
  }, [])

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    setStoreData(response.data)
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const inputChange = async (e: any) => {
    setSell({ ...sell, [e.target.name]: e.target.value })
    if (e.target.name === 'pay' && e.target.value === 'WebPay Plus') {
      const pago = {
        buyOrder: `${storeData?.name}${Math.floor(Math.random() * 10000) + 1}`,
        sessionId: `S-${Math.floor(Math.random() * 10000) + 1}`,
        amount: sell.total,
        returnUrl: `https://${domain}/procesando-pago`
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pay/create`, pago)
      setToken(response.data.token)
      setUrl(response.data.url)
    }
  }

  const offer = (product: ICartProduct) => {
    let offerPrice: IQuantityOffer = {descount: 0, quantity: 0}
    if (product.quantityOffers && product.quantity > 1) {
      const filter = product.quantityOffers.filter(offer => offer.quantity <= product.quantity)
      if (filter.length > 1) {
        offerPrice = filter.reduce((prev, current) => (prev.quantity > current.quantity) ? prev : current)
      } else {
        offerPrice = filter[0]
      }
    }
    const finalPrice = offerPrice !== undefined ? Math.floor((product.price * product.quantity) / 100) * (100 - offerPrice.descount) : product.price * product.quantity
    return finalPrice
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
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sells`, sell)
    localStorage.setItem('sell', JSON.stringify(sell))
    if (saveData) {
      Cookies.set('firstName', sell.firstName)
      Cookies.set('lastName', sell.lastName)
      Cookies.set('email', sell.email)
      if (sell.phone) {
        Cookies.set('phone', sell.phone.toString())
      }
      Cookies.set('address', sell.address)
      if (sell.details) {
        Cookies.set('details', sell.details)
      }
      Cookies.set('city', sell.city)
      Cookies.set('region', sell.region)
    }
    const form = document.getElementById('formTransbank') as HTMLFormElement
    if (form) {
      form.submit()
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sells`, sell)
    localStorage.setItem('sell', JSON.stringify(sell))
    if (saveData) {
      Cookies.set('firstName', sell.firstName)
      Cookies.set('lastName', sell.lastName)
      Cookies.set('email', sell.email)
      if (sell.phone) {
        Cookies.set('phone', sell.phone.toString())
      }
      Cookies.set('address', sell.address)
      if (sell.details) {
        Cookies.set('details', sell.details)
      }
      Cookies.set('city', sell.city)
      Cookies.set('region', sell.region)
    }
    router.push('/gracias-por-comprar')
    setSubmitLoading(false)
  }

  return (
    <>
      <Head>
        <title>Finalizar compra</title>
      </Head>
      <div onClick={() => {
        if (!contactMouse) {
          setContactOpacity('opacity-0')
          setTimeout(() => {
            setContactView('hidden')
          }, 200)
        }
      }} className={`${contactView} ${contactOpacity} transition-opacity duration-200 w-full h-full fixed z-50 bg-black/20`}>
        <div onMouseEnter={() => setContactMouse(true)} onMouseLeave={() => setContactMouse(false)} className={`m-auto p-6 bg-white flex flex-col gap-4 rounded-md shadow-md max-w-[500px] w-full`}>
          <h2 className='text-xl font-medium tracking-widest'>EDITAR DATOS DE CONTACTO</h2>
          <div className='flex gap-2'>
            <div className='flex flex-col w-1/2 gap-2'>
              <p className='text-sm'>Nombre</p>
              <input type='text' placeholder='Nombre' name='firstName' onChange={inputChange} value={sell.firstName} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
            </div>
            <div className='flex flex-col w-1/2 gap-2'>
              <p className='text-sm'>Apellido</p>
              <input type='text' placeholder='Apellido' name='lastName' onChange={inputChange} value={sell.lastName} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Teléfono</p>
            <div className='flex gap-2'>
              <span className='mt-auto mb-auto text-sm'>+56</span>
              <input type='text' placeholder='Teléfono' name='phone' onChange={inputChange} value={sell.phone} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
            </div>
          </div>
          <button onClick={(e: any) => {
            e.preventDefault()
            setContactOpacity('opacity-0')
            setTimeout(() => {
              setContactView('hidden')
            }, 200)
          }} className='w-full bg-main text-white h-10 tracking-widest font-medium'>GUARDAR DATOS</button>
        </div>
      </div>
      <div onClick={() => {
        if (!shippingMouse) {
          setShippingOpacity('opacity-0')
          setTimeout(() => {
            setShippingView('hidden')
          }, 200)
        }
      }} className={`${shippingView} ${shippingOpacity} transition-opacity duration-200 w-full h-full fixed z-50 bg-black/20`}>
        <div onMouseEnter={() => setShippingMouse(true)} onMouseLeave={() => setShippingMouse(false)} className={`m-auto p-6 bg-white flex flex-col gap-4 rounded-md shadow-md max-w-[500px] w-full`}>
          <h2 className='text-xl font-medium tracking-widest'>EDITAR DIRECCIÓN DE ENVÍO</h2>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Dirección</p>
            <input type='text' placeholder='Dirección' name='address' onChange={inputChange} value={sell.address} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Deptartamento</p>
            <input type='text' placeholder='Departamento (Opcional)' name='details' onChange={inputChange} value={sell.details} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          </div>
          <Shipping setShipping={setShipping} sell={sell} setSell={setSell} />
          <button onClick={(e: any) => {
            e.preventDefault()
            setShippingOpacity('opacity-0')
            setTimeout(() => {
              setShippingView('hidden')
            }, 200)
          }} className='w-full bg-main text-white h-10 tracking-widest font-medium'>GUARDAR DATOS</button>
        </div>
      </div>
      <div className='fixed top-13 bg-[#F5F5F5] w-full border border-[#F5F5F5] p-4 shadow-md block 1010:hidden dark:bg-neutral-800 dark:border-neutral-700'>
        <button className='text-[14px] mb-4 flex gap-2' onClick={() => {
          if (details === 'hidden') {
            setDetails('block')
            setRotate('-rotate-90')
          } else {
            setDetails('hidden')
            setRotate('rotate-90')
          }
        }}>{<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className={`${rotate} transition-all duration-150 m-auto w-4 text-lg text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>} resumen del pedido</button>
        <div className={`mb-2 ${details}`}>
          <div className='border-b mb-2 pb-1 dark:border-neutral-700'>
            <h2 className='text-[16px] font-medium tracking-widest mb-2 md:text-[18px]'>CARRITO</h2>
            {
              cart?.length !== 0
                ? cart?.map(product => (
                  <div className='flex gap-2 justify-between mb-2' key={product._id}>
                    <div className='flex gap-2'>
                      <Image className='w-20 h-20 m-auto border rounded-md p-1 dark:border-neutral-700' src={product.image} alt={product.name} width={80} height={80} />
                      <div className='mt-auto mb-auto'>
                        <span className='font-medium'>{product.name}</span>
                        {
                          product.variation
                            ? <span className='block'>{product.variation.variation}</span>
                            : ''
                        }
                        <span className='block'>Cantidad: {product.quantity}</span>
                      </div>
                    </div>
                    <div className='flex gap-2 mt-auto mb-auto'>
                      <span className='font-medium'>${NumberFormat(product.quantityOffers ? offer(product) : product.price * product.quantity)}</span>
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
          <div className='pb-3 border-b dark:border-neutral-700'>
            <h2 className='mb-2 font-medium tracking-widest text-[16px] md:text-[18px]'>CUPON DE DESCUENTO</h2>
            <div className='flex gap-2'>
              <input type='text' placeholder='Cupon' className='border text-[14px] p-1 rounded w-52 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              <Button2>Agregar</Button2>
            </div>
          </div>
          <div className='mt-2 mb-2 pb-2 border-b dark:border-neutral-700'>
            <div className='flex gap-2 justify-between mb-1'>
              <span className='text-[14px]'>Subtotal</span>
              <span className='text-[14px]'>${NumberFormat(sell.cart.reduce((bef, curr) => curr.quantityOffers ? offer(curr) : bef + curr.price * curr.quantity, 0))}</span>
            </div>
            <div className='flex gap-2 justify-between'>
              <span className='text-[14px]'>Envío</span>
              <span className='text-[14px]'>${NumberFormat(Number(sell.shipping))}</span>
            </div>
          </div>
        </div>
        <div className='flex gap-2 justify-between'>
          <span className='font-medium'>Total</span>
          <span className='font-medium'>${NumberFormat(sell.cart.reduce((bef, curr) => curr.quantityOffers ? offer(curr) : bef + curr.price * curr.quantity, 0) + Number(sell.shipping))}</span>
        </div>
      </div>
      <div className='mt-28 flex p-4 1010:mt-0'>
        <form className='w-1280 m-auto block 1010:flex' id='formBuy'>
          <div className='w-full pr-0 1010:w-7/12 1010:pr-8'>
            <h1 className='text-[20px] text-main tracking-widest mb-6 font-semibold md:text-[25px] dark:text-white'>FINALIZAR COMPRA</h1>
            {
              status === 'authenticated'
                ? (
                  <>
                    <div className='mb-6'>
                      <h2 className='text-[16px] text-main tracking-widest font-medium mb-2 md:text-[18px] dark:text-white'>INFORMACIÓN DE CONTACTO</h2>
                      <div className='bg-neutral-100 p-4 flex gap-2 justify-between dark:bg-neutral-800'>
                        <div className='flex flex-col gap-2'>
                          <p>Nombre: {sell?.firstName ? sell.firstName : 'Se necesita ingresar un nombre'}</p>
                          <p>Apellido: {sell?.lastName ? sell.lastName : 'Se necesita ingresar un apellido'}</p>
                          <p>Email: {sell?.email}</p>
                          <p>Teléfono: {sell?.phone ? sell.phone : 'Se necesita un numero de teléfono'}</p>
                        </div>
                        <button onClick={(e: any) => {
                          e.preventDefault()
                          setContactView('flex')
                          setTimeout(() => {
                            setContactOpacity('opacity-1')
                          }, 50)
                        }}>Editar datos</button>
                      </div>
                    </div>
                    <div className='mb-4'>
                      <h2 className='text-[16px] text-main tracking-widest font-medium mb-2 md:text-[18px] dark:text-white'>DIRECCIÓN DE ENVÍO</h2>
                      <div className='bg-neutral-100 p-4 flex gap-2 justify-between dark:bg-neutral-800'>
                        <div className='flex flex-col gap-2'>
                          <p>Dirección: {sell?.address ? sell.address : 'Se nececita una dirección'}</p>
                          <p>Detalles: {sell?.details ? sell.details : '-'}</p>
                          <p>Región: {sell?.region ? sell.region : 'Se necesita una región'}</p>
                          <p>Ciudad: {sell?.city ? sell.city : 'Se necesita una ciudad'}</p>
                        </div>
                        <button onClick={(e: any) => {
                          e.preventDefault()
                          setShippingView('flex')
                          setTimeout(() => {
                            setShippingOpacity('opacity-1')
                          }, 50)
                        }}>Editar datos</button>
                      </div>
                    </div>
                  </>
                )
                : (
                  <>
                    <div className='mb-6 flex flex-col gap-2'>
                      <h2 className='text-[16px] text-main tracking-widest font-medium md:text-[18px] dark:text-white'>INFORMACIÓN DE CONTACTO</h2>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Email</p>
                        <input type='email' placeholder='Email' name='email' onChange={inputChange} value={sell.email} className='border p-2 rounded w-full text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                      <div className='flex gap-2'>
                        <input type='checkbox' checked={sell.subscription} onChange={(e: any) => e.target.checked ? setSell({...sell, subscription: true}) : setSell({...sell, subscription: false})} />
                        <span className='text-sm text-neutral-400'>Suscribirse a nuestra lista de emails</span>
                      </div>
                    </div>
                    <div className='mb-6 flex flex-col gap-2'>
                      <h2 className='mb-2 text-main tracking-widest font-medium text-[16px] md:text-[18px] dark:text-white'>DIRECCIÓN DE ENVÍO</h2>
                      <div className='flex gap-2'>
                        <div className='flex flex-col gap-2 w-1/2'>
                          <p className='text-sm'>Nombre</p>
                          <input type='text' placeholder='Nombre' name='firstName' onChange={inputChange} value={sell.firstName} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                        <div className='flex flex-col gap-2 w-1/2'>
                          <p className='text-sm'>Apellido</p>
                          <input type='text' placeholder='Apellido' name='lastName' onChange={inputChange} value={sell.lastName} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Dirección</p>
                        <input type='text' placeholder='Dirección' name='address' onChange={inputChange} value={sell.address} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Departamento (Opcional)</p>
                        <input type='text' placeholder='Departamento' name='details' onChange={inputChange} value={sell.details} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                      <Shipping setShipping={setShipping} sell={sell} setSell={setSell} />
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Teléfono</p>
                        <div className='flex gap-2'>
                          <span className='mt-auto mb-auto text-sm'>+56</span>
                          <input type='text' placeholder='Teléfono' name='phone' onChange={inputChange} value={sell.phone} className='border text-sm p-2 rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                      </div>
                    </div>
                  </>
                )
            }
            {
              shipping !== undefined
                ? (
                  <div className='mb-6'>
                    <h2 className='mb-2 text-main tracking-widest font-medium text-[16px] md:text-[18px] dark:text-white'>ENVÍO</h2>
                    <div className='flex flex-col gap-1'>
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
                    <h2 className='text-[16px] text-main tracking-widest font-medium mb-2 md:text-[18px] dark:text-white'>PAGO</h2>
                    <div className='flex gap-2 p-3 border rounded-md mb-1 dark:border-neutral-700'>
                      <input type='radio' name='pay' value='WebPay Plus' onChange={inputChange} />
                      <p className='text-sm'>WebPay Plus</p>
                    </div>
                  </div>
                )
                : ''
            }
            {
              status === 'authenticated'
                ? ''
                : (
                  <div className='flex gap-2 mb-4'>
                    <input type='checkbox' checked={saveData} onChange={(e: any) => e.target.checked ? setSaveData(true) : setSaveData(false)} />
                    <span className='text-sm text-neutral-400'>Guardar datos para poder comprar más rapido la proxima vez</span>
                  </div>
                )
            }
            
            <div className='flex gap-2 justify-between mt-auto mb-auto'>
              <div className='mt-auto mb-auto'><Link href='/carrito'><span className='flex gap-2 text-sm'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="mt-auto mb-auto" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>Regresar al carrito</span></Link></div>
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
              <h2 className='mb-2 text-main font-medium tracking-widest text-[18px] dark:text-white'>CARRITO</h2>
              {
                cart?.length !== 0
                  ? cart?.map(product => (
                    <div className='flex gap-2 justify-between mb-2' key={product._id}>
                      <div className='flex gap-2'>
                        <Image className='w-20 h-auto border rounded-md p-1 dark:border-neutral-700' src={product.image} alt={product.name} width={80} height={80} />
                        <div className='mt-auto mb-auto'>
                          <span className='block font-medium'>{product.name.toLocaleUpperCase()}</span>
                          <span className='block'>Cantidad: {product.quantity}</span>
                          {
                            product.variation
                              ? <span className='block'>Variación: {product.variation.variation}</span>
                              : ''
                          }
                        </div>
                      </div>
                      <div className='flex gap-2 mt-auto mb-auto'>
                        <span className='font-medium'>${NumberFormat(product.quantityOffers ? offer(product) : product.price * product.quantity)}</span>
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
              <h2 className='mb-2 text-main tracking-widest font-medium text-[18px] dark:text-white'>CUPON DE DESCUENTO</h2>
              <div className='flex gap-2'>
                <input type='text' placeholder='Cupon' className='border p-1 rounded text-[14px] w-72 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                <Button2>Agregar</Button2>
              </div>
            </div>
            <div className='mb-2 pb-2 border-b dark:border-neutral-700'>
              <div className='flex gap-2 justify-between mb-1'>
                <span className='text-[14px]'>Subtotal</span>
                <span className='text-[14px]'>${NumberFormat(sell.cart.reduce((bef, curr) => curr.quantityOffers ? offer(curr) : bef + curr.price * curr.quantity, 0))}</span>
              </div>
              <div className='flex gap-2 justify-between'>
                <span className='text-[14px]'>Envío</span>
                <span className='text-[14px]'>${NumberFormat(Number(sell.shipping))}</span>
              </div>
            </div>
            <div className='flex gap-2 justify-between'>
              <span className='font-medium'>Total</span>
              <span className='font-medium'>${NumberFormat(sell.cart.reduce((bef, curr) => curr.quantityOffers ? offer(curr) : bef + curr.price * curr.quantity, 0) + Number(sell.shipping))}</span>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CheckOut