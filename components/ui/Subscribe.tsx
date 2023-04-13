import axios from 'axios'
import React, { useState } from 'react'
import { BsTruck, BsCreditCard2Back } from 'react-icons/bs'
import { IoIosTimer } from 'react-icons/io'

export const Subscribe = () => {

  const [subscribeData, setSubscribeData] = useState({ email: '' })
  const [successSubscribe, setSuccessSubscribe] = useState('hidden')

  const inputChange = (e: any) => {
    setSubscribeData({...subscribeData, email: e.target.value})
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const subscribe = await axios.post('https://server-production-e234.up.railway.app/subscribe', subscribeData)
    if (subscribe) {
      setSuccessSubscribe('block')
    }
  }

  return (
    <>
      <div className='w-full bg-neutral-100 pl-4 pr-4 flex dark:bg-neutral-900'>
        <form className='m-auto w-1280 mt-16 mb-16'>
          <h4 className='mb-4 text-[16px] font-semibold tracking-widest text-main text-center md:text-[20px]'>SUSCRIBETE EN NUESTRA LISTA PARA RECIBIR OFERTAS EXCLUSIVAS, SORTEOS Y MUCHO MÁS</h4>
          <div className='flex'>
            <input type='email' placeholder='Email' value={subscribeData.email} onChange={inputChange} className='p-2 w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:bg-neutral-800' />
            <button onClick={handleSubmit} className='pt-2 pb-2 pl-10 pr-10 bg-main text-white'>Envíar</button>
          </div>
          <div className={successSubscribe}>
            <p className='text-green mt-2'>Suscripción realizada con exito</p>
          </div>
        </form>
      </div>
      <div className='w-full m-auto flex bg-neutral-800 pl-4 pr-4 pt-10 pb-10'>
        <div className='w-1280 m-auto flex flex-wrap gap-4 justify-between'>
          <div className='flex gap-2'>
            <BsTruck className='text-white text-4xl' />
            <span className='text-white m-auto'>Envío gratis a todo Santiago</span>
          </div>
          <div className='flex gap-2'>
            <IoIosTimer className='text-white text-4xl' />
            <span className='text-white m-auto'>Recibe en 24 y 48 horas en todo Santiago</span>
          </div>
          <div className='flex gap-2'>
            <BsCreditCard2Back className='text-white text-4xl' />
            <span className='text-white m-auto'>Pago seguro en nuestra web</span>
          </div>
        </div>
      </div>
    </>
  )
}
