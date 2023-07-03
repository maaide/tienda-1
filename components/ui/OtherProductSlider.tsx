import React, { useEffect, useState } from 'react'
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
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
      >
        {
          images.map(image => {
            return (
              <SwiperSlide key={ image }>
                <Image onLoadingComplete={() => setLoading(true)} src={image} alt='Imagen producto' width={650} height={650} className={`${opacity} m-auto w-full max-w-2xl`} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  )
}