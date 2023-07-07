import React, { useContext } from 'react'
import Head from 'next/head'
import { useCategories, useProducts } from '../../hooks'
import { Spinner, CategoriesShop } from '../../components/ui'
import { ProductCard } from '../../components/products'
import DesignContext from '@/context/design/DesignContext'

const Shop = () => {

  const { design } = useContext(DesignContext)

  const { products, isLoadingProducts } = useProducts('/products')
  const { categories } = useCategories('/categories')

  return (
    <>
      <Head>
        <title>Tienda</title>
      </Head>
      <div className='bg-gradient-to-r from-sky-500 pt-20 pb-20 to-indigo-500 flex pl-4 pr-4'>
        <div className='w-1280 m-auto'>
          <h1 className='text-[25px] text-white font-semibold tracking-widest mb-4 text-center md:text-[32px]'>{design.shop.title !== '' ? design.shop.title : 'TIENDA'}</h1>
          <p className='text-lg text-white w-full text-center'>{design.shop.description !== '' ? design.shop.description : 'Encuentra los productos de la más alta calidad y siempre con increíbles precios.'}</p>
        </div>
      </div>
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