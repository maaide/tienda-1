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
      const response = await axios.post('https://server-production-e234.up.railway.app/pay/commit', { token: tokenWs })
      console.log(response.data)
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