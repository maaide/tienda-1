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
              <div className='m-auto block flex-wrap justify-around 830:flex'>
                {
                  categories.map(category => (
                    <Link href={`/tienda/${category.slug}`} key={category._id} className='mb-2 p-1 bg-contain w-full flex gap-4 bg-center hover:opacity-70 830:block 830:w-96'>
                      <img className='w-1/2 830:w-96' onLoad={() => setImgLoad(true)} src={category.image} alt={category.category} />
                      <div className='m-auto'>
                        <h2 style={{ display: imgLoad ? 'block' : 'none' }} className='text-[16px] mb-1 text-[#1c1b1b] tracking-widest font-semibold mt-2 md:text-[20px] dark:text-white'>{category.category.toUpperCase()}</h2>
                        <p className='text-sm text-main md:text-base'>{category.description}</p>
                      </div>
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
