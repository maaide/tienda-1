import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useProducts } from '../../hooks'
import { ICategory } from '../../interfaces'
import { ProductList } from '../products'
import { Spinner } from './Spinner'
import Image from 'next/image'

interface Props {
  categories: ICategory[]
}

export const Categories: React.FC<Props> = ({ categories }) => {

  const {products} = useProducts('/products')
  const [imgLoad, setImgLoad] = useState(false)
  const [imgView, setImgView] = useState('opacity-0')
  const [textView, setTextView] = useState('opacity-0')

  useEffect(() => {
    if (imgLoad) {
      setImgView('opacity-1')
      setTimeout(() => {
        setTextView('opacity-1')
      }, 300)
    }
  }, [imgLoad])

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
                      <Image className={`${imgView} transition-opacity duration-200 w-1/2 830:w-96`} width={500} height={500} onLoadingComplete={() => setImgLoad(true)} src={category.image!} alt={category.category} />
                      <div className='m-auto'>
                        <h2 style={{ display: imgLoad ? 'block' : 'none' }} className={`${textView} transition-opacity duration-200 text-[16px] mb-1 text-[#1c1b1b] tracking-widest font-semibold mt-2 md:text-[20px] dark:text-white`}>{category.category.toUpperCase()}</h2>
                        <p className={`${textView} transition-opacity duration-200 text-sm text-main md:text-base dark:text-neutral-400`}>{category.description}</p>
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
