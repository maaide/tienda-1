import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { PropsWithChildren, useEffect, useState, useContext } from 'react'
import { BsFillMoonFill, BsFillSunFill, BsBag } from 'react-icons/bs'
import { NavbarCart } from '../cart'
import { FiMenu } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import { AiOutlineRight, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { useRouter } from 'next/router'
import CartContext from '../../context/cart/CartContext'
import { useCategories } from '../../hooks'
import Image from 'next/image'
import axios from 'axios'
import { IStoreData } from '@/interfaces'

interface Props {
  menu: any,
  setMenu: any,
  setIndex: any,
  index: any
}

export const Navbar: React.FC<PropsWithChildren<Props>> = ({ children , menu, setMenu, setIndex, index }) => {

  const { systemTheme, theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [cartView, setCartView] = useState('hidden')
  const [cartOpacity, setCartOpacity] = useState('opacity-0')
  const [cartPc, setCartPc] = useState(true)
  const [loading, setLoading] = useState('block')
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
    logo: '',
    logoWhite: ''
  })

  const { categories } = useCategories('/categories')
  const router = useRouter()
  const {cart} = useContext(CartContext)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getStoreData = async () => {
    const response = await axios.get('https://server-production-e234.up.railway.app/store-data')
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
        <button className='w-6 flex' onClick={() => setTheme('light')}><BsFillMoonFill className='text-slate-600 m-auto' /></button>
      )
    } else {
      return (
        <button className='w-6 flex' onClick={() => setTheme('dark')}><BsFillSunFill className='text-slate-500 m-auto' /></button>
      )
    }
  }

  useEffect(() => {
    if (index === 'flex') {
      setMenu('w-5/6 p-6')
    }
  }, [index])

  return (
    <>
    <div className={`${loading} fixed h-full w-full z-50 bg-white`} />
    <div className='w-full'>
      {
        router.pathname !== '/finalizar-compra'
          ? <div className='bg-[#22262c] text-white flex pl-2 pr-2 pt-1.5 pb-1.5 text-center'>
            <p className='m-auto tracking-widest font-medium text-[11px]'>ENVÍO GRATIS EN 24 HORAS PARA TODO SANTIAGO</p>
          </div>
          : ''
      }
      <div style={{ top: '-1px' }} className='sticky border-b flex bg-white w-full z-30 dark:bg-neutral-900 dark:border-neutral-800'>
        <div className='m-auto w-1280 flex justify-between z-40 px-2 py-1 575:py-0'>
          <div className='hidden gap-2 575:flex'>
            {
              !mounted
                ? <Link href='/'><div className='h-14 w-1' /></Link>
                : theme === 'system'
                ? systemTheme === 'dark'
                  ? <Link href='/'><Image className='w-32 py-1' onLoad={() => setLoading('hidden')} src={`${storeData.logoWhite}`} alt='Logo' width={155} height={53.72} /></Link>
                  : <Link href='/'><Image className='w-32 py-1' onLoad={() => setLoading('hidden')} src={`${storeData.logo}`} alt='Logo' width={155} height={53.72} /></Link>
                : theme === 'dark'
                  ? <Link href='/'><Image className='w-32 py-1' onLoad={() => setLoading('hidden')} src={`${storeData.logoWhite}`} alt='Logo' width={155} height={53.72} /></Link>
                  : <Link href='/'><Image className='w-32 py-1' onLoad={() => setLoading('hidden')} src={`${storeData.logo}`} alt='Logo' width={155} height={53.72} /></Link>
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
                    setNavCategories('hidden')
                  }} onClick={() => {
                    setNavCategoriesOpacity('opacity-0')
                    setNavCategories('hidden')
                  }}>
                    <div className='mt-auto text-[15px] font-medium text-[#1c1b1b] tracking-widest mb-auto dark:text-white'>TIENDA</div>
                  </Link>
                  <Link className='mt-auto text-[15px] font-medium text-[#1c1b1b] tracking-widest mb-auto dark:text-white' href='/contacto'>
                    <div className='mt-auto text-[15px] font-medium text-[#1c1b1b] tracking-widest mb-auto dark:text-white'>CONTACTO</div>
                  </Link>
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
                  <div className='flex w-full'>
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
                  </div>
                  <div className='flex gap-2 575:hidden'>
                    {
                      !mounted
                        ? <Link href='/'><div className='h-14 w-1' /></Link>
                        : theme === 'system'
                        ? systemTheme === 'dark'
                          ? <Link href='/'><Image className='w-[400px]' onLoad={() => setLoading('hidden')} src={`${storeData.logoWhite}`} alt='Logo' width={155} height={53.72} /></Link>
                          : <Link href='/'><Image className='w-[400px]' onLoad={() => setLoading('hidden')} src={`${storeData.logo}`} alt='Logo' width={155} height={53.72} /></Link>
                        : theme === 'dark'
                          ? <Link href='/'><Image className='w-[400px]' onLoad={() => setLoading('hidden')} src={`${storeData.logoWhite}`} alt='Logo' width={155} height={53.72} /></Link>
                          : <Link href='/'><Image className='w-[400px]' onLoad={() => setLoading('hidden')} src={`${storeData.logo}`} alt='Logo' width={155} height={53.72} /></Link>
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
                {renderThemeChanger()}
                <Link href='/tienda' className='mt-auto mb-auto text-sm text-neutral-500'>Continuar comprando</Link>
              </div>
          }
        </div>
        <div className={`${cartView} transition-opacity duration-200 w-full z-50 absolute top-[49px] 575:hidden`} style={{ height: 'calc(100vh - 91px)' }}>
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
        <div className={`${index} w-full absolute z-30 justify-between 530:hidden`} style={{ top: '49px', height: 'calc(100vh - 53px)' }}>
          <div className={`${menu} shadow-md transition-all duration-300 bg-white overflow-hidden dark:bg-neutral-900`}>
            <Link className={`${menuButtons} transition-opacity duration-200 mb-4 font-montserrat tracking-widest font-medium text-[#1c1b1b] flex pb-2 min-w-[250px] border-b dark:border-neutral-600 dark:text-white`} onClick={() => {
              setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
              setMenuButtons('opacity-0')
              setTimeout(() => {
                setIndex('hidden')
              }, 150)
            }} href='/'>INICIO<AiOutlineRight className='ml-auto text-lg text-neutral-500' /></Link>
            <div className={`${menuButtons} transition-opacity duration-200 border-b mb-4 min-w-[250px] dark:border-neutral-600`}>
              <div className={`flex justify-between pb-2`}>
                <Link onClick={() => {
                  setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
                  setMenuButtons('opacity-0')
                  setTimeout(() => {
                    setIndex('hidden')
                  }, 150)
                }} className='tracking-widest font-montserrat font-medium text-[#1c1b1b] dark:text-white' href='/tienda'>TIENDA</Link>
                {
                  categoriesPhone === 'hidden'
                    ? <button onClick={() => setCategoriesPhone('block') }><AiOutlineDown className='ml-auto text-lg text-neutral-500' /></button>
                    : <button onClick={() => setCategoriesPhone('hidden') }><AiOutlineUp className='ml-auto text-lg text-neutral-500' /></button>
                }
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
                        <Image className='w-28' src={category.image!} width={112} height={112} alt={`Categoria ${category.category}`} />
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
            }} href='/contacto'>CONTACTO<AiOutlineRight className='ml-auto text-lg text-neutral-500' /></Link>
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
          setNavCategories('flex')
          setNavCategoriesOpacity('opacity-1')
        }} onMouseLeave={() => {
          setNavCategoriesOpacity('opacity-0')
          setNavCategories('hidden')
        }}>
          {
            categories?.length
              ? (
                <div className='w-full bg-white p-4 flex gap-4 border-b justify-center dark:bg-neutral-900 dark:border-neutral-800'>
                  {categories.map(category => (
                    <div key={category._id}>
                      <Image className='w-64 mb-2 cursor-pointer' onClick={() => {
                        setNavCategoriesOpacity('opacity-0')
                        setNavCategories('hidden')
                        router.push(`/tienda/${category.slug}`)
                      }} src={category.image!} width={256} height={256} alt={`Categoria ${category.category}`} />
                      <Link href={`/tienda/${category.slug}`} onClick={() => {
                        setNavCategoriesOpacity('opacity-0')
                        setNavCategories('hidden')
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
