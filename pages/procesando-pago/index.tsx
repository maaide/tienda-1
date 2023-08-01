import { Spinner } from '@/components/ui'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const PayProcess = () => {

  const router = useRouter()

  const verifyPay = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const tokenWs = urlParams.get('token_ws')
    if (tokenWs) {
      const sell = JSON.parse(localStorage.getItem('sell')!)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pay/commit`, { token: tokenWs, sell: sell })
      if (response.data.status === 'FAILED') {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/sell/${sell._id}`, { state: 'Pago no realizado' })
        router.push('/pago-fallido')
      }
      if (response.data.status === 'AUTHORIZED') {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/sell/${sell._id}`, { state: 'Pago realizado' })
        router.push('/gracias-por-comprar')
      }
    }
  }

  useEffect(() => {
    verifyPay()
  }, [])

  return (
    <div className='w-full bg-white fixed flex' style={{ height: 'calc(100% - 150px)' }}>
      <div className='w-fit m-auto'>
        <Spinner />
      </div>
    </div>
  )
}

export default PayProcess