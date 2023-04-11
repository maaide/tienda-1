import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { ICategory } from '../../interfaces'

interface Props {
  categories: ICategory[]
}

export const CategoriesShop: React.FC<Props> = ({ categories }) => {

  const router = useRouter()

  return (
    <div className='flex pt-4 pl-4 pr-4'>
      <div className='w-1280 m-auto flex gap-2 overflow-x-scroll pb-2 scroll whitespace-nowrap scroll-smooth' style={{ overflow: 'overlay' }}>
        {
          `/tienda` === router.asPath
            ? (
              <Link href={'/tienda'} className='border border-main text-main pt-0.5 pb-0.5 pl-2 pr-2 rounded-full dark:border-neutral-600 dark:text-neutral-600'>
                <span className='text-sm'>Todos</span>
              </Link>
            )
            : (
              <Link href={'/tienda'} className='border pt-0.5 pb-0.5 pl-2 pr-2 rounded-full dark:border-neutral-500 hover:border-main hover:text-main hover:dark:border-neutral-600 hover:dark:text-neutral-600'>
                <span className='text-sm'>Todos</span>
              </Link>
            )
        }
        {
          categories?.length
            ? categories.map(category => {
              if (`/tienda/${category.slug}` === router.asPath) {
                return (
                  <Link href={`/tienda/${category.slug}`} className='border border-main text-main pt-0.5 pb-0.5 pl-2 pr-2 rounded-full dark:border-neutral-600 dark:text-neutral-600' key={category._id}>
                    <span className='text-sm'>{category.category}</span>
                  </Link>
                )
              } else {
                return (
                    <Link href={`/tienda/${category.slug}`} className='border pt-0.5 pb-0.5 pl-2 pr-2 rounded-full dark:border-neutral-400 hover:border-main hover:text-main  hover:dark:border-neutral-600 hover:dark:text-neutral-600' key={category._id}>
                      <span className='text-sm'>{category.category}</span>
                    </Link>
                  )
                }
            })
            : ''
        }
      </div>
    </div>
  )
}
