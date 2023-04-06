import Link from 'next/link'
import React, { useState } from 'react'
import { useProducts } from '../../hooks'
import { ICategory } from '../../interfaces'
import { ProductList } from '../products'
import { Spinner } from './Spinner'

interface Props {
  categories: ICategory[]
}

export const Categories: React.FC<Props> = ({ categories }) => {

  const {products} = useProducts('/products')
  const [imgLoad, setImgLoad] = useState(false)

  return (
    <>
      {
        categories.length
          ? (
            <div className='flex pt-4 pl-3 pr-3'>
              <div className='w-1280 m-auto flex flex-wrap justify-around'>
                {
                  categories.map(category => (
                    <Link href={`/tienda/${category.slug}`} key={category._id} className=' mb-2 p-1 bg-contain bg-center w-1/2 800:w-1/3 hover:opacity-70'>
                      <img onLoad={() => setImgLoad(true)} src={category.image} alt={category.category} />
                      <h2 style={{ display: imgLoad ? 'block' : 'none' }} className='text-[16px] text-center font-semibold mt-2 md:text-[20px]'>{category.category.toUpperCase()}</h2>
                    </Link>
                  ))
                }
              </div>
            </div>
          )
          : ''
      }
      {
        imgLoad
          ? <ProductList products={products} title='MÁS VENDIDOS' />
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
