import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'
import { Spinner2 } from './Spinner2'

interface Props {
    account: any
    setAccount: any
    setAccountPc: any
    accountOpacity: string
}

const AccountLogin: React.FC<Props> = ({ account, setAccount, setAccountPc, accountOpacity }) => {

  const [login, setLogin] = useState({
    email: '',
    password: ''
  })
  const [register, setRegister] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassrword: ''
  })
  const [error, setError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)

  const router = useRouter()

  const loginHandleSubmit = async () => {
    setLoginLoading(true)
    const res = await signIn('credentials', {
      email: login.email,
      password: login.password,
      redirect: false
    })
    if (res?.error) return setError(res.error)
    if (res?.ok) return router.push('/cuenta')
    setLoginLoading(false)
  }

  const registerHandleSubmit = async () => {
    setRegisterLoading(true)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, register)
    if (response.data.message) setError(response.data.message)
    const res = await signIn('credentials', {
      email: response.data.email,
      password: register.password,
      redirect: false
    })
    if (res?.error) return setError(res.error)
    if (res?.ok) return router.push('/cuenta')
    setRegisterLoading(false)
  }

  return (
    <div onMouseEnter={() => setAccountPc(false)} onMouseLeave={() => setAccountPc(true)} className={`ml-auto ${accountOpacity} transition-opacity duration-200 flex flex-col gap-3 p-4 rounded-md shadow-md bg-white z-40 w-full dark:bg-neutral-900 dark:border dark:border-neutral-800 400:w-96`}>
      <h4 className='text-center tracking-widest text-[#1c1b1b] font-semibold pb-2 border-b w-full dark:border-neutral-800 text-[16px] dark:text-white'>CUENTA</h4>
      <div className='flex gap-2'>
        <button onClick={(e: any) => {
          e.preventDefault()
          setAccount('Ingresar')
        }} className={`${account === 'Ingresar' ? 'border-neutral-700' : 'border-white'} border-b-2 w-1/2 h-10`}>Ingresar</button>
        <button onClick={(e: any) => {
          e.preventDefault()
          setAccount('Registrarse')
        }} className={`${account === 'Registrarse' ? 'border-neutral-700' : 'border-white'} border-b-2 w-1/2 h-10`}>Registrarse</button>
      </div>
      {
        account === 'Ingresar'
          ? (
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Email</p>
                <input type='text' placeholder='Email' onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin({...login, email: e.target.value})} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Contraseña</p>
                <input type='text' placeholder='*******' onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin({...login, password: e.target.value})} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <button onClick={loginHandleSubmit} className='bg-main text-white h-10 text-sm dark:bg-neutral-800'>{loginLoading ? <Spinner2 /> : 'INGRESAR'}</button>
            </div>
          )
          : (
            <div className='flex flex-col gap-3'>
              {
                error !== ''
                  ? <div className='w-full h-12 bg-red-500 text-white'>
                    <p>{error}</p>
                  </div>
                  : ''
              }
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Nombre</p>
                <input type='text' placeholder='Nombre' onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister({...register, firstName: e.target.value})} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Apellido</p>
                <input type='text' placeholder='Apellido' onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister({...register, lastName: e.target.value})} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Email</p>
                <input type='text' placeholder='Email' onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister({...register, email: e.target.value})} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Contraseña</p>
                <input type='text' placeholder='*******' onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister({...register, password: e.target.value})} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Confirmar contraseña</p>
                <input type='text' placeholder='*******' onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister({...register, confirmPassrword: e.target.value})} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <button onClick={registerHandleSubmit} className='bg-main text-white h-10 text-sm dark:bg-neutral-800'>{registerLoading ? <Spinner2 /> : 'REGISTRARSE'}</button>
            </div>
          )
      }
    </div>
  )
}

export default AccountLogin