import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { PropsWithChildren, useEffect, useState, useContext } from 'react'
import { BsFillMoonFill, BsFillSunFill, BsBag } from 'react-icons/bs'
import { NavbarCart } from '../cart'
import { FiMenu } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import { AiOutlineRight, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { useRouter } from 'next/router'
import CartContext from '../../context/cart/CartContext'
import { useCategories } from '../../hooks'

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
  const [cartPc, setCartPc] = useState(true)
  const [loading, setLoading] = useState('block')
  const [navCategories, setNavCategories] = useState('hidden')
  const [categoriesPhone, setCategoriesPhone] = useState('hidden')

  const { categories } = useCategories('/categories')
  const router = useRouter()
  const {cart} = useContext(CartContext)

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderThemeChanger = () => {
    if ( !mounted ) return null
    const currentTheme = theme === 'system' ? systemTheme : theme
    if ( currentTheme === 'dark' ) {
      return (
        <button onClick={() => setTheme('light')}><BsFillMoonFill className='text-slate-600' /></button>
      )
    } else {
      return (
        <button onClick={() => setTheme('dark')}><BsFillSunFill className='text-slate-500' /></button>
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
          ? <div className='bg-main text-white flex pl-2 pr-2 pt-1.5 pb-1.5 text-center'>
            <p className='m-auto text-[14px]'>Envío gratis en 24 horas para todo Santiago</p>
          </div>
          : ''
      }
      <div style={{ top: '-1px' }} className='sticky border-b flex bg-white w-full z-30 dark:bg-neutral-900 dark:border-neutral-800'>
        <div className='m-auto w-1280 flex justify-between z-40 pl-2 pr-2'>
          <div className='flex gap-2'>
            {
              !mounted
                ? <Link href='/'><div className='h-14 w-1' /></Link>
                : theme === 'system'
                ? systemTheme === 'dark'
                  ? <Link href='/'><img className='h-14' onLoad={() => setLoading('hidden')} src='https://res.cloudinary.com/blasspod/image/upload/v1664841660/blaspod/jjfme7pn7hnlhniuiab3.png' /></Link>
                  : <Link href='/'><img className='h-14' onLoad={() => setLoading('hidden')} src='https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png' /></Link>
                : theme === 'dark'
                  ? <Link href='/'><img className='h-14' onLoad={() => setLoading('hidden')} src='https://res.cloudinary.com/blasspod/image/upload/v1664841660/blaspod/jjfme7pn7hnlhniuiab3.png' /></Link>
                  : <Link href='/'><img className='h-14' onLoad={() => setLoading('hidden')} src='https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png' /></Link>
            }
          </div>
          {
            router.pathname !== '/finalizar-compra'
              ? <>
                <div className='hidden gap-6 575:flex'>
                  <Link className='mt-auto mb-auto' href='/'>INICIO</Link>
                  <Link className='flex h-full' href='/tienda' onMouseEnter={() => setNavCategories('flex')} onMouseLeave={() => setNavCategories('hidden')} onClick={() => setNavCategories('hidden')} >
                    <div className='mt-auto mb-auto'>TIENDA</div>
                  </Link>
                  <Link className='mt-auto mb-auto' href='/contacto'>CONTACTO</Link>
                  {
                    cartView === 'hidden'
                      ? (
                        <div>
                          <BsBag className='m-auto text-xl cursor-pointer h-full' onClick={() => setCartView('flex')} />
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
                      : <IoCloseOutline className='m-auto text-xl cursor-pointer h-full' onClick={() => setCartView('hidden')} />
                  }
                  {renderThemeChanger()}
                </div>
                <div className='flex gap-4 575:hidden'>
                  {
                    cartView === 'hidden'
                      ? (
                        <div>
                          <BsBag className='m-auto text-xl cursor-pointer h-full' onClick={() => setCartView('flex')} />
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
                      : <IoCloseOutline className='m-auto text-xl cursor-pointer h-full' onClick={() => setCartView('hidden')} />
                  }
                  {renderThemeChanger()}
                  {
                    menu === 'w-0 pl-0 pr-0 pt-6 pb-6'
                      ? <button onClick={() => {
                          setIndex('flex')
                        }}>
                        <FiMenu className='text-2xl' />
                      </button>
                      : <button onClick={() => {
                          setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
                          setTimeout(() => {
                            setIndex('hidden')
                          }, 150)
                        }}>
                        <IoCloseOutline className='text-2xl' />
                      </button>
                  }
                </div>
              </>
              : <div className='flex gap-4'>
                {renderThemeChanger()}
                <Link href='/tienda' className='mt-auto mb-auto text-sm text-neutral-500'>Continuar comprando</Link>
              </div>
          }
        </div>
        <div className={`${cartView} w-full z-50 absolute top-57 575:hidden`} style={{ height: 'calc(100vh - 91px)' }}>
          <div className='w-1440 ml-auto mr-auto'>
            <div className='ml-auto h-fit flex w-full 400:w-96'>
              <NavbarCart setCartView={setCartView} />
            </div>
            <div onClick={() => {
              setTimeout(() => {
                setCartView('hidden')
              }, 100)
            }} className='h-full w-full' />
          </div>
        </div>
        <div onClick={() => cartPc ? setCartView('hidden') : ''} className={`hidden w-full z-50 absolute top-57 575:${cartView}`} style={{ height: 'calc(100vh - 91px)' }}>
          <div className='w-1440 ml-auto mr-auto'>
            <div className='ml-auto h-fit flex w-full 400:w-96'>
              <NavbarCart setCartView={setCartView} setCartPc={setCartPc} />
            </div>
          </div>
        </div>
        <div className={`${index} w-full absolute z-30 justify-between 530:hidden`} style={{ top: '57px', height: 'calc(100vh - 56px)' }}>
          <div className='w-1/6' onClick={() => {
            setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
            setTimeout(() => {
              setIndex('hidden')
            }, 150)
          }} />
          <div className={`${menu} shadow-md transition-all duration-300 bg-white overflow-hidden dark:bg-neutral-900`}>
            <Link className={`mb-4 flex pb-2 min-w-[250px] border-b dark:border-neutral-600`} onClick={() => {
              setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
              setTimeout(() => {
                setIndex('hidden')
              }, 150)
            }} href='/'>INICIO<AiOutlineRight className='ml-auto text-lg text-neutral-500' /></Link>
            <div className={`border-b mb-4 min-w-[250px] dark:border-neutral-600`}>
              <div className={`flex justify-between pb-2`}>
                <Link onClick={() => {
                  setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
                  setTimeout(() => {
                    setIndex('hidden')
                  }, 150)
                }} href='/tienda'>TIENDA</Link>
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
                        setTimeout(() => {
                          setIndex('hidden')
                        }, 150)
                      }} href={`/tienda/${category.slug}`} className='flex gap-2' key={category._id}>
                        <img className='w-28' src={category.image} />
                        <h2 className='mt-auto mb-auto'>{category.category.toUpperCase()}</h2>
                      </Link>
                    ))
                    : ''
                }
              </div>
            </div>
            <Link className={`mb-4 flex pb-2 min-w-[250px] border-b dark:border-neutral-600`} onClick={() => {
              setMenu('w-0 pl-0 pr-0 pt-6 pb-6')
              setTimeout(() => {
                setIndex('hidden')
              }, 140)
            }} href='/contacto'>CONTACTO<AiOutlineRight className='ml-auto text-lg text-neutral-500' /></Link>
          </div>
        </div>
        <div className={`${navCategories} absolute top-57 w-full`} onMouseEnter={() => setNavCategories('flex')} onMouseLeave={() => setNavCategories('hidden')}>
          {
            categories?.length
              ? (
                <div onMouseEnter={() => setNavCategories('flex')} onMouseLeave={() => setNavCategories('hidden')} className='w-full bg-white p-4 flex gap-4 border-b justify-center dark:bg-neutral-900 dark:border-neutral-800'>
                  {categories.map(category => (
                    <div key={category._id}>
                      <img className='w-64 mb-2 cursor-pointer' onClick={() => router.push(`/tienda/${category.slug}`)} src={category.image} />
                      <Link href={`/tienda/${category.slug}`} className='m-auto'>{category.category.toUpperCase()}</Link>
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
