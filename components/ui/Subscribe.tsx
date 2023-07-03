import axios from 'axios'
import React, { useState } from 'react'

export const Subscribe = () => {

  const [subscribeData, setSubscribeData] = useState({ email: '', tags: 'Suscripcion' })
  const [successSubscribe, setSuccessSubscribe] = useState('hidden')

  const inputChange = (e: any) => {
    setSubscribeData({...subscribeData, email: e.target.value})
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await axios.post('https://server-production-e234.up.railway.app/clients', subscribeData)
      setSuccessSubscribe('block')
    } catch (error) {
      await axios.put(`https://server-production-e234.up.railway.app/clients-subscribe/${subscribeData.email}`)
      setSuccessSubscribe('block')
    }
  }

  return (
    <>
      <div className='w-full bg-neutral-100 pl-4 pr-4 flex dark:bg-neutral-900'>
        <form className='m-auto w-1280 mt-16 mb-16'>
          <h4 className='mb-4 text-[16px] font-semibold tracking-widest text-main text-center md:text-[20px] dark:text-white'>SUSCRIBETE EN NUESTRA LISTA PARA RECIBIR OFERTAS EXCLUSIVAS, SORTEOS Y MUCHO MÁS</h4>
          <div className='flex'>
            <input type='email' placeholder='Email' value={subscribeData.email} onChange={inputChange} className='p-2 w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:bg-neutral-800' />
            <button className='pt-2.5 transition-colors duration-200 pb-2.5 pl-7 pr-7 tracking-widest font-medium bg-[#1c1b1b] text-white hover:bg-white hover:text-[#1c1b1b] dark:bg-neutral-700 dark:hover:bg-white' onClick={handleSubmit}>ENVÍAR</button>
          </div>
          <div className={successSubscribe}>
            <p className='text-green mt-2'>Suscripción realizada con exito</p>
          </div>
        </form>
      </div>
      <div className='w-full m-auto flex bg-neutral-800 pl-4 pr-4 pt-10 pb-10'>
        <div className='w-1280 m-auto flex flex-wrap gap-4 justify-between'>
          <div className='flex gap-2'>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-white text-4xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg>
            <span className='text-white m-auto'>Envío gratis a todo Santiago</span>
          </div>
          <div className='flex gap-2'>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-white text-4xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 456c-110.3 0-200-89.7-200-200 0-54.8 21.7-105.9 61.2-144 6.4-6.2 16.6-6 22.7.4 6.2 6.4 6 16.6-.4 22.7-33.1 32-51.3 74.9-51.3 120.9 0 92.5 75.3 167.8 167.8 167.8S423.8 348.5 423.8 256c0-87.1-66.7-159-151.8-167.1v62.6c0 8.9-7.2 16.1-16.1 16.1s-16.1-7.2-16.1-16.1V72.1c0-8.9 7.2-16.1 16.1-16.1 110.3 0 200 89.7 200 200S366.3 456 256 456z"></path><path d="M175.9 161.9l99.5 71.5c13.5 9.7 16.7 28.5 7 42s-28.5 16.7-42 7c-2.8-2-5.2-4.4-7-7l-71.5-99.5c-3.2-4.5-2.2-10.8 2.3-14 3.6-2.6 8.3-2.4 11.7 0z"></path></svg>
            <span className='text-white m-auto'>Recibe en 24 y 48 horas en todo Santiago</span>
          </div>
          <div className='flex gap-2'>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-white text-4xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"></path><path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"></path></svg>
            <span className='text-white m-auto'>Pago seguro en nuestra web</span>
          </div>
        </div>
      </div>
    </>
  )
}
