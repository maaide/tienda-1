import Link from 'next/link'
import React from 'react'

const PageBuyError = () => {
  return (
    <div className='flex px-2'>
      <div className='w-full max-w-[1280px] m-auto py-20 flex flex-col gap-4'>
        <h1 className='text-4xl font-medium'>Ha habido un error con el pago</h1>
        <p className='text-lg'>Lamentablemente el pago de tu compra ha fallado, puedes volver a intentarlo haciendo clic en el siguiente boton</p>
        <Link href='/finalizar-compra' className='w-52 h-9 rounded-md bg-button flex text-white'><p className='m-auto'>Volver a intentarlo</p></Link>
      </div>
    </div>
  )
}

export default PageBuyError