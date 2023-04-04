import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import styles from "./css/SafariProductSlider.module.css"
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper"

interface Props {
  images: string[]
}

export const SafariProductSlider: React.FC<Props> = ({ images }) => {
  return (
    <>
      <Swiper
        className={styles.mySwiper}
        cssMode={true}
        pagination={{
            clickable: true
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      >
        {
          images.map(image => {
            return (
              <SwiperSlide key={ image }>
                <img src={image} className='m-auto' />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  )
}