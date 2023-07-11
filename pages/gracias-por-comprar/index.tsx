import { ISell } from '@/interfaces'
import axios from 'axios'
import React, { useEffect } from 'react'

const PageBuySuccess = () => {

  const updateClient = async () => {
    if (localStorage.getItem('sell')) {
      const sell: ISell = JSON.parse(localStorage.getItem('sell')!)
      await axios.post('https://server-production-e234.up.railway.app/clients', { email: sell.email, firstName: sell.firstName, lastName: sell.lastName, phone: sell.phone, address: sell.address, departament: sell.details, region: sell.region, city: sell.city, tags: ['Clientes'] })
      localStorage.clear()
    }
  }

  useEffect(() => {
    updateClient()
  }, [])

  return (
    <div className='flex px-2'>
      <div className='w-full max-w-[1280px] m-auto py-20 flex flex-col gap-4'>
        <h1 className='text-4xl font-medium'>Tu compra se ha realizado correctamente</h1>
        <p className='text-lg'>Recibiras un correo con el detalle de tu pedido</p>
      </div>
    </div>
  )
}

export default PageBuySuccess