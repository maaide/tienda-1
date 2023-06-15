import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'

export const Footer = () => {
  return (
    <div className='flex pl-4 pr-4 pt-14 pb-24 bg-neutral-900'>
      <div className='w-1280 m-auto'>
        <div className='flex gap-4 justify-between flex-wrap pb-6 border-b'>
          <div>
            <img className='w-56 mb-3' src='https://res.cloudinary.com/blasspod/image/upload/v1664841660/blaspod/jjfme7pn7hnlhniuiab3.png' alt='Logo' width={224} height={76.16} />
            <p className='text-white mb-4 text-sm'>contacto@blaspod.cl</p>
            <div className='flex gap-4'>
              <FaFacebookF className='text-white text-xl' />
              <FaInstagram className='text-white text-xl' />
              <FaTiktok className='text-white text-xl' />
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
