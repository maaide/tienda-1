import { Spinner2 } from '@/components/ui'
import { ISell } from '@/interfaces'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const AccountPage = () => {

  const [closeLoading, setCloseLoading] = useState(false)
  const [buys, setBuys] = useState<ISell[]>([])
  const [loadingSells, setLoadingSells] = useState(false)

  const { data: session, status } = useSession()

  console.log(session)
  console.log(status)

  const user = session?.user as { firstName: string, lastName: string, email: string, _id: string }

  const getBuys = async () => {
    setLoadingSells(true)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sells-client/${user.email}`)
    if (response.data.length) {
      setBuys(response.data.length)
    }
    setLoadingSells(false)
  }

  useEffect(() => {
    getBuys()
  }, [])

  const handleLogout = async () => {
    setCloseLoading(true)
    await signOut({ callbackUrl: '/' })
    setCloseLoading(false)
  }

  return (
    <div className='w-full px-2'>
      <div className='w-[1280px] m-auto flex flex-col gap-4 py-14'>
        <h1 className='text-3xl font-medium'>HOLA{user?.firstName ? ` ${user.firstName.toUpperCase()}!` : '!'}</h1>
        <div className='w-full flex gap-8'>
          <div className='w-1/4 flex flex-col gap-2'>
            <h2 className='text-xl font-medium'>CUENTA</h2>
            <Link className='p-1.5 rounded-md hover:bg-neutral-100 transition-colors duration-100 dark:hover:bg-neutral-800' href='/cuenta/editar-datos'>Editar datos</Link>
            <button onClick={handleLogout} className='bg-main font-medium tracking-widest text-white h-10 dark:bg-neutral-800'>{closeLoading ? <Spinner2/> : 'CERRAR SESIÓN'}</button>
          </div>
          <div className='w-3/4 flex flex-col gap-4'>
            <h2 className='text-xl font-medium'>TUS COMPRAS</h2>
            {
              loadingSells
                ? (
                  <div>
                    <div>
                      <Spinner2 />
                    </div>
                  </div>
                )
                : buys.length
                  ? buys.map(buy => (
                    <p key={buy._id}>{buy.firstName}</p>
                  ))
                  : <p>No hay compras</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage