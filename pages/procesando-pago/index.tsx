import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const PayProcess = () => {

  const router = useRouter()

  useEffect(() => {
    const { token_ws } = router.query
    if (token_ws) {
        router.push('/gracias-por-comprar')
    }
  }, [])

  return (
    <div>PayProcess</div>
  )
}

export default PayProcess