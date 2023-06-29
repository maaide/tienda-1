import { Spinner } from '@/components/ui'
import React from 'react'

const PageBuySuccess = () => {
  return (
    <div className='w-full h-full bg-white fixed flex'>
      <div className='w-fit m-auto'>
        <Spinner />
      </div>
    </div>
  )
}

export default PageBuySuccess