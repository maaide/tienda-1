import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { ProductCard3 } from '../../components/products'
import { Spinner, CategoriesShop } from '../../components/ui'
import { dbProducts } from '../../database'
import { useProducts, useCategories } from '../../hooks'
import { ICategory } from '../../interfaces'
import { IProduct } from '../../interfaces'
import Image from 'next/image'

interface Props {
  category: ICategory
}

const CategoryPage: React.FC<Props> = ({ category }) => {

  const [filterProducts, setFilterProducts] = useState<IProduct[]>()
  const router = useRouter()
  const { categories } = useCategories('/categories')

  const { products, isLoadingProducts } = useProducts('/products')

  const [bgOpacity, setBgOpacity] = useState('opacity-0')
  const [bgOpacityImage, setBgOpacityImage] = useState('opacity-0')

  useEffect(() => {
    if (!isLoadingProducts) {
      const filter = products.filter(product => product.category === category.category)
      setFilterProducts(filter.reverse())
    }
  }, [isLoadingProducts, router.asPath])

  useEffect(() => {
    setBgOpacity('opacity-1')
  }, [])

  const applyFilter = (e: any) => {
    if (products.length) {
      const filter = products.filter(product => product.category === category.category)
      if (e.target.value === 'Más recientes') {
        setFilterProducts(filter.reverse())
      } else if (e.target.value === 'Mayor precio') {
        setFilterProducts([...filter].sort((prev, curr) => curr.price - prev.price))
      } else if (e.target.value === 'Menor precio') {
        setFilterProducts([...filter].sort((prev, curr) => prev.price - curr.price))
      }
    }
  }

  return (
    <>
      <Head>
        <title>{ category.category }</title>
      </Head>
      {
        category.banner
          ? (
            <div className={`${bgOpacityImage} transition-opacity duration-200 bg-gradient-to-r from-sky-500 to-indigo-500 flex h-96`}>
              <div className='w-1280 m-auto pl-4 pr-4 z-10'>
                <h1 className='text-[25px] font-semibold tracking-widest text-white mb-4 text-center md:text-[32px]'>{category.category.toUpperCase()}</h1>
                <p className='text-lg text-white w-full text-center'>{category.description}</p>
              </div>
              <Image onLoadingComplete={() => setBgOpacityImage('opacity-1')} className='absolute z-0 h-96 w-full object-cover' src={category.banner.url} alt='Banner categoria' width={1920} height={1080} />
            </div>
          )
          : (
            <div className={`${bgOpacity} transition-opacity duration-200 bg-gradient-to-r from-sky-500 to-indigo-500 flex h-96`}>
              <div className='w-1280 m-auto pl-4 pr-4 z-10'>
                <h1 className='text-[25px] font-semibold tracking-widest text-white mb-4 text-center md:text-[32px]'>{category.category.toUpperCase()}</h1>
                <p className='text-lg text-white w-full text-center'>{category.description}</p>
              </div>
            </div>
          )
      }
      <CategoriesShop categories={categories} />
      <div className='flex px-4'>
        <div className='w-1280 m-auto flex gap-4 pt-4 pb-4 flex-wrap'>
          <select onChange={applyFilter} className='text-sm p-1.5 border rounded-md w-48'>
            <option>Más recientes</option>
            <option>Mayor precio</option>
            <option>Menor precio</option>
          </select>
        </div>
      </div>
      {
        filterProducts
          ? filterProducts.length === 0
            ? (
              <div className='flex'>
                <div className='w-1280 m-auto flex gap-2 pt-4 pb-4 flex-wrap'>
                  <p className='text-lg'>No hay productos en esta categoria</p>
                </div>
              </div>
            )
            : (
              <div className='flex'>
                <div className='w-1280 m-auto flex gap-2 pt-4 pb-4 flex-wrap'>
                  {
                    filterProducts.map(product => (
                      <ProductCard3 key={product._id} product={product} />
                    ))
                  }
                </div>
              </div>
            )
          : (
            <div className="flex w-full">
              <div className="m-auto mt-16 mb-16">
                <Spinner />
              </div>
            </div>
          )
      }
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const categoriesSlugs = await dbProducts.getAllcategoriesSlug()
  
  return {
    paths: categoriesSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const category = await dbProducts.getCategoriesBySlug( slug )

  if ( !category ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      category
    },
    revalidate: 86400
  }
}

export default CategoryPage