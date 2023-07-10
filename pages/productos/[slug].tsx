import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useState, useEffect, useContext } from 'react'
import { ICartProduct, IProduct } from '../../interfaces'
import { dbProducts } from '../../database'
import { ButtonAddToCart, ButtonNone, ItemCounter, ProductSlider, Spinner } from '../../components/ui'
import { NumberFormat } from '../../utils'
import { NoReviews, ProductDetails, ProductOffer, RecomendedProducts, Reviews, ShippingCost } from '../../components/products'
import { ReviewsProduct, NoReviewsProduct } from '../../components/products/ReviewsProduct'
import { useProducts } from '../../hooks'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Image from 'next/image'
import DesignContext from '@/context/design/DesignContext'

interface Props {
  product: IProduct
}

const ProductPage: React.FC<Props> = ({ product }) => {

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    name: product.name,
    image: product.images[0],
    price: product.price,
    beforePrice: product.beforePrice,
    slug: product.slug,
    quantity: 1,
    stock: product.stock,
    category: product.category,
    quantityOffers: product.quantityOffers ? product.quantityOffers : []
  })
  const [descriptionView, setDescriptionView] = useState(true)
  const [descriptionRotate, setDescriptionRotate] = useState('-rotate-90')
  const [returnView, setReturnView] = useState(false)
  const [returnRotate, setReturnRotate] = useState('rotate-90')
  const [shippingView, setShippingView] = useState(false)
  const [shippingRotate, setShippingRotate] = useState('rotate-90')
  const [detailsOpacity, setDetailsOpacity] = useState('opacity-0')
  const [detailsPosition, setDetailsPosition] = useState('-bottom-44')
  const [productsFiltered, setProductsFilteres] = useState<IProduct[]>([])

  const router = useRouter()

  const { products, isLoadingProducts } = useProducts('/products')
  const { design } = useContext(DesignContext)

  const submitViewContent = async () => {
    await axios.post('https://server-production-e234.up.railway.app/view-content', { name: tempCartProduct.name, price: tempCartProduct.price, category: tempCartProduct.category, url: tempCartProduct.slug, fbp: Cookies.get('_fbp'), fbc: Cookies.get('_fbc') })
  }

  useEffect(() => {
    setTempCartProduct({
      _id: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      beforePrice: product.beforePrice,
      slug: product.slug,
      quantity: 1,
      stock: product.stock,
      category: product.category,
      quantityOffers: product.quantityOffers
    })
  }, [router])

  useEffect(() => {
    submitViewContent()
  }, [])

  const filterProducts = () => {
    if (products.length) {
      if (design.home.products.sectionProducts === 'Productos de una categoria') {
        const filterProducts = products.filter(product => product.category === design.home.products.category)
        setProductsFilteres(filterProducts)
      } else if (design.home.products.sectionProducts === 'Productos en oferta') {
        const filterProducts = products.filter(product => product.beforePrice)
        setProductsFilteres(filterProducts)
      } else {
        setProductsFilteres(products)
      }
    }
  }

  useEffect(() => {
    filterProducts()
  }, [products])

  const handleScroll = () => {
    const position = window.scrollY
    if (position > 375) {
      setDetailsOpacity('opacity-1')
      setDetailsPosition('-bottom-1')
    } else {
      setDetailsOpacity('opacity-0')
      setDetailsPosition('-bottom-44')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  let stars = 0
  let quantity = 0

  return (
    <>
      <Head>
        <title>{product.name} {product.titleSeo}</title>
        <meta name="description" content={ product.descriptionSeo } />  
        <meta name="og:title" content={ product.titleSeo } />
        <meta name="og:description" content={ product.descriptionSeo } />
        {
          product.images[0] && (
            <meta name="og:image" content={ product.images[0] } />
          )
        }
      </Head>
      {
        product.stock > 0
          ? (
            <div className={`${detailsOpacity} ${detailsPosition} flex transition-all duration-200 decoration-slate-200 fixed w-full z-40 p-4`}>
              <ProductDetails product={product} setTempCartProduct={setTempCartProduct} tempCartProduct={tempCartProduct} />
            </div>
          )
          : ''
      }
      <div className='flex p-4'>
        <div className='block m-auto w-full gap-4 lg:flex xl2:w-1280 xl2:gap-8'>
          <div className='w-full lg:w-7/12'>
            <div className='mb-2'>
              <span className='text-15'><Link href='/tienda'>Tienda</Link> / <Link href={`/tienda/${ product.category }`}>{ product.category[0].toUpperCase() }{ product.category.substring(1) }</Link> / <Link href={`/productos/${ product.slug }`}>{ product.name }</Link></span>
            </div>
            <div className='relative top-0 mb-0 1010:mb-5 1010:sticky 1010:top-32'>
              <ProductSlider images={ product.images } />
            </div>
          </div>
          <div className='w-full mt-2 lg:w-5/12 lg:mt-11'>
            <h1 className='text-[18px] tracking-widest text-main font-semibold mb-2 md:text-[25px] dark:text-white'>{ product.name.toUpperCase() }</h1>
            {
              product.reviews?.length
                ? product.reviews.map(review => {
                  stars = stars + review.calification
                  quantity = quantity + 1
                  return null
                })
                : <NoReviews />
            }
            {
              product.reviews?.length
                ? <Reviews reviews={product.reviews} quantity={quantity} stars={stars} />
                : ''
            }
            <div className='flex gap-2 mb-2'>
              <span className='text-[16px] text-main font-medium dark:text-white'>${ NumberFormat(product.price) }</span>
              {
                product.beforePrice
                  ? <span className='text-sm line-through text-[#444444] dark:text-neutral-400'>${ NumberFormat(product.beforePrice) }</span>
                  : ''
              }
            </div>
            {
              product.variations?.length
                ? product.variations[0].variation !== ''
                  ? <div className='mb-2'>
                    <span className='text-sm font-medium'>{product.nameVariations}: </span>
                    <span className='text-sm text-[#444444] dark:text-neutral-400'>{tempCartProduct.variation?.variation}</span>
                    <div className='flex gap-2 mt-1'>
                      {product.variations.map(variation => (
                        <div key={variation.variation}>
                          <Image src={variation.image} alt='Imagen variación' width={80} height={80} onClick={() => {
                            setTempCartProduct({...tempCartProduct, variation: variation, image: variation.image})
                          }} className={`w-20 h-20 border rounded-lg p-1 cursor-pointer hover:border-main ${tempCartProduct.variation?.variation === variation.variation ? 'border-main' : 'dark:border-neutral-700 hover:dark:border-main'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                  : ''
                : ''
            }
            <span className='mb-2 text-[14px] text-[#444444] block dark:text-neutral-400'><span className='font-medium text-main dark:text-white'>Stock:</span> { product.stock } { product.stock === 1 ? 'unidad' : 'unidades' }</span>
            {
              product.quantityOffers?.length && product.quantityOffers[0].descount
                ? (
                  <div className='mb-2'>
                    <p className='text-sm mb-2'>Descuentos por cantidad</p>
                    <div className='flex gap-2'>
                      {
                        product.quantityOffers.map(offer => (
                          <div key={offer._id} className='p-2 border rounded w-16 flex flex-col dark:border-neutral-700'>
                            <p className='text-sm m-auto'>{offer.quantity}+</p>
                            <p className='text-sm m-auto'>{offer.descount}%</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
                : ''
            }
            {
              product.stock === 0
                ? (
                  <div>
                    <p className='mb-2 text-sm'>Deja tu correo para avisarte cuando tengamos este producto nuevamente en stock</p>
                    <div className='flex gap-2'>
                      <input type='text' placeholder='Correo' className='p-2 text-sm w-56 rounded border focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      <button className='pt-1.5 pb-1.5 h-fit mt-auto mb-auto pl-7 pr-7 rounded-md bg-button text-white'>Enviar</button>
                    </div>
                  </div>
                )
                : (
                  <div className='flex gap-2 pb-4 border-b dark:border-neutral-800'>
                    <ItemCounter
                      currentValue={ tempCartProduct.quantity }
                      updatedQuantity={ onUpdateQuantity }
                      maxValue={ product.stock }
                    />
                    {
                      product.variations?.length
                        ? product.variations[0].variation !== ''
                          ? tempCartProduct.variation
                            ? <ButtonAddToCart tempCartProduct={tempCartProduct} />
                            : <ButtonNone>Añadir al carrito</ButtonNone>
                          : <ButtonAddToCart tempCartProduct={tempCartProduct} />
                        : <ButtonAddToCart tempCartProduct={tempCartProduct} />
                    }
                  </div>
                )
            }
            {
              product.productsOffer?.length
              ? product.productsOffer[0].productsSale.length
                ? <div className='mt-4 border-b pb-4 dark:border-neutral-800'>
                  <h5 className='text-[14px] tracking-widest text-main font-semibold mb-2 md:text-[16px] dark:text-white'>OFERTAS POR LA COMPRA DE ESTE PRODUCTO</h5>
                  {
                    product.productsOffer.map(offer => <ProductOffer key={offer.productsSale[0].slug} offer={offer} />)
                  }
                </div>
                : ''
              : ''
            }
            <div className='mt-4 border-b pb-4 dark:border-neutral-800'>
              <button onClick={(e: any) => {
                e.preventDefault()
                if (descriptionView) {
                  setDescriptionView(false)
                  setDescriptionRotate('rotate-90')
                } else {
                  setDescriptionView(true)
                  setDescriptionRotate('-rotate-90')
                }
              }} className='flex gap-2 w-full justify-between'>
                <h5 className='text-[14px] tracking-widest text-main font-semibold md:text-[16px] dark:text-white'>DESCRIPCIÓN</h5>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className={`${descriptionRotate} transition-all duration-150 ml-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
              </button>
              {
                descriptionView
                  ? (
                    <div className='flex flex-col gap-2 mt-2'>
                      {product.description.split('/').map(des => {
                        return <p className='text-[#444444] mb-1 text-sm dark:text-neutral-400 md:text-[16px]' key={des}>{des}</p>
                      })}
                    </div>
                  )
                  : ''
              }
            </div>
            <div className='border-b pb-4 mt-4 dark:border-neutral-800'>
              <button onClick={(e: any) => {
                e.preventDefault()
                if (shippingView) {
                  setShippingView(false)
                  setShippingRotate('rotate-90')
                } else {
                  setShippingView(true)
                  setShippingRotate('-rotate-90')
                }
              }} className='flex gap-2 justify-between w-full'>
                <h5 className='text-[14px] tracking-widest text-main font-semibold md:text-[16px] dark:text-white'>CALCULA LOS COSTOS DE ENVIO</h5>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className={`${shippingRotate} transition-all duration-150 ml-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
              </button>
              {
                shippingView
                  ? (
                    <div className='mt-2'>
                      <ShippingCost />
                    </div>
                  )
                  : ''
              }
            </div>
            <div className='mt-4 pb-4 border-b dark:border-neutral-800'>
              <button onClick={(e: any) => {
                e.preventDefault()
                if (returnView) {
                  setReturnView(false)
                  setReturnRotate('rotate-90')
                } else {
                  setReturnView(true)
                  setReturnRotate('-rotate-90')
                }
              }} className='flex gap-2 w-full justify-between'>
                <h5 className='text-[14px] tracking-widest text-main font-semibold md:text-[16px] dark:text-white'>ENVÍOS Y RETORNOS</h5>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className={`${returnRotate} transition-all duration-150 ml-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
              </button>
              {
                returnView
                  ? (
                    <div className='mt-2'>
                      <p className='text-sm mb-2 text-[#444444] dark:text-neutral-400 md:text-[16px]'>Nuestros envios pueden demorar 1500 años habiles, lo que habiles es muy importante por que puede llegar el dia 1 del año 1500 o el dia 2 del año 1500</p>
                      <p className='text-sm mb-2 text-[#444444] dark:text-neutral-400 md:text-[16px]'>Si te llega malo el producto cagaste, no haremos nada para solucionar tu problema asi que busca ayuda por otro lado</p>
                    </div>
                  )
                  : ''
              }
            </div>
          </div>
        </div>
      </div>
      <div className='flex p-4'>
        <div className='w-1280 m-auto'>
          <h2 className='text-[16px] tracking-widest text-main mb-2 font-semibold md:text-[20px] dark:text-white'>EVALUACIONES DE CLIENTES</h2>
          <span className='text-[#444444] text-[14px] md:text-[16px] dark:text-neutral-400'>Valoracion media</span>
          <div className='mt-2'>
            {
              product.reviews?.length
                ? <ReviewsProduct quantity={quantity} stars={stars} reviews={product.reviews} />
                : <NoReviewsProduct />
            }
          </div>
        </div>
      </div>
      {
        isLoadingProducts
          ? (
            <div className="flex w-full">
              <div className="m-auto mt-16 mb-16">
                <Spinner />
              </div>
            </div>
          )
          : <RecomendedProducts products={ productsFiltered } title='PRODUCTOS RECOMENDADOS' productSelect={product} />
      }
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs()

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductBySlug( slug )

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 200
  }
}

export default ProductPage