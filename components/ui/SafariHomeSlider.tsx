import React, { useContext, useEffect, useState } from 'react'
import { Button } from './Button'
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import styles from "./css/SafariHomeSlider.module.css"
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper"
import Image from 'next/image'
import DesignContext from '@/context/design/DesignContext'

export const SafariHomeSlider = () => {

  const { design } = useContext(DesignContext)

  const [loadingImage, setLoadingImage] = useState(false)
  const [imageView, setImageView] = useState('opacity-0')
  const [textView, setTextView] = useState('opacity-0')
  const [buttonView, setButtonView] = useState('opacity-0')

  useEffect(() => {
    if (loadingImage) {
      setImageView('opacity-1')
      setTimeout(() => {
        setTextView('opacity-1')
        setTimeout(() => {
          setButtonView('opacity-1')
        }, 300)
      }, 300)
    }
  }, [loadingImage])

  return (
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
        design.home.banner.map(banner => (
          <SwiperSlide>
            <div className={`h-400 flex xl:h-600 2xl:h-700`}>
              <div className='p-4 w-1280 m-auto'>
                <h1 className={`${textView} transition-opacity duration-200 text-[25px] text-white font-bold mb-2 md:text-[32px]`}>{banner.title}</h1>
                <p className={`${textView} transition-opacity duration-200 text-white text-lg mb-4`}>{banner.text}</p>
                <Link className={`${buttonView} transition-opacity duration-200`} href={banner.linkButton}><Button>{banner.textButton}</Button></Link>
              </div>
              <Image onLoadingComplete={() => setLoadingImage(true)} width={1920} height={1080} className={`absolute object-cover h-full w-full -z-10 ${imageView} transition-opacity duration-200`} src={banner.image} alt='banner' />
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}
