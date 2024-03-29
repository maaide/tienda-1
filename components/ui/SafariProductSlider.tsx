import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import styles from "./css/SafariProductSlider.module.css"
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper"
import Image from 'next/image'

interface Props {
  images: { public_id: string, url: string }[]
}

export const SafariProductSlider: React.FC<Props> = ({ images }) => {

  const [loading, setLoading] = useState(false)
  const [opacity, setOpacity] = useState('opacity-0')

  useEffect(() => {
    if (loading) {
      setOpacity('opacity-1')
    }
  }, [loading])

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
              <SwiperSlide key={ image.public_id }>
                <Image onLoadingComplete={() => setLoading(true)} src={image.url} alt='Imagen producto' width={650} height={650} className={`${opacity} transition-opacity duration-200 m-auto`} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  )
}