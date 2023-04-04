import React from 'react'
import { IProduct } from '../../interfaces'
import { ProductCard } from './'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import styles from  "./css/OtherProductList.module.css"
import { Pagination } from "swiper"

interface Props {
  products: IProduct[]
  title: string
}

export const OtherProductList: React.FC<Props> = ({ products, title }) => {

  return (
    <div className='flex w-full p-4'>
      <div className='m-auto w-full relative items-center 1300:w-1280'>
        <h3 className='text-lg font-light mb-2'>{ title }</h3>
        <Swiper
          className={styles.mySwiper}
          slidesPerView={window.innerWidth > 1100 ? 4 : window.innerWidth > 850 ? 3 : 2}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {
            products.map(product => (
              <SwiperSlide className='m-auto' key={product._id}>
                <ProductCard product={ product } />
                <div className='h-8' />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}