import React, { useEffect, useState } from 'react'
import { Button } from './Button'
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import styles from "./css/SafariHomeSlider.module.css"
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper"

export const SafariHomeSlider = () => {

  const [imageView, setImageView] = useState('opacity-0')
  const [textView, setTextView] = useState('opacity-0')
  const [buttonView, setButtonView] = useState('opacity-0')

  useEffect(() => {
    setTimeout(() => {
      setImageView('opacity-1')
      setTimeout(() => {
        setTextView('opacity-1')
        setTimeout(() => {
          setButtonView('opacity-1')
        }, 300)
      }, 300)
    }, 2000)
  }, [])

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
      <SwiperSlide>
        <div className={`h-400 flex xl:h-600 2xl:h-700`}>
          <div className='p-4 w-1280 m-auto'>
            <h1 className={`${textView} transition-opacity duration-200 text-[25px] text-white font-bold mb-2 md:text-[32px]`}>ENCUÉNTRA OFERTAS DE HASTA UN 40% DE DESCUENTO</h1>
            <p className={`${textView} transition-opacity duration-200 text-white text-lg mb-4`}>Aprovecha nuestras increibles ofertas solo por tiempo limitado.</p>
            <Link className={`${buttonView} transition-opacity duration-200`} href='/ofertas'><Button>VER OFERTAS</Button></Link>
          </div>
          <img className={`absolute object-cover h-full w-full -z-10 ${imageView} transition-opacity duration-200`} src='https://res.cloudinary.com/blasspod/image/upload/v1680628242/blaspod/pexels-xue-guangjian-1687845_ocry6n.jpg' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='h-400 flex xl:h-600 2xl:h-700'>
          <div className='p-4 w-1280 m-auto'>
            <h1 className='text-[25px] text-white font-bold mb-2 md:text-[32px]'>ENCUÉNTRA OFERTAS DE HASTA UN 40% DE DESCUENTO</h1>
            <p className='text-white text-lg mb-4'>Aprovecha nuestras increibles ofertas solo por tiempo limitado.</p>
            <Button>VER OFERTAS</Button>
          </div>
          <img className={`absolute -z-10 object-cover h-full w-full`} src='https://res.cloudinary.com/blasspod/image/upload/v1680628242/blaspod/pexels-xue-guangjian-1687845_ocry6n.jpg' />
        </div>
      </SwiperSlide>
    </Swiper>
  )
}
