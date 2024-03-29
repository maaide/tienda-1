import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { PropsWithChildren, useEffect, useState, useContext } from 'react'
import { NavbarCart } from '../cart'
import { useRouter } from 'next/router'
import CartContext from '../../context/cart/CartContext'
import { useCategories } from '../../hooks'
import Image from 'next/image'
import axios from 'axios'
import { IStoreData } from '@/interfaces'
import DesignContext from '@/context/design/DesignContext'
import LogoContext from '@/context/logo/LogoContext'
import AccountLogin from './Account'

interface Props {
  menu: any,
  setMenu: any,
  setIndex: any,
  index: any
}

export const Navbar: React.FC<PropsWithChildren<Props>> = ({ children , menu, setMenu, setIndex, index }) => {

  const { systemTheme, theme, setTheme } = useTheme()
  const { design } = useContext(DesignContext)
  const { setLogoLoad, logoLoad } = useContext(LogoContext)

  const [mounted, setMounted] = useState(false)
  const [cartView, setCartView] = useState('hidden')
  const [cartOpacity, setCartOpacity] = useState('opacity-0')
  const [cartPc, setCartPc] = useState(true)
  const [accountView, setAccountView] = useState('hidden')
  const [accountOpacity, setAccountOpacity] = useState('opacity-0')
  const [accountPc, setAccountPc] = useState(true)
  const [account, setAccount] = useState('Ingresar')
  const [navCategories, setNavCategories] = useState('hidden')
  const [navCategoriesOpacity, setNavCategoriesOpacity] = useState('opacity-0')
  const [categoriesPhone, setCategoriesPhone] = useState('hidden')
  const [menuButtons, setMenuButtons] = useState('opacity-0')
  const [storeData, setStoreData] = useState<IStoreData>({
    address: '',
    city: '',
    email: '',
    name: '',
    phone: '',
    region: '',
    logo: { public_id: '', url: '' },
    logoWhite: { public_id: '', url: '' }
  })
  const [rotate, setRotate] = useState('rotate-90')
  const [mouseEnter, setMouseEnter] = useState(true)

  const { categories } = useCategories('/categories')
  const router = useRouter()
  const {cart} = useContext(CartContext)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    setStoreData(response.data)
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const renderThemeChanger = () => {
    if ( !mounted ) return null
    const currentTheme = theme === 'system' ? systemTheme : theme
    if ( currentTheme === 'dark' ) {
      return (
        <button className='w-6 flex' onClick={() => setTheme('light')}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-slate-600 m-auto" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path></svg></button>
      )
    } else {
      return (
        <button className='w-6 flex' onClick={() => setTheme('dark')}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-slate-500 m-auto" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path></svg></button>
      )
    }
  }

  useEffect(() => {
    if (index === 'flex') {
      setMenu('w-5/6 p-6')
    }
  }, [index])

  const showCategories = () => {
    if (categoriesPhone === 'hidden') {
      setCategoriesPhone('block')
      setRotate('-rotate-90')
    } else {
      setCategoriesPhone('hidden')
      setRotate('rotate-90')
    }
  }

  return (
    <>
    <div className={`fixed ${logoLoad ? 'hidden' : 'flex'} z-50 w-full h-full bg-white`} />
    <div className='w-full'>
      {
        router.pathname !== '/finalizar-compra'
          ? design.header.topStrip !== ''
            ? (
              <div className='bg-[#22262c] text-white flex pl-2 pr-2 pt-1.5 pb-1.5 text-center'>
                <p className='m-auto tracking-widest font-medium text-[11px]'>{design.header.topStrip}</p>
              </div>
            )
            : ''
          : ''
      }
      <div style={{ top: '-0.5px' }} className='sticky border-b flex bg-white w-full z-30 dark:bg-neutral-900 dark:border-neutral-800'>
        <div className='m-auto w-1280 flex justify-between z-40 px-2 py-1 575:py-0'>
          <div className='hidden gap-2 575:flex'>
            {
              !mounted
                ? <Link href='/'><div className='h-14 w-1' /></Link>
                : storeData?.logo
                  ? theme === 'system'
                    ? systemTheme === 'dark'
                      ? <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-auto h-[52px] py-1' src={`${storeData.logoWhite.url}`} alt='Logo' width={155} height={53.72} /></Link>
                      : <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-auto h-[52px] py-1' src={`${storeData.logo.url}`} alt='Logo' width={155} height={53.72} /></Link>
                    : theme === 'dark'
                      ? <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-auto h-[52px] py-1' src={`${storeData.logoWhite.url}`} alt='Logo' width={155} height={53.72} /></Link>
                      : <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-auto h-[52px] py-1' src={`${storeData.logo.url}`} alt='Logo' width={155} height={53.72} /></Link>
                  : <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-auto h-[52px] py-1' src="https://res.cloudinary.com/df7nchfnh/image/upload/v1687968324/Ecommerce/Logo_web_rppkaa.png" alt='Logo' width={155} height={53.72} /></Link>
            }
          </div>
          {
            router.pathname !== '/finalizar-compra'
              ? <>
                <div className='hidden gap-6 575:flex'>
                  <Link className='mt-auto flex text-[15px] h-full font-medium text-[#1c1b1b] tracking-widest mb-auto dark:text-white' href='/'>
                    <div className='mt-auto text-[15px] font-medium text-[#1c1b1b] tracking-widest mb-auto dark:text-white'>INICIO</div>
                  </Link>
                  <Link className='flex h-full' href='/tienda' onMouseEnter={() => {
                    setNavCategories('flex')
                    setTimeout(() => {
                      setNavCategoriesOpacity('opacity-1')
                    }, 50)
                  }} onMouseLeave={() => {
                    setNavCategoriesOpacity('opacity-0')
                    setTimeout(() => {
                      if (!mouseEnter) {
                        setNavCategories('hidden')
                      }
                    }, 200)
                  }} onClick={() => {
                    setNavCategoriesOpacity('opacity-0')
                    setTimeout(() => {
                      setNavCategories('hidden')
                    }, 200)
                  }}>
                    <div className='mt-auto text-[15px] font-medium text-[#1c1b1b] tracking-widest mb-auto dark:text-white'>TIENDA</div>
                  </Link>
                  <Link className='mt-auto text-[15px] font-medium text-[#1c1b1b] tracking-widest mb-auto dark:text-white' href='/contacto'>
                    <div className='mt-auto text-[15px] font-medium text-[#1c1b1b] tracking-widest mb-auto dark:text-white'>CONTACTO</div>
                  </Link>
                  {
                    accountOpacity === 'opacity-0'
                      ? (
                        <button onClick={(e: any) => {
                          e.preventDefault()
                          setAccountView('flex')
                          setTimeout(() => {
                            setAccountOpacity('opacity-1')
                          }, 50)
                        }}>
                          <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10.9531" cy="6" r="5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></circle>
                            <path d="M20.4906 18C19.2164 13.9429 15.4261 11 10.9484 11C6.47081 11 2.68051 13.9429 1.40625 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </button>
                      )
                      : (
                        <button onClick={(e: any) => {
                          e.preventDefault()
                          setAccountOpacity('opacity-0')
                          setTimeout(() => {
                            setAccountView('hidden')
                          }, 200)
                        }}>
                          <svg className="m-auto w-[21px] px-[2px]" role="presentation" viewBox="0 0 16 14">
                            <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path>
                          </svg>
                        </button>
                      )
                  }
                  {
                    cartOpacity === 'opacity-0'
                      ? (
                        <div>
                          <button onClick={() => {
                            setCartView('flex')
                            setTimeout(() => {
                              setCartOpacity('opacity-1')
                            }, 50)
                          }} className='flex h-full'>
                            <svg className='m-auto cursor-pointer w-[17px]' role="presentation" viewBox="0 0 17 20">
                              <path d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z" fill="currentColor"></path>
                            </svg>
                          </button>
                          {
                            cart?.length
                              ? (
                                <div className='bg-button w-5 h-5 absolute top-2 ml-3 flex rounded-full'>
                                  <span className='m-auto text-xs text-white'>{cart.reduce((prev, curr) => prev + curr.quantity, 0)}</span>
                                </div>
                              )
                              : ''
                          }
                        </div>
                        )
                      : (
                        <button className='h-full flex' onClick={() => {
                          setCartOpacity('opacity-0')
                          setTimeout(() => {
                            setCartView('hidden')
                          }, 200)
                        }}>
                          <svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14">
                            <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path>
                          </svg>
                        </button>
                      )
                  }
                  {renderThemeChanger()}
                </div>
                <div className='flex px-1 w-full justify-between gap-4 575:hidden'>
                  <div className='flex w-full gap-4'>
                    {
                      menu === 'w-0 pl-0 pr-0 pt-6 pb-6'
                        ? <button onClick={() => {
                            setIndex('flex')
                            setTimeout(() => {
                              setMenuButtons('opacity-1')
                            }, 270)
                          }}>
                          <svg className="w-5" role="presentation" viewBox="0 0 20 14">
                            <path d="M0 14v-1h20v1H0zm0-7.5h20v1H0v-1zM0 0h20v1H0V0z" fill="currentColor"></path>
                          </svg>
                        </button>
                        : <button onClick={() => {
                            setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
                            setMenuButtons('opacity-0')
                            setTimeout(() => {
                              setIndex('hidden')
                            }, 150)
                          }} className='flex w-5'>
                          <svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14">
                            <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path>
                          </svg>
                        </button>
                    }
                    {
                      accountOpacity === 'opacity-0'
                        ? (
                          <button onClick={(e: any) => {
                            e.preventDefault()
                            setAccountView('flex')
                            setTimeout(() => {
                              setAccountOpacity('opacity-1')
                            }, 50)
                          }}>
                            <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10.9531" cy="6" r="5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></circle>
                              <path d="M20.4906 18C19.2164 13.9429 15.4261 11 10.9484 11C6.47081 11 2.68051 13.9429 1.40625 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                          </button>
                        )
                        : (
                          <button onClick={(e: any) => {
                            e.preventDefault()
                            setAccountOpacity('opacity-0')
                            setTimeout(() => {
                              setAccountView('hidden')
                            }, 200)
                          }}>
                            <svg className="m-auto w-[21px] px-[2px]" role="presentation" viewBox="0 0 16 14">
                              <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path>
                            </svg>
                          </button>
                        )
                    }
                  </div>
                  <div className='flex gap-2 575:hidden'>
                    {
                      !mounted
                        ? <Link href='/'><div className='h-14 w-1' /></Link>
                        : storeData?.logo
                          ? theme === 'system'
                            ? systemTheme === 'dark'
                              ? <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-96 h-[42px] py-0.5' src={`${storeData.logoWhite.url}`} alt='Logo' width={155} height={53.72} /></Link>
                              : <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-96 h-[42px] py-0.5' src={`${storeData.logo.url}`} alt='Logo' width={155} height={53.72} /></Link>
                            : theme === 'dark'
                              ? <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-96 h-[42px] py-0.5' src={`${storeData.logoWhite.url}`} alt='Logo' width={155} height={53.72} /></Link>
                              : <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-96 h-[42px] py-0.5' src={`${storeData.logo.url}`} alt='Logo' width={155} height={53.72} /></Link>
                          : <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-96 h-[42px] py-0.5' src="https://res.cloudinary.com/df7nchfnh/image/upload/v1687968324/Ecommerce/Logo_web_rppkaa.png" alt='Logo' width={155} height={53.72} /></Link>
                    }
                  </div>
                  <div className='flex w-full justify-end gap-4'>
                    {renderThemeChanger()}
                    {
                      cartOpacity === 'opacity-0'
                        ? (
                          <div>
                            <button onClick={() => {
                              setCartView('flex')
                              setTimeout(() => {
                                setCartOpacity('opacity-1')
                              }, 50)
                            }} className='flex h-full'>
                              <svg className='m-auto cursor-pointer w-[17px]' role="presentation" viewBox="0 0 17 20">
                                <path d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z" fill="currentColor"></path>
                              </svg>
                            </button>
                            {
                              cart?.length
                                ? (
                                  <div className='bg-button w-5 h-5 absolute top-2 ml-3 flex rounded-full'>
                                  <span className='m-auto text-xs text-white'>{cart.reduce((prev, curr) => prev + curr.quantity, 0)}</span>
                                </div>
                                )
                                : ''
                            }
                          </div>
                          )
                        : (
                          <button onClick={() => {
                            setCartOpacity('opacity-0')
                            setTimeout(() => {
                              setCartView('hidden')
                            }, 200)
                          }} className='flex h-full'>
                            <svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14">
                              <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path>
                            </svg>
                          </button>
                        )
                    }
                  </div>
                </div>
              </>
              : <div className='flex gap-4'>
                <div className='gap-2 flex 575:hidden'>
                  {
                    !mounted
                      ? <Link href='/'><div className='h-14 w-1' /></Link>
                      : storeData?.logo
                        ? theme === 'system'
                          ? systemTheme === 'dark'
                            ? <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-auto h-[52px] py-1' src={`${storeData.logoWhite.url}`} alt='Logo' width={155} height={53.72} /></Link>
                            : <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-auto h-[52px] py-1' src={`${storeData.logo.url}`} alt='Logo' width={155} height={53.72} /></Link>
                          : theme === 'dark'
                            ? <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-auto h-[52px] py-1' src={`${storeData.logoWhite.url}`} alt='Logo' width={155} height={53.72} /></Link>
                            : <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-auto h-[52px] py-1' src={`${storeData.logo.url}`} alt='Logo' width={155} height={53.72} /></Link>
                        : <Link href='/'><Image onLoad={() => setLogoLoad(true)} className='w-auto h-[52px] py-0.5' src="https://res.cloudinary.com/df7nchfnh/image/upload/v1687968324/Ecommerce/Logo_web_rppkaa.png" alt='Logo' width={155} height={53.72} /></Link>
                  }
                </div>
                {renderThemeChanger()}
                <Link href='/tienda' className='mt-auto mb-auto text-sm text-neutral-500'>Continuar comprando</Link>
              </div>
          }
        </div>
        <div className={`${accountView} transition-opacity duration-200 w-full z-50 absolute top-[51px] 575:hidden`} style={{ height: 'calc(100vh - 91px)' }}>
          <div className='w-1440 ml-auto mr-auto'>
            <div className='ml-auto h-fit flex w-full 400:w-96'>
              <AccountLogin account={account} accountOpacity={accountOpacity} setAccount={setAccount} setAccountPc={setAccountPc} setAccountOpacity={setAccountOpacity} setAccountView={setAccountView} />
            </div>
            <div onClick={() => {
              setAccountOpacity('opacity-0')
              setTimeout(() => {
                setAccountView('hidden')
              }, 200)
            }} className='h-full w-full' />
          </div>
        </div>
        <div onClick={() => {
          if (accountPc) {
            setAccountOpacity('opacity-0')
            setTimeout(() => {
              setAccountView('hidden')
            }, 200)
          }
        }} className={`hidden w-full z-50 absolute top-[53px] 575:${accountView}`} style={{ height: 'calc(100vh - 91px)' }}>
          <div className='w-1440 ml-auto mr-auto'>
            <div className='ml-auto h-fit flex w-full 400:w-96'>
              <AccountLogin account={account} accountOpacity={accountOpacity} setAccount={setAccount} setAccountPc={setAccountPc} setAccountOpacity={setAccountOpacity} setAccountView={setAccountView} />
            </div>
          </div>
        </div>
        <div className={`${cartView} transition-opacity duration-200 w-full z-50 absolute top-[51px] 575:hidden`} style={{ height: 'calc(100vh - 91px)' }}>
          <div className='w-1440 ml-auto mr-auto'>
            <div className='ml-auto h-fit flex w-full 400:w-96'>
              <NavbarCart setCartView={setCartView} cartOpacity={cartOpacity} setCartOpacity={setCartOpacity} />
            </div>
            <div onClick={() => {
              setCartOpacity('opacity-0')
              setTimeout(() => {
                setCartView('hidden')
              }, 200)
            }} className='h-full w-full' />
          </div>
        </div>
        <div onClick={() => {
          if (cartPc) {
            setCartOpacity('opacity-0')
            setTimeout(() => {
              setCartView('hidden')
            }, 200)
          }
        }} className={`hidden w-full z-50 absolute top-[53px] 575:${cartView}`} style={{ height: 'calc(100vh - 91px)' }}>
          <div className='w-1440 ml-auto mr-auto'>
            <div className='ml-auto h-fit flex w-full 400:w-96'>
              <NavbarCart setCartView={setCartView} setCartPc={setCartPc} cartOpacity={cartOpacity} setCartOpacity={setCartOpacity} />
            </div>
          </div>
        </div>
        <div className={`${index} w-full absolute z-30 justify-between 530:hidden`} style={{ top: '51px', height: 'calc(100vh - 49px)' }}>
          <div className={`${menu} shadow-md transition-all duration-300 bg-white overflow-hidden dark:bg-neutral-900`}>
            <Link className={`${menuButtons} transition-opacity duration-200 mb-4 font-montserrat tracking-widest font-medium text-[#1c1b1b] flex pb-2 min-w-[250px] border-b dark:border-neutral-600 dark:text-white`} onClick={() => {
              setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
              setMenuButtons('opacity-0')
              setTimeout(() => {
                setIndex('hidden')
              }, 150)
            }} href='/'>INICIO<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="ml-auto w-4 text-lg text-neutral-500" xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg></Link>
            <div className={`${menuButtons} transition-opacity duration-200 border-b mb-4 min-w-[250px] dark:border-neutral-600`}>
              <div className={`flex justify-between pb-2`}>
                <Link onClick={() => {
                  setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
                  setMenuButtons('opacity-0')
                  setTimeout(() => {
                    setIndex('hidden')
                  }, 150)
                }} className='tracking-widest font-montserrat font-medium text-[#1c1b1b] dark:text-white' href='/tienda'>TIENDA</Link>
                <button onClick={showCategories}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className={`${rotate} transition-all duration-150 ml-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg></button>
              </div>
              <div className={`${categoriesPhone} flex flex-col gap-2 mb-4`}>
                {
                  categories?.length
                    ? categories.map(category => (
                      <Link onClick={() => {
                        setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
                        setMenuButtons('opacity-0')
                        setTimeout(() => {
                          setIndex('hidden')
                        }, 150)
                      }} href={`/tienda/${category.slug}`} className='flex gap-2' key={category._id}>
                        <Image className='w-28 h-auto' src={category.image?.url!} width={112} height={112} alt={`Categoria ${category.category}`} />
                        <h2 className='mt-auto tracking-widest text-[#1c1b1b] font-medium mb-auto dark:text-white'>{category.category.toUpperCase()}</h2>
                      </Link>
                    ))
                    : ''
                }
              </div>
            </div>
            <Link className={`${menuButtons} transition-opacity duration-200 mb-4 font-montserrat tracking-widest text-[#1c1b1b] font-medium flex pb-2 min-w-[250px] border-b dark:border-neutral-600 dark:text-white`} onClick={() => {
              setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
              setMenuButtons('opacity-0')
              setTimeout(() => {
                setIndex('hidden')
              }, 140)
            }} href='/contacto'>CONTACTO<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="ml-auto w-4 text-lg text-neutral-500" xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg></Link>
          </div>
          <div className='w-1/6' onClick={() => {
            setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
            setMenuButtons('opacity-0')
            setTimeout(() => {
              setIndex('hidden')
            }, 150)
          }} />
        </div>
        <div className={`${navCategories} ${navCategoriesOpacity} -mt-[1px] border-t transition-opacity duration-200 absolute top-[53px] w-full dark:border-neutral-800`} onMouseEnter={() => {
          setMouseEnter(true)
          setNavCategories('flex')
          setNavCategoriesOpacity('opacity-1')
        }} onMouseLeave={() => {
          setNavCategoriesOpacity('opacity-0')
          setTimeout(() => {
            setNavCategories('hidden')
          }, 200)
        }}>
          {
            categories?.length
              ? (
                <div className='w-full bg-white p-4 flex gap-4 border-b justify-center dark:bg-neutral-900 dark:border-neutral-800'>
                  {categories.map(category => (
                    <div key={category._id}>
                      <Image className='w-64 h-auto mb-2 cursor-pointer' onClick={() => {
                        setNavCategoriesOpacity('opacity-0')
                        setTimeout(() => {
                          setNavCategories('hidden')
                        }, 200)
                        router.push(`/tienda/${category.slug}`)
                      }} src={category.image?.url!} width={256} height={256} alt={`Categoria ${category.category}`} />
                      <Link href={`/tienda/${category.slug}`} onClick={() => {
                        setNavCategoriesOpacity('opacity-0')
                        setTimeout(() => {
                          setNavCategories('hidden')
                        }, 200)
                      }} className='m-auto tracking-widest font-medium text-[#1c1b1b] dark:text-white'>{category.category.toUpperCase()}</Link>
                    </div>
                  ))}
                </div>
              )
              : ''
          }
        </div>
      </div>
      { children }
    </div>
    </>
  )
}
