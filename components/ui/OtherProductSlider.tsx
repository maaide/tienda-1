import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import styles from "./css/OtherProductSlider.module.css"
import { Navigation, Pagination } from "swiper"
import Image from 'next/image'

interface Props {
  images: string[]
}

export const OtherProductSlider: React.FC<Props> = ({ images }) => {
  return (
    <>
      <Swiper
        className={styles.mySwiper}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
      >
        {
          images.map(image => {
            return (
              <SwiperSlide key={ image }>
                <Image src={image} alt='Imagen producto' width={650} height={650} className='m-auto w-full max-w-2xl' />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  )
}