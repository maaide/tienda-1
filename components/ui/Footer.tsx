import { IStoreData } from '@/interfaces'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const Footer = () => {

  const [storeData, setStoreData] = useState<IStoreData>({
    address: '',
    city: '',
    email: '',
    name: '',
    phone: '',
    region: '',
    logo: { public_id: '', url: '' },
    logoWhite: { public_id: '', url: '' }
  })

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    if (response.data) {
      setStoreData(response.data)
    }
  }

  useEffect(() => {
    getStoreData()
  }, [])

  return (
    <div className='flex pl-4 pr-4 pt-14 pb-24 bg-neutral-900'>
      <div className='w-1280 m-auto'>
        <div className='flex gap-4 justify-between flex-wrap pb-6 border-b'>
          <div>
            {
              storeData?.logoWhite
                ? <Image className='w-36 h-auto mb-3' src={storeData.logoWhite.url} alt='Logo' width={144} height={50.39} />
                : <Image className='w-36 h-auto mb-3' src='https://res.cloudinary.com/df7nchfnh/image/upload/v1687968894/Ecommerce/Logo_web_blanco_r82fka.png' alt='Logo' width={144} height={50.39} />
            }
            <p className='text-white mb-4 text-sm'>contacto@blaspod.cl</p>
            <div className='flex gap-4'>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" className="text-white text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="text-white text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="text-white text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path></svg>
            </div>
          </div>
          <div className='mt-6'>
            <h3 className='text-white mb-2'>TIENDA</h3>
            <Link className='block text-white text-sm mb-1' href='/tienda'>Productos</Link>
            <Link className='block text-white text-sm mb-1' href='/audifonos'>Audífonos inalámbricos</Link>
            <Link className='block text-white text-sm mb-1' href='/relojes'>Relojes inteligentes</Link>
            <Link className='block text-white text-sm mb-1' href='/carcasas'>Carcasas Airpods</Link>
          </div>
          <div className='mt-6'>
            <h3 className='text-white mb-2'>POLITICAS</h3>
            <Link className='block text-white text-sm mb-1' href='/politicas-privacidad'>Politicas de privacidad</Link>
            <Link className='block text-white text-sm mb-1' href='/terminos-y-condiciones'>Terminos y condiciones</Link>
            <Link className='block text-white text-sm mb-1' href='/envio'>Información de envío</Link>
          </div>
        </div>
        <div className='mt-6'>
          <span className='text-white text-sm'>© 2022 Blaspod Store. Todos los derechos reservados</span>
        </div>
      </div>
    </div>
  )
}
