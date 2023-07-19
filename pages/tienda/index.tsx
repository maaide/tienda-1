import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { useCategories, useProducts } from '../../hooks'
import { Spinner, CategoriesShop } from '../../components/ui'
import { ProductCard } from '../../components/products'
import DesignContext from '@/context/design/DesignContext'
import Image from 'next/image'

const Shop = () => {

  const { design } = useContext(DesignContext)

  const { products, isLoadingProducts } = useProducts('/products')
  const { categories } = useCategories('/categories')

  const [bgOpacity, setBgOpacity] = useState('opacity-0')
  const [bgOpacityImage, setBgOpacityImage] = useState('opacity-0')

  useEffect(() => {
    setBgOpacity('opacity-1')
  }, [])

  return (
    <>
      <Head>
        <title>Tienda</title>
      </Head>
      {
        design.shop.banner?.url !== '' && design.shop.banner
          ? (
            <div className={`${bgOpacityImage} transition-opacity duration-200 bg-gradient-to-r from-sky-500 to-indigo-500 flex h-96`}>
              <div className='w-1280 m-auto pl-4 pr-4 z-10 pt-20 pb-20'>
                <h1 className='text-[25px] text-white font-semibold tracking-widest mb-4 text-center md:text-[32px]'>{design.shop.title !== '' ? design.shop.title : 'TIENDA'}</h1>
                <p className='text-lg text-white w-full text-center'>{design.shop.description !== '' ? design.shop.description : 'Encuentra los productos de la más alta calidad y siempre con increíbles precios.'}</p>
              </div>
              {
                design.shop.banner.url !== '' && design.shop.banner
                  ? <Image onLoadingComplete={() => setBgOpacityImage('opacity-1')} className='absolute z-0 h-96 w-full object-cover' src={design.shop.banner.url!} alt='Banner Tienda' width={1920} height={1080} />
                  : ''
              }
            </div>
          )
          : (
            <div className={`${bgOpacity} transition-opacity duration-200 bg-gradient-to-r from-sky-500 to-indigo-500 flex h-96`}>
              <div className='w-1280 m-auto pl-4 pr-4 z-10 pt-20 pb-20'>
                <h1 className='text-[25px] text-white font-semibold tracking-widest mb-4 text-center md:text-[32px]'>{design.shop.title !== '' ? design.shop.title : 'TIENDA'}</h1>
                <p className='text-lg text-white w-full text-center'>{design.shop.description !== '' ? design.shop.description : 'Encuentra los productos de la más alta calidad y siempre con increíbles precios.'}</p>
              </div>
            </div>
          )
      }
      <CategoriesShop categories={categories} />
      {
        isLoadingProducts
          ? (
            <div className="flex w-full">
              <div className="m-auto mt-16 mb-16">
                <Spinner />
              </div>
            </div>
          )
          : <div className='flex'>
            <div className='w-1280 m-auto flex gap-2 pt-4 pb-4 flex-wrap'>
              {
                products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))
              }
            </div>
          </div>
      }
    </>
  )
}

export default Shop