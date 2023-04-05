import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useState, useEffect } from 'react'
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
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'

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
    category: product.category
  })
  const [scrollPosition, setScrollPosition] = useState(0)
  const [descriptionView, setDescriptionView] = useState(true)
  const [returnView, setReturnView] = useState(false)
  const [shippingView, setShippingView] = useState(false)
  const router = useRouter()

  const { products, isLoadingProducts } = useProducts('/products')

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
      category: product.category
    })
  }, [router])

  useEffect(() => {
    submitViewContent()
  }, [])

  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
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
        scrollPosition >= 350
          ? <ProductDetails product={product} setTempCartProduct={setTempCartProduct} tempCartProduct={tempCartProduct} />
          : ''
      }
      <div className='flex p-4'>
        <div className='block m-auto w-full gap-4 lg:flex xl2:w-1280 xl2:gap-8'>
          <div className='w-full lg:w-7/12'>
            <div className='mb-2'>
              <span className='text-15 font-light'><Link href='/tienda'>Tienda</Link> / <Link href={`/category/${ product.category }`}>{ product.category[0].toUpperCase() }{ product.category.substring(1) }</Link> / <Link href={`/product/${ product.slug }`}>{ product.name }</Link></span>
            </div>
            <div className='relative top-0 mb-0 1010:mb-5 1010:sticky 1010:top-32'>
              <ProductSlider images={ product.images } />
            </div>
          </div>
          <div className='w-full mt-2 lg:w-5/12 lg:mt-11'>
            <h1 className='text-[18px] font-bold mb-2 md:text-[25px]'>{ product.name.toUpperCase() }</h1>
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
              <span className='text-[16px] font-bold'>${ NumberFormat(product.price) }</span>
              {
                product.beforePrice
                  ? <span className='text-sm line-through font-light text-[#444444] dark:text-neutral-400'>${ NumberFormat(product.beforePrice) }</span>
                  : ''
              }
            </div>
            {
              product.variations?.length
                ? product.variations[0].variation !== ''
                  ? <div className='mb-2'>
                    <span className='text-sm font-light'>{product.nameVariations}: </span>
                    <span className='text-sm font-light text-[#444444] dark:text-neutral-400'>{tempCartProduct.variation?.variation}</span>
                    <div className='flex gap-2 mt-1'>
                      {product.variations.map(variation => (
                        <div key={variation.variation}>
                          <img src={variation.image} onClick={() => {
                            setTempCartProduct({...tempCartProduct, variation: variation, image: variation.image})
                          }} className={`w-20 h-20 border rounded-lg p-1 cursor-pointer hover:border-main ${tempCartProduct.variation?.variation === variation.variation ? 'border-main' : 'dark:border-neutral-700 hover:dark:border-main'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                  : ''
                : ''
            }
            <span className='mb-2 font-light text-[14px] text-[#444444] block dark:text-neutral-400'><span className='text-black dark:text-white'>Stock:</span> { product.stock } { product.stock === 1 ? 'unidad' : 'unidades' }</span>
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
            {
              product.productsOffer?.length
              ? product.productsOffer[0].productsSale.length
                ? <div className='mt-4 border-b pb-4 dark:border-neutral-800'>
                  <h5 className='text-[14px] font-bold mb-2 md:text-[16px]'>OFERTAS POR LA COMPRA DE ESTE PRODUCTO</h5>
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
                } else {
                  setDescriptionView(true)
                }
              }} className='flex gap-2 w-full justify-between'>
                <h5 className='text-[14px] font-bold md:text-[16px]'>DESCRIPCIÓN</h5>
                {
                  descriptionView
                    ? <AiOutlineUp className='mt-auto mb-auto' />
                    : <AiOutlineDown className='mt-auto mb-auto' />
                }
              </button>
              {
                descriptionView
                  ? (
                    <div className='flex flex-col gap-2 mt-2'>
                      {product.description.split('/').map(des => {
                        return <p className='font-light text-[#444444] mb-1 text-sm dark:text-neutral-400' key={des}>{des}</p>
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
                } else {
                  setShippingView(true)
                }
              }} className='flex gap-2 justify-between w-full'>
                <h5 className='text-[14px] font-bold md:text-[16px]'>CALCULA LOS COSTOS DE ENVIO</h5>
                {
                  shippingView
                    ? <AiOutlineUp className='mt-auto mb-auto' />
                    : <AiOutlineDown className='mt-auto mb-auto' />
                }
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
                } else {
                  setReturnView(true)
                }
              }} className='flex gap-2 w-full justify-between'>
                <h5 className='text-[14px] font-bold md:text-[16px]'>ENVÍOS Y RETORNOS</h5>
                {
                  returnView
                    ? <AiOutlineUp className='mt-auto mb-auto' />
                    : <AiOutlineDown className='mt-auto mb-auto' />
                }
              </button>
              {
                returnView
                  ? (
                    <div className='mt-2'>
                      <p className='text-sm font-light mb-2 text-[#444444] dark:text-neutral-400'>Nuestros envios pueden demorar 1500 años habiles, lo que habiles es muy importante por que puede llegar el dia 1 del año 1500 o el dia 2 del año 1500</p>
                      <p className='text-sm font-light mb-2 text-[#444444] dark:text-neutral-400'>Si te llega malo el producto cagaste, no haremos nada para solucionar tu problema asi que busca ayuda por otro lado</p>
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
          <h2 className='text-[16px] mb-2 font-bold md:text-[20px]'>EVALUACIONES DE CLIENTES</h2>
          <span className='font-light mb-1 text-[#444444] dark:text-neutral-400'>Valoracion media</span>
          {
            product.reviews?.length
              ? <ReviewsProduct quantity={quantity} stars={stars} reviews={product.reviews} />
              : <NoReviewsProduct />
          }
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
          : <RecomendedProducts products={ products } title='PRODUCTOS RECOMENDADOS' productSelect={product} />
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